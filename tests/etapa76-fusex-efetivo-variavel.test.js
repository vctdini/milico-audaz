const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');

test('FuSEx is automatically exempted for the non-engaged soldier/recruit profile', () => {
  assert.match(source, /function isentoFusexPorEnquadramento\(p\)\{return p\?\.id==='sd_rec'\}/);
  assert.match(source, /const fusexIsento=C\('fusex-nao'\)\|\|isentoFusexPorEnquadramento\(f\.p\)/);
});

test('FuSEx exemption suppresses standard contribution, complementary quota and IR deductions', () => {
  assert.match(source, /quotaPercent=fusexIsento\?0:/);
  assert.match(source, /fusexNao:fusexIsento/);
  assert.match(source, /fusex:fusexIsento\?0:fusex,quota:fusexIsento\?0:quota/);
});

test('Engaged soldier profile is not included in the automatic exemption list', () => {
  assert.match(source, /function isentoFusexPorEnquadramento\(p\)\{return p\?\.id==='sd_rec'\}/);
  assert.doesNotMatch(source.match(/function isentoFusexPorEnquadramento[^\n]+/)[0], /sd_eng|sd_esp|cabo_n|cabo_e/);
});
