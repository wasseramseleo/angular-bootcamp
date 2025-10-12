### **Übung 8: Daten erstellen mit Reactive Forms**

**Ziel:** In dieser Übung erweitern wir unsere Anwendung um die Fähigkeit, neue Bestellungen zu erstellen und an das Backend zu senden. Wir werden die Grundlagen von Angulars Reactive Forms kennenlernen, indem wir ein Formular erstellen, es an ein Datenmodell binden, Validierungsregeln hinzufügen und die Daten über einen HTTP `POST`-Request an unseren Server übermitteln.

**Voraussetzungen:** Ihr Projekt ist auf dem Stand der Routing-Übung (Übung 7). Das Backend ist gestartet (`npm start`).

-----

### **Aufgabe 1: Die `AddOrderPage`-Komponente und das Formular-Template erstellen**

Zuerst benötigen wir eine neue Seite mit einem leeren HTML-Formular als Grundlage.

**Angabe:**

1.  Generieren Sie eine neue Komponente mit dem Namen `add-order-page` im Verzeichnis `src/app/pages`.
2.  Um Reactive Forms nutzen zu können, müssen Sie das `ReactiveFormsModule` in Ihrer neuen Komponente importieren. Fügen Sie es zum `imports`-Array des `@Component`-Decorators hinzu.
3.  Erstellen Sie in `add-order-page.html` die grundlegende HTML-Struktur für ein Formular. Es sollte Eingabefelder (`<input>`) für `customerName` und `amount` sowie ein Auswahlfeld (`<select>`) für den `status` enthalten. Fügen Sie außerdem einen Submit-Button hinzu.

<details>
<summary>Lösungshinweis</summary>

**1. Kommando zum Generieren:**

```bash
ng generate component pages/add-order-page
```

**2. & 3. `add-order-page.ts` und `add-order-page.html`:**

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Wichtig: Importieren

@Component({
  selector: 'app-add-order-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Und hier hinzufügen
  templateUrl: './add-order-page.html',
  styleUrls: ['./add-order-page.css']
})
export class AddOrderPage { }
```

```html
<div class="form-container">
  <h1>Neue Bestellung anlegen</h1>
  <form>
    <div class="form-field">
      <label for="customerName">Kundenname</label>
      <input id="customerName" type="text">
    </div>

    <div class="form-field">
      <label for="amount">Betrag</label>
      <input id="amount" type="number">
    </div>

    <div class="form-field">
      <label for="status">Status</label>
      <select id="status">
        <option value="PENDING">Pending</option>
        <option value="PROCESSING">Processing</option>
      </select>
    </div>

    <button type="submit">Bestellung speichern</button>
  </form>
</div>
```

</details>

-----

### **Aufgabe 2: Das `FormGroup` erstellen und mit dem Template verbinden**

Jetzt bilden wir die Struktur unserer `Order` in der Komponenten-Klasse als `FormGroup` ab und verknüpfen sie mit unserem HTML.

**Angabe:**

1.  Öffnen Sie `add-order-page.ts`. Injizieren Sie den `FormBuilder`-Service.
2.  Erstellen Sie eine Klassen-Eigenschaft namens `orderForm`. Initialisieren Sie diese im `constructor` mit `this.fb.group({...})`.
3.  Innerhalb der Gruppe definieren Sie für `customerName`, `amount` und `status` jeweils ein `FormControl`. Geben Sie sinnvolle Startwerte an (z.B. ein leerer String `''` oder der `Pending`-Status).
4.  Öffnen Sie `add-order-page.html`. Binden Sie Ihr `orderForm` an das `<form>`-Tag mit der `[formGroup]`-Direktive.
5.  Verbinden Sie jedes einzelne Formularfeld (`input`, `select`) mit dem entsprechenden `FormControl` in Ihrer Gruppe, indem Sie die `formControlName`-Direktive verwenden.

<details>
<summary>Lösungshinweis</summary>

**`add-order-page.ts`:**

```typescript
import { Component, inject } from '@angular/core';
// ...
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OrderStatus } from '../../model/order-status.enum';

@Component({ /* ... */ })
export class AddOrderPage {
  private fb = inject(FormBuilder);

  orderForm: FormGroup;

  constructor() {
    this.orderForm = this.fb.group({
      customerName: [''], // Initialwert: leerer String
      amount: [0],
      status: [OrderStatus.PENDING]
    });
  }
}
```

**`add-order-page.html`:**

```html
<form [formGroup]="orderForm">
  <div class="form-field">
    <label for="customerName">Kundenname</label>
    <input id="customerName" type="text" formControlName="customerName">
  </div>

  <div class="form-field">
    <label for="amount">Betrag</label>
    <input id="amount" type="number" formControlName="amount">
  </div>

  <div class="form-field">
    <label for="status">Status</label>
    <select id="status" formControlName="status">
      <option value="PENDING">Pending</option>
      <option value="PROCESSING">Processing</option>
    </select>
  </div>

  <button type="submit">Bestellung speichern</button>
