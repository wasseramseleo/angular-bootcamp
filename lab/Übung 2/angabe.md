### **Übung 2: State Management mit Signals**

**Ziel:** In dieser Übung werden wir die Grundlagen von Angular-Komponenten in der Praxis anwenden. Wir erstellen eine neue Seiten-Komponente, schachteln unsere bestehende `OrderCard` darin und geben beiden ein sauberes, statisches Layout und Styling. Das Ziel ist es, ein Gefühl für den Aufbau und das Zusammenspiel von Komponenten zu bekommen.

**Voraussetzungen:** Ihr Projekt ist auf dem Stand nach Übung 1.

-----

### **Aufgabe 1: Den State in `DashboardPage` auf Signals umstellen**

Wir beginnen damit, den lokalen Zustand unserer `DashboardPage` reaktiv zu machen.

**Angabe:**

1.  Öffnen Sie `src/app/pages/dashboard-page.ts`.
2.  Importieren Sie `signal` aus `@angular/core`.
3.  Erstellen Sie die Klassen-Eigenschaft `orders` als `signal`. Initialisieren Sie es direkt mit 3 Mock-Bestellungen.
4.  Erstellen Sie ein neues `signal` namens `selectedOrder`. Es soll eine einzelne `Order` oder `undefined` halten können und mit `undefined` initialisiert werden.

<details>
<summary>Lösungshinweis</summary>

```typescript
import { Component, signal } from '@angular/core';
import { Order } from '../../model/order.model';
import { OrderStatus } from '../../model/order-status.enum';
// ... andere imports

@Component({ /* ... */ })
export class DashboardPage {
  // 1. 'orders' ist jetzt ein Writable Signal
  orders = signal<Order[]>([
    { id: 101, customerName: 'Manner GmbH', amount: 250.50, status: OrderStatus.DELIVERED, orderDate: "2024-07-15T10:30:00Z"},
    { id: 102, customerName: 'BitPanda GmbH', amount: 1200.00, status: OrderStatus.SHIPPED, orderDate: "2024-07-15T10:30:00Z" },
    { id: 103, customerName: 'Puch OG', amount: 80.00, status: OrderStatus.PENDING, orderDate: "2024-07-15T10:30:00Z" }
  ]);
  
  // 2. 'selectedOrder' ist ein neues Writable Signal
  selectedOrder = signal<Order | undefined>(undefined);
}
```

</details>

-----

### **Aufgabe 2: Ein `computed` Signal für die Zusammenfassung hinzufügen**

Nun erstellen wir einen abgeleiteten Zustand, der auf Änderungen von `selectedOrder` reagiert.

**Angabe:**

1.  Importieren Sie `computed` aus `@angular/core` in `dashboard-page.ts`.
2.  Erstellen Sie ein neues `computed` signal namens `selectionSummary`.
3.  Die Logik dieses Signals soll sein:
    * Wenn `selectedOrder()` einen Wert hat (also nicht `undefined` ist), soll der String `"Ausgewählt: Bestellung #[ID] von [Kundenname]"` zurückgegeben werden.
    * Andernfalls soll der String `"Keine Bestellung ausgewählt."` zurückgegeben werden.
4.  Zeigen Sie den Wert des neuen Signals in `dashboard-page.html` unter der `<h2>`-Überschrift an. Denken Sie daran, dass Sie ein Signal im Template mit `()` aufrufen müssen.

<details>
<summary>Lösungshinweis</summary>

**`dashboard-page.ts`:**

```typescript
// ... imports
import { Component, signal, computed } from '@angular/core'; 
// ...

export class DashboardPage {
  // ... bestehende signals

  selectionSummary = computed(() => {
    const selected = this.selectedOrder();
    if (selected) {
      return `Ausgewählt: Bestellung #${selected.id} von ${selected.customerName}`;
    }
    return 'Keine Bestellung ausgewählt.';
  });
}
```

**`dashboard-page.html`:**

```html
<!-- Restliche Struktur -->
<h2>Aktuelle Bestellungen</h2>
<p>{{ selectionSummary() }}</p> 
<app-order-card />
<!-- Restliche Struktur -->
```

</details>

-----

### **Aufgabe 3: `OrderCard` auf einen optionalen Signal-Input umstellen**

Jetzt bereiten wir die `OrderCard` darauf vor, Daten als Signal zu empfangen. Da wir noch kein Property Binding verwenden, stellen wir eine Fallback-Lösung für den Fall bereit, dass keine Daten übergeben werden.

**Angabe:**

1.  Öffnen Sie `src/app/component/order-card.ts`.
2.  Importieren Sie `input` und `computed` aus `@angular/core`.
3.  Erstellen Sie einen neuen optionalen Input mit der `input()`-Funktion. Nennen Sie ihn `order`. Er soll vom Typ `Order | undefined` sein.
4.  Erstellen Sie ein `computed` Signal namens `displayOrder`. Dieses Signal soll prüfen, ob der `order` Input einen Wert hat (`order()`).
    * Wenn ja, soll es diesen Wert zurückgeben.
    * Wenn nein (`undefined`), soll es ein hartcodiertes Mock-`Order`-Objekt zurückgeben, damit die Karte immer etwas anzeigt.
5.  Passen Sie das Template `order-card.html` so an, dass es die Eigenschaften des `displayOrder` Signals anzeigt (z.B. `{{ displayOrder().id }}`).
6.  (Optional) Fügen Sie eine `console.log()`-Anweisung im `constructor` der `OrderCard` hinzu, um zu sehen, wann sie initialisiert wird.

<details>
<summary>Lösungshinweis</summary>

**`order-card.ts`:**

```typescript
import { Component, computed, input } from '@angular/core';
import { Order } from '../../model/order.model';
import { OrderStatus } from '../../model/order-status.enum';

