if('serviceWorker' in navigator){addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}))}
let pedido=null;const btn=document.getElementById('instalar');const inst=matchMedia('(display-mode: standalone)').matches||navigator.standalone;
addEventListener('beforeinstallprompt',e=>{e.preventDefault();pedido=e;if(btn&&!inst)btn.hidden=false});
if(btn)btn.addEventListener('click',async()=>{if(!pedido)return;pedido.prompt();await pedido.userChoice;pedido=null;btn.hidden=true});
addEventListener('appinstalled',()=>{if(btn)btn.hidden=true});
let visto=false;try{visto=localStorage.getItem('ios-dica')}catch(e){}
if(/iphone|ipad|ipod/i.test(navigator.userAgent)&&!inst&&!visto){const d=document.createElement('div');d.className='ios-dica';d.innerHTML='Para instalar: toque em <b>Compartilhar</b> e depois em <b>Adicionar à Tela de Início</b>.<br><button type="button">Entendi</button>';d.querySelector('button').onclick=()=>{d.remove();try{localStorage.setItem('ios-dica','1')}catch(e){}};document.body.appendChild(d)}
