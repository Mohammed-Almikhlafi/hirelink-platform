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
                primary: 'var(--color-primary)',
                primaryHover: 'var(--color-primary-hover)',
            },
        },
    },

    plugins: [
        require('@tailwindcss/forms'),
    ],
};
