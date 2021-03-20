import { setupStore, MultiStoreProvider } from "@priolo/iistore"
import layout from "./layout/store"
import user from "./user/store"

setupStore({ layout, user })

export default MultiStoreProvider