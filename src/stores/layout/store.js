import { themeLight, themeDark } from "../../theme"
import { Dashboard, Person } from '@material-ui/icons';
import Cookies from "js-cookie";

// used when dialog closed
let resolveClose = null;

export default {
	state: {
		busy: false,
		title: "...",
		focus: "",
		//searchIsVisible: true,
		//searchText: "",
		//sortName: null,
		//sortIsAsc: true,
		drawerIsOpen: true,

		theme: Cookies.get('theme') == "dark" ? themeDark : themeLight,

		menu: [
			{ label: "Users", icon: Person, route: "/users" },
			{ label: "Docs", icon: Person, route: "/docs" },
		],

		dialogIsOpen: false,
		dialogOptions: null,
	},
	getters: {
		getDrawerList: (state, payload, store) => {
			return state.menu
			// const { state: auth } = getStoreAuth()
			// return auth.user == null
			// 	? guestMenu
			// 	: auth.user.role == 100
			// 		? manuAdmin
			// 		: crewMenu
		},
		isDarkTheme: (state, payload, store) => state.theme == themeDark,
	},
	actions: {
		dialogOpen: (state, options, store) => {
			store.setDialogOpen(options)
			return new Promise((resolve, reject) => {
				resolveClose = resolve
			})
		},
		dialogClose: (state, payload, store) => {
			store.setDialogClose()
			if (resolveClose) resolveClose(payload)
			resolveClose = null
			//store._update()
		}
	},
	mutators: {
		setBusy: (state, busy) => ({ busy }),
		setTitle: (state, title) => ({ title }),
		setFocus: (state, focus) => ({ focus }),

		// searchIsVisible: true,
		// searchText: "",
		// sortName: null,
		// sortIsAsc: true,

		//setSearchIsVisible: (state, searchIsVisible) => ({ searchIsVisible }),
		//setSearchText: (state, searchText) => ({ searchText }),
		// setSort: (state, sortName) => {
		// 	let sortIsAsc = state.sortName == sortName ? !state.sortIsAsc : state.sortIsAsc
		// 	return { sortName, sortIsAsc }
		// },

		setDrawerIsOpen: (state, drawerIsOpen) => ({ drawerIsOpen }),
		toggleDrawerIsOpen: (state) => ({ drawerIsOpen: !state.drawerIsOpen }),

		toggleTheme: (state) => {
			Cookies.set("theme", state.theme == themeLight ? "dark" : "light")
			return {
				theme: state.theme == themeLight ? themeDark : themeLight
			}
		},

		setDialogOpen: (state, dialogOptions) => ({
			dialogOptions: {...optionsDefault, ...dialogOptions},
			dialogIsOpen: true
		}),
		setDialogClose: (state, _) => ({ dialogIsOpen: false }),
	},
}


const optionsDefault = { 
	title: "", 
	text: "", 
	labelOk: "Ok", 
	labelCancel: null, 
	modal: true, 
	type: "info" 
}
