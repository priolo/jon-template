import makeStyles from '@mui/styles/makeStyles';

import layoutStore from "stores/layout";
import { useStore17 } from "@priolo/jon";


export default function CentralSpace({
	renderLeft,
	renderRight,
	children,
	className,
	isCentered = false,
}) {

	// HOOKs
	const classes = useStyles()
	const layout = useStore17(layoutStore)


	// RENDER
	const cnContainer = `${classes.container} ${className ?? ""} ${isCentered ? "centered" : ""}`
	const cnLateral = `${classes.lateral} ${layout.device}`
	const cnCentral = `${classes.central} ${layout.device}`
	
	return (
		<div className={cnContainer}>

			<div className={cnLateral}>
				{renderLeft}
			</div>

			<div className={cnCentral}>
				{children}
			</div>

			<div className={cnLateral}>
				{renderRight}
			</div>

		</div>
	)
}

const useStyles = makeStyles(theme => ({

	container: {
		display: "flex",
		width: "100%",
		"&.centered": {
			alignItems: "center"
		}
	},

	// lateral space
	lateral: {
		display: "flex", flex: "1 1 0%",
		"&.mobile": {
			display: "flex", flex: "0 1 5px",
		},
		"&.pad": {
			display: "flex", flex: "0 1 10%",
		}
	},

	// central space
	central: {
		flex: "3 1 0%",
		minWidth: "300px", 
		maxWidth: "700px",
		"&.mobile": {
			maxWidth: "unset",
		},
		"&.pad": {
			maxWidth: "unset",
		}
	},

}))
