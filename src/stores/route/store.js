import i18n from "i18next";

export default {
	state: {
		currentPage: "",
		queryUrl: "",
	},
	getters: {
		getSearchUrl: (state, name, store) => {
			const searchParams = new URLSearchParams(window.location.search)
			return (searchParams.get(name) ?? "")
		},
		getTitleCurrentPage: (state, name, store) => {
			return i18n.t(`pag.${state.currentPage}.title`)
		},
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
		setSearchUrl: (state, { name, value }) => {
			const queryParams = new URLSearchParams(window.location.search)
			queryParams.set(name, value)
			window.history.replaceState(null, null, "?" + queryParams.toString())
			return { queryUrl: queryParams.toString() }
		},
		setCurrentPage: (state, currentPage) => ({currentPage}),
		setSort: (state, sortName, store) => {
			const oldSortName = store.getSearchUrl("sortName")
			const oldIsAsc = store.getSearchUrl("isAsc") == "true"
			let sortIsAsc = oldSortName == sortName ? !oldIsAsc : oldIsAsc
			store.setSearchUrl({name: "sortName", value: sortName})
			store.setSearchUrl({name: "isAsc", value: sortIsAsc})
		},
	},
}
