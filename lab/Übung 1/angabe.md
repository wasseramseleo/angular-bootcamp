### **Übung 1: Unsere erste Komponente (OrderCard)**

**Ziel:** In dieser Übung werden wir die Grundlagen von Angular-Komponenten in der Praxis anwenden. Wir erstellen eine neue Seiten-Komponente, schachteln unsere bestehende `OrderCard` darin und geben beiden ein sauberes, statisches Layout und Styling. Das Ziel ist es, ein Gefühl für den Aufbau und das Zusammenspiel von Komponenten zu bekommen.

**Voraussetzungen:** Ihr Projekt befindet sich auf dem Stand nach der CLI-Übung (Übung 0.2).

-----

### **Aufgabe 1: Eine "Page Component" erstellen**

Es ist eine bewährte Methode, für jede "Seite" oder Hauptansicht einer Anwendung eine eigene Komponente zu erstellen. Wir erstellen nun eine solche Komponente für unser Dashboard.

**Aktion:** Generieren Sie eine neue Komponente mit dem Namen `dashboard-page` im Verzeichnis `src/app/pages`.
<details>
  <summary>Lösungshinweis</summary>

```bash
ng generate component pages/dashboard-page
```
</details>


### **Aufgabe 2: Die Dashboard-Page in die `App` integrieren**

Die Komponente `App` dient als Haupt-Container der Anwendung. Anstatt dort direkt Inhalte wie den Willkommenstext anzuzeigen, soll sie nun die neue `DashboardPage` rendern.

**Aktion in `app.ts`:**

1.  Importieren Sie Ihre neu erstellte `DashboardPage`.
2.  Fügen Sie die `DashboardPage` zum `imports`-Array des `@Component`-Decorators hinzu, damit das Template sie verwenden kann.

**Aktion in `app.html`:**

1.  Entfernen Sie den bisherigen Willkommenstext (`<h2>Willkommen...</h2>` und `<p>...</p>`).
2.  Fügen Sie stattdessen den Selector Ihrer neuen Seiten-Komponente ein: `<app-dashboard-page />`.

### **Aufgabe 3: Das Layout der Dashboard-Page gestalten**

Füllen Sie die Dashboard-Seite mit Leben. Sie soll eine Überschrift und die Komponente `OrderCard` enthalten, welche zentriert dargestellt werden soll.

**Aktion in `dashboard-page.html`:**

1.  Fügen Sie eine Hauptüberschrift hinzu, z.B. `<h1>Dashboard</h1>`.
2.  Fügen Sie eine Unterüberschrift für die Bestellungsliste hinzu, z.B. `<h2>Aktuelle Bestellungen</h2>`.
3.  Platzieren Sie den Selector der `OrderCard` (`<app-order-card />`) unterhalb der Überschriften.

**Aktion in `dashboard-page.css`:**

1.  Erstellen Sie eine Klasse (z.B. `.dashboard-container`), die Sie im HTML um Ihre Inhalte legen.
2.  Nutzen Sie CSS Flexbox, um die `app-order-card` auf der Seite horizontal zu zentrieren.

<details>
  <summary>Beispielstruktur</summary>

```css
.dashboard-container {
display: flex;
flex-direction: column;
align-items: center;
}
```
</details>

### **Aufgabe 4: Die OrderCard mit statischen Daten befüllen**

Für den Start befüllen wir unsere `OrderCard` direkt im HTML mit statischen Werten.

**Aktion in `order-card.html`:**
Strukturieren Sie das Template so, dass es die Informationen einer Bestellung anzeigt.

<details>
  <summary>Beispielstruktur</summary>

```html
<div class="card-header">
  <h3>Bestellung #101</h3>
  <span>Status: Shipped</span>
</div>
<div class="card-body">
  <p>Kunde: Manner GmbH</p>
  <p>Betrag: 299,95 €</p>
</div>
```
</details>

### **Aufgabe 5: Die OrderCard stylen**

Geben Sie der Karte ein ansprechendes Aussehen.

**Aktion in `order-card.css`:**
Nutzen Sie den `:host`-Selektor, um den Container der Karte zu gestalten, und normale Selektoren für die inneren Elemente.

<details>
  <summary>Anregungen</summary>

