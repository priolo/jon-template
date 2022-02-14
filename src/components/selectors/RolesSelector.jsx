/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { USER_ROLES } from "stores/user/utils"


function RolesSelector({
	label,
	value,
	onChange,
	disabled,
}) {

	const { t } = useTranslation();
	
	return (
		<FormControl>
			<InputLabel>{label}</InputLabel>
			<Select autoWidth
				label={label}
				value={value}
				onChange={onChange}
				disabled={disabled}
			>
				{Object.values(USER_ROLES).map( (role) => (
					<MenuItem key={role} value={role}>
						{t(`app.roles.${role}`)}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

export default RolesSelector
