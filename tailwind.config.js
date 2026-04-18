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
        // 杂志风格配色
        'magazine': {
          'bg': '#FAFAFA',
          'text': '#1A1A1A',
          'secondary': '#666666',
          'accent': '#C9A962',
          'border': '#E5E5E5',
          'card': '#FFFFFF',
        },
        // 保留埃及主题色作为点缀
        'egypt': {
          'gold': '#C9A962',
          'sand': '#F5F0E8',
          'blue': '#2C3E50',
        },
      },
      fontFamily: {
        'serif': ['Georgia', 'Times New Roman', 'serif'],
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'PingFang SC', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