* **`:host`**: Geben Sie dem Container einen Rahmen (`border`), etwas Innenabstand (`padding`), abgerundete Ecken (`border-radius`) und einen leichten Schatten (`box-shadow`), damit er sich vom Hintergrund abhebt. Setzen Sie eine feste Breite (`width`).
* **Header (`.card-header`)**: Nutzen Sie Flexbox (`display: flex`, `justify-content: space-between`), um Titel und Status an entgegengesetzte Enden zu rücken. Geben Sie ihm eine Hintergrundfarbe.
* **Schriftarten**: Wählen Sie passende Schriftgrößen und -stärken für die verschiedenen Textelemente.
* **Hover-Effekt**: Fügen Sie einen `:host:hover`-Effekt hinzu, der zum Beispiel den Schatten subtil verstärkt oder die Rahmenfarbe ändert, um Interaktivität zu signalisieren.

</details>

<details>
  <summary>Beispielstyling</summary>

```css
/*
* :host ist ein spezieller Selektor, der das Host-Element der Komponente
* selbst stylt – in unserem Fall das <app-order-card>-Tag.
  */
  :host {
  /*
  * 'display: block' ist wichtig, damit das Element wie ein Container behandelt
  * wird und Eigenschaften wie 'width' und 'margin' korrekt angewendet werden.
  */
  display: block;
  width: 400px; /* Eine feste Breite für eine konsistente Darstellung. */
  border: 1px solid #e0e0e0; /* Ein dezenter, hellgrauer Rahmen. */
  border-radius: 8px; /* Moderne, abgerundete Ecken. */
  background-color: #ffffff; /* Weißer Hintergrund. */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* Ein sehr subtiler Schatten für einen leichten 3D-Effekt. */

  /* 'overflow: hidden' stellt sicher, dass der Hintergrund des Headers von den abgerundeten Ecken abgeschnitten wird. */
  overflow: hidden;

  /* 'transition' sorgt dafür, dass sich Änderungen (z.B. beim Hover) flüssig anfühlen. */
  transition: all 0.2s ease-in-out;
  }

  /*
  * Der :host:hover-Effekt wird aktiv, wenn die Maus über die Komponente bewegt wird.
  * Er signalisiert dem Benutzer Interaktivität.
  */
  :host:hover {
  cursor: pointer; /* Der Mauszeiger wird zur Hand, was Klickbarkeit anzeigt. */
  border-color: #0f172a; /* Die Rahmenfarbe ändert sich zu einem primären Blau. */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Der Schatten wird stärker, was die Karte "anhebt". */
  transform: translateY(-2px); /* Eine leichte Bewegung nach oben verstärkt den Schwebe-Effekt. */
  }

  /* Styling für den Header-Bereich der Karte. */
  .card-header {
  display: flex; /* Aktiviert Flexbox für die Ausrichtung der Kind-Elemente. */
  justify-content: space-between; /* Platziert die Elemente an den entgegengesetzten Enden. */
  align-items: center; /* Zentriert die Elemente vertikal. */

  background-color: #f8f9fa; /* Ein sehr helles Grau, um den Header visuell abzuheben. */
  padding: 1rem; /* 16px Innenabstand. */
  border-bottom: 1px solid #e0e0e0; /* Eine feine Linie trennt Header und Body. */
  }

  /* Styling für den Hauptinhaltsbereich der Karte. */
  .card-body {
  padding: 1rem; /* Gleicher Innenabstand wie im Header für Konsistenz. */
  }

  /*
  * Schriftarten-Anpassungen
  */

  /* Spezifische Styles für die h3-Überschrift im Header. */
  .card-header h3 {
  margin: 0; /* Entfernt den Standard-Außenabstand der Überschrift. */
  font-size: 1.15rem; /* Etwas größer als der Standardtext. */
  color: #333;
  }

  /* Spezifische Styles für den Status-Text im Header. */
  .card-header span {
  font-size: 0.9rem;
  font-weight: 500;
  color: #555;
  background-color: #e9ecef;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  }

  /* Styles für die Paragraphen im Body-Bereich. */
  .card-body p {
  margin: 0.5rem 0; /* Etwas vertikaler Abstand zwischen den Zeilen. */
  color: #444;
  }

  /* Entfernt den überflüssigen Abstand beim ersten und letzten Paragraphen. */
  .card-body p:first-child {
  margin-top: 0;
  }

  .card-body p:last-child {
  margin-bottom: 0;
  }

```
</details>

-----

### **Überprüfung**

Wenn Sie alle Schritte korrekt umgesetzt haben, sollten Sie nach dem Starten des Entwicklungsservers (`ng serve`) folgendes im Browser sehen:

* Die `App` zeigt nur noch die `DashboardPage`.
* Die Dashboard-Seite hat eine Überschrift.
* Darunter wird eine einzelne, schön gestylte `OrderCard` angezeigt, die horizontal zentriert ist und Ihre statischen Bestelldaten anzeigt.

