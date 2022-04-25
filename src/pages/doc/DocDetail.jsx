/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import { Box, Button, TextField } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";

import Form from "components/form/Form";
import FormParagraph from "components/form/FormParagraph";
import FormRow from "components/form/FormRow";
import UserWriterSelector from "components/selectors/UserWriterSelector";

import { useConfirmationRouter } from "hooks/useConfirmationRouter";

import  docStore  from "stores/doc";
import  layoutStore  from "stores/layout";
import  routeStore from "stores/route";
import { rules, useValidator, useStore17 } from "@priolo/jon";



function DocDetail() {

	// HOOKS
	const { id } = useParams()
	const { t } = useTranslation()
	const navigate = useNavigate()
	
	const doc = useStore17(docStore)
	const { fetchById, edit, setSelectProp, canSave, isSelectChanged, save } = docStore

	const { setCurrentPage } = routeStore
	const { setTitle } = layoutStore
	const titleProp = useValidator(doc.select?.title, [rules.obligatory])
	const linkProp = useValidator(doc.select?.link, [rules.url])

	useEffect(() => {
		setCurrentPage("doc.detail")
		if (!id) return
		if (id == "new") {
			setTitle("pag.doc.detail.title_new")
			edit()
		} else {
			setTitle("pag.doc.detail.title_edit")
			fetchById(id).then((doc) => edit(doc))
		}
	}, [id])

	useConfirmationRouter(isSelectChanged)



	// HANDLERS
	const handleChangeTitle = e => setSelectProp({ name: "title", value: e.target.value })
	const handleChangeDesc = e => setSelectProp({ name: "desc", value: e.target.value })
	const handleChangeLink = e => setSelectProp({ name: "link", value: e.target.value })
	const handleChangeAuthor = value => setSelectProp({ name: "author_id", value })
	const handleClickCancel = e => navigate(-1)
	const handleClickSave = e => save().then((success) => {
		if (success) navigate(-1)
	})



	// RENDER
	if (!doc.select) return null

	return (
		<Form
			renderFooter={<>
				<Button variant="contained"
					color="primary"
					startIcon={<AddIcon />}
					disabled={!canSave()}
					onClick={handleClickSave}
				>
					{t("pag.doc.detail.save")}
				</Button>
				<Box ml={2} />
				<Button onClick={handleClickCancel}>
					{t("pag.doc.detail.cancel")}
				</Button>
			</>}
		>
			<FormParagraph title={t("pag.doc.detail.title_form")}>

				<FormRow label={t("pag.doc.detail.title_field")}>
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
						{...linkProp}
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
