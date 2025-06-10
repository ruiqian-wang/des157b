document.addEventListener('DOMContentLoaded', function() {
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
                    
                    // Dynamic contrail opacity based on scroll speed
                    const scrollVelocity = Math.abs(self.getVelocity()) / 1000;
                    gsap.set('.plane-contrail', {
                        opacity: Math.min(scrollVelocity * 2, 1),
                        scaleX: 1 + scrollVelocity
                    });
                }
            }
        });

        // Add event listeners for yes/no buttons
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.target.id === 'yesBtn') {
                    alert('Great! Welcome to the future of learning! 🚀');
                } else if (e.target.id === 'noBtn') {
                    alert('That\'s okay! The future is still being written. 📝');
                }
            });
        });
    });