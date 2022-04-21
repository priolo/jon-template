/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import { useValidator, rules } from '@priolo/jon';
import { useTranslation } from 'react-i18next';

import { Avatar, Button, TextField, Typography, Container, CircularProgress } from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import makeStyles from '@mui/styles/makeStyles';

import authStore from "stores/auth";
import layoutStore from "stores/layout";
import { useStore17 } from "@priolo/jon";




export default function LogIn() {

	// HOOKS
	const classes = useStyles()
	const { t } = useTranslation()

	const auth = useStore17(authStore)
	const { setUsername, setPassword, login } = authStore
	const layout = useStore17(layoutStore)

	const usernameProp = useValidator(auth.username, [rules.obligatory])
	const pswProp = useValidator(auth.password, [rules.obligatory])

	// RENDER
	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>

				<Avatar className={classes.avatar}>
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
						className={classes.submit}
						onClick={() => login()}
					>
						{t("pag.login.signin")}
					</Button>
				) : (
					<CircularProgress />
				)}

			</div>
		</Container>
	);
}


const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));