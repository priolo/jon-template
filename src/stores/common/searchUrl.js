

export default {
	state: {
		queryUrl: "",
	},
	getters: {
		getSearchUrl: (state, name, store) => {
			const searchParams = new URLSearchParams(window.location.search)
			return (searchParams.get(name) ?? "")
		}
	},
	actions: {
	},
	mutators: {
		setSearchUrl: (state, { name, value }) => {
			var queryParams = new URLSearchParams(window.location.search)
			queryParams.set(name, value)
			window.history.replaceState(null, null, "?" + queryParams.toString())
			return { queryUrl: queryParams.toString() }
		},
	},
}

