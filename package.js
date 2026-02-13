// DATA CONFIGURATION
const packages = {
    watamu: {
        "watamu-eco-1": { price: "€200" },
        "watamu-eco-2": { price: "€200" },
        "watamu-std-1": { price: "€280" },
        "watamu-std-2": { price: "€280" },
        "watamu-lux-1": { price: "€350" },
        "watamu-lux-2": { price: "€350" }
    },
    malindi: {
        "malindi-eco-1": { price: "€300" },
        "malindi-eco-2": { price: "€300" },
        "malindi-std-1": { price: "€450" },
        "malindi-std-2": { price: "€450" },
        "malindi-lux-1": { price: "€600" },
        "malindi-lux-2": { price: "€600" }
    }
};

document.addEventListener('DOMContentLoaded', () => {

    /* ================= MODAL LOGIC ================= */
    const modal = document.getElementById('itinerary-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body-content');
    const openButtons = document.querySelectorAll('.btn-more');
    const closeButton = document.querySelector('.close');

    const itineraries = {
        "modal-1": {
            title: "Malindi Tour - Programma",
            content: `
                <div class="itinerary-day">
                    <h3>🌊 Giorno 1 — Arrivo a Malindi</h3>
                    <p>Incontro con la guida e trasferimento in hotel. Pomeriggio dedicato al relax o visita al Parco Marino.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🏛️ Giorno 2 — Cultura e Ritorno</h3>
                    <p>Visita al Pilastro di Vasco da Gama e al mercato locale. Trasferimento finale.</p>
                </div>
            `
        },
        "modal-2": {
            title: "Safari Blue - Programma",
            content: `
                <div class="itinerary-day">
                    <h3>⛵ Giornata Intera — Avventura Marina</h3>
                    <p>Partenza in barca tradizionale (dhow). Snorkeling nella barriera corallina. Pranzo a base di pesce su un'isola deserta.</p>
                </div>
            `
        },
        // Using a generic template for 3rd-9th as requested to keep it clean but functional
        "default": (name) => ({
            title: `${name} - Programma Completo`,
            content: `
                <div class="itinerary-day">
                    <h3>🐘 Giorno 1 — Arrivo e Safari</h3>
                    <p>Incontro con la guida e trasferimento in 4x4. Primo game drive nella savana.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🦁 Giorno 2-3 — Nel cuore della Wild</h3>
                    <p>Safari intensivi all'alba e al tramonto. Avvistamento dei Big Five.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🌅 Giorno Finale — Rientro</h3>
                    <p>Ultimo safari all'alba e trasferimento alla costa o in aeroporto.</p>
                </div>
            `
        })
    };

    openButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            const pkgName = btn.closest('.package-card').querySelector('h3').textContent;
            
            const data = itineraries[modalId] || itineraries["default"](pkgName);
            
            modalTitle.textContent = data.title;
            // For the demo/request, we keep the sections but update the days
            const daysContainer = modal.querySelectorAll('.itinerary-day');
            daysContainer.forEach(d => d.remove());
            
            modalTitle.insertAdjacentHTML('afterend', data.content);
            
            modal.style.display = 'flex';
        });
    });

    if(closeButton) {
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });


    /* ================= DYNAMIC BUDGET LOGIC ================= */

    function setupDynamicPackage(name) {
        const select = document.getElementById(`budget-${name}`);
        const priceSpan = document.getElementById(`price-${name}`);

        if (!select) return;

        select.addEventListener('change', (e) => {
            const selectedValue = e.target.value;
            const data = packages[name][selectedValue];

            if (data && priceSpan) {
                // Determine base price based on group or specific logic if needed.
                // For now, we use the price from the 'packages' object.
                priceSpan.textContent = data.price;
            }
        });
    }

    setupDynamicPackage('watamu');
    setupDynamicPackage('malindi');


    /* ================= BOOKING LOGIC ================= */

    // 1. Standard "Book Now" buttons (on cards)
    document.querySelectorAll('.btn-book').forEach(btn => {
        btn.addEventListener('click', () => {
            // Find the package name from the card
            const card = btn.closest('.package-card');
            const title = card.querySelector('h3').textContent;
            const price = card.querySelector('.price-badge').textContent;

            // Redirect
            window.location.href = `contactus.html?package=${encodeURIComponent(title)}&price=${encodeURIComponent(price)}`;
        });
    });

    // 2. "Prenota Questa Opzione" buttons (inside modals)
    document.querySelectorAll('.btn-book-option').forEach(btn => {
        btn.addEventListener('click', () => {
            const packageName = btn.getAttribute('data-package');
            const target = btn.getAttribute('data-target'); // 'watamu' or 'malindi'

            let hotel = "N/A";
            let price = "N/A";
            let budget = "N/A";

            // Get current selection values
            const select = document.getElementById(`budget-${target}`);
            if (select) {
                const selectedOption = select.options[select.selectedIndex];
                hotel = selectedOption.text; // Use the text shown in dropdown

                // Infer budget from parent optgroup
                const optgroup = selectedOption.parentElement;
                budget = optgroup ? optgroup.label : "Standard";

                // Get price from span
                const priceSpan = document.getElementById(`price-${target}`);
                price = priceSpan ? priceSpan.textContent : "N/A";
            }

            // Redirect
            const url = `contactus.html?package=${encodeURIComponent(packageName)}&hotel=${encodeURIComponent(hotel)}&price=${encodeURIComponent(price)}&budget=${encodeURIComponent(budget)}`;
            window.location.href = url;
        });
    });

});
