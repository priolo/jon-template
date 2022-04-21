/* eslint react-hooks/exhaustive-deps: "off" */
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLayout } from "../stores/layout";
import i18n from "i18next"

import layoutStore from "stores/layout";
import { useStore17 } from "@priolo/jon";


/**
 * If there is a "change" it asks the user if he really wants to change the page
 * @param {()=>boolean} callbackChanged call to understand if anything has changed on the page
*/
export function useConfirmationRouter(callbackChanged) {

	const history = useHistory()
	useStore17(layoutStore)
	const { dialogOpen } = layoutStore

	useEffect(() => {
		/**
		 * @see https://github.com/remix-run/history/blob/main/docs/blocking-transitions.md
		 */
		let unblock = history.block((location) => {
			if (location.hash?.length > 0) return true

			// if something has changed on the page then ask for confirmation
			if (callbackChanged()) {
				(async () => {
					if (await dialogOpen({
						type: "warning",
						title: i18n.t("pag.default.dlg.router_confirm.title"),
						text: i18n.t("pag.default.dlg.router_confirm.text"),
						labelOk: i18n.t("pag.default.dlg.router_confirm.labelOk"),
						labelCancel: i18n.t("pag.default.dlg.router_confirm.labelCancel"),
					})) {
						unblock()
						history.push(location)
					}
				})()
				return false
			}
			unblock()
			return true
		})
		
		// called when the component of this hook is unmounted
		return unblock
	}, [])

}