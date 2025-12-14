import React, { useEffect, useState } from 'react';

const GlowingCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hidden, setHidden] = useState(false);
    const [click, setClick] = useState(false);

    useEffect(() => {
        const addEventListeners = () => {
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseenter", onMouseEnter);
            document.addEventListener("mouseleave", onMouseLeave);
            document.addEventListener("mousedown", onMouseDown);
            document.addEventListener("mouseup", onMouseUp);
        };

        const removeEventListeners = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseenter", onMouseEnter);
            document.removeEventListener("mouseleave", onMouseLeave);
            document.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("mouseup", onMouseUp);
        };

        const onMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const onMouseEnter = () => {
            setHidden(false);
        };

        const onMouseLeave = () => {
            setHidden(true);
        };

        const onMouseDown = () => {
            setClick(true);
        };

        const onMouseUp = () => {
            setClick(false);
        };

        addEventListeners();
        return () => removeEventListeners();
    }, []);

    const isMobile = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    if (isMobile()) return null;

    return (
        <div
            className={`fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-100 ease-out`}
            style={{
                top: 0,
                left: 0,
                transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
            }}
        >
            <div
                className={`
                    w-8 h-8 rounded-full bg-orange-500 opacity-50 blur-lg 
                    transform -translate-x-1/2 -translate-y-1/2
                    transition-all duration-300 ease-out
                    ${click ? 'scale-75 opacity-70' : 'scale-100'}
                    ${hidden ? 'opacity-0' : ''}
                `}
            />
            <div
                className={`
                    absolute top-0 left-0 w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-[100px]
                    transform -translate-x-1/2 -translate-y-1/2 -z-10
                    transition-opacity duration-300
                    ${hidden ? 'opacity-0' : 'opacity-100'}
                `}
            />
        </div>
    );
};

export default GlowingCursor;
