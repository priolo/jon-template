import React, { useEffect } from "react"
import { useStore } from "@priolo/iistore";
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"

import AppBar from "./AppBar"
import Drawer from "./Drawer"
import Body from "./Body"

import UserList from "../../pages/user/UserList"
import DocList from "../../pages/doc/DocList";
import DocDetail from "../../pages/doc/DocDetail";
import { useLayout } from "../../stores/layout";
import { useAuth } from "../../stores/auth";
import MsgBox from "../app/MsgBox";
import LogIn from "../../pages/auth/LogIn";
import RightDrawer from "./RightDrawer";



export default function Main() {

	const { state: layout } = useLayout()
	const { isLogged, isRepassword, refresh } = useAuth()

	useEffect(() => { refresh() }, [])

	return (
		<ThemeProvider theme={layout.theme}>
			<CssBaseline />
			<MsgBox />
			{ isLogged() ? (
				<Router>
					<AppBar />
					<Drawer />
					<RightDrawer />
					<Body>
						{/* ATTENZIONE: l'ordine è importante */}
						<Switch>
							<Route path={["/docs/:id"]}>
								<DocDetail />
							</Route>
							<Route path={["/docs"]}>
								<DocList />
							</Route>

							<Route path={["/", "/users"]}>
								<UserList />
							</Route>

						</Switch>
					</Body>
				</Router>
			) : (
				<LogIn />
			)}
		</ThemeProvider>
	)
}
