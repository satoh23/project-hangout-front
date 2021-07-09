module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      nav: [
        // mac
        "Noteworthy",
        "ヒラギノ明朝 ProN",
        "Hiragino Mincho ProN",
        // windows
        "Segoe Print",
        "Yu Mincho Light",
        "YuMincho",
        "Yu Mincho",
        "游明朝体",
      ],
      body: [
        // mac
        "ヒラギノ明朝 ProN",
        "Hiragino Mincho ProN",
        // windows
        "Yu Mincho Light",
        "YuMincho",
        "Yu Mincho",
        "游明朝体",
      ]
    },
    extend: {
      colors: {
        "white-pink": "#fef9fb",
        "powder-pink": "#f5ecf4",
      },
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
