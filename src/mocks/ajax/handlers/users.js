/* eslint eqeqeq: "off" */
import { requestValidator } from '../utils'
import list from "../../data/users"
import { USER_ROLES } from '../../../stores/user/utils'

//const list = [...users]

export default [

	// index
	requestValidator("get", '/api/users', (req, res, ctx) => {
		const users = list.map(({ id, username, email, role }) => ({ id, username, email, role }))
		return res(
			ctx.delay(500),
			ctx.status(200),
			ctx.json(users)
		)
	}),

	// get
	requestValidator("get", '/api/users/:id', (req, res, ctx) => {
		if (req.cookies.token == null) return res(ctx.status(401))
		const id = req.params.id

		let user = list.find(item => item.id == id)
		if (!user) return res(ctx.status(404))
		user = {
			id: user.id,
			username: user.username,
			email: user.email,
			role: user.role,
		}

		return res(
			ctx.delay(500),
			ctx.status(200),
			ctx.json(user)
		)
	}),

	// create
	requestValidator("post", '/api/users', (req, res, ctx) => {
		if (req.cookies.token == null) return res(ctx.status(401))
		const { username, email, role } = req.body;

		// check params
		if (username == null) return res(ctx.status(500))

		// check univocity
		const index = list.findIndex(user => user.username == username);
		if (index != -1) return res(
			ctx.status(400),
			ctx.json({ "errors": [{ "code": "unique", "field": "username" }] })
		)

		// create and add
		const user = {
			id: Math.floor(Math.random()*9999),
			username,
			email, 
			role 
		}
		list.push(user)

		// send success
		return res(
			ctx.delay(500),
			ctx.status(200),
		)
	}),

	// update
	requestValidator("put", '/api/users/:id', (req, res, ctx) => {
		if (req.cookies.token == null) return res(ctx.status(401))
		const { username, email, role } = req.body
		const id = req.params.id

		// find item
		const index = list.findIndex(user => user.id == id)
		if (index == -1) return res(ctx.status(404))

		// modify item
		const user = { ...list[index], ...{ username, email, role } }
		list[index] = user

		return res(
			ctx.delay(500),
			ctx.status(200),
			ctx.json(user)
		)
	}),

	// delete
	requestValidator("delete", '/api/users/:id', (req, res, ctx) => {
		if (req.cookies.token == null) return res(ctx.status(401))
		const id = req.params.id

		// check if exist
		const index = list.findIndex(item => item.id == id)
		if (index == -1) return res(ctx.status(404))

		// delete user
		const item = list.splice(index, 1)

		// send success
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