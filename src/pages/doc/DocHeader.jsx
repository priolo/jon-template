import { Badge, Grid, IconButton } from "@mui/material"
import { FilterList as FiltersIcon } from '@mui/icons-material'

import SearchBox from "components/SearchBox"
import layoutStore from "stores/layout";
import routeStore from "stores/route";
import { useStore } from "@priolo/jon";


function DocHeader() {

    const layout = useStore(layoutStore)
    const { setDrawerRightIsOpen } = layoutStore
    useStore(routeStore)
    const { getSearchUrl, setSearchUrl } = routeStore
    
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