/* eslint eqeqeq: "off" */
import { requestValidator } from '../utils'


export default [

	// view sdu configs
	requestValidator ( "get", '/api/sdu/network', (req,res,ctx)=>{
		return res(
			ctx.delay(500),
			ctx.status(200), 
			ctx.json({
				"id": "8c9ee68c-2793-42f6-b1e3-65880c9fc723",
				"created_at": "2020-08-26T07:45:30.556625159Z",
				"updated_at": "2020-08-26T10:47:07.203328297+03:00",
				"ip": "1.2.3.4",
				"sub_net": "5.6.7.8",
				"gateway_ip": "9.10.11.12",
				"modem_1_ka_ip": "13.14.15.16",
				"modem_1_ku_ip": "17.18.19.20",
				"modem_1_x_ip": "21.22.23.24",
				"modem_2_ka_ip": "25.26.27.28",
				"modem_2_ku_ip": "29.30.31.32",
				"modem_2_x_ip": "33.34.35.36",
				"acu_1": "37.38.39.40",
				"acu_2": "41.42.43.44",
				"slu_ip": "45.46.47.48"
			})
		)
	}),

	// update sdu params
	requestValidator ( "patch", '/api/sdu/network', (req, res, ctx) => {
		const { ip, sub_net, gateway_ip } = req.body;
		if ( !ip || !sub_net || !gateway_ip ) return res(ctx.status(401))
		return res(
			ctx.delay(500),
			ctx.status(200), 
			ctx.json({
				"ip": ip,
				"sub_net": sub_net,
				"gateway_ip": gateway_ip,
			})
		)
	}),

	// update sdu external params
	requestValidator ( "patch", '/api/sdu/network/external', (req, res, ctx) => {
		const { modem_1_ka_ip, modem_1_ku_ip, modem_1_x_ip, modem_2_ka_ip, modem_2_ku_ip, modem_2_x_ip, acu_1, acu_2, slu_ip } = req.body;
		if ( !modem_1_ka_ip || !modem_1_ku_ip || !modem_1_x_ip || !modem_2_ka_ip || !modem_2_ku_ip || !modem_2_x_ip || !acu_1 || !acu_2 || !slu_ip ) return res(ctx.status(500)) 
		return res(
			ctx.delay(500),
			ctx.status(200), 
			ctx.json({
				"modem_1_ka_ip": modem_1_ka_ip,
				"modem_1_ku_ip": modem_1_ku_ip,
				"modem_1_x_ip": modem_1_x_ip,
				"modem_2_ka_ip": modem_2_ka_ip,
				"modem_2_ku_ip": modem_2_ku_ip,
				"modem_2_x_ip": modem_2_x_ip,
				"acu_1": acu_1,
				"acu_2": acu_2,
				"slu_ip": slu_ip,
			})
		)
	}),
	
]