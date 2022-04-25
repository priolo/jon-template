/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import React, { lazy, useEffect } from "react"
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from "react-router-dom"

import AppBar from "./AppBar"
import Drawer from "./Drawer"
import Body from "./Body"

//import UserList from "../../pages/user/UserList"
//import DocList from "../../pages/doc/DocList";
//import DocDetail from "../../pages/doc/DocDetail";

import MsgBox from "../app/MsgBox";
import LogIn from "pages/auth/LogIn";
import RightDrawer from "./RightDrawer";

import layoutStore from "stores/layout";
import authStore from "stores/auth";
import { useStore17 } from "@priolo/jon";

// const DocDetail = lazy(() => import('../../pages/doc/DocDetail'))
// const DocList = lazy(() => import('../../pages/doc/DocList'))
// const UserList = lazy(() => import('../../pages/user/UserList'))
import DocDetail from '../../pages/doc/DocDetail'
import DocList from '../../pages/doc/DocList'
import UserList from '../../pages/user/UserList'


export default function Main() {

    // HOOKs
    const layout = useStore17(layoutStore)
    useStore17(authStore)
    const { isLogged, refresh } = authStore
    useEffect(() => { refresh() }, [])


    // RENDER
    return (
        <BrowserRouter>
            <ThemeProvider theme={layout.theme}>
                <CssBaseline />
                    <MsgBox />
                    {isLogged() ? (<>
                        <AppBar />
                        <Drawer />
                        <RightDrawer />
                        <Body>
                            <Routes>
                                <Route path={"/docs/:id"} element={<DocDetail/>} />
                                <Route path="/docs" element={<DocList />} />
                                <Route index path={"/users"} element={<UserList/>} />
                            </Routes>
                        </Body>
                    </>) : (
                        <LogIn />
                    )}
                
            </ThemeProvider>
        </BrowserRouter>
    );
}
