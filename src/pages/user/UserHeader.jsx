import SearchBox from "../../components/SearchBox"
import { useRoute } from "../../stores/route"
import { useUser } from "../../stores/user"


function UserHeader() {

	const { state: user } = useUser()
	const { getSearchUrl, setSearchUrl } = useRoute()

	return (<>
		<SearchBox
			value={getSearchUrl("search")}
			onChange={value => setSearchUrl({ name: "search", value })}
		/>
	</>)
}


export default UserHeader