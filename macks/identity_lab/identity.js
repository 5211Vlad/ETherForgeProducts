'use strict';
const MODULE_ID='MM-DAT-002'; const VERSION='0.1.0';
class IdentityError extends Error { constructor(message){super(`ERR_IDENTITY_INPUT: ${message}`);this.name='IdentityError';} }
function validate(dataset,label){
  if(!dataset||!dataset.info||!Array.isArray(dataset.info.headers)||!Array.isArray(dataset.rows)) throw new IdentityError(`${label} must contain info.headers and rows`);
}
function indexOne(dataset,key,source){
  validate(dataset,source);
  if(!dataset.info.headers.includes(key)) throw new IdentityError(`${source} missing key column: ${key}`);
  const positions=new Map();
  dataset.rows.forEach((row,idx)=>{const v=row[key]; if(!positions.has(v)) positions.set(v,[]); positions.get(v).push(idx);});
  const issues=[];
  for(const [v,idxs] of positions.entries()){
    if(v===''||v===null||v===undefined) issues.push({source,kind:'BLANK_KEY',key_value:v??'',row_numbers:idxs.map(i=>i+1)});
    else if(idxs.length>1) issues.push({source,kind:'DUPLICATE_KEY',key_value:String(v),row_numbers:idxs.map(i=>i+1)});
  }
  issues.sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b)));
  const byKey={};
  for(const row of dataset.rows){const v=row[key]; if(v!==''&&v!==null&&v!==undefined&&positions.get(v).length===1) byKey[String(v)]=row;}
  return {byKey,issues};
}
function resolveByKey(before,after,key){
  const b=indexOne(before,key,'BEFORE'), a=indexOne(after,key,'AFTER');
  const key_issues=[...b.issues,...a.issues];
  if(key_issues.length) return {schema:'MACKS-IDENTITY-R0',module_id:MODULE_ID,module_version:VERSION,status:'AMBIGUOUS_KEY',key,key_issues,matched_keys:[],added_keys:[],removed_keys:[],before_by_key:b.byKey,after_by_key:a.byKey};
  const bk=Object.keys(b.byKey).sort(), ak=Object.keys(a.byKey).sort(), bs=new Set(bk), as=new Set(ak);
  return {schema:'MACKS-IDENTITY-R0',module_id:MODULE_ID,module_version:VERSION,status:'OK',key,key_issues:[],matched_keys:bk.filter(k=>as.has(k)),added_keys:ak.filter(k=>!bs.has(k)),removed_keys:bk.filter(k=>!as.has(k)),before_by_key:b.byKey,after_by_key:a.byKey};
}
module.exports={MODULE_ID,VERSION,IdentityError,resolveByKey};
