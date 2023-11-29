/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			sans: ['"Gotham Narrow"', 'sans-serif']
	},
	extend: {

	},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/container-queries'),
	],
	darkMode: 'class',

}