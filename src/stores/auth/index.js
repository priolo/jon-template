/* eslint eqeqeq: "off" */
import ajax from "plugins/AjaxService";

import Cookies from 'js-cookie'
import i18n from "i18next";
import layoutStore from "../layout"
import { DIALOG_TYPES } from "../layout/utils";
import { validateAll, resetAll, createStore } from "@priolo/jon";


let idPolling = null


/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} username
 * @property {boolean} has_to_change_password
 * @property {string} role
 * 
 * 
 * @typedef {Object} StateAuth
 * @property {User} user
 * @property {string} token
 * @property {string} username
 * @property {string} oldPassword
 * @property {string} password
 * @property {string} repassword
 * @property {boolean} isChangePasswordOpen
 * 
 * @typedef {Object} GettersAuth
 * @property {()=>boolean} isLogged
 * @property {()=>boolean} isRepassword
 * 
 * @typedef {Object} ActionsAuth
 * @property {()=>Promise<void>} login
 * @property {({flash:boolean=false})=>Promise<void>} logout
 * @property {()=>Promise<void>} refresh
 * @property {()=>Promise<{ error:boolean }>} changePassword
 * @property {()=>Promise<void>} fetchCurrentUser
 * @property {()=>Promise<void>} refreshToken
 * @property {()=>Promise<void>} startPollingRefreshToken
 * @property {()=>Promise<void>} stopPollingRefreshToken
 * 
 * @typedef {Object} MutatorsAuth
 * @property {(user:User)=>void} setUser
 * @property {(token:string)=>void} setToken
 * @property {(isChangePasswordOpen:boolean)=>void} setIsChangePasswordOpen
 * @property {(userName:string)=>void} setUsername
 * @property {(user:string)=>void} setPassword
 * @property {(oldPassword:string)=>void} setOldPassword
 * @property {(password:string)=>void} setRepassword
 * @property {(repassword:string)=>void} resetTexts
 * 
 * @typedef {(GettersAuth & ActionsAuth & MutatorsAuth)} StoreAuth
 * @property {StateAuth} state
 */


const store = createStore({
	state: {
		user: null, //{ id:<???>, username:<string>, has_to_change_password:<bool>, role:<???> }
		token: Cookies.get('token'),

		username: "admin",
		oldpassword: "",
		password: "secret",
		repassword: "",
		isChangePasswordOpen: false,
	},
	getters: {
		isLogged: (_, {state}) => state.token != null && state.user != null,
		isRepassword: (_, {state}) => {
			return state.user != null && state.user.has_to_change_password == true
		},
	},
	actions: {
		login: async (_, {state, ...store}) => {
			const { dialogOpen } = layoutStore

			const res = validateAll()
			if (res.length > 0) {
				dialogOpen({ type: DIALOG_TYPES.WARNING, text: i18n.t("dialog.login.form.text") })
				return
			}

			const data = {
				username: state.username,
				password: state.password,
			}
			try {
				const response = await ajax.post("auth/login", data)
				store.resetTexts() // remove password from memory
				store.setToken(response.access_token)
			} catch (error) {
				//dialogOpen({ type: DIALOG_TYPES.WARNING, text: i18n.t("app.auth.failed"), modal: false })
				store.logout()
				return
			}
			// msg success!!
			dialogOpen({ type: DIALOG_TYPES.SUCCESS, text: i18n.t("app.auth.succeeded"), modal: false })
			// get the user
			await store.fetchCurrentUser()
		},
		logout: ({ flash } = { flash: false }, store) => {
			const { dialogOpen } = layoutStore
			store.stopPollingRefreshToken()
			store.setToken(null)
			store.setUser(null)
			if (flash) dialogOpen({ type: DIALOG_TYPES.SUCCESS, text: i18n.t("app.auth.logout"), modal: false })
		},
		refresh: async (_, {state, ...store}) => {
			if (state.token == null) return
			await store.fetchCurrentUser()
		},
		changePassword: async (_, {state, ...store}) => {
			const { dialogOpen } = layoutStore
			const data = {
				old_password: state.oldpassword,
				new_password: state.repassword,
			}
			store.resetTexts()

			try {
				await ajax.patch(`users/${state.user.id}/password`, data);
			} catch (e) {
				return { error: true }
			}

			dialogOpen({
				type: "success",
				text: i18n.t("pag.password.msg_success"),
				modal: false,
			})
			store.setUser({ ...state.user, has_to_change_password: false })
			return { error: false }
		},
		fetchCurrentUser: async (_, store) => {
			try {
				const response = await ajax.get("auth/me");
				store.setUser(response)
				store.startPollingRefreshToken()
			} catch (error) {
				store.logout()
			}
		},
		refreshToken: async (_, store) => {
			try {
				const response = await ajax.get("auth/refresh", null, { noBusy: true });
				store.setToken(response.access_token)
			} catch (error) {
				store.logout()
			}
		},
		startPollingRefreshToken: (_, store) => {
			if (idPolling != null) return;
			const delay = process.env.REACT_APP_TOKEN_POLLING_TIME != null ? +process.env.REACT_APP_TOKEN_POLLING_TIME : 720000
			idPolling = setInterval(() => {
				store.refreshToken()
			}, delay)
		},
		stopPollingRefreshToken: (_, store) => {
			if (idPolling == null) return;
			clearInterval(idPolling)
			idPolling = null
		},
	},
	mutators: {
		// [II] deve essere il layout che pesca lo user e adatta la lista non il contrario
		setUser: user => ({ user }),
		setToken: token => {
			if (token == null) {
				Cookies.remove('token');
			} else {
				Cookies.set('token', token) //, { expires: remember ? 365 : null });
			}
			return { token }
		},
		setIsChangePasswordOpen: isChangePasswordOpen => ({ isChangePasswordOpen }),

		setUsername: username => ({ username }),
		setPassword: password => ({ password }),
		setOldPassword: oldpassword => ({ oldpassword }),
		setRepassword: repassword => ({ repassword }),
		resetTexts: _ => {
			resetAll()
			return { username: "", password: "", repassword: "", oldpassword: "" }
		},
	},
})

export default store