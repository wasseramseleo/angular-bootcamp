### **Übung 1: Unsere erste Komponente (OrderCard)**

**Ziel:** In dieser Übung werden wir die Grundlagen von Angular-Komponenten in der Praxis anwenden. Wir erstellen eine neue Seiten-Komponente, schachteln unsere bestehende `OrderCard` darin und geben beiden ein sauberes, statisches Layout und Styling. Das Ziel ist es, ein Gefühl für den Aufbau und das Zusammenspiel von Komponenten zu bekommen.

**Voraussetzungen:** Ihr Projekt befindet sich auf dem Stand nach der CLI-Übung (Übung 0.2). Der Entwicklungsserver (`ng serve`) kann gestartet werden.

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
2.  Fügen Sie stattdessen den Selector Ihrer neuen Seiten-Komponente ein: `<app-dashboard-page></app-dashboard-page>`.

### **Aufgabe 3: Das Layout der Dashboard-Page gestalten**

Füllen Sie die Dashboard-Seite mit Leben. Sie soll eine Überschrift und die Komponente `OrderCard` enthalten, welche zentriert dargestellt werden soll.

**Aktion in `dashboard-page.html`:**

1.  Fügen Sie eine Hauptüberschrift hinzu, z.B. `<h1>Mein Dashboard</h1>`.
2.  Fügen Sie eine Unterüberschrift für die Bestellungsliste hinzu, z.B. `<h2>Aktuelle Bestellungen</h2>`.
3.  Platzieren Sie den Selector der `OrderCard` (`<app-order-card></app-order-card>`) unterhalb der Überschriften.

**Aktion in `dashboard-page.css`:**

1.  Erstellen Sie eine Klasse (z.B. `.dashboard-container`), die Sie im HTML um Ihre Inhalte legen.
2.  Nutzen Sie CSS Flexbox, um die `app-order-card` auf der Seite horizontal zu zentrieren.
    * **Tipp:** `display: flex;`, `flex-direction: column;`, `align-items: center;`

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
  <p>Kunde: ACME Corporation</p>
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

-----

### **Überprüfung**

Wenn Sie alle Schritte korrekt umgesetzt haben, sollten Sie nach dem Starten des Entwicklungsservers (`ng serve`) folgendes im Browser sehen:

* Die `App` zeigt nur noch die `DashboardPage`.
* Die Dashboard-Seite hat eine Überschrift.
* Darunter wird eine einzelne, schön gestylte `OrderCard` angezeigt, die horizontal zentriert ist und Ihre statischen Bestelldaten anzeigt.

