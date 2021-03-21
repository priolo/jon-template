/* eslint eqeqeq: "off" */
import { requestValidator } from '../utils'
import satellites from "../../data/satellites"


const protoAntenna = {
	"id": "5b529c46-45be-4d7b-81b9-81f9bc72babf",
	"created_at": "2020-09-16T10:10:17.615969761Z",
	"updated_at": "2020-09-21T16:22:29.958089125+03:00",
	"number": 1,
	"is_enabled": true,
	"mode": 1,
	"search_threshold": 0,
	"search_step_unit": 0,
	"search_extension": 0,
	"tracked_satellite_num": 1,
	"c_heading": 360,
	"c_elevation": -180,
	"c_skew": -360,
	"satellites": []
}

const sats = ant => satellites.filter ( s => s.antenna_number==ant )

export default [

	// view
	requestValidator("get", '/api/antenna/:number', (req, res, ctx) => {
		//const {  } = req.body;
		const number = +req.params.number
		const data = { ...protoAntenna, number, satellites:sats(number) }
		return res(ctx.delay(500), ctx.status(200), ctx.json(data))
	}),

	// update antenna mode
	requestValidator("patch", '/api/antenna/:number/mode', (req, res, ctx) => {
		const { mode } = req.body;
		const number = +req.params.number
		if ( typeof mode !== "number" ) return res(ctx.status(500))
		const data = { ...protoAntenna, number, mode, satellites:sats(number) }
		return res(ctx.delay(500), ctx.status(200), ctx.json(data))
	}),

	// update search params
	requestValidator("patch", '/api/antenna/:number/search', (req, res, ctx) => {
		const { search_threshold, search_step_unit, search_extension } = req.body;
		const number = +req.params.number
		if ( search_threshold==null || search_step_unit==null || search_extension==null ) return res(ctx.status(401))
		const data = { ...protoAntenna, number, search_threshold, search_step_unit, search_extension, satellites:sats(number) }
		return res(ctx.delay(500), ctx.status(200), ctx.json(data))
	}),

	// update satellite select number
	requestValidator("patch", '/api/antenna/:number/satellite', (req, res, ctx) => {
		const { tracked_satellite_num } = req.body;
		const number = +req.params.number
		if ( tracked_satellite_num==undefined ) return res(ctx.status(401))
		const data = { ...protoAntenna, number, tracked_satellite_num, satellites:sats(number) }
		return res(ctx.delay(500), ctx.status(200), ctx.json(data))
	}),

	// update enabled/disabled antenna
	requestValidator("patch", '/api/antenna/:number/enabled', (req, res, ctx) => {
		const { is_enabled } = req.body;
		const number = +req.params.number
		if ( is_enabled==undefined ) return res(ctx.status(401))
		const data = { ...protoAntenna, number, is_enabled, satellites:sats(number) }
		return res(ctx.delay(500), ctx.status(200), ctx.json(data))
	}),

	// update offsets
	requestValidator("patch", '/api/antenna/:number/offsets', (req, res, ctx) => {
		const { c_heading, c_elevation, c_skew } = req.body
		const number = +req.params.number
		if ( c_heading==null || c_elevation==null || c_skew==null ) return res(ctx.status(401))
		const data = { ...protoAntenna, number, c_heading, c_elevation, c_skew, satellites:sats(number) }
		return res(ctx.delay(500), ctx.status(200), ctx.json(data))
	}),
]