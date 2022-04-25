/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import { useEffect } from 'react';
import { FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material'

import { USER_ROLES } from "stores/user/utils"

import userStore from "stores/user";
import { useStore17 } from "@priolo/jon";


function UserWriterSelector({
	label,
	value,
	onChange,
	disabled,
}) {

	// HOOKs
	const user = useStore17(userStore)
	const { fetchAll } = userStore

	useEffect(() => {
		if (user.all.length == 0) fetchAll()
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
						endAdornment={<InputAdornment sx={cssSelectAdornment} position="end">
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

const cssSelectAdornment = theme => ({
	marginRight: theme.spacing(3),
})