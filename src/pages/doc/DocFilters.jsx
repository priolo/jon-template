import { useDoc } from "../../stores/doc"
import UserWriterSelector from "../../components/selectors/UserWriterSelector"
import { useRoute } from "../../stores/route"
import { useEffect } from "react"


function DocFilters() {

	const { state: doc } = useDoc()
	const { getSearchUrl, setSearchUrl } = useRoute()

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