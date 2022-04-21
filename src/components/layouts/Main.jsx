/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import React, { lazy, Suspense, useEffect } from "react"
import { ThemeProvider, StyledEngineProvider, CssBaseline } from '@mui/material';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"

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

const DocDetail = lazy(() => import('../../pages/doc/DocDetail'))
const DocList = lazy(() => import('../../pages/doc/DocList'))
const UserList = lazy(() => import('../../pages/user/UserList'))



export default function Main() {

	// HOOKs
	const layout = useStore17(layoutStore)
    useStore17(authStore)
	const { isLogged, refresh } = authStore
	useEffect(() => { refresh() }, [])

	
	// RENDER
	return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={layout.theme}>
                <CssBaseline />
                <MsgBox />
                { isLogged() ? (
                    <Router>
                        <AppBar />
                        <Drawer />
                        <RightDrawer />
                        <Body>
                            {/* ATTENTION: the order is important */}
                            <Switch>

                                <Route path={["/docs/:id"]} 
                                //component={DocDetail}
                                >
                                    <Suspense fallback={null}>
                                        <DocDetail />
                                    </Suspense>
                                </Route>

                                <Route path={["/docs"]} 
                                //component={DocList}
                                >
                                    <Suspense fallback={null}>
                                        <DocList />
                                    </Suspense>
                                </Route>

                                <Route path={["/", "/users"]} 
                                //component={UserList}
                                >
                                    <Suspense fallback={null}>
                                        <UserList />
                                    </Suspense>
                                </Route>

                            </Switch>
                        </Body>
                    </Router>
                ) : (
                    <LogIn />
                )}
            </ThemeProvider>
        </StyledEngineProvider>
    );
}
