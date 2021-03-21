import antennas from "./antennas.mjs"

export default {
	"antennas": antennas,
	"slu": {
		"mapping": [
			{
				input_enabled: true,
				input_index: 1,
				output_index: 2
			},
			{
				input_enabled: false,
				input_index: 2,
				output_index: 5
			},
			{
				input_enabled: true,
				input_index: 3,
				output_index: 10
			},
			{
				input_enabled: true,
				input_index: 4,
				output_index: 12
			},
		]
	},
	"mode": 1,
	"antenna_1_band": 1,
	"antenna_2_band": 2,
	"share_modems": false
}