import { getStore, useStore } from "@priolo/iistore"



export function getStoreRoute() {
	return getStore("route")
}

export function useRoute() {
	return useStore("route")
}
