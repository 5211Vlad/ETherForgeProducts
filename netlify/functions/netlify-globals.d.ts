// Netlify provides this global in its Functions runtime.
declare const Netlify: {env: {get(key: string): string | undefined}};
