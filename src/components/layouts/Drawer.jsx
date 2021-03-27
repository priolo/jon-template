import React from "react"
import { useStore } from "@priolo/iistore";

import {makeStyles} from "@material-ui/core/styles"
import {Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import {ChevronLeft as ChevronLeftIcon} from "@material-ui/icons"

import { useHistory } from "react-router-dom";
import { useLayout } from "../../stores/layout";


export default function () {

	const {state: layout, toggleDrawerIsOpen, getDrawerList} = useLayout()
	const classes = useStyles()
	const history = useHistory()
	const handleClick = item => history.push(item.route)

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
				{getDrawerList().map( (item, index) => (
					<ListItem button key={item.label} 
						onClick={() => handleClick(item)} 
					>
						<ListItemIcon>
							<item.icon />
						</ListItemIcon>
						<ListItemText primary={item.label} />
					</ListItem>
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
