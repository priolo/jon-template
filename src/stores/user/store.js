import { getStore } from "@priolo/iistore"

export default {
	state: {
		all: [],
	},
	getters: {
	},
	actions: {
		// get alla USER
		fetchAll: async (state, payload, store)=> {
			const { setBusy } = getStore("layout")

			setBusy(true)
			// simulat request http
			await new Promise(res=>setTimeout(res,1000))
			store.setAll([
				{ id:1, name: "Ivano" },
				{ id:2, name: "Adoardo" },
				{ id:3, name: "Alfredo" },
			])
			setBusy(false)
		},
	},
	mutators: {
		setAll: (state,all)=>({all}),
	},
}

