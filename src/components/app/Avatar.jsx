import React, { useState } from 'react';

import makeStyles from '@mui/styles/makeStyles';
import { AccountCircle as AccountIcon, ExitToApp as LogoutIcon, Face as ProfileIcon } from '@mui/icons-material';
import { IconButton, Menu, MenuItem, Typography, Box, Divider, ListItemIcon, Switch } from '@mui/material';

import { useTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";

import layoutStore from "stores/layout";
import authStore from "stores/auth";
import { useStore17 } from "@priolo/jon";

function Avatar() {

	// HOOKs
	const classes = useStyles()
	const history = useHistory()
	const [anchorEl, setAnchorEl] = useState(null)
	const { t } = useTranslation()

	const auth = useStore17(authStore)
	const { logout } = authStore
	useStore17(layoutStore)
	const { toggleTheme, isDarkTheme } = layoutStore


	// HANDLEs
	const handleClose = () => setAnchorEl(null)
	const handleOpen = e => setAnchorEl(e.currentTarget)
	const handleLogout = e => {
		handleClose()
		logout({ flash: true })
	}
	const handleClickProfile = e => {
		handleClose()
		history.push("/profile")
	}


	// RENDER
	return <>

		<IconButton color="inherit" onClick={handleOpen} size="large">
			<AccountIcon aria-label="account icon" />
		</IconButton>

		<Menu id="simple-menu"
			anchorEl={anchorEl}
			open={Boolean(anchorEl)}
			onClose={handleClose}
		>
			<Box className={classes.box}>
				<Typography variant="subtitle2">{auth.user.email}</Typography>
				<Typography variant="caption">({t(`app.roles.${auth.user.role}`)})</Typography>
			</Box>

			<Divider />

			<MenuItem onClick={toggleTheme}>
				<ListItemIcon>
					<Switch edge="start"
						checked={isDarkTheme()}
					/>
				</ListItemIcon>
				{t("app.avatar.dark")}
			</MenuItem>

			<MenuItem onClick={handleClickProfile} disabled>
				<ListItemIcon>
					<ProfileIcon fontSize="small" />
				</ListItemIcon>
				{t("app.avatar.profile")}
			</MenuItem>

			<MenuItem onClick={handleLogout}>
				<ListItemIcon>
					<LogoutIcon fontSize="small" />
				</ListItemIcon>
				{t("app.avatar.logout")}
			</MenuItem>
		</Menu>
	</>;
}

export default Avatar

const useStyles = makeStyles((theme) => ({
	box: {
		padding: theme.spacing(1, 2, 1, 2),
		display: "flex", flexDirection: "column"
	}
}));