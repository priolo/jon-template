import React from "react"
import { useStore } from "@priolo/iistore";

import {makeStyles} from "@material-ui/core/styles"


export default function ({children}) {

	const classes = useStyles()
	const {state: layout} = useStore("layout")
	const cnContent = `${classes.content} ${layout.drawerIsOpen ? classes.contentShift : ""}`

	return (
		<main className={cnContent}>
			<div className={classes.drawerHeader} />
			{children}
		</main>
	)
}

const useStyles = makeStyles((theme) => ({
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginLeft: 0
	},
	contentShift: {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: theme.app.drawer.width,
	},
	drawerHeader: {
		// necessary for content to be below app bar
		...theme.mixins.toolbar
	}
}))
