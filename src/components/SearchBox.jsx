import makeStyles from '@mui/styles/makeStyles';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { InputBase, alpha, IconButton, Box } from '@mui/material';


function SearchBox({
	value,
	onChange,
}) {

	// HOOKs
	const classes = useStyles()
	

	// HANDLEs
	const handleChange = e => onChange(e?.target.value ?? "")


	// RENDER
	const haveAdorner = value != null && value.length > 0
	
	return (
        <div className={classes.searchBox}>

			<SearchIcon className={classes.searchIcon} />

			<Box ml={2} />

			<InputBase
				placeholder="Search…"
				className={classes.input}
				value={value}
				onChange={handleChange}
				endAdornment={haveAdorner && (
					<IconButton className={classes.clearIcon} onClick={e => handleChange()} size="large"><ClearIcon /></IconButton>
				)}
			/>

		</div>
    );
}

export default SearchBox

const useStyles = makeStyles((theme) => ({

	searchBox: {
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
	},

	searchIcon: {
		flex: "0 1 auto",
	},

	clearIcon: {
		color: "inherit",
		padding: "0 5px"
	},

	input: {
		flex: "1 1 auto",
		color: 'inherit',
	},

}));