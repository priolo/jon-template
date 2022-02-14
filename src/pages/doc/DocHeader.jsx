import { Badge, Grid, IconButton } from "@mui/material"
import { FilterList as FiltersIcon } from '@mui/icons-material'

import SearchBox from "components/SearchBox"
import { useLayout } from "stores/layout"
import { useRoute } from "stores/route"


function DocHeader() {

	const { state: layout, setDrawerRightIsOpen } = useLayout()
	const { getSearchUrl, setSearchUrl } = useRoute()

	const notHaveFilter = !getSearchUrl("author")

	const handleClickFilter = e => setDrawerRightIsOpen(!layout.drawerRightIsOpen)

	return (
        <Grid container wrap="nowrap">
            <SearchBox
                value={getSearchUrl("search")}
                onChange={value => setSearchUrl({ name: "search", value })}
            />
            <Badge color="error" variant="dot" invisible={notHaveFilter} overlap="circular">
                <IconButton color="inherit" onClick={handleClickFilter} size="large">
                    <FiltersIcon />
                </IconButton>
            </Badge>
        </Grid>
    );
}


export default DocHeader