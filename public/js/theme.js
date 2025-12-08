(function(){
  const body = document.body;
  const KEY = 'neuro_theme';
  const btn = document.getElementById('themeBtn');
  const icon = document.getElementById('themeIcon');

  function apply(t){
    if(t === 'dark'){ body.classList.add('theme-dark'); body.classList.remove('theme-light'); if(icon) icon.textContent = '🌙'; }
    else { body.classList.add('theme-light'); body.classList.remove('theme-dark'); if(icon) icon.textContent = '☀️'; }
  }

  const saved = localStorage.getItem(KEY);
  if(saved) apply(saved);
  else apply('dark');

  if(btn) btn.addEventListener('click', ()=>{
    const next = body.classList.contains('theme-dark') ? 'light' : 'dark';
    apply(next); localStorage.setItem(KEY, next);
  });
})();
