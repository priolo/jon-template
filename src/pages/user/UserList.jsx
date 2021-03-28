/* eslint eqeqeq: "off" */
import React, { useEffect, useMemo } from 'react';

import { useUser } from '../../stores/user';
import { useLayout } from '../../stores/layout';


import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, Paper, Typography } from '@material-ui/core';
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';
import Form from '../../components/form/Form';
import { useTranslation } from 'react-i18next';
import EditDialog from './EditDialog';
import TableSortProp from '../../components/TableSortProp';



function UserPag() {

	//HOOKs
	const { t } = useTranslation()
	const { state: user, fetchAll, edit, destroy, setSort, getList } = useUser();
	const { setTitle } = useLayout()
	const classes = useStyles();

	useEffect(() => {
		setTitle(t("pag.user.title"))
		fetchAll()
	}, [])


	//PROPERTIES
	const users = useMemo(
		() => getList(), 
		[user.all, user.queryUrl]
	)


	//HANDLEs
	const handleClickRow = item => edit(item)
	const handleClickDelete = (user, e) => {
		e.stopPropagation()
		destroy(user)
	}
	const handleClickAdd = e => edit()



	// RENDER

	if (!user.all || user.all.length == 0) return <Typography>NUN C'E' NULLA!!!</Typography>

	return (<Form
		renderFooter={
			<Button
				variant="contained"
				color="primary"
				startIcon={<AddIcon />}
				onClick={handleClickAdd}
			>
				{t("pag.user.btt_new")}
			</Button>
		}
	>
		<TableContainer component={Paper}>

			<Table className={classes.table} aria-label="simple table">

				<TableHead>
					<TableRow>
						<TableCell>
							<TableSortProp name="email" sortName={user.sortName} isAsc={user.sortIsAsc} onSort={setSort}>
								{t("pag.user.tbl.email")}
							</TableSortProp>
						</TableCell>
						<TableCell>
							<TableSortProp name="role" sortName={user.sortName} isAsc={user.sortIsAsc} onSort={setSort}>
								{t("pag.user.tbl.role")}
							</TableSortProp>
						</TableCell>
						<TableCell align="center" className={classes.actionsCell}>
							{t("pag.user.tbl.actions")}
						</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{users.map(user => (

						<TableRow hover key={user.id}
							onClick={e => handleClickRow(user)}
						>
							<TableCell >{user.email}</TableCell>
							<TableCell >{t(`app.roles.${user.role}`)}</TableCell>
							<TableCell align="center" className={classes.actionsCell}>
								<IconButton id="btt-delete"
									onClick={(e) => handleClickDelete(user, e)}
								><DeleteIcon /></IconButton>
							</TableCell>
						</TableRow>

					))}
				</TableBody>

			</Table>

		</TableContainer>

		<EditDialog />

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