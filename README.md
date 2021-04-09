Il template definitivo per REACT

# INDEX

[Why](#why)

[Tecnology](#tecnology)

[online version]()


# WHY
Questo template permette di derivare un progetto startup in maniera veloce e pulita.
Inoltre hai il pieno controllo del codice trattandosi di una classica CRA.
Nel template sono risolte molte problematiche tipiche dei gestionali
e puo' essere un buon mezzo per imparare.

Vediamo i concetti risolti nel template:

## STORE
Quando usi REACT per un progetto medio-grande la prima urgenza  è:   
**Separare la VIEW dalla BUSINESS LOGIC**  
Ci sono delle librerie per questo! La piu' famosa è [REDUX](https://redux.js.org/)  
Ma, a mio parere, è troppo prolissa e ingombrante.  
Ho iniziato ad usare semplici [REDUCER](https://it.reactjs.org/docs/hooks-reference.html#usereducer) all'interno di [PROVIDERS](https://it.reactjs.org/docs/hooks-reference.html#usecontext) nativi in REACT  
e mi sono ritrovato con una libreria MOLTO MOLTO leggera ispirata a [VUEX](https://vuex.vuejs.org/)!  
Sono anni che la uso nei miei progetti e non ne potrei più fare a meno.  
Ve la propongo... forse per affetto o perché davvero utile!   
[Jon](https://github.com/priolo/jon)
Dagli un occhio!


## CRA

Non c'e' molto da dire! Se volete fare un app in REACT conviene usare [CRA](https://create-react-app.dev/)  
Semplicemente non vi dovrete preoccupare di `babel` e `webpack`:
La vostra app avrà un setup prestabilito e riproducibile.

## DIRECTORY
La struttura nel file system del TEMPLATE:

### components
contiene tutto cio' che non è una pagina o una dialog.
In generale: componenti concettualmente "riutilizzabili".
Dentro abbiamo:
- 

### hooks
Gli hooks specifici dell'app. Molto semplice

### locales
Ci sono i json di traduzioni per i18n

### mock
- ajax/handlers
	le funzioni per le risposte mock alle richieste HTTP
- data
    i dati mock da utilizzare al posto del DB

### pages
I componenti REACT che renderizzando il "body" del layout
Sono separate dai "components" per averle in base all'entità che rappresentano
Intuitivamente parti dalla pagina, che è unica, 
per poi andare al componente che (teoricamente) è usato in più punti.

### plugin
Sono servizi accessibili in qualuque punto del programma  
Sono generici, contengono la configurazione e istanziamento  
Permettono di accedere ad un servizio esterno, tradurre, fare calcoli etc etc  
Non contengono le API (le API sono specifiche del APP)

### stores
Sono i CONTROLLERs delle VIEWs.  
Lo STORE non è la soluzione perfetta ma funziona bene nella maggior parte dei casi!   

E' interessante che gli STATE degli STOREs sono collegati in TWO-WAY BINDING con la VIEW  
La BUSINESS LOGIC deve semplicemente modificare o leggere lo STORE  
senza preoccuparsi di come è implementata la VIEW.  

E' ESSENZIALE per progetti grossi perché permette di:  
- distribuire il codice su più unità indipendenti migliorando la manutenibilità  
- separare nettamente la VIEW dalla BUSINESS LOGIC  
- poter modificare la VIEW o il CONTROLLER (mantenendo gli stessi BIND) indipendentemente  
 
L'effetto più desiderato è la semplificazione del codice!   
Manutenere l'APP dopo anni oppure da diverse persone è una cosa da preventivare.  
Impossibile se hai un'albero di componenti che si passano funzioni e proprietà rendendoli fortemente dipendenti dal contesto.  

Usando gli STOREs posso letteralmente copiare e incollare un componente in un altro punto dell'APP senza problemi.  
Tendenzialmente i componenti **NON HANNO PROPS** (se non, eventualmente, i "children" o "className").  

### Models and API
In realta' nel TEMPLATE le API e gli STOREs sono "mischiati"!  
Una soluzione *discutibile* ma data la semplicità delle API non ho voluto complicare la struttura.   
Si potrebbe pensare ad una cartella "Models" per la gestione degli oggetti POCO  
e "API" per le richieste HTTP.
---

## AJAX

Ho costruito una classe semplicissima [qui](https://github.com/priolo/jon-template/blob/7f8c02cbd72371c1018f7a689ed625577f22f206/src/plugins/AjaxService.js#L11).  
Volevo un SERVICE di default SINGLETON che potesse mantenere delle proprietà per esempio `baseUrl`  
Ma, se necessario, si possono creare diverse istanze di questo SERVICE.  

Gli STORE possono essere usati anche fuori dai REACT COMPONENTs (e quindi nei SERVICEs)  
Per esempio qui setto lo STATE `busy` dello STORE `layout` quando il SERVICE è occupato:  
[nel SERVICE (fuori da REACT)](https://github.com/priolo/jon-template/blob/7f8c02cbd72371c1018f7a689ed625577f22f206/src/plugins/AjaxService.js#L43)
```js
// prelevo lo store "layout"
const { setBusy } = getStoreLayout()
// se necessario setto "busy" == true
setBusy(true)
```

Definisco la prop `busy` in readable/writable  
[nello STORE layout](https://github.com/priolo/jon-template/blob/7f8c02cbd72371c1018f7a689ed625577f22f206/src/stores/layout/store.js#L14)
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

Posso intercettare questo evento dalla VIEW  
[nella VIEW (REACT COMPONENT)](https://github.com/priolo/jon-template/blob/7f8c02cbd72371c1018f7a689ed625577f22f206/src/components/layouts/AppBar.jsx#L60)
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
Ti permette di non avere direttamente il contenuto nella VIEW... è più bello!!!  
E' utile per i test in Cypress: puoi usare la PATH di traduzione per individuare dei componenti  
invece del testo (che potrebbe cambiare).

Usa l'HOOK per importare la funzione di traduzione `t`   
[all'interno di un REACT COMPONENT]
```js
import { useTranslation } from 'react-i18next'
...
const {t} = useTranslation()
```

Traduci tramite PATH
```jsx
<TableCell>{t("pag.user.tbl.username")}</TableCell>
```

Oppure usa il [PLUGIN `i18n`](https://github.com/priolo/jon-template/blob/7f8c02cbd72371c1018f7a689ed625577f22f206/src/plugins/i18n.js)  
[fuori da un COMPONENT]
```js
import i18n from "i18next"
...
const title = i18n.t("pag.default.dlg.router_confirm.title")
```

La PATH fa riferimento al file json nella directory `locales`

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
> Questo è figo perché è completamente trasparente all'APP: in pratica `fetch` funziona comunque!  

In [mocks/ajax/handlers](https://github.com/priolo/jon-template/tree/7f8c02cbd72371c1018f7a689ed625577f22f206/src/mocks/ajax/handlers) ci sono i "CONTROLLERs" simulati  
In [mocks/data](https://github.com/priolo/jon-template/tree/7f8c02cbd72371c1018f7a689ed625577f22f206/src/mocks/data) ci sono ... i dati! Usati per emulare il DB

L'APP avvia il `Service Worker` se è in `development` oppure la variabile di ambiente `REACT_APP_MOCK` è "true" (stringa!)  

> Le variabili di ambiente in CRA sono documentate [qui](https://create-react-app.dev/docs/adding-custom-environment-variables/)  
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

E' molto semplice:  
RENDER CONDIZIONALE in base al corrente url del browser? 
Usa `Switch` specificando una `path` 
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

"Cambiare pagina" dentro a REACT? Usa l'HOOK `useHistory`:  
[src\components\app\Avatar.jsx](https://github.com/priolo/jon-template/blob/7f8c02cbd72371c1018f7a689ed625577f22f206/src/components/app/Avatar.jsx)
```jsx
import { useHistory } from "react-router-dom";

export default function Avatar() {
	const history = useHistory()
	const handleClickProfile = e => history.push("/profile")
	return ...
}
```

"Cambiare pagina" fuori da REACT? Usa `history` nativa
```js
window.history.push("/docs/33")
```

Accedere ai parametri dell'url? Usa l'HOOK `useParams`.  
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

> **ATTENZIONE :** Essendo il TEMPLATE un `SPA`:
> - Su cambio URL non effettua nessuna richiesta HTTP al server ma aggiorna semplicemente il rendering  
> - Naturalmente, i dati vengono recuperati tramite richieste AJAX
> - Le uniche richieste "sulla struttura dell'APP" è il primo caricamento o reload della pagina.  
> - Il SERVER va settato opportunamente per rispondere sempre con la stessa pagna



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




