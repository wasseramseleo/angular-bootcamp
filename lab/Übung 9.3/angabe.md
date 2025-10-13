### **Übung 9.3: Component Libraries (Angular Material)**

**Ziel:** In dieser Übung werden wir den Prozess der Integration einer externen Component Library in unser Projekt durchlaufen. Anstatt jedes UI-Element von Grund auf neu zu stylen, nutzen wir die professionell gestalteten, wiederverwendbaren und barrierefreien Komponenten von Angular Material. Unser Ziel ist es, eine neue Seite zu erstellen, die unsere Bestelldaten in einer leistungsstarken, sortierbaren Datentabelle (`MatTable`) anzeigt.

**Voraussetzungen:** Ihr Projekt ist auf dem Stand der Übung 9.2 (Guards).

-----

### **Aufgabe 1: Angular Material zum Projekt hinzufügen**

Der erste Schritt ist, Angular Material als Abhängigkeit zu unserem Projekt hinzuzufügen und es zu konfigurieren. Die Angular CLI macht diesen Prozess durch den `ng add`-Befehl sehr einfach.

**Angabe:**

1.  Führen Sie den Befehl aus, um Angular Material zu Ihrem Projekt hinzuzufügen.
2.  Folgen Sie den interaktiven Anweisungen in Ihrem Terminal, um ein Theme auszuwählen, globale Typografie-Stile einzurichten und Browser-Animationen zu aktivieren.
3.  Eine detaillierte Anleitung finden Sie im offiziellen "Getting Started"-Guide von Angular Material: [Angular Material Getting Started Guide](https://material.angular.dev/guide/getting-started)

<details>
<summary>Lösungshinweis</summary>

Führen Sie diesen Befehl im Terminal im Hauptverzeichnis Ihres `frontend`-Projekts aus:

```bash
ng add @angular/material
```

Wählen Sie in den Prompts Ihre bevorzugten Optionen (z.B. "Indigo/Pink", "Yes" für Typografie, "Include and enable animations").

</details>

-----

### **Aufgabe 2: Eine neue `OrderTablePage` erstellen und verlinken**

Wir erstellen eine neue, dedizierte Seite für unsere Material-Tabelle und machen sie über die Hauptnavigation erreichbar.

**Angabe:**

1.  Generieren Sie eine neue Komponente mit dem Namen `order-table-page` im Verzeichnis `src/app/pages`.
2.  Fügen Sie in `app.routes.ts` eine neue Route für den Pfad `orders-table` hinzu, die diese neue Komponente lädt.
3.  Erweitern Sie die Navigation in Ihrem Header-Template (`app.html` oder `header.component.html`), indem Sie einen neuen `routerLink` hinzufügen, der auf den Pfad `/orders-table` verweist.

<details>
<summary>Lösungshinweis</summary>

**1. Kommando zum Generieren:**

```bash
ng generate component pages/order-table-page
```

**2. `app.routes.ts`:**

```typescript
export const routes: Routes = [
  // ... bestehende Routen
  { path: 'orders-table', component: OrderTablePage },
  // ...
];
```

**3. Header-Template:**

```html
<header class="main-header">
  <nav>
    <a routerLink="/" ...>Dashboard</a>
    <a routerLink="/add-order" ...>Neue Order</a>
    <a routerLink="/orders-table" routerLinkActive="active">Order Tabelle</a> </nav>
</header>
```

</details>

-----

### **Aufgabe 3: Die `MatTable` mit sortierbaren Spalten implementieren**

Dies ist die Kernaufgabe. Sie sollen nun selbstständig die `MatTable`-Komponente nutzen, um die Bestelldaten darzustellen. Die offizielle Dokumentation von Angular Material ist hierbei Ihr wichtigstes Werkzeug.

**Anforderungen:**

1.  **Daten laden:** Die `OrderTablePage` soll die `getOrders()`-Methode des `OrderService` verwenden, um die Bestelldaten abzurufen.
2.  **Tabelle anzeigen:** Die abgerufenen Daten sollen in einer `MatTable` dargestellt werden.
3.  **Spalten definieren:** Die Tabelle soll mindestens die Spalten `ID`, `Kundenname`, `Betrag` und `Status` anzeigen.
4.  **Sortierung aktivieren:** Alle Spalten sollen für den Benutzer durch einen Klick auf den Spalten-Header auf- und absteigend sortierbar sein.

**Ressourcen:**
Die offizielle Dokumentation bietet hervorragende, kopierbare Beispiele, die alle notwendigen Konzepte demonstrieren. Konzentrieren Sie sich auf das Beispiel **"Table with sorting"**.

* **Offizielle `MatTable`-Beispiele:** [https://material.angular.dev/components/table/examples](https://material.angular.dev/components/table/examples)

**Hinweise zur Implementierung:**

* Sie müssen die benötigten Material-Module (`MatTableModule`, `MatSortModule` etc.) in Ihre `OrderTablePage` importieren.
* Verwenden Sie `MatTableDataSource`, um Ihre Daten mit der Tabelle zu verbinden.
* Nutzen Sie `@ViewChild` in Ihrer Komponenten-Klasse, um eine Referenz auf die `MatSort`-Direktive aus dem Template zu erhalten.
* Die Verbindung zwischen dem Sorter und der Datenquelle wird typischerweise in der `ngAfterViewInit`-Lifecycle-Hook hergestellt.

<details>
<summary>Lösungshinweis</summary>

**`order-table-page.ts`:**

```typescript
@Component({
  selector: 'app-order-table-page',
  standalone: true,
  imports: [MatTableModule, MatSortModule],
  templateUrl: './order-table-page.html',
  styleUrls: ['./order-table-page.css']
})
export class OrderTablePage implements AfterViewInit {
  private orderService = inject(OrderService);

  displayedColumns: string[] = ['id', 'customerName', 'amount', 'status'];
  dataSource = new MatTableDataSource<Order>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.orderService.getOrders().subscribe(orders => {
      this.dataSource.data = orders;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
```

**`order-table-page.html`:**

```html
<div class="table-container">
  <h1>Bestellungen</h1>

  <table mat-table [dataSource]="dataSource" matSort>

    <ng-container matColumnDef="id">
      <th mat-header-cell *matHeaderCellDef mat-sort-header> ID </th>
      <td mat-cell *matCellDef="let order"> {{order.id}} </td>
    </ng-container>

    <ng-container matColumnDef="customerName">
      <th mat-header-cell *matHeaderCellDef mat-sort-header> Kunde </th>
      <td mat-cell *matCellDef="let order"> {{order.customerName}} </td>
    </ng-container>

    <ng-container matColumnDef="amount">
      <th mat-header-cell *matHeaderCellDef mat-sort-header> Betrag </th>
      <td mat-cell *matCellDef="let order"> {{order.amount | currency:'EUR'}} </td>
    </ng-container>

    <ng-container matColumnDef="status">
      <th mat-header-cell *matHeaderCellDef mat-sort-header> Status </th>
      <td mat-cell *matCellDef="let order"> {{order.status}} </td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  </table>
</div>
```

**`order-table-page.css`:**

```css
.table-container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 1rem;
}
table {
  width: 100%;
}
```

</details>

-----

### **Überprüfung**

1.  Starten Sie Ihre Anwendung und navigieren Sie zur neuen "Order Tabelle"-Seite.
2.  Die Tabelle sollte mit den Daten vom Backend gefüllt sein.
3.  Klicken Sie auf die verschiedenen Spalten-Header (ID, Kunde, etc.). Die Daten in der Tabelle sollten sich entsprechend auf- oder absteigend sortieren.
