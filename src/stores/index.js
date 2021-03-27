import { setupStore, MultiStoreProvider } from "@priolo/iistore"

import auth from "./auth/store"
import layout from "./layout/store"
import user from "./user/store"
import doc from "./doc/store"

setupStore({ auth, layout, user, doc })

export default MultiStoreProvider