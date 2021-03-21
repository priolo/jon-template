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

			const response = await fetch('/api/users')
			const data = await response.json()
			console.log(data);

			await new Promise(res=>setTimeout(res,1000))
			store.setAll(data)
			setBusy(false)
		},
	},
	mutators: {
		setAll: (state,all)=>({all}),
	},
}

