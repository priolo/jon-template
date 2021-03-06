/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import { useEffect, useMemo } from 'react';

import makeStyles from '@mui/styles/makeStyles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, Paper } from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

import Form from 'components/form/Form';
import TableSortProp from 'components/TableSortProp';

import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import { useDoc } from 'stores/doc';
import { useUser } from 'stores/user';
import { useRoute } from 'stores/route';
import { useLayout } from 'stores/layout';



function DocList() {

	// HOOKs
	const { t } = useTranslation()
	const history = useHistory()
	const { state: doc, fetchAll, getList, destroy, setSelect } = useDoc();
	const { getById: getUserById } = useUser()
	const { state: route, setCurrentPage } = useRoute()
	const { setTitle } = useLayout()
	const classes = useStyles()

	useEffect(() => {
		setCurrentPage("doc.list")
		setTitle("pag.doc.list.title")
		setSelect(null)
		fetchAll()
	}, [])


	//PROPERTIES
	const docs = useMemo(
		() => getList(),
		[doc.all, route.queryUrl]
	)


	//HANDLEs
	const handleClickRow = id => history.push(`/docs/${id}`)
	const handleClickNew = _ => history.push(`/docs/new`)
	const handleClickDelete = (doc, e) => {
		e.stopPropagation()
		destroy(doc)
	}


	// RENDER

	if (!doc.all || doc.all.length == 0) return null

	return (
        <Form
            renderFooter={
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleClickNew}
                >
                    {t("pag.doc.list.btt_new")}
                </Button>
            }
        >
            <TableContainer component={Paper}>

                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortProp name="title">
                                    {t("pag.doc.list.title_doc")}
                                </TableSortProp>
                            </TableCell>
                            <TableCell>
                                <TableSortProp name="author">
                                    {t("pag.doc.list.author")}
                                </TableSortProp>
                            </TableCell>
                            <TableCell>
                                <TableSortProp name="link">
                                    {t("pag.doc.list.link")}
                                </TableSortProp>
                            </TableCell>
                            <TableCell align="center" className={classes.actionsCell}>
                                {t("pag.user.list.actions")}
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {docs.map(doc => (

                            <TableRow hover key={doc.id}
                                className={classes.row}
                                onClick={e => handleClickRow(doc.id)}
                            >
                                <TableCell >{doc.title}</TableCell>
                                <TableCell >{getUserById(doc.author_id)?.username}</TableCell>
                                <TableCell >{doc.link}</TableCell>
                                <TableCell align="center" className={classes.actionsCell}>
                                    <IconButton id="btt-delete" onClick={(e) => handleClickDelete(doc, e)} size="large"><DeleteIcon /></IconButton>
                                </TableCell>
                            </TableRow>

                        ))}
                    </TableBody>

                </Table>

            </TableContainer>

            {/* <EditDialog /> */}

        </Form>
    );
}

export default DocList

const useStyles = makeStyles({
	table: {
		//minWidth: 650,
	},
	row: {
		cursor: "pointer",
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