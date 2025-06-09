/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray': 'rgb(195, 198, 200)',
        'custom-gray-2': 'rgb(102, 103, 103)',
        'custom-gray-3': 'rgb(142, 138, 138)',
        'custom-blue':' #0e7fea',
        'custom-blue-2':' rgb(43, 43, 215)',
      },
    },
  },
  plugins: [],
}