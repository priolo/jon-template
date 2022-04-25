/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import { AppBar, Toolbar, Typography, IconButton, LinearProgress, Grid, Box } from "@mui/material"
import { Menu as MenuIcon } from "@mui/icons-material"

import CentralSpace from "./CentralSpace";
import Avatar from "../app/Avatar";
import UserHeader from "pages/user/UserHeader";
import DocHeader from "pages/doc/DocHeader";

import LangSelector from 'components/selectors/LangSelector';
import { useTranslation } from 'react-i18next';

import layoutStore from "stores/layout";
import routeStore from "stores/route";
import { useStore17 } from "@priolo/jon";


function Header() {

	// HOOKs
	const { t } = useTranslation()

	const layout = useStore17(layoutStore)
	const { toggleDrawerIsOpen } = layoutStore
	const route = useStore17(routeStore)


	// RENDER
	const sxAppBar = theme => cssAppBar(theme, layout.drawerIsOpen && layout.device == "desktop")

	return (
		<AppBar position="fixed" sx={sxAppBar}>
			<Toolbar>

				<CentralSpace
					isCentered
					renderLeft={
						<Grid container alignItems="center" wrap="nowrap">

							{!layout.drawerIsOpen && <IconButton
								onClick={toggleDrawerIsOpen}
								edge="start"
								sx={cssMenuButton}
								size="large"><MenuIcon /></IconButton>}

							{layout.device != "mobile" && <Typography variant="h6" noWrap sx={cssTitle}>
								{t(layout.title)}
							</Typography>}

						</Grid>
					}
					renderRight={<>
						<Box sx={cssGrow} />
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


const cssAppBar = (theme, isOpen) => ({
	//zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(isOpen && {
		marginLeft: theme.app.drawer.width,
		width: `calc(100% - ${theme.app.drawer.width})`,
		"&.mobile": {
			marginLeft: "0px",
			width: "100%",
		},
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	})
})

const cssMenuButton = theme => ({
	color: "inherit",
	marginRight: "10px",
})

const cssTitle = theme => ({
	minWidth: "150px",
})
const cssGrow = theme => ({
	flexGrow: 1,
})
