(function(){
  const STORE = window.ETHERFORGE_STORE || {products:{}};
  const product = (key)=>STORE.products[key]||null;
  function setYear(){document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear())}
  function bindStore(){document.querySelectorAll('[data-product]').forEach(a=>{const p=product(a.dataset.product);if(!p)return;a.href=p.url;a.textContent=a.dataset.label||p.cta;if(/^https?:/.test(p.url)){a.target='_blank';a.rel='noopener noreferrer'}})}
  function menu(){const b=document.querySelector('.menu-btn'), n=document.querySelector('.nav-links');if(!b||!n)return;b.addEventListener('click',()=>{n.classList.toggle('open');b.setAttribute('aria-expanded',n.classList.contains('open'))});n.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>n.classList.remove('open')))}
  function addLink(parent,label,href,before){if(!parent||parent.querySelector(`a[href="${href}"]`))return;const a=document.createElement('a');a.href=href;a.textContent=label;if(/^https?:/.test(href)){a.target='_blank';a.rel='noopener noreferrer'};before?parent.insertBefore(a,before):parent.appendChild(a)}
  function enhanceNavigation(){
    const nav=document.querySelector('.nav-links');
    if(nav){let contact=[...nav.querySelectorAll('a')].find(a=>a.textContent.trim().toLowerCase()==='contact'||(a.getAttribute('href')||'').startsWith('mailto:'));if(contact){contact.href='contact.html';contact.removeAttribute('target');contact.removeAttribute('rel')}addLink(nav,'Partners','partners.html',contact||null)}
    const company=[...document.querySelectorAll('.footer-grid > div')].find(d=>{const b=d.querySelector('b');return b&&b.textContent.trim()==='COMPANY'});
    if(company){let email=[...company.querySelectorAll('a')].find(a=>a.textContent.trim().toLowerCase()==='contact'||a.textContent.trim().toLowerCase()==='email'||(a.getAttribute('href')||'').startsWith('mailto:'));if(email){email.href='contact.html';email.textContent='Contact';email.removeAttribute('target');email.removeAttribute('rel')}addLink(company,'Partners','partners.html',email||null);addLink(company,'GitHub','https://github.com/5211Vlad/ETherForgeProducts');addLink(company,'Instagram','https://www.instagram.com/vlad521118/');}
  }
  function polishPublicCopy(){
    const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
    if(page==='index.html'){
      const hero=document.querySelector('.hero');
      if(hero){
        const p=hero.querySelector('h1 + p');
        if(p)p.textContent='EtherForge builds focused local-first software for messy data and workflow problems, then applies the same evidence discipline to AI efficiency and deeper R&D.';
        const actions=hero.querySelectorAll('.hero-actions a');
        if(actions[1]){actions[1].textContent='HIRE / CONTACT ETHERFORGE';actions[1].href='contact.html'}
        const notes=hero.querySelectorAll('.hero-note span');
        if(notes[2])notes[2].textContent='Clear validation status';
      }
      const sophia=[...document.querySelectorAll('.product-card')].find(c=>{const h=c.querySelector('h3');return h&&h.textContent.trim()==='SOPHIA 2.6'});
      if(sophia){
        const p=sophia.querySelector('h3 + p');
        if(p)p.textContent='A private Windows companion for tarot reflection, lunar/symbolic timing, numerology, astrology, ritual planning, Ingredient Atlas study, self-reflection, and practice memory.';
        sophia.querySelectorAll('.visual-pill').forEach(el=>{if(el.textContent.includes('Materia'))el.textContent=el.textContent.replace('Materia','Ingredient Atlas')});
      }
      const rnd=[...document.querySelectorAll('.card.rnd')].find(c=>{const e=c.querySelector('.eyebrow');return e&&e.textContent.includes('AVALON UNDER THE FLOORBOARDS')});
      if(rnd){
        const e=rnd.querySelector('.eyebrow'); if(e)e.textContent='DEEP R&D · BOUNDED CLAIMS';
        const h=rnd.querySelector('h3'); if(h)h.textContent='Ambitious research. Ordinary evidence rules.';
        const p=rnd.querySelector('h3 + p'); if(p)p.textContent='Our deeper lab work explores AI continuity, evidence-governed multi-perspective systems, simulation, and future embodied tools. Experimental ideas stay clearly separated from product proof and public claims.';
      }
    }
    if(page==='sophia.html'){
      const desc='SOPHIA 2.6 is a local Windows companion for self-reflection, symbolic practice, timing, tarot, astrology, numerology, ritual planning, Ingredient Atlas study, grimoire work, and private practice memory.';
      const md=document.querySelector('meta[name="description"]'); if(md)md.content=desc;
      const og=document.querySelector('meta[property="og:description"]'); if(og)og.content=desc;
      const hero=document.querySelector('.product-hero');
      if(hero){
        const h=hero.querySelector('h1'); if(h)h.textContent='A private place to reflect, study, plan, and remember your practice.';
        const p=hero.querySelector('h1 + p'); if(p)p.textContent='SOPHIA 2.6 brings tarot reflection, lunar and symbolic timing, numerology, natal/transit astrology, ritual planning, an Ingredient Atlas, grimoire study, and private practice memory into one local Windows workspace.';
        const price=hero.querySelector('.product-price'); if(price)price.textContent='Windows desktop · local-first';
        hero.querySelectorAll('.logline span').forEach(el=>{if(el.textContent==='Grimoire / Materia')el.textContent='Grimoire / Ingredient Atlas'});
        const receipt=hero.querySelector('.visual-receipt'); if(receipt)receipt.textContent='A private living study room for reflection and symbolic practice—not an oracle with a warranty.';
      }
      const what=[...document.querySelectorAll('.card')].find(c=>{const e=c.querySelector('.eyebrow');return e&&e.textContent.trim()==='WHAT IT DOES'});
      if(what){
        const h=what.querySelector('h3'); if(h)h.textContent='A private living study room for symbolic practice and self-reflection.';
        what.querySelectorAll('.feature span').forEach(el=>{el.textContent=el.textContent.replace('materia','Ingredient Atlas')});
      }
      document.querySelectorAll('.faq details').forEach(d=>{
        const s=d.querySelector('summary');
        if(s&&s.textContent.trim()==='Why no public checkout yet?'){
          s.textContent='Can I see what it does before buying?';
          const p=d.querySelector('p'); if(p)p.textContent='A short walkthrough is being prepared so the value is easier to understand before purchase. Use the demo/access button for current availability or review access.';
        }
      });
      const callout=document.querySelector('.callout');
      if(callout){
        const h=callout.querySelector('h2'); if(h)h.textContent='A private place to reflect, study, plan, and remember your practice.';
        const p=callout.querySelector('h2 + p'); if(p)p.textContent='Bring timing, tarot, astrology, numerology, ritual planning, Ingredient Atlas study, grimoire work, and private practice memory into one local Windows companion.';
      }
    }
  }
  document.addEventListener('DOMContentLoaded',()=>{setYear();polishPublicCopy();bindStore();enhanceNavigation();menu()});
})();