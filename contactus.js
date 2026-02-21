document.addEventListener('DOMContentLoaded', () => {

  // --- AUTO-FILL FORM FROM URL ---
  const params = new URLSearchParams(window.location.search);
  const packageName = params.get('package');
  const hotel = params.get('hotel');
  const budget = params.get('budget');
  const price = params.get('price');

  if (packageName) {
    // 1. Try to set the package dropdown
    const select = document.querySelector('select[name="package"]');
    if (select) {
      let found = false;
      // Check existing options
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === packageName || select.options[i].text.includes(packageName)) {
          select.selectedIndex = i;
          found = true;
          break;
        }
      }
      // If not found (e.g. "2 Giorni Watamu" isn't in default list), add it
      if (!found) {
        const newOption = document.createElement('option');
        newOption.text = packageName;
        newOption.value = packageName;
        newOption.selected = true;
        select.add(newOption);
      }
    }

    // 2. Append details to the message box
    const messageBox = document.querySelector('textarea[name="message"]');
    if (messageBox) {
      const isEnglish = localStorage.getItem('siteLanguage') === 'en';
      const header = isEnglish ? '--- RESERVATION SUMMARY ---' : '--- RIEPILOGO PRENOTAZIONE ---';
      const pkgLabel = isEnglish ? 'Package' : 'Pacchetto';
      const hotelLabel = isEnglish ? 'Selected Hotel' : 'Hotel Scelto';
      const budgetLabel = isEnglish ? 'Budget Level' : 'Livello Budget';
      const priceLabel = isEnglish ? 'Estimated Price' : 'Prezzo Stimato';

      let details = `\n\n${header}\n${pkgLabel}: ${packageName}`;

      if (hotel && hotel !== 'N/A') details += `\n${hotelLabel}: ${hotel}`;
      if (budget && budget !== 'N/A') details += `\n${budgetLabel}: ${budget.charAt(0).toUpperCase() + budget.slice(1)}`;
      if (price && price !== 'N/A') details += `\n${priceLabel}: ${price}`;

      details += isEnglish ? '\n\nBooked with Salame Safari Tours' : '\n\nPrenotato con Salame Safari Tours';

      messageBox.value = details; // Set value
    }
  }
});
