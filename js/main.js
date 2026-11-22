// =========================================================
// MAIN.JS
// Piccoli comportamenti di supporto: anno nel footer e invio
// del form di contatto tramite Google Moduli.
// =========================================================

// Anno corrente nel footer, su tutte le pagine
document.querySelectorAll('#year').forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

