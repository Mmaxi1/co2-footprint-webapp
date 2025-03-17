// Globale Variable zum Speichern der Originaldaten
let originalData = [];

// Globale Variable zum Speichern der aktuellen Sortierreihenfolge pro Spalte
const sortDirections = {};

// Übersetzungs-Objekt für ALLE data-i18n Keys:
const translations = {
    de: {
        pageTitle: "CO₂-Footprint – Emissionsübersicht",
        logoShort: "CF",
        logoFull: "CO₂-Footprint",
        navHome: "Home",
        navData: "Daten",
        navAbout: "Über uns",
        navContact: "Kontakt",
        homeTitle: "Willkommen bei CO₂-Footprint",
        homeIntro: "Erhalte einen Überblick über die CO₂-Emissionen ...",
        chartTitle: "CO₂-Emissionen nach Ländern",
        sidebarMenuTitle: "Menü",
        sidebarCountries: "Länder",
        sidebarCompanies: "Unternehmen",
        filterTitle: "Filtere die Emissionsdaten",
        filterLabelCountry: "Land",
        filterLabelCompany: "Unternehmen",
        filterLabelEmission: "Emissionen (Mt CO₂)",
        filterEmissionValue: "0+ Mt CO₂",
        optionAll: "Alle",
        btnReset: "Filter zurücksetzen",
        tableHeaderLand: "Land",
        tableHeaderCompany: "Unternehmen",
        tableHeaderEmission: "Emissionen (Mt CO₂)",
        tableLoading: "Daten werden geladen...",
        aboutTitle: "Über uns",
        aboutText: "Hier findest du Informationen zur Organisation ...",
        contactTitle: "Kontakt",
        contactText: "Hier stehen unsere Kontaktinformationen ...",
        footerCopyright: "© 2024 CO₂-Footprint. Alle Rechte vorbehalten.",
        footerImprint: "Impressum | Datenschutz | Nutzungsbedingungen"
    },
    en: {
        pageTitle: "CO₂-Footprint – Emissions Overview",
        logoShort: "CF",
        logoFull: "CO₂-Footprint",
        navHome: "Home",
        navData: "Data",
        navAbout: "About Us",
        navContact: "Contact",
        homeTitle: "Welcome to CO₂-Footprint",
        homeIntro: "Get an overview of CO₂ emissions ...",
        chartTitle: "CO₂ Emissions by Country",
        sidebarMenuTitle: "Menu",
        sidebarCountries: "Countries",
        sidebarCompanies: "Companies",
        filterTitle: "Filter the Emissions Data",
        filterLabelCountry: "Country",
        filterLabelCompany: "Company",
        filterLabelEmission: "Emissions (Mt CO₂)",
        filterEmissionValue: "0+ Mt CO₂",
        optionAll: "All",
        btnReset: "Reset Filters",
        tableHeaderLand: "Country",
        tableHeaderCompany: "Company",
        tableHeaderEmission: "Emissions (Mt CO₂)",
        tableLoading: "Loading data...",
        aboutTitle: "About Us",
        aboutText: "Here you find information about the organization ...",
        contactTitle: "Contact",
        contactText: "Here is our contact info or a contact form ...",
        footerCopyright: "© 2024 CO₂-Footprint. All rights reserved.",
        footerImprint: "Imprint | Privacy Policy | Terms"
    },
    fr: {
        pageTitle: "CO₂-Footprint – Aperçu des émissions",
        logoShort: "CF",
        logoFull: "CO₂-Footprint",
        navHome: "Accueil",
        navData: "Données",
        navAbout: "À propos",
        navContact: "Contact",
        homeTitle: "Bienvenue chez CO₂-Footprint",
        homeIntro: "Obtenez un aperçu des émissions de CO₂ ...",
        chartTitle: "Émissions de CO₂ par pays",
        sidebarMenuTitle: "Menu",
        sidebarCountries: "Pays",
        sidebarCompanies: "Entreprises",
        filterTitle: "Filtrer les données d'émissions",
        filterLabelCountry: "Pays",
        filterLabelCompany: "Entreprise",
        filterLabelEmission: "Émissions (Mt CO₂)",
        filterEmissionValue: "0+ Mt CO₂",
        optionAll: "Tous",
        btnReset: "Réinitialiser",
        tableHeaderLand: "Pays",
        tableHeaderCompany: "Entreprise",
        tableHeaderEmission: "Émissions (Mt CO₂)",
        tableLoading: "Chargement des données...",
        aboutTitle: "À propos de nous",
        aboutText: "Ici, vous trouverez des informations sur l'organisation ...",
        contactTitle: "Contact",
        contactText: "Ici se trouvent nos informations de contact ...",
        footerCopyright: "© 2024 CO₂-Footprint. Tous droits réservés.",
        footerImprint: "Mentions légales | Confidentialité | Conditions"
    }
};

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM vollständig geladen, Script läuft!");

    // A) Dark Mode init
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    if (localStorage.getItem("darkMode") === "enabled") {
        document.documentElement.classList.add("dark");
        darkModeToggle.textContent = "☀️";
    } else {
        document.documentElement.classList.remove("dark");
        darkModeToggle.textContent = "🌙";
    }
    darkModeToggle.addEventListener("click", () => {
        if (document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("darkMode", "disabled");
            darkModeToggle.textContent = "🌙";
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("darkMode", "enabled");
            darkModeToggle.textContent = "☀️";
        }
    });

    // B) Sprache init
    const languageSwitcher = document.getElementById("language-switcher");
    const savedLanguage = localStorage.getItem("language") || "de";
    languageSwitcher.value = savedLanguage;
    updateLanguage(savedLanguage);

    languageSwitcher.addEventListener("change", () => {
        const lang = languageSwitcher.value;
        localStorage.setItem("language", lang);
        updateLanguage(lang);
    });

    // C) Burger-Menü
    const burgerBtn = document.getElementById("burger-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    if (burgerBtn && mobileMenu) {
        burgerBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }

    // D) Sidebar-Untermenüs
    document.querySelectorAll(".sidebar-toggle").forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-target");
            const targetElem = document.getElementById(targetId);
            if (targetElem) {
                targetElem.classList.toggle("hidden");
            }
        });
    });

    // E) Sidebar-Links -> Filter
    setupSidebarLinks();

    // F) initApp nach kleinem Timeout
    setTimeout(initApp, 500);
});

