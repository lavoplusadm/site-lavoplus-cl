/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // Colores del logo Lavoplus
        brand: {
          navy: '#1A4B7D',      // Azul oscuro del texto "Lavoplus"
          blue: '#3B9FE8',      // Azul celeste del símbolo
          light: '#7DC5F5',     // Azul claro más suave
        },
        // Paleta extendida con colores vivos
        accent: {
          yellow: '#FFB800',    // Amarillo vibrante para destacar
          orange: '#FF8C42',    // Naranja energético
          coral: '#FF6B6B',     // Coral/rojo suave
          teal: '#20C997',      // Verde azulado fresco
          purple: '#9B59B6',    // Púrpura moderno
        },
        // Grises neutros
        neutral: {
          50: '#F8F9FA',
          100: '#F1F3F5',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#ADB5BD',
          600: '#6C757D',
          700: '#495057',
          800: '#343A40',
          900: '#212529',
        },
      },
    },
  },
  plugins: [],
}
