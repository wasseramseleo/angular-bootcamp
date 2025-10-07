# Mock-API für das Order Management

## Beschreibung

Dies ist ein einfacher Mock-API-Server, der mit Node.js/Express für das Angular 20 Bootcamp erstellt wurde. Er simuliert ein Backend, indem er RESTful Endpoints für CRUD-Operationen (Create, Read, Update, Delete) auf einer Liste von Bestellungen (Orders) bereitstellt, die in einer `db.json`-Datei gespeichert sind.

Dieser Server ist für die lokale Entwicklung und für Schulungszwecke vorgesehen.

## Installation

1.  Navigieren Sie in dieses Backend-Projektverzeichnis.
2.  Installieren Sie die erforderlichen Dependencies mit npm:
    ```bash
    npm install
    ```

## Starten des Servers

1.  Führen Sie aus diesem Verzeichnis das Start-Skript aus:
    ```bash
    npm start
    ```
2.  Die API ist anschließend unter `http://localhost:3000` erreichbar.

---

### Verfügbare Endpoints

-   `GET /orders` - Ruft alle Bestellungen ab.
-   `GET /orders/:id` - Ruft eine einzelne Bestellung anhand ihrer ID ab.
-   `POST /orders` - Erstellt eine neue Bestellung.
-   `PUT /orders/:id` - Aktualisiert eine bestehende Bestellung.
-   `DELETE /orders/:id` - Löscht eine Bestellung.
