import { Drawer, Grid, IconButton, makeStyles, Typography } from "@material-ui/core"
import { Close as CloseIcon } from '@material-ui/icons'
import { useLayout } from "../../stores/layout"
import DocFilters from "../../pages/doc/DocFilters";
import { useRoute } from "../../stores/route";
import { useEffect } from "react";


function RightDrawer() {

	const classes = useStyles()
	const { state: layout, setDrawerRightIsOpen } = useLayout()
	const { state:route, haveSearchExtra } = useRoute()


	const handleClickClose = ()=> setDrawerRightIsOpen(false)

	const renderCont = {
		"doc.list": <DocFilters />,
	}[route.currentPage] ?? null

	const haveExtra = haveSearchExtra()

	useEffect (()=>{
		if ( !renderCont ) setDrawerRightIsOpen(false)
		else if ( haveExtra ) setDrawerRightIsOpen(true)
	},[route.currentPage,haveExtra])


	

	return (
		<Drawer anchor="right" variant="persistent"
			open={layout.drawerRightIsOpen}
		>
			<Grid container direction="column" className={classes.container}>

				<Grid item container alignItems="center">
					<IconButton onClick={handleClickClose}>
						<CloseIcon />
					</IconButton>
				</Grid>

				{renderCont}

			</Grid>
		</Drawer>
	)
}

export default RightDrawer

const useStyles = makeStyles(theme => ({
	container: {
		marginTop: theme.app.header.height,
		width: theme.app.drawer.width,
	}
}));