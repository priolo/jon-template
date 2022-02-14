/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';


function LangSelector() {

	// HOOKs
	const { t, i18n } = useTranslation();

	// HANDLEs
	const handleChange = async (e) => {
		await i18n.changeLanguage(e.target.value)
	}

	// RENDER
	const langs = ["en", "it"]
	
	return (
		<FormControl margin="dense" size="small">
			<InputLabel>{"cambio"}</InputLabel>
			<Select autoWidth
				label={"cambio"}
				value={i18n.resolvedLanguage}
				onChange={handleChange}
			>
				{langs.map( lang => (
					<MenuItem key={lang} value={lang}>
						{t(`app.lang.${lang}`)}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

export default LangSelector
