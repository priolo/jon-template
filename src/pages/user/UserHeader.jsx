import SearchBox from "../../components/SearchBox"
import { useUser } from "../../stores/user"


function UserHeader() {

	const { state: user, setSearchUrl, getSearchUrl } = useUser()

	return (<>
		<SearchBox
			value={getSearchUrl("search")}
			onChange={value => setSearchUrl({ name: "search", value })}
		/>
	</>)
}


export default UserHeader