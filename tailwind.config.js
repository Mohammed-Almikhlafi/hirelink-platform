const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    // 3️⃣ نجعل جميع كلاسّات Tailwind !important تلقائي
    important: true,

    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                bgMain: 'var(--color-bg-main)',
                bgSecondary: 'var(--color-bg-secondary)',
                textMain: 'var(--color-text-main)',
                textBody: 'var(--color-text-body)',
                primary: {
                    DEFAULT: 'var(--color-primary)',
                    hover: 'var(--color-primary-hover)',
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: 'var(--color-primary)',
                    600: 'var(--color-primary-hover)',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                    950: '#172554',
                },
                accent: {
                    DEFAULT: 'var(--color-accent)',
                    hover: 'var(--color-accent-hover)',
                    50: '#f5f3ff',
                    100: '#ede9fe',
                    200: '#ddd6fe',
                    300: '#c4b5fd',
                    400: '#a78bfa',
                    500: 'var(--color-accent)',
                    600: 'var(--color-accent-hover)',
                    700: '#6d28d9',
                    800: '#5b21b6',
                    900: '#4c1d95',
                    950: '#2e1065',
                },
                success: 'var(--color-success)',
                error: 'var(--color-error)',
                border: 'var(--color-border)',
            },
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            boxShadow: {
                'glow': '0 0 30px -5px var(--color-primary)',
            },
        },
    },

    plugins: [
        require('@tailwindcss/forms'),
    ],
};
