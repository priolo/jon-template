import React from 'react';

// mui
import { Box, Grid, Typography } from "@mui/material";
import { EditOutlined } from '@mui/icons-material';


export default function FormRow({
	label,
	sublabel,
	children,
	isChanged,
	wrap,
	onClickLabel,
	isDense,
}) {

	// RENDER
	return (
		<Grid container alignItems="center" sx={cssRoot}>

			<Grid item
				sm={isDense ? 2 : 3}
				onClick={onClickLabel}
				sx={onClickLabel && cssLabelClickable}
			>

				<Box sx={cssContainerLabels}>
					<Box sx={cssLabel}>
						{isChanged && <EditOutlined color="secondary" sx={cssIcon} />}
						<Typography variant="body2">{label}</Typography>
					</Box>
					{sublabel && <Typography variant="caption" sx={cssSublabel}>{sublabel}</Typography>}
				</Box>

			</Grid>

			<Grid item container
				sm={isDense ? 10 : 9}
				alignItems="center"
				wrap={wrap ? "wrap" : "nowrap"}
			>
				{children}
			</Grid>

		</Grid>
	)
}



const cssRoot = theme => ({
	minHeight: "44px",
	marginBottom: "10px",
	"&:last-child": {
		marginBottom: "0px",
	}
})
const cssContainerLabels = theme => ({
	display: "flex",
	flexDirection: "column",
})
const cssLabelClickable = theme => ({
	cursor: "pointer",
})
const cssLabel = theme => ({
	display: "flex",
})
const cssSublabel = theme => ({
	fontWeight: "100",
	color: theme.palette.text.secondary,
})
const cssIcon = theme => ({
	fontSize: "17px",
	color: theme.palette.secondary.main,
	margin: "0px 2px 0px -19px",
})
