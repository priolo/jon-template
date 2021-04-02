import i18n from "i18next";

export default {
	state: {
		currentPage: "",
		queryUrl: "",
	},
	getters: {
		getTitleCurrentPage: (state, _, store) => {
			return i18n.t(`pag.${state.currentPage}.title`)
		},

		getSearchUrl: (state, name, store) => {
			const searchParams = new URLSearchParams(window.location.search)
			return (searchParams.get(name) ?? "")
		},
		getSorted: ( state, {items, map}, store) => {
			const sortName = store.getSearchUrl("sortName")
			const isAsc = store.getSearchUrl("isAsc") == "true"
			const extractor = map?.[sortName]
			if ( !extractor ) {
				return items.sort(
					(a, b) => (a[sortName] < b[sortName] ? -1 : 1) * (isAsc ? 1 : -1)
				)
			}
			return items.sort(
				(a, b) => extractor(a,b) * (isAsc ? 1 : -1)
			)
		},
		haveSearchExtra: (state, name, store) => {
			const searchParams = new URLSearchParams(window.location.search)
			const keys = searchParams.keys()
			console.log([...keys] )

			return [...keys].some ( key => key!="sortName" || key!="isAsc" || key!="search")
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

export const URL_PARAMS_COMMON = {

}