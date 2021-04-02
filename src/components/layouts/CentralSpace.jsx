import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import React from 'react'


export default function CentralSpace ({
	renderLeft,
	renderRight,
	children,
	className,
	isCentered = false,
}) {

	const classes = useStyles()
	const cnContainer = `${classes.centralSpace} ${className??""} ${isCentered?"centered":""}`

	return (
		<div className={cnContainer}>

			<div className={classes.space}>
				{renderLeft}
			</div>

			<div className={classes.body}>
				{children}
			</div>

			<div className={classes.space}>
				{renderRight}
			</div>

		</div>
	)
}

const useStyles = makeStyles( theme => ({

    centralSpace: {
		display: "flex",
		width: "100%", 
		"&.centered": {
			alignItems: "center"
		}
	},
	space:  {
		 display: "flex", flex: "1 1 0%",
	},
	body: {
		//display: "flex", 
		flex: "3 1 0%",
		minWidth: "400px", maxWidth: "700px",
	},
	
}))
