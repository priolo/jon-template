/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import React, { useEffect } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton, Tooltip, Grid, Box, makeStyles, Divider } from '@material-ui/core';
import { useUser } from '../../store/user';
import { useValidator, validateAll } from '../../lib/input/validator';
import { rules } from '../../lib/input/rules';
import { useTranslation } from 'react-i18next';
import { useLayout } from '../../store/layout';
import RolesSelector from '../../components/selectors/RolesSelector';


function UserEditDialog () {

	const { state: user, dialogClose, setItemInEdit, setDialogPassword2 } = useUser()

	const nameUsername = useValidator(auth.username, [rules.obligatory])
	const pswProp = useValidator(auth.password, [rules.obligatory])

	const { t } = useTranslation();
	const { state: layout } = useLayout()
	
	const classes = useStyles()

	// useEffect(() => {
	// 	if (layout.focus == "username") rUsername.current.focus()
	// }, [layout.focus])

	// //[II] automatizzare
	// useEffect(() => {
	// 	if (user.dialogIsOpen == false) return
	// 	setTimeout(() => rUsername.current.focus(), 500)
	// }, [user.dialogIsOpen, rUsername])

	return (user.itemInEdit &&
		<Dialog fullWidth maxWidth="xs"
			open={user.dialogIsOpen}
			onClose={() => dialogClose(false)}
		>
			<DialogTitle classes={{ root: classes.title }}>
				{t(`pag.user.dlg.${user.itemInEdit.id ? "title_edit" : "title_new"}`)}
			</DialogTitle>

			<Divider />

			<DialogContent classes={{ root: classes.content }}>

				<Grid container alignItems="center">
					<Grid item sm>
						<TextField autoFocus fullWidth
							{...nameProp}
							label={t(`pag.user.dlg.lbl_username`)}
							margin="dense"
							value={user.itemInEdit.username}
							onChange={e => setItemInEdit({ ...user.itemInEdit, username: e.target.value })}
						/>
					</Grid>
					<Box mr={2} />
					<Grid item>
						<RolesSelector label={t(`pag.user.dlg.lbl_role`)}
							value={user.itemInEdit.role}
							onChange={e => setItemInEdit({ ...user.itemInEdit, role: e.target.value })}
						/>
					</Grid>
				</Grid>

				
			</DialogContent>
		
			<DialogActions classes={{ root: classes.action }}>
				<Button color="secondary"
					onClick={() => dialogClose(false)}
				>
					{t(`pag.user.dlg.cancel`)}
				</Button>
				<Button color="primary" autoFocus
					onClick={() => validateAll(
						() => dialogClose(true),
						[extra(rules.repassword(user.itemInEdit.password))]
					)}
				>
					{t(`pag.user.dlg.save`)}
				</Button>
			</DialogActions>

		</Dialog>
	)
}

export default UserEditDialog

const useStyles = makeStyles(theme => ({
	title: {
		padding: "25px 50px 16px 50px",
	},
	subtitle: {
		color: theme.palette.grey.A700,
	},
	content: {
		paddingLeft: "50px",
		paddingRight: "50px"
	},
	action: {
		padding: "16px 34px 16px 40px",
	},
}))