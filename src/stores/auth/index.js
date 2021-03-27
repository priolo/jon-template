import { getStore, useStore } from "@priolo/iistore"



export function getStoreAuth() {
	return getStore("auth")
}

export function useAuth() {
	return useStore("auth")
}
