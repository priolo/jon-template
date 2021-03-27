import { getStoreLayout } from "../layout"
import ajax from "../../plugins/AjaxService"


export default {
	state: {
		all: [],
		select: null
	},
	getters: {
	},
	actions: {
		// get alla DOCs
		fetchAll: async (state, _, store) => {
			const data = await ajax.get(`docs`);
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

