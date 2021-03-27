import { USER_ROLES } from "../../stores/user/utils";

export default [
	{
		"id": "usr-1",
		"username": "admin",
		"password": "secret",
		"role": USER_ROLES.ADMIN,
		"token": null,
	},
	{
		"id": "usr-2",
		"username": "admin2",
		"password": null,
		"role": USER_ROLES.ADMIN,
		"token": null,
	},
	{
		"id": "user-3",
		"username": "mario",
		"password": "secret",
		"role": USER_ROLES.WRITER,
		"token": null,
	},
	{
		"id": "user-4",
		"username": "giovanni",
		"password": null,
		"role": USER_ROLES.WRITER,
		"token": null,
	},
	{
		"id": "user-5",
		"username": "daniele",
		"password": "secret",
		"role": USER_ROLES.CUSTOMER,
		"token": null,
	},
	{
		"id": "user-6",
		"username": "giorgio",
		"password": null,
		"role": USER_ROLES.CUSTOMER,
		"token": null,
	},
	{
		"id": "user-7",
		"username": "riccardo",
		"password": null,
		"role": USER_ROLES.CUSTOMER,
		"token": null,
	},

]
