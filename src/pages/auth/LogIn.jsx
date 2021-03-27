/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Avatar, Button, TextField, Typography, Container, CircularProgress } from '@material-ui/core';
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from '../../stores/auth';
import { useValidator } from '@priolo/iistore';
import { rules } from '../../utils/rules';
import { useLayout } from '../../stores/layout';




export default function LogIn() {

	const classes = useStyles()
	const { t } = useTranslation()
	const { state: auth, setUsername, setPassword, login } = useAuth()
	const { state: layout } = useLayout()

	const nameProp = useValidator(auth.username, [rules.obligatory])
	const pswProp = useValidator(auth.password, [rules.obligatory])

	// useEffect(() => {
	// 	if (layout.focus == "password") rUsername.current.focus()
	// }, [layout.focus])

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>

				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>

				<Typography component="h1" variant="h5">
					{t("pag.login.title")}
				</Typography>

				<TextField fullWidth autoFocus
					{...nameProp}
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
						{t("pag.login.btt_signin")}
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