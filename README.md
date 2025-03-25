
# CO₂-Footprint – Emissionsübersicht

Diese Webanwendung visualisiert globale CO₂-Emissionsdaten von Ländern und Unternehmen.  
Sie wurde im Rahmen des Moduls **IPWA01 – Programmierung von Webanwendungsoberflächen** an der **IU Internationale Hochschule** erstellt.


## 🔍 Funktionen

- Interaktive Tabelle mit Filterung und Sortierung
- Sprachumschaltung (Deutsch, Englisch, Französisch, Arabisch)
- RTL-Unterstützung für arabische Sprache (Layout passt sich automatisch an)
- Dark Mode mit Toggle-Schalter
- Dynamische CO₂-Summenanzeige unter der Tabelle
- Diagramm mit Chart.js (Emissionen pro Land)
- Responsives Layout mit Tailwind CSS
- Barrierefreie Navigation (semantisches HTML, ARIA-Rollen)


Installation & Start

### Voraussetzungen
- [Node.js](https://nodejs.org/) (für Tailwind CSS Build)
- Ein moderner Browser

### Schritte

1. Projekt entpacken oder über GitHub klonen

2. Abhängigkeiten installieren (einmalig):
   ```bash
   npm install
   ```

3. Tailwind CSS starten:
   ```bash
   npx tailwindcss -i ./css/input.css -o ./css/output.css --watch
   ```

4. Öffne `index.html` im Browser

> 💡 Hinweis: Das Projekt ist **clientseitig** – kein Server notwendig.


_### Projektstruktur (Auszug)

```
├── css/
│   ├── input.css          # Tailwind Input-Datei
│   └── output.css         # Kompiliertes CSS
├── js/
│   └── script.js          # Hauptlogik (JavaScript)
├── data/
│   └── emissions.json     # CO₂-Daten (Länder + Firmen)
├── index.html             # Startseite
├── README.md              # Projektbeschreibung (du liest sie gerade)
└── impressum.html         # (optional, placeholder für Datenschutz/Impressum)
```


### Datenbasis

Die verwendeten Emissionsdaten sind beispielhaft und wurden aus öffentlich zugänglichen Quellen abgeleitet oder fiktiv erstellt.  
Die Anwendung erhebt oder speichert **keine** Nutzerdaten.


### Hinweis zur Nutzung

Diese Anwendung dient ausschließlich **zu Lern- und Demonstrationszwecken** im Studium.  
Sie ist **nicht für den produktiven Einsatz** vorgesehen und enthält **kein echtes Impressum**.