</form>
```

</details>

-----

### **Aufgabe 3: Formular-Übermittlung implementieren**

Jetzt sorgen wir dafür, dass die eingegebenen Daten beim Klick auf "Speichern" an das Backend gesendet werden.

**Angabe:**

1.  Öffnen Sie zuerst `src/app/service/order.service.ts`. Erstellen Sie eine neue Methode `saveOrder`, die ein `Order`-Objekt entgegennimmt. Diese Methode soll einen HTTP `POST`-Request an die Basis-API-URL (`/orders`) senden und ein `Observable<Order>` zurückgeben.
2.  Öffnen Sie `add-order-page.ts`. Erstellen Sie eine `onSubmit()`-Methode.
3.  Binden Sie diese `onSubmit()`-Methode im Template an das `(ngSubmit)`-Event des `<form>`-Tags.
4.  Implementieren Sie die `onSubmit()`-Methode: Sie soll die `saveOrder`-Methode Ihres `OrderService` aufrufen und ihr die aktuellen Werte aus dem Formular (`this.orderForm.value`) übergeben.
5.  Abonnieren Sie das zurückgegebene Observable und geben Sie eine Erfolgsmeldung in der Konsole aus. (Bonus: Injizieren Sie den `Router` und navigieren Sie nach erfolgreichem Speichern zurück zur Startseite).

<details>
<summary>Lösungshinweis</summary>

**`order.service.ts`:**

```typescript
// ... imports
import { Order } from '../model/order.model';

@Injectable({ /* ... */ })
export class OrderService {
  // ...

  // Neue Methode
  saveOrder(orderData: Partial<Order>): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, orderData);
  }
}
```

**`add-order-page.ts`:**

```typescript
// ... imports
import { Router } from '@angular/router';
import { OrderService } from '../../service/order.service';

@Component({ /* ... */ })
export class AddOrderPage {
  private fb = inject(FormBuilder);
  private orderService = inject(OrderService);
  private router = inject(Router); // Für Bonus-Aufgabe

  orderForm: FormGroup;
  // ... constructor ...

  onSubmit(): void {
    if (this.orderForm.valid) {
      this.orderService.saveOrder(this.orderForm.value).subscribe({
        next: (savedOrder) => {
          console.log('Bestellung erfolgreich gespeichert:', savedOrder);
          // Bonus: Zurück zur Startseite navigieren
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Fehler beim Speichern:', err)
      });
    }
  }
}
```

**`add-order-page.html`:**

```html
<form [formGroup]="orderForm" (ngSubmit)="onSubmit()">
  </form>
```

</details>

-----

### **Aufgabe 4 (Optional): Validatoren hinzufügen**

Ein Formular ohne Validierung ist fehleranfällig. Wir fügen nun einige grundlegende Prüfungen hinzu.

**Angabe:**

1.  Öffnen Sie `add-order-page.ts`. Importieren Sie `Validators` von `@angular/forms`.
2.  Passen Sie die Definition Ihres `FormGroup` an. Fügen Sie `Validators.required` zum `customerName`-FormControl hinzu.
3.  Fügen Sie für `amount` zwei Validatoren hinzu: `Validators.required` und `Validators.min(0.01)`, um sicherzustellen, dass der Betrag positiv ist.
4.  (Bonus) Passen Sie Ihr Template an, um eine Fehlermeldung anzuzeigen, wenn ein Feld ungültig und vom Benutzer "berührt" (`touched`) wurde. Deaktivieren Sie außerdem den Submit-Button, solange das Formular ungültig ist.

<details>
<summary>Lösungshinweis</summary>

**`add-order-page.ts`:**

```typescript
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// ...

export class AddOrderPage {
  // ...
  constructor() {
    this.orderForm = this.fb.group({
      customerName: ['', Validators.required], // Validator hinzugefügt
      amount: [0, [Validators.required, Validators.min(0.01)]], // Mehrere Validatoren
      status: [OrderStatus.PENDING]
    });
  }
  // ...
}
```

**`add-order-page.html` (Bonus):**

```html
<div class="form-field">
  <label for="customerName">Kundenname</label>
  <input id="customerName" type="text" formControlName="customerName">
  @if (orderForm.get('customerName')?.invalid && orderForm.get('customerName')?.touched) {
    <small class="error">Kundenname ist ein Pflichtfeld.</small>
  }
</div>
<button type="submit" [disabled]="orderForm.invalid">Bestellung speichern</button>
```

</details>

-----

### **Überprüfung**

1.  Fügen Sie eine neue Route für den Pfad `add-order` in `app.routes.ts` hinzu, die Ihre `AddOrderPage` lädt.
2.  Fügen Sie im `DashboardPage`-Template einen Link oder Button hinzu, der zur neuen Seite navigiert.
3.  Öffnen Sie die "Bestellung hinzufügen"-Seite, füllen Sie das Formular aus und klicken Sie auf "Speichern".
4.  Überprüfen Sie den "Netzwerk"-Tab der Entwicklerkonsole auf einen erfolgreichen `POST`-Request.
5.  Nach der Weiterleitung zur Startseite sollte die neu erstellte Bestellung in der Liste erscheinen.
