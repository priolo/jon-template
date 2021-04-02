import { mixStores } from "@priolo/iistore"
import ajax from "../../plugins/AjaxService"
import { getStoreRoute } from "../route"



const store = {
	state: {
		all: [],
		select: null
	},
	getters: {
		getList: (state, _, store) => {
			const { getSearchUrl, fc00 } = getStoreRoute()
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
	},
	actions: {
		// get alla DOCs
		fetchAll: async (state, _, store) => {
			const data = await ajax.get(`docs`)
			store.setAll(data)
		},
		fetchById: async (state, id, store) => {
			const data = await ajax.get(`docs/${id}`);
			store.setSelect(data)
			return data
		},
		edit: async (state, doc, store) => {
			if (!doc) doc = {
				title: "",
				desc: "",
				link: "",
				author_id: null,
			}
			store.setSelect(doc)
		},
	},
	mutators: {
		setAll: (state, all) => ({ all }),
		setSelect: (state, select) => ({ select }),
		setSelectProp: (state, {name, value}) => ({ select: {...state.select, [name]: value} }),
	},
}

export default store