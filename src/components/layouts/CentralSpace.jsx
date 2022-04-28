import layoutStore from "stores/layout";
import { useStore } from "@priolo/jon";
import { Box } from '@mui/system';


export default function CentralSpace({
	renderLeft,
	renderRight,
	children,
	sx,
	isCentered = false,
}) {

	// HOOKs
	const layout = useStore(layoutStore)

	// RENDER
	const sxContainer = theme => cssContainer(theme, sx, isCentered)
	const sxLateral = theme => cssLateral(theme, layout.device)
	const sxCentral = theme => cssCentral(theme, layout.device)

	return (
		<Box sx={sxContainer}>

			<Box sx={sxLateral}>
				{renderLeft}
			</Box>

			<Box sx={sxCentral}>
				{children}
			</Box>

			<Box sx={sxLateral}>
				{renderRight}
			</Box>

		</Box>
	)
}



const cssContainer = (theme, parentSx, isCentered) => ({
	display: "flex",
	width: "100%",
	...parentSx?.(theme),
	...(isCentered && { alignItems: "center"})
})

// lateral space
const cssLateral = (theme, device) => ({
	display: "flex", flex: "1 1 0%",
	...({
		"mobile": {
			display: "flex", flex: "0 1 5px",
		},
		"pad": {
			display: "flex", flex: "0 1 10%",
		},
	}[device])
})

// central space
const cssCentral = (theme, device) => ({
	flex: "3 1 0%",
	minWidth: "300px",
	maxWidth: "700px",
	...({
		"mobile": {
			maxWidth: "unset",
		},
		"pad": {
			maxWidth: "unset",
		},
	}[device])
})
