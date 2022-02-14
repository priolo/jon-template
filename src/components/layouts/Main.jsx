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

import { useLayout } from "stores/layout";
import { useAuth } from "stores/auth";

import MsgBox from "../app/MsgBox";
import LogIn from "pages/auth/LogIn";
import RightDrawer from "./RightDrawer";

const DocDetail = lazy(() => import('../../pages/doc/DocDetail'))
const DocList = lazy(() => import('../../pages/doc/DocList'))
const UserList = lazy(() => import('../../pages/user/UserList'))



export default function Main() {

	// HOOKs
	const { state: layout } = useLayout()
	const { isLogged, refresh } = useAuth()
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
