### **Übung 4: Die dynamische Listenansicht**

**Ziel:** In dieser Übung vollenden wir unsere Kernfunktionalität. Wir werden eine dedizierte `OrderList`-Komponente erstellen, die mithilfe des `@for`-Blocks eine dynamische Liste von `OrderCard`-Komponenten rendert.

**Voraussetzungen:** Ihr Projekt ist auf dem Stand der Übung 3.

-----

### **Aufgabe 1: Die `OrderList`-Komponente erstellen**

Um unsere Anwendungslogik sauber zu strukturieren, erstellen wir eine neue Komponente, die ausschließlich für die Darstellung der Bestellliste verantwortlich ist.

**Angabe:**

1.  Generieren Sie eine neue Komponente mit dem Namen `order-list` im Verzeichnis `src/app/component`.

<details>
<summary>Lösungshinweis</summary>

```bash
ng g c component/order-list
```

</details>

-----

### **Aufgabe 2: Das `DashboardPage`-Template Refactoring**

Die `DashboardPage` soll sich nicht mehr um die Darstellung der Liste kümmern, sondern diese Aufgabe an die neue `OrderList`-Komponente delegieren.

**Angabe:**

1.  Ändern Sie die `DashboardPage` so, dass anstatt der einzelnen `<app-order-card />` nun `<app-order-list />` genutzt wird.
2.  `DashboardPage` versorgt `<app-order-list />` mit orders via `input` Property Binding.
3. Die `selectedOrder` & `selectionSummary`-Logik wandert ebenfalls in die `<app-order-list />` Komponente.

<details>
<summary>Lösungshinweis</summary>

**`dashboard-page.ts`:**

```typescript
@Component({
  selector: 'app-dashboard-page',
  imports: [
    OrderList
  ],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css'
})
export class DashboardPage {
  orders = signal<Order[]>([
    { id: 101, customerName: 'Manner GmbH', amount: 250.50, status: OrderStatus.DELIVERED, orderDate: "2025-07-15T10:30:00Z"},
    { id: 102, customerName: 'BitPanda GmbH', amount: 1200.00, status: OrderStatus.SHIPPED, orderDate: "2025-07-15T10:30:00Z" },
    { id: 103, customerName: 'Puch OG', amount: 80.00, status: OrderStatus.PENDING, orderDate: "2025-07-15T10:30:00Z" }
  ]);
}
```

**`dashboard-page.html`:**

```html
<div class="dashboard-container">
  <h1>Dashboard</h1>
  <app-order-list [orders]="orders()"/>
</div>
```

</details>

-----

### **Aufgabe 3: Die `OrderList` mit `@for` implementieren**

Jetzt ist es an der Zeit, die Liste dynamisch zu rendern.

**Angabe:**

1. Implementieren Sie einen `@for`-Block, der über das `orders()`-Signal iteriert. Verwenden Sie `track order.id`. 
2. Innerhalb des `@for`-Blocks rendern Sie für jede `order` in der Schleife eine `<app-order-card>`-Komponente. 
3. Binden Sie die `order`-Variable aus der Schleife an den `[order]`-Input der `OrderCard`.

<details>
<summary>Lösungshinweis</summary>

**`order-list.ts`:**

```typescript
export class OrderList {
  orders = input<Order[]>([]);
  selectedOrder = signal<Order | undefined>(undefined);

  selectionSummary = computed(() => {
    const selected = this.selectedOrder();
    if (selected) {
      return `Ausgewählt: Bestellung #${selected.id} von ${selected.customerName}`;
    }
    return 'Keine Bestellung ausgewählt.';
  });

  onOrderCardClicked(order: Order) {
    this.selectedOrder.set(order);
  }
}
```

**`order-list.html`:**

```html
@if (orders().length > 0) {
<h2>Aktuelle Bestellungen</h2>
<p>{{ selectionSummary() }}</p>
@for (order of orders(); track order.id) {
<app-order-card [order]="order" (click)="onOrderCardClicked(order)"></app-order-card>
}

} @else {
<div class="placeholder">
  <p>Es sind aktuell keine Bestellungen zur Anzeige verfügbar.</p>
</div>
}

```

</details>
