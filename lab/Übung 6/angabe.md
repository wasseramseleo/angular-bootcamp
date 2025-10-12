### **Übung 6: Navigation mit dem Angular Router**

**Ziel:** In dieser Übung werden wir unsere Anwendung um eine zweite Ansicht erweitern und die Navigation zwischen den Seiten über die URL ermöglichen. Wir werden lernen, wie man Routen konfiguriert, dynamische Routen-Parameter ausliest und Komponenten basierend auf der URL lädt. Am Ende wird unsere App eine Listenansicht und eine dedizierte Detailansicht für Bestellungen haben.

**Voraussetzungen:** Ihr Projekt ist auf dem Stand der Übung 5. Das Backend ist gestartet (`npm start`).

-----

### **Aufgabe 1: Den `OrderService` für Einzelabfragen erweitern**

Bisher kann unser Service nur die gesamte Liste an Bestellungen abrufen. Für eine Detailseite benötigen wir jedoch eine Methode, um eine einzelne Bestellung anhand ihrer ID zu laden.

**Angabe:**

1.  Öffnen Sie `src/app/service/order.service.ts`.
2.  Erstellen Sie eine neue, öffentliche Methode namens `getOrderById`.
3.  Diese Methode soll eine `id` als Parameter akzeptieren (vom Typ `string` oder `number`).
4.  Die Methode soll ein `Observable<Order>` zurückgeben.
5.  Implementieren Sie die Methode so, dass sie einen HTTP `GET`-Request an den spezifischen Endpunkt für eine einzelne Bestellung sendet (z.B. `http://localhost:3000/orders/101`). Nutzen Sie dazu Template-Literale, um die ID in die `apiUrl` einzufügen.

<details>
<summary>Lösungshinweis</summary>

```typescript
// ... imports
import { Order } from '../model/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  // ... http und apiUrl bleiben gleich ...

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  // Neue Methode
  getOrderById(id: string | number): Observable<Order> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Order>(url);
  }
}
```

</details>

-----

### **Aufgabe 2: Die `OrderDetailPage`-Komponente erstellen**

Diese neue Komponente wird für die Anzeige der Details einer einzelnen, über die URL ausgewählten Bestellung verantwortlich sein.

**Angabe:**

1.  Generieren Sie eine neue Komponente mit dem Namen `order-detail-page` im Verzeichnis `src/app/pages`.
2.  Öffnen Sie die neue Datei `order-detail-page.ts`.
3.  Injizieren Sie den `ActivatedRoute`-Service von `@angular/router` und Ihren `OrderService`. Der `ActivatedRoute`-Service enthält Informationen über die aktuell aktive Route, einschließlich der URL-Parameter.
4.  Erstellen Sie ein Signal in Ihrer Komponente, das die geladene Bestellung halten soll, z.B. `order = signal<Order | undefined>(undefined)`.
5.  Greifen Sie im `constructor` auf `this.route.params` zu. Dies ist ein Observable, das die Routen-Parameter (wie `:id`) enthält. Abonnieren Sie es mit `.subscribe()`.
6.  Innerhalb der Subscription erhalten Sie die Parameter. Extrahieren Sie die `id`.
7.  Rufen Sie mit dieser `id` Ihre neue `getOrderById`-Methode im `OrderService` auf.
8.  Da dies ebenfalls ein Observable zurückgibt, abonnieren Sie auch dieses und setzen Sie im Erfolgsfall den Wert Ihres `order`-Signals mit den empfangenen Daten.
9.  Erstellen Sie ein einfaches Template in `order-detail-page.html`, das die Details der Bestellung anzeigt. Verwenden Sie einen `@if`-Block, um den Inhalt nur dann zu rendern, wenn das `order`-Signal einen Wert hat.

<details>
<summary>Lösungshinweis</summary>

**`order-detail-page.ts`:**

