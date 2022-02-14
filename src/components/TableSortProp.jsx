/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import { TableSortLabel } from '@mui/material';
import React from 'react';
import { useRoute } from '../stores/route';



function TableSortProp ({
	children,
	name,
}) {

	// HOOKs
	const { getSearchUrl, setSort } = useRoute()
	const active = getSearchUrl("sortName") == name
	const direction = getSearchUrl("isAsc")== "true" ? "asc" : "desc"

	
	// HANDLEs
	const handleClickSort = e => setSort(name)


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