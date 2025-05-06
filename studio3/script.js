(function(){
    'use strict';

    const resetBtn = document.getElementById('resetBtn');

    resetBtn.addEventListener('click', function() {
    document.querySelectorAll('.draggable').forEach(function(el) {
        el.style.transform = 'translate(0px, 0px)';
    });
    
    position.x = 0;
    position.y = 0;
    });


    var granimInstance = new Granim({
        element: '#canvas-basic',
        direction: 'diagonal',
        isPausedWhenNotInView: true,
        states : {
          "default-state": {
            gradients: [
                ['#F2ECE6', '#D3B8A3'],
                ['#E6E2DD', '#B0ADA9'],
                ['#DDD9DC', '#A9A3AC']
            ],
            transitionSpeed: 2000
          }
        }
      });



})(); 