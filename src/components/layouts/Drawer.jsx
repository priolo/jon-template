import { Divider, Drawer, IconButton, List, Box } from "@mui/material"
import { ChevronLeft as ChevronLeftIcon } from "@mui/icons-material"

import ItemMenu from "./ItemMenu"
import { useStore } from "@priolo/jon"
import layoutStr from "stores/layout"


function MainDrawer() {

	// HOOKs
	const layout = useStore(layoutStr)

	// RENDER
	const variant = layout.device == "desktop" ? "persistent" : null

	return (
		<Drawer sx={cssDrawer}
			variant={variant}
			open={layout.drawerIsOpen}
			ModalProps={{ onBackdropClick: layoutStr.toggleDrawerIsOpen }}
		>
			<Box sx={cssDrawerHeader}>
				<IconButton onClick={layoutStr.toggleDrawerIsOpen} size="large">
					<ChevronLeftIcon />
				</IconButton>
			</Box>
			<Divider />
			<List>
				{layoutStr.getDrawerList().map(item => (
					<ItemMenu value={item} key={item.label} />
				))}
			</List>
		</Drawer>
	);
}

export default MainDrawer

const cssDrawer = theme => ({
	width: theme.app.drawer.width,
	flexShrink: 0,
	"& .MuiDrawer-paper": {width: theme.app.drawer.width},
})
const cssDrawerHeader = theme => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-end"
})
