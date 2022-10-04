import SearchBox from "components/SearchBox"
import routeStore from "stores/route";
import { useStore } from "@priolo/jon";


function UserHeader() {

	useStore(routeStore)
	const { getSearchUrl, setSearchUrl } = routeStore

	return (
		<SearchBox
			value={getSearchUrl("search")}
			onChange={value => setSearchUrl({ name: "search", value })}
		/>
	)
}


export default UserHeader