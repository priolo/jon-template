import { Badge, IconButton } from "@material-ui/core"
import SearchBox from "../../components/SearchBox"
import { FilterList as FiltersIcon } from '@material-ui/icons'
import { useLayout } from "../../stores/layout"
import { useDoc } from "../../stores/doc"


function DocHeader() {

	const { state: layout, setDrawerRightIsOpen } = useLayout()
	const { state: doc, getSearchUrl, setSearchUrl } = useDoc()

	const notHaveFilter = !getSearchUrl("author")

	const handleClickFilter = e => setDrawerRightIsOpen(!layout.drawerRightIsOpen)

	return (<>
		<SearchBox
			value={getSearchUrl("search")}
			onChange={value => setSearchUrl({ name: "search", value })}
		/>
		<Badge color="error" variant="dot" invisible={notHaveFilter} overlap="circle">
			<IconButton onClick={handleClickFilter}>
				<FiltersIcon />
			</IconButton>
		</Badge>
	</>)
}


export default DocHeader