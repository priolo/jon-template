/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import { DIALOG_TYPES } from "./utils";
import i18n from "i18next";

// used when dialog closed
let resolveClose = null;

const store = {
	state: {
		dialogIsOpen: false,
		dialogOptions: null,
	},
	actions: {
		dialogOpen: (state, options, store) => {
			store.setDialogOpen(options)
			return new Promise((resolve, reject) => {
				resolveClose = resolve
			})
		},
		dialogClose: (state, payload, store) => {
			store.setDialogClose()
			if (resolveClose) resolveClose(payload)
			resolveClose = null
			//store._update()
		}
	},
	mutators: {
		setDialogOpen: (state, options) => {
			options = { ...optionsDefault, ...options }
			if (options.type && options.modal) {
				const path = `dialog.${options.type}.default`
				options = {
					title: i18n.t(`${path}.title`),
					text: i18n.t(`${path}.text`),
					labelOk: i18n.t(`${path}.ok`),
					...options
				}
			}
			return {
				dialogOptions: options,
				dialogIsOpen: true
			}
		},
		setDialogClose: (state, _) => ({ dialogIsOpen: false }),
	},
}

export default store

const optionsDefault = {
	modal: true,
	type: DIALOG_TYPES.INFO,
}
