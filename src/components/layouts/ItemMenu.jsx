import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useMatch, useNavigate } from "react-router-dom";



function ItemMenu({
	value,
}) {

	// HOOKs
	const navigate = useNavigate()
	const match = useMatch(value.route)


	// HANDLEs
	const handleClick = item => navigate(item.route)


	// RENDER

	return (
		<ListItem button
			onClick={() => handleClick(value)}
			sx={match && cssSelected}
		>
			<ListItemIcon>
				<value.icon sx={match && cssSelectedIcon} />
			</ListItemIcon>
			<ListItemText primary={value.label} />
		</ListItem>
	)
}

export default ItemMenu

const cssSelected = theme => ({
	backgroundColor: theme.palette.primary.main,
	color: theme.palette.primary.contrastText,
	"&:hover": {
		backgroundColor: theme.palette.primary.light,
	},
})

const cssSelectedIcon = theme => ({
	color: theme.palette.primary.contrastText,
})
