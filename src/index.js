import React from "react"
import ReactDOM from "react-dom"
import './index.css';
import Main from "./components/layouts/Main"

import {MultiStoreProvider} from "@priolo/jon"
import setups from "./stores"

import './plugins/msw';
import './plugins/i18n';


// APPLICATION
const rootElement = document.getElementById("root")
ReactDOM.render(
	<MultiStoreProvider setups={{setups}}>
		<Main />
	</MultiStoreProvider>,
	rootElement
)
