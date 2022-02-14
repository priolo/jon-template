import { red, yellow, green, blue, cyan } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const themeCommon = {
	app: {
		footerbar: {
			height: 30,
			zIndex: 1201,
		},
		drawer: {
			width: 240,
		},
		header: {
			height: 64,
		},
	}
}

export const themeLight = createTheme({
	...themeCommon,
	palette: {
		mode: "light",
		primary: {
			main: blue[800],
		},
		secondary: {
			main: cyan[800],
		},
		error: {
			main: red[800],
		},
		warning: {
			main: yellow[800],
		},
		success: {
			main: green[800],
		},
	}
})

export const themeDark = createTheme({
	...themeCommon,
	palette: {
		mode: "dark",
		primary: {
			main: blue[600],
		},
		secondary: {
			main: cyan[600],
		},
		error: {
			main: red[600],
		},
		warning: {
			main: yellow[600],
		},
		success: {
			main: green[600],
		},
	},
})
