/* eslint eqeqeq: "off" */
import { requestValidator } from '../utils'
import satellites from "../../data/satellites"

let sessionSat = [...satellites]

export default [

	// index
	requestValidator("get", '/api/satellite', (req, res, ctx) => {
		return res(
			ctx.delay(500),
			ctx.status(200),
			ctx.json(sessionSat)
		)
	}),

	// get
	requestValidator("get", '/api/satellite/:id', (req, res, ctx) => {
		const id = req.params.id
		const sat = satellites.find(s => s.id == id);
		return res(
			ctx.delay(500),
			ctx.status(200),
			ctx.json(sat)
		)
	}),

	// create
	requestValidator("post", '/api/satellite', (req, res, ctx) => {
		const { name, antenna_number, longitude, frequency, polarization, v_pid, symbol_rate, signal_threshold, sk_offset } = req.body
		if ( name==null || antenna_number==null || longitude==null || frequency==null || polarization==null || v_pid==null || symbol_rate==null || signal_threshold==null || sk_offset==null) return res(ctx.status(401))
		return res(
			ctx.delay(500),
			ctx.status(200),
			ctx.json({
				...req.body,
				id: Math.floor(Math.random() * 100)
			})
		)
	}),

	// update
	requestValidator("patch", '/api/satellite/:id', (req, res, ctx) => {
		const { name, antenna_number, longitude, frequency, polarization, v_pid, symbol_rate, signal_threshold, sk_offset } = req.body
		if ( name==null || antenna_number==null || longitude==null || frequency==null || polarization==null || v_pid==null || symbol_rate==null || signal_threshold==null || sk_offset==null) return res(ctx.status(401))
		const id = req.params.id
		return res(
			ctx.delay(500),
			ctx.status(200),
			ctx.json({
				...req.body,
				id
			})
		)
	}),

	// delete
	requestValidator("delete", '/api/satellite/:id', (req, res, ctx) => {
		return res(
			ctx.delay(500),
			ctx.status(200),
		)
	}),

	// Import Satellites
	requestValidator("post", '/api/satellite/import', (req, res, ctx) => {
		const { antenna_number, satellites: sats } = req.body;
		if ( !antenna_number || !sats ) return res(ctx.status(401))
		sessionSat = satellites.filter ( s => 
			s.antenna_number!=antenna_number 
			|| sats.findIndex(si=>si.number==s.number)!=-1 
		)
		return res(
			ctx.delay(500),
			ctx.status(200)
		)
	}),

	// view threshold
	requestValidator("get", '/api/satellite/:antenna/:satellite/threshold', (req, res, ctx) => {
		const ant_number = req.params.antenna
		const sat_number = req.params.satellite
		const sat = satellites.find(s => s.number == sat_number && s.antenna_number == ant_number)
		if ( sat==null) return res(ctx.status(404))
		return res(
			ctx.delay(500),
			ctx.status(200),
			ctx.json({ signal_threshold: sat.signal_threshold })
		)
	}),

]