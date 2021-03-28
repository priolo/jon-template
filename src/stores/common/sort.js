

export default {
	state: {
		sortName: null,
		sortIsAsc: true,
	},
	getters: {
		getSorted: ( state, items, store) => {
			const sortName = store.getSearchUrl("sortName")
			const isAsc = store.getSearchUrl("isAsc") == "true"
			return items.sort(
				(a, b) => (a[sortName] < b[sortName] ? -1 : 1) * (isAsc ? 1 : -1)
			)
		}
	},
	actions: {
	},
	mutators: {
		setSort: (state, sortName, store) => {
			const oldSortName = store.getSearchUrl("sortName")
			const oldIsAsc = store.getSearchUrl("isAsc") == "true"
			let sortIsAsc = oldSortName == sortName ? !oldIsAsc : oldIsAsc
			store.setSearchUrl({name: "sortName", value: sortName})
			store.setSearchUrl({name: "isAsc", value: sortIsAsc})
		},
	},
}

