import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { InputBase, alpha, IconButton, Box } from '@mui/material';


function SearchBox({
	value,
	onChange,
}) {

	// HOOKs

	// HANDLEs
	const handleChange = e => onChange(e?.target.value ?? "")


	// RENDER
	const haveAdorner = value != null && value.length > 0

	return (
		<Box sx={cssSearchBox}>

			<SearchIcon sx={cssSearchIcon} />

			<Box ml={2} />

			<InputBase
				placeholder="Search…"
				sx={cssInput}
				value={value}
				onChange={handleChange}
				endAdornment={haveAdorner && (
					<IconButton sx={cssClearIcon} onClick={e => handleChange()} size="large"><ClearIcon /></IconButton>
				)}
			/>

		</Box>
	);
}

export default SearchBox

const cssSearchBox = theme => ({
	display: "flex",
	alignItems: "center",
	width: "100%",
	minHeight: "48px",
	padding: "0px 10px",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
})

const cssSearchIcon = theme => ({
	flex: "0 1 auto",
})

const cssClearIcon = theme => ({
	color: "inherit",
	padding: "0 5px"
})

const cssInput = theme => ({
	flex: "1 1 auto",
	color: 'inherit',
})
