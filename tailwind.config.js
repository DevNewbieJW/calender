module.exports = {
  purge: ["./packages/renderer/index.html", "./packages/renderer/src/**/*.{js,jsx}"],
  mode: "jit",
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        PragmataPro: ["Essential PragmataPro"],
        SourceCodePro: ["Source Code Pro"],
      },
      color: {
        lightestPurple: "#4b464f",
        lightPurple: "#584b4f",
        darkPurple: "#3C373F",
        babyBlue: "#89CFF0",
        darkBlue: "#243347",
        darkerBlue: "#1f2937",
        darkRed: "#c6797d",
        dimmedGray: "#adbac7",
      },
      backgroundColor: {
        lightestPurple: "#4b464f",
        lightPurple: "#584b4f",
        darkPurple: "#3C373F",
        babyBlue: "#89CFF0",
        darkBlue: "#243347",
        darkerBlue: "#1f2937",
        darkRed: "#c6797d",
        dimmedGray: "#adbac7",
      },
      borderColor: {
        lightestPurple: "#4b464f",
        lightPurple: "#584b4f",
        darkPurple: "#3C373F",
        babyBlue: "#89CFF0",
        darkBlue: "#243347",
        darkerBlue: "#1f2937",
        darkRed: "#c6797d",
        dimmedGray: "#adbac7",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
