'use strict';
const MODULE_ID='MM-DAT-003'; const VERSION='0.2.0';
class DiffError extends Error { constructor(message){super(`ERR_DIFF_INPUT: ${message}`);this.name='DiffError';} }
function validateDataset(d,label){if(!d||!d.info||!Array.isArray(d.info.headers)||!Array.isArray(d.rows)) throw new DiffError(`${label} must contain info.headers and rows`);}
function unionHeaders(a,b){return [...new Set([...a.headers,...b.headers])].sort();}
function compareResolved(before,after,resolution){
  validateDataset(before,'BEFORE'); validateDataset(after,'AFTER');
  if(!resolution||resolution.status!=='OK') throw new DiffError('resolution must be OK; Diff Engine does not invent ambiguous identities');
  const key=resolution.key;
  const result={schema:'MACKS-DIFF-R1',module_id:MODULE_ID,module_version:VERSION,status:'OK',mode:'RESOLVED_KEYED',key,
    added_columns:after.info.headers.filter(h=>!before.info.headers.includes(h)).sort(),
    removed_columns:before.info.headers.filter(h=>!after.info.headers.includes(h)).sort(),
    added_rows:resolution.added_keys.map(k=>resolution.after_by_key[k]),
    removed_rows:resolution.removed_keys.map(k=>resolution.before_by_key[k]),modified_fields:[],notes:[]};
  const fields=before.info.headers.filter(h=>after.info.headers.includes(h)&&h!==key).sort();
  for(const k of [...resolution.matched_keys].sort()) for(const field of fields){
    const bv=resolution.before_by_key[k][field], av=resolution.after_by_key[k][field];
    if(bv!==av) result.modified_fields.push({key:k,field,before:bv,after:av});
  }
  return result;
}
function rowSig(row,headers){return JSON.stringify(headers.map(h=>Object.prototype.hasOwnProperty.call(row,h)?row[h]:''));}
function rowFromSig(sig,headers){const vals=JSON.parse(sig),row={};headers.forEach((h,i)=>row[h]=vals[i]);return row;}
function count(rows,headers){const m=new Map();for(const r of rows){const s=rowSig(r,headers);m.set(s,(m.get(s)||0)+1);}return m;}
function compareExact(before,after){
  validateDataset(before,'BEFORE');validateDataset(after,'AFTER');
  const headers=unionHeaders(before.info,after.info),cb=count(before.rows,headers),ca=count(after.rows,headers);
  const result={schema:'MACKS-DIFF-R1',module_id:MODULE_ID,module_version:VERSION,status:'OK',mode:'EXACT_ROWS',key:null,
    added_columns:after.info.headers.filter(h=>!before.info.headers.includes(h)).sort(),removed_columns:before.info.headers.filter(h=>!after.info.headers.includes(h)).sort(),added_rows:[],removed_rows:[],modified_fields:[],notes:['Exact-row mode does not infer record identity; modified records are not claimed.']};
  for(const sig of [...new Set([...cb.keys(),...ca.keys()])].sort()){
    const delta=(ca.get(sig)||0)-(cb.get(sig)||0);
    if(delta>0) for(let i=0;i<delta;i++) result.added_rows.push(rowFromSig(sig,headers));
    if(delta<0) for(let i=0;i<-delta;i++) result.removed_rows.push(rowFromSig(sig,headers));
  }
  return result;
}
function summary(r){return {added_columns:r.added_columns.length,removed_columns:r.removed_columns.length,added_rows:r.added_rows.length,removed_rows:r.removed_rows.length,modified_records:new Set(r.modified_fields.map(m=>m.key)).size,modified_fields:r.modified_fields.length,changed:!!(r.added_columns.length||r.removed_columns.length||r.added_rows.length||r.removed_rows.length||r.modified_fields.length)};}
module.exports={MODULE_ID,VERSION,DiffError,compareResolved,compareExact,summary};