```typescript
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../model/order.model';
import { OrderService } from '../../service/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-detail-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-detail-page.html',
  styleUrls: ['./order-detail-page.css']
})
export class OrderDetailPage {
  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);

  order = signal<Order | undefined>(undefined);

  constructor() {
    this.route.params.subscribe(params => {
      const orderId = params['id'];
      if (orderId) {
        this.orderService.getOrderById(orderId).subscribe(orderData => {
          this.order.set(orderData);
        });
      }
    });
  }
}
```

**`order-detail-page.html`:**

```html
@if (order(); as orderData) {
  <div class="detail-container">
    <h1>Details für Bestellung #{{ orderData.id }}</h1>
    <p><strong>Kunde:</strong> {{ orderData.customerName }}</p>
    <p><strong>Betrag:</strong> {{ orderData.amount | currency:'EUR' }}</p>
    <p><strong>Status:</strong> {{ orderData.status }}</p>
  </div>
} @else {
  <p>Lade Bestelldetails...</p>
}
```

</details>

-----

### **Aufgabe 3: Das Routing konfigurieren und aktivieren**

Jetzt müssen wir Angular mitteilen, welche Komponente bei welcher URL geladen werden soll und wie der Benutzer dorthin navigieren kann.

**Angabe:**

1.  Öffnen Sie die zentrale Routing-Konfigurationsdatei `src/app/app.routes.ts`.
2.  Definieren Sie zwei Routen im `routes`-Array:
    * Eine Route für den leeren Pfad (`path: ''`), die die `DashboardPage` lädt.
    * Eine Route für den Detail-Pfad (`path: 'order/:id'`), die Ihre neue `OrderDetailPage` lädt. Der Doppelpunkt vor `id` kennzeichnet es als dynamischen Parameter.
3.  Öffnen Sie die Haupt-Template-Datei `src/app/app.html`. Fügen Sie an der Stelle, an der die Seiteninhalte gerendert werden sollen, das `<router-outlet>`-Element ein. Dies ist der Platzhalter, den der Angular Router mit der zur URL passenden Komponente füllt.
4.  Öffnen Sie `src/app/component/order-list.html`. Machen Sie jede `OrderCard` zu einem klickbaren Link. Umschließen Sie dazu den `<app-order-card>`-Tag mit einem `<a>`-Tag und verwenden Sie die `routerLink`-Direktive, um dynamisch zur Detailseite der jeweiligen Bestellung zu navigieren (z.B. `[routerLink]="['/order', order.id]"`).

<details>
<summary>Lösungshinweis</summary>

**`app.routes.ts`:**

```typescript
import { Routes } from '@angular/router';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { OrderDetailPage } from './pages/order-detail-page/order-detail-page';

export const routes: Routes = [
  { path: '', component: DashboardPage },
  { path: 'order/:id', component: OrderDetailPage },
];
```

**`app.html`:**

```html
<main>
  <router-outlet></router-outlet>
  
  </main>
```

**`order-list.html`:**

```html
<div class="list-container">
  @for (order of orders(); track order.id) {
    <a [routerLink]="['/order', order.id]" class="order-link">
      <app-order-card 
        [order]="order"
        (selected)="orderSelected.emit($event)">
      </app-order-card>
    </a>
  }
</div>
```

*Optional: Fügen Sie in `order-list.css` `a.order-link { text-decoration: none; color: inherit; }` hinzu, um die Standard-Link-Styles zu entfernen.*

</details>

-----

### **Überprüfung**

1.  Starten Sie Ihre Anwendung. Sie sollten wie gewohnt die Dashboard-Ansicht mit der Liste der Bestellungen sehen.
2.  Klicken Sie auf eine der Bestellkarten.
3.  Die URL in Ihrem Browser sollte sich zu etwas wie `http://localhost:4200/order/101` ändern.
4.  Die `OrderDetailPage` sollte geladen werden und die spezifischen Details der angeklickten Bestellung anzeigen.
5.  Wenn Sie die URL manuell auf die Root-URL (`http://localhost:4200`) zurücksetzen, sollte wieder die Dashboard-Seite erscheinen.
