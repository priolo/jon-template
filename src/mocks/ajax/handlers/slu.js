/* eslint eqeqeq: "off" */
import { requestValidator } from '../utils'


export default [

	// view sdu configs
	requestValidator("get", '/api/slu/matrix', (req, res, ctx) => {
		return res(
			ctx.delay(500),
			ctx.status(200),
			ctx.json({
				"id": "af263639-a345-4062-b5a1-d8091cf2bbd5",
				"created_at": "2020-09-29T11:15:05.516070315Z",
				"updated_at": "2020-09-29T14:15:53.292934811+03:00",
				"ka_1_input": 13,
				"ka_2_input": 2,
				"ku_1_input": 3,
				"ku_2_input": 1,
				"x_1_input": 16,
				"x_2_input": 6,
				"ka_1_out": 1,
				"ka_2_out": 2,
				"ku_1_out": 3,
				"ku_2_out": 4,
				"x_1_out": 5,
				"x_2_out": 10
			})
		)
	}),

	// update sdu params
	requestValidator("patch", '/api/slu/matrix', (req, res, ctx) => {
		const { ka_1_input, ka_2_input, ku_1_input, ku_2_input, x_1_input, x_2_input, ka_1_out, ka_2_out, ku_1_out, ku_2_out, x_1_out, x_2_out } = req.body
		if (!ka_1_input || !ka_2_input || !ku_1_input || !ku_2_input || !x_1_input || !x_2_input || !ka_1_out || !ka_2_out || !ku_1_out || !ku_2_out || !x_1_out || !x_2_out) return res(ctx.status(401))
		return res(
			ctx.delay(500),
			ctx.status(200),
			ctx.json({
				"ka_1_input": ka_1_input,
				"ka_2_input": ka_2_input,
				"ku_1_input": ku_1_input,
				"ku_2_input": ku_2_input,
				"x_1_input": x_1_input,
				"x_2_input": x_2_input,
				"ka_1_out": ka_1_out,
				"ka_2_out": ka_2_out,
				"ku_1_out": ku_1_out,
				"ku_2_out": ku_2_out,
				"x_1_out": x_1_out,
				"x_2_out": x_2_out
			})
		)
	}),

]