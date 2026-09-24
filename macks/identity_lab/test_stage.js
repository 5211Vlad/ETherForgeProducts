'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const old=require('./identity'),safe=require('./identity_hardened'),delta=require('./diff'),contact=require('./contact_preflight');
const data=rows=>({info:{headers:['id','value']},rows});
const client=(id,first_name,last_name,phone,email,quote_status='open')=>({id,first_name,last_name,phone,email,quote_status});
const ava=client('c01','Ava','Rivera','555-010-1001','ava@example.test');
test('donor bug __proto__ reproduces: OK but record lost',()=>{
 const r=old.resolveByKey(data([{id:'__proto__',value:'a'}]),data([{id:'__proto__',value:'b'}]),'id');
 assert.equal(r.status,'OK');assert.equal(r.matched_keys.length,0);
});
test('donor bug mixed type reproduces: two become one',()=>{
 const r=old.resolveByKey(data([{id:1,value:'a'},{id:'1',value:'b'}]),data([]),'id');
 assert.equal(r.status,'OK');assert.equal(Object.keys(r.before_by_key).length,1);
});
for(const key of ['__proto__','constructor','toString','hasOwnProperty'])test('fork retains '+key,()=>{
 const b=data([{id:key,value:'a'}]),a=data([{id:key,value:'b'}]),r=safe.resolveByKey(b,a,'id');
 assert.equal(r.status,'OK');assert.equal(Object.getPrototypeOf(r.before_by_key),null);
 assert.equal(delta.summary(delta.compareResolved(b,a,r)).modified_fields,1);
});
test('mixed type blocked before diff',()=>{
 const b=data([{id:1,value:'a'},{id:'1',value:'b'}]),a=data([]),r=safe.resolveByKey(b,a,'id');
 assert.equal(r.status,'AMBIGUOUS_KEY');assert.throws(()=>delta.compareResolved(b,a,r),/must be OK/);
});
test('blank and whitespace keys blocked',()=>{
 for(const id of ['', '  ',undefined,null])assert.equal(safe.resolveByKey(data([{id,value:'a'}]),data([]),'id').status,'AMBIGUOUS_KEY');
});
test('duplicate keys blocked',()=>{
 assert.equal(safe.resolveByKey(data([{id:'a'},{id:'a'}]),data([]),'id').status,'AMBIGUOUS_KEY');
});
test('bad headers and inherited key blocked',()=>{
 assert.throws(()=>safe.resolveByKey({info:{headers:['id','id']},rows:[]},data([]),'id'));
 const inherited=Object.create({id:'ghost'});inherited.value='x';
 assert.equal(safe.resolveByKey(data([inherited]),data([]),'id').status,'AMBIGUOUS_KEY');
});
test('business candidate is review only with no raw contact fields returned',()=>{
 const out=contact.inspectContacts([ava],[client('new','Ava','Rivera','555-010-1001','ava@example.test')]);
 assert.equal(out.inspections[0].status,'POSSIBLE_DUPLICATE_REVIEW');assert.equal(out.writes,0);
 assert.doesNotMatch(JSON.stringify(out),/ava@example|555-010/);
});
test('two possible customers and shared phone hold',()=>{
 const another=client('c02','Ava','Rivera','555-010-1001','other@example.test');
 const twice=contact.inspectContacts([ava,another],[client('new','Ava','Rivera','555-010-1001','ava@example.test')]);
 assert.equal(twice.inspections[0].status,'MULTIPLE_CANDIDATES_HOLD');
 const shared=contact.inspectContacts([ava],[client('new','Other','Person','555-010-1001','other@example.test')]);
 assert.equal(shared.inspections[0].status,'SHARED_CONTACT_CONFLICT_HOLD');
});
test('stable ID only yields nonmutating summary',()=>{
 const out=contact.compareStableIds([ava],[{...ava,quote_status:'sent'}]);
 assert.equal(out.status,'DESCRIPTIVE_DIFF_ONLY');assert.equal(out.summary.modified_records,1);
 assert.equal(out.writes,0);assert.doesNotMatch(JSON.stringify(out),/ava@example/);
});
test('duplicate IDs block descriptive comparison',()=>{
 assert.equal(contact.compareStableIds([ava,ava],[ava]).status,'IDENTITY_HOLD');
});
test('fictional inventory IDs are a distinct domain smoke fixture',()=>{
 const b=data([{id:'__proto__',value:'stock3'},{id:'SKU1',value:'stock4'}]);
 const a=data([{id:'SKU1',value:'stock4'},{id:'__proto__',value:'stock5'}]);
 assert.equal(delta.summary(delta.compareResolved(b,a,safe.resolveByKey(b,a,'id'))).modified_records,1);
});
test('300 deterministic reorder trials retain keys and show no changes',()=>{
 let seed=91273;const rand=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
 for(let n=0;n<300;n++){
  const size=1+Math.floor(rand()*18),b=Array.from({length:size},(_,i)=>({id:i===0?'__proto__':'x'+i,value:String(i)}));
  const a=b.slice().reverse().map(x=>({...x})),r=safe.resolveByKey(data(b),data(a),'id');
  assert.equal(r.matched_keys.length,size);
  assert.equal(delta.summary(delta.compareResolved(data(b),data(a),r)).changed,false);
 }
});
