# TaxTwin public preview site

Free public landing page deployed to GitHub Pages from `lukki1/taxtwin-site`. Source stays in the private `lukki1/taxtwin` repo.

## Change without touching code

Edit `site/config.json` in the private repo and push to `main`. The publish workflow copies it to the public Pages repo.

```json
{
  "contactEmail": "you@example.com",
  "foundingPrice": "19 zł/mies.",
  "status": "Podgląd produktu – backend i płatności są w przygotowaniu.",
  "paymentLinks": {
    "monthly": "https://buy.stripe.com/...",
    "annual": "https://buy.stripe.com/..."
  }
}
```

When a payment link is empty, the corresponding button is disabled. When both are set, the buttons go live with no rebuild of the Angular app.

This site does not call the API. Full upload/calculation requires a backend host, which still needs an account or subscription.
