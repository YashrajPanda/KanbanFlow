/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                deepNavy: '#0f172a',
                neonBlue: '#3b82f6',
                fuchsia: '#d946ef'
            }
        },
    },
    plugins: [],
}
