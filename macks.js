(function(){
  document.addEventListener('DOMContentLoaded',()=>{
    const params=new URLSearchParams(location.search);
    const returned=params.get('paid')==='1';
    const session=params.get('session_id')||'';
    const notice=document.getElementById('post-payment-notice');
    const sessionField=document.getElementById('stripe_session_id');
    if(sessionField) sessionField.value=session;
    if(returned && notice){
      notice.hidden=false;
      notice.scrollIntoView({block:'nearest'});
    }
  });
})();
