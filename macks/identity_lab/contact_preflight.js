'use strict';
// Synthetic contact identity REVIEW FIXTURE, not a vendor's actual matching algorithm.
// No merges, updates, network, external dependencies, or persisted lead data.
const {resolveByKey}=require('./identity_hardened');
const {compareResolved,summary}=require('./diff');
class PreflightError extends Error { constructor(m){super(`ERR_PREFLIGHT: ${m}`);this.name='PreflightError';} }
function token(v){return typeof v==='string'?v.trim().toLocaleLowerCase('en-US'):'';}
function phone(v){const d=typeof v==='string'?v.replace(/\D/g,''):'';return d.length>=7&&d.length<=15?d:'';}
function email(v){const s=token(v);return /^\S+@\S+\.\S+$/.test(s)?s:'';}
function validate(records,label){
  if(!Array.isArray(records)||records.some(r=>!r||typeof r!=='object'||Array.isArray(r)))
    throw new PreflightError(`${label} must be an array of plain record-like objects`);
}
function signals(a,b){
 const an=token(a.first_name)+'|'+token(a.last_name),bn=token(b.first_name)+'|'+token(b.last_name);
 const named=!!token(a.first_name)&&!!token(a.last_name)&&an===bn;
 const ep=email(a.email),eq=email(b.email),pp=phone(a.phone),pq=phone(b.phone);
 return {sameName:named,sameEmail:!!ep&&ep===eq,samePhone:!!pp&&pp===pq};
}
function inspectContacts(existing,incoming){
 validate(existing,'existing');validate(incoming,'incoming');
 const result=[];
 for(let i=0;i<incoming.length;i++){
   const lead=incoming[i],hits=[];
   for(let j=0;j<existing.length;j++) {
     const old=existing[j],s=signals(lead,old);
     const stable=typeof lead.id==='string'&&!!lead.id.trim()&&typeof old.id==='string'&&lead.id===old.id;
     if(stable||s.sameEmail||s.samePhone||s.sameName)
       hits.push({existing_row:j+1,stable_id_match:stable,...s});
   }
   let status='NO_MATCH_FOUND_NOT_PROOF',reasons=['No candidate found under this synthetic heuristic; not proof the person is new.'];
   const sameId=hits.filter(h=>h.stable_id_match);
   const strong=hits.filter(h=>h.sameEmail||h.samePhone);
   if(hits.length>1||sameId.length>1){status='MULTIPLE_CANDIDATES_HOLD';reasons=['Multiple plausible existing records; manual review required.'];}
   else if(sameId.length===1){
     status='STABLE_ID_REVIEW';reasons=['Unique declared stable ID matches; this is a read-only finding, not merge permission.'];
     const s=sameId[0];
     if(!s.sameName && (token(lead.first_name)||token(lead.last_name))) {
       status='STABLE_ID_NAME_CONFLICT_HOLD';reasons=['Stable ID matches but first/last name differs.'];
     }
   } else if(strong.length===1) {
     status=strong[0].sameName?'POSSIBLE_DUPLICATE_REVIEW':'SHARED_CONTACT_CONFLICT_HOLD';
     reasons=[strong[0].sameName?'Name and contact signal agree, but no stable ID matches.':'Phone or email agrees while the full name does not; shared contact details are possible.'];
   } else if(hits.length===1){status='NAME_ONLY_REVIEW';reasons=['Name alone is not a safe identifier.'];}
   if(!email(lead.email)&&!phone(lead.phone)&&!sameId.length){
     status='INSUFFICIENT_CONTACT_REVIEW';reasons=['No valid phone or email signal; cannot establish identity.'];
   }
   result.push({incoming_row:i+1,status,existing_rows:hits.map(h=>h.existing_row),
     signal_codes:hits.map(h=>({existing_row:h.existing_row,stable_id_match:h.stable_id_match,
       same_name:h.sameName,same_email:h.sameEmail,same_phone:h.samePhone})),reasons,write_authorized:false});
 }
 return {schema:'MACKS-CONTACT-PREFLIGHT-LAB-R5',status:'READ_ONLY',
   source:'synthetic first/last/phone/email similarity heuristic; NOT Jobber behavior',
   inspections:result,writes:0,merge_decisions:0};
}
function compareStableIds(before,after){
 const columns=['id','first_name','last_name','phone','email','quote_status'];
 const dataset=(rows)=>({info:{headers:columns},rows});
 const b=dataset(before),a=dataset(after),resolution=resolveByKey(b,a,'id');
 if(resolution.status!=='OK')
   return {status:'IDENTITY_HOLD',issues:resolution.key_issues.map(i=>({source:i.source,kind:i.kind,row_numbers:i.row_numbers})),diff:null};
 const change=compareResolved(b,a,resolution);
 return {status:'DESCRIPTIVE_DIFF_ONLY',identity_status:resolution.status,
   summary:summary(change),writes:0,merge_decisions:0};
}
module.exports={inspectContacts,compareStableIds,PreflightError};
