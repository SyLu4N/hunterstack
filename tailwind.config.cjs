/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],

	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],

	theme: {
		extend: {
			colors: {
				midnight: '#121063',
				tahiti: '#3ab7bf',
				bermuda: '#78dcca',

				background: {
					100: '#6A7082',
					200: '#555A68',
					300: '#40444E',
					400: '#2C2F36',
					500: '#1A1D23',
					600: '#181A20',
					700: '#14151A',
					800: '#101011',
					900: '#0B0C0F',
				},

				letter: {
					100: '#777777',
					200: '#999999',
					300: '#BBBBBB',
					400: '#F8F8F8',
					500: '#FFFFFF',
					600: '#F7F7F7',
					700: '#F5F5F5',
					800: '#F0F0F0',
					900: '#E6E6E6',
				},

				primary: {
					100: '#C4FFC2',
					300: '#8CFF7A',
					500: '#30FF11',
					700: '#26CC0A',
					900: '#1A9900',
				},

				reground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					1: 'hsl(var(--chart-1))',
					2: 'hsl(var(--chart-2))',
					3: 'hsl(var(--chart-3))',
					4: 'hsl(var(--chart-4))',
					5: 'hsl(var(--chart-5))',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
		},
	},

	plugins: [require('tailwindcss-animate')],
};
