import { useMediaQuery, useTheme } from "@material-ui/core";


export function useIsMobile() {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('sm'));
	return matches
}