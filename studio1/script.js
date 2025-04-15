(function() {
    "use strict";

    var video = document.getElementById("myVideo");
    var muteBtn = document.getElementById("muteBtn");
    var playPauseBtn = document.getElementById("playPauseBtn");
    var fullscreenBtn = document.getElementById("fullscreenBtn");
    var slider = document.getElementById("colorSlider");
    var sliderFire = document.getElementById("sliderFire");

    var trackTop = 10;
    var trackBottom = 290;
    var fireHeight = 30;

    var isDragging = false;

    slider.addEventListener("mousedown", function(e) {
        isDragging = true;
        updateSlider(e);
    });

    document.addEventListener("mousemove", function(e) {
        if (isDragging) {
            updateSlider(e);
        }
    });

    document.addEventListener("mouseup", function() {
        isDragging = false;
    });

    function updateSlider(e) {
        const svg = document.getElementById('colorSlider');
        const svgRect = svg.getBoundingClientRect();
        
        let y = e.clientY - svgRect.top;
        
        const fireHeight = 60; // matches the height in SVG
        
        // restrict movement: from top of SVG to bottom of path minus fire height
        y = Math.max(0, Math.min(y, 300 - fireHeight));
        
        // update fire position
        sliderFire.setAttribute('y', y);
        
        // calculate and update grayscale value
        const percentage = (300 - fireHeight - y) / (300 - fireHeight);
        const grayscaleValue = (1 - percentage) * 100;
        video.style.filter = `grayscale(${grayscaleValue}%)`;
    }


    muteBtn.addEventListener("click", function() {
        video.muted = !video.muted;
        var icon = muteBtn.querySelector("i");
        if (video.muted) {
            icon.className = "fa-solid fa-volume-xmark";
        } else {
            icon.className = "fa-solid fa-volume-high";
        }
    });

    playPauseBtn.addEventListener("click", function() {
        var icon = playPauseBtn.querySelector("i");
        if (video.paused) {
            video.play();
            icon.className = "fa-solid fa-pause";
        } else {
            video.pause();
            icon.className = "fa-solid fa-play";
        }
    });

    fullscreenBtn.addEventListener("click", function() {
        if (!document.fullscreenElement) {
            video.requestFullscreen().catch(function(err) {
                console.error("Error attempting to enable full-screen mode: " + err.message);
            });
        } else {
            document.exitFullscreen();
        }
    });
})();