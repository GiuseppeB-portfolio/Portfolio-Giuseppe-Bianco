// =========================================================
// MAIN.JS
// Piccoli comportamenti di supporto: anno nel footer e
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
