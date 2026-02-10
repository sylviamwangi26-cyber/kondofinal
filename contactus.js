document.addEventListener('DOMContentLoaded', () => {

  // --- MOBILE NAV TOGGLE ---
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

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
      let details = `\n\n--- RIEPILOGO PRENOTAZIONE ---\nPacchetto: ${packageName}`;

      if (hotel && hotel !== 'N/A') details += `\nHotel Scelto: ${hotel}`;
      if (budget && budget !== 'N/A') details += `\nLivello Budget: ${budget.charAt(0).toUpperCase() + budget.slice(1)}`;
      if (price && price !== 'N/A') details += `\nPrezzo Stimato: ${price}`;

      messageBox.value = details; // Set value
    }
  }
});
