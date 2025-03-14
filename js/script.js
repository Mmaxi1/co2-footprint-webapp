// Globale Variable zum Speichern der Originaldaten
let originalData = [];

// Globale Variable zum Speichern der aktuellen Sortierreihenfolge pro Spalte
const sortDirections = {};

// Initialisierung, wenn das DOM geladen ist
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM vollständig geladen.");

    // Burger-Menü Toggle für mobile Navigation
    const burgerBtn = document.getElementById("burger-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    if (burgerBtn && mobileMenu) {
        burgerBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }

    // Sidebar Toggle für Untermenüs
    document.querySelectorAll('.sidebar-toggle').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.classList.toggle('hidden');
            }
        });
    });

    // Sidebar-Links: Filter setzen
    setupSidebarLinks();

    setTimeout(initApp, 500);
});

// Asynchrone Funktion zum Laden der Daten
async function initApp() {
    try {
        console.log("Starte Datenabruf...");
        const response = await fetch("data/emissions.json");
        if (!response.ok) {
            throw new Error(`HTTP-Fehler: ${response.status}`);
        }
        const data = await response.json();
        console.log("Daten erfolgreich geladen.", data);

        // Originaldaten speichern
        originalData = data;

        populateTable(data);
        populateFilters(data);

        // Formular-Reset: Tabelle mit Originaldaten neu befüllen
        document.getElementById("filter-form").addEventListener("reset", () => {
            setTimeout(() => {
                populateTable(originalData);
                console.log("Filter zurückgesetzt, Tabelle neu befüllt.");
            }, 0);
        });
    } catch (error) {
        console.error("Fehler beim Laden der CO2-Daten:", error);
        document.querySelector("main").innerHTML +=
            "<p class='text-red-500 font-bold mt-4'>Daten konnten nicht geladen werden. Überprüfe den Server oder die Datei 'data/emissions.json'.</p>";
    }
}

