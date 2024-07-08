/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                text: "#ffffffde",
                background: "#1d222b",
                accent: "#9c2ce8",
                secondary: "#212631",
                primary: "#5951da",

                "border-color": "#323a49",
            },
        },
    },
    plugins: [],
};
