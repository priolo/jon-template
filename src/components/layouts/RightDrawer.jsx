import { Drawer, Grid, IconButton, makeStyles, Typography } from "@material-ui/core"
import { Close as CloseIcon } from '@material-ui/icons'
import { useLayout } from "../../stores/layout"
import { Switch, Route } from 'react-router-dom';
import DocFilters from "../../pages/doc/DocFilters";


function RightDrawer() {

	const classes = useStyles()
	const { state: layout, setDrawerRightIsOpen } = useLayout()


	const handleClickClose = ()=> setDrawerRightIsOpen(false)

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

				<Switch>
					<Route path="/docs">
						<DocFilters />
					</Route>
				</Switch>

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