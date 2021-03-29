import { TextField } from "@material-ui/core";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import Form from "../../components/form/Form";
import FormParagraph from "../../components/form/FormParagraph";
import FormRow from "../../components/form/FormRow";
import { useDoc } from "../../stores/doc";
import { useLayout } from "../../stores/layout";
import { useRoute } from "../../stores/route";


function DocDetail() {

	// HOOKS
	const { id } = useParams()
	const { t } = useTranslation()
	const { state: layout, setTitle } = useLayout()
	const { state: doc, fetchById, edit, setSelectProp } = useDoc()
	const { setCurrentPage } = useRoute()

	useEffect(() => {
		setCurrentPage("doc.detail")
		if (!id) return
		if (id=="new") edit()
		else fetchById(id).then((doc) => edit(doc))
	}, [id])



	// HANDLERS
	const handleChangeTitle = e => setSelectProp({ name: "title", value: e.target.value })
	const handleChangeDesc = e => setSelectProp({ name: "desc", value: e.target.value })
	const handleChangeLink = e => setSelectProp({ name: "link", value: e.target.value })



	// RENDER
	if ( !doc.select ) return null

	return (<Form>
		<FormParagraph title={t("pag.doc.detail.title")}>

			<FormRow label={t("pag.doc.detail.title")}>
				<TextField autoFocus fullWidth
					value={doc.select.title}
					onChange={handleChangeTitle}
				/>
			</FormRow>

			<FormRow label={t("pag.doc.detail.desc")}>
				<TextField fullWidth multiline
					value={doc.select.desc}
					onChange={handleChangeDesc}
				/>
			</FormRow>

			<FormRow label={t("pag.doc.detail.link")}>
				<TextField fullWidth
					value={doc.select.link}
					onChange={handleChangeLink}
				/>
			</FormRow>

			<FormRow label={t("pag.doc.detail.author")}>
				SPICCIO
			</FormRow>

		</FormParagraph>
	</Form>)
}

export default DocDetail