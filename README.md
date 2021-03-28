Ti prego devi usare questo STACK REACT


# TEMPLATE JON
Template di uno stack tecnologico
per realizzare un Front End SPA

### GESTIONE STORE
[Jon](https://github.com/priolo/jon)

### GESTIONE PROGETTO
[CRA](https://create-react-app.dev/)

### Libreria VIEW
[React ](https://reactjs.org/)

### Componenti
[Material-UI](https://material-ui.com/)

### Router
[reactrouter](https://reactrouter.com/web/guides/quick-start)

### Internazionalizzation
[react-i18next](https://react.i18next.com/)

### Mock
[msw](https://mswjs.io/)

### Test
[Cycpress](https://www.cypress.io/)


## Una rinfrescata generale


#### I18N

Usa l'HOOK per importare la funzione di traduzione
```js
import { useTranslation } from 'react-i18next'
...
const {t} = useTranslation()
```

Traduci tramite PATH
```jsx
<TableCell>{t("pag.user.tbl.username")}</TableCell>
```

Oppure, fuori da un componente
```js
import i18n from "i18next"
...
const title = i18n.t("pag.default.dlg.router_confirm.title")
```

La PATH fa riferimento al file json in `locales`

[doc](https://react.i18next.com/getting-started)

---

#### AJAX
Non è necessario importare liberire. 
Possiamo utilizzare una SEMPLICISSIMA implementazione del `fetch` nativo.
Dentro la quale c'e' la gestione:
del token JWT,
degli errori
e la visualizzazione del loading

---

#### Mock

#### Test

#### Routing

#### Dynamic Theme

#### Route

#### Store

#### Lists

##### Sort
store generici (mixStores)
useMemo

##### Filter

#### Validator