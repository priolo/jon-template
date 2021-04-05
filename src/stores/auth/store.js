/* eslint eqeqeq: "off" */
import ajax from "../../plugins/AjaxService";

import Cookies from 'js-cookie'
import i18n from "i18next";
import { getStoreLayout } from "../layout"
import { DIALOG_TYPES } from "../layout/utils";
import { validateAll, resetAll } from "@priolo/iistore";


let idPolling = null

export default {
	state: {
		user: null, //{ id:<???>, username:<string>, has_to_change_password:<bool>, role:<???> }
		token: Cookies.get('token'),

		username: "",
		oldpassword: "",
		password: "",
		repassword: "",
		isChangePasswordOpen: false,
	},
	getters: {
		isLogged: state => state.token != null && state.user != null,
		isRepassword: state => {
			return state.user != null && state.user.has_to_change_password == true
		},
	},
	actions: {
		login: async (state, payload, store) => {
			const { dialogOpen } = getStoreLayout()

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
		logout: (state, { flash } = { flash: false }, store) => {
			const { dialogOpen } = getStoreLayout()
			store.stopPollingRefreshToken()
			store.setToken(null)
			store.setUser(null)
			if (flash) dialogOpen({ type: DIALOG_TYPES.SUCCESS, text: i18n.t("app.auth.logout"), modal: false })
		},
		refresh: async (state, payload, store) => {
			if (state.token == null) return
			await store.fetchCurrentUser()
		},
		changePassword: async (state, payload, store) => {
			const { dialogOpen } = getStoreLayout()
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
		fetchCurrentUser: async (state, payload, store) => {
			try {
				const response = await ajax.get("auth/me");
				store.setUser(response)
				store.startPollingRefreshToken()
			} catch (error) {
				store.logout()
			}
		},
		refreshToken: async (state, payload, store) => {
			try {
				const response = await ajax.get("auth/refresh", null, { noBusy: true });
				store.setToken(response.access_token)
			} catch (error) {
				store.logout()
			}
		},
		startPollingRefreshToken: (state, payload, store) => {
			if (idPolling != null) return;
			const delay = process.env.REACT_APP_TOKEN_POLLING_TIME != null ? +process.env.REACT_APP_TOKEN_POLLING_TIME : 720000
			idPolling = setInterval(() => {
				store.refreshToken()
			}, delay)
		},
		stopPollingRefreshToken: (state, payload, store) => {
			if (idPolling == null) return;
			clearInterval(idPolling)
			idPolling = null
		},
	},
	mutators: {
		// [II] deve essere il layout che pesca lo user e adatta la lista non il contrario
		setUser: (state, user, store) => ({ user }),
		setToken: (state, token, store) => {
			if (token == null) {
				Cookies.remove('token');
			} else {
				Cookies.set('token', token) //, { expires: remember ? 365 : null });
			}
			return { token }
		},
		setIsChangePasswordOpen: (state, isChangePasswordOpen) => ({ isChangePasswordOpen }),

		setUsername: (state, username) => ({ username }),
		setPassword: (state, password) => ({ password }),
		setOldPassword: (state, oldpassword) => ({ oldpassword }),
		setRepassword: (state, repassword) => ({ repassword }),
		resetTexts: (state) => {
			resetAll()
			return { username: "", password: "", repassword: "", oldpassword: "" }
		},
	},
}
