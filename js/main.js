// =========================================================
// MAIN.JS
// Piccoli comportamenti di supporto: anno nel footer, link email e
// pulsante di stampa del CV.
// =========================================================

// Anno corrente nel footer, su tutte le pagine
document.querySelectorAll('#year').forEach(function (el) {
  el.textContent = new Date().getFullYear();
});


// Pulsante "Stampa / salva come PDF" del CV (niente onclick inline nell'HTML)
document.querySelectorAll('.btn-print').forEach(function (btn) {
  btn.addEventListener('click', function () {
    window.print();
  });
});


// Link "Scrivimi" / "Email": l'indirizzo non compare nell'HTML ma viene
// composto qui, così non finisce in chiaro nel sorgente per i bot che raccolgono email.
// Senza JavaScript il link porta al profilo LinkedIn.
document.querySelectorAll('.js-email').forEach(function (link) {
  link.href = 'mailto:' + link.dataset.user + '@' + link.dataset.domain;
});
