import { useValidator, rules } from '@priolo/jon';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid, Box, Divider } from '@mui/material';
import { Link as LinkIcon } from '@mui/icons-material';

import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import RolesSelector from 'components/selectors/RolesSelector';

import { USER_ROLES } from 'stores/user/utils';
import userStore from "stores/user";
import { useStore17 } from "@priolo/jon";


function EditDialog() {

	// HOOKs
	const user = useStore17(userStore)
	const { setEmail, setUsername, setRole, save, canSave, setDialogEditIsOpen } = userStore

	const { t } = useTranslation();
	const navigate = useNavigate()
	const uniqueUserRole = (value) => value != user.selectOrigin?.username && user.all.some(user => user.username == value) ? "not.univoque" : null
	const usernameProps = useValidator(user.select?.username, [rules.obligatory, uniqueUserRole])
	const emailProps = useValidator(user.select?.email, [rules.email])
	const showLinkBook = user.select && user.select.id && user.select.role != USER_ROLES.CUSTOMER


	// HANDLEs
	const handleCloseDialog = e => setDialogEditIsOpen(false)
	const handleChangeEmail = e => setEmail(e.target.value)
	const handleChangeUsername = e => setUsername(e.target.value)
	const handleChangeRole = e => setRole(e.target.value)
	const handleClickSave = e => save()
	const handleClickBook = e => navigate(`/docs?author=${user.select.id}`)


	// RENDER
	if (!user.select) return null

	return (
		<Dialog fullWidth maxWidth="xs"
			open={user.dialogEditIsOpen}
			onClose={handleCloseDialog}
		>
			<DialogTitle sx={cssTitle}>
				{t(`pag.user.dlg.${user.select.id ? "title_edit" : "title_new"}`)}
			</DialogTitle>

			<Divider />

			<DialogContent sx={cssContent}>

				<Grid item sm>
					<TextField autoFocus fullWidth
						{...usernameProps}
						label={t(`pag.user.dlg.username`)}
						margin="dense"
						value={user.select.username}
						onChange={handleChangeUsername}
					/>
				</Grid>
				<Box mt={2} />
				<Grid item sm>
					<TextField autoFocus fullWidth
						{...emailProps}
						label={t(`pag.user.dlg.email`)}
						margin="dense"
						value={user.select.email}
						onChange={handleChangeEmail}
					/>
				</Grid>
				<Box mt={2} />
				<Grid item>
					<RolesSelector label={t(`pag.user.dlg.role`)}
						value={user.select.role}
						onChange={handleChangeRole}
					/>
				</Grid>
				<Box mt={2} />
				<Grid container alignItems="center">
					{showLinkBook && <Button
						endIcon={<LinkIcon />}
						onClick={handleClickBook}
					>{t(`pag.user.dlg.btt_books`)}</Button>}
				</Grid>

			</DialogContent>

			<DialogActions sx={cssAction}>
				<Button color="secondary" onClick={handleCloseDialog} >
					{t(`pag.user.dlg.cancel`)}
				</Button>
				<Button color="primary" autoFocus variant="contained"
					onClick={handleClickSave}
					disabled={!canSave()}
				>
					{t(`pag.user.dlg.save`)}
				</Button>
			</DialogActions>

		</Dialog>
	)
}

export default EditDialog


const cssTitle = theme => ({
	padding: "25px 50px 16px 50px",
})
// const cssSubtitle = theme => ({
// 	color: theme.palette.grey.A700,
// })
const cssContent = theme => ({
	paddingLeft: "50px",
	paddingRight: "50px"
})
const cssAction = theme => ({
	padding: "16px 34px 16px 40px",
})
