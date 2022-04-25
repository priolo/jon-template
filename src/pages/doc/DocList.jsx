import { useEffect, useMemo } from 'react';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, Paper } from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

import Form from 'components/form/Form';
import TableSortProp from 'components/TableSortProp';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import docStore from "stores/doc";
import userStore from "stores/user";
import routeStore from "stores/route";
import layoutStore from "stores/layout";
import { useStore17 } from "@priolo/jon";


function DocList() {

	// HOOKs
	const { t } = useTranslation()
	const navigate = useNavigate()

	const doc = useStore17(docStore);
    const { fetchAll, getList, destroy, setSelect } = docStore
    useStore17(userStore)
	const { getById: getUserById } = userStore
    const route = useStore17(routeStore);
	const { setCurrentPage } = routeStore
    useStore17(layoutStore)
	const { setTitle } = layoutStore

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
	const handleClickRow = id => navigate(`/docs/${id}`)
	const handleClickNew = _ => navigate(`/docs/new`)
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

                <Table sx={cssTable}>
                    
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
                            <TableCell align="center" sx={cssActionsCell}>
                                {t("pag.user.list.actions")}
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {docs.map(doc => (

                            <TableRow hover key={doc.id}
                                sx={cssRow}
                                onClick={e => handleClickRow(doc.id)}
                            >
                                <TableCell >{doc.title}</TableCell>
                                <TableCell >{getUserById(doc.author_id)?.username}</TableCell>
                                <TableCell >{doc.link}</TableCell>
                                <TableCell align="center" sx={cssActionsCell}>
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

const cssTable = theme => ({
    //minWidth: 650,
})
const cssRow = theme => ({
    cursor: "pointer",
})
// const cssContainer = theme => ({
//     display: "flex",
//     justifyContent: "flex-end",
//     marginTop: "14px",
// })
const cssActionsCell = theme => ({
    width: "100px"
})
