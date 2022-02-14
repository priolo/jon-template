/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import { useEffect } from 'react';
import {
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Close as CloseIcon } from '@mui/icons-material'

import { useUser } from 'stores/user';
import { USER_ROLES } from "stores/user/utils"


function UserWriterSelector({
	label,
	value,
	onChange,
	disabled,
}) {

	// HOOKs
	const classes = useStyles()
	const { state: user, fetchAll } = useUser()

	useEffect(() => {
		if ( user.all.length == 0 ) fetchAll()
	}, [])


	// HANDLEs
	const handleClickClear = e => onChange("")
	const handleChange = e => onChange(e.target.value)

	
	// RENDER
	return (
		<Grid container alignItems="center">
			<Grid item xs>
				<FormControl fullWidth>
					<InputLabel>{label}</InputLabel>

					<Select fullWidth
						value={value}
						onChange={handleChange}
						disabled={disabled}
						endAdornment={<InputAdornment className={classes.selectAdornment} position="end">
							{value && (<IconButton size="small" onClick={handleClickClear}>
								<CloseIcon fontSize="small" />
							</IconButton>)}
						</InputAdornment>}
					>
						{user.all
							.filter(user => user.role != USER_ROLES.CUSTOMER)
							.map((user) => (
								<MenuItem key={user.id} value={user.id}>
									{user.username}
								</MenuItem>
							))
						}
					</Select>

				</FormControl>
			</Grid>
			<Grid item >

			</Grid>
		</Grid>
	)
}

export default UserWriterSelector





const useStyles = makeStyles(theme => ({
	selectAdornment: {
		marginRight: theme.spacing(3),
	},
}));