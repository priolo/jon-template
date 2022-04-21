/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import { useEffect, useMemo } from 'react'

import makeStyles from '@mui/styles/makeStyles';
import { useTranslation } from 'react-i18next'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, Paper } from '@mui/material'
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material'

import EditDialog from './EditDialog'
import TableSortProp from 'components/TableSortProp'
import Form from 'components/form/Form'

import userStore from "stores/user";
import layoutStore from "stores/layout";
import routeStore from "stores/route";
import { useStore17 } from "@priolo/jon";


function UserPag() {

	//HOOKs
	const { t } = useTranslation()
    const classes = useStyles()
	
	const user = useStore17(userStore)
    const { fetchAll, edit, destroy, getList } = userStore

	useStore17(layoutStore)
    const { setTitle } = layoutStore

    const route = useStore17(routeStore)
    const { setCurrentPage, getSearchUrl } = routeStore

	useEffect(() => {
		setCurrentPage("user.list")
		setTitle("pag.user.list.title")
		fetchAll()
	}, [])


	//PROPERTIES
	const users = useMemo(
		() => getList(), 
		[user.all, route.queryUrl]
	)
    const nameTest = getSearchUrl("sortName")

	//HANDLEs
	const handleClickRow = item => edit(item)
	const handleClickDelete = (user, e) => {
		e.stopPropagation()
		destroy(user)
	}
	const handleClickAdd = e => edit()


	// RENDER

	if (!user.all || user.all.length == 0) return null

	return (
        <Form
            renderFooter={<>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleClickAdd}
                >
                    {t("pag.user.list.btt_new")}
                </Button>
                
                </>}
        >
            <TableContainer component={Paper}>

                <Table className={classes.table} aria-label="simple table">

                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortProp name="username">
                                    {t("pag.user.list.username")}
                                </TableSortProp>
                            </TableCell>
                            <TableCell>
                                <TableSortProp name="role">
                                    {t("pag.user.list.role")}
                                </TableSortProp>
                            </TableCell>
                            <TableCell align="center" className={classes.actionsCell}>
                                {t("pag.user.list.actions")}
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {users.map(user => (

                            <TableRow hover key={user.id}
                                className={classes.row}
                                onClick={e => handleClickRow(user)}
                            >
                                <TableCell >{user.username}</TableCell>
                                <TableCell >{t(`app.roles.${user.role}`)}</TableCell>
                                <TableCell align="center" className={classes.actionsCell}>
                                    <IconButton id="btt-delete" onClick={(e) => handleClickDelete(user, e)} size="large"><DeleteIcon /></IconButton>
                                </TableCell>
                            </TableRow>

                        ))}
                    </TableBody>

                </Table>

            </TableContainer>

            <EditDialog />

        </Form>
    );
}

export default UserPag

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