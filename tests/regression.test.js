'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'contracheque.html'), 'utf8');
const profile = fs.readFileSync(path.join(root, 'js/perfil.js'), 'utf8');
const norms = JSON.parse(fs.readFileSync(path.join(root, 'js/data/normas-2026.json'), 'utf8'));

function loadCore() {
  const document = {
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {}
  };
  const window = {};
  vm.runInNewContext(fs.readFileSync(path.join(root, 'app.js'), 'utf8'), { document, window, console, Number, Math });
  return window.MilicoAudazCore;
}

const core = loadCore();

test('catálogo de postos: identificadores únicos e soldos positivos', () => {
  const postos = core.dados.POSTOS;
  assert.ok(postos.length >= 20);
  assert.equal(new Set(postos.map(p => p.id)).size, postos.length);
  for (const p of postos) {
    assert.ok(p.soldo > 0, `${p.id} deve ter soldo positivo`);
    assert.ok(core.dados.CIRC[p.circ] > 0, `${p.id} deve ter círculo válido`);
    assert.ok(p.disp >= 0 && p.disp <= 100, `${p.id} disponibilidade inválida`);
  }
});

test('composição da remuneração: 2º Sargento sem QE, sem adicionais informados', () => {
  const p = core.dados.POSTOS.find(x => x.id === 'sgt2');
  const r = core.comp(p, { qe: false, smi: false, hab: 0, ats: 0, co: 0, pm: 0, gle: 0, gr: 0 });
  assert.equal(r.s, 5209);
  assert.equal(r.am, 833.44);
  assert.equal(r.dp, 625.08);
  assert.equal(r.dd, 625.08);
  assert.equal(r.total, 6667.52);
});

test('prévia informa o percentual do adicional militar conforme o posto ou graduação', () => {
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  assert.match(app, /money\('Adicional militar',f\.am,`\$\{D\.CIRC\[f\.p\.circ\]\}% do soldo de \$\{f\.p\.nome\}`\)/);
  assert.equal(core.dados.CIRC.SGT, 16);
  assert.equal(core.dados.CIRC.OG, 28);
});

test('tempo de serviço e disponibilidade não são somados: prevalece o maior', () => {
  const p = core.dados.POSTOS.find(x => x.id === 'sgt2');
  const atsMaior = core.comp(p, { qe: false, smi: false, hab: 0, ats: 20, co: 0, pm: 0, gle: 0, gr: 0 });
  assert.equal(atsMaior.ats, 1041.8);
  assert.equal(atsMaior.dd, 1041.8);
  assert.equal(atsMaior.atsMaior, true);
  const dispMaior = core.comp(p, { qe: false, smi: false, hab: 0, ats: 5, co: 0, pm: 0, gle: 0, gr: 0 });
  assert.equal(dispMaior.dd, 625.08);
  assert.equal(dispMaior.atsMaior, false);
});

test('QE aplica percentual específico apenas às graduações com percentual cadastrado', () => {
  const p = core.dados.POSTOS.find(x => x.id === 'sgt2');
  const r = core.comp(p, { qe: true, smi: false, hab: 0, ats: 0, co: 0, pm: 0, gle: 0, gr: 0 });
  assert.equal(r.disp, 26);
  assert.equal(r.dp, 1354.34);
});

test('serviço militar inicial zera adicional militar no motor legado', () => {
  const p = core.dados.POSTOS.find(x => x.id === 'sd_rec');
  const r = core.comp(p, { qe: false, smi: true, hab: 0, ats: 0, co: 0, pm: 0, gle: 0, gr: 0 });
  assert.equal(r.am, 0);
});

test('perfil persiste os novos campos de dependentes e adicionais', () => {
  assert.match(profile, /dep-pre-escolar/);
  assert.match(profile, /receitas-extras/);
  assert.match(profile, /descontos-extras/);
  assert.doesNotMatch(profile, /fusex-despesas-manual/);
});

test('contracheque automatiza pensão, FuSEx, IR mensal e eventos separados', () => {
  assert.match(html, /id="pensao-auto"/);
  assert.match(html, /id="fusex-quota"/);
  assert.doesNotMatch(html, /id="fusex-despesas-manual"/);
  assert.match(html, /id="ferias-valor"/);
  assert.match(html, /id="natalino-valor"/);
  assert.match(html, /id="pensao-15"/);
  assert.doesNotMatch(html, /id="ir"/);
});

