import React, { useRef, useEffect } from 'react';

const HeroBackground = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width, height;
        let blobs = [];
        let animationFrameId;

        // Configuration
        const blobCount = 6;
        const colors = ['#f97316', '#7c3aed', '#3b82f6', '#ec4899', '#f97316']; // Orange, Purple, Blue, Pink
        const baseRadius = 150; // Large blobs

        // Mouse tracking
        let mouse = { x: -1000, y: -1000 };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initBlobs();
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        class Blob {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 1.5; // Slow float
                this.vy = (Math.random() - 0.5) * 1.5;
                this.radius = baseRadius * (0.8 + Math.random() * 0.4); // Random size
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.angle = Math.random() * Math.PI * 2;
                this.angleSpeed = (Math.random() - 0.5) * 0.02;
            }

            update() {
                // Natural floating
                this.x += this.vx;
                this.y += this.vy;

                // Wall bounce
                if (this.x < -this.radius) this.vx = Math.abs(this.vx);
                if (this.x > width + this.radius) this.vx = -Math.abs(this.vx);
                if (this.y < -this.radius) this.vy = Math.abs(this.vy);
                if (this.y > height + this.radius) this.vy = -Math.abs(this.vy);

                // Mouse Repulsion
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const repelDist = 400;

                if (dist < repelDist) {
                    const force = (repelDist - dist) / repelDist;
                    const angle = Math.atan2(dy, dx);
                    this.x += Math.cos(angle) * force * 5; // Push away
                    this.y += Math.sin(angle) * force * 5;
                }

                // Morphing (Simulated by breathing radius)
                this.angle += this.angleSpeed;
                this.currentRadius = this.radius + Math.sin(this.angle) * 20;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        const initBlobs = () => {
            blobs = [];
            for (let i = 0; i < blobCount; i++) {
                blobs.push(new Blob());
            }
        };

        const animate = () => {
            // Trail effect (optional, but clean clearing is better for gradient mesh usually)
            ctx.clearRect(0, 0, width, height);

            // High blur for the "Aurora" mesh effect
            // Note: ctx.filter is performance heavy. If laggy, consider CSS blur on canvas container.
            // Using logic: Draw sharp circles, apply heavy blur via CSS for performance.
            // Wait, standard canvas filter might be okay for 6 blobs. Let's try.

            // Actually, CSS blur is much faster for this specific "gradient mesh" look.
            // So we draw normal circles here and the container has `backdrop-blur` or `blur`.
            // BUT `backdrop-blur` blurs what's BEHIND. We want to blur the canvas itself.
            // So we'll add `blur-3xl` or custom blur to the canvas className.

            // To be safe, let's use a compositing mode that makes them blend nicely.
            ctx.globalCompositeOperation = 'screen'; // or 'lighter'

            blobs.forEach(blob => {
                blob.update();
                blob.draw();
            });

            ctx.globalCompositeOperation = 'source-over'; // Reset

            animationFrameId = requestAnimationFrame(animate);
        };

        // Init
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        handleResize();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-auto bg-black overflow-hidden">
            <canvas
                ref={canvasRef}
                className="block w-full h-full opacity-60 blur-[80px] scale-125"
            // blur-[X] creates the mesh effect. scale-125 hides edges. opacity controls intensity.
            />

            {/* Overlay to darken/texture if needed */}
            <div className="absolute inset-0 bg-transparent" />
        </div>
    );
};

export default HeroBackground;
