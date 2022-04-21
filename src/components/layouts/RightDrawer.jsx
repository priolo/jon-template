/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Drawer, Grid, IconButton, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Close as CloseIcon } from '@mui/icons-material'

import DocFilters from "pages/doc/DocFilters";

import layoutStore from "stores/layout";
import routeStore from "stores/route";
import { useStore17 } from "@priolo/jon";



function RightDrawer() {

	// HOOKs
	const classes = useStyles()
	const { t } = useTranslation()

	const layout = useStore17(layoutStore)
	const {setDrawerRightIsOpen} = layoutStore
	const route = useStore17(routeStore)
	const {haveSearchExtra} = routeStore

	const haveExtra = haveSearchExtra()

	useEffect(() => {
		if (!renderCont) setDrawerRightIsOpen(false)
		else if (haveExtra) setDrawerRightIsOpen(true)
	}, [route.currentPage, haveExtra])

	
	// HANDLEs	
	const handleClickClose = () => setDrawerRightIsOpen(false)


	// RENDER
	const renderCont = {
		"doc.list": <DocFilters />,
	}[route.currentPage] ?? null

	return (
        <Drawer anchor="right" variant="persistent"
			open={layout.drawerRightIsOpen}
		>
			<Grid container direction="column" className={classes.container}>

				<Grid item container alignItems="center">
					<Grid xs item>
						<Typography>{t("drawer.rigth.title")}</Typography>
					</Grid>
					<IconButton onClick={handleClickClose} size="large">
						<CloseIcon />
					</IconButton>
				</Grid>

				{renderCont}

			</Grid>
		</Drawer>
    );
}

export default RightDrawer

const useStyles = makeStyles(theme => ({
	container: {
		margin: `${theme.app.header.height+10}px 15px 10px 15px`,
		width: theme.app.drawer.width,
	}
	
}));