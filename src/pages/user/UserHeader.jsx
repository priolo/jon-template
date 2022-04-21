import SearchBox from "components/SearchBox"
import routeStore from "stores/route";
import { useStore17 } from "@priolo/jon";


function UserHeader() {

	useStore17(routeStore)
	const { getSearchUrl, setSearchUrl } = routeStore

	return (
		<SearchBox
			value={getSearchUrl("search")}
			onChange={value => setSearchUrl({ name: "search", value })}
		/>
	)
}


export default UserHeader