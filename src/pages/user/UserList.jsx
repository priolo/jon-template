/* eslint eqeqeq: "off" */
import React, { useEffect } from 'react';

import { useUser } from '../../stores/user';
import { useLayout } from '../../stores/layout';


import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, Paper } from '@material-ui/core';
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';
import Form from '../../components/Form';



function UserPag () {

	const { state: user, fetchAll} = useUser();
	const { setTitle } = useLayout()
	const classes = useStyles();

	useEffect(() => {
		setTitle("pag.user.title")
		fetchAll();
	}, [])

	const handleDelete = e => console.log("item.id")

	return (<Form
		renderFooter={
			<Button
				variant="contained"
				color="primary"
				startIcon={<AddIcon />}
				//onClick={() => dialogOpen()}
			>
				{("pag.user.btt_new")}
			</Button>
		}
	>
		<TableContainer component={Paper}>
			{user.all ? (

				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>{("pag.user.tbl.username")}</TableCell>
							<TableCell>{("pag.user.tbl.role")}</TableCell>
							<TableCell align="center" className={classes.actionsCell}>
								{("pag.user.tbl.actions")}
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{user.all.map(item => (

							<TableRow hover key={item.id}
								//onClick={() => dialogOpen(item.id)}
							>
								<TableCell >{item.username}</TableCell>
								<TableCell >{(`app.roles.${item.role}`)}</TableCell>
								<TableCell align="center" className={classes.actionsCell}>
									<IconButton id="btt-delete"
										onClick={handleDelete}
									><DeleteIcon /></IconButton>
								</TableCell>
							</TableRow>

						))}
					</TableBody>
				</Table>

			) : (<div>...</div>)}
		</TableContainer>

		{/* <EditDialog /> */}
		
	</Form>)
}

export default UserPag

const useStyles = makeStyles({
	table: {
		//minWidth: 650,
	},
	container: {
		display: "flex",
		justifyContent: "flex-end",
		marginTop: "14px",
	},
	actionsCell: {
		width: "100px"
	} 
});