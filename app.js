(function(){
  const STORE = window.ETHERFORGE_STORE || {products:{}};
  const product = (key)=>STORE.products[key]||null;
  function setYear(){document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear())}
  function bindStore(){document.querySelectorAll('[data-product]').forEach(a=>{const p=product(a.dataset.product);if(!p)return;a.href=p.url;a.textContent=a.dataset.label||p.cta;if(/^https?:/.test(p.url)){a.target='_blank';a.rel='noopener noreferrer'}})}
  function menu(){const b=document.querySelector('.menu-btn'), n=document.querySelector('.nav-links');if(!b||!n)return;b.addEventListener('click',()=>{n.classList.toggle('open');b.setAttribute('aria-expanded',n.classList.contains('open'))});n.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>n.classList.remove('open')))}
  document.addEventListener('DOMContentLoaded',()=>{setYear();bindStore();menu()});
})();