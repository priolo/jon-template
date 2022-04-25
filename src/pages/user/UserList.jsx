import { useEffect, useMemo } from 'react'

import { useTranslation } from 'react-i18next'
// mui
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, Paper } from '@mui/material'
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material'

import EditDialog from './EditDialog'
import TableSortProp from 'components/TableSortProp'
import Form from 'components/form/Form'
// store
import userStore from "stores/user";
import layoutStore from "stores/layout";
import routeStore from "stores/route";
import { useStore17 } from "@priolo/jon";


function UserPag() {

    //HOOKs
    const { t } = useTranslation()

    const user = useStore17(userStore)
    const { fetchAll, edit, destroy, getList } = userStore

    useStore17(layoutStore)
    const { setTitle } = layoutStore

    const route = useStore17(routeStore)
    const { setCurrentPage } = routeStore

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
    //const nameTest = getSearchUrl("sortName")

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

                <Table>

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
                            <TableCell align="center" sx={cssActionsCell}>
                                {t("pag.user.list.actions")}
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {users.map(user => (

                            <TableRow hover key={user.id}
                                sx={cssRow}
                                onClick={e => handleClickRow(user)}
                            >
                                <TableCell >{user.username}</TableCell>
                                <TableCell >{t(`app.roles.${user.role}`)}</TableCell>
                                <TableCell align="center" sx={cssActionsCell}>
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
