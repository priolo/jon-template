import React from 'react'
import { Grid } from "@mui/material";
import CentralSpace from '../layouts/CentralSpace'
import { Box } from '@mui/system';


export default function Form({
	children,
	renderFooter,
	renderMenu,
}) {

	// RENDER
	return (
		<Box sx={cssFrame}>

			<CentralSpace
				sx={cssContent}
				renderRight={renderMenu && (
					<Box sx={cssMenu}>
						{renderMenu}
					</Box>
				)}
			>
				{children}
			</CentralSpace>

			{renderFooter && (
				<CentralSpace sx={cssFooter}>
					<Grid container>{renderFooter}</Grid>
				</CentralSpace>
			)}

		</Box>
	)
}

const cssFrame = theme => ({
	flex: "1 1 auto", display: "flex", flexDirection: "column",
})
const cssContent = theme => ({
	flex: "1 1 auto",
})
const cssMenu = theme => ({
	display: "flex", flexDirection: "column",
	position: "sticky", top: "64px",
	padding: "49px 16px 16px 0px", margin: "0 0 0 40px",

})
const cssFooter = theme => ({
	borderTop: "#e0e0e0 1px solid",
	padding: "18px 0",
	display: "flex", flexDirection: "row", alignItems: "center",
	position: "sticky", zIndex: "1", bottom: 0,//`${theme.app.footerbar.height}px`,
	height: "70px",
	backgroundColor: theme.palette.background.default,
})



// const useStyles = makeStyles(theme => ({
// 	frame: {
// 		flex: "1 1 auto", display: "flex", flexDirection: "column",
// 	},

// 	content: {
// 		flex: "1 1 auto",
// 	},
// 	// body: {
// 	// 	marginBottom: "50px",
// 	// },
// 	menu: {
// 		display: "flex", flexDirection: "column",
// 		position: "sticky", top: "64px",
// 		padding: "49px 16px 16px 0px", margin: "0 0 0 40px",
// 	},
// 	footer: {
// 		borderTop: "#e0e0e0 1px solid",
// 		padding: "18px 0",
// 		display: "flex", flexDirection: "row", alignItems: "center",
// 		position: "sticky", zIndex: "1", bottom: 0,//`${theme.app.footerbar.height}px`,
// 		height: "70px",
// 		backgroundColor: theme.palette.background.default,
// 	},
// }));