import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        white: "#ffffff",
        blue_50: "#EDF1FD",
        blue_100: "#C8D4FA",
        blue_200: "#ADC0F8",
        blue_300: "#88A3F4",
        blue_400: "#7191F2",
        blue_500: "#4D75EF",
        blue_600: "#466AD9",
        blue_700: "#3753AA",
        blue_800: "#2A4083",
        blue_900: "#203164",
        black: "#4D4D4D",
        gray_100: "#F8FAFF",
        gray_200: "#E6ECFB",
        gray_300: "#CAD0E0",
        gray_400: "#B3B9C7",
        gray_500: "#929AAD",
        gray_600: "#7C8394"
      },
      keyframes: {
        'blink': {
          '0%, 100%': { opacity: '1' },   // 시작과 끝에 이미지가 보이도록 설정
          '50%': { opacity: '0' },        // 중간에 사라지도록 설정
        },
      },
      animation: {
        'blink': 'blink 1s steps(5, start) infinite', // 깜빡거리는 효과를 1초 간격으로 무한 반복
      },
    },
  },
  plugins: [],
};

export default config;
