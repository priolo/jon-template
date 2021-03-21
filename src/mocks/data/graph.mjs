


export function generate(timelaps = 20000, step = 2000, max = 10, min = 0) {
	const end = Date.now()
	const start = end - timelaps
	const ret = []
	let prev = rnd(max, min)
	for (let i = start; i < end; i += step) {
		ret.push({
			timestamp: Math.round(i/1000),
			value: (prev + rnd(-2, +2)).toString()
		})
	}
	return ret
}

function rnd(min, max) {
	return Math.random() * (max - min) + min;
}
