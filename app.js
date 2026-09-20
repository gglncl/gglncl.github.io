function money(n){return new Intl.NumberFormat('it-IT',{style:'currency',currency:'EUR'}).format(n)}
function affiliateClick(provider){
  const links = window.AFFILIATE_LINKS || {};
  const url = links[provider];
  if(url){ window.open(url,'_blank','noopener'); }
  else{
    alert("Link affiliato non ancora configurato. Il tool è pronto: basta inserire il link in config.js.");
  }
}

function flightCalc(){
  const route = document.getElementById('route').value;
  const event = document.getElementById('event').value;
  const distance = Number(document.getElementById('distance').value || 0);
  const delay = Number(document.getElementById('delay').value || 0);
  const notice = Number(document.getElementById('notice').value || 99);
  const extraordinary = document.getElementById('extraordinary').value;
  const voluntary = document.getElementById('voluntary').value;
  const covered = route !== 'other';

  let amount = 0;
  if(distance <= 1500) amount = 250;
  else if(route === 'within_eu' || distance <= 3500) amount = 400;
  else amount = 600;

  let status='Da verificare', cls='status-warn', msg='';
  if(!covered){
    status='Probabilmente non coperto da EU261'; cls='status-no';
    msg='Il percorso selezionato non rientra nei casi principali coperti dalle regole UE.';
  } else if(extraordinary === 'yes'){
    status='Probabile esclusione'; cls='status-no';
    msg='Le circostanze eccezionali possono escludere la compensazione. Restano comunque possibili diritti ad assistenza/rimborso.';
  } else if(event === 'delay'){
    if(delay >= 3){
      status = extraordinary === 'unknown' ? 'Possibile compensazione' : 'Buone possibilità';
      cls = extraordinary === 'unknown' ? 'status-warn' : 'status-ok';
      msg = `Con un ritardo all'arrivo di almeno 3 ore, la compensazione indicativa può arrivare a ${money(amount)}, salvo eccezioni.`;
    } else{
      status='Compensazione pecuniaria improbabile'; cls='status-no';
      msg='Sotto le 3 ore all’arrivo, la compensazione standard EU261 in genere non scatta, anche se possono esistere diritti di assistenza.';
    }
  } else if(event === 'cancel'){
    if(notice < 14){
      status = extraordinary === 'unknown' ? 'Possibile compensazione' : 'Buone possibilità';
      cls = extraordinary === 'unknown' ? 'status-warn' : 'status-ok';
      msg = `Cancellazione comunicata meno di 14 giorni prima: compensazione potenziale fino a ${money(amount)}. Orari dell'eventuale volo alternativo possono cambiare l'esito.`;
    } else{
      status='Compensazione pecuniaria meno probabile'; cls='status-no';
      msg='Se la cancellazione è stata comunicata almeno 14 giorni prima, la compensazione standard generalmente non è dovuta.';
    }
  } else {
    if(voluntary === 'yes'){
      status='Da verificare'; cls='status-warn';
      msg='Se hai rinunciato volontariamente al posto, le regole di compensazione cambiano rispetto al negato imbarco involontario.';
    } else{
      status='Possibile compensazione'; cls='status-ok';
      msg = `Per negato imbarco involontario (es. overbooking), la compensazione può arrivare a ${money(amount)}, oltre ad altri diritti previsti.`;
    }
  }

  document.getElementById('flightStatus').textContent=status;
  document.getElementById('flightStatus').className='result-big '+cls;
  document.getElementById('flightAmount').textContent = covered ? money(amount) : '—';
  document.getElementById('flightMsg').textContent=msg;
}

function carCalc(){
  const days=Number(document.getElementById('days').value||0);
  const rental=Number(document.getElementById('rental').value||0);
  const km=Number(document.getElementById('km').value||0);
  const kml=Number(document.getElementById('kml').value||1);
  const fuel=Number(document.getElementById('fuel').value||0);
  const toll=Number(document.getElementById('toll').value||0);
  const parking=Number(document.getElementById('parking').value||0);
  const insurance=Number(document.getElementById('insurance').value||0);
  const extras=Number(document.getElementById('extras').value||0);
  const deposit=Number(document.getElementById('deposit').value||0);

  const fuelCost=(km/kml)*fuel;
  const total=days*rental + fuelCost + toll + days*parking + days*insurance + extras;
  document.getElementById('carTotal').textContent=money(total);
  document.getElementById('carDaily').textContent=days?money(total/days):'—';
  document.getElementById('fuelCost').textContent=money(fuelCost);
  document.getElementById('depositOut').textContent=money(deposit);
}

function esimCalc(){
  const days=Number(document.getElementById('esimDays').value||1);
  const profile=Number(document.getElementById('profile').value||0.8);
  const wifi=document.getElementById('wifi').value;
  const hotspot=document.getElementById('hotspot').value;
  let factor=1;
  if(wifi==='often') factor*=0.72;
  if(wifi==='rarely') factor*=1.12;
  if(hotspot==='yes') factor*=1.55;
  const estimate=days*profile*factor;
  const packs=[1,3,5,10,20,50];
  let rec=packs.find(x=>x>=estimate*1.15);
  if(!rec) rec='Illimitati';
  const recText = typeof rec==='number' ? `${rec} GB` : rec;
  document.getElementById('esimEstimate').textContent=estimate.toFixed(1).replace('.',',')+' GB';
  document.getElementById('esimRec').textContent=recText;
  let msg='Uso normale: controlla sempre se il piano consente hotspot e la durata effettiva.';
  if(estimate>20) msg='Per questo profilo conviene confrontare anche piani illimitati o più pacchetti dati.';
  document.getElementById('esimMsg').textContent=msg;
}
