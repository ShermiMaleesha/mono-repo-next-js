const baseConfig = require('../base-ui/tailwind.config');

module.exports = {
  presets: [baseConfig],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
