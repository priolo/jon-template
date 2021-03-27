/* eslint eqeqeq: "off" */
import auth from "./auth"
import docs from "./docs"
import users from "./users"

export const handlers = [
	...auth,
	...users,
	...docs,
]