// Befüllt die Tabelle mit den gegebenen Daten
function populateTable(data) {
    const tbody = document.querySelector("#co2-table tbody");
    if (!tbody) {
        console.error("Fehler: Tabelle nicht gefunden.");
        return;
    }
    tbody.innerHTML = "";
    data.forEach(entry => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td class="p-3">${entry.land}</td>
      <td class="p-3">${entry.unternehmen}</td>
      <td class="p-3">${entry.emissionen}</td>
    `;
        tbody.appendChild(row);
    });
    console.log("Tabelle erfolgreich befüllt.");
}

// Befüllt die Filter-Dropdowns dynamisch
function populateFilters(data) {
    const filterSelect = document.getElementById("filter");
    const companyFilter = document.getElementById("company-filter");
    const co2Filter = document.getElementById("co2-filter");
    const co2Value = document.getElementById("co2-value");
    if (!filterSelect || !companyFilter || !co2Filter || !co2Value) {
        console.error("Fehler: Ein oder mehrere Filter-Dropdowns nicht gefunden.");
        return;
    }
    // Leere die Dropdowns
    filterSelect.innerHTML = "";
    companyFilter.innerHTML = "";

    // Länder-Dropdown füllen
    const countries = new Set(data.map(entry => entry.land));
    filterSelect.appendChild(new Option("Alle", "Alle"));
    countries.forEach(country => {
        filterSelect.appendChild(new Option(country, country));
    });

    // Unternehmen-Dropdown füllen
    const companies = new Set(data.map(entry => entry.unternehmen));
    companyFilter.appendChild(new Option("Alle", "Alle"));
    companies.forEach(company => {
        companyFilter.appendChild(new Option(company, company));
    });

    // Event-Listener für die Filter
    filterSelect.addEventListener("change", () => filterTable(data));
    companyFilter.addEventListener("change", () => filterTable(data));
    co2Filter.addEventListener("input", () => {
        co2Value.textContent = `${co2Filter.value}+ Mt CO₂`;
        filterTable(data);
    });
    console.log("Filter-Menüs erfolgreich befüllt.");
}

// Wendet die Filter an und aktualisiert die Tabelle
function filterTable(data) {
    const filterSelect = document.getElementById("filter");
    const companyFilter = document.getElementById("company-filter");
    const co2Filter = document.getElementById("co2-filter");
    if (!filterSelect || !companyFilter || !co2Filter) {
        console.error("Fehler: Filter-Dropdowns nicht gefunden.");
        return;
    }
    const selectedCountry = filterSelect.value;
    const selectedCompany = companyFilter.value;
    const co2Threshold = parseFloat(co2Filter.value);

    let filteredData = data;
    if (selectedCountry !== "Alle") {
        filteredData = filteredData.filter(entry => entry.land === selectedCountry);
    }
    if (selectedCompany !== "Alle") {
        filteredData = filteredData.filter(entry => entry.unternehmen === selectedCompany);
    }
    if (!isNaN(co2Threshold)) {
        filteredData = filteredData.filter(entry => entry.emissionen >= co2Threshold);
    }
    if (filteredData.length === 0) {
        const tbody = document.querySelector("#co2-table tbody");
        tbody.innerHTML = "<tr><td colspan='3' class='text-center text-gray-500'>Keine Ergebnisse gefunden</td></tr>";
        return;
    }
    populateTable(filteredData);
    console.log(`Tabelle gefiltert: Land='${selectedCountry}', Unternehmen='${selectedCompany}', Emissionen >= ${co2Threshold}`);
}

// Sortiert die Tabelle anhand der angeklickten Spalte
function sortTable(columnIndex) {
    const table = document.getElementById("co2-table");
    const tbody = table.querySelector("tbody");
    let rows = Array.from(tbody.querySelectorAll("tr")).filter(row => row.id !== "placeholder-row");

    // Toggle der Sortierreihenfolge
    sortDirections[columnIndex] = !sortDirections[columnIndex];
    const direction = sortDirections[columnIndex] ? 1 : -1;

    rows.sort((a, b) => {
        let aText = a.cells[columnIndex].textContent.trim();
        let bText = b.cells[columnIndex].textContent.trim();
        if (!isNaN(aText) && !isNaN(bText)) {
            return (parseFloat(aText) - parseFloat(bText)) * direction;
        }
        return aText.localeCompare(bText) * direction;
    });

    tbody.innerHTML = "";
    rows.forEach(row => tbody.appendChild(row));
}

// Setzt alle Filter auf den Standardwert zurück
function resetFilters() {
    const filterSelect = document.getElementById("filter");
    const companyFilter = document.getElementById("company-filter");
    const co2Filter = document.getElementById("co2-filter");
    const co2Value = document.getElementById("co2-value");
    if (filterSelect && companyFilter && co2Filter && co2Value) {
        filterSelect.value = "Alle";
        companyFilter.value = "Alle";
        co2Filter.value = 0;
        co2Value.textContent = "0+ Mt CO₂";
    }
}

// Initialisiert die Sidebar-Links und setzt beim Klick den entsprechenden Filter
function setupSidebarLinks() {
    document.querySelectorAll(".sidebar-link").forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            resetFilters();
            // Kurze Verzögerung, um sicherzustellen, dass der Reset abgeschlossen ist
            setTimeout(() => {
                const text = event.target.textContent.trim();
                // Länder-Liste (G12) – Vergleich in Kleinbuchstaben
                const countries = ["Deutschland", "USA", "China", "Frankreich", "Großbritannien", "Italien", "Kanada", "Japan", "Australien", "Indien", "Brasilien", "Russland"];
                if (countries.map(c => c.toLowerCase()).includes(text.toLowerCase())) {
                    document.getElementById("filter").value = text;
                }
                // Unternehmen-Liste – Beispiel (bitte ggf. erweitern)
                const companies = ["Volkswagen", "BASF", "ExxonMobil", "Chevron", "Sinopec", "PetroChina", "TotalEnergies", "Engie", "BP", "GlaxoSmithKline", "Eni", "Fiat", "Suncor", "Imperial Oil", "Toyota", "Mitsubishi", "BHP", "Woodside", "Reliance Industries", "Tata Motors", "Petrobras", "Vale", "Rosneft", "Gazprom"];
                if (companies.map(c => c.toLowerCase()).includes(text.toLowerCase())) {
                    document.getElementById("company-filter").value = text;
                }
                // Spezieller Fall: "Aktuelle Emissionen"
                if (text.toLowerCase() === "aktuelle emissionen") {
                    document.getElementById("co2-filter").value = 250;
                    document.getElementById("co2-value").textContent = "250+ Mt CO₂";
                }
                filterTable(originalData);
            }, 50);
        });
    });
}
