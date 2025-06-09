document.addEventListener('DOMContentLoaded', function() {
        document.querySelector('.interactive-btn').addEventListener('click', function() {
            alert('3D model in construction!');
        });

        gsap.registerPlugin(ScrollTrigger);

        const track = document.querySelector('.timeline-track');
        const items = gsap.utils.toArray('.timeline-item');
        const progressBar = document.querySelector('.progress-bar');
        const plane = document.querySelector('.timeline-plane');
        const markers = gsap.utils.toArray('.progress-marker');
        const totalScroll = track.scrollWidth - window.innerWidth;

        gsap.to(track, {
            x: () => -totalScroll,
            ease: "none",
            scrollTrigger: {
                trigger: ".timeline",
                start: "top+=50 top",
                end: () => `+=${totalScroll}`,
                scrub: 1,
                pin: true,
                 anticipatePin: 1,
                snap: {
                    snapTo: (value) => {
                        const snapPositions = items.map((_, i) => i / (items.length - 1));
                        const slideFraction = 1 / (items.length - 1);
                        if (value < slideFraction / 2) {
                            return 0;
                        } else if (value > 1 - slideFraction / 2) {
                            return 1;
                        }
                        return snapPositions.reduce((prev, curr) =>
                            Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
                        );
                    },
                    duration: 0.3,
                    delay: 0.1,
                    ease: "power1.inOut"
                },
                    onUpdate: self => {
                        // Update progress bar
                        const progress = self.progress * 100;
                        progressBar.style.width = `${progress.toFixed(2)}%`;
                        
                        // Animate plane with advanced movements
                        gsap.set(plane, {
                            rotation: self.progress * 720 + Math.sin(self.progress * Math.PI * 8) * 15, // Multiple rotations with wobble
                            scale: 1 + Math.sin(self.progress * Math.PI * 6) * 0.2, // Pulsing scale
                            y: Math.sin(self.progress * Math.PI * 12) * 8 // Vertical bobbing
                        });
                        
                        // Update milestone markers
                        const currentIndex = Math.round(self.progress * (items.length - 1));
                        markers.forEach((marker, index) => {
                            if (index <= currentIndex) {
                                marker.classList.add('active');
                            } else {
                                marker.classList.remove('active');
                            }
                        });
                        
                        // Add active class to current timeline item
                        items.forEach((item, index) => {
                            if (index === currentIndex) {
                                item.classList.add('active');
                            } else {
                                item.classList.remove('active');
                            }
                        });
                        
                        // Dynamic contrail opacity based on scroll speed
                        const scrollVelocity = Math.abs(self.getVelocity()) / 1000;
                        gsap.set('.plane-contrail', {
                            opacity: Math.min(scrollVelocity * 2, 1),
                            scaleX: 1 + scrollVelocity
                        });
                    }
                }
            });

        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.target.id === 'yesBtn') {
                    alert('Great! Welcome to the future of learning! 🚀');
                } else {
                    alert('That\'s okay! The future is still being written. 📝');
                }
            });
        });
    });