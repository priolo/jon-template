
### Store

Gli STORE sono fondamentali per tenere separata la VIEW in REACT  
Secondo le regole non bisogna
In giro non ho trovato nulla di minimale per cui ho fatto la mia libreria:  
[jon](https://github.com/priolo/jon)  
PRODUCTION-READY: è usata in almeno 3 progetti di medie dimensioni





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



#### Dynamic Theme

#### Route

#### Store

#### Lists

##### Sort
store generici (mixStores)
useMemo

##### Filter

#### Validator