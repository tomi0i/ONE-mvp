/** @type {import('tailwindcss').Config} */
module.exports = {
  // テンプレートを探索するパス
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      /* ここにカスタム値を追加 */
      maxWidth: {
        prose: "65ch",        // 読みやすいテキスト幅
      },
      colors: {
        brand: "#2563eb",     // ブランドカラー
      },
      fontFamily: {
        mono: ["Fira Code", "monospace"],
      },
      boxShadow: {
        xl: "0 10px 20px -5px rgba(99, 102, 241, 0.25)",
      },
    },
  },

  plugins: [],
};