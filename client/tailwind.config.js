/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		fontFamily: {
			whisper: ['Whisper']
		},
		extend: {
			/* Hide scrollbar for IE, Edge and Firefox */
			no_scrollbar: {
				'-ms-overflow-style': 'none',  /* IE and Edge */
				'scrollbar-width': 'none',  /* Firefox */
			},
			backgroundColor: {},
			colors: {
				follow: '#0095F6',
				'main-light-first': '#737373',
				'main-light-second': '#262626',
				'main-dark-first': '#F5F5F5',
				'main-dark-second': '#A8A8A8'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
}