/* Cadastro inicial de guarnições/localidades de referência para a busca da movimentação.
   A legislação de transporte define regras e direitos, mas não publica um cadastro único e exaustivo
   de todas as OM/guarnições. Por isso, esta lista auxilia a seleção; localidades ausentes podem ser digitadas. */
(() => {
  'use strict';
  const localidades = [
    ['Alegrete','RS'],['Alcântara','MA'],['Anápolis','GO'],['Aracaju','SE'],['Aquidauana','MS'],['Bagé','RS'],['Barueri','SP'],['Belém','PA'],['Belo Horizonte','MG'],['Boa Vista','RR'],['Brasília','DF'],['Cachoeira do Sul','RS'],['Cáceres','MT'],['Campinas','SP'],['Campo Grande','MS'],['Cascavel','PR'],['Caxias do Sul','RS'],['Chapecó','SC'],['Cruz Alta','RS'],['Curitiba','PR'],['Dourados','MS'],['Florianópolis','SC'],['Fortaleza','CE'],['Foz do Iguaçu','PR'],['Goiania','GO'],['Guajará-Mirim','RO'],['Guarujá','SP'],['Ilhéus','BA'],['Imperatriz','MA'],['Itaituba','PA'],['Jaguarão','RS'],['João Pessoa','PB'],['Juiz de Fora','MG'],['Ladário','MS'],['Macapá','AP'],['Maceió','AL'],['Manaus','AM'],['Marabá','PA'],['Marília','SP'],['Natal','RN'],['Niterói','RJ'],['Palmas','TO'],['Paranaguá','PR'],['Parintins','AM'],['Passo Fundo','RS'],['Pelotas','RS'],['Ponta Grossa','PR'],['Porto Alegre','RS'],['Porto Velho','RO'],['Recife','PE'],['Resende','RJ'],['Rio Branco','AC'],['Rio de Janeiro','RJ'],['Rio Grande','RS'],['Salvador','BA'],['Santa Maria','RS'],['Santana do Livramento','RS'],['Santiago','RS'],['Santo Ângelo','RS'],['São Gabriel','RS'],['São Luís','MA'],['São Paulo','SP'],['São Vicente','SP'],['Tabatinga','AM'],['Tefé','AM'],['Teresina','PI'],['Três Corações','MG'],['Uruguaiana','RS'],['Vila Velha','ES'],['Vitória','ES'],
    // Localidades expressamente presentes no cadastro auxiliar da Portaria GM-MD nº 379/2022
    ['Aragarças','GO'],['Araçuaí','MG'],['Areia Branca','RN'],['Assis Chateaubriand','PR'],['Butiá','RS'],['Caeté','MG'],['Canguçu','RS'],['Caravelas','BA'],['Catanduva','SP'],['Cuiabá','MT'],['Dom Pedrito','RS'],['Frederico Westphalen','RS'],['General Câmara','RS'],['Guaíra','PR'],['Itaqui','RS'],['Jaguari','RS'],['Janaúba','MG'],['Januária','MG'],['Jequitinhonha','MG'],['Laguna','SC'],['Maravilha','SC'],['Medianeira','PR'],['Montes Claros','MG'],['Nanuque','MG'],['Pato Branco','PR'],['Pirapora','MG'],['Porangatu','GO'],['Quaraí','RS'],['Rondonópolis','MT'],['Rosário do Sul','RS'],['São Borja','RS'],['São Gabriel da Palha','ES'],['São Gonçalo do Abaeté','MG'],['São Luiz Gonzaga','RS'],['São Miguel do Oeste','SC'],['São Roque','SP'],['São Roque','SP'],['São Teresa','ES'],['São Três Marias','MG'],['Sarandi','RS'],['Tanabi','SP'],['Tramandaí','RS'],['Umuarama','PR'],['Várzea Grande','MT'],['Xanxerê','SC']
  ];
  const normalizar = (s) => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR').replace(/[^a-z0-9]+/g,' ').trim();
  const oficiaisGLE = (window.MilicoAudazLocalidadesGLE?.registros || []).map(r => [r.nome, r.uf]);
  const unicas = [...new Map([...localidades, ...oficiaisGLE].map(([cidade,uf]) => [`${normalizar(cidade)}-${uf}`, {cidade,uf,valor:`${cidade} - ${uf}`}])).values()]
    .sort((a,b) => a.cidade.localeCompare(b.cidade,'pt-BR'));
  const lista = document.getElementById('mov-guarnicoes-lista');
  if (lista) unicas.forEach(item => { const option=document.createElement('option'); option.value=item.valor; lista.appendChild(option); });
  window.MilicoAudazGuarnicoes = {
    localidades: unicas,
    normalizar,
    buscar(termo) { const q=normalizar(termo); return q ? unicas.filter(x=>normalizar(x.valor).includes(q)) : unicas.slice(); }
  };
})();
