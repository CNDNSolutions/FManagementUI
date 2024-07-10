/** @type {import('tailwindcss').Config} */
export default {
    important: "#app",
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                text: "#ffffffde",
                "secondary-text": "#ffffff99",
                background: "#1d222b",
                accent: "#9c2ce8",
                secondary: "#212631",
                primary: "#5951da",

                "border-color": "#323a49",
            },
        },
    },
    plugins: [require("@tailwindcss/container-queries")],
};
