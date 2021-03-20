import React from "react"
import ReactDOM from "react-dom"
import Main from "./components/Main"

import MultiStoreProvider from "./stores"

// APPLICATION
const rootElement = document.getElementById("app")
ReactDOM.render(
	<MultiStoreProvider>
		<Main />
	</MultiStoreProvider>,
	rootElement
)
