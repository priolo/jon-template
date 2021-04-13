/* eslint eqeqeq: "off" */
import { rest } from "msw"
import users from "../data/users"

const TXT_BEARER = "Bearer"
const TXT_AUTH = "Authorization"

/**
verify that the user has this token Actually I should decrypt it but ... it's a mock!
 * @param {*} method 
 * @param {*} url 
 * @param {*} callback 
 * @returns 
 */
export function requestValidator(method, url, callback) {
	return rest[method](url, (req, res, ctx) => {
		const auth = req.headers.get(TXT_AUTH)
		if (auth == null || auth.startsWith(TXT_BEARER) == false) return res(ctx.status(401))
		const token = auth.slice(TXT_BEARER.length + 1)
		const user = users.find(user => user.token == token)
		if (!user) return res(ctx.status(401))
		res.user = { ...user }
		return callback(req, res, ctx)
	})
}

