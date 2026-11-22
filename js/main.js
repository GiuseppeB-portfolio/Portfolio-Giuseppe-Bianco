// =========================================================
// MAIN.JS
// Piccoli comportamenti di supporto: anno nel footer e invio
// del form di contatto tramite Google Moduli.
// =========================================================

// Anno corrente nel footer, su tutte le pagine
document.querySelectorAll('#year').forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

// ---------------------------------------------------------
// CONTATTI — invio tramite Google Moduli
// Il form del sito invia i campi all'indirizzo "formResponse"
// del Google Modulo; le risposte arrivano nel modulo (e, se
// attivato, via email). I codici "entry.…" identificano le
// quattro domande del modulo.
// ---------------------------------------------------------
const CONTACT_FORM = {
  actionUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLScmCIDoN82uCUd9G-Pc7LaC0ZSZ5FRRUg20cptpNa6ea39YFg/formResponse',
  fields: {
    name: 'entry.2005620554',    // Nome e cognome
    email: 'entry.1045781291',   // Email
    subject: 'entry.1065046570', // Oggetto richiesta
    message: 'entry.1166974658', // Messaggio
  },
  minFillMs: 3000, // sotto questa soglia dal caricamento della pagina il form non parte
};

const contactForm = document.getElementById('contact-form');

if (contactForm) {
  const statusEl = document.getElementById('form-status');
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const loadedAt = Date.now();

  const showStatus = function (message, type) {
    statusEl.textContent = message;
    statusEl.classList.remove('is-success', 'is-error');
    statusEl.classList.add('is-visible', type === 'success' ? 'is-success' : 'is-error');
  };

  const value = function (id) {
    return document.getElementById(id).value.trim();
  };

  contactForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    // Campo trappola: se compilato è un bot, si ignora senza segnalare nulla
    if (document.getElementById('contact_hp').value) {
      return;
    }

    // Compilazione troppo rapida: si chiede di riprovare, senza perdere il messaggio
    if (Date.now() - loadedAt < CONTACT_FORM.minFillMs) {
      showStatus('Un momento, riprova tra qualche secondo.', 'error');
      return;
    }

    const body = new URLSearchParams();
    body.append(CONTACT_FORM.fields.name, value('name'));
    body.append(CONTACT_FORM.fields.email, value('email'));
    body.append(CONTACT_FORM.fields.subject, value('subject'));
    body.append(CONTACT_FORM.fields.message, value('message'));

    submitButton.disabled = true;
    submitButton.textContent = 'Invio in corso...';

    try {
      // "no-cors": la risposta di Google non è leggibile, quindi si rilevano
      // solo gli errori di rete; un rifiuto lato Google non è visibile qui.
      await fetch(CONTACT_FORM.actionUrl, {
        method: 'POST',
        mode: 'no-cors',
        credentials: 'omit',
        body: body,
      });
      showStatus('Messaggio inviato, grazie! Ti risponderò al più presto.', 'success');
      contactForm.reset();
    } catch (error) {
      showStatus('Si è verificato un errore durante l\'invio. Riprova più tardi oppure scrivimi su LinkedIn.', 'error');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Invia messaggio';
    }
  });
}
