/* eslint eqeqeq: "off" */
import React from 'react';
import { Grid, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
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

	// HOOKs
	const classes = useStyles();


	// RENDER
	return (
		<Grid container alignItems="center" className={classes.root}>

			<Grid item
				sm={isDense ? 2 : 3}
				onClick={onClickLabel}
				className={onClickLabel && classes.labelClickable}
			>

				<div className={classes.containerLabels}>
					<div className={classes.label}>
						{isChanged && <EditOutlined color="secondary" className={classes.icon} />}
						<Typography variant="body2">{label}</Typography>
					</div>
					{sublabel && <Typography variant="caption" className={classes.sublabel}>{sublabel}</Typography>}
				</div>

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


const useStyles = makeStyles(theme => ({
	root: {
		minHeight: "44px",
		marginBottom: "10px",
		"&:last-child": {
			marginBottom: "0px",
		}
	},
	containerLabels: {
		display: "flex",
		flexDirection: "column",
	},
	labelClickable: {
		cursor: "pointer",
	},
	label: {
		display: "flex",
	},
	sublabel: {
		fontWeight: "100",
		color: theme.palette.text.secondary,
	},
	icon: {
		fontSize: "17px",
		color: theme.palette.secondary.main,
		margin: "0px 2px 0px -19px",
	},
}))