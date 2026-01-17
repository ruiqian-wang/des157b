(function () {
  'use strict';

  const designZone = document.getElementById('designZone');
  const resetBtn = document.getElementById('resetBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const downloadFormatEl = document.getElementById('downloadFormat');

  if (!designZone) return;

  let zCounter = 10;

  // Background animation
  if (window.Granim) {
    // eslint-disable-next-line no-new
    new window.Granim({
      element: '#canvas-basic',
      direction: 'diagonal',
      isPausedWhenNotInView: true,
      states: {
        'default-state': {
          gradients: [
            ['#F2ECE6', '#D3B8A3'],
            ['#E6E2DD', '#B0ADA9'],
            ['#DDD9DC', '#A9A3AC'],
          ],
          transitionSpeed: 2000,
        },
      },
    });
  }

  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

  function bringToFront(el) {
    zCounter += 1;
    el.style.zIndex = String(zCounter);
  }

  function createPlacedItemFromPalette(paletteEl) {
    const img = paletteEl.querySelector('img');
    if (!img) return null;

    const wrapper = document.createElement('div');
    wrapper.className = 'placed-item';
    wrapper.style.left = '0px';
    wrapper.style.top = '0px';
    wrapper.style.width = '100px';
    wrapper.style.zIndex = String(zCounter);

    const placedImg = document.createElement('img');
    // Don't set crossOrigin here - it can prevent images from loading in some contexts
    // We'll handle CORS/taint issues only during download
    placedImg.src = img.src;
    placedImg.alt = img.alt || '';
    placedImg.draggable = false;

    const handle = document.createElement('button');
    handle.type = 'button';
    handle.className = 'resize-handle';
    handle.setAttribute('aria-label', 'Resize item');
    handle.innerHTML = '<i class="fa-solid fa-up-right-and-down-left-from-center"></i>';

    wrapper.appendChild(placedImg);
    wrapper.appendChild(handle);

    enableDrag(wrapper);
    enableResize(wrapper, handle);

    return wrapper;
  }

  function pointInsideRect(x, y, rect) {
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  }

  // Palette -> DesignZone: pointer drag to place a clone.
  document.querySelectorAll('.items .draggable').forEach((paletteEl) => {
    paletteEl.addEventListener('pointerdown', (e) => {
      // Only left click / primary touch.
      if (e.button !== undefined && e.button !== 0) return;

      const placed = createPlacedItemFromPalette(paletteEl);
      if (!placed) return;

      designZone.appendChild(placed);
      bringToFront(placed);

      const zoneRect = designZone.getBoundingClientRect();
      const placedRect = placed.getBoundingClientRect();
      const offsetX = placedRect.width / 2;
      const offsetY = placedRect.height / 2;

      function moveAt(clientX, clientY) {
        const maxLeft = designZone.clientWidth - placed.offsetWidth;
        const maxTop = designZone.clientHeight - placed.offsetHeight;

        const left = clamp(clientX - zoneRect.left - offsetX, 0, Math.max(0, maxLeft));
        const top = clamp(clientY - zoneRect.top - offsetY, 0, Math.max(0, maxTop));

        placed.style.left = `${left}px`;
        placed.style.top = `${top}px`;
      }

      moveAt(e.clientX, e.clientY);

      function onMove(ev) {
        moveAt(ev.clientX, ev.clientY);
      }

      function onUp(ev) {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);

        const dropRect = designZone.getBoundingClientRect();
        if (!pointInsideRect(ev.clientX, ev.clientY, dropRect)) {
          placed.remove();
        }
      }

      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp, { once: true });
    });
  });

  function enableDrag(el) {
    el.addEventListener('pointerdown', (e) => {
      const target = e.target;
      if (target instanceof Element && target.closest('.resize-handle')) return;
      if (e.button !== undefined && e.button !== 0) return;

      bringToFront(el);

      const zoneRect = designZone.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const offsetX = e.clientX - elRect.left;
      const offsetY = e.clientY - elRect.top;

      el.setPointerCapture?.(e.pointerId);

      function onMove(ev) {
        const maxLeft = designZone.clientWidth - el.offsetWidth;
        const maxTop = designZone.clientHeight - el.offsetHeight;

        const left = clamp(ev.clientX - zoneRect.left - offsetX, 0, Math.max(0, maxLeft));
        const top = clamp(ev.clientY - zoneRect.top - offsetY, 0, Math.max(0, maxTop));

        el.style.left = `${left}px`;
        el.style.top = `${top}px`;
      }

      function onUp() {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
      }

      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp, { once: true });
    });
  }

  function enableResize(el, handle) {
    handle.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.button !== undefined && e.button !== 0) return;

      bringToFront(el);

      const startX = e.clientX;
      const startWidth = el.getBoundingClientRect().width;

      handle.setPointerCapture?.(e.pointerId);

      function onMove(ev) {
        const dx = ev.clientX - startX;
        const zoneMax = designZone.clientWidth;
        const nextWidth = clamp(startWidth + dx, 30, zoneMax);
        el.style.width = `${nextWidth}px`;

        // Keep the item fully inside the zone after resize
        const maxLeft = designZone.clientWidth - el.offsetWidth;
        const maxTop = designZone.clientHeight - el.offsetHeight;
        const left = clamp(Number.parseFloat(el.style.left || '0'), 0, Math.max(0, maxLeft));
        const top = clamp(Number.parseFloat(el.style.top || '0'), 0, Math.max(0, maxTop));
        el.style.left = `${left}px`;
        el.style.top = `${top}px`;
      }

      function onUp() {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
      }

      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp, { once: true });
    });
  }

  resetBtn?.addEventListener('click', () => {
    designZone.querySelectorAll('.placed-item').forEach((el) => el.remove());
  });

  function waitForImagesIn(container) {
    const imgs = Array.from(container.querySelectorAll('img'));
    return Promise.all(
      imgs.map((img) =>
        img.complete && img.naturalWidth > 0
          ? Promise.resolve()
          : new Promise((resolve) => {
              const done = () => resolve();
              img.addEventListener('load', done, { once: true });
              img.addEventListener('error', done, { once: true });
            }),
      ),
    );
  }

  async function renderZoneToCanvas(asJpeg) {
    await waitForImagesIn(designZone);

    if (document.fonts && document.fonts.ready) {
      try {
        await document.fonts.ready;
      } catch {
        // ignore
      }
    }

    return window.html2canvas(designZone, {
      backgroundColor: asJpeg ? '#ffffff' : null,
      useCORS: true,
      allowTaint: false,
      scale: 2,
      logging: false,
    });
  }

  async function downloadDesign() {
    // IMPORTANT: Browsers block CORS/fetch/canvas export under file:// (origin "null").
    // To guarantee no "tainted canvas" / file CORS errors, require serving via http(s).
    if (window.location.protocol === 'file:') {
      window.alert('Download only works when served from a local server.\n\nPlease use VS Code Live Server (http://...) and try again.');
      return;
    }

    if (!window.html2canvas) throw new Error('html2canvas is not available');

    const format = (downloadFormatEl && downloadFormatEl.value) || 'png';
    const asJpeg = format === 'jpg' || format === 'jpeg';
    const canvas = await renderZoneToCanvas(asJpeg);

    const ext = asJpeg ? 'jpg' : 'png';
    const mime = asJpeg ? 'image/jpeg' : 'image/png';
    const quality = asJpeg ? 0.92 : undefined;

    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error('Failed to generate image blob'))),
        mime,
        quality,
      );
    });

    const url = URL.createObjectURL(blob);
    const filename = `doghouse-design.${ext}`;

    try {
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.rel = 'noopener';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } finally {
      // Give the browser a moment to start the download before revoking.
      window.setTimeout(() => URL.revokeObjectURL(url), 2000);
    }
  }

  downloadBtn?.addEventListener('click', async () => {
    try {
      await downloadDesign();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      window.alert(`Download failed.\n\n${msg}`);
    }
  });
})();