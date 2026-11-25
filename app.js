(function () {
  'use strict';

  var defaults = {
    contactEmail: 'lukasz.filolog@gmail.com',
    foundingPrice: '19 zł/mies.',
    status: 'Podgląd produktu – backend i płatności są w przygotowaniu.',
    paymentLinks: { monthly: '', annual: '' }
  };

  function setMailto(element, email, subject, body) {
    if (!element || !email) return;
    var url = 'mailto:' + email +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
    element.setAttribute('href', url);
  }

  function applyConfig(config) {
    var email = config.contactEmail || defaults.contactEmail;
    var foundingPrice = config.foundingPrice || defaults.foundingPrice;
    var status = config.status || defaults.status;
    var links = config.paymentLinks || defaults.paymentLinks;

    var note = document.getElementById('founding-note');
    if (note) {
      note.textContent = 'Pierwsze 3 osoby: ' + foundingPrice +
        ' przez cały czas trwania subskrypcji.';
    }

    var statusNode = document.getElementById('status');
    if (statusNode) statusNode.textContent = status;

    var subject = 'TaxTwin – członek założyciel';
    var body = 'Cześć,\n\nChcę dołączyć do pierwszych 3 członków założycieli TaxTwin (' +
      foundingPrice + ').\n\nImię / e-mail kontaktowy:\n\nKraj i brokerzy, z których korzystam:\n\n';
    setMailto(document.getElementById('founding-cta'), email, subject, body);
    setMailto(document.getElementById('founding-cta-2'), email, subject, body);

    var buttons = [
      ['buy-monthly', links.monthly],
      ['buy-annual', links.annual]
    ];
    buttons.forEach(function (entry) {
      var button = document.getElementById(entry[0]);
      if (!button) return;
      if (entry[1]) {
        button.setAttribute('href', entry[1]);
      } else {
        button.removeAttribute('href');
        button.setAttribute('aria-disabled', 'true');
        button.setAttribute('tabindex', '-1');
        button.textContent = 'Płatności wkrótce';
      }
    });
  }

  fetch('config.json', { cache: 'no-store' })
    .then(function (response) {
      if (!response.ok) throw new Error('config unavailable');
      return response.json();
    })
    .then(applyConfig)
    .catch(function () { applyConfig(defaults); });
})();
