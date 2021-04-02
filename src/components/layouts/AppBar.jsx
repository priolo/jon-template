import React from "react"
import { useStore } from "@priolo/iistore";
import { makeStyles } from "@material-ui/core/styles"
import { Menu as MenuIcon } from "@material-ui/icons"
import { AppBar, Toolbar, Typography, IconButton, LinearProgress, Grid, useTheme, useMediaQuery } from "@material-ui/core"
import CentralSpace from "./CentralSpace";
import Avatar from "../app/Avatar";
import UserHeader from "../../pages/user/UserHeader";
import DocHeader from "../../pages/doc/DocHeader";
import { useRoute } from "../../stores/route";



function Header() {

	const classes = useStyles()
	const theme = useTheme();
  	const matches = useMediaQuery(theme.breakpoints.up('md'));
	const { state: layout, toggleDrawerIsOpen } = useStore("layout")
	const { state: route, getTitleCurrentPage } = useRoute()

	const cnAppBar = `${classes.appBar} ${layout.drawerIsOpen ? classes.appBarShift : ""}`
	const title = getTitleCurrentPage()

	return (
		<AppBar position="fixed" className={cnAppBar}>
			<Toolbar>

				<CentralSpace
					isCentered
					renderLeft={
						<Grid container alignItems="center" wrap="nowrap">

							{!layout.drawerIsOpen && <IconButton
								onClick={toggleDrawerIsOpen}
								edge="start"
								className={classes.menuButton}
							><MenuIcon /></IconButton>}

							{matches && <Typography variant="h6" noWrap className={classes.title}>
								{title}
							</Typography>}
							
						</Grid>
					}
					renderRight={<>
						<div className={classes.grow}></div>
						<Avatar />
					</>}
				>

					{{
						"user.list": <UserHeader />,
						"doc.list": <DocHeader />,
					}[route.currentPage] ?? null}

				</CentralSpace>

			</Toolbar>

			{layout.busy && <LinearProgress />}

		</AppBar>
	)
}

export default Header

const useStyles = makeStyles(theme => ({
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: theme.app.drawer.width,
		width: `calc(100% - ${theme.app.drawer.width}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		color: "inherit",
		marginRight: "10px",
	},

	title: {
		minWidth: "150px",
	},
	grow: {
		flexGrow: 1,
	},

}));