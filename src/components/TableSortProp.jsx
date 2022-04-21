/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import { TableSortLabel } from '@mui/material';
import React from 'react';

import routeStore from "stores/route";
import { useStore17 } from "@priolo/jon";


function TableSortProp({
	children,
	name,
}) {

	// HOOKs
	useStore17(routeStore)
	const { setSort, getSearchUrl } = routeStore

	const active = getSearchUrl("sortName") == name
	const direction = getSearchUrl("isAsc") == "true" ? "asc" : "desc"


	// HANDLEs
	const handleClickSort = e => {
		setSort(name)
	}


	// RENDER
	return (
		<TableSortLabel
			active={active}
			direction={direction}
			onClick={handleClickSort}
		>{children}
		</TableSortLabel>
	)
}

export default TableSortProp