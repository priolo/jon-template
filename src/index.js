import React from "react"
import ReactDOM from "react-dom"
import Main from "./components/Main"

import MultiStoreProvider from "./stores"

import './plugins/msw';


// APPLICATION
const rootElement = document.getElementById("root")
ReactDOM.render(
	<MultiStoreProvider>
		<Main />
	</MultiStoreProvider>,
	rootElement
)
