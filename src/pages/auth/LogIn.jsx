import { useValidator, rules } from '@priolo/jon';
import { useTranslation } from 'react-i18next';

import { Avatar, Button, TextField, Typography, Container, CircularProgress, Box } from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';

import authStore from "stores/auth";
import layoutStore from "stores/layout";
import { useStore } from "@priolo/jon";


export default function LogIn() {

	// HOOKS
	const { t } = useTranslation()

	const auth = useStore(authStore)
	const { setUsername, setPassword, login } = authStore
	const layout = useStore(layoutStore)

	const usernameProp = useValidator(auth.username, [rules.obligatory])
	const pswProp = useValidator(auth.password, [rules.obligatory])

	// RENDER
	return (
		<Container component="main" maxWidth="xs">
			<Box sx={cssPaper}>

				<Avatar sx={cssAvatar}>
					<LockOutlinedIcon />
				</Avatar>

				<Typography component="h1" variant="h5">
					{t("pag.login.title")}
				</Typography>

				<Typography variant="caption">
					Pssssh... try admin/secret
				</Typography>

				<TextField fullWidth autoFocus
					{...usernameProp}
					disabled={layout.busy}
					label={t("pag.login.username")}
					variant="outlined"
					margin="normal"
					value={auth.username}
					onChange={e => setUsername(e.target.value)}
				/>

				<TextField fullWidth
					{...pswProp}
					disabled={layout.busy}
					label={t("pag.login.password")}
					type="password"
					variant="outlined"
					margin="normal"
					value={auth.password}
					onChange={e => setPassword(e.target.value)}
				/>

				{layout.busy == false ? (
					<Button fullWidth
						variant="contained"
						color="primary"
						sx={cssSubmit}
						onClick={() => login()}
					>
						{t("pag.login.signin")}
					</Button>
				) : (
					<CircularProgress />
				)}

			</Box>
		</Container>
	);
}



const cssPaper = theme => ({
	marginTop: theme.spacing(8),
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
})
const cssAvatar = theme => ({
	margin: theme.spacing(1),
	backgroundColor: theme.palette.secondary.main,
})
// const cssForm = theme => ({
// 	width: '100%', // Fix IE 11 issue.
// 	marginTop: theme.spacing(1),
// })
const cssSubmit = theme => ({
	margin: theme.spacing(3, 0, 2),
})
