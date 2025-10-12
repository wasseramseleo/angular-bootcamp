### **Übung 2: State Management mit Signals**

**Ziel:** In dieser Übung modernisieren wir unsere Anwendung, indem wir das State Management von einfachen Klassen-Eigenschaften auf Angular Signals umstellen. Wir lernen, wie man veränderbare (writable) und abgeleitete (computed) Signals erstellt und wie man eine Komponente mit einem optionalen Signal-Input für die Datenannahme vorbereitet.

**Voraussetzungen:** Ihr Projekt ist auf dem Stand nach Übung 1. Der `ng serve` kann gestartet werden.

-----

### **Aufgabe 1: `OrderStatus` Enum erweitern**

Um später den Status einer Bestellung besser prüfen zu können, müssen wir unser `OrderStatus`-Enum um zwei weitere Zustände erweitern.

**Angabe:**
Öffnen Sie die Datei `src/app/model/order-status.enum.ts`. Fügen Sie die beiden neuen Status `Delivered` und `Cancelled` zum Enum hinzu.

<details>
<summary>Lösungshinweis</summary>

```typescript
export enum OrderStatus {
  Pending = 'PENDING',
  Confirmed = 'CONFIRMED',
  Shipped = 'SHIPPED',
  Delivered = 'DELIVERED', // Hinzugefügt
  Cancelled = 'CANCELLED', // Hinzugefügt
}
```

</details>

-----

### **Aufgabe 2: Den State in `DashboardPage` auf Signals umstellen**

Wir beginnen damit, den lokalen Zustand unserer `DashboardPage` reaktiv zu machen.

**Angabe:**

1.  Öffnen Sie `src/app/pages/dashboard-page.ts`.
2.  Importieren Sie `signal` aus `@angular/core`.
3.  Wandeln Sie die Klassen-Eigenschaft `orders` in ein `signal` um. Initialisieren Sie es direkt mit dem bestehenden Array von Mock-Bestellungen.
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
    { id: 101, customerName: 'ACME Corp', amount: 250.50, status: OrderStatus.Confirmed },
    { id: 102, customerName: 'Globex Inc.', amount: 1200.00, status: OrderStatus.Shipped },
    { id: 103, customerName: 'Cyberdyne', amount: 80.00, status: OrderStatus.Pending }
  ]);
  
  // 2. 'selectedOrder' ist ein neues Writable Signal
  selectedOrder = signal<Order | undefined>(undefined);

  // Der Rest der Klasse...
}
```

</details>

-----

### **Aufgabe 3: Ein `computed` Signal für die Zusammenfassung hinzufügen**

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
<h2>Aktuelle Bestellungen</h2>
<p>{{ selectionSummary() }}</p> <app-order-card></app-order-card>
```

</details>

-----

### **Aufgabe 4: `OrderCard` auf einen optionalen Signal-Input umstellen**

Jetzt bereiten wir die `OrderCard` darauf vor, Daten als Signal zu empfangen. Da wir noch kein Property Binding verwenden, stellen wir eine Fallback-Lösung für den Fall bereit, dass keine Daten übergeben werden.

**Angabe:**

1.  Öffnen Sie `src/app/component/order-card.ts`.
2.  Importieren Sie `input` und `computed` aus `@angular/core`.
3.  Entfernen Sie den alten `@Input()`-Decorator und erstellen Sie stattdessen einen neuen optionalen Input mit der `input()`-Funktion. Nennen Sie ihn `order`. Er soll vom Typ `Order | undefined` sein.
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
    status: OrderStatus.Pending
  };

  // 3. Computed Signal für die Anzeige
  displayOrder = computed(() => {
    return this.order() ?? this.mockOrder;
  });

  constructor() {
    console.log('OrderCard initialized');
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

### **Aufgabe 5: Weiteres `computed` Signal in `OrderCard`**

Zum Abschluss erstellen wir ein weiteres abgeleitetes Signal, um zu zeigen, wie nützlich sie sind.

**Angabe:**

1.  Erstellen Sie in `order-card.ts` ein neues `computed` Signal namens `isFinished`.
2.  Dieses Signal soll vom `displayOrder` Signal abhängen.
3.  Es soll `true` zurückgeben, wenn der Status von `displayOrder()` entweder `OrderStatus.Delivered` oder `OrderStatus.Cancelled` ist. In allen anderen Fällen soll es `false` zurückgeben.
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
    return currentStatus === OrderStatus.Delivered || currentStatus === OrderStatus.Cancelled;
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

</details>
