/* eslint eqeqeq: "off" */
import React from 'react';

import {
	Snackbar,
	IconButton,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Close as CloseIcon } from '@mui/icons-material';

import layoutStore from "stores/layout";
import { useStore17 } from "@priolo/jon";


export default function MsgBox() {

	// HOOKs
	const layout = useStore17(layoutStore)
	const { dialogOptions: options } = layout
	const {dialogClose} = layoutStore
	
	const classes = useStyles();


	// RENDER
	if (!options) return null
	
	return options.modal ? (
		<Dialog
			open={layout.dialogIsOpen}
			onClose={() => dialogClose(false)}
		>

			<DialogTitle className={classes[options.type]}>
				{options.title}
			</DialogTitle>

			<DialogContent>
				<DialogContentText className={classes.text}>
					{options.text}
				</DialogContentText>
			</DialogContent>

			<DialogActions className={classes.actions}>
				{options.labelCancel && (
					<Button
						color="secondary"
						onClick={() => dialogClose(false)}
					>
						{options.labelCancel}
					</Button>
				)}
				<Button variant="contained"
					color="primary"
					autoFocus
					onClick={() => dialogClose(true)}
				>
					{options.labelOk}
				</Button>
			</DialogActions>

		</Dialog>
	) : (
		<Snackbar ContentProps={{ className: classes[options.type] }}
			open={options.modal == false && layout.dialogIsOpen}
			autoHideDuration={6000}
			onClose={dialogClose}
			message={options.text}
			action={
				<IconButton
					size="small"
					color="inherit"
					onClick={dialogClose}
				>
					<CloseIcon fontSize="small" />
				</IconButton>
			}
		/>
	)
}

const useStyles = makeStyles((theme) => ({
	info: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
	},
	warning: {
		backgroundColor: theme.palette.warning.main,
		color: theme.palette.warning.contrastText,
	},
	error: {
		backgroundColor: theme.palette.error.main,
		color: theme.palette.error.contrastText,
	},
	success: {
		backgroundColor: theme.palette.success.main,
		color: theme.palette.success.contrastText,
	},

	text: {
		padding: "20px 20px 10px 20px",
		minWidth: "250px",
		whiteSpace: "pre-wrap",
	},
	actions: {
		margin: "10px 20px 20px 20px",
	},
}))
