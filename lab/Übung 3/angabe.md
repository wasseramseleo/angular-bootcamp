### **Übung 3: Die dynamische Komponente**

**Ziel:** In dieser Übung erwecken wir unsere Komponenten zum Leben. Wir werden den Zustand der Eltern-Komponente (`DashboardPage`) über Property Binding an die Kind-Komponente (`OrderCard`) übergeben. Anschließend nutzen wir Control-Flow-Blöcke, um unsere Ansicht intelligent auf den aktuellen Datenzustand reagieren zu lassen.

**Voraussetzungen:** Ihr Projekt ist auf dem Stand der letzten Übung (Signals). Der `ng serve` kann gestartet werden.

-----

### **Aufgabe 1: Eine Auswahl-Logik im Dashboard implementieren**

Damit wir dynamisch Daten an die `OrderCard` übergeben können, müssen wir zunächst das `selectedOrder`-Signal in der `DashboardPage` verändern können. Da wir noch keine `@for`-Schleife verwenden, erstellen wir manuell einige Buttons, um eine Bestellung auszuwählen.

**Angabe:**

1.  Öffnen Sie `src/app/pages/dashboard-page.ts`. Erstellen Sie eine Methode namens `selectOrder(order: Order)`, die das `selectedOrder`-Signal auf die übergebene Bestellung setzt.
2.  Öffnen Sie `src/app/pages/dashboard-page.html`. Fügen Sie über der `<h2>`-Überschrift einen Bereich mit drei Buttons hinzu.
3.  Jeder Button soll per `(click)`-Event die `selectOrder`-Methode aufrufen und ihr jeweils die erste, zweite und dritte Bestellung aus dem `orders()`-Signal übergeben (z.B. `orders()[0]`).

<details>
<summary>Lösungshinweis</summary>

**`dashboard-page.ts`:**

```typescript
import { Component, signal, computed } from '@angular/core';
import { Order } from '../../model/order.model';
//...

@Component({ /* ... */ })
export class DashboardPage {
  // ... bestehende signals

  // Neue Methode
  selectOrder(order: Order): void {
    this.selectedOrder.set(order);
    console.log('Selected:', this.selectedOrder());
  }

  // ...
}
```

**`dashboard-page.html`:**

```html
<div class="selection-controls">
  <h3>Bestellung auswählen:</h3>
  <button (click)="selectOrder(orders()[0])">Bestellung #101</button>
  <button (click)="selectOrder(orders()[1])">Bestellung #102</button>
  <button (click)="selectOrder(orders()[2])">Bestellung #103</button>
</div>

<hr>

<h2>Aktuelle Bestellungen</h2>
```

</details>

-----

### **Aufgabe 2: Die ausgewählte Bestellung per Property Binding übergeben**

Jetzt verbinden wir die beiden Komponenten. Die `OrderCard` soll nicht mehr ihre eigenen Mock-Daten, sondern die im Dashboard ausgewählte Bestellung anzeigen.

**Angabe:**

1.  Öffnen Sie `src/app/pages/dashboard-page.html`.
2.  Suchen Sie den `<app-order-card>`-Tag.
3.  Verwenden Sie einen `@if`-Block, um die `OrderCard` nur dann anzuzeigen, wenn eine Bestellung ausgewählt ist (d.h. `selectedOrder()` nicht `undefined` ist).
4.  Binden Sie das `selectedOrder`-Signal an den `[order]`-Input der `OrderCard`-Komponente mittels Property Binding.

<details>
<summary>Lösungshinweis</summary>

```html
<h2>Aktuelle Bestellungen</h2>
<p>{{ selectionSummary() }}</p>

@if (selectedOrder(); as order) {
  <app-order-card [order]="order"></app-order-card>
} @else {
  <p><i>Bitte wählen Sie oben eine Bestellung aus, um Details anzuzeigen.</i></p>
}
```

*Hinweis: `@if (selectedOrder(); as order)` ist eine praktische Kurzform. Sie prüft, ob `selectedOrder()` einen Wert hat und stellt diesen Wert gleichzeitig in einer lokalen Variable `order` zur Verfügung, um ihn direkt an das Input zu binden.*

