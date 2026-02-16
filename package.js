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
            title: "2 Days / 1 Night (Malindi Tour)",
            content: `
                <div class="itinerary-day">
                    <h3>🏛️ Day 1: Local Culture, Gede Ruins, and Marafa Hell’s Kitchen</h3>
                    <p>Pick up from your hotel and start with a visit to the historic Gede Ruins. Explore the ancient Swahili city. In the afternoon, travel to Marafa (Hell's Kitchen) to witness the spectacular sandstone canyons and sunset.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🌊 Day 2: Marine Park snorkeling and Vasco da Gama Pillar</h3>
                    <p>Visit the Malindi Marine National Park for an amazing boat excursion and snorkeling. Later, visit the iconic Vasco da Gama Pillar before returning to your hotel.</p>
                </div>
            `
        },
        "modal-2": {
            title: "1 Day (Safari Blue)",
            content: `
                <div class="itinerary-day">
                    <h3>⛵ Morning: Boat excursion to Watamu Marine Park</h3>
                    <p>Start your day with a beautiful boat ride to the Watamu Marine National Park. Enjoy snorkeling in the crystal clear waters and discover the rich marine life.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🦐 Afternoon: Seafood lunch on the island and snorkeling</h3>
                    <p>Head to a secluded island for a delicious traditional seafood lunch. Spend the rest of the afternoon snorkeling or relaxing on the beach.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🌅 Evening: Return to Hotel</h3>
                    <p>Sail back to the mainland as the sun sets, bringing an end to your tropical adventure. Drop-off at your hotel.</p>
                </div>
            `
        },
        "modal-3": {
            title: "8 Days / 7 Nights (Grand Safari Kenya)",
            content: `
                <div class="itinerary-day">
                    <h3>🦁 Day 1: Arrival in Nairobi & Transfer to Maasai Mara</h3>
                    <p>Welcome to Kenya! Pick up from Nairobi and journey to the world-famous Maasai Mara (The Great Plains). Evening game drive.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🐘 Day 2: Full Day Exploration in Maasai Mara</h3>
                    <p>Spend a full day exploring the Mara's diverse wildlife, including the Big Five and the Great Migration (seasonal).</p>
                </div>
                <div class="itinerary-day">
                    <h3>🦩 Day 3: Depart Mara for Lake Nakuru</h3>
                    <p>Travel to Lake Nakuru National Park, famous for its rhinos and vibrant flamingo population.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🚤 Day 4: Morning at Nakuru, afternoon transfer to Lake Naivasha</h3>
                    <p>Enjoy a morning game drive in Nakuru, then head to Lake Naivasha for a serene boat safari and bird watching.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🏔️ Day 5: Depart Naivasha for Amboseli</h3>
                    <p>Journey to Amboseli National Park, renowned for its large elephant herds and breathtaking views of Mt. Kilimanjaro.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🏰 Day 6: Morning in Amboseli, afternoon transfer to Taita Hills</h3>
                    <p>Last game drive in Amboseli before moving to Taita Hills, a private sanctuary with unique ecosystem.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🐆 Day 7: Morning in Taita Hills, afternoon Game Drive in Tsavo East</h3>
                    <p>Explore Taita Hills in the morning, then enter Tsavo East for an afternoon adventure in the "Land of the Red Elephants".</p>
                </div>
                <div class="itinerary-day">
                    <h3>🏖️ Day 8: Final Sunrise Safari & Drop-off at Coast</h3>
                    <p>A final sunrise game drive in Tsavo East before heading to the beautiful beaches of Malindi, Watamu, or Diani.</p>
                </div>
            `
        },
        "modal-4": {
            title: "7 Days / 6 Nights (Kenya Highlights)",
            content: `
                <div class="itinerary-day">
                    <h3>🐘 Day 1: Arrival & Journey to Maasai Mara</h3>
                    <p>Pick up and drive to the legendary Maasai Mara. Enjoy your first evening game drive in the savanna.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🦁 Day 2: Maasai Mara Exploration</h3>
                    <p>A full day dedicated to wildlife viewing in the Mara. Optional visit to a Maasai village.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🦩 Day 3: Maasai Mara to Lake Nakuru</h3>
                    <p>Depart for Lake Nakuru. Scout for rhinos and leopards in this beautiful alkaline lake park.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🏔️ Day 4: Lake Nakuru to Amboseli</h3>
                    <p>Long scenic drive to Amboseli. Arrive in time for an evening game drive at the foot of Kilimanjaro.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🐘 Day 5: Full Day in Amboseli</h3>
                    <p>Explore the marshes and plains of Amboseli. Marvel at the giant tusker elephants and the mountain backdrop.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🐾 Day 6: Amboseli to Tsavo East</h3>
                    <p>Morning in Amboseli, then transfer to the vast plains of Tsavo East National Park.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🏖️ Day 7: Tsavo East to Coast</h3>
                    <p>Final game drive at sunrise. Depart the wild for a relaxing drop-off at your coastal beach resort.</p>
                </div>
            `
        },
        "modal-5": {
            title: "6 Days / 5 Nights (Savana Adventure)",
            content: `
                <div class="itinerary-day">
                    <h3>🦓 Day 1: Pick up & Journey to Maasai Mara</h3>
                    <p>Briefing and departure for the Maasai Mara. Afternoon game drive in search of the Big Five.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🦁 Day 2: Full Day in Maasai Mara</h3>
                    <p>Venture deep into the Mara. Picnic lunch in the wild and extensive wildlife tracking.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🦏 Day 3: Depart for Lake Nakuru National Park</h3>
                    <p>Travel to the Great Rift Valley to visit Nakuru, a haven for rhinos and diverse birdlife.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🏔️ Day 4: Travel from Nakuru to Amboseli</h3>
                    <p>Head South to Amboseli. Enjoy the changing landscapes and afternoon safari near Kilimanjaro.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🐘 Day 5: Morning in Amboseli, afternoon transfer to Tsavo East</h3>
                    <p>Explore Amboseli's swamps in the morning. Later, journey to the red dust plains of Tsavo East.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🏖️ Day 6: Final Safari and Drop-off at Coast</h3>
                    <p>Early morning safari to catch predators in action. Late morning departure for the Kenya coast.</p>
                </div>
            `
        },
        "modal-6": {
            title: "5 Days / 4 Nights (Classic Kenya)",
            content: `
                <div class="itinerary-day">
                    <h3>🦁 Day 1: Pick up & Transfer to Maasai Mara</h3>
                    <p>Departure for the world's premier wildlife destination, the Maasai Mara. Evening game drive.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🦓 Day 2: Exploration of Maasai Mara</h3>
                    <p>A full day of adventure. Track lions, cheetahs, and the vast herds of grazers across the plains.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🏔️ Day 3: Fly or Drive to Amboseli</h3>
                    <p>Transiting to the "Land of Giants". Experience the majestic presence of Kilimanjaro.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🐘 Day 4: Morning in Amboseli, evening arrival in Tsavo East</h3>
                    <p>Morning safari in Amboseli. Transfer across the Chyulu hills to the vast Tsavo East.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🏖️ Day 5: Morning Game Drive & Transfer to Coast</h3>
                    <p>Final safari adventure. Enjoy the sunrise over the Yatta Plateau before heading to the ocean.</p>
                </div>
            `
        },
        "modal-7": {
            title: "4 Days / 3 Nights (Amboseli & Tsavo Spirit)",
            content: `
                <div class="itinerary-day">
                    <h3>🏔️ Day 1: Pick up & Drive to Amboseli</h3>
                    <p>Journey to Amboseli with the Kilimanjaro backdrop. Afternoon safari amongst the elephant herds.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🏰 Day 2: Depart Amboseli for Taita Hills Salt Lick</h3>
                    <p>Travel to the beautiful Taita Hills. Experience the unique stilts-lodge over a salt lick wildlife viewing point.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🐘 Day 3: Journey to Tsavo East</h3>
                    <p>Head into the iconic Tsavo East. Track the "Red Elephants" and explore the Aruba Dam area.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🏖️ Day 4: Final Game Drive & Drop-off at Coast</h3>
                    <p>Sunrise safari to spot the elusive big cats. Breakfast and drive to the white sand beaches of the coast.</p>
                </div>
            `
        },
        "modal-8": {
            title: "3 Days / 2 Nights (Wild Short Break)",
            content: `
                <div class="itinerary-day">
                    <h3>🐘 Day 1: Pick up from Coast & Drive to Tsavo East</h3>
                    <p>Early departure from your coast hotel. Entering Tsavo East for a full day of "red dust" safari adventures.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🏰 Day 2: Transfer from Tsavo East to Taita Hills</h3>
                    <p>Drive to the lush Taita Hills sanctuary. Enjoy an evening game drive in this private conservation area.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🏖️ Day 3: Morning Safari & Return to Coast</h3>
                    <p>Final game drive in Taita Hills. Return journey to Malindi or Watamu in time for a late lunch.</p>
                </div>
            `
        },
        "modal-9": {
            title: "3 Days / 2 Nights (Maasai Mara Special)",
            content: `
                <div class="itinerary-day">
                    <h3>✈️ Day 1: Flight from Coast/Nairobi to Maasai Mara</h3>
                    <p>Quick and scenic flight into the heart of the Mara. Afternoon game drive in the premier reserve.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🦁 Day 2: Full Day Game Drive in the Mara</h3>
                    <p>A dawn-to-dusk safari experience. Maximum wildlife exposure with professional tracking.</p>
                </div>
                <div class="itinerary-day">
                    <h3>🛬 Day 3: Morning Flight back to Coast</h3>
                    <p>A quick morning safari before boarding your flight back to the coast or Nairobi.</p>
                </div>
            `
        }
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

    if (closeButton) {
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
