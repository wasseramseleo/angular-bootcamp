### **Übung 5: `HttpClient` Setup & der erste Backend-Request**

**Ziel:** In dieser Übung verbessern wir die Architektur unserer Anwendung fundamental. Zuerst lagern wir die Datenlogik aus unserer `DashboardPage` in den `OrderService` aus. Danach bereiten wir den Service auf echte Backend-Kommunikation vor, indem wir den `HttpClient` konfigurieren und injizieren.

**Voraussetzungen:** Ihr Projekt ist auf dem Stand der Übung 4. Das Backend ist gestartet (`npm start`).

-----

### **Aufgabe 1: Den `HttpClient` aufsetzen und im `OrderService` einbinden**

Hier statten wir unseren `OrderService` mit der Fähigkeit aus, HTTP-Anfragen zu stellen.

**Angabe:**

1. Setzen Sie den `HttpClient` auf wie in der [Dokumentation](https://angular.dev/guide/http/setup) beschrieben.
2. Nutzen Sie Dependency Injection, um den `HttpClient` im `OrderService` verfügbar zu machen.

<details>
<summary>Lösungshinweis</summary>

**`app.config.ts`:**

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    //...
    provideHttpClient(),
  ]
};
```
**`order-service.ts`:**

```typescript

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  // HttpClient injizieren
  private http = inject(HttpClient);

  constructor() {}

  getOrders(): Order[] {
    return this.orders;
  }
}
```

</details>

-----

### **Aufgabe 2: Die Funktion `getOrders()` im `OrderService` implementieren**

Jetzt bringen wir unserem `OrderService` bei, wie man mit dem Backend spricht.

**Angabe:**

1. Implementieren Sie `getOrders()` im `OrderService`. Nutzen Sie dafür den Backend-Endpunkt `'http://localhost:3000/orders'`.
2. `getOrders()` retourniert die Antwort verschachtelt in einem `Observable`.


<details>
<summary>Lösungshinweis</summary>

**`order-service.ts`:**

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/orders';

  constructor() {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }
}
```

</details>

-----

### **Aufgabe 3: Das Dashboard mit dem Service verbinden**

Jetzt, da der Service die Daten bereitstellt, muss die `DashboardPage` ihn nur noch anfordern und nutzen.

**Angabe:**

1. Nutzen Sie Dependency Injection, um den `OrderService` in der `DashboardPage` verfügbar zu machen.
2. Ändern Sie die Logik in der `DashboardPage` so, dass anstatt der Mock-Bestelldaten das Ergebnis aus dem Backend angezeigt wird. 
 
<details>
<summary>Lösungshinweis</summary>

**`dashboard-page.ts`:**

```typescript
@Component({ /* ... */ })
export class DashboardPage {
  orders = signal<Order[]>([]);

  private orderService = inject(OrderService);

  constructor() {
    this.orderService.getOrders().subscribe(orders => {
      this.orders.set(orders);
    });
  }
}
```

</details>

-----

### **Überprüfung**

Starten Sie die Anwendung.

* Sie sollten nun eine Liste aller Bestellungen sehen, die im Backend gespeichert sind.
* Stoppen Sie das Backend. Nach Page-Reload sollte folgender Text angezeigt werden: "Es sind aktuell keine Bestellungen zur Anzeige verfügbar."
