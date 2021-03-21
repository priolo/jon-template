import satellites from "./satellites.mjs"


export default [
	{
		"antenna_number": 1,
		"is_enabled": true,
		"params": {
			"mode": 1,
			"satellite_number": 1,
			"position": {
				"absolute_azimuth": 1.245,
				"absolute_elevation": 4.1231,
				"absolute_lnb_polarization": 4.122,
				"relative_azimuth": 1.214,
				"relative_elevation": 1.124,
				"relative_lnb_polarization": 4.1214,
				"bx": 41.12,
				"by": 42.123,
				"bz": 123.123,
				"tilt": 4.13,
			},
			"search": {
				"search_threshold": 7,
				"search_step_unit": 8,
				"search_extension": 9,
			},
			"offset": {
				"c_heading": 358.1231,
				"c_elevation": -170.1541,
				"c_skew": -31.123
			},
			"position_errors": {
				"error_x": 1.123,
				"error_y": 2.124,
				"error_z": 41.123,
				"error_xf": 41.131,
				"error_zf": 0.123
			},
			"axis_blockage": {
				"azimuth_blockage": false,
				"elevation_blockage": true,
				"x_level_blockage": false,
				"polarization_blockage": true,
				"mirror_blockage": false
			},
			"signal": {
				"signal": 1.2141
			},
			"mirror_position": {
				"mirror_position": 1
			}
		},
		"satellites": [
			satellites[0],
			satellites[1],
			satellites[2],
		],
		
	},

	{
		"antenna_number": 2,
		"is_enabled": false,
		"params": {
			"mode": 0,
			"satellite_number": 5,
			"position": {
				"absolute_azimuth": 10.245,
				"absolute_elevation": 11.1231,
				"absolute_lnb_polarization": 12.122,
				"relative_azimuth": 13.214,
				"relative_elevation": 14.124,
				"relative_lnb_polarization": 15.1214,
				"bx": 41.12,
				"by": 42.123,
				"bz": 123.123,
				"tilt": 4.13,
			},
			"search": {
				"search_threshold": 16,
				"search_step_unit": 17,
				"search_extension": 18,
			},
			"offset": {
				"c_heading": 358.1231,
				"c_elevation": -170.1541,
				"c_skew": -31.123
			},
			"position_errors": {
				"error_x": 1.123,
				"error_y": 2.124,
				"error_z": 41.123,
				"error_xf": 41.131,
				"error_zf": 0.123
			},
			"axis_blockage": {
				"azimuth_blockage": false,
				"elevation_blockage": true,
				"x_level_blockage": false,
				"polarization_blockage": true,
				"mirror_blockage": false
			},
			"signal": {
				"signal": 76.587
			},
			"mirror_position": {
				"mirror_position": 1
			}
		},
		"satellites": [
			satellites[3],
			satellites[4],
			satellites[5],
		]
	}
]


