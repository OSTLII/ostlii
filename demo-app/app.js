let map;
let userMarker;
let signals=[];
let currentLens='discover';

function init(){
  map=L.map('map').setView([39.0997,-94.5786],13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map);
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(pos=>{
      const {latitude,longitude}=pos.coords;
      userMarker=L.marker([latitude,longitude]).addTo(map).bindPopup('You');
      map.setView([latitude,longitude],15);
    });
  }
  document.querySelectorAll('#lens-toggle button').forEach(btn=>{
    btn.addEventListener('click',()=>setLens(btn.dataset.lens));
  });
  document.getElementById('sendSignal').addEventListener('click',sendSignal);
}

function setLens(lens){
  currentLens=lens;
  document.querySelectorAll('#lens-toggle button').forEach(b=>b.classList.remove('active'));
  document.querySelector(`[data-lens="${lens}"]`).classList.add('active');
  document.getElementById('controls').classList.toggle('hidden',lens!=='social');
  updateSignals();
}

function sendSignal(){
  if(!userMarker)return;
  const text=document.getElementById('signalText').value.trim();
  if(!text)return;
  const latlng=userMarker.getLatLng();
  const marker=L.marker(latlng,{color:'blue'}).addTo(map).bindPopup(text);
  const signal={latlng,text,marker,time:Date.now()};
  signals.push(signal);
  document.getElementById('signalText').value='';
  setTimeout(()=>removeSignal(signal),300000); //5 min
  updateSignals();
}

function removeSignal(s){
  map.removeLayer(s.marker);
  signals=signals.filter(x=>x!==s);
}

function updateSignals(){
  signals.forEach(s=>s.marker.setOpacity(currentLens==='social'?1:0.3));
  checkEchoes();
}

function checkEchoes(){
  // highlight markers close together with same text
  signals.forEach(s=>s.marker.setIcon(new L.Icon.Default()));
  for(let i=0;i<signals.length;i++){
    for(let j=i+1;j<signals.length;j++){
      if(signals[i].text===signals[j].text){
        const dist=map.distance(signals[i].latlng,signals[j].latlng);
        if(dist<100){
          const icon=new L.Icon.Default();
          icon.options.className='echo-marker';
          signals[i].marker.setIcon(icon);
          signals[j].marker.setIcon(icon);
        }
      }
    }
  }
}

window.onload=init;
