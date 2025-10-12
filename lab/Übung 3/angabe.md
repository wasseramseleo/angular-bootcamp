### **Übung 3: Die dynamische Komponente**

**Ziel:** In dieser Übung erwecken wir unsere Komponenten zum Leben. Wir werden den Zustand der Eltern-Komponente (`DashboardPage`) über Property Binding an die Kind-Komponente (`OrderCard`) übergeben. Anschließend nutzen wir Control-Flow-Blöcke, um unsere Ansicht intelligent auf den aktuellen Datenzustand reagieren zu lassen.

**Voraussetzungen:** Ihr Projekt ist auf dem Stand nach Übung 2.

-----

### **Aufgabe 1: Status-spezifische Texte mit `@switch` anzeigen**

Unsere `OrderCard` erhält nun echte Daten. Wir nutzen diese, um den angezeigten Status-Text aussagekräftiger zu machen.

**Angabe:**

1.  Öffnen Sie `src/app/component/order-card.html`.
2.  Suchen Sie die Zeile, die den Status anzeigt (`<span>Status: {{ displayOrder().status }}</span>`).
3.  Ersetzen Sie diese Zeile durch einen `@switch`-Block, der den Status des `displayOrder()`-Signals prüft.
4.  Implementieren Sie `@case`-Blöcke für die Status `PENDING`, `SHIPPED`, `DELIVERED` und `CANCELED` jeweils einen passenden, benutzerfreundlichen Text ausgeben (z.B. "⏳ In Bearbeitung", "🚚 Versandt", "✅ Zugestellt").

<details>
<summary>Lösungshinweis</summary>

```html
<div class="card-header">
  <h3>Bestellung #{{ displayOrder().id }}</h3>

  <span class="status">
    @switch (displayOrder().status) {
      @case (OrderStatus.PENDING) {
        <span>⏳ In Bearbeitung</span>
      }
      @case (OrderStatus.SHIPPED) {
        <span>🚚 Versandt</span>
      }
      @case ('OrderStatus.DELIVERED') {
        <span>✅ Zugestellt</span>
      }
      @case (OrderStatus.CANCELED) {
        <span>❌ Storniert</span>
      }
    }
  </span>
</div>
```

</details>

-----

### **Aufgabe 2: Den Fall "Keine Bestellungen vorhanden" abfangen**

Was passiert, wenn unser `orders`-Signal im `DashboardPage` von Anfang an leer ist? Die Seite wäre bis auf den Titel leer. Das wollen wir verbessern.

**Angabe:**

1.  Öffnen Sie `src/app/pages/dashboard-page.html`.
2.  Umschließen Sie den gesamten Bereich, der die Auswahl-Buttons und die Bestell-Details anzeigt, mit einem `@if`-Block.
3.  Die Bedingung soll prüfen, ob das `orders()`-Array Elemente enthält.
4.  Übergeben Sie dem `app-order-card` die erste Order von `orders()` als input parameter.
5.  Fügen Sie einen `@else`-Block hinzu, der eine Platzhalter-Nachricht anzeigt, wie z.B. "Es sind aktuell keine Bestellungen zur Anzeige verfügbar."

<details>
<summary>Lösungshinweis</summary>

**`dashboard-page.html`:**

```html
<div class="dashboard-container">
  <h1>Dashboard</h1>

  @if (orders().length > 0) {
  <h2>Aktuelle Bestellungen</h2>
  <p>{{ selectionSummary() }}</p>

  <app-order-card [order]="orders()[0]" />

  } @else {
  <div class="placeholder">
    <p>Es sind aktuell keine Bestellungen zur Anzeige verfügbar.</p>
  </div>
  }
</div>
```

</details>

-----

### **Aufgabe 3: Auf Order-Auswahl reagieren**

Nun nutzen wir das Signal `selectedOrder` um ein Output-Event der `OrderCard` abzubilden.

**Angabe:**

1.  Erstellen Sie eine neue Funktion `onOrderCardClicked` in `dashboard-page.ts`, die eine `Order` als Input-Parameter erwartet und `selectedOrder` Signal auf diese `Order` setzt. 
2.  Nutzen Sie das built-in Output Event `(click)` der `<app-order-card />` um die soeben erstellte Methode aufzurufen.

<details>
<summary>Lösungshinweis</summary>

**`dashboard-page.ts`:**


```typescript
export class DashboardPage {
  //...
  onOrderCardClicked(order: Order) {
    this.selectedOrder.set(order);
  }
}
```

**`dashboard-page.html`:**


```html
<app-order-card (click)="onOrderCardClicked(orders()[0])" [order]="orders()[0]" />
```

</details>
