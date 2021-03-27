import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import Form from "../../components/form/Form";
import FormParagraph from "../../components/form/FormParagraph";
import FormRow from "../../components/form/FormRow";
import { useDoc } from "../../stores/doc";
import { useLayout } from "../../stores/layout";


function DocDetail() {

	const { id } = useParams()
	const { t } = useTranslation()
	const { state: layout, setTitle } = useLayout()
	const { state: doc, fetchById } = useDoc()
	

	useEffect(() => {
		setTitle(t("pag.user.title"))
		if (!id) return
		fetchById(id);
	}, [id])

	return (<Form>
		<FormParagraph title={t("pag.antenna.state.title")} id="state">

			<FormRow label={t("pag.antenna.state.acu")} sublabel={t("pag.antenna.state.acu2")}>
				CICCIO
			</FormRow>

			<FormRow label={t("pag.antenna.state.user")}>
				SPICCIO
			</FormRow>

		</FormParagraph>
	</Form>)
}

export default DocDetail