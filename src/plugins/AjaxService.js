/* eslint eqeqeq: "off" */
import i18n from "i18next"
import { DIALOG_TYPES } from "../stores/layout/utils"
import authStore from "../stores/auth"
import layoutStore from "../stores/layout"



/**
 * @typedef {"POST"|"GET"|"PATCH"|"PUT"} Method
 * 
 * @typedef {Object} OptionCall
 * @property {boolean} noBusy (true) no show busy indictor
 * 
 * @typedef {Object} OptionService
 * @property {string} baseUrl
 */

/** @type {OptionService} */
const optionsDefault = {
	baseUrl: "/api/"
}

/**
 * Handles AJAX communication with the BE
 */
export class AjaxService {
	/**
	 * @param {OptionService} options 
	 */
	constructor(options = optionsDefault) {
		this.options = { ...optionsDefault, ...options }
	}

	/**
	 * sent POST request to BE
	 * @param {string} url  
	 * @param {Object} data  
	 * @param {OptionCall} options  
	 */
	async post(url, data, options) {
		return await this.send(url, "POST", data, options);
	}

	/**
	 * sent GET request to BE
	 * @param {string} url  
	 * @param {Object} data  
	 * @param {OptionCall} options  
	 */
	async get(url, data, options) {
		return await this.send(url, "GET", data, options);
	}

	/**
	 * sent PATCH request to BE
	 * @param {string} url  
	 * @param {Object} data  
	 * @param {OptionCall} options  
	 */
	async patch(url, data, options) {
		return await this.send(url, "PATCH", data, options);
	}

	/**
	 * sent PUT request to BE
	 * @param {string} url  
	 * @param {Object} data  
	 * @param {OptionCall} options  
	 */
	async put(url, data, options) {
		return await this.send(url, "PUT", data, options);
	}

	/**
	 * sent DELETE request to BE
	 * @param {string} url  
	 * @param {Object} data  
	 * @param {OptionCall} options  
	 */
	async delete(url, data, options) {
		return await this.send(url, "DELETE", data, options);
	}

	/**
	 * Send a ajax to server
	 * @param {string} url 
	 * @param {Method} method 
	 * @param {Object} data 
	 * @param {OptionCall} options
	 */
	async send(url, method, data, options = {}) {
		const { setBusy, dialogOpen, setFocus } = layoutStore
		const { state:auth } = authStore

		if (!options.noBusy) setBusy(true)
		const token = auth.token

		// send request
		const response = await fetch(
			`${this.options.baseUrl}${url}`,
			{
				method: method,
				headers: {
					"Content-Type": "application/json",
					...(token && { "Authorization": `Bearer ${token}` })
				},
				body: data ? JSON.stringify(data) : undefined,
			}
		)
		if (!options.noBusy) setBusy(false)

		setFocus("")
		const status = response.status
		let body = null
		try {
			body = await response.json()
		} catch (e) {}

		// error
		if (status >= 400) {
			const error = body && body.errors && body.errors[0] ? body.errors[0] : { code: "default", field: "" }
			dialogOpen({
				type: DIALOG_TYPES.ERROR,
				title: i18n.t(getI18nPathForError(status, url, error.code, "title")),
				text: i18n.t(getI18nPathForError(status, url, error.code, "text")),
				labelOk: i18n.t(getI18nPathForError(status, url, error.code, "ok")),
			})
			setFocus(error.field)
			throw response;
		}
		
		return body
	}
}

/**
 * find correct text in i18n json 
 * @param {string} status 
 * @param {string} url 
 * @param {string} code 
 * @param {string} prop 
 */
function getI18nPathForError(status, url, code, prop) {
	let i
	const context = url.slice(0, (i = url.indexOf("/")) != -1 ? i : undefined)
	return [
		`dialog.error.${context}.${code}.${prop}`,
		`dialog.error.${context}.default.${prop}`,
		`dialog.error.${status}.${code}.${prop}`,
		`dialog.error.${status}.default.${prop}`,
		`dialog.error.default.${prop}`
	]
}



export default new AjaxService()