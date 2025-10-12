# Angular Grundkurs: Order Management Dashboard

Willkommen zum Angular Grundkurs! Dieses Repository enthält alle notwendigen Materialien, um mit Ihnen gemeinsam eine moderne, praxisorientierte Webanwendung von Grund auf zu entwickeln.

Das Ziel dieses Grundkurses ist es, Ihnen die Kernkonzepte des modernen Angular-Frameworks (v20+) zu vermitteln. Wir werden eine kleine, aber voll funktionsfähige **Order Management Dashboard**-Anwendung erstellen, die es uns ermöglicht, Bestellungen anzuzeigen, hinzuzufügen, zu bearbeiten und zu löschen (CRUD).

## Repository-Struktur

Dieses Repository ist in drei Hauptbereiche unterteilt, um eine klare Trennung zwischen den verschiedenen Teilen des Projekts zu gewährleisten:

- `**/backend/**`
  Dieser Ordner enthält einen einfachen **Node.js/Express-Server**, der uns als Mock-Backend dient. Seine einzige Aufgabe ist es, eine REST-API bereitzustellen, die unsere Frontend-Anwendung mit Daten (Bestellungen) versorgt. Sie müssen in diesem Teil des Projekts keinen Code ändern, sondern ihn nur ausführen, damit unser Frontend Daten zum Abfragen hat.

- `**/frontend/**`
  Dies ist das Herzstück unseres Grundkurses. Der Ordner enthält das **Angular-Projekt**, in dem wir 100% unserer Zeit verbringen werden. Hier bauen wir Komponenten, Services, Formulare und alles andere, was zu einer modernen Single-Page-Application gehört.

- `**/lab/**`
  In diesem Verzeichnis finden Sie begleitende Materialien zum Kurs, wie die Präsentationsfolien oder die PDF-Versionen der Übungsangaben.

## Erste Schritte: Setup der Entwicklungsumgebung

Um am Grundkurs teilnehmen zu können, stellen Sie bitte sicher, dass die folgenden Werkzeuge auf Ihrem System installiert sind:

### Voraussetzungen

- **Node.js**: Version 20 (LTS) oder höher.
- **Code-Editor**: [Visual Studio Code](https://code.visualstudio.com/) oder [WebStorm](https://www.jetbrains.com/webstorm/) wird empfohlen.
- **Git**: Zum Klonen dieses Repositories.

### Installation

Führen Sie die folgenden Schritte in Ihrem Terminal aus, um das Projekt startklar zu machen.

**1. Repository klonen**

```bash
git clone https://github.com/wasseramseleo/angular-bootcamp.git
cd angular-bootcamp
```

**2. Backend starten**
Das Backend muss laufen, damit das Frontend Daten empfangen kann.

```bash
# In den Backend-Ordner wechseln
cd backend

# Die Abhängigkeiten installieren
npm install

# Den Server starten
npm start
```

Sie sollten die Nachricht `Server läuft auf Port 3000` sehen. Sie können dies überprüfen, indem Sie `http://localhost:3000/orders` im Browser öffnen.

**3. Frontend starten**
Öffnen Sie ein **neues Terminalfenster**, damit das Backend weiterlaufen kann.

```bash
# In den Frontend-Ordner wechseln
cd frontend

# Die Angular-Abhängigkeiten installieren (dies kann einige Minuten dauern)
npm install

# Den Angular-Entwicklungsserver starten
ng serve --open
```

Ihr Standardbrowser sollte sich automatisch öffnen und die laufende Angular-Anwendung unter `http://localhost:4200/` anzeigen.

## Lerninhalte des Grundkurses

Im Laufe der nächsten zwei Tage werden wir die folgenden Themen behandeln und praktisch umsetzen:

#### Modul 1: Grundlagen & Setup

- JavaScript & TypeScript Recap
- Einführung in das Angular-Ökosystem (Node, npm)
- Die Macht der **Angular CLI** zur Projektverwaltung und Code-Generierung

#### Modul 2: Komponenten & Templates

- Die Anatomie einer **Standalone Component**
- **Template-Syntax**: Interpolation `{{ }}` und Property Binding `[ ]`
- **Komponenten-Styling**: Gekapseltes CSS für wiederverwendbare UIs
- **Komponenten-Interaktion**: Datenübergabe mit `input()` und Events mit `output()`

#### Modul 3: Reaktive Zustandsverwaltung

- Das Konzept von **Angular Signals**
- Zustand speichern mit `signal()`
- Abgeleitete Werte mit `computed()`

#### Modul 4: Dynamische Ansichten & Navigation

- **Control Flow**: Dynamisches Rendern von HTML mit `@if`, `@switch` und `@for`
- **Angular Router**: Konfiguration von Routen, Navigation und Auslesen von URL-Parametern

#### Modul 5: Architektur & Backend-Kommunikation

- **Services & Dependency Injection**: Logik auslagern und wiederverwenden
- **HttpClient**: Daten von einem Backend abrufen (`GET`) und senden (`POST`)

#### Modul 6: Formulare & Fortgeschrittene Konzepte

- Umgang mit Benutzereingaben über **Reactive Forms**
- Formular-Validierung mit eingebauten `Validators`
- Erstellung einer eigenen **Attribut-Direktive** zur DOM-Manipulation
