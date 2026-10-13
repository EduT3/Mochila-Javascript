const test = require('node:test');
const assert = require('node:assert/strict');
const { context, element } = require('./dom.cjs');

test('invalid storage recovers; input is rendered as text and quantities update', () => {
 const t = context({ localStorage: { getItem: () => '{broken', setItem() {} } });
 const form = t.get('novoItem'); form.elements = { nome: element(), quantidade: element() };
 t.load('js/main.js'); assert.match(t.get('status').textContent, /carregar/);
 form.elements.nome.value = '<img onerror=alert(1)>'; form.elements.quantidade.value = '2';
 form.events.submit({ preventDefault() {} });
 assert.equal(t.get('lista').children.length, 1);
 assert.equal(t.get('lista').children[0].children[1].textContent, '<img onerror=alert(1)>');
 form.elements.quantidade.value = '3'; form.events.submit({ preventDefault() {} });
 assert.equal(t.get('lista').children.length, 1); assert.equal(t.get('lista').children[0].children[0].textContent, 3);
 form.elements.quantidade.value = '-1'; form.events.submit({ preventDefault() {} });
 assert.equal(t.get('lista').children[0].children[0].textContent, 3);
 t.get('lista').children[0].children[2].events.click(); assert.equal(t.get('lista').children.length, 0);
});