/**
 * Übersetzt alle Elemente mit data-i18n
 * anhand des Objekts translations[lang]
 */
function updateLanguage(lang) {
    console.log("Wechsle Sprache zu:", lang);
    document.documentElement.setAttribute("lang", lang);

    // Alle Elemente mit data-i18n durchgehen
    document.querySelectorAll("[data-i18n]").forEach(elem => {
        const key = elem.getAttribute("data-i18n");
        if (translations[lang][key]) {
            // Falls HTML gewünscht -> elem.innerHTML = ...
            elem.textContent = translations[lang][key];
        }
    });
}

/** Lädt die Daten, befüllt Tabelle & Chart & Filter */
async function initApp() {
    try {
        console.log("Starte Datenabruf...");
        const response = await fetch("data/emissions.json");
        if (!response.ok) {
            throw new Error(`HTTP-Fehler: ${response.status}`);
        }
        const data = await response.json();
        console.log("Daten erfolgreich geladen.", data);

        // Speichern
        originalData = data;

        // Tabelle, Chart, Filter
        populateTable(data);
        generateChart(data);
        populateFilters(data);

        // Formular-Reset -> Original
        document.getElementById("filter-form").addEventListener("reset", () => {
            setTimeout(() => {
                populateTable(originalData);
                console.log("Filter zurückgesetzt, Tabelle neu befüllt.");
            }, 0);
        });
    } catch (err) {
        console.error("Fehler beim Laden der CO2-Daten:", err);
        document.querySelector("main").innerHTML +=
            `<p class="text-red-500 font-bold mt-4" data-i18n="tableLoading">
         Daten konnten nicht geladen werden ...
       </p>`;
    }
}

// Globale Variable: originalData (oben deklariert)

