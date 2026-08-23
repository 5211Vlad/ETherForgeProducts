(function(){
  const STORE = window.ETHERFORGE_STORE || {products:{}};
  const product = (key)=>STORE.products[key]||null;
  function setYear(){document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear())}
  function bindStore(){document.querySelectorAll('[data-product]').forEach(a=>{const p=product(a.dataset.product);if(!p)return;a.href=p.url;a.textContent=a.dataset.label||p.cta;if(/^https?:/.test(p.url)){a.target='_blank';a.rel='noopener noreferrer'}})}
  function menu(){const b=document.querySelector('.menu-btn'), n=document.querySelector('.nav-links');if(!b||!n)return;b.addEventListener('click',()=>{n.classList.toggle('open');b.setAttribute('aria-expanded',n.classList.contains('open'))});n.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>n.classList.remove('open')))}
  function addLink(parent,label,href,before){if(!parent||parent.querySelector(`a[href="${href}"]`))return;const a=document.createElement('a');a.href=href;a.textContent=label;if(/^https?:/.test(href)){a.target='_blank';a.rel='noopener noreferrer'};before?parent.insertBefore(a,before):parent.appendChild(a)}
  function enhanceNavigation(){
    const nav=document.querySelector('.nav-links');
    if(nav){const contact=[...nav.querySelectorAll('a')].find(a=>a.getAttribute('href')&&a.getAttribute('href').startsWith('mailto:'));addLink(nav,'Partners','partners.html',contact||null)}
    const company=[...document.querySelectorAll('.footer-grid > div')].find(d=>{const b=d.querySelector('b');return b&&b.textContent.trim()==='COMPANY'});
    if(company){const email=[...company.querySelectorAll('a')].find(a=>a.getAttribute('href')&&a.getAttribute('href').startsWith('mailto:'));addLink(company,'Partners','partners.html',email||null);addLink(company,'GitHub','https://github.com/5211Vlad/ETherForgeProducts');addLink(company,'Instagram','https://www.instagram.com/vlad521118/');}
  }
  document.addEventListener('DOMContentLoaded',()=>{setYear();bindStore();enhanceNavigation();menu()});
})();