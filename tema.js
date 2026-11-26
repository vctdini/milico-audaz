(function(){
  'use strict';
  var KEY='milico-audaz-theme';
  var valid=['light','dark','system'];
  var media=window.matchMedia?window.matchMedia('(prefers-color-scheme: dark)'):null;
  function saved(){try{var v=localStorage.getItem(KEY);return valid.indexOf(v)>=0?v:'system';}catch(e){return 'system';}}
  var preference=saved();
  function apply(){
    var dark=preference==='dark'||(preference==='system'&&media&&media.matches);
    document.documentElement.setAttribute('data-theme',dark?'dark':'light');
    document.documentElement.style.colorScheme=dark?'dark':'light';
    var meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.setAttribute('content',dark?'#101827':'#0b2a6b');
    var select=document.getElementById('preferencia-tema');if(select)select.value=preference;
  }
  function mount(){
    var bar=document.querySelector('header.top .bar');if(!bar||document.getElementById('preferencia-tema'))return;
    var wrap=document.createElement('label');wrap.className='theme-control';wrap.setAttribute('for','preferencia-tema');
    var icon=document.createElement('span');icon.className='theme-icon';icon.setAttribute('aria-hidden','true');icon.textContent='◐';
    var select=document.createElement('select');select.id='preferencia-tema';select.setAttribute('aria-label','Aparência do aplicativo');
    [['system','Automático'],['light','Claro'],['dark','Escuro']].forEach(function(item){var op=document.createElement('option');op.value=item[0];op.textContent=item[1];select.appendChild(op);});
    select.addEventListener('change',function(){preference=valid.indexOf(select.value)>=0?select.value:'system';try{localStorage.setItem(KEY,preference);}catch(e){}apply();});
    wrap.appendChild(icon);wrap.appendChild(select);
    var install=bar.querySelector('#instalar');if(install)bar.insertBefore(wrap,install);else bar.appendChild(wrap);
    apply();
  }
  if(media){var listener=function(){if(preference==='system')apply();};if(media.addEventListener)media.addEventListener('change',listener);else if(media.addListener)media.addListener(listener);}
  apply();
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
