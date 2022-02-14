/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import makeStyles from '@mui/styles/makeStyles';
import { AppBar, Toolbar, Typography, IconButton, LinearProgress, Grid } from "@mui/material"
import { Menu as MenuIcon } from "@mui/icons-material"

import CentralSpace from "./CentralSpace";
import Avatar from "../app/Avatar";
import UserHeader from "pages/user/UserHeader";
import DocHeader from "pages/doc/DocHeader";

import { useRoute } from "stores/route";
import { useLayout } from "stores/layout";
import LangSelector from 'components/selectors/LangSelector';
import { useTranslation } from 'react-i18next';



function Header() {

	// HOOKs
	const classes = useStyles()
	const { t } = useTranslation()
	const { state: layout, toggleDrawerIsOpen } = useLayout()
	const { state: route } = useRoute()
	

	// RENDER
	const cnAppBar = `${classes.appBar} ${layout.drawerIsOpen && layout.device == "desktop" ? classes.appBarShift : ""}`
	
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
                                size="large"><MenuIcon /></IconButton>}

							{layout.device!="mobile" && <Typography variant="h6" noWrap className={classes.title}>
								{t(layout.title)}
							</Typography>}
							
						</Grid>
					}
					renderRight={<>
						<div className={classes.grow}></div>
						<LangSelector />
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
    );
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
		"&.mobile": {
			marginLeft: "0px",
			width: "100%",
		},
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