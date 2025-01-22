export default {
    purge: ['./src/**/*.{js,jsx,ts,tsx}'],
    
    theme: {
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
      themes: ["corporate", "night"],
    },
  };