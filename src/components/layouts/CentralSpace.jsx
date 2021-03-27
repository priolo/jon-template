import { makeStyles } from '@material-ui/core'
import React from 'react'


export default function CentralSpace ({
	renderLeft,
	renderRight,
	children,
	className
}) {

	const classes = useStyles()

	return (
		<div className={classes.container}>

			<div className={classes.space}>
				{renderLeft}
			</div>

			<div className={`${classes.body} ${className}`}>
				{children}
			</div>

			<div className={classes.space}>
				{renderRight}
			</div>

		</div>
	)
}

const useStyles = makeStyles( theme => ({

    container: {
		display: "flex", flexDirection: "row", width: "100%", alignItems: "center"
	},
	space:  {
		flex: "1 1 0%", display: "flex",
	},
	body: {
		display: "flex", flex: "3 1 0%",
		minWidth: "400px", maxWidth: "700px",
	},
	
}))
