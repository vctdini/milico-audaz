'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { URL } = require('node:url');
const root = path.resolve(__dirname, '..');
const pages = fs.readdirSync(root).filter(name => name.endsWith('.html'));

function attributes(markup) {
  const attrs = [];
  const tagRe = /<([a-z][\w:-]*)\b([^>]*)>/gi;
  let tag;
  while ((tag = tagRe.exec(markup))) {
    const values = {};
    const attrRe = /(?:^|\s)([\w:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
    let attr;
    while ((attr = attrRe.exec(tag[2]))) values[attr[1].toLowerCase()] = attr[2] ?? attr[3] ?? attr[4] ?? '';
    attrs.push({ name: tag[1].toLowerCase(), values });
  }
  return attrs;
}
function decode(value) {
  return value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}
function pageInfo(file) {
  const markup = fs.readFileSync(path.join(root, file), 'utf8');
  const tags = attributes(markup);
  return { markup, tags, ids: new Set(tags.filter(t => 'id' in t.values).map(t => t.values.id)) };
}

test('links e recursos locais das páginas apontam para arquivos existentes', () => {
  for (const page of pages) {
    const { tags } = pageInfo(page);
    for (const { values } of tags) {
      for (const attr of ['href', 'src']) {
        if (!(attr in values)) continue;
        const value = decode(values[attr]).trim();
        if (!value || /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(value) || value.startsWith('#')) continue;
        const parsed = new URL(value, 'https://milico-audaz.invalid/' + page);
        if (parsed.origin !== 'https://milico-audaz.invalid') continue;
        const relative = decodeURIComponent(parsed.pathname).replace(/^\//, '');
        const target = path.resolve(root, relative || '.');
        assert.ok(target === root || target.startsWith(root + path.sep), `${page}: caminho sai da pasta do projeto: ${value}`);
        assert.ok(fs.existsSync(target), `${page}: arquivo local não encontrado: ${value}`);
      }
    }
  }
});

test('âncoras internas e âncoras para outras páginas existem', () => {
  for (const page of pages) {
    const { tags, ids } = pageInfo(page);
    for (const { values } of tags) {
      if (!('href' in values)) continue;
      const value = decode(values.href).trim();
      if (!value.includes('#')) continue;
      const parsed = new URL(value, 'https://milico-audaz.invalid/' + page);
      if (parsed.origin !== 'https://milico-audaz.invalid' || !parsed.hash) continue;
      const targetName = decodeURIComponent(parsed.pathname).replace(/^\//, '') || page;
      const target = path.resolve(root, targetName);
      if (path.extname(target) !== '.html') continue;
      const targetPage = path.relative(root, target);
      const targetIds = targetPage === page ? ids : pageInfo(targetPage).ids;
      assert.ok(targetIds.has(decodeURIComponent(parsed.hash.slice(1))), `${page}: âncora não encontrada: ${value}`);
    }
  }
});

test('identificadores HTML são únicos em cada página', () => {
  for (const page of pages) {
    const { tags } = pageInfo(page);
    const ids = tags.filter(t => 'id' in t.values).map(t => t.values.id);
    assert.equal(ids.length, new Set(ids).size, `${page}: existem IDs duplicados`);
  }
});

test('arquivos pré-carregados pelo Service Worker existem', () => {
  const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
  const match = sw.match(/const\s+ARQ\s*=\s*(\[[\s\S]*?\])/);
  assert.ok(match, 'lista ARQ não encontrada no Service Worker');
  const files = Function(`"use strict"; return (${match[1]});`)();
  for (const file of files) {
    const clean = file.replace(/^\.\//, '');
    assert.ok(fs.existsSync(path.join(root, clean)), `Service Worker referencia arquivo inexistente: ${file}`);
  }
});
