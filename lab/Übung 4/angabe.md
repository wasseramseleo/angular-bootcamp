### **Übung 4: Die dynamische Listenansicht**

**Ziel:** In dieser Übung vollenden wir unsere Kernfunktionalität. Wir werden eine dedizierte `OrderList`-Komponente erstellen, die mithilfe des `@for`-Blocks eine dynamische Liste von `OrderCard`-Komponenten rendert. Außerdem implementieren wir den vollständigen reaktiven Datenfluss, sodass ein Klick auf eine Karte die Auswahl im Dashboard aktualisiert.

**Voraussetzungen:** Ihr Projekt ist auf dem Stand der Übung 3. Der `ng serve` kann gestartet werden.

-----

### **Aufgabe 1: Die `OrderList`-Komponente erstellen**

Um unsere Anwendungslogik sauber zu strukturieren, erstellen wir eine neue Komponente, die ausschließlich für die Darstellung der Bestellliste verantwortlich ist.

**Angabe:**

1.  Generieren Sie eine neue Komponente mit dem Namen `order-list` im Verzeichnis `src/app/component`.

<details>
<summary>Lösungshinweis</summary>

```bash
ng generate component component/order-list
```

</details>

-----

### **Aufgabe 2: Das `DashboardPage`-Template refaktorisieren**

Die `DashboardPage` soll sich nicht mehr um die Darstellung der Liste kümmern, sondern diese Aufgabe an die neue `OrderList`-Komponente delegieren.

**Angabe:**

1.  Öffnen Sie `src/app/pages/dashboard-page.ts`. Importieren Sie die neue `OrderList`-Komponente und fügen Sie sie zum `imports`-Array hinzu.
2.  Öffnen Sie `src/app/pages/dashboard-page.html`.
3.  Entfernen Sie die manuellen "Bestellung auswählen"-Buttons.
4.  Ersetzen Sie den bisherigen `@if`-Block, der die einzelne `<app-order-card>` angezeigt hat, durch den Selector der neuen `<app-order-list>`-Komponente.
5.  Übergeben Sie das `orders()`-Signal aus dem Dashboard per Property Binding an einen neuen Input `[orders]` der `OrderList`-Komponente.

<details>
<summary>Lösungshinweis</summary>

**`dashboard-page.ts`:**

```typescript
// ...
import { OrderCard } from '../../component/order-card/order-card';
import { OrderList } from '../../component/order-list/order-list'; // Hinzufügen

@Component({
  // ...
  imports: [CommonModule, OrderCard, OrderList], // Hinzufügen
  // ...
})
export class DashboardPage { /* ... */ }
```

**`dashboard-page.html`:**

```html
<h1>Dashboard</h1>

@if (orders().length > 0) {
  <h2>Bestellübersicht</h2>
  
  <app-order-list [orders]="orders()"></app-order-list>

  <hr>
  
  <h3>Details</h3>
  <p>{{ selectionSummary() }}</p>
  
} @else {
  <div class="placeholder">
    <p>Es sind aktuell keine Bestellungen zur Anzeige verfügbar.</p>
  </div>
}
```

</details>

-----

### **Aufgabe 3: Die `OrderList` mit `@for` implementieren**

Jetzt ist es an der Zeit, die Liste dynamisch zu rendern.

**Angabe:**

1.  Öffnen Sie `src/app/component/order-list.ts`.
2.  Erstellen Sie einen erforderlichen Signal-Input `orders` mit `input.required<Order[]>()`, um die Liste der Bestellungen vom Dashboard entgegenzunehmen.
3.  Öffnen Sie `src/app/component/order-list.html`.
4.  Implementieren Sie einen `@for`-Block, der über das `orders()`-Signal iteriert. Verwenden Sie `track order.id` zur Performance-Optimierung.
5.  Innerhalb des `@for`-Blocks rendern Sie für jede `order` in der Schleife eine `<app-order-card>`-Komponente.
6.  Binden Sie die `order`-Variable aus der Schleife an den `[order]`-Input der `OrderCard`.

<details>
<summary>Lösungshinweis</summary>

**`order-list.ts`:**

```typescript
import { Component, input } from '@angular/core';
import { Order } from '../../model/order.model';

@Component({ /* ... */ })
export class OrderList {
  orders = input.required<Order[]>();
}
```

**`order-list.html`:**

```html
<div class="list-container">
  @for (order of orders(); track order.id) {
    <app-order-card [order]="order"></app-order-card>
  }
</div>
```

</details>

-----

### **Aufgabe 4: Den reaktiven Kreislauf mit `output()` schließen**

Ein Klick auf eine Karte soll die Auswahl im Dashboard aktualisieren. Dazu müssen wir ein Event von der Karte nach oben zum Dashboard "durchreichen".

**Angabe:**

1.  **In `order-card.ts`:**
    * Erstellen Sie ein `output` namens `selected`, das ein `Order`-Objekt emittiert.
    * Fügen Sie im `@Component`-Decorator eine `host`-Property hinzu, um einen `(click)`-Listener auf dem Host-Element (`<app-order-card>`) zu registrieren. Bei einem Klick soll die `selected.emit()`-Methode mit dem Wert des `order()`-Signals aufgerufen werden.
2.  **In `order-list.ts`:**
    * Erstellen Sie ebenfalls ein `output` namens `orderSelected`, das ein `Order`-Objekt emittiert. Dies dient dazu, das Event weiterzureichen.
3.  **In `order-list.html`:**
    * Fangen Sie das `(selected)`-Event der `<app-order-card>` ab. Rufen Sie die `.emit()`-Methode Ihres `orderSelected`-Outputs auf und übergeben Sie das Event-Payload (`$event`) weiter.
4.  **In `dashboard-page.html`:**
    * Fangen Sie das `(orderSelected)`-Event der `<app-order-list>` ab und rufen Sie Ihre bereits existierende `selectOrder($event)`-Methode auf.

<details>
<summary>Lösungshinweis</summary>

**1. `order-card.ts`:**

```typescript
import { Component, computed, input, output } from '@angular/core';
import { Order } from '../../model/order.model';

@Component({
  selector: 'app-order-card',
  // ...
  host: {
    '(click)': 'onCardClick()',
  },
})
export class OrderCard {
  order = input.required<Order>();
  selected = output<Order>();
  // ...

  onCardClick(): void {
    this.selected.emit(this.order());
  }
}
```

**2. & 3. `order-list.ts` und `order-list.html`:**

```typescript
import { Component, input, output } from '@angular/core';
import { Order } from '../../model/order.model';

@Component({ /* ... */ })
export class OrderList {
  orders = input.required<Order[]>();
  orderSelected = output<Order>();
}
```

```html
<div class="list-container">
  @for (order of orders(); track order.id) {
    <app-order-card 
      [order]="order"
      (selected)="orderSelected.emit($event)">
    </app-order-card>
  }
</div>
```

**4. `dashboard-page.html`:**

```html
<app-order-list 
  [orders]="orders()"
  (orderSelected)="selectOrder($event)">
</app-order-list>
```

</details>

-----

### **Überprüfung**

Starten Sie die Anwendung.

* Sie sollten nun eine Liste aller Mock-Bestellungen sehen, die dynamisch gerendert wird.
* Wenn Sie auf eine der `OrderCard`-Komponenten in der Liste klicken, sollte der Detailbereich im Dashboard aktualisiert werden und die Informationen der angeklickten Bestellung anzeigen.
* Der gesamte Datenfluss ist nun reaktiv und korrekt implementiert. Herzlichen Glückwunsch!
