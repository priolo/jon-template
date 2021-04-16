import { USER_ROLES } from "../../stores/user/utils";

const users = [
	{
		"id": "usr-1",
		"username": "admin",
		"email": "admin@test.com",
		"password": "secret",
		"role": USER_ROLES.ADMIN,
		"token": null,
	},
	{
		"id": "usr-2",
		"username": "admin2",
		"email": "admin2@test.com",
		"password": null,
		"role": USER_ROLES.ADMIN,
		"token": null,
	},
	{
		"id": "usr-3",
		"username": "mario",
		"email": "mario@test.com",
		"password": "secret",
		"role": USER_ROLES.WRITER,
		"token": null,
	},
	{
		"id": "usr-4",
		"username": "giovanni",
		"email": "giovanni@test.com",
		"password": null,
		"role": USER_ROLES.WRITER,
		"token": null,
	},
	{
		"id": "usr-5",
		"username": "daniele",
		"email": "daniele@test.com",
		"password": "secret",
		"role": USER_ROLES.CUSTOMER,
		"token": null,
	},
	{
		"id": "usr-6",
		"username": "giorgio",
		"email": "giorgio@test.com",
		"password": null,
		"role": USER_ROLES.CUSTOMER,
		"token": null,
	},
	{
		"id": "usr-7",
		"username": "riccardo",
		"email": "riccardo@test.com",
		"password": null,
		"role": USER_ROLES.CUSTOMER,
		"token": null,
	},

]

export default users