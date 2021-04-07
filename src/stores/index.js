import { setupStore, MultiStoreProvider } from "@priolo/jon"

import auth from "./auth/store"
import layout from "./layout/store"
import route from "./route/store"
import user from "./user/store"
import doc from "./doc/store"

setupStore({ auth, layout, route, user, doc })

export default MultiStoreProvider