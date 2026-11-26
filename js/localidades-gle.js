/* Cadastro auxiliar transcrito das Tabelas I, II e III do Anexo II da Portaria GM-MD 379/2022.
   Não substitui o enquadramento geográfico dos arts. 3º e 4º nem a versão oficial vigente. */
(()=>{
'use strict';
const registros = [
  // Tabela I — Categoria A
  ...[
    ['BA','Arquipélago de Abrolhos'],['BA','Caravelas'],['ES','Ilha de Trindade'],['GO','Aragarças'],['GO','Porangatu'],
    ['MA','Farol Preguiças'],['MA','Farol Araçagy'],['MA','Farol Santana'],['MA','Farol São João'],['MA','Alcântara'],
    ['MS','Aquidauana'],['PE','Arquipélago de Fernando de Noronha'],['PR','Guaíra'],['PR','Radiofarol Paranaguá'],
    ['RJ','Ilha Rasa'],['RJ','Farol de Macaé'],['RJ','Farol de Cabo Frio'],['RJ','Farol de Castelhanos'],['RJ','Radiofarol de São Tomé'],
    ['RN','Radiofarol de Calcanhar (Touros)'],['RN','Farol da Ponta do Mel (Areia Branca)'],
    ['RS','Rio Grande'],['RS','Tramandaí'],['RS','Farol de Tramandaí'],['RS','Radiofarol de Tramandaí'],['RS','Farol de Cidreira'],['RS','Radiofarol Chuí'],['RS','Farol Mostardas'],['RS','Farol Albardão'],['RS','Radiofarol Rio Grande'],['RS','Farol da Barra do Rio Grande (São José do Norte)'],
    ['SC','Farol de Santa Marta'],['SC','Radiofarol da Ilha da Paz'],['SC','Farol da Ilha do Arvoredo'],['SC','Urubici'],
    ['SP','Radiofarol da Ilha da Moela'],['SP','Farol da Ponta do Boi']
  ].map(([uf,nome])=>({uf,nome,categoria:'A',tabela:'I'})),
  // Tabela II — Categoria B
  ...[
    ['ES','São Gabriel da Palha'],['ES','Santa Teresa'],
    ...['Pirapora','Januária','Jequitinhonha','Araçuaí','Nanuque','São Gonçalo do Abaeté','Caeté','Três Marias','Montes Claros','Janaúba'].map(n=>['MG',n]),
    ['MS','Dourados'],['MS','Aquidauana'],['MT','Cuiabá'],['MT','Rondonópolis'],['MT','Várzea Grande'],
    ...['Foz do Iguaçu','Palmas','Catanduvas','Cascavel','Francisco Beltrão','Umuarama','Assis Chateaubriand','Medianeira','Pato Branco'].map(n=>['PR',n]),
    ['RJ','Parati'],['RJ','Região da Ilha da Marambaia (limites do Anexo II)'],
    ...['Uruguaiana','Santiago','Itaqui','Jaguari','Jaguarão','Quaraí','Alegrete','São Borja','São Luiz Gonzaga','Bagé','Santana do Livramento','Canguçu','Dom Pedrito','Rosário do Sul','Santo Ângelo','Santa Rosa','Frederico Westphalen','Sarandi','Butiá','General Câmara'].map(n=>['RS',n]),
    ...['Laguna','São Miguel do Oeste','Xanxerê','Chapecó','Maravilha','Três Barras'].map(n=>['SC',n]),
    ['SP','Vicente de Carvalho (Distrito de Guarujá)'],['SP','Tanabi'],['SP','São Roque']
  ].map(([uf,nome])=>({uf,nome,categoria:'B',tabela:'II'})),
  // Tabela III — localidades excluídas da classificação especial
  ...[
    ...['Maceió','Rio Largo'].map(n=>['AL',n]),
    ...['Salvador','Ilhéus','Feira de Santana','Itabuna','Camaçari','Vitória da Conquista','Jequié'].map(n=>['BA',n]),
    ['CE','Fortaleza'],['DF','Brasília e Regiões Administrativas'],['GO','Goiânia'],['GO','Anápolis'],['MS','Campo Grande'],
    ...['João Pessoa','Bayeux','Campina Grande'].map(n=>['PB',n]),
    ...['Recife','Olinda','Jaboatão dos Guararapes'].map(n=>['PE',n]),
    ['RN','Natal e Parnamirim (exceto área delimitada no Anexo II)'],['SE','Aracaju']
  ].map(([uf,nome])=>({uf,nome,categoria:'N',tabela:'III'}))
];
const normalizar=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const input=document.getElementById('gle-localidade');
const list=document.getElementById('gle-localidades-list');
const status=document.getElementById('gle-localidade-status');
const categoria=document.getElementById('gle-categoria');
if(!input||!list||!status||!categoria)return;
registros.forEach(r=>{const opt=document.createElement('option');opt.value=`${r.nome} - ${r.uf}`;list.appendChild(opt);});
function atualizar(){
 const valor=normalizar(input.value); if(!valor){status.textContent='Selecione ou informe uma localidade. A busca não substitui a conferência do enquadramento geográfico.';return;}
 const encontrados=registros.filter(r=>normalizar(`${r.nome} ${r.uf}`)===valor || normalizar(r.nome)===valor);
 if(!encontrados.length){status.textContent='Não localizada nas Tabelas I, II ou III do Anexo II. Isso não significa, por si só, que seja não especial: os critérios geográficos dos arts. 3º e 4º também precisam ser conferidos.';return;}
 const cats=[...new Set(encontrados.map(r=>r.categoria))];
 if(cats.length>1){status.textContent='A localidade aparece em mais de uma tabela do documento fornecido. Há divergência no cadastro transcrito; confirme a versão oficial e o enquadramento com a OM antes de selecionar a categoria.';return;}
 const r=encontrados[0];
 if(r.categoria==='A'||r.categoria==='B'){categoria.value=r.categoria;status.textContent=`Consta na Tabela ${r.tabela} do Anexo II como localidade especial — Categoria ${r.categoria}. Confirme também os limites geográficos dos arts. 3º e 4º e a redação vigente.`;}
 else {categoria.value='';status.textContent='Consta na Tabela III do Anexo II como localidade excluída da classificação especial. A tabela não substitui a verificação de exceções geográficas expressamente descritas no próprio anexo.';}
}
input.addEventListener('change',atualizar); input.addEventListener('blur',atualizar);
window.MilicoAudazLocalidadesGLE={registros:registros.map(r=>({...r})),normalizar,consultar:(nome)=>{const n=normalizar(nome);return registros.filter(r=>normalizar(r.nome)===n);}};
})();