// Chart.js Diagramm
function generateChart(data) {
    const countryEmissions = {};
    data.forEach(entry => {
        if (!countryEmissions[entry.land]) {
            countryEmissions[entry.land] = 0;
        }
        countryEmissions[entry.land] += entry.emissionen;
    });
    const labels = Object.keys(countryEmissions);
    const values = Object.values(countryEmissions);

    const ctx = document.getElementById("co2Chart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: "CO₂-Emissionen (Mt CO₂)",
                data: values,
                backgroundColor: "rgba(22, 163, 74, 0.7)",
                borderColor:   "rgba(19, 129, 61, 1)",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Tabelle füllen
function populateTable(data) {
    const tbody = document.querySelector("#co2-table tbody");
    if (!tbody) {
        console.error("Fehler: #co2-table tbody nicht gefunden.");
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

// Filter befüllen
function populateFilters(data) {
    const filterSelect   = document.getElementById("filter");
    const companyFilter  = document.getElementById("company-filter");
    const co2Filter      = document.getElementById("co2-filter");
    const co2Value       = document.getElementById("co2-value");

    if (!filterSelect || !companyFilter || !co2Filter || !co2Value) {
        console.error("Fehler: Ein oder mehrere Filter-Elemente fehlen.");
        return;
    }

    filterSelect.innerHTML  = "";
    companyFilter.innerHTML = "";

    // Länder
    const countries = new Set(data.map(e => e.land));
    filterSelect.appendChild(new Option(translations.de.optionAll, "Alle"));
    // Du könntest hier dynamisch i18n auswerten,
    // aber wir lassen es beim Standard "Alle" -
    // oder verwende (translations[LANG].optionAll)...

    countries.forEach(country => {
        filterSelect.appendChild(new Option(country, country));
    });

    // Unternehmen
    const companies = new Set(data.map(e => e.unternehmen));
    companyFilter.appendChild(new Option(translations.de.optionAll, "Alle"));
    companies.forEach(comp => {
        companyFilter.appendChild(new Option(comp, comp));
    });

    // Filter-Events
    filterSelect.addEventListener("change", () => filterTable(data));
    companyFilter.addEventListener("change", () => filterTable(data));
    co2Filter.addEventListener("input", () => {
        co2Value.textContent = `${co2Filter.value}+ Mt CO₂`;
        // Falls Du das auch i18n willst, müsstest Du es kompliziert anpassen
        filterTable(data);
    });
}

// Tabellen-Filter anwenden
function filterTable(data) {
    const filterSelect  = document.getElementById("filter");
    const companyFilter = document.getElementById("company-filter");
    const co2Filter     = document.getElementById("co2-filter");

    if (!filterSelect || !companyFilter || !co2Filter) {
        console.error("Fehler: Filter-Elemente nicht gefunden.");
        return;
    }

    const selectedCountry = filterSelect.value;
    const selectedCompany = companyFilter.value;
    const co2Threshold    = parseFloat(co2Filter.value);

    let filteredData = data;
    if (selectedCountry !== "Alle") {
        filteredData = filteredData.filter(e => e.land === selectedCountry);
    }
    if (selectedCompany !== "Alle") {
        filteredData = filteredData.filter(e => e.unternehmen === selectedCompany);
    }
    if (!isNaN(co2Threshold)) {
        filteredData = filteredData.filter(e => e.emissionen >= co2Threshold);
    }

    populateTable(filteredData);
}

// Sidebar-Links
function setupSidebarLinks() {
    document.querySelectorAll(".sidebar-link").forEach(link => {
        link.addEventListener("click", (evt) => {
            evt.preventDefault();
            const selectedValue = evt.target.textContent.trim();
            console.log("Geklickter Sidebar-Filter:", selectedValue);

            resetFilters();
            setTimeout(() => {
                const filterSelect  = document.getElementById("filter");
                const companyFilter = document.getElementById("company-filter");

                if (
                    filterSelect &&
                    Array.from(filterSelect.options).some(opt => opt.value === selectedValue)
                ) {
                    filterSelect.value = selectedValue;
                    console.log("Land-Filter gesetzt:", selectedValue);
                } else if (
                    companyFilter &&
                    Array.from(companyFilter.options).some(opt => opt.value === selectedValue)
                ) {
                    companyFilter.value = selectedValue;
                    console.log("Unternehmens-Filter gesetzt:", selectedValue);
                } else {
                    console.warn("Kein passender Filter gefunden:", selectedValue);
                }
                filterTable(originalData);
            }, 50);
        });
    });
}

// Filter zurücksetzen, Darkmode bleibt
function resetFilters() {
    const filterSelect   = document.getElementById("filter");
    const companyFilter  = document.getElementById("company-filter");
    const co2Filter      = document.getElementById("co2-filter");
    const co2Value       = document.getElementById("co2-value");

    if (!filterSelect || !companyFilter || !co2Filter || !co2Value) {
        console.error("Fehler: Filter-Elemente nicht gefunden.");
        return;
    }

    const isDark = (localStorage.getItem("darkMode") === "enabled");

    // Filter reset
    filterSelect.value  = "Alle";
    companyFilter.value = "Alle";
    co2Filter.value     = 0;
    co2Value.textContent = "0+ Mt CO₂";

    // Darkmode reaktivieren
    if (isDark) {
        document.documentElement.classList.add("dark");
    }
}

// Sortierfunktion für Tabelle
function sortTable(columnIndex) {
    console.log("Sortiere Spalte:", columnIndex);

    if (!sortDirections[columnIndex]) {
        sortDirections[columnIndex] = "asc";
    } else {
        sortDirections[columnIndex] = sortDirections[columnIndex] === "asc" ? "desc" : "asc";
    }

    const direction = sortDirections[columnIndex];
    let sortedData = [...originalData];

    sortedData.sort((a, b) => {
        if (columnIndex === 0) {
            return direction === "asc" ? a.land.localeCompare(b.land) : b.land.localeCompare(a.land);
        }
        if (columnIndex === 1) {
            return direction === "asc" ? a.unternehmen.localeCompare(b.unternehmen) : b.unternehmen.localeCompare(a.unternehmen);
        }
        if (columnIndex === 2) {
            return direction === "asc" ? a.emissionen - b.emissionen : b.emissionen - a.emissionen;
        }
        return 0;
    });

    populateTable(sortedData);
}

