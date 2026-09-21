'use strict';
// INTERNAL R5 FORK of EtherForge-owned MM-DAT-002 R1. Original file remains unchanged.
// Not the canonical module, a retail release, or a CRM integration.
const MODULE_ID='MM-DAT-002';
const VERSION='0.1.1-lab';
class IdentityError extends Error {
  constructor(message) { super(`ERR_IDENTITY_INPUT: ${message}`); this.name='IdentityError'; }
}
const own=(obj,key)=>Object.prototype.hasOwnProperty.call(obj,key);
function validate(dataset,label,key) {
  if (!dataset || typeof dataset!=='object' || !dataset.info ||
      !Array.isArray(dataset.info.headers) || !Array.isArray(dataset.rows))
    throw new IdentityError(`${label} must contain info.headers and rows`);
  if (typeof key!=='string' || !key.trim()) throw new IdentityError('key must be a nonblank string');
  if (dataset.info.headers.some(h=>typeof h!=='string') ||
      new Set(dataset.info.headers).size!==dataset.info.headers.length)
    throw new IdentityError(`${label} headers must be unique strings`);
  if (!dataset.info.headers.includes(key)) throw new IdentityError(`${label} missing key column: ${key}`);
}
function indexOne(dataset,key,source) {
  validate(dataset,source,key);
  const positions=new Map(), issues=[];
  dataset.rows.forEach((row,index)=>{
    if(!row || typeof row!=='object' || Array.isArray(row))
      throw new IdentityError(`${source} row ${index+1} must be an object`);
    const v=own(row,key)?row[key]:undefined;
    if(typeof v!=='string') {
      issues.push({source,kind:v==null?'BLANK_KEY':'INVALID_KEY_TYPE',key_value:'',row_numbers:[index+1]});
      return;
    }
    if(!v.trim()) {
      issues.push({source,kind:'BLANK_KEY',key_value:'',row_numbers:[index+1]});
      return;
    }
    if(!positions.has(v)) positions.set(v,[]);
    positions.get(v).push(index);
  });
  for(const [v,indexes] of positions) {
    if(indexes.length>1)
      issues.push({source,kind:'DUPLICATE_KEY',key_value:v,row_numbers:indexes.map(i=>i+1)});
  }
  issues.sort((a,b)=>JSON.stringify(a)<JSON.stringify(b)?-1:JSON.stringify(a)>JSON.stringify(b)?1:0);
  const byKey=Object.create(null); // protect __proto__, constructor, toString
  for(const [v,indexes] of positions) if(indexes.length===1) byKey[v]=dataset.rows[indexes[0]];
  return {byKey,issues};
}
function resolveByKey(before,after,key) {
  const b=indexOne(before,key,'BEFORE'),a=indexOne(after,key,'AFTER');
  const key_issues=[...b.issues,...a.issues];
  if(key_issues.length) return {schema:'MACKS-IDENTITY-R0',module_id:MODULE_ID,
    module_version:VERSION,status:'AMBIGUOUS_KEY',key,key_issues,
    matched_keys:[],added_keys:[],removed_keys:[],before_by_key:b.byKey,after_by_key:a.byKey};
  const bk=Object.keys(b.byKey).sort(),ak=Object.keys(a.byKey).sort();
  const bs=new Set(bk),as=new Set(ak);
  return {schema:'MACKS-IDENTITY-R0',module_id:MODULE_ID,
    module_version:VERSION,status:'OK',key,key_issues:[],
    matched_keys:bk.filter(k=>as.has(k)),added_keys:ak.filter(k=>!bs.has(k)),
    removed_keys:bk.filter(k=>!as.has(k)),before_by_key:b.byKey,after_by_key:a.byKey};
}
module.exports={MODULE_ID,VERSION,IdentityError,resolveByKey};
