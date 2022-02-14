/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import makeStyles from '@mui/styles/makeStyles';
import { Divider, Drawer, IconButton, List } from "@mui/material"
import { ChevronLeft as ChevronLeftIcon } from "@mui/icons-material"

import ItemMenu from "./ItemMenu"

import { useLayout } from "stores/layout"


function MainDrawer () {

	// HOOKs
	const { state: layout, toggleDrawerIsOpen, getDrawerList } = useLayout()
	const classes = useStyles()


	// RENDER
	const variant = layout.device == "desktop" ? "persistent" : null
	
	return (
        <Drawer
			variant={variant}
			className={classes.drawer}
			open={layout.drawerIsOpen}
			classes={{ paper: classes.drawerPaper }}
			ModalProps={{ onBackdropClick: toggleDrawerIsOpen }}
		>
			<div className={classes.drawerHeader}>
				<IconButton onClick={toggleDrawerIsOpen} size="large">
					<ChevronLeftIcon />
				</IconButton>
			</div>
			<Divider />
			<List>
				{getDrawerList().map(item => (
					<ItemMenu value={item} key={item.label} />
				))}
			</List>
		</Drawer>
    );
}

export default MainDrawer

const useStyles = makeStyles((theme) => ({
	drawer: {
		width: theme.app.drawer.width,
		flexShrink: 0
	},
	drawerPaper: {
		width: theme.app.drawer.width
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: "flex-end"
	}
}))
