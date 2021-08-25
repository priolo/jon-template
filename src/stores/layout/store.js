/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import { themeLight, themeDark } from "theme"
import { People, Description } from '@material-ui/icons';
import Cookies from "js-cookie";
import { mixStores } from "@priolo/jon";

import dialogStore from "./dialog"



const store =  {
	state: {
		busy: false,
		title: "",
		focus: "",
		drawerIsOpen: true,
		drawerRightIsOpen: false,

		theme: Cookies.get('theme') == "dark" ? themeDark : themeLight,

		menu: [
			{ label: "Users", icon: People, route: "/users" },
			{ label: "Docs", icon: Description, route: "/docs" },
		],

		device: null,
	},
	init: (store) => {
		const checkDevice = ()=> {
			const deviceName = window.innerWidth < 767 ? "mobile" 
				: window.innerWidth < 950 ? "pad"
				: "desktop"
			store.setDevice(deviceName)
		}
		window.addEventListener("resize", (e) => checkDevice());
		checkDevice()
	},
	getters: {
		getDrawerList: (state, _, store) => {
			return state.menu
		},
		isDarkTheme: (state, _, store) => state.theme == themeDark,
	},
	actions: {
	},
	mutators: {
		setBusy: (state, busy) => ({ busy }),
		setTitle: (state, title) => ({ title }),
		setFocus: (state, focus) => ({ focus }),

		setDrawerIsOpen: (state, drawerIsOpen) => ({ drawerIsOpen }),
		toggleDrawerIsOpen: (state) => ({ drawerIsOpen: !state.drawerIsOpen }),

		setDrawerRightIsOpen: (state, drawerRightIsOpen) => ({ drawerRightIsOpen }),

		toggleTheme: (state) => {
			Cookies.set("theme", state.theme == themeLight ? "dark" : "light")
			return {
				theme: state.theme == themeLight ? themeDark : themeLight
			}
		},

		setDevice: ( state, device ) => ({ device }),
	},
}

export default mixStores ( store, dialogStore )

