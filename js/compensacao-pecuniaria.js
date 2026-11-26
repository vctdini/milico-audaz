(() => {
'use strict';
const KEY='milico-audaz:perfil:v1';
const $=id=>document.getElementById(id);
const money=n=>(Number(n)||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const num=v=>Math.max(0,Number(String(v??'0').replace(',','.'))||0);
const excluded=['Diárias','Ajuda de custo','Indenização de transporte','Auxílio/adiantamento para uniformes','Indenização de etapas','13º salário','Adicional de férias'];
let rowCount=0;
function addRow(name='',value='0',include=false,source='manual'){
 const id=++rowCount, row=document.createElement('div'); row.className='calc-row cp-row'; row.dataset.source=source;
 row.innerHTML=`<label>Rubrica<input type="text" data-name maxlength="90" placeholder="Nome da parcela"></label><label>Valor mensal (R$)<input type="number" data-value min="0" step="0.01" value="0"></label><label class="chk"><input type="checkbox" data-include> Incluir na base</label><button type="button" class="remove-row" aria-label="Remover rubrica">×</button>`;
 row.querySelector('[data-name]').value=name;row.querySelector('[data-value]').value=value;row.querySelector('[data-include]').checked=include;
 row.querySelectorAll('input').forEach(el=>el.addEventListener('input',updateBase));row.querySelector('.remove-row').addEventListener('click',()=>{row.remove();updateBase()});
 $('rubricas').appendChild(row);updateBase();return row;
}
function updateBase(){let total=0;$('rubricas').querySelectorAll('.cp-row').forEach(r=>{if(r.querySelector('[data-include]').checked)total+=num(r.querySelector('[data-value]').value)});$('base-total').textContent=money(total)}
function importProfile(){let p;try{p=JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){};if(!p||p.version!==1||!p.data){$('import-status').textContent='Não encontrei contracheque salvo neste navegador. Você pode preencher as rubricas manualmente.';return}
 const d=p.data; $('rubricas').innerHTML=''; rowCount=0;
 // O perfil compartilhado guarda alguns adicionais como percentuais/parâmetros, não como valores em reais.
 // Por segurança, só importamos lançamentos monetários explícitos; não convertemos percentuais em valores sem a memória do contracheque.
 const extras=Array.isArray(d['receitas-extras'])?d['receitas-extras']:[];let count=0;
 extras.forEach(x=>{if(num(x.valor)>0){addRow(x.nome||'Receita adicional do contracheque',x.valor,false,'perfil');count++}});
 excluded.forEach(n=>addRow(n,'0',false,'excluida'));
 $('import-status').textContent=`Perfil encontrado para ${d.posto||'posto não identificado'}. ${count} lançamento(s) monetário(s) adicional(is) foram importados para conferência. Os parâmetros do contracheque (percentuais de adicionais) não são valores em reais e, por isso, não foram convertidos automaticamente. Informe as rubricas e valores em reais nos campos manuais; nenhuma inclusão na base é automática.`;
}
$('importar-perfil').addEventListener('click',importProfile);
$('adicionar-rubrica').addEventListener('click',()=>addRow('',0,false));
$('forma').addEventListener('change',()=>{$('parcelas-wrap').hidden=$('forma').value!=='parcelado'});
function submit(e){e.preventDefault();const years=num($('anos').value),days=num($('dias').value),obY=num($('ob-anos').value),obD=num($('ob-dias').value);if(days>364||obD>364){alert('Informe dias entre 0 e 364.');return}
 let totalDays=years*365+days-(obY*365+obD);if(totalDays<0){alert('O período de serviço obrigatório a excluir não pode superar o tempo total informado.');return}
 const effectiveYears=Math.floor(totalDays/365),fraction=totalDays%365,units=effectiveYears+(fraction>=180?1:0);
 let base=0;const lines=[];$('rubricas').querySelectorAll('.cp-row').forEach(r=>{const name=r.querySelector('[data-name]').value.trim()||'Rubrica sem nome',v=num(r.querySelector('[data-value]').value),inc=r.querySelector('[data-include]').checked;if(inc)base+=v;lines.push({name,value:v,include:inc})});
 const total=Math.round((base*units+Number.EPSILON)*100)/100;const forma=$('forma').value,parts=forma==='parcelado'?Math.max(2,Math.min(60,Math.trunc(num($('parcelas').value)||2))):1;const baseCents=Math.round(total*100),each=Math.floor(baseCents/parts),rem=baseCents%parts;
 let h=`<div class="res-title"><span class="res-title-mark">✓</span><strong>Resultado da simulação</strong></div><div class="cc-report cc-margin-highlight"><small>Compensação pecuniária estimada</small><strong>${money(total)}</strong><p>Base mensal selecionada: ${money(base)} × ${units} remuneração(ões) computável(is).</p></div><h3>Memória do tempo computável</h3><p>Tempo informado: ${years} ano(s) e ${days} dia(s). Serviço obrigatório excluído: ${obY} ano(s) e ${obD} dia(s).</p><p>Tempo após exclusão: ${effectiveYears} ano(s) completos e ${fraction} dia(s) de fração. ${fraction>=180?'A fração foi arredondada para um ano, conforme o limite legal de 180 dias.':'A fração inferior a 180 dias não gerou ano adicional.'}</p><h3>Composição da base mensal</h3><div class="table-wrap"><table><thead><tr><th>Rubrica</th><th>Valor</th><th>Tratamento</th></tr></thead><tbody>${lines.map(x=>`<tr><td>${escapeHtml(x.name)}</td><td>${money(x.value)}</td><td>${x.include?'Incluída na base pelo usuário':'Não incluída'}</td></tr>`).join('')}</tbody></table></div><p><strong>Base selecionada: ${money(base)}</strong></p><h3>Forma de pagamento simulada</h3>${parts===1?`<p>Pagamento único: <strong>${money(total)}</strong>.</p>`:`<p>Parcelamento hipotético em ${parts} parcelas: ${Array.from({length:parts},(_,i)=>`Parcela ${i+1}: ${money((each+(i<rem?1:0))/100)}`).join(' · ')}</p><p>O parcelamento real depende de acordo e formalização previstos no Decreto nº 99.425/1990.</p>`}<div class="warn"><strong>Atenção:</strong> resultado matemático estimativo. A auditoria do projeto ainda registra pendência de homologação da composição da remuneração mensal por rubrica e de procedimentos administrativos do Exército. A simulação não confirma elegibilidade nem substitui análise do órgão pagador.</div>`;
 $('resultado').innerHTML=h;$('resultado').hidden=false;$('resultado').scrollIntoView({behavior:'smooth',block:'start'});
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
$('comp-form').addEventListener('submit',submit);
// Inicia com rubricas de exclusão para facilitar a conferência, sem valores presumidos.
excluded.forEach(n=>addRow(n,0,false,'excluida'));
})();
