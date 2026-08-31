// =========================================================
// MAIN.JS
// Piccoli comportamenti di supporto: anno nel footer e invio
// del form di contatto tramite EmailJS (esercizio opzionale).
// =========================================================

// Anno corrente nel footer, su tutte le pagine
document.querySelectorAll('#year').forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

// ---------------------------------------------------------
// EMAILJS — configurazione
// Per attivare l'invio reale del form:
// 1. crea un account gratuito su https://www.emailjs.com/
// 2. crea un "Email Service" e un "Email Template"
// 3. sostituisci i tre placeholder qui sotto con i tuoi ID
// Finché restano ai valori di default, il form mostra solo
// un messaggio informativo invece di inviare l'email.
// ---------------------------------------------------------
const EMAILJS_CONFIG = {
  publicKey: 'YOUR_PUBLIC_KEY',
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
};

const contactForm = document.getElementById('contact-form');

if (contactForm) {
  const statusEl = document.getElementById('form-status');
  const isConfigured = Object.values(EMAILJS_CONFIG).every(function (v) {
    return v && !v.startsWith('YOUR_');
  });

  if (isConfigured && window.emailjs) {
    emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
  }

  const showStatus = function (message, type) {
    statusEl.textContent = message;
    statusEl.classList.remove('is-success', 'is-error');
    statusEl.classList.add('is-visible', type === 'success' ? 'is-success' : 'is-error');
  };

  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    if (!isConfigured || !window.emailjs) {
      showStatus(
        'Il form è pronto ma l\'invio via EmailJS non è ancora configurato (vedi js/main.js). Nel frattempo puoi scrivermi su LinkedIn o GitHub qui sopra.',
        'error'
      );
      return;
    }

    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Invio in corso...';

    emailjs.sendForm(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, contactForm)
      .then(function () {
        showStatus('Messaggio inviato, grazie! Ti risponderò al più presto.', 'success');
        contactForm.reset();
      })
      .catch(function () {
        showStatus('Si è verificato un errore durante l\'invio. Riprova più tardi oppure scrivimi su LinkedIn.', 'error');
      })
      .finally(function () {
        submitButton.disabled = false;
        submitButton.textContent = 'Invia messaggio';
      });
  });
}
