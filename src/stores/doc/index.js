/* eslint eqeqeq: "off" */
import ajax from "plugins/AjaxService"
import { validateAll, createStore } from "@priolo/jon"
import { eq } from "@priolo/jon-utils"
import i18n from "i18next";

import routeStore from "../route"
import layoutStore from "../layout"
import { DIALOG_TYPES } from "../layout/utils"


const store = createStore({
	state: {
		all: [],
		select: null,
		selectOrigin: null,
	},
	getters: {
		getList: (_, {state}) => {
			const { getSearchUrl, getSorted } = routeStore
			let docs = [...state.all]

			let txt = getSearchUrl("search").trim().toLowerCase()
			let authorId = getSearchUrl("author")
			if (txt.length > 0 || authorId ) {
				docs = docs.filter(doc => 
					(!txt || doc.title.toLowerCase().indexOf(txt) != -1)
					&&
					(!authorId || doc.author_id==authorId)
				)
			}

			docs = getSorted({items: docs})
			return docs
		},
		canSave: (_, {state}) => {
			const { select: doc, selectOrigin: original } = state
			return doc && !eq.isEqualDeep(doc, original)
		},
		isSelectChanged: (_, {state}) => {
			const { select: doc, selectOrigin: original } = state
			return doc && !eq.isEqualDeep(doc, original)
		},
	},
	actions: {
		// get alla DOCs
		fetchAll: async (_, store) => {
			const data = await ajax.get(`docs`)
			store.setAll(data)
		},
		fetchById: async (id, store) => {
			const data = await ajax.get(`docs/${id}`);
			store.setSelect(data)
			return data
		},
		edit: async (doc, store) => {
			if (!doc) doc = {
				title: "",
				desc: "",
				link: "",
				author_id: null,
			}
			store.setSelect(doc)
		},
		save: async (_, {state, ...store}) => {
			const { dialogOpen } = layoutStore
			const { select: doc } = state
			if (!doc) return false

			// validation
			const errs = validateAll()
			if ( errs.length > 0 ) return false

			if (!doc.id) {
				await ajax.post(`docs`, doc);
			} else {
				await ajax.put(`docs/${doc.id}`, doc);
			}

			store.setSelect(null)
			dialogOpen({ type: DIALOG_TYPES.SUCCESS, text: i18n.t("dialog.feedback.create"), modal: false })
			//window.history.back()
			return true
		},

		destroy: async (doc, store) => {
			const { dialogOpen } = layoutStore
			if (!doc) return

			const res = await dialogOpen({
				type: DIALOG_TYPES.WARNING,
				title: i18n.t("dialog.feedback.delete.confirm.title"),
				text: i18n.t("dialog.feedback.delete.confirm.text"),
				labelOk: i18n.t("dialog.feedback.delete.confirm.yes"),
				labelCancel: i18n.t("dialog.feedback.delete.confirm.no"),
			})
			if (!res) return

			await ajax.delete(`docs/${doc.id}`);
			dialogOpen({ type: DIALOG_TYPES.SUCCESS, text: i18n.t("dialog.feedback.delete.success"), modal: false })

			store.fetchAll()
		},

	},
	mutators: {
		setAll: all => ({ all }),
		setSelect: selectOrigin => ({ selectOrigin, select: selectOrigin ? { ...selectOrigin }: null }),
		setSelectProp: ({name, value}, {state}) => ({ select: {...state.select, [name]: value} }),
	},
})

export default store