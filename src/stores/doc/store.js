import { mixStores } from "@priolo/iistore";
import ajax from "../../plugins/AjaxService"
import sortStore from "../common/sort"
import searchUrlStore from "../common/searchUrl";
import { getStoreUser } from "../user";



const store = {
	state: {
		all: [],
		select: null
	},
	getters: {
		getList: (state, _, store) => {
			let docs = [...state.all]

			let txt = store.getSearchUrl("search").trim().toLowerCase()
			let authorId = store.getSearchUrl("author")
			if (txt.length > 0 || authorId ) {
				docs = docs.filter(doc => 
					(!txt || doc.title.toLowerCase().indexOf(txt) != -1)
					&&
					(!authorId || doc.author_id==authorId)
				)
			}


			//docs = store.getSorted(docs)
			return docs;
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
			store.setAll(data)
		},
	},
	mutators: {
		setAll: (state, all) => ({ all }),
		setSelect: (state, select) => ({ select }),
	},
}

export default mixStores(
	store,
	sortStore,
	searchUrlStore,
)