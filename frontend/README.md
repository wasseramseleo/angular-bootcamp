# Angular Grundkurs: Order Management Dashboard

## Beschreibung

Dies ist das Starter-Projekt für das Angular 20 Grundkurs. Es handelt sich um eine moderne Angular-Anwendung, die mit Standalone Components aufgebaut ist und eine grundlegende Layout-Struktur für ein "Order Management Dashboard" bereitstellt.

Die Teilnehmer werden auf dieser Basis aufbauen, um CRUD-Funktionalität zu implementieren, wobei Signals für das State Management und moderne Angular Best Practices genutzt werden.

## Installation

1.  Navigieren Sie in dieses Frontend-Projektverzeichnis.
2.  Installieren Sie die erforderlichen Dependencies mit npm:
    ```bash
    npm install
    ```

## Entwicklungsserver

1.  Führen Sie `ng serve` in diesem Verzeichnis aus, um den Entwicklungsserver zu starten.
2.  Öffnen Sie `http://localhost:4200/` im Browser. Die Anwendung lädt automatisch neu, wenn Sie Änderungen an den Quelldateien vornehmen.

---

## Projektstruktur

Dieses Projekt folgt der Standardstruktur der Angular CLI, wurde jedoch um einige spezifische Ordner für mehr Übersichtlichkeit erweitert.

-   `llm/`: Dieses Verzeichnis enthält sprachspezifische Coding-Guidelines für große Sprachmodelle (LLMs). Dies dient der Verwaltung von Prompting und Konventionen für die KI-gestützte Entwicklung.

-   `src/app/`: Der Haupt-Quellcode-Ordner der Anwendung.
    -   `component/`: Enthält alle Standalone UI Components.
        -   `header.ts`: Der Header der Anwendung.
        -   `footer.ts`: Der Footer der Anwendung.
    -   `model/`: Enthält TypeScript Interfaces und Typ-Definitionen, die die Daten unserer Anwendung modellieren.
        -   `order.ts`: Definiert das `Order` Interface.
    -   `service/`: Enthält `injectable` Services, die Geschäftslogik, Datenzugriff und andere geteilte Funktionalitäten behandeln.
        -   `order.ts`: Ein Platzhalter-Service für die Verwaltung der Bestelldaten.

### Kerndateien

-   `src/app/app.ts`: Die Root Component der Anwendung. Sie setzt das Hauptlayout zusammen, indem sie die `HeaderComponent` und `FooterComponent` importiert und verwendet.
-   `src/styles.css`: Globale Styles und CSS-Resets.
