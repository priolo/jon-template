import React from 'react';

// mui
import { Snackbar, IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

// stores
import layoutStore from "stores/layout";
import { useStore } from "@priolo/jon";
import { DIALOG_TYPES } from 'stores/layout/utils';


export default function MsgBox() {

	// HOOKs
	const layout = useStore(layoutStore)
	const { dialogOptions: options } = layout
	const { dialogClose } = layoutStore


	// RENDER
	if (!options) return null
	const sxType = theme => cssInfo(theme, options.type)

	return options.modal ? (
		<Dialog
			open={layout.dialogIsOpen}
			onClose={() => dialogClose(false)}
		>
			<DialogTitle sx={sxType}>
				{options.title}
			</DialogTitle>

			<DialogContent>
				<DialogContentText sx={cssText}>
					{options.text}
				</DialogContentText>
			</DialogContent>

			<DialogActions sx={cssActions}>
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
		<Snackbar ContentProps={{ sx: sxType }}
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

const cssInfo = (theme, type) => ({
	[DIALOG_TYPES.INFO]: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
	},
	[DIALOG_TYPES.WARNING]: {
		backgroundColor: theme.palette.warning.main,
		color: theme.palette.warning.contrastText,
	},
	[DIALOG_TYPES.ERROR]: {
		backgroundColor: theme.palette.error.main,
		color: theme.palette.error.contrastText,
	},
	[DIALOG_TYPES.SUCCESS]: {
		backgroundColor: theme.palette.success.main,
		color: theme.palette.success.contrastText,
	},
}[type])

const cssText = theme => ({
	padding: "20px 20px 10px 20px",
	minWidth: "250px",
	whiteSpace: "pre-wrap",
})

const cssActions = theme => ({
	margin: "10px 20px 20px 20px",
})