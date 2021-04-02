import { Button, TextField } from "@material-ui/core";
import { Add as AddIcon  } from "@material-ui/icons";
import { rules, useValidator } from "@priolo/iistore";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import Form from "../../components/form/Form";
import FormParagraph from "../../components/form/FormParagraph";
import FormRow from "../../components/form/FormRow";
import UserWriterSelector from "../../components/selectors/UserWriterSelector";
import { useDoc } from "../../stores/doc";
import { useLayout } from "../../stores/layout";
import { useRoute } from "../../stores/route";
import { useUser } from "../../stores/user";


function DocDetail() {

	// HOOKS
	const { id } = useParams()
	const { t } = useTranslation()
	const { state: layout, setTitle } = useLayout()
	const { state: doc, fetchById, edit, setSelectProp } = useDoc()
	const { state: user, fetchAll: fetchAllUsers} = useUser()
	const { setCurrentPage } = useRoute()
	const titleProp = useValidator(doc.select.title, [rules.obligatory])

	useEffect(() => {
		setCurrentPage("doc.detail")
		if (!id) return
		if (id == "new") edit()
		else fetchById(id).then((doc) => edit(doc))
		if (user.all.length == 0) fetchAllUsers()
	}, [id])



	// HANDLERS
	const handleChangeTitle = e => setSelectProp({ name: "title", value: e.target.value })
	const handleChangeDesc = e => setSelectProp({ name: "desc", value: e.target.value })
	const handleChangeLink = e => setSelectProp({ name: "link", value: e.target.value })
	const handleChangeAuthor = e => setSelectProp({ name: "author_id", value: e.target.value })
	const handleClickCancel = e => console.log("handleClickCance")
	const handleClickSave = e => console.log("handleClickSave")



	// RENDER
	if (!doc.select) return null

	return (
		<Form
			renderFooter={<>
				<Button onClick={handleClickCancel}>
					{t("pag.doc.detail.cancel")}
				</Button>
				<Button variant="contained"
					color="primary"
					startIcon={<AddIcon />}
					onClick={handleClickSave}
				>
					{t("pag.doc.detail.save")}
				</Button>
			</>}
		>
			<FormParagraph title={t("pag.doc.detail.title")}>

				<FormRow label={t("pag.doc.detail.title")}>
					<TextField autoFocus fullWidth
						{...titleProp}
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
					<UserWriterSelector
						value={doc.select.author_id}
						onChange={handleChangeAuthor}
					/>
				</FormRow>

			</FormParagraph>
		</Form>)
}

export default DocDetail