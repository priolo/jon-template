/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import { themeLight, themeDark } from "theme"

import Cookies from "js-cookie";
import { mixStores, createStore } from "@priolo/jon";

import dialogSetup from "./dialog"



const setup = {
	state: {
		busy: false,
		title: "",
		focus: "",
		drawerIsOpen: true,
		drawerRightIsOpen: false,

		theme: Cookies.get('theme'),

		menu: [
			{ label: "Users", icon: "users", route: "/users" },
			{ label: "Docs", icon: "docs", route: "/docs" },
		],

		device: null,
	},
	getters: {
		getDrawerList: (_, {state}) => {
			return state.menu
		},
		isDarkTheme: (_, {state}) => state.theme == "dark",
		getMuiTheme: (_, {state}) => state.theme == "dark" ? themeDark : themeLight,
	},
	actions: {
	},
	mutators: {
		setBusy: busy => ({ busy }),
		setTitle: title => ({ title }),
		setFocus: focus => ({ focus }),

		setDrawerIsOpen: drawerIsOpen => ({ drawerIsOpen }),
		toggleDrawerIsOpen: (_, {state}) => ({ drawerIsOpen: !state.drawerIsOpen }),

		setDrawerRightIsOpen: drawerRightIsOpen => ({ drawerRightIsOpen }),

		toggleTheme: (_, {state}) => {
			const newTheme = state.theme == "dark" ? "light" : "dark"
			Cookies.set("theme", newTheme)
			return { theme: newTheme }
		},

		setDevice: device => ({ device }),
	},
}

const allSetup = mixStores(setup, dialogSetup)

const store = createStore(allSetup)

const checkDevice = () => {
	const deviceName = window.innerWidth < 767 ? "mobile"
		: window.innerWidth < 950 ? "pad"
			: "desktop"
	store.setDevice(deviceName)
}
window.addEventListener("resize", (e) => checkDevice());
checkDevice()

export default store

