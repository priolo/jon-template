/* eslint eqeqeq: "off" */
import { requestValidator } from '../utils'
import list from "../../data/users"
import { USER_ROLES } from '../../../stores/user/utils'

//const list = [...users]

export default [

	// index
	requestValidator("get", '/api/users', (req, res, ctx) => {
		return res(
			ctx.delay(500),
			ctx.status(200),
			ctx.json(list)
		)
	}),

	// get
	requestValidator("get", '/api/users/:id', (req, res, ctx) => {
		if (req.cookies.token == null) return res(ctx.status(401))
		const id = req.params.id
		const item = list.find(item => item.id == id)
		if (!item) return res(ctx.status(404))
		return res(
			ctx.delay(500),
			ctx.status(200),
			ctx.json(item)
		)
	}),

	// create
	requestValidator("post", '/api/users', (req, res, ctx) => {
		if (req.cookies.token == null) return res(ctx.status(401))
		const { email } = req.body;

		// check params
		if (email == null) return res(ctx.status(500))

		// check univocity
		const item = list.find(u => u.username == email);
		if (item != null) return res(
			ctx.status(400),
			ctx.json({ "errors": [{ "code": "unique", "field": "username" }] })
		)

		// check email
		return res(
			ctx.delay(500),
			ctx.status(200),
		)
	}),

	// update
	requestValidator("patch", '/api/users/:id', (req, res, ctx) => {
		if (req.cookies.token == null) return res(ctx.status(401))
		const { username, role } = req.body;

		// find item
		const item = list.find(item => item.username == username)
		if (!item) return res(ctx.status(404))

		// modify item
		item.role = role

		return res(
			ctx.delay(500),
			ctx.status(200),
			ctx.json(item)
		)
	}),

	// delete
	requestValidator("delete", '/api/users/:id', (req, res, ctx) => {
		if (req.cookies.token == null) return res(ctx.status(401))
		const id = req.params.id
		const index = list.findIndex(item => item.id == id)
		if (index == -1) return res(ctx.status(404))
		const item = list.splice(index, 1)
		return res(
			ctx.delay(500),
			ctx.status(200),
		)
	}),

	// change password
	requestValidator("patch", '/api/users/:id/password', (req, res, ctx) => {
		if (req.cookies.token == null) return res(ctx.status(401))
		const { old_password, new_password } = req.body;
		const user = list.find(u => u.password == old_password && u.token == req.cookies.token);
		if (user == null) return res(
			ctx.status(400),
			ctx.json({
				"errors": [
					{
						"code": "old_password_match",
						"field": "old_password"
					},
				]
			})
		)
		if (!old_password || !new_password || old_password == new_password) res(ctx.status(500))
		return res(
			ctx.delay(500),
			ctx.status(200),
		)
	}),

]