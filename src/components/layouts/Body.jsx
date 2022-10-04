import layoutStore from "stores/layout";
import { useStore } from "@priolo/jon";
import { Box } from "@mui/material";



function Body({
	children
}) {

	// HOOKs
	const layout = useStore(layoutStore)

	// RENDER
	const sxContent = theme => cssContent(theme, layout.drawerIsOpen && layout.device == "desktop")

	return (
		<Box sx={sxContent}>
			<Box sx={cssDrawerHeader} />
			{children}
		</Box>
	)
}

export default Body

const cssContent = (theme, isOpen) => ({
	display: "flex", flexDirection: "column",
	height: "100%",
	transition: theme.transitions.create("margin", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	marginLeft: 0,
	...(isOpen && {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: theme.app.drawer.width,
	}),
})
const cssDrawerHeader = theme => ({
	// necessary for content to be below app bar
	flex: `0 1 ${theme.app.header}`,
	...theme.mixins.toolbar
})