@Component({ /* ... */ })
export class OrderCard {
// 1. Optionaler Signal-Input
  order = input<Order | undefined>();

  // 2. Mock-Daten als Fallback
  private mockOrder: Order = {
    id: 999,
    customerName: 'Mock Customer',
    amount: 123.45,
    status: OrderStatus.PENDING,
    orderDate: "2025-07-15T10:30:00Z"
  };

  // 3. Computed Signal für die Anzeige
  displayOrder = computed(() => {
    return this.order() ?? this.mockOrder;
  });

  constructor() {
    console.log('OrderCard initialized');
    console.log(this.order());
  }
}
```

**`order-card.html`:**

```html
<div class="card-header">
  <h3>Bestellung #{{ displayOrder().id }}</h3>
  <span>Status: {{ displayOrder().status }}</span>
</div>
<div class="card-body">
  <p>Kunde: {{ displayOrder().customerName }}</p>
  <p>Betrag: {{ displayOrder().amount }} €</p>
</div>
```

</details>

-----

### **Aufgabe 4: Weiteres `computed` Signal in `OrderCard`**

Zum Abschluss erstellen wir ein weiteres abgeleitetes Signal, um zu zeigen, wie nützlich sie sind.

**Angabe:**

1.  Erstellen Sie in `order-card.ts` ein neues `computed` Signal namens `isFinished`.
2.  Dieses Signal soll vom `displayOrder` Signal abhängen.
3.  Es soll `true` zurückgeben, wenn der Status von `displayOrder()` entweder `OrderStatus.DELIVERED` oder `OrderStatus.CANCELED` ist. In allen anderen Fällen soll es `false` zurückgeben.
4.  (Bonus) Zeigen Sie den Wert von `isFinished()` testweise in `order-card.html` an, um zu sehen, ob es funktioniert.

<details>
<summary>Lösungshinweis</summary>

**`order-card.ts`:**

```typescript
// ... in der OrderCard Klasse ...

export class OrderCard {
  // ... bestehende Signale ...

  isFinished = computed(() => {
    const currentStatus = this.displayOrder().status;
    return currentStatus === OrderStatus.DELIVERED || currentStatus === OrderStatus.CANCELED;
  });

  // ...
}
```

**`order-card.html` (Bonus):**

```html
<div class="card-footer">
  <p>Ist abgeschlossen: {{ isFinished() }}</p>
</div>
```

```css
.card-footer {
    /*
     * Eine feine Linie trennt den Body vom Footer, ähnlich wie beim Header.
     * Das sorgt für eine klare visuelle Gliederung.
     */
    border-top: 1px solid #e0e0e0;
    padding: 0.75rem 1rem; /* Etwas weniger vertikales Padding als im Body/Header. */
    background-color: #f8f9fa; /* Die gleiche helle Hintergrundfarbe wie im Header für Konsistenz. */
    text-align: right; /* Richtet den Inhalt rechts aus, oft nützlich für Aktionen oder Status-Flags. */
}

/*
 * Spezifisches Styling für den Paragraphen innerhalb des Footers.
 */
.card-footer p {
    margin: 0; /* Entfernt den Standard-Außenabstand des Paragraphen. */
    font-size: 0.85rem; /* Etwas kleinerer Text für sekundäre Informationen. */
    font-style: italic; /* Kursivschrift, um den informativen Charakter zu betonen. */
    color: #6c757d; /* Ein gedämpftes Grau, da es sich um eine Metainformation handelt. */
}
```

</details>
