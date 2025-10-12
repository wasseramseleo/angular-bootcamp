### **Übung 8: Dynamisches Verhalten mit Attribut-Direktiven**

**Ziel:** In dieser Übung gehen wir einen Schritt über Komponenten hinaus und erstellen unsere erste eigene Attribut-Direktive. Komponenten sind dafür da, UI-Blöcke mit eigenen Templates zu erstellen. Direktiven hingegen sind dafür gedacht, das Aussehen oder Verhalten von *bestehenden* Elementen zu verändern, ohne deren Template zu beeinflussen. Unser Ziel ist es, eine wiederverwendbare Direktive zu bauen, die einer `OrderCard` beim Überfahren mit der Maus einen farbigen Rahmen gibt, der vom Bestellstatus abhängt.

**Voraussetzungen:** Ihr Projekt ist auf dem Stand der Übung 7 (Reactive Forms). Das Backend ist gestartet (`npm start`).

-----

### **Aufgabe 1: Die `StatusBorder`-Direktive erstellen**

Der erste Schritt ist, die Direktive mit der Angular CLI zu generieren.

**Angabe:**

1.  Generieren Sie eine neue Direktive mit dem Namen `status-border` in einem neuen Verzeichnis `src/app/directives`.

<details>
<summary>Lösungshinweis</summary>

```bash
ng generate directive directives/status-border
```

</details>

-----

### **Aufgabe 2: Die Direktive anwenden und Daten übergeben**

Bevor wir die Logik implementieren, wenden wir die Direktive auf unsere `OrderCard` an und übergeben ihr die notwendigen Daten, damit wir sehen, wo wir hinwollen.

**Angabe:**

1.  Öffnen Sie `src/app/component/order-list.ts` und importieren Sie Ihre neue `StatusBorderDirective`, damit das Template der `OrderList` sie verwenden kann.
2.  Öffnen Sie `src/app/component/order-list.html`. Fügen Sie den Attribut-Selektor Ihrer neuen Direktive (z.B. `appStatusBorder`) zum `<app-order-card>`-Element innerhalb der `@for`-Schleife hinzu.
3.  Unsere Direktive muss den Status der Bestellung kennen. Erstellen Sie in der Direktive (`status-border.directive.ts`) einen erforderlichen Signal-Input `status` vom Typ `OrderStatus`.
4.  Übergeben Sie den Status der jeweiligen Bestellung aus der `@for`-Schleife per Property Binding an den neuen `[status]`-Input Ihrer Direktive.

<details>
<summary>Lösungshinweis</summary>

**`order-list.ts`:**

```typescript
// ...
import { StatusBorderDirective } from '../../directives/status-border.directive';

@Component({
  // ...
  imports: [CommonModule, OrderCard, StatusBorderDirective], // Hier hinzufügen
})
export class OrderList { /* ... */ }
```

**`status-border.directive.ts`:**

```typescript
import { Directive, input } from '@angular/core';
import { OrderStatus } from '../model/order-status.enum';

@Directive({
  selector: '[appStatusBorder]',
  standalone: true
})
export class StatusBorderDirective {
  status = input.required<OrderStatus>();
}
```

**`order-list.html`:**

```html
@for (order of orders(); track order.id) {
  <a [routerLink]="['/order', order.id]" class="order-link">
    <app-order-card 
      appStatusBorder       [status]="order.status" [order]="order">
    </app-order-card>
  </a>
}
```

</details>

-----

### **Aufgabe 3: Auf Maus-Events reagieren und das Element verändern**

Jetzt implementieren wir die Kernlogik. Die Direktive muss auf Maus-Events lauschen und daraufhin den Style des Elements, an das sie angehängt ist (das "Host-Element"), direkt manipulieren.

**Angabe:**

1.  Öffnen Sie `status-border.directive.ts`. Injizieren Sie den `ElementRef`-Service. Dieser gibt Ihnen einen direkten Zugriff auf das Host-DOM-Element.
2.  Verwenden Sie die `host`-Eigenschaft im `@Directive`-Decorator, um Listener für die DOM-Events `mouseenter` und `mouseleave` zu registrieren. Diese Listener sollen zwei neue Methoden in Ihrer Direktiven-Klasse aufrufen, z.B. `onMouseEnter()` und `onMouseLeave()`.
3.  Implementieren Sie die `onMouseEnter()`-Methode. Innerhalb dieser Methode:
    * Verwenden Sie eine `switch`-Anweisung, die den Wert Ihres `status()`-Signals prüft.
    * Definieren Sie je nach Status (`PENDING`, `SHIPPED`, `DELIVERED` etc.) eine passende Rahmenfarbe (z.B. 'orange', 'blue', 'green').
    * Greifen Sie auf das native Element über `this.elementRef.nativeElement` zu und setzen Sie dessen `style.borderColor` auf die ermittelte Farbe. Setzen Sie auch `style.borderWidth`, damit der Rahmen sichtbar wird.
4.  Implementieren Sie die `onMouseLeave()`-Methode. Diese soll den `style.borderColor` einfach wieder auf den ursprünglichen oder einen neutralen Wert zurücksetzen.

<details>
<summary>Lösungshinweis</summary>

```typescript
import { Directive, ElementRef, inject, input } from '@angular/core';
import { OrderStatus } from '../model/order-status.enum';

@Directive({
  selector: '[appStatusBorder]',
  standalone: true,
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class StatusBorderDirective {
  status = input.required<OrderStatus>();
  private elementRef = inject(ElementRef);
  private originalBorderColor: string;

  constructor() {
    // Speichere die ursprüngliche Farbe, um sie wiederherstellen zu können
    this.originalBorderColor = this.elementRef.nativeElement.style.borderColor;
  }

  onMouseEnter(): void {
    let borderColor = 'gray'; // Standardfarbe

    switch (this.status()) {
      case OrderStatus.Pending:
        borderColor = 'orange';
        break;
      case OrderStatus.Confirmed:
        borderColor = '#007bff'; // Blau
        break;
      case OrderStatus.Shipped:
        borderColor = 'purple';
        break;
      case OrderStatus.Delivered:
        borderColor = 'green';
        break;
      case OrderStatus.Cancelled:
        borderColor = 'red';
        break;
    }
    this.elementRef.nativeElement.style.transition = 'border-color 0.2s ease-in-out';
    this.elementRef.nativeElement.style.borderColor = borderColor;
  }

  onMouseLeave(): void {
    this.elementRef.nativeElement.style.borderColor = this.originalBorderColor || null;
  }
}
```

*Hinweis: Der `borderWidth` wurde bereits in der `order-card.css` gesetzt, daher reicht es, die Farbe zu ändern. Falls nicht, müsste hier auch `style.borderWidth` oder `style.border` gesetzt werden.*

</details>

-----

### **Überprüfung**

1.  Starten Sie Ihre Anwendung mit `ng serve`.
2.  Navigieren Sie zur Dashboard-Seite mit der Liste der Bestellungen.
3.  Fahren Sie mit der Maus über die verschiedenen Bestellkarten.
4.  Der Rahmen der Karte, über der sich die Maus befindet, sollte seine Farbe entsprechend dem Status der Bestellung ändern (z.B. orange für "Pending", lila für "Shipped" etc.).
5.  Wenn Sie die Maus von der Karte entfernen, sollte der Rahmen wieder seine ursprüngliche Farbe annehmen.
6.  Die Direktive funktioniert auf allen Karten in der Liste, da sie innerhalb der `@for`-Schleife wiederverwendet wird.
