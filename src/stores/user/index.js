import { getStore, useStore } from "@priolo/jon"

export function getStoreUser() {
	return getStore("user")
}

export function useUser() {
	return useStore("user")
}
