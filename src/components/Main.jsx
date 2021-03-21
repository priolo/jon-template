import React from "react"
import { useStore } from "@priolo/iistore";
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"

import AppBar from "./AppBar"
import Drawer from "./Drawer"
import Body from "./Body"

import UserList from "../pages/user/UserList"



export default function Main() {
	
	const {state: layout} = useStore("layout")

	return (
		<ThemeProvider theme={layout.theme}>
			<CssBaseline />
			<Router>
				<AppBar />
				<Drawer />
				<Body>
					<Switch>
						<Route path={["/","/user"]}>
							<UserList />
						</Route>
						{/* <Route path={["/","/dashboard"]}>
							<DashboardPag />
						</Route> */}
					</Switch>
				</Body>
			</Router>
		</ThemeProvider>
	)
}
