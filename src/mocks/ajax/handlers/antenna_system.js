/* eslint eqeqeq: "off" */
import { requestValidator } from '../utils'


export default [

	// view
	requestValidator("get", '/api/antenna_system', (req, res, ctx) => {
		//const {  } = req.body;
		const data = {
			"id": "6fa1af8d-1642-4ca6-afe5-597fddc08eac",
			"created_at": "2020-10-06T10:25:35.797994103Z",
			"updated_at": "2020-10-07T11:22:09.544364236+03:00",
			"mode": 2,
			"antenna_1_band": 4,
			"antenna_2_band": 4,
			"share_modems": true
		}
		return res(ctx.delay(500), ctx.status(200), ctx.json(data))
	}),

	// update antenna mode
	requestValidator("patch", '/api/antenna_system', (req, res, ctx) => {
		const { mode, antenna_1_band, antenna_2_band, share_modems } = req.body;
		const data = { mode, antenna_1_band, antenna_2_band, share_modems }
		return res(ctx.delay(500), ctx.status(200), ctx.json(data))
	}),

]