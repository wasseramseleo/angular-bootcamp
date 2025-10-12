### **Übung 5: `HttpClient` Setup & der erste Backend-Request**

**Ziel:** In dieser Übung verbessern wir die Architektur unserer Anwendung fundamental. Zuerst lagern wir die Datenlogik aus unserer `DashboardPage` in den `OrderService` aus und nutzen Dependency Injection. Danach bereiten wir den Service auf echte Backend-Kommunikation vor, indem wir den `HttpClient` konfigurieren und injizieren.

**Voraussetzungen:** Ihr Projekt ist auf dem Stand der Übung 4. Das Backend ist gestartet (`npm start`).

-----

### **Aufgabe 1: Den `HttpClient` aufsetzen und im `OrderService` einbinden**

Der letzte Schritt ist, unseren `OrderService` mit der Fähigkeit auszustatten, HTTP-Anfragen zu stellen.

**Angabe:**

1. Setzen Sie den `HttpClient` auf wie in der [Dokumentation](https://angular.dev/guide/http/setup) beschrieben.
2. Nutzen Sie Dependency Injection, um den `HttpClient` im `OrderService` verfügbar zu machen.

<details>
<summary>Lösungshinweis</summary>

```typescript

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  // HttpClient injizieren
  private http = inject(HttpClient);

  private orders: Order[] = [
    // ... Mock-Daten bleiben vorerst hier ...
  ];

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

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Importieren
import { Order } from '../model/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);
  // 1. API-URL definieren
  private apiUrl = 'http://localhost:3000/orders';

  // 2. Das statische Array wurde gelöscht.

  constructor() {}

  // 3. Die Methode gibt jetzt ein Observable zurück
  getOrders(): Observable<Order[]> {
    // 4. Der GET-Request wird ausgeführt
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

```typescript
@Component({ /* ... */ })
export class DashboardPage {
  // Service injizieren
  private orderService = inject(OrderService);
  orders$!: Observable<Order[]>;
  
  private userService = inject(UserService);
  constructor(): void {
    this.orders$ = this.userService.getUser(this.userId());
  }
  
  selectedOrder = signal<Order | undefined>(undefined);

  // Der Rest der Klasse (selectOrder, selectionSummary etc.) bleibt unverändert.
  selectOrder(order: Order): void {
    this.selectedOrder.set(order);
  }

  selectionSummary = computed(() => {
    const selected = this.selectedOrder();
    if (selected) {
      return `Ausgewählt: Bestellung #${selected.id} von ${selected.customerName}`;
    }
    return 'Keine Bestellung ausgewählt.';
  });
}
```

</details>

-----

### **Überprüfung**

Starten Sie die Anwendung.

* Sie sollten nun eine Liste aller Bestellungen sehen, die im Backend gespeichert sind.
