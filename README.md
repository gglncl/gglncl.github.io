# ViaggioChiaro — MVP a costo zero

Sito statico pronto da pubblicare. Non richiede database, API, backend o servizi a pagamento.

## Obiettivo economico
Target iniziale: **25 € netti/mese** con spesa software/hosting = **0 €**.

## Monetizzazione prevista
1. **Rimborso volo → AirHelp**
   - inserire il link affiliato in `config.js`
2. **Noleggio auto → DiscoverCars**
   - inserire il link affiliato in `config.js`
3. **eSIM → Airalo / Saily**
   - inserire i link affiliati in `config.js`

## Configurazione
Apri `config.js` e sostituisci le stringhe vuote:
```js
window.AFFILIATE_LINKS = {
  airhelp: "TUO_LINK",
  discovercars: "TUO_LINK",
  airalo: "TUO_LINK",
  saily: "TUO_LINK"
};
```

## Hosting a costo zero
### GitHub Pages
- crea un repository pubblico
- carica tutti i file nella root
- Settings → Pages → Deploy from branch → `main` / root
- il sito sarà pubblicato su un sottodominio `github.io`

### Cloudflare Pages
È adatto allo stesso progetto perché il sito è completamente statico.

## Prima del lancio
- ottenere almeno 1-2 approvazioni affiliate
- aggiungere i link in `config.js`
- pubblicare
- collegare Google Search Console (gratuito)
- generare la sitemap con l'URL reale
- NON comprare dominio finché il progetto non genera almeno il suo costo

## Regola della sfida
Non contare come successo:
- valore del tempo risparmiato
- coupon/buoni non prelevabili
- ricavi lordi se esistono costi sostenuti

Contare solo denaro realmente maturato/pagabile meno eventuali costi.
