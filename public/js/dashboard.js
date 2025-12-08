(function(){
  // ECG line animation - simple translate loop
  const ecgLine = document.getElementById('ecg-line');
  if(ecgLine){
    let offset = 0;
    setInterval(()=> {
      offset = (offset + 2) % 400;
      ecgLine.setAttribute('transform', `translate(-${offset},0)`);
    }, 80);
  }

  // highlight heart based on latest data
  const latest = window.__NEUROSIGHT_LATEST || null;
  function highlight(id, intensity=0.32){
    const el = document.getElementById(id);
    if(!el) return;
    el.style.transition = 'opacity .28s, transform .28s';
    el.style.opacity = intensity;
    el.classList.add('hl-fade');
    setTimeout(()=> { el.style.opacity = 0; el.classList.remove('hl-fade'); }, 1200);
  }

  if(latest){
    const htn = Number(latest.hypertensionRisk || 0);
    const athero = Number(latest.atherosclerosisRisk || 0);
    const hba1c = Number(latest.hba1cLevel || 0);
    const dr = (latest.diabeticRetinopathyLevel || '').toLowerCase();

    if(htn >= 50 || athero >= 50) highlight('hl-heart', 0.36);
    if(dr && dr !== 'no dr' && dr !== 'no dr'.toLowerCase()) highlight('hl-retina', 0.36);
    if(hba1c >= 6.5) highlight('hl-retina', 0.28);
  }
})();
