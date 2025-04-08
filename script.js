
(function() {
    'use strict';
  
    const buttonLight = document.getElementById('button-light');
    const buttonDark  = document.getElementById('button-dark');
    const body        = document.body;
    const header      = document.querySelector('header');
    const banner      = document.getElementById('banner');
    const bannerH2    = document.querySelector('#banner h2');
    const bannerH3    = document.querySelector('#banner h3');
    const h1Elements  = document.querySelectorAll('h1');
    const headerA     = document.querySelector('header a');
    const cards       = document.querySelectorAll('.card');
    const cursor      = document.querySelector('.cursor');
    buttonDark.style.display = 'none';
  
    function swapImages(darkMode) {
      const imgs = document.querySelectorAll('img');
      imgs.forEach(img => {
        let src = img.getAttribute('src');
        if (darkMode) {
          if (src === 'images/Group 7.svg') {
            img.setAttribute('src', 'images/Group 14.svg');
          } else if (src === 'images/Group 9.svg') {
            img.setAttribute('src', 'images/Group 16.svg');
          } else if (src === 'images/Group 10.svg') {
            img.setAttribute('src', 'images/Group 15.svg');
          } else if (src === 'images/Group 11.svg') {
            img.setAttribute('src', 'images/Group 17.svg');
          } else if (src === 'images/bottom.svg') {
            img.setAttribute('src', 'images/bottom-dark.svg');
          }
        } else {
          if (src === 'images/Group 14.svg') {
            img.setAttribute('src', 'images/Group 7.svg');
          } else if (src === 'images/Group 16.svg') {
            img.setAttribute('src', 'images/Group 9.svg');
          } else if (src === 'images/Group 15.svg') {
            img.setAttribute('src', 'images/Group 10.svg');
          } else if (src === 'images/Group 17.svg') {
            img.setAttribute('src', 'images/Group 11.svg');
          } else if (src === 'images/bottom-dark.svg') {
            img.setAttribute('src', 'images/bottom.svg');
          }
        }
      });
    }
  
    buttonLight.addEventListener('click', function() {
      body.classList.add('switch');
      header.classList.add('switch');
      banner.classList.add('switch');
      bannerH2.classList.add('switch');
      bannerH3.classList.add('switch');
      h1Elements.forEach(el => el.classList.add('switch'));
      headerA.classList.add('switch');
      cards.forEach(card => card.classList.add('switch'));
      cursor.classList.add('switch');
      swapImages(true);
  
      buttonLight.style.display = 'none';
      buttonDark.style.display  = 'block';
    });
  
    buttonDark.addEventListener('click', function() {
      body.classList.remove('switch');
      header.classList.remove('switch');
      banner.classList.remove('switch');
      bannerH2.classList.remove('switch');
      bannerH3.classList.remove('switch');
      h1Elements.forEach(el => el.classList.remove('switch'));
      headerA.classList.remove('switch');
      cards.forEach(card => card.classList.remove('switch'));
      cursor.classList.remove('switch');
      swapImages(false);
      
      buttonDark.style.display  = 'none';
      buttonLight.style.display = 'block';
    });
  })();