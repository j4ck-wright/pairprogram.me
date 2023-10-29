/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['Lato', 'sans-serif']
		},
		extend: {}
	},
	plugins: [require('daisyui')],
	daisyui: {
		logs: false,
		themes: [
			{
				light: {
					primary: '#FF8A00',
					secondary: '#1c1917',
					accent: '#854d0e',
					neutral: '#1e1523',
					'base-100': '#f5f5f4',
					info: '#98d6f0',
					success: '#14a374',
					warning: '#df8e16',
					error: '#e34a61'
				}
			},
			{
				dark: {
					primary: '#FF8A00',
					secondary: '#1c1917',
					accent: '#854d0e',
					neutral: '#f5f5f4',
					'base-100': '#070421',
					info: '#98d6f0',
					success: '#14a374',
					warning: '#df8e16',
					error: '#e34a61'
				}
			}
		]
	}
};
