module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,html}"],
  theme: {
    extend: {
      // gridTemplateColumns: {
      //   // Simple 16 column grid
      //   auto: "repeat(auto-fill, minmax(250px, 1fr))",
      //   row: "grid-auto-rows: minmax(200px, 250px);"
      // },
      height: {
        // Define un custom height que puedes usar en tus componentes
        heighWithOutNav: "calc(100vh - 5rem - 1px)",
      },
      keyframes: {
        glow: {
          "0%, 100%": { boxShadow: "0 0 10px 2px rgba(6, 182, 212, 0.5)" },
          "50%": { boxShadow: "0 0 20px 4px rgba(6, 182, 212, 1)" },
        },
        move: {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(10px)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        glow: "glow 1.5s ease-in-out infinite",
        move: "move 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
