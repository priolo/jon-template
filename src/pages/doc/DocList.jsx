/* eslint eqeqeq: "off" */
import React, { useEffect } from 'react';

import { useLayout } from '../../stores/layout';


import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, Paper } from '@material-ui/core';
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';
import Form from '../../components/form/Form';
import { useTranslation } from 'react-i18next';
import { useDoc } from '../../stores/doc';
import { useHistory } from 'react-router';



function DocList () {

	const {t} = useTranslation()
	const history = useHistory()
	const { state: doc, fetchAll} = useDoc();
	const { setTitle } = useLayout()
	const classes = useStyles();

	useEffect(() => {
		setTitle(t("pag.user.title"))
		fetchAll();
	}, [])

	const handleDelete = e => console.log("item.id")
	const handleClickRow = id => history.push(`/docs/${id}`)

	return (<Form
		renderFooter={
			<Button
				variant="contained"
				color="primary"
				startIcon={<AddIcon />}
				//onClick={() => dialogOpen()}
			>
				{t("pag.user.btt_new")}
			</Button>
		}
	>
		<TableContainer component={Paper}>
			{doc.all ? (

				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>title</TableCell>
							<TableCell>link</TableCell>
							<TableCell align="center" className={classes.actionsCell}>
								{t("pag.user.tbl.actions")}
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{doc.all.map(item => (

							<TableRow hover key={item.id}
								onClick={e => handleClickRow(item.id)}
							>
								<TableCell >{item.title}</TableCell>
								<TableCell >{item.link}</TableCell>
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

export default DocList

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