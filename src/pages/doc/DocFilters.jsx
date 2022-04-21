import UserWriterSelector from "components/selectors/UserWriterSelector"
import routeStore from "stores/route";
import { useStore17 } from "@priolo/jon";


function DocFilters() {

	useStore17(routeStore)
	const { getSearchUrl, setSearchUrl } = routeStore

	const handleChange = value => setSearchUrl({ name: "author", value })

	return (
		<UserWriterSelector
			label="Author"
			value={getSearchUrl("author")}
			onChange={handleChange}
		/>
	)
}


export default DocFilters