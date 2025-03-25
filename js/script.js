// Globale Variablen
let originalData = [];
const sortDirections = {};

// Übersetzungs-Objekt für data-i18n Keys
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
    },
    ar: {
        pageTitle: "بصمة الكربون – نظرة عامة على الانبعاثات",
        logoShort: "بص",
        logoFull: "بصمة الكربون",
        navHome: "الرئيسية",
        navData: "البيانات",
        navAbout: "معلومات عنا",
        navContact: "اتصل بنا",
        homeTitle: "مرحبًا بك في بصمة الكربون",
        homeIntro: "احصل على نظرة عامة على انبعاثات ثاني أكسيد الكربون من الدول والشركات.",
        chartTitle: "انبعاثات ثاني أكسيد الكربون حسب الدولة",
        sidebarMenuTitle: "القائمة",
        sidebarCountries: "الدول",
        sidebarCompanies: "الشركات",
        filterTitle: "قم بتصفية بيانات الانبعاثات",
        filterLabelCountry: "الدولة",
        filterLabelCompany: "الشركة",
        filterLabelEmission: "الانبعاثات (مليون طن من CO₂)",
        filterEmissionValue: "+0 مليون طن من CO₂",
        optionAll: "الكل",
        btnReset: "إعادة تعيين الفلاتر",
        tableHeaderLand: "الدولة",
        tableHeaderCompany: "الشركة",
        tableHeaderEmission: "الانبعاثات (مليون طن من CO₂)",
        tableLoading: "جاري تحميل البيانات...",
        aboutTitle: "معلومات عنا",
        aboutText: "هنا يمكنك العثور على معلومات حول المنظمة وفريقنا ومهمتنا لزيادة الشفافية حول تغير المناخ.",
        contactTitle: "اتصل بنا",
        contactText: "تجد هنا معلومات الاتصال أو نموذج الاتصال للتواصل معنا.",
        footerCopyright: "© 2024 بصمة الكربون. جميع الحقوق محفوظة.",
        footerImprint: "البيان القانوني | سياسة الخصوصية | الشروط"
    }
};

// Initialisierung beim DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM vollständig geladen, Script läuft!");

    initDarkMode();
    initLanguage();
    initBurgerMenu();
    initSidebarToggles();
    setupSidebarLinks();

    // Daten laden mit kleinem Timeout, um initiale Animationen abzuwarten
    setTimeout(initApp, 500);
});

/* -----------------------------
   Funktion: initDarkMode
   Darkmode initialisieren und Toggle konfigurieren
----------------------------- */
const initDarkMode = () => {
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
};

/* -----------------------------
   Funktion: initLanguage
   Sprache initialisieren und Wechsel-Event konfigurieren
----------------------------- */
const initLanguage = () => {
    const languageSwitcher = document.getElementById("language-switcher");
    const savedLanguage = localStorage.getItem("language") || "de";
    languageSwitcher.value = savedLanguage;
    updateLanguage(savedLanguage);
    languageSwitcher.addEventListener("change", () => {
        const lang = languageSwitcher.value;
        localStorage.setItem("language", lang);
        updateLanguage(lang);
    });
};

/* -----------------------------
   Funktion: updateLanguage
   Übersetzt alle Elemente mit data-i18n
----------------------------- */
const updateLanguage = (lang) => {
    console.log("Wechsle Sprache zu:", lang);
    document.documentElement.setAttribute("lang", lang);
    // Sprachrichtung (LTR oder RTL) setzen
    const rtlLanguages = ["ar", "he", "fa"];
    const dir = rtlLanguages.includes(lang) ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.querySelectorAll("[data-i18n]").forEach(elem => {
        const key = elem.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
            elem.textContent = translations[lang][key];
        }
    });
};

/* -----------------------------
   Funktion: initBurgerMenu
   Mobile Navigation initialisieren
----------------------------- */
const initBurgerMenu = () => {
    const burgerBtn = document.getElementById("burger-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    if (burgerBtn && mobileMenu) {
        burgerBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }
};

/* -----------------------------
   Funktion: initSidebarToggles
   Sidebar-Untermenüs initialisieren
----------------------------- */
const initSidebarToggles = () => {
    document.querySelectorAll(".sidebar-toggle").forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-target");
            const targetElem = document.getElementById(targetId);
            if (targetElem) {
                targetElem.classList.toggle("hidden");
            }
        });
    });
};

/* -----------------------------
   Funktion: initApp
   Lädt die Daten und initialisiert Tabelle, Chart und Filter
----------------------------- */
const initApp = async () => {
    try {
        console.log("Starte Datenabruf...");
        const response = await fetch("data/emissions.json");
        if (!response.ok) throw new Error(`HTTP-Fehler: ${response.status}`);
        const data = await response.json();
        console.log("Daten erfolgreich geladen.", data);
        originalData = data;
        populateTable(data);
        generateChart(data);
        populateFilters(data);

        // Filter-Reset Event
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
};

/* -----------------------------
   Funktion: generateChart
   Erstellt ein Chart.js Diagramm
----------------------------- */
const generateChart = (data) => {
    const countryEmissions = {};
    data.forEach(entry => {
        countryEmissions[entry.land] = (countryEmissions[entry.land] || 0) + entry.emissionen;
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
                borderColor: "rgba(19, 129, 61, 1)",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true } }
        }
    });
};

/* -----------------------------
   Funktion: populateTable
   Befüllt die Tabelle mit Daten
----------------------------- */
const populateTable = (data) => {
    const tbody = document.querySelector("#co2-table tbody");
    if (!tbody) {
        console.error("Fehler: #co2-table tbody nicht gefunden.");
        return;
    }
    tbody.innerHTML = "";
    data.forEach(entry => {
        const row = document.createElement("tr");

        const tdLand = document.createElement("td");
        tdLand.className = "p-3";
        tdLand.textContent = entry.land;

        const tdCompany = document.createElement("td");
        tdCompany.className = "p-3";
        tdCompany.textContent = entry.unternehmen;

        const tdEmission = document.createElement("td");
        tdEmission.className = "p-3";
        tdEmission.textContent = entry.emissionen;

        row.appendChild(tdLand);
        row.appendChild(tdCompany);
        row.appendChild(tdEmission);

        tbody.appendChild(row);
    });

    // Summenanzeige ergänzen
    const sum = data.reduce((total, entry) => total + entry.emissionen, 0);
    const sumElement = document.getElementById("emission-sum");
    if (sumElement) {
        sumElement.textContent = `Total: ${sum.toFixed(1)} Mt CO₂`;
    }

    console.log("Tabelle erfolgreich befüllt.");
};

/* -----------------------------
   Funktion: populateFilters
   Befüllt die Filterfelder und registriert Events
----------------------------- */
const populateFilters = (data) => {
    const filterSelect  = document.getElementById("filter");
    const companyFilter = document.getElementById("company-filter");
    const co2Filter     = document.getElementById("co2-filter");
    const co2Value      = document.getElementById("co2-value");

    if (!filterSelect || !companyFilter || !co2Filter || !co2Value) {
        console.error("Fehler: Ein oder mehrere Filter-Elemente fehlen.");
        return;
    }

    // Filterfelder leeren und befüllen
    filterSelect.innerHTML  = "";
    companyFilter.innerHTML = "";
    filterSelect.appendChild(new Option(translations.de.optionAll, "Alle"));
    const countries = new Set(data.map(e => e.land));
    countries.forEach(country => filterSelect.appendChild(new Option(country, country)));

    companyFilter.appendChild(new Option(translations.de.optionAll, "Alle"));
    const companies = new Set(data.map(e => e.unternehmen));
    companies.forEach(comp => companyFilter.appendChild(new Option(comp, comp)));

    // Events zur Filterung
    filterSelect.addEventListener("change", () => filterTable(data));
    companyFilter.addEventListener("change", () => filterTable(data));
    co2Filter.addEventListener("input", () => {
        co2Value.textContent = `${co2Filter.value}+ Mt CO₂`;
        filterTable(data);
    });
};

/* -----------------------------
   Funktion: filterTable
   Wendet die Filter auf die Daten an und befüllt die Tabelle
----------------------------- */
const filterTable = (data) => {
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
    if (selectedCountry !== "Alle") filteredData = filteredData.filter(e => e.land === selectedCountry);
    if (selectedCompany !== "Alle") filteredData = filteredData.filter(e => e.unternehmen === selectedCompany);
    if (!isNaN(co2Threshold)) filteredData = filteredData.filter(e => e.emissionen >= co2Threshold);

    populateTable(filteredData);
};

/* -----------------------------
   Funktion: setupSidebarLinks
   Konfiguriert die Sidebar-Links als Filter
----------------------------- */
const setupSidebarLinks = () => {
    document.querySelectorAll(".sidebar-link").forEach(link => {
        link.addEventListener("click", evt => {
            evt.preventDefault();
            const selectedValue = evt.target.textContent.trim();
            console.log("Geklickter Sidebar-Filter:", selectedValue);
            resetFilters();
            setTimeout(() => {
                const filterSelect  = document.getElementById("filter");
                const companyFilter = document.getElementById("company-filter");
                if (filterSelect && Array.from(filterSelect.options).some(opt => opt.value === selectedValue)) {
                    filterSelect.value = selectedValue;
                    console.log("Land-Filter gesetzt:", selectedValue);
                } else if (companyFilter && Array.from(companyFilter.options).some(opt => opt.value === selectedValue)) {
                    companyFilter.value = selectedValue;
                    console.log("Unternehmens-Filter gesetzt:", selectedValue);
                } else {
                    console.warn("Kein passender Filter gefunden:", selectedValue);
                }
                filterTable(originalData);
            }, 50);
        });
    });
};

/* -----------------------------
   Funktion: resetFilters
   Setzt die Filter zurück, Darkmode bleibt aktiv
----------------------------- */
const resetFilters = () => {
    const filterSelect  = document.getElementById("filter");
    const companyFilter = document.getElementById("company-filter");
    const co2Filter     = document.getElementById("co2-filter");
    const co2Value      = document.getElementById("co2-value");

    if (!filterSelect || !companyFilter || !co2Filter || !co2Value) {
        console.error("Fehler: Filter-Elemente nicht gefunden.");
        return;
    }

    const isDark = (localStorage.getItem("darkMode") === "enabled");
    filterSelect.value  = "Alle";
    companyFilter.value = "Alle";
    co2Filter.value     = 0;
    co2Value.textContent = "0+ Mt CO₂";
    if (isDark) document.documentElement.classList.add("dark");
};

/* -----------------------------
   Funktion: sortTable
   Sortiert die Tabelle anhand der gewählten Spalte
----------------------------- */
const sortTable = (columnIndex) => {
    console.log("Sortiere Spalte:", columnIndex);
    sortDirections[columnIndex] = !sortDirections[columnIndex] || sortDirections[columnIndex] === "desc" ? "asc" : "desc";
    const direction = sortDirections[columnIndex];
    const sortedData = [...originalData].sort((a, b) => {
        if (columnIndex === 0) return direction === "asc" ? a.land.localeCompare(b.land) : b.land.localeCompare(a.land);
        if (columnIndex === 1) return direction === "asc" ? a.unternehmen.localeCompare(b.unternehmen) : b.unternehmen.localeCompare(a.unternehmen);
        if (columnIndex === 2) return direction === "asc" ? a.emissionen - b.emissionen : b.emissionen - a.emissionen;
        return 0;
    });
    populateTable(sortedData);
};

// Neue Summe berechnen und anzeigen
const sum = data.reduce((total, entry) => total + entry.emissionen, 0);
const sumElement = document.getElementById("emission-sum");
if (sumElement) {
    sumElement.textContent = `Total: ${sum.toFixed(1)} Mt CO₂`;
}

