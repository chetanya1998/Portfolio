/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#080808",
                card: "rgba(255,255,255,0.04)",
                cardBorder: "rgba(255,255,255,0.10)",
                textPrimary: "#F8F8F8",
                textSecondary: "#A1A1AA",
                textMuted: "#71717A",
                neonOrange: "#FF6A00",
                electricBlue: "#00D4FF",
                violet: "#8B5CF6",
                neonPink: "#FF2E88",
                acidGreen: "#B6FF00"
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Montserrat', 'sans-serif'],
                mono: ['Space Mono', 'monospace'],
            },
            animation: {
                'glitch': 'glitch 1s linear infinite',
                'scanline': 'scanline 10s linear infinite',
            },
            keyframes: {
                glitch: {
                    '2%, 64%': { transform: 'translate(2px, 0) skew(0deg)' },
                    '4%, 60%': { transform: 'translate(-2px, 0) skew(0deg)' },
                    '62%': { transform: 'translate(0, 0) skew(5deg)' },
                },
                scanline: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100vh)' }
                }
            }
        },
    },
    plugins: [],
}