</details>

-----

### **Aufgabe 3: Status-spezifische Texte mit `@switch` anzeigen**

Unsere `OrderCard` erhält nun echte Daten. Wir nutzen diese, um den angezeigten Status-Text aussagekräftiger zu machen.

**Angabe:**

1.  Öffnen Sie `src/app/component/order-card.html`.
2.  Suchen Sie die Zeile, die den Status anzeigt (`<span>Status: {{ displayOrder().status }}</span>`).
3.  Ersetzen Sie diese Zeile durch einen `@switch`-Block, der den Status des `displayOrder()`-Signals prüft.
4.  Implementieren Sie `@case`-Blöcke für die Status `Pending`, `Shipped` und `Delivered`, die jeweils einen passenden, benutzerfreundlichen Text ausgeben (z.B. "⏳ In Bearbeitung", "🚚 Versandt", "✅ Zugestellt").
5.  Fügen Sie einen `@default`-Block für alle anderen Status hinzu.

<details>
<summary>Lösungshinweis</summary>

```html
<div class="card-header">
  <h3>Bestellung #{{ displayOrder().id }}</h3>

  <span class="status">
    @switch (displayOrder().status) {
      @case ('PENDING') {
        <span>⏳ In Bearbeitung</span>
      }
      @case ('SHIPPED') {
        <span>🚚 Versandt</span>
      }
      @case ('DELIVERED') {
        <span>✅ Zugestellt</span>
      }
      @default {
        <span>- Status bestätigt -</span>
      }
    }
  </span>
</div>
```

</details>

-----

### **Aufgabe 4: Den Fall "Keine Bestellungen vorhanden" abfangen**

Was passiert, wenn unser `orders`-Signal im `DashboardPage` von Anfang an leer ist? Die Seite wäre bis auf den Titel leer. Das wollen wir verbessern.

**Angabe:**

1.  Öffnen Sie `src/app/pages/dashboard-page.html`.
2.  Umschließen Sie den gesamten Bereich, der die Auswahl-Buttons und die Bestell-Details anzeigt, mit einem `@if`-Block.
3.  Die Bedingung soll prüfen, ob das `orders()`-Array Elemente enthält (Tipp: `.length > 0`).
4.  Fügen Sie einen `@else`-Block hinzu, der eine Platzhalter-Nachricht anzeigt, wie z.B. "Es sind aktuell keine Bestellungen zur Anzeige verfügbar."

<details>
<summary>Lösungshinweis</summary>

```html
<h1>Dashboard</h1>

@if (orders().length > 0) {
  <div class="selection-controls">
    <h3>Bestellung auswählen:</h3>
    <button (click)="selectOrder(orders()[0])">Bestellung #101</button>
    <button (click)="selectOrder(orders()[1])">Bestellung #102</button>
    <button (click)="selectOrder(orders()[2])">Bestellung #103</button>
  </div>

  <hr>

  <h2>Aktuelle Bestellungen</h2>
  <p>{{ selectionSummary() }}</p>

  @if (selectedOrder(); as order) {
    <app-order-card [order]="order"></app-order-card>
  } @else {
    <p><i>Bitte wählen Sie oben eine Bestellung aus, um Details anzuzeigen.</i></p>
  }

} @else {
  <div class="placeholder">
    <p>Es sind aktuell keine Bestellungen zur Anzeige verfügbar.</p>
  </div>
}
```

</details>

-----

### **Überprüfung**

Starten Sie die Anwendung mit `ng serve`.

* Zuerst sollte die Aufforderung "Bitte wählen Sie eine Bestellung aus..." erscheinen.
* Wenn Sie auf einen der Buttons klicken, sollte die `OrderCard` mit den Daten der entsprechenden Bestellung erscheinen.
* Der angezeigte Status-Text in der Karte sollte sich je nach Bestellung ändern und benutzerfreundlich sein.
* Testen Sie den Fall aus Aufgabe 4, indem Sie das `orders`-Array in `dashboard-page.ts` testweise leeren und neu laden. Nun sollte die Platzhalter-Meldung erscheinen.
