import { USER_ROLES } from "../../stores/user/utils";

export default [
	{
		"id": "usr-1",
		"email": "admin",
		"password": "secret",
		"role": USER_ROLES.ADMIN,
		"token": null,
	},
	{
		"id": "usr-2",
		"email": "admin2",
		"password": null,
		"role": USER_ROLES.ADMIN,
		"token": null,
	},
	{
		"id": "usr-3",
		"email": "mario",
		"password": "secret",
		"role": USER_ROLES.WRITER,
		"token": null,
	},
	{
		"id": "usr-4",
		"email": "giovanni",
		"password": null,
		"role": USER_ROLES.WRITER,
		"token": null,
	},
	{
		"id": "usr-5",
		"email": "daniele",
		"password": "secret",
		"role": USER_ROLES.CUSTOMER,
		"token": null,
	},
	{
		"id": "usr-6",
		"email": "giorgio",
		"password": null,
		"role": USER_ROLES.CUSTOMER,
		"token": null,
	},
	{
		"id": "usr-7",
		"email": "riccardo",
		"password": null,
		"role": USER_ROLES.CUSTOMER,
		"token": null,
	},

]
