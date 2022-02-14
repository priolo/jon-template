import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import {ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useHistory, useRouteMatch } from "react-router-dom";



function ItemMenu({
	value,
}) {

	// HOOKs
	const classes = useStyles()
	const history = useHistory()
	const match = useRouteMatch(value.route)
	

	// HANDLEs
	const handleClick = item => history.push(item.route)


	// RENDER
	const cnItem = match ? classes.selected : ""
	const cnIcon = match ? classes.selectedIcon : ""
	
	return (
		<ListItem button
			onClick={() => handleClick(value)} 
			className={cnItem}
		>
			<ListItemIcon>
				<value.icon className={cnIcon} />
			</ListItemIcon>
			<ListItemText primary={value.label} />
		</ListItem>
	)
}

export default ItemMenu

const useStyles = makeStyles((theme) =>
	createStyles({
		selected: {
			backgroundColor: theme.palette.primary.main,
			color: theme.palette.primary.contrastText,
			"&:hover": {
				backgroundColor: theme.palette.primary.light,
			},
		},
		selectedIcon: {
			color: theme.palette.primary.contrastText,
		},
	}),
);