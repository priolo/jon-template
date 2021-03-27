import React from 'react'
import { makeStyles } from "@material-ui/core"
import CentralSpace from '../layouts/CentralSpace'


export default function Form({
	children,
	renderFooter,
	renderMenu,
}) {

	const classes = useStyles()

	return (
		<div className={classes.frame}>

			<CentralSpace
				className={classes.body}
				renderRight={renderMenu && (
					<div className={classes.menu}>
						{renderMenu}
					</div>
				)}
			>
				{children}
			</CentralSpace>

			{renderFooter && (
				<CentralSpace className={classes.footer}>
					{renderFooter}
				</CentralSpace>
			)}

		</div>
	)
}


const useStyles = makeStyles(theme => ({
	frame: {
		display: "flex", flexDirection: "column",
		height: "100%",
	},
	body: {
		marginBottom: "50px",
	},
	menu: {
		display: "flex", flexDirection: "column",
		position: "sticky", top: "64px",
		padding: "49px 16px 16px 0px", margin: "0 0 0 40px",
	},
	footer: {
		borderTop: "#e0e0e0 1px solid",
		padding: "18px 0",
		display: "flex", flexDirection: "row", alignItems: "center",
		position: "sticky", zIndex: "1", bottom: `${theme.app.footerbar.height}px`,
		height: "70px",
		backgroundColor: theme.palette.background.default,
	},
}));