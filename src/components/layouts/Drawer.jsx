import React from "react"

import {makeStyles} from "@material-ui/core/styles"
import {Divider, Drawer, IconButton, List } from "@material-ui/core"
import {ChevronLeft as ChevronLeftIcon} from "@material-ui/icons"

import { useLayout } from "../../stores/layout";
import ItemMenu from "./ItemMenu";


export default function () {

	const {state: layout, toggleDrawerIsOpen, getDrawerList} = useLayout()
	const classes = useStyles()
	
	return (
		<Drawer
			variant="persistent"
			className={classes.drawer}
			open={layout.drawerIsOpen}
			classes={{ paper: classes.drawerPaper }}
		>
			<div className={classes.drawerHeader}>
				<IconButton onClick={toggleDrawerIsOpen}>
					<ChevronLeftIcon />
				</IconButton>
			</div>
			<Divider />
			<List>
				{getDrawerList().map( item => (
					<ItemMenu value={item} key={item.label}/>
				))}
			</List>
		</Drawer>
	)
}

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
