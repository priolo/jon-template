import { useDoc } from "../../stores/doc"
import UserWriterSelector from "../../components/selectors/UserWriterSelector"


function DocFilters() {

	const { state: doc, getSearchUrl, setSearchUrl } = useDoc() 

	const handleChange = value => setSearchUrl({ name: "author", value })

	return (<>
		<UserWriterSelector 
			label="Author" 
			value={getSearchUrl("author")}
			onChange={handleChange}	
		/>
	</>)
}


export default DocFilters