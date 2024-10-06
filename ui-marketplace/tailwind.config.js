module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,html}"],
  theme: {
    extend: {
      width: {
        128: "32rem", // Añadir un nuevo valor, por ejemplo, w-128 (equivalente a 512px)
      },
      height: {
        // Define un custom height que puedes usar en tus componentes
        heighWithOutNav: "calc(100vh - 5rem)",
        128: "32rem"
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
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "50%": { transform: "translateX(5px)" },
          "75%": { transform: "translateX(-5px)" },
        },
      },
      animation: {
        glow: "glow 1.5s ease-in-out infinite",
        move: "move 2s ease-in-out infinite",
        shake: "shake 0.5s ease-in-out 1",
      },
    },
  },
  plugins: [],
};
