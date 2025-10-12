# Übung 0: Projekt-Setup & erste Schritte

**Ziel:** In dieser ersten Übung bringen wir unsere Entwicklungsumgebung zum Laufen. Wir werden die Dependencies für das Backend und das Frontend installieren, beide Server starten und eine erste kleine Code-Änderung vornehmen, um zu bestätigen, dass alles korrekt funktioniert.

-----

### Aufgabe 1: Backend starten

Das Backend ist unsere Mock-API, die uns mit Daten versorgt.

1.  **Terminal öffnen:** Öffnen Sie ein neues Terminal direkt in Ihrer IDE (WebStorm: `Terminal`-Tab unten; VS Code: `Terminal > New Terminal`).

2.  **Verzeichnis wechseln:** Navigieren Sie in den `backend`-Ordner.

    ```bash
    cd backend
    ```

3.  **Dependencies installieren:** Führen Sie den folgenden Befehl aus. npm lädt nun alle Pakete herunter, die in der `package.json` definiert sind.

    ```bash
    npm install
    ```

4.  **Server starten:** Starten Sie den API-Server.

    ```bash
    npm start
    ```

    Sie sollten die Nachricht `Mock API server is running on http://localhost:3000` im Terminal sehen. **Lassen Sie dieses Terminal geöffnet\!**

5.  **Überprüfung:** Öffnen Sie einen Webbrowser und rufen Sie die Adresse `http://localhost:3000/orders` auf. Sie sollten eine Liste von Bestellungen im JSON-Format sehen.

-----

### Aufgabe 2: Frontend starten

Das Frontend ist unsere Angular-Anwendung, die wir im Laufe des Kurses entwickeln werden.

1.  **Neues Terminal öffnen:** Öffnen Sie ein **zweites** Terminal in Ihrer IDE. Es ist wichtig, ein neues zu verwenden, damit der Backend-Server im ersten weiterlaufen kann.

2.  **Verzeichnis wechseln:** Navigieren Sie in den `frontend`-Ordner.

    ```bash
    cd frontend
    ```

3.  **Dependencies installieren:** Wie beim Backend installieren wir auch hier die nötigen Pakete.

    ```bash
    npm install
    ```

4.  **Entwicklungsserver starten:** Starten Sie den Angular-Entwicklungsserver mit dem Angular CLI Befehl.

    ```bash
    ng serve
    ```

    Warten Sie, bis der Kompilierungsprozess abgeschlossen ist. Sie sehen eine Nachricht, dass die Anwendung unter `http://localhost:4200/` verfügbar ist.

5.  **Überprüfung:** Öffnen Sie `http://localhost:4200/` in Ihrem Browser. Sie sollten die Startseite des "Order Management Dashboard" mit Header und Footer sehen.

-----

### Aufgabe 3: Die erste Code-Änderung

Jetzt, wo alles läuft, ändern wir eine Kleinigkeit im Code, um den Development-Workflow zu sehen.

1.  **Component-Klasse öffnen:** Öffnen Sie die Datei `frontend/src/app/app.component.ts`.

2.  **Property hinzufügen:** Fügen Sie eine neue Eigenschaft (Property) zur `AppComponent` Klasse hinzu.

    ```typescript
    export class AppComponent {
      title = 'order-management-dashboard';
      bootcampName = 'Angular 20 Bootcamp'; // <-- Diese Zeile hinzufügen
    }
    ```

3.  **Template öffnen:** Öffnen Sie die zugehörige Template-Datei `frontend/src/app/app.component.html`.

4.  **Interpolation verwenden:** Ändern Sie die `<h2>`-Überschrift so ab, dass sie die neue Eigenschaft aus der Klasse verwendet.

    ```html
    <h2>Welcome to the Bootcamp!</h2>

    <h2>Willkommen zum {{ bootcampName }}!</h2>
    ```

5.  **Überprüfung:** Speichern Sie beide Dateien. Wechseln Sie zum Browser-Tab mit Ihrer Anwendung. Angular sollte die Seite automatisch neu geladen haben und die neue Überschrift "Willkommen zum Angular 20 Bootcamp\!" anzeigen.
