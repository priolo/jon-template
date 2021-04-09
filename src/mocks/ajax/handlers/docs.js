/* eslint eqeqeq: "off" */
import { requestValidator } from '../utils'
import list from "../../data/docs"


export default [

	// index
	requestValidator("get", '/api/docs', (req, res, ctx) => {
		return res(
			ctx.delay(500),
			ctx.status(200),
			ctx.json(list)
		)
	}),

	// get
	requestValidator("get", '/api/docs/:id', (req, res, ctx) => {
		if (req.cookies.token == null) return res(ctx.status(401))
		const id = req.params.id

		const doc = list.find(item => item.id == id)
		if (!doc) return res(ctx.status(404))

		return res(
			ctx.delay(500),
			ctx.status(200),
			ctx.json(doc)
		)
	}),

	// create
	requestValidator("post", '/api/docs', (req, res, ctx) => {
		const { author_id, desc, link, title } = req.body

		// check params
		if (title == null) return res(ctx.status(500))

		// create and add
		const doc = {
			id: Math.floor(Math.random() * 9999),
			author_id, desc, link, title
		}
		list.push(doc)

		// send success
		return res(
			ctx.delay(500),
			ctx.status(200),
		)
	}),

	// update
	requestValidator("put", '/api/docs/:id', (req, res, ctx) => {
		const { author_id, desc, link, title } = req.body
		const id = req.params.id

		// find item
		const index = list.findIndex(doc => doc.id == id)
		if (index == -1) return res(ctx.status(404))

		// modify item
		const doc = { ...list[index], ...{ author_id, desc, link, title } }
		list[index] = doc

		return res(
			ctx.delay(500),
			ctx.status(200),
			ctx.json(doc)
		)
	}),

	// delete
	requestValidator("delete", '/api/docs/:id', (req, res, ctx) => {
		const id = req.params.id

		// check if exist
		const index = list.findIndex(item => item.id == id)
		if (index == -1) return res(ctx.status(404))

		// delete
		const item = list.splice(index, 1)

		// send success
		return res(
			ctx.delay(500),
			ctx.status(200),
		)
	}),
]