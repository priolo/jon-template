/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import { validateAll, resetAll, createStore } from "@priolo/jon"
import { eq } from "@priolo/jon-utils"
import i18n from "i18next";
import ajax from "plugins/AjaxService"

import { DIALOG_TYPES } from "../layout/utils";
import { USER_ROLES } from "./utils";
import layoutStore from "../layout"
import routeStore from "../route";


/**
 * MODEL
	
email: string //obbligatory
role: ROLE_TYPE

*/
const store = createStore({
	state: {
		all: [],
		dialogEditIsOpen: false,
		select: null,
		selectOrigin: null,
	},
	getters: {
		getList: (_, {state}) => {
			const { getSearchUrl, getSorted } = routeStore
			let users = [...state.all]

			let txt = getSearchUrl("search").trim().toLowerCase()
			if (txt.length > 0) {
				users = users.filter(user =>
					user.username.toLowerCase().indexOf(txt) != -1
					|| user.email.toLowerCase().indexOf(txt) != -1
				)
			}
			users = getSorted({ items: users })
			return users
		},
		canSave: (_, {state}) => {
			const { select: user, selectOrigin: original } = state
			return user && !eq.isEqualDeep(user, original)
		},
		getById: (id, {state}) => {
			return state.all.find(user => user.id == id)
		}
	},
	actions: {
		// get alla USER
		fetchAll: async (_, store) => {
			const data = await ajax.get(`users`);
			store.setAll(data)
			//store.setQueryUrl(document.location.search)
		},

		edit: async (user, store) => {
			if (!user) user = {
				username: "",
				email: "",
				role: USER_ROLES.CUSTOMER
			}
			store.setSelect(user)
			resetAll()
			store.setDialogEditIsOpen(true)
		},

		save: async (_, {state, ...store}) => {
			const { dialogOpen } = layoutStore
			const { select: user } = state
			if (!user) return false

			// validation
			const errs = validateAll()
			if (errs.length > 0) return false

			// ajax
			if (!user.id) {
				await ajax.post(`users`, user);
			} else {
				await ajax.put(`users/${user.id}`, user);
			}

			// feedback
			store.setDialogEditIsOpen(false)
			store.setSelect(null)
			dialogOpen({ type: DIALOG_TYPES.SUCCESS, text: i18n.t("dialog.feedback.create"), modal: false })

			// update users list
			store.fetchAll()
		},

		destroy: async (user, store) => {
			const { dialogOpen } = layoutStore
			if (!user) return

			const res = await dialogOpen({
				type: DIALOG_TYPES.WARNING,
				title: i18n.t("dialog.feedback.delete.confirm.title"),
				text: i18n.t("dialog.feedback.delete.confirm.text"),
				labelOk: i18n.t("dialog.feedback.delete.confirm.yes"),
				labelCancel: i18n.t("dialog.feedback.delete.confirm.no"),
			})
			if (!res) return

			await ajax.delete(`users/${user.id}`);
			dialogOpen({ type: DIALOG_TYPES.SUCCESS, text: i18n.t("dialog.feedback.delete.success"), modal: false })

			store.fetchAll()
		},

	},
	mutators: {
		setAll: all => ({ all }),
		setDialogEditIsOpen: dialogEditIsOpen => ({ dialogEditIsOpen }),
		setSelect: selectOrigin => ({ selectOrigin, select: { ...selectOrigin } }),
		setEmail: (email, {state}) => ({ select: { ...state.select, email } }),
		setUsername: (username, {state}) => ({ select: { ...state.select, username } }),
		setRole: (role, {state}) => ({ select: { ...state.select, role } }),
	},
})


export default store