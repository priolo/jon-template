import React from "react"
import ReactDOM from "react-dom"
import './index.css';
import Main from "./components/layouts/Main"


import './plugins/msw';
import './plugins/i18n';


// APPLICATION
const rootElement = document.getElementById("root")
ReactDOM.render(
	<Main />,
	rootElement
)