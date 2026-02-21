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

    let currentLang = localStorage.getItem('siteLanguage') || 'it';
    let currentModalId = null;

    window.addEventListener('languageChanged', (e) => {
        currentLang = e.detail.lang;
        if (currentModalId) {
            renderModalContent(currentModalId, currentLang);
        }
    });

    const itineraries = {
        "modal-2": {
            it: {
                title: "2 Giorni / 1 Notte (Safari Blue, Malindi & Tsavo)",
                content: `
                    <div class="itinerary-day">
                        <h3>🐘 Giorno 1: Safari nel Parco Nazionale Tsavo East</h3>
                        <p>Partenza all'alba verso lo Tsavo East, la terra degli elefanti rossi. Safari mattutino e pomeridiano per avvistare leoni, giraffe e zebre. Pranzo e pernottamento in lodge o campo tendato immersi nella natura selvaggia.</p>
                    </div>
                    <div class="itinerary-day">
                        <h3>⛵ Giorno 2: Safari Blue, Malindi e Snorkeling</h3>
                        <p>Dopo la colazione, rientro verso la costa per un'indimenticabile giornata di Safari Blue. Navigazione nel Parco Marino di Watamu per snorkeling tra i coralli e pranzo a base di pesce sull'atollo di Sardegna 2. Concluderemo con un giro a Malindi prima del rientro.</p>
                    </div>
                `
            },
            en: {
                title: "2 Days / 1 Night (Safari Blue, Malindi & Tsavo)",
                content: `
                    <div class="itinerary-day">
                        <h3>🐘 Day 1: Safari in Tsavo East National Park</h3>
                        <p>Early departure for Tsavo East, the land of the red elephants. Morning and afternoon game drives to spot lions, giraffes, and zebras. Lunch and overnight stay at a lodge or tented camp in the heart of the wild.</p>
                    </div>
                    <div class="itinerary-day">
                        <h3>⛵ Day 2: Safari Blue, Malindi & Snorkeling</h3>
                        <p>After breakfast, return to the coast for an unforgettable Safari Blue experience. Sail through Watamu Marine Park for snorkeling among corals and a seafood lunch at Sardegna 2 atoll. We'll end the day with a visit to Malindi before returning.</p>
                    </div>
                `
            }
        },
        "modal-3": {
            it: {
                title: "8 Giorni / 7 Notti (Grand Safari Kenya)",
                content: `
                    <div class="itinerary-day">
                        <h3>🦁 Giorno 1: Arrivo a Nairobi e Trasferimento al Maasai Mara</h3>
                        <p>Benvenuti in Kenya! Partenza da Nairobi verso il famoso Maasai Mara. Safari al tramonto.</p>
                    </div>
                    <div class="itinerary-day">
                        <h3>🐘 Giorno 2: Intera Giornata nel Maasai Mara</h3>
                        <p>Giornata dedicata alla ricerca dei "Big Five" e alla Grande Migrazione (stagionale).</p>
                    </div>
                    <div class="itinerary-day">
                        <h3>🦩 Giorno 3: Dal Mara al Lago Nakuru</h3>
                        <p>Viaggio verso il Parco Nazionale del Lago Nakuru, famoso per i rinoceronti e i fenicotteri.</p>
                    </div>
                    <div class="itinerary-day">
                        <h3>🚤 Giorno 4: Nakuru e Trasferimento al Lago Naivasha</h3>
                        <p>Safari mattutino a Nakuru, poi Naivasha per un safari in barca e bird watching.</p>
                    </div>
                    <div class="itinerary-day">
                        <h3>🏔️ Giorno 5: Da Naivasha ad Amboseli</h3>
                        <p>Viaggio verso il Parco Amboseli, ai piedi del Kilimanjaro, famoso per i suoi grandi branchi di elefanti.</p>
                    </div>
                    <div class="itinerary-day">
                        <h3>🏰 Giorno 6: Amboseli e Taita Hills</h3>
                        <p>Ultimo safari ad Amboseli e trasferimento a Taita Hills, un santuario privato unico.</p>
                    </div>
                    <div class="itinerary-day">
                        <h3>🐆 Giorno 7: Taita Hills e Tsavo East</h3>
                        <p>Esplorazione di Taita Hills e ingresso nello Tsavo East, la terra degli elefanti rossi.</p>
                    </div>
                    <div class="itinerary-day">
                        <h3>🏖️ Giorno 8: Ultimo Safari e Ritorno alla Costa</h3>
                        <p>Safari all'alba e rientro verso Malindi, Watamu o Diani.</p>
                    </div>
                `
            },
            en: {
                title: "8 Days / 7 Nights (Grand Safari Kenya)",
                content: `
                    <div class="itinerary-day">
                        <h3>🦁 Day 1: Arrival in Nairobi & Transfer to Maasai Mara</h3>
                        <p>Welcome to Kenya! Pick up from Nairobi and journey to the world-famous Maasai Mara. Evening game drive.</p>
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
            }
        },
        "modal-4": {
            it: {
                title: "7 Giorni / 6 Notti (Kenya Highlights)",
                content: `
                    <div class="itinerary-day">
                        <h3>🐘 Giorno 1: Arrivo e Viaggio verso il Maasai Mara</h3>
                        <p>Partenza verso il leggendario Mara. Primo safari nella savana al tramonto.</p>
                    </div>
                    <div class="itinerary-day">
                        <h3>🦁 Giorno 2: Esplorazione del Maasai Mara</h3>
                        <p>Intera giornata dedicata all'avvistamento della fauna selvatica.</p>
                    </div>
                    <div class="itinerary-day">
                        <h3>🦩 Giorno 3: Dal Mara al Lago Nakuru</h3>
                        <p>Viaggio verso Nakuru alla ricerca di rinoceronti e leopardi.</p>
                    </div>
                    <div class="itinerary-day">
                        <h3>🏔️ Giorno 4: Nakuru ad Amboseli</h3>
                        <p>Viaggio panoramico verso Amboseli, ai piedi del Kilimanjaro.</p>
                    </div>
                    <div class="itinerary-day">
                        <h3>🐘 Giorno 5: Intera Giornata ad Amboseli</h3>
                        <p>Osservate i grandi elefanti e ammirate la vista della montagna.</p>
                    </div>
                    <div class="itinerary-day">
                        <h3>🐾 Giorno 6: Amboseli a Tsavo East</h3>
                        <p>Trasferimento verso le vaste pianure del Parco Tsavo East.</p>
                    </div>
                    <div class="itinerary-day">
                        <h3>🏖️ Giorno 7: Tsavo East alla Costa</h3>
                        <p>Ultimo safari all'alba e rientro verso il vostro resort sulla spiaggia.</p>
                    </div>
                `
            },
            en: {
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
            }
        },
        "modal-5": {
            it: {
                title: "6 Giorni / 5 Notti (Savana Adventure)",
                content: `
                    <div class="itinerary-day">
                        <h3>🦓 Giorno 1: Partenza per il Maasai Mara</h3>
                        <p>Briefing e partenza. Safari pomeridiano alla ricerca dei "Big Five".</p>
                    </div>
                    <div class="itinerary-day">
                        <h3>🦁 Giorno 2: Intera Giornata nel Mara</h3>
                        <p>Safari intensivo nel cuore della riserva con pranzo a sacco nella natura.</p>
                    </div>
                    <div class="itinerary-day">
                        <h3>🦏 Giorno 3: Verso il Parco del Lago Nakuru</h3>
                        <p>Viaggio nella Rift Valley per visitare il paradiso dei rinoceronti.</p>
                    </div>
                    <div class="itinerary-day">
                        <h3>🏔️ Giorno 4: Da Nakuru ad Amboseli</h3>
                        <p>Viaggio verso sud con safari pomeridiano vicino al Kilimanjaro.</p>
                    </div>
                    <div class="itinerary-day">
                        <h3>🐘 Giorno 5: Amboseli e Tsavo East</h3>
                        <p>Safari mattutino ad Amboseli e viaggio verso le terre rosse di Tsavo.</p>
                    </div>
                    <div class="itinerary-day">
                        <h3>🏖️ Giorno 6: Ultimo Safari e Ritorno alla Costa</h3>
                        <p>Safari all'alba per avvistare i predatori e rientro pomeridiano.</p>
                    </div>
                `
            },
            en: {
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
            }
        },
        "modal-6": {
            it: {
                title: "5 Giorni / 4 Notti (Classic Kenya)",
                content: `
                    <div class="itinerary-day">
                        <h3>🦁 Giorno 1: Trasferimento al Maasai Mara</h3>
                        <p>Partenza per la destinazione numero uno al mondo per i safari.</p>
                    </div>
                    <div class="itinerary-day">
                        <h3>🦓 Giorno 2: Esplorazione del Mara</h3>
                        <p>Giornata intera a seguire le tracce di leoni, ghepardi e grandi mandrie.</p>
                    </div>
                    <div class="itinerary-day">
                        <h3>🏔️ Giorno 3: Verso Amboseli</h3>
                        <p>Trasferimento nella terra dei giganti, dominata dal Kilimanjaro.</p>
                    </div>
                    <div class="itinerary-day">
                        <h3>🐘 Giorno 4: Amboseli e Tsavo East</h3>
                        <p>Safari mattutino ad Amboseli e trasferimento attraverso le colline Chyulu verso Tsavo.</p>
                    </div>
                    <div class="itinerary-day">
                        <h3>🏖️ Giorno 5: Ultimo Safari e Costa</h3>
                        <p>Ultima avventura al sorgere del sole prima di dirigersi verso l'oceano.</p>
                    </div>
                `
            },
            en: {
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
            }
        },
        "modal-7": {
            it: {
                title: "4 Giorni / 3 Notti (Amboseli & Tsavo Spirit)",
                content: `
                    <div class="itinerary-day">
                        <h3>🏔️ Giorno 1: Viaggio verso Amboseli</h3>
                        <p>L'emozione di vedere il Kilimanjaro. Safari pomeridiano tra branchi di elefanti.</p>
                    </div>
                    <div class="itinerary-day">
                        <h3>🏰 Giorno 2: Amboseli a Taita Hills Salt Lick</h3>
                        <p>Viaggio verso Taita Hills per alloggiare nel famoso lodge sulle palafitte.</p>
                    </div>
                    <div class="itinerary-day">
                        <h3>🐘 Giorno 3: Verso lo Tsavo East</h3>
                        <p>Ingresso nell'iconico Tsavo East. Safari nell'area della diga di Aruba.</p>
                    </div>
                    <div class="itinerary-day">
                        <h3>🏖️ Giorno 4: Ultimo Safari e Ritorno</h3>
                        <p>Safari all'alba e rientro verso le spiagge bianche della costa.</p>
                    </div>
                `
            },
            en: {
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
            }
        },
        "modal-8": {
            it: {
                title: "3 Giorni / 2 Notti (Wild Short Break)",
                content: `
                    <div class="itinerary-day">
                        <h3>🐘 Giorno 1: Dalla Costa allo Tsavo East</h3>
                        <p>Partenza anticipata per un'intera giornata di avventure tra la polvere rossa dello Tsavo.</p>
                    </div>
                    <div class="itinerary-day">
                        <h3>🏰 Giorno 2: Da Tsavo East a Taita Hills</h3>
                        <p>Viaggio verso il santuario di Taita Hills. Safari serale nell'area protetta privata.</p>
                    </div>
                    <div class="itinerary-day">
                        <h3>🏖️ Giorno 3: Safari Mattutino e Rientro</h3>
                        <p>Ultimo safari a Taita Hills e rientro in tempo per il pranzo.</p>
                    </div>
                `
            },
            en: {
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
            }
        },
        "modal-9": {
            it: {
                title: "3 Giorni / 2 Notti (Maasai Mara Special)",
                content: `
                    <div class="itinerary-day">
                        <h3>✈️ Giorno 1: Volo verso il Maasai Mara</h3>
                        <p>Volo panoramico verso il cuore del Mara. Safari pomeridiano nella riserva.</p>
                    </div>
                    <div class="itinerary-day">
                        <h3>🦁 Giorno 2: Intera Giornata nel Mara</h3>
                        <p>Esperienza safari dall'alba al tramonto. Massima esposizione alla fauna selvatica.</p>
                    </div>
                    <div class="itinerary-day">
                        <h3>🛬 Giorno 3: Volo di Rientro</h3>
                        <p>Breve safari mattutino prima del volo di rientro alla costa o Nairobi.</p>
                    </div>
                `
            },
            en: {
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
        }
    };

    function renderModalContent(modalId, lang) {
        const data = itineraries[modalId];
        if (!data) return;

        const content = data[lang];
        modalTitle.textContent = content.title;

        // Clear old days
        const daysContainer = modal.querySelectorAll('.itinerary-day');
        daysContainer.forEach(d => d.remove());

        // Inject new content
        modalTitle.insertAdjacentHTML('afterend', content.content);
    }

    openButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentModalId = btn.getAttribute('data-modal');
            renderModalContent(currentModalId, currentLang);
            modal.style.display = 'flex';
        });
    });

    const langButtons = document.querySelectorAll('.btn-lang');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentLang = btn.getAttribute('data-lang');

            // Update active state
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Re-render
            if (currentModalId) {
                renderModalContent(currentModalId, currentLang);
            }
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
