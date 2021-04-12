Il template definitivo per REACT

## INDEX

[Why](#why)

[Tecnology](#tecnology)

[online version]()


## WHY
Questo TEMPLATE permette di derivare un progetto in maniera veloce e pulita.  
Hai il pieno controllo del codice trattandosi di una classica CRA.  
Nel template sono risolte molte problematiche tipiche dei gestionali  
e puo' essere un buon mezzo per imparare.  

I concetti risolti nel template sono:

## STORE
Quando usi REACT per progetti medio-grandi la prima urgenza è:   
**Separare la VIEW dalla BUSINESS LOGIC**  
Ci sono delle librerie per questo! La piu' famosa è [REDUX](https://redux.js.org/)  
Ma, a mio parere, è troppo prolissa e ingombrante.  
Quindi ho iniziato ad usare i metodi nativi REACT [REDUCER](https://it.reactjs.org/docs/hooks-reference.html#usereducer) e [PROVIDERS](https://it.reactjs.org/docs/hooks-reference.html#usecontext)  
Alla fine mi sono ritrovato con una libreria MOLTO MOLTO leggera ispirata a [VUEX](https://vuex.vuejs.org/)!  
Sono anni che la uso nei miei progetti e non ne posso più fare a meno.  
Ve la propongo... forse per affetto o perché davvero utile!   
[Jon](https://github.com/priolo/jon)
Dagli un occhio!

---

## CRA

Non c'e' molto da dire! Se volete fare un app in REACT conviene usare [CRA](https://create-react-app.dev/)  
Semplicemente non vi dovrete preoccupare di `babel` e `webpack`:
La vostra app avrà un setup prestabilito e riproducibile.

### DIRECTORY
La struttura nel file system del TEMPLATE:

### components  
contiene tutto cio' che non è una pagina o una dialog.  
In generale: componenti concettualmente "riutilizzabili".  

### hooks
Hooks specifici usati nell'APP.

### locales
I json di traduzione per i18n

### mock
- ajax/handlers  
	le funzioni per le risposte mock alle richieste HTTP
- data  
    i dati mock da utilizzare al posto del DB

### pages
I componenti REACT che renderizzando il "body" del layout   
Intuitivamente parti dalla pagina, che è unica,  
per poi andare al componente che (teoricamente) è usato in più punti.  

### plugin
Sono servizi accessibili in qualuque punto del programma   
Permettono di accedere ad un servizio esterno, tradurre, fare calcoli etc etc  

### stores
Sono i CONTROLLERs delle VIEWs.  
Lo STORE non è la soluzione perfetta ma funziona bene nella maggior parte dei casi!   

La BUSINESS LOGIC deve semplicemente modificare o leggere lo STORE  
senza preoccuparsi di come è implementata la VIEW. 

E' ESSENZIALE per progetti grossi perché permette di:  
- distribuire il codice su più unità migliorando la manutenibilità  
- separa nettamente la VIEW dalla BUSINESS LOGIC  
- puoi modificare la VIEW o il CONTROLLER (mantenendo gli stessi BIND) indipendentemente  
  
Manutenere l'APP dopo anni oppure da diverse persone è una cosa da prevedere.  
Impossibile se hai un'albero di componenti che si passano funzioni e proprietà rendendoli fortemente dipendenti dal contesto.  

Usando gli STOREs posso copiare e incollare un componente in un altro punto dell'APP senza problemi.  
Tendenzialmente i componenti **NON HANNO PROPS** (se non, eventualmente, i "children" o "className").  

### Models and API  
In realtà in questo TEMPLATE le API e gli STOREs sono "mischiati"!  
Una soluzione *discutibile* ma data la semplicità delle API non ho voluto complicare la struttura.   
Si potrebbe pensare ad una cartella "Models" per la gestione degli oggetti POCO  
e "API" per le richieste HTTP.

---

## AJAX

Trattandosi di una SPA tutti i dati arrivano tramite AJAX.  
Ho costruito una classe semplicissima [qui](https://github.com/priolo/jon-template/blob/7f8c02cbd72371c1018f7a689ed625577f22f206/src/plugins/AjaxService.js#L11).  
Volevo un SERVICE di default SINGLETON che potesse mantenere delle proprietà (per esempio `baseUrl`)  
Ma se necessario, dato che è una `class`, si possono creare diverse istanze.  

Posso usare sli STORE anche fuori da REACT (e quindi nel SERVICE AJAX)  
Per esempio qui setto lo STATE `busy` dello STORE `layout` quando il SERVICE è occupato:  
[nel SERVICE (fuori da REACT)](https://github.com/priolo/jon-template/blob/7f8c02cbd72371c1018f7a689ed625577f22f206/src/plugins/AjaxService.js#L43)
```js
// prelevo lo store "layout"
const { setBusy } = getStoreLayout()
// se necessario setto "busy" == true
setBusy(true)
```

Mentre [nello STORE layout](https://github.com/priolo/jon-template/blob/7f8c02cbd72371c1018f7a689ed625577f22f206/src/stores/layout/store.js#L14)
definisco la prop `busy` in readable/writable  
```js
export default {
	state: {
		busy: false,
	}.
	mutators: {
		setBusy: (state, busy) => ({ busy }),
	}
}
```
 
[Nella VIEW (di REACT)](https://github.com/priolo/jon-template/blob/7f8c02cbd72371c1018f7a689ed625577f22f206/src/components/layouts/AppBar.jsx#L60)
posso intercettare questo evento  
In questo caso visualizzo la "progress" se il SERVICE AYAX è occupato
```jsx
function Header() {
	const { state: layout } = useLayout()
	return (
		<AppBar>
			{layout.busy && <LinearProgress />}
		</AppBar>
	)
}
```

---

## I18N

Prima o poi lo dovrai usare.... quindi meglio pensarci prima!  
Non serve solo a "tradurre" l'app  
Ti permette di non avere direttamente il contenuto nella VIEW... che è più bello!!!  
E' utile per i test in Cypress: puoi usare la PATH di traduzione per individuare dei componenti  
invece del testo (che potrebbe cambiare).

All'interno di un REACT COMPONENT
usa l'HOOK per importare la funzione di traduzione `t`
```js
import { useTranslation } from 'react-i18next'
...
const {t} = useTranslation()
```

Traduci tramite PATH
```jsx
<TableCell>{t("pag.user.tbl.username")}</TableCell>
```

Oppure, fuori da un COMPONENT,
usa il [PLUGIN `i18n`](https://github.com/priolo/jon-template/blob/7f8c02cbd72371c1018f7a689ed625577f22f206/src/plugins/i18n.js)  

```js
import i18n from "i18next"
...
const title = i18n.t("pag.default.dlg.router_confirm.title")
```

La traduzioni sono dentro a file JSON nella directory `src\locales`

[doc](https://react.i18next.com/getting-started)

---

## MOCK

**L'APP deve funzionare offline!** Naturalmente con dei dati `mock`  
Questo permette di dividere i compiti di chi fa il FE e chi fa il BE:  
E' sufficiente condividere una buona documentazione sulle API (che va comunque fatta)  
Non hai bisogno di tutto l'ambiente per sviluppare.  
Inoltre è immediatamente "testabile" (per esempio da Cypress).  
Infine l'APP in mock può essere presentata come demo al CLIENTE senza "comportamenti inattesi" (= "panico")  
Troppi vantaggi!  

Ho configurato e avviato [MSW](https://mswjs.io/) in [/plugins/msw.js](https://github.com/priolo/jon-template/blob/7f8c02cbd72371c1018f7a689ed625577f22f206/src/plugins/msw.js)   
Viene chiamato [qui](https://github.com/priolo/jon-template/blob/7f8c02cbd72371c1018f7a689ed625577f22f206/src/index.js#L8) avviando un [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)   

> Un `Service Worker` si comporta da proxy tra l'APP e il WEB: "simulando" la rete a basso livello.  
> Questo è figo perché è completamente trasparente all'APP:  
> in pratica quando usi `fetch` funziona comunque... anche offline! I dati `mock` te li da il `Service Worker`  

In [mocks/ajax/handlers](https://github.com/priolo/jon-template/tree/7f8c02cbd72371c1018f7a689ed625577f22f206/src/mocks/ajax/handlers) ci sono i "CONTROLLERs" simulati  
In [mocks/data](https://github.com/priolo/jon-template/tree/7f8c02cbd72371c1018f7a689ed625577f22f206/src/mocks/data) ci sono ... i dati! Usati per emulare il DB

L'APP avvia il `Service Worker` se è in `development` oppure la variabile di ambiente `REACT_APP_MOCK` è "true" (stringa!)  

> Le variabili d'ambiente in CRA sono documentate [qui](https://create-react-app.dev/docs/adding-custom-environment-variables/)  
> Comunque CRA (in fase di compilazione) pesca da `.env` (o parenti) tutte le variabili che iniziano con `REACT_APP`  
> e le mette a disposizione nel browser  

Esempio per "simulare" la risposta alla richiesta di un oggetto `doc` tramite il suo `id`

richiesta HTTP:  
`GET /api/docs/33`

estratto da: [src/mocks/ajax/handlers/docs.js](https://github.com/priolo/jon-template/blob/7f8c02cbd72371c1018f7a689ed625577f22f206/src/mocks/ajax/handlers/docs.js#L18)
```js
import { rest } from "msw"
import list from "../../data/docs"

rest.get ('/api/docs/:id', (req, res, ctx) => {

	const id = req.params.id

	const doc = list.find(item => item.id == id)
	if (!doc) return res(ctx.status(404))

	return res(
		ctx.delay(500),
		ctx.status(200),
		ctx.json(doc)
	)
}),
```

---

## ROUTING

Anche in questo caso c'e' poco sa pensare: [reactrouter](https://reactrouter.com/web/guides/quick-start)  

### RENDER CONDIZIONALE in base al corrente url del browser? 
Usa `Switch` specificando una o più `path` 
```jsx
/* ATTENTION: the order is important */
<Switch>
	<Route path={["/docs/:id"]}>
		<DocDetail />
	</Route>
	<Route path={["/docs"]}>
		<DocList />
	</Route>
	<Route path={["/", "/users"]}>
		<UserList />
	</Route>
</Switch>
```

### CAMBIARE PAGINA dentro REACT? 
Usa l'HOOK `useHistory`:  
[src\components\app\Avatar.jsx](https://github.com/priolo/jon-template/blob/7f8c02cbd72371c1018f7a689ed625577f22f206/src/components/app/Avatar.jsx)
```jsx
import { useHistory } from "react-router-dom";

export default function Avatar() {
	const history = useHistory()
	const handleClickProfile = e => history.push("/profile")
	return ...
}
```

### CAMBIARE PAGINA fuori da REACT?  
Usa la `history` nativa del browser
```js
window.history.push("/docs/33")
```

### Accedere ai PARAMETRI dell'url? 
Usa l'HOOK `useParams`.  
[src\pages\doc\DocDetail.jsx](https://github.com/priolo/jon-template/blob/7f8c02cbd72371c1018f7a689ed625577f22f206/src/pages/doc/DocDetail.jsx)

```jsx
import { useParams } from "react-router"

export default function DocDetail() {
	const { id } = useParams()

	useEffect(() => {
		if (!id) fetchById(id)
	}, [id])

	return ...
}
```

### Confirm ON CHANGE

Un esempio si trova anche sul sito di `react-router-dom` [qui](https://github.com/ReactTraining/history/blob/master/docs/blocking-transitions.md), lo riporto per completezza.  
Ho creato un hook custom [useConfirmationRouter](https://github.com/priolo/jon-template/blob/be1ebdb0cacddd049d0a6c78bf88dc0c152e4b55/src/hooks/useConfirmationRouter.js)  
che semplicemente blocca la navigazione e chiede conferma per proseguire.
Lo uso nel dettaglio del DOC [qui](https://github.com/priolo/jon-template/blob/be1ebdb0cacddd049d0a6c78bf88dc0c152e4b55/src/pages/doc/DocDetail.jsx#L44)

---

> **ATTENZIONE**   
> Essendo il TEMPLATE un `SPA`:
> - Su cambio URL non effettua nessuna richiesta HTTP al server ma aggiorna semplicemente il rendering  
> - Naturalmente, i dati vengono recuperati sempre tramite richieste AJAX
> - Le uniche richieste "sulla struttura dell'APP" è il primo caricamento o reload della pagina.  
> - Il SERVER va settato opportunamente per rispondere sempre con la stessa pagna

> **P.S.:**  
> Siete come me? Istallare un plugin è sempre un dubbio? Se questa libreria non fa quello che mi serve? Se diventa obsoleta il giorno dopo aver messo in produzione? Se l'autore fa voto a Dio di non toccare mai più un pc? Se mi accorgo che c'e' un BUG irrisolvibile nella libreria? E poi... vuoi mettere avere il pieno controllo del software??
> Allora... questo plugin potrebbe essere sostituito gestendo l'url con gli STORE.  
> Ma non tratterò l'argomento qui :D

---

## COMPONENTS-UI

Naturalmente puoi fare i tuoi componenti (non ci vuole poi molto)  
ma [Material-UI](https://material-ui.com/) è molto usata e solida!  
Non serve altro!  

### BINDING
Prima cosa: legare gli STORE alla VIEW  
Basta avere in testa `useState` MA, invece di stare nel COMPONENT REACT, è nello STORE.  

Definiamo uno STORE con un `value` in read/write
```js
export default {
	state: {
		value: "init value",
	},
	mutators: {
		setValue: (state, value) => ({ value }),
	},
}
```

Importo lo STORE e   
"binding" del suo `value` nel COMPONENT REACT
```jsx
import { useStore } from "@priolo/jon"

export default function Form() {

  const { state, setValue, getUppercase } = useStore("myStore")

  return <TextField 
		value={state.value}
		onChange={e => setValue(e.target.value)}
	/>
}
```

Un [sandbox](https://codesandbox.io/s/example-1-5d2tt) che NON usa MATERIAL-UI  
Per saperne di piu' date un occhio a [Jon](https://github.com/priolo/jon)  
Comunque in questo TEMPLATE i BINDING li trovate un pò [ovunque](https://github.com/priolo/jon-template/blob/5593323c8a3ca30ed9023e6708124a191552b13e/src/pages/user/EditDialog.jsx#L54)

### VALIDATOR
La validazione delle form si lascia sempre per ultima :smile:   
In `Jon` è presente un semplice meccanismo per validazione dei componenti Material-UI.

Basta collegare un valore ad una `rule` (con un HOOK)  
e assegnare la `props` ottenuta al component MATERIAL-UI  
```jsx
import { rules, useValidator } from "@priolo/jon";
 
function Form() {

	const { state: user, setSelectName } = useAccount()
	// creo una "rule" custom. Se c'e' una violazione restituisco una stringa con l'errore
	const customRule = (value) => value?.length >= 3 ? null : "Enter at least 3 letters."
	// collego due "rule" con la proprietà dello STORE ACCOUNT "user.select?.name"
	const nameProps = useValidator(user.select?.name, [rules.obligatory, customRule])
	// ... e ricavo "nameProps"

	return <TextField autoFocus fullWidth
		// segnalerà un errore se il valore non soddisfa una delle regole
		{...nameProps}
		value={user.select?.name}
		onChange={e => setSelectName(e.target.value)}
	/>
}
```

E validare nello STORE prima di inviare i dati
```js
import { validateAll } from "@priolo/jon"

const store = {
	state: {
		select: { name: "" },
	},
	actions: {
		save: async (state, _, store) => {
			// verifico se c'e' un errore nelle "rule" visualizzate  
			const errs = validateAll()
			// se ci sono errori li posso visualizzare... oppure fare finta di nulla :)
			if ( errs.length > 0 ) return false
			// else ... save! 
		},
	},
	mutators: {
		setSelectName: (state, name) => ({ select: {...state.select, name} }),
	},
}
```

un esempio [qui](https://github.com/priolo/jon-template/blob/5593323c8a3ca30ed9023e6708124a191552b13e/src/stores/user/store.js#L73)

### DYNAMIC THEME

Una volta capito come funzionano gli STORE li usi per tutto  
... naturalmente anche per gestire il THEME  

Nello [STORE `layout`](https://github.com/priolo/jon-template/blob/177dca2bafb4e1cf2fa22dfc2a45a703a89c6c04/src/stores/layout/store.js) ho messo tutto quello che caratterizza l'aspetto generale dell'APP  
Il THEME di MATERIAL-UI  
ma anche il titolo sul AppBar, se l'APP è in attesa (loading...), se i DRAWER laterali sono aperti, il menu' principale, la "message box", dov'e' settato il focus etc etc  

Cmunque le impostazione del THEME devono essere mantenute anche quando si **ricarica la pagina**  
Il problema è che in questo caso il browser fa una nuova richiesta al server e lo **STORE è ricaricato da zero**!  
Quindi ho usato i `coockies` per memorizzare il nome del THEME selezionato  
lo si vede [qui](https://github.com/priolo/jon-template/blob/336589e17b1fa05a198f1d24322b9c78bbeff0ca/src/stores/layout/store.js#L20)

Il theme dello store è impostato inizialmente con il cookie  
e quando il THEME viene cambiato [qui](https://github.com/priolo/jon-template/blob/336589e17b1fa05a198f1d24322b9c78bbeff0ca/src/stores/layout/store.js#L70)
```js
export default {
	state: {
		theme: Cookies.get('theme'),
	},
	mutators: {
		setTheme: (state, theme) => {
			Cookies.set("theme", theme)
			return { theme }
		},
	}
}
```
Anche se si usa il cookies per memeorizzare il nome del THEME  
bisogna comunque modificare la variabile dello STORE (piu' correttamente "lo STATE dello store")  
Altrimenti la VIEW non riceve l'evento!  
In generale la VIEW si aggiorna SOLO SE l'oggetto `state` dello STORE cambia

---

## URL

### SEARCH AND FILTER

Se uso un APP WEB e copio l'URL e lo invio ad un amico  
mi aspetto è che lui veda esattamente quello che vedo io (a parità di permessi naturalmente)  
Quindi i TAB selezionati, i filtri e l'ordinamento sulle liste  
vanno mantenuti nel [`search` dell'url corrente](https://developer.mozilla.org/en-US/docs/Web/API/URL/search) anche detta *query string*  
... insomma quello che c'e' dopo il "?" nell'url

In STORE [Route](https://github.com/priolo/jon-template/blob/336589e17b1fa05a198f1d24322b9c78bbeff0ca/src/stores/route/store.js) posso prelevare o settare una variabile nella `query string`  
che puo' essere usata alla VIEW

Un estratto dello STORE:
```js
export default {
	state: {
		queryUrl: "",
	},
	getters: {
		getSearchUrl: (state, name, store) => {
			const searchParams = new URLSearchParams(window.location.search)
			return (searchParams.get(name) ?? "")
		},
	},
	mutators: {
		setSearchUrl: (state, { name, value }) => {
			const queryParams = new URLSearchParams(window.location.search)
			if (value && value.toString().length > 0) {
				queryParams.set(name, value)
			} else {
				queryParams.delete(name)
			}
			window.history.replaceState(null, null, "?" + queryParams.toString())
			return { queryUrl: queryParams.toString() }
		},
	},
}
```

poi lo uso nella [lista](https://github.com/priolo/jon-template/blob/336589e17b1fa05a198f1d24322b9c78bbeff0ca/src/pages/doc/DocList.jsx) per filtrare gli elementi 
```js
function DocList() {
	const { state: route, getSearchUrl } = useRoute()
	const { state: doc } = useDoc()

	// it is executed only if the filter or the "docs" changes
	const docs = useMemo (
		// actually I do this in the STORE DOC
		() => {
			// I get the "search" value in the current url 
			let txt = getSearchUrl("search").trim().toLowerCase()
			// I filter all the "docs" and return them
			return doc.all.filter(doc => !txt || doc.title.toLowerCase().indexOf(txt) != -1)
		},
		[doc.all, route.queryUrl]
	)

	// render of docs
	return {docs.map(doc => (
		...
	))}
}
```

intanto nell'[HEADER](https://github.com/priolo/jon-template/blob/336589e17b1fa05a198f1d24322b9c78bbeff0ca/src/pages/user/UserHeader.jsx) ho la text-box per modificare il filtro
```js
import { useRoute } from "../../stores/route"

function Header() {
	const { getSearchUrl, setSearchUrl } = useRoute()
	return (
		<SearchBox
			value={getSearchUrl("search")}
			onChange={value => setSearchUrl({ name: "search", value })}
		/>
	)
}
```

Ricapitolando: Con la `SearchBox` cambio l'url  
legato (tramite lo store STORE `route`) alla VIEW `DocList`   
e quindi questa aggiorna la lista.  
Se dovessi duplicare la pagina nel browser il filtro rimarrebbe intatto.

---

## AUTH

L'AUTH non è completo (questione di tempo... lo finirò)!  
E' gestito dallo STORE `auth` [qui](https://github.com/priolo/jon-template/blob/be1ebdb0cacddd049d0a6c78bf88dc0c152e4b55/src/stores/auth/store.js) 

### JWT

Come funziona?  
Si tratta di un `token` (cioè una "stringa identificativa") che il server da al client quando quest'ultimo effettua correttamente il login.  
A questo punto il client ad ogni richiesta successiva non deve più autenticarsi.  
Ma semplicemente mette il `token` nell HEADER della richiesta HTTP.  
Il server vedendo il `token` corretto suppone che quella richiesta HTTP è stata fatta da qualcuno che ha gia' superato l'autentificazione.  
Inoltre il server, con il `token` come chiave, riesce a recuperare i dati dell'utente.  
Il `token` può essere revocato o avere una "scadenza" costringendo il client a ripetere l'autentificazione per generare un nuovo `token`.

Il plugin ajax include il `token` se disponibile [qui](https://github.com/priolo/jon-template/blob/be1ebdb0cacddd049d0a6c78bf88dc0c152e4b55/src/plugins/AjaxService.js#L52)  
```js
import { getStoreAuth } from "../stores/auth"
...

export class AjaxService {
	...
	async send(url, method, data, options = {}) {
		const { state:auth } = getStoreAuth()
		...

		const response = await fetch(
			`${this.options.baseUrl}${url}`,
			{
				method: method,
				headers: {
					"Content-Type": "application/json",
					...auth.token && { "Authorization": auth.token }
				},
				body: data ? JSON.stringify(data) : undefined,
			}
		)

		...
	}
	...
}
```

Il token è accessibile nello [STORE auth](https://github.com/priolo/jon-template/blob/be1ebdb0cacddd049d0a6c78bf88dc0c152e4b55/src/stores/auth/store.js). Potete memorizzarlo come volete.   
Ho usato i cookies per non dover ripetere il login sul "reload"
```js
import Cookies from 'js-cookie'

export default {
	state: {
		token: Cookies.get('token'),
	},
	getters: {
		isLogged: state => state.token != null,
	},
	mutators: {
		setToken: (state, token, store) => {
			if (token == null) {
				Cookies.remove('token')
			} else {
				Cookies.set('token', token)
			}
			return { token }
		},
	}
}
```

---

# TECNOLOGY
Template di uno stack tecnologico
per realizzare un Front End SPA

### MANAGE PROJECT
[CRA](https://create-react-app.dev/)

### VIEW LIBRARY
[React ](https://reactjs.org/)

### STORE
[Jon](https://github.com/priolo/jon)

### COMPONENTS
[Material-UI](https://material-ui.com/)

### ROUTER
[reactrouter](https://reactrouter.com/web/guides/quick-start)

### INTERNAZIONALIZZATION
[react-i18next](https://react.i18next.com/)

### MOCK
[msw](https://mswjs.io/)

### TEST
[Cycpress](https://www.cypress.io/)