test('dependentes pré-escolar, compensação orgânica de 1 a 20% e opções não aplicáveis', () => {
  assert.match(html, /id="dep-pre-escolar"/);
  for (const id of ['co','pm','gle','ats']) assert.match(html, new RegExp(`id=\"${id}\"`));
  assert.match(fs.readFileSync(path.join(root, 'app.js'), 'utf8'), /Array\.from\(\{length:20\}/);
  assert.match(html, /cc-receita-parametros/);
  assert.match(html, /cc-desconto-parametros/);
  assert.doesNotMatch(html, /initStepCollapse/);
});


test('base remuneratória usada pela estimativa de pensão está definida no motor', () => {
  const p = core.dados.POSTOS.find(x => x.id === 'sgt2');
  const r = core.comp(p, { qe: false, smi: false, hab: 0, ats: 0, co: 0, pm: 0, gle: 0, gr: 0 });
  assert.equal(r.base, 6667.52);
  assert.equal(Math.round(r.base * 0.105 * 100) / 100, 700.09);
});

test('auxílio pré-escolar e linhas dinâmicas estão presentes no contracheque', () => {
  assert.match(fs.readFileSync(path.join(root, 'app.js'), 'utf8'), /valorPreUnit=526\.64/);
  assert.match(html, /id="receitas-extras"/);
  assert.match(html, /id="descontos-extras"/);
  assert.match(html, /data-open-catalog="receitas"/);
  assert.match(html, /data-open-catalog="descontos"/);
});

test('catálogo normativo declara escopo e competência inicial', () => {
  assert.equal(norms.escopo.forca, 'Exército Brasileiro');
  assert.equal(norms.escopo.competenciaInicial, '2026-01');
  assert.ok(norms.normas.some(n => n.id === 'lei-13954-2019'));
});

test('catálogo histórico não é ativado automaticamente', () => {
  const historic = JSON.parse(fs.readFileSync(path.join(root, 'js/data/regras-historicas.json'), 'utf8'));
  assert.equal(historic.aplicacaoAutomatica, false);
  assert.ok(historic.regras.some(r => r.id === 'tempo-servico-anuenios-1991-2000'));
  assert.ok(historic.regras.some(r => r.status.startsWith('bloqueado')));
});

test('formulários apontam para funções existentes no motor', () => {
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  const pages = fs.readdirSync(root).filter(f => f.endsWith('.html'));
  const names = new Set();
  for (const page of pages) {
    const source = fs.readFileSync(path.join(root, page), 'utf8');
    for (const match of source.matchAll(/data-fn="([a-zA-Z0-9_-]+)"/g)) names.add(match[1]);
  }
  for (const name of names) assert.match(app, new RegExp(`(?:^|\\n)${name}\\s*\\(`), `função ${name} precisa existir`);
});


test('cache PWA referencia somente arquivos existentes', () => {
  const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
  const match = sw.match(/const ARQ=\[(.*?)\];/);
  assert.ok(match, 'lista de precache deve existir');
  const files = [...match[1].matchAll(/"([^"]+)"/g)].map(x => x[1].replace(/^\.\//, ''));
  for (const file of files) assert.ok(fs.existsSync(path.join(root, file)), `arquivo ausente no cache: ${file}`);
});


test('lançamentos manuais: soma apenas valores positivos com descrição', () => {
  assert.equal(core.somarLancamentos([
    { nome: 'Empréstimo', valor: '120,50' },
    { nome: 'Convênio', valor: 79.5 },
    { nome: '', valor: 100 },
    { nome: 'Linha zerada', valor: 0 },
    { nome: 'Valor negativo', valor: -10 }
  ]), 200);
  assert.deepEqual(JSON.parse(JSON.stringify(core.normalizarLancamentos([
    { nome: '  Seguro  ', valor: '25,90' }, { nome: '', valor: 10 }
  ]))), [{ nome: 'Seguro', valor: 25.9, irTributavel: false, baseContribuicao: false, irDedutivel: false, margemPermanente: false }]);
});

test('lançamentos manuais têm subtotal acessível e validação de descrição', () => {
  assert.match(html, /id="receitas-extras-total"/);
  assert.match(html, /id="descontos-extras-total"/);
  assert.match(fs.readFileSync(path.join(root, 'app.js'), 'utf8'), /Preencha a descrição de cada receita ou desconto/);
  assert.match(html, /id=\"fusex-nao\"/); // estado interno não exibido; FuSEx padrão permanece ligado
});

test('perfil salva descrição e valor das linhas extras', () => {
  assert.match(profile, /data-row-name/);
  assert.match(profile, /data-row-value/);
  assert.match(profile, /receitas-extras/);
  assert.match(profile, /descontos-extras/);
});

test('compensação orgânica usa o soldo do posto de referência selecionado', () => {
  const atual = core.dados.POSTOS.find(x => x.id === 'sgt2');
  const ref = core.comp(atual, { qe:false, smi:false, hab:0, ats:0, co:10, coPosto:'sgt1', pm:0, gle:0, gr:0 });
  assert.equal(ref.coPosto.id, 'sgt1');
  assert.equal(ref.co, 598.8);
});

test('IRRF mensal reproduz o exemplo do Planilha Bizurada (nov/2026)', () => {
  const r = core.calcularIRRF(9011.57, {
    dependentes:1, pensao:946.21, fusex:270.35, quota:36.05, alimenticia:0
  });
  assert.equal(Math.round(r.legais*100)/100,1442.20);
  assert.equal(Math.round(r.base*100)/100,7569.37);
  assert.equal(Math.round(r.imposto*100)/100,1172.85);
});

test('IRRF mensal reproduz as rubricas do contracheque CPEx enviado', () => {
  const r = core.calcularIRRF(9053.34, {
    dependentes:1, pensao:950.60, fusex:271.60, quota:36.21, alimenticia:0
  });
  assert.equal(Math.round(r.legais*100)/100,1448.00);
  assert.equal(Math.round(r.base*100)/100,7605.34);
  assert.equal(Math.round(r.imposto*100)/100,1182.74);
});

test('IR do adicional natalino é calculado em separado com desconto simplificado', () => {
  const r = core.calcularIRRF(9053.34,{modo:'simplificado'});
  assert.equal(Math.round(r.base*100)/100,8446.14);
  assert.equal(Math.round(r.imposto*100)/100,1413.96);
});

test('IRRF 2026 aplica a redução para rendimentos até R$ 7.350', () => {
  const r = core.calcularIRRF(6000,{modo:'simplificado'});
  assert.ok(r.reducao > 0);
  assert.ok(r.imposto < r.impostoBase);
  assert.equal(Math.round(r.imposto*100)/100,394.54);
});

test('cota complementar FuSEx e opção histórica de 1,5% estão documentadas na interface', () => {
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  assert.match(app,/0,4%/);
  assert.match(app,/0,5%/);
  assert.match(app,/31\/08\/2001/);
  assert.match(app,/não é adesão atual/i);
});

test('campos do perfil incluem novas bases e eventos tributáveis', () => {
  for (const id of ['co-posto','pensao-15','fusex-quota','fusex-nao','ferias-valor','natalino-valor']) {
    assert.match(profile,new RegExp(id));
  }
  assert.match(profile,/data-row-ir/);
  assert.match(profile,/data-row-base/);
  assert.match(profile,/data-row-ir-deduction/);
});

test('descontos obrigatórios calculam 10,5%, opção histórica de 1,5%, FuSEx 3% e quotas', () => {
  const d = core.calcularDescontosObrigatorios(9053.34,0.4,{pensaoAuto:true,optou15:true,fusexNao:false});
  assert.equal(d.pensaoBase,950.60);
  assert.equal(d.pensaoHistorica,135.80);
  assert.equal(d.pensao,1086.40);
  assert.equal(d.fusex,271.60);
  assert.equal(d.quota,36.21);
  const semFusex = core.calcularDescontosObrigatorios(9053.34,0.5,{pensaoAuto:true,optou15:false,fusexNao:true});
  assert.equal(semFusex.fusex,0);
  assert.equal(semFusex.quota,0);
});

test('auxílio pré-escolar aplica cota-parte de acordo com múltiplos do VB', () => {
  const r = core.calcularAssistenciaPreEscolar(1,9053.34,1927,526.64);
  assert.equal(Math.round(r.multiplosVB*100)/100,4.70);
  assert.equal(r.cotaPercent,5);
  assert.equal(r.participacao,26.33);
  assert.equal(r.liquidoUnit,500.31);
  assert.equal(r.total,500.31);
});

test('integração: exemplo CPEx 2º Sgt confere adicionais, descontos e benefícios', () => {
  const p = core.dados.POSTOS.find(x => x.id === 'sgt2');
  const r = core.comp(p,{qe:false,smi:false,hab:45,ats:0,co:1,coPosto:'sgt3',pm:0,gle:0,gr:0});
  assert.equal(Math.round(r.base*100)/100,9053.34);
  const d = core.calcularDescontosObrigatorios(r.base,0.4,{pensaoAuto:true,optou15:false,fusexNao:false});
  assert.equal(d.pensao,950.60);
  assert.equal(d.fusex,271.60);
  assert.equal(d.quota,36.21);
  const ir = core.calcularIRRF(r.total,{dependentes:1,pensao:d.pensao,fusex:d.fusex,quota:d.quota});
  assert.equal(Math.round(ir.imposto*100)/100,1182.74);
  const natal = core.calcularIRRF(9053.34,{modo:'simplificado'});
  assert.equal(Math.round(natal.imposto*100)/100,1413.96);
  const pre = core.calcularAssistenciaPreEscolar(1,r.base,1927,526.64);
  assert.equal(pre.total,500.31);
});


test('prévia automática do contracheque é atualizada ao preencher os campos e ao abrir a página', () => {
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  assert.match(app, /document\.addEventListener\('input',e=>[\s\S]*?atualizarSeCampoDaPrevia\(e\)/);
  assert.match(app, /document\.addEventListener\('change',atualizarSeCampoDaPrevia\)/);
  assert.match(app, /atualizarDescontosPreview\(\);\s*if \(typeof window/);
  for (const id of ['posto','habsel','dep-ir','pensao-auto','fusex-quota']) {
    assert.ok(app.includes(`'${id}'`), `campo ${id} deve atualizar a prévia`);
  }
});


test('catálogo de rubricas pré-definidas está disponível para receitas e descontos', () => {
  const html = fs.readFileSync(path.join(root, 'contracheque.html'), 'utf8');
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  assert.match(html, /data-open-catalog="receitas"/);
  assert.match(html, /data-open-catalog="descontos"/);
  assert.match(html, /id="cc-catalog"/);
  for (const item of ['Adicional de férias','Adicional de permanência','Adicional de PTTC','Adicional natalino (13º)','Auxílio-alimentação','Auxílio-fardamento','Auxílio-natalidade','Auxílio pré-escolar','Auxílio-transporte','Compensação orgânica','Gratificação de localidade especial','Gratificação de representação (2%)','Despesa médica / indenização FuSEx','Pensão judicial / alimentícia','Pensão militar adicional de 1,5%','Taxa de PNR']) {
    assert.ok(app.includes(item), `rubrica ${item} deve existir no catálogo`);
  }
  assert.match(app, /renderCatalogo/);
  assert.match(app, /addRow\(boxId,\{nome:item\.nome/);
});


test('catálogo usa delegação de eventos e modal fica fora do formulário', () => {
  const html = fs.readFileSync(path.join(root, 'contracheque.html'), 'utf8');
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
  const formEnd = html.indexOf('</form>');
  const modalStart = html.indexOf('id="cc-catalog"');
  assert.ok(formEnd > 0 && modalStart > formEnd, 'modal deve ficar fora do formulário');
  assert.match(app, /document\.addEventListener\('click',[\s\S]*?data-open-catalog/);
  assert.match(app, /const card=e\.target\.closest\('\[data-catalog-item\]'\)/);
  assert.match(app, /details\.open=true/);
  assert.match(html, /id="cc-catalog-status"/);
  assert.match(css, /\.cc-catalog-backdrop\[hidden\]/);
});


test('adicional de férias é calculado automaticamente em um terço da remuneração', () => {
  assert.equal(core.calcularAdicionalFerias(9053.34), 3017.78);
});

test('13º calcula valor proporcional, primeira parcela sem IR e segunda com abatimento', () => {
  const n = core.calcularAdicionalNatalino(9053.34, 12);
  assert.equal(n.total, 9053.34);
  assert.equal(n.primeira, 4526.67);
  assert.equal(n.segunda, 4526.67);
  const ir = core.calcularIRRF(n.total, { modo: 'simplificado' });
  assert.equal(Math.round(ir.imposto * 100) / 100, 1413.96);
  const proporcional = core.calcularAdicionalNatalino(9053.34, 6);
  assert.equal(proporcional.total, 4526.67);
  const noveMeses = core.calcularAdicionalNatalino(9053.34, 9);
  assert.equal(noveMeses.primeira, 4526.67, '1ª parcela corresponde à metade da remuneração do mês anterior');
  assert.equal(noveMeses.total, 6790.01, '13º integral é proporcional aos meses computados');
  assert.equal(noveMeses.segunda, 2263.34, '2ª parcela é o saldo após a antecipação');
});

test('botões de inclusão estão dentro dos quadros da segunda parte do contracheque', () => {
  const start = html.indexOf('id="cc-defaults-title"');
  const end = html.indexOf('</section>', start);
  const section = html.slice(start, html.indexOf('<details class="grp cc-advanced"', start));
  assert.ok(section.includes('data-open-catalog="receitas"'));
  assert.ok(section.includes('data-open-catalog="descontos"'));
  assert.ok(section.includes('id="receitas-extras"'));
  assert.ok(section.includes('id="descontos-extras"'));
});

test('eventos de férias e 13º possuem controles e regras separadas', () => {
  assert.match(html, /id="cc-evento-ferias"/);
  assert.match(html, /id="cc-evento-natalino"/);
  assert.match(html, /1ª parcela — adiantamento de 50%, sem IR/);
  assert.match(html, /2ª parcela — valor integral, abatendo a 1ª e calculando IR/);
  assert.match(fs.readFileSync(path.join(root, 'app.js'), 'utf8'), /calcularIRRF\(natalinoCalc\.total,\{modo:'simplificado'\}\)/);
});


test('atualizar demonstrativo consolida receitas e descontos adicionados pelo catálogo', () => {
  const r = core.calcularTotaisSimulacao({
    remuneracao: 9053.34,
    preEscolar: 500.31,
    ferias: 3017.78,
    natalino: 9053.34,
    receitasExtras: [
      { nome: 'Auxílio-transporte', valor: '310,90' },
      { nome: 'Auxílio-fardamento', valor: 500 }
    ],
    descontosAutomaticos: [950.60, 271.60, 36.21, 1180.25, 2249.00, 1413.96],
    adiantamentoNatal: 4526.67,
    descontosExtras: [
      { nome: 'Taxa de PNR', valor: '100,00' },
      { nome: 'Pensão alimentícia', valor: 250 }
    ]
  });
  assert.equal(r.totalReceitas, 22435.67);
  assert.equal(r.totalDescontos, 10978.29);
  assert.equal(r.liquido, 11457.38);
});

test('rubricas de desconto selecionadas no catálogo viram lançamentos no quadro Descontos', () => {
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  for (const item of ['Despesa médica / indenização FuSEx','Pensão judicial / alimentícia','Taxa de PNR']) {
    assert.ok(app.includes(item));
  }
  assert.match(app, /id:'despesa-medica',[^\n]*linha:true/);
  assert.match(app, /id:'alimenticia',[^\n]*linha:true,irDedutivel:true/);
  assert.match(app, /id:'pnr',[^\n]*linha:true/);
  assert.match(app, /descontosExtras\.map\(r=>\[esc\(r\.nome\),r\.valor\]\)/);
});

test('lançamentos de desconto entram no total final uma única vez', () => {
  const r = core.calcularTotaisSimulacao({
    remuneracao: 1000,
    descontosAutomaticos: [100, 50],
    descontosExtras: [
      { nome: 'PNR', valor: 30 },
      { nome: 'Pensão alimentícia', valor: 70, irDedutivel: true }
    ]
  });
  assert.equal(r.totalReceitas, 1000);
  assert.equal(r.totalDescontos, 250);
  assert.equal(r.liquido, 750);
});

test('férias preenchem automaticamente remuneração de referência e calculam IR separado', () => {
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  assert.match(app, /calcularIRRF\(f\.total\+feriasValor,\{dependentes:N\('dep-ir'\),pensao:d\.pensao,fusex:d\.fusex,quota:d\.quota,alimenticia:pensaoAlimenticia\}\)/);
  assert.match(app, /rendimentoMensalTributavel=\(feriasAtivo\?0:totalRemuneracao\)/);
  assert.match(html, /IR separado, o sistema considera automaticamente a remuneração do mês \+ 1\/3/);
  assert.doesNotMatch(html, /id="ferias-remuneracao"/);
});

test('IR do 13º é separado, sem retenção na 1ª parcela e com retenção integral na 2ª', () => {
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  assert.match(app, /natalinoAtivo&&natalinoParcela===2\?calcularIRRF\(natalinoCalc\.total/);
  assert.match(app, /natalinoParcela===1\?'Adicional natalino — 1ª parcela':'Adicional natalino — 2ª parcela/);
  assert.match(app, /const outrosDescontos=\[\['Adiantamento da 1ª parcela do 13º',adiantamentoNatal\]/);
});

test('controles duplicados de descontos e eventos foram removidos da seção avançada', () => {
  assert.doesNotMatch(html, /id="fusex-despesas-manual"|id="pnr"|id="pa"|Eventos eventuais|Outros parâmetros e descontos específicos/);
  const recipesStart = html.indexOf('cc-default-card cc-receitas');
  const eventsStart = html.indexOf('id="cc-eventos"');
  const discountsStart = html.indexOf('cc-default-card cc-descontos');
  assert.ok(eventsStart > recipesStart && eventsStart < discountsStart, 'controles de férias e 13º ficam no quadro de receitas');
});


test('IR de férias compara deduções legais informadas com o simplificado', () => {
  const brutoFerias = 9053.34 + core.calcularAdicionalFerias(9053.34);
  const ir = core.calcularIRRF(brutoFerias, {
    dependentes: 1, pensao: 950.60, fusex: 271.60, quota: 36.21
  });
  assert.equal(Math.round(brutoFerias * 100) / 100, 12071.12);
  assert.equal(ir.metodo, 'Deduções legais');
  assert.equal(Math.round(ir.legais * 100) / 100, 1448.00);
  assert.equal(Math.round(ir.imposto * 100) / 100, 2012.63);
});


test('remove os dois painéis inferiores redundantes e mantém seus estados internos ocultos', () => {
  assert.doesNotMatch(html, /Opções complementares e adicionais \(opcional\)/);
  assert.doesNotMatch(html, /Parâmetros dos descontos e eventos eventuais/);
  assert.match(html, /id="cc-calculation-state" hidden/);
  for (const id of ['ats','co','co-posto','pm','gle','pensao-auto','pensao-15','fusex-quota','pensao-auto-valor','fusex-auto-valor','fusex-quota-valor']) {
    assert.match(html, new RegExp(`id="${id}"`), `estado interno ${id} permanece disponível ao motor`);
  }
});

test('catálogo configura ATS, compensação orgânica, permanência, localidade e quota FuSEx dentro dos quadros', () => {
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  for (const key of ['ats','co','pm','gle']) assert.match(app, new RegExp(`${key}:\\{box:`));
  assert.match(app, /'fusex-quota':\{box:/);
  assert.match(app, /'pensao-15':\{box:/);
  assert.match(app, /cc-receita-parametros/);
  assert.match(app, /cc-desconto-parametros/);
  assert.match(app, /data-remove-param/);
  assert.match(app, /restaurarParametrosSalvos/);
});

test('modelo do relatório acompanha o Planilha Bizurada com quadro de margem consignável', () => {
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  assert.match(app, /Margem consignável disponível/);
  assert.match(app, /Rendimentos permanentes × 70% − reserva de 10% do soldo − descontos obrigatórios − descontos autorizados/);
  assert.match(app, /Limite de margem \(base × 70%\)/);
});


test('lançamentos extras exibem resumo compacto e botão de editar lápis', () => {
  const html = fs.readFileSync(path.join(root, 'contracheque.html'), 'utf8');
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  assert.match(app, /data-edit-row/);
  assert.match(app, /data-row-done/);
  assert.match(app, /calc-row-summary/);
  assert.match(html, /data-edit-event="ferias"/);
  assert.match(html, /data-edit-event="natalino"/);
});

test('parâmetros de adicionais têm resumo compacto, editar e concluir edição', () => {
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  assert.match(app, /data-edit-param/);
  assert.match(app, /data-param-done/);
  assert.match(app, /atualizarResumoParametro/);
  assert.match(app, /classList\.add\('is-editing'\)/);
});

test('perfil restaura lançamentos no novo formato compacto e editável', () => {
  const perfil = fs.readFileSync(path.join(root, 'js/perfil.js'), 'utf8');
  assert.match(perfil, /calc-row-summary/);
  assert.match(perfil, /data-edit-row/);
  assert.match(perfil, /data-row-done/);
});

test('CSS mantém os detalhes recolhidos e abre apenas ao editar', () => {
  const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
  assert.match(css, /\.calc-row-editor,\.cc-param-editor,\.cc-event-editor\{display:none/);
  assert.match(css, /\.calc-row\.is-editing \.calc-row-editor/);
  assert.match(css, /\.cc-param-card\.is-editing \.cc-param-editor/);
  assert.match(css, /\.cc-event-control\.is-editing \.cc-event-editor/);
});


test('resumo automático no topo substitui o botão de atualização manual', () => {
  const html = fs.readFileSync(path.join(root, 'contracheque.html'), 'utf8');
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  assert.match(html, /id="cc-live-summary"|class="cc-live-summary"/);
  assert.match(html, /id="cc-live-receitas"/);
  assert.match(html, /id="cc-live-descontos"/);
  assert.match(html, /id="cc-live-liquido"/);
  assert.ok(!html.includes('Atualizar demonstrativo do contracheque'));
  assert.match(app, /atualizarResumoTopo\(totalCreditos,totalDescontos,liquido,margem\)/);
  assert.match(app, /Atualiza também o demonstrativo detalhado automaticamente/);
});

test('remoção de receita ou desconto recalcula imediatamente a prévia', () => {
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  assert.match(app, /closest\('.calc-row'\)\?\.remove\(\);atualizarSubtotaisExtras\(\);atualizarDescontosPreview\?\.\(\)/);
});


test('recalcula o demonstrativo automaticamente sem deslocar a rolagem durante a digitação', () => {
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  assert.match(app, /const show=\(h,scroll=true\)=>/);
  assert.match(app, /show\(h,false\);const printBtn/);
  assert.match(app, /atualizarDescontosPreview\(\);[\s\S]*?FN\.contracheque\(\)/);
});


test('margem consignável aplica fórmula CPEx e admite resultado negativo', () => {
  const r = core.calcularMargemConsignavel({ rendimentosPermanentes: 9000, soldo: 5200, descontosObrigatorios: 1500, descontosAutorizados: 800 });
  assert.equal(r.limite, 6300);
  assert.equal(r.reserva, 520);
  assert.equal(r.disponivel, 3480);
  const negativa = core.calcularMargemConsignavel({ rendimentosPermanentes: 5000, soldo: 5200, descontosObrigatorios: 3000, descontosAutorizados: 1000 });
  assert.equal(negativa.disponivel, -1020);
});

test('resumo superior possui quatro indicadores, incluindo margem consignável', () => {
  assert.match(html, /id="cc-live-margem"/);
  assert.match(html, /Total de receitas/);
  assert.match(html, /Total de descontos/);
  assert.match(html, /Remuneração líquida estimada/);
  assert.match(fs.readFileSync(path.join(root, 'style.css'), 'utf8'), /grid-template-columns:repeat\(4,minmax\(0,1fr\)\)/);
});

test('PDF usa impressão do navegador e mantém resumo e demonstrativo na versão impressa', () => {
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
  assert.match(app, /window\.print\(\)/);
  assert.match(app, /Baixar simulação em PDF/);
  assert.match(css, /@media print/);
  assert.match(css, /#res\{display:block!important\}/);
});

test('lançamentos extras podem ser classificados como rendimentos permanentes para margem', () => {
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  assert.match(app, /data-row-margin/);
  assert.match(app, /margemPermanente/);
  assert.match(profile, /margemPermanente/);
});


test('perfil compartilhado é salvo mesmo quando o usuário navega sem alterar os padrões iniciais', () => {
  assert.match(profile, /Cria o perfil inicial mesmo se o usuário apenas abrir o simulador/);
  assert.match(profile, /save\(\);/);
});

test('ferramentas remuneratórias importam posto e parâmetros do perfil compartilhado', () => {
  assert.match(profile, /Dados do contracheque importados/);
  assert.match(profile, /setValue\('co-posto', existing\['co-posto'\] \|\| posto\.id\)/);
  assert.match(profile, /setValue\('circ', circleIndex\)/);
  assert.match(profile, /core\?\.comp\?\.\(posto, opts\)\?\.total/);
});

test('ajuda de custo e movimentação aceitam compensação orgânica de 1% a 20% e posto de referência', () => {
  for (const file of ['ajuda-custo-cursos.html','movimentacao.html']) {
    const source = fs.readFileSync(path.join(root, file), 'utf8');
    for (let n = 1; n <= 20; n++) assert.match(source, new RegExp(`<option value="${n}">${n}%</option>`));
    assert.match(source, /id="co-posto"/);
  }
});

test('ferramentas sem parâmetros remuneratórios continuam independentes', () => {
  assert.match(profile, /Esta ferramenta não utiliza dados remuneratórios do contracheque/);
  for (const file of ['calculadora-imc.html','calculadora-taf.html','juros-compostos.html','auxilio-alimentacao.html']) {
    const source = fs.readFileSync(path.join(root, file), 'utf8');
    assert.match(source, /form class="calc"/);
  }
});

test('integração respeita os campos “não faço jus” ao importar percentuais', () => {
  assert.match(profile, /existing\['ats-nao'\] \? 0/);
  assert.match(profile, /existing\['co-nao'\] \? 0/);
  assert.match(profile, /existing\['pm-nao'\] \? 0/);
  assert.match(profile, /existing\['gle-nao'\] \? 0/);
});

test('ATS nas calculadoras de ajuda de custo usa percentual reconhecido, compatível com o perfil', () => {
  for (const file of ['ajuda-custo-cursos.html','movimentacao.html']) {
    const source = fs.readFileSync(path.join(root, file), 'utf8');
    assert.match(source, /Percentual de ATS reconhecido até 29\/12\/2000/);
  }
});


test('resultados possuem hierarquia visual e ação para retornar ao formulário', () => {
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
  assert.match(app, /Resultado da simulação/);
  assert.match(app, /Alterar dados e simular novamente/);
  assert.match(app, /focus\(\{preventScroll:true\}\)/);
  assert.match(css, /\.res-ready \.big/);
  assert.match(css, /\.res-ready \.tbl tr\.tot/);
});

test('TAF exige todas as provas obrigatórias antes de informar suficiência global', () => {
  const taf = fs.readFileSync(path.join(root, 'taf.js'), 'utf8');
  assert.match(taf, /const faltantes=\[\]/);
  assert.match(taf, /if\(faltantes\.length\)return saida/);
  assert.match(taf, /Preencha todas as provas obrigatórias para calcular a suficiência global/);
  assert.match(taf, /ok\.length===prov\.length\+\(exigePPM\?1:0\)/);
});

test('TAF valida resultados numéricos não negativos e exige PPM quando selecionado', () => {
  const taf = fs.readFileSync(path.join(root, 'taf.js'), 'utf8');
  assert.match(taf, /!Number\.isFinite\(valor\)\|\|valor<0/);
  assert.match(taf, /if\(raw===''\)faltantes\.push\('Pista de obstáculos \(PPM\)'\)/);
});


test('validação de entradas: transporte rejeita valores negativos, dias fracionados e tarifa ausente', () => {
  const validar = core.validarParametrosFerramenta;
  assert.equal(validar('transporte', { ida: '5,50', volta: '5,50', dias: '22', soldoc: '' }), '');
  assert.match(validar('transporte', { ida: '-1', volta: '5', dias: '22', soldoc: '' }), /mínimo/);
  assert.match(validar('transporte', { ida: '5', volta: '5', dias: '22.5', soldoc: '' }), /inteiro/);
  assert.match(validar('transporte', { ida: '', volta: '5', dias: '22', soldoc: '' }), /tarifa de ida/);
});

test('validação de entradas: alimentação exige etapa positiva e quantidades inteiras não negativas', () => {
  const validar = core.validarParametrosFerramenta;
  assert.equal(validar('alimentacao', { etapa: '13,50', n24: '2', n8: '1', n1: '0' }), '');
  assert.match(validar('alimentacao', { etapa: '0', n24: '0', n8: '0', n1: '0' }), /mínimo/);
  assert.match(validar('alimentacao', { etapa: '13.5', n24: '-1', n8: '0', n1: '0' }), /mínimo/);
  assert.match(validar('alimentacao', { etapa: '13.5', n24: '1.5', n8: '0', n1: '0' }), /inteiro/);
});

test('validação de entradas: diárias aceita zero ou mais dias inteiros e rejeita frações e acréscimos negativos', () => {
  const validar = core.validarParametrosFerramenta;
  assert.equal(validar('diarias', { diasIntegrais: '2', meiasDiarias: '1', acr: '1', acrv: '95' }), '');
  assert.equal(validar('diarias', { diasIntegrais: '0', meiasDiarias: '0', acr: '0', acrv: '95' }), '');
  assert.match(validar('diarias', { diasIntegrais: '2.5', meiasDiarias: '0', acr: '1', acrv: '95' }), /inteiro/);
  assert.match(validar('diarias', { diasIntegrais: '2', meiasDiarias: '0', acr: '-1', acrv: '95' }), /mínimo/);
});

test('validação de entradas: gratificação limita dias de comando a 30 e rejeita dias fracionados', () => {
  const validar = core.validarParametrosFerramenta;
  assert.equal(validar('gr', { dcmd: '30', dev: '0' }), '');
  assert.match(validar('gr', { dcmd: '31', dev: '0' }), /máximo/);
  assert.match(validar('gr', { dcmd: '10.5', dev: '0' }), /inteiro/);
  assert.match(validar('gr', { dcmd: '0', dev: '-1' }), /mínimo/);
});

test('validação de entradas: pensão aceita percentual de 0 a 100 e rejeita limites inválidos', () => {
  const validar = core.validarParametrosFerramenta;
  assert.equal(validar('pensao', { base: '2500,00', perc: '30' }), '');
  assert.match(validar('pensao', { base: '-1', perc: '30' }), /mínimo/);
  assert.match(validar('pensao', { base: '2500', perc: '100.01' }), /máximo/);
  assert.match(validar('pensao', { base: '2500', perc: 'abc' }), /número válido/);
});

test('pensão alimentícia: permite simular percentual sobre base judicial informada', () => {
  const core = loadCore();
  const r = core.calcularPensaoAlimenticia({ tipo: 'percentual', base: '2500', percentual: '30' });
  assert.equal(r.valor, 750);
  assert.equal(r.base, 2500);
  assert.equal(core.validarParametrosFerramenta('pensao', { tipo: 'percentual', base: '2500', perc: '30' }), '');
});

test('pensão alimentícia: permite valor mensal fixo e arredonda em centavos', () => {
  const core = loadCore();
  const r = core.calcularPensaoAlimenticia({ tipo: 'fixo', valorFixo: '1234,567' });
  assert.equal(r.valor, 1234.57);
  assert.equal(core.validarParametrosFerramenta('pensao', { tipo: 'fixo', base: '', perc: '', valorFixo: '1234,50' }), '');
  assert.match(core.validarParametrosFerramenta('pensao', { tipo: 'fixo', base: '', perc: '', valorFixo: '-1' }), /mínimo/);
  assert.match(core.validarParametrosFerramenta('pensao', { tipo: 'fixo', base: '', perc: '', valorFixo: 'abc' }), /número válido/);
});

test('pensão alimentícia: documenta que base e incidências vêm do título e que o limite de 50% é contextual', () => {
  const page = fs.readFileSync(path.join(root, 'pensao-alimenticia.html'), 'utf8');
  assert.match(page, /CPC, art\. 529/);
  assert.match(page, /Não existe uma base percentual universal/);
  assert.match(page, /não é aplicado aqui como teto geral/);
  assert.match(page, /Valor mensal fixo/);
});



test('auxílio-transporte: cálculo detalha custo diário, dias considerados e cota-parte sem decidir elegibilidade', () => {
  const r = core.calcularAuxilioTransporte(6, 6, 22, 5209);
  assert.equal(r.despesaDiaria, 12);
  assert.equal(r.despesaMensal, 264);
  assert.equal(r.cotaParte, 229.196);
  assert.equal(r.estimativa, 34.804);
  const parcial = core.calcularAuxilioTransporte(6, 6, 20, 5209);
  assert.equal(parcial.despesaMensal, 240);
  assert.equal(parcial.cotaParte, 229.196);
  assert.equal(core.calcularAuxilioTransporte(1, 1, 0, 5209).estimativa, 0);
});

test('auxílio-transporte: interface esclarece menor custo, transporte da União e não faz declaração automática de direito', () => {
  const page = fs.readFileSync(path.join(root, 'auxilio-transporte.html'), 'utf8');
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  assert.match(page, /percurso de menor custo/);
  assert.match(page, /transporte custeado pela União/);
  assert.match(app, /não substitui a análise administrativa/);
  assert.doesNotMatch(app, /Sem direito ao benefício/);
});

test('auxílio-alimentação: aplica etapa comum, multiplicadores e arredondamento em centavos', () => {
  const r = core.calcularAuxilioAlimentacao(13.5, 1, 2, 3);
  assert.equal(r.valor24, 135);
  assert.equal(r.valor8a24, 135);
  assert.equal(r.valorOutras, 40.5);
  assert.equal(r.total, 310.5);
  assert.equal(r.diasArt67, 3);
});

test('auxílio-alimentação: valida limite conjunto de 10 dias nas hipóteses do art. 67', () => {
  const validar = core.validarParametrosFerramenta;
  assert.equal(validar('alimentacao', { etapa: '13,50', n24: '6', n8: '4', n1: '0' }), '');
  assert.match(validar('alimentacao', { etapa: '13,50', n24: '6', n8: '5', n1: '0' }), /não pode ultrapassar 10 dias/);
  assert.match(validar('alimentacao', { etapa: '13,50', n24: '11', n8: '0', n1: '0' }), /máximo/);
});

test('auxílio-alimentação: outras situações limitadas a 30 dias e quantidades inteiras', () => {
  const validar = core.validarParametrosFerramenta;
  assert.equal(validar('alimentacao', { etapa: '13.50', n24: '0', n8: '0', n1: '30' }), '');
  assert.match(validar('alimentacao', { etapa: '13.50', n24: '0', n8: '0', n1: '31' }), /máximo/);
  assert.match(validar('alimentacao', { etapa: '13.50', n24: '0', n8: '0', n1: '2.5' }), /inteiro/);
});

test('auxílio-alimentação: interface informa limite legal e ressalva que não verifica arranchamento ou datas', () => {
  const page = fs.readFileSync(path.join(root, 'auxilio-alimentacao.html'), 'utf8');
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  assert.match(page, /limite conjunto de 10 dias/);
  assert.match(page, /Decreto nº 4\.307\/2002, arts\. 65 a 75/);
  assert.match(app, /o art\. 75 prevê prevalência da hipótese mais benéfica/);
  assert.match(app, /não verifica arranchamento/);
});
