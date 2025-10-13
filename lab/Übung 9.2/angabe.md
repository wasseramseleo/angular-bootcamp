### **Übung 9.2: Routen absichern mit Guards**

**Ziel:** In dieser Übung lernen wir, wie man den Zugriff auf bestimmte Teile unserer Anwendung programmatisch steuert. Wir werden einen "Auth Guard" erstellen, eine spezielle Funktion, die vor dem Aktivieren einer Route prüft, ob der Benutzer die notwendigen Berechtigungen hat. Um dies zu simulieren, erstellen wir einen einfachen `AuthService`, der den Anmeldestatus eines Benutzers vorgibt. Unser Ziel ist es, die Seite "Neue Order" so zu schützen, dass sie nur von (simulierten) angemeldeten Benutzern aufgerufen werden kann.

**Voraussetzungen:** Ihr Projekt ist auf dem Stand der Übung 9.1 (Interceptors).

-----

### **Aufgabe 1: Den Mock-`AuthService` erstellen**

Zuerst benötigen wir einen Service, der als "Quelle der Wahrheit" für den Authentifizierungsstatus des Benutzers dient. In einer echten App würde dieser Service komplexe Logik enthalten, aber für unser Beispiel halten wir ihn extrem einfach.

**Angabe:**

1.  Generieren Sie einen neuen Service mit dem Namen `auth` im Verzeichnis `src/app/service`.
2.  Öffnen Sie die neue Service-Datei.
3.  Implementieren Sie eine öffentliche Methode `isAuthenticated()`. Diese Methode soll für den Moment einfach einen hardcodierten Boolean-Wert zurückgeben (starten Sie mit `true`).

<details>
<summary>Lösungshinweis</summary>

**1. Kommando zum Generieren:**

```bash
ng generate service service/auth-service
```

**2. `auth-service.ts`:**

```typescript
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Simuliert, ob der Benutzer angemeldet ist oder nicht.
  // Ändern Sie diesen Wert auf 'false', um den Guard zu testen.
  isAuthenticated(): boolean {
    return true;
  }
}
```

</details>

-----

### **Aufgabe 2: Den `authGuard` erstellen und implementieren**

Jetzt erstellen wir den eigentlichen Guard, der die Logik zur Zugriffskontrolle enthält.

**Angabe:**

1.  Generieren Sie einen neuen Guard mit dem Namen `auth` in einem neuen Verzeichnis `src/app/guards`. Wählen Sie bei der Abfrage der CLI die Option `CanActivate`.
2.  Öffnen Sie die neu erstellte Guard-Datei (`src/app/guards/auth-guard.ts`).
3.  Die generierte Datei enthält eine Guard-Funktion. Innerhalb dieser Funktion müssen Sie auf den `AuthService` zugreifen, um den Anmeldestatus zu prüfen. Nutzen Sie die `inject`-Funktion, um eine Instanz des `AuthService` und des `Router`-Service zu erhalten.
4.  Implementieren Sie die Guard-Logik:
    * Rufen Sie die `isAuthenticated()`-Methode Ihres `AuthService` auf.
    * Wenn die Methode `true` zurückgibt, soll der Guard ebenfalls `true` zurückgeben, um die Navigation zu erlauben.
    * Wenn die Methode `false` zurückgibt, soll der Guard den Benutzer zur Startseite (`/`) umleiten und `false` zurückgeben, um die Navigation zu blockieren. Nutzen Sie hierfür die `router.navigate()`-Methode.

<details>
<summary>Lösungshinweis</summary>

**1. Kommando zum Generieren:**

```bash
ng generate guard guards/auth
```

*(Wählen Sie `CanActivate` aus der Liste)*

**2. `auth-guard.ts`:**

```typescript
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    // Benutzer ist authentifiziert, Navigation erlauben
    return true;
  } else {
    // Benutzer ist nicht authentifiziert, zur Startseite umleiten
    console.log('Access denied by authGuard. Redirecting to home.');
    router.navigate(['/']);
    return false;
  }
};
```

</details>

-----

### **Aufgabe 3: Die Route mit dem Guard schützen**

Der letzte Schritt ist, Angular mitzuteilen, welche Route durch unseren neuen Guard geschützt werden soll.

**Angabe:**

1.  Öffnen Sie Ihre zentrale Routing-Konfigurationsdatei `src/app/app.routes.ts`.
2.  Importieren Sie Ihren neuen `authGuard`.
3.  Suchen Sie die Routen-Definition für den Pfad `add-order`.
4.  Fügen Sie eine neue Eigenschaft `canActivate` zum Routen-Objekt hinzu. Der Wert dieser Eigenschaft sollte ein Array sein, das Ihren `authGuard` enthält.

<details>
<summary>Lösungshinweis</summary>

```typescript
export const routes: Routes = [
  { path: '', component: DashboardPage },
  {
    path: 'add-order',
    component: AddOrderPage,
    canActivate: [authGuard] // Guard hier anwenden
  },
  { path: 'order/:id', component: OrderDetailPage },
];
```

</details>

-----

### **Überprüfung**

1.  **Fall 1 (Authentifiziert):**

    * Stellen Sie sicher, dass `isAuthenticated()` in Ihrem `AuthService` `true` zurückgibt.
    * Starten Sie die Anwendung.
    * Klicken Sie auf den "Neue Order"-Link im Header. Sie sollten wie gewohnt zur Formular-Seite navigieren können.

2.  **Fall 2 (Nicht authentifiziert):**

    * Ändern Sie den Rückgabewert von `isAuthenticated()` in `AuthService` auf `false`.
    * Speichern Sie die Änderung (die App sollte sich automatisch neu laden).
    * Klicken Sie erneut auf den "Neue Order"-Link.
    * **Erwartetes Verhalten:** Die Navigation wird blockiert. Die URL in Ihrem Browser sollte auf die Startseite (`/`) zurückgesetzt werden, und Sie sollten die Dashboard-Ansicht sehen. In der Entwicklerkonsole sollte die Log-Nachricht Ihres Guards erscheinen.
