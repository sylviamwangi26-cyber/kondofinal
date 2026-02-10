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
    const modals = document.querySelectorAll('.modal');
    const openButtons = document.querySelectorAll('.btn-more');
    const closeButtons = document.querySelectorAll('.close');

    // Open Modal
    openButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) modal.style.display = 'flex'; // Use flex to center with CSS
        });
    });

    // Close Modal (X button)
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').style.display = 'none';
        });
    });

    // Close Modal (Click outside)
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
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
