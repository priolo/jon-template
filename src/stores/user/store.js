import { getStoreLayout } from "../layout"
import ajax from "../../plugins/AjaxService"


export default {
	state: {
		all: [],
	},
	getters: {
	},
	actions: {
		// get alla USER
		fetchAll: async (state, payload, store)=> {
			const data = await ajax.get(`users`);
			store.setAll(data)
		},

	},
	mutators: {
		setAll: (state,all)=>({all}),
	},
}

