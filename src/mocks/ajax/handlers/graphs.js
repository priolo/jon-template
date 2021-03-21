/* eslint eqeqeq: "off" */
import { requestValidator } from '../utils'


export default [

	// view graphs
	requestValidator("get", '/api/sdu/graphs', (req, res, ctx) => {
		return res(
			ctx.delay(500),
			ctx.status(200),
			ctx.json({
				"relative_azimuth_enabled": true,
				"heading_enabled": true,
				"relative_elevation_enabled": true,
				"signal_enabled": true,
				"aggregated_view": false,
				"time_span_minutes": 1
			})
		)
	}),

	// update graphs
	requestValidator("patch", '/api/sdu/graphs', (req, res, ctx) => {
		return res(
			ctx.delay(500),
			ctx.status(200),
			ctx.json(req.body)
		)
	}),

]