(async () => {
  const status = document.getElementById('checkout-status');
  const heading = document.getElementById('checkout-product');
  const products = {
    'project-defibrillator': 'Project Defibrillator · sandbox $6.99',
    'thread-junk-remover': 'Thread Junk Remover · sandbox $9.00'
  };
  const sku = new URLSearchParams(location.search).get('sku');
  const error = (message) => { status.textContent = message; };
  if (!Object.prototype.hasOwnProperty.call(products, sku)) {
    error('Choose a valid product. No payment has been initiated.'); return;
  }
  heading.textContent = products[sku];
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({sku})
    });
    const data = await response.json();
    if (!response.ok || !data.client_secret || !/^pk_test_/.test(data.publishable_key)) {
      throw new Error(data.error || 'Stripe sandbox not configured.');
    }
    const stripe = Stripe(data.publishable_key, {betas: ['custom_checkout_payment_form_1']});
    const appearance = {
      theme: 'stripe', inputs: 'spaced', labels: 'auto',
      variables: {
        borderRadius: '4px', colorBackground: '#ffffff', colorDanger: '#df1b41',
        colorPrimary: '#0570de', colorSuccess: '#00c853', colorText: '#30313d',
        fontFamily: 'default', fontSizeBase: '16px', spacingUnit: '4px'
      }
    };
    const checkout = stripe.initCheckoutFormSdk({clientSecret: Promise.resolve(data.client_secret), appearance});
    const form = checkout.createForm({layout: 'expanded'});
    form.mount('#checkout-form');
    const result = await checkout.loadActions();
    if (result.type !== 'success') throw new Error('The embedded payment form could not initialize.');
    status.textContent = 'Sandbox ready. Test cards only; no digital delivery is configured.';
    form.on('confirm', async (event) => {
      try { await result.actions.confirm({formConfirmEvent: event}); }
      catch (err) { error('Test payment could not be confirmed. Please retry or return to the store.'); console.error(err); }
    });
  } catch (err) {
    error(err instanceof Error ? err.message : 'Sandbox checkout unavailable.');
  }
})();
