### **Übung 9.1: Cross-Cutting Concerns mit `HttpInterceptor`**

**Ziel:** In dieser Übung lernen wir eine der mächtigsten Funktionen des `HttpClient`-Moduls kennen: `HttpInterceptors`. Ein Interceptor erlaubt es uns, jeden einzelnen ausgehenden HTTP-Request (und jede eingehende Antwort) abzufangen und zu manipulieren. Dies ist ideal für wiederkehrende Aufgaben wie das Hinzufügen von Authentifizierungs-Headern, das Caching oder – wie in unserem Fall – das Logging. Unser Ziel ist es, einen Interceptor zu erstellen, der den Body jedes Requests protokolliert, bevor er an den Server gesendet wird.

**Voraussetzungen:** Ihr Projekt ist auf dem Stand der Übung 9 (Custom Directives).

-----

### **Aufgabe 1: Den Interceptor generieren**

Wie bei den meisten Angular-Bausteinen nutzen wir die CLI, um die grundlegende Datei-Struktur für unseren neuen Interceptor zu erstellen.

**Angabe:**

1.  Generieren Sie einen neuen Interceptor mit dem Namen `logging` in einem neuen Verzeichnis `src/app/interceptors`.

<details>
<summary>Lösungshinweis</summary>

```bash
ng generate interceptor interceptors/logging
```

</details>

-----

### **Aufgabe 2: Die Interceptor-Logik implementieren**

Der Kern eines Interceptors ist die `intercept`-Methode. Sie erhält den ausgehenden Request, und es ist unsere Aufgabe zu entscheiden, was wir damit tun, bevor wir ihn an den nächsten Handler in der Kette weitergeben.

**Angabe:**

1.  Öffnen Sie die neu erstellte Datei `src/app/interceptors/logging-interceptor.ts`.
2.  Die generierte Datei enthält eine Interceptor-Funktion. Innerhalb dieser Funktion haben Sie Zugriff auf das `HttpRequest`-Objekt (oft `req` genannt).
3.  Fügen Sie eine Logik hinzu, die prüft, ob der `req` einen Body hat (Requests wie `GET` oder `DELETE` haben typischerweise keinen).
4.  Wenn ein Body vorhanden ist, geben Sie ihn mit einer aussagekräftigen Nachricht in der Konsole aus (`console.log`).
5.  **Wichtig:** Stellen Sie sicher, dass der Request am Ende Ihrer Logik immer mit `return next(req);` (oder `return next.handle(req);` bei Klassen-basierten Interceptoren) weitergereicht wird. Ohne diesen Aufruf würde keiner Ihrer HTTP-Requests jemals den Server erreichen!

<details>
<summary>Lösungshinweis</summary>

```typescript
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(`[Logging Interceptor] Sending request to: ${req.url}`);

  // Nur loggen, wenn der Request einen Body hat (typisch für POST, PUT)
  if (req.body) {
    console.log('[Logging Interceptor] Request Body:', req.body);
  }

  // Den Request an den nächsten Handler in der Kette weiterleiten
  return next(req);
};
```

</details>

-----

### **Aufgabe 3: Den Interceptor in der Anwendung registrieren**

Ein Interceptor ist erst aktiv, wenn wir ihn dem Dependency-Injection-System unserer Anwendung bekannt machen. Dies geschieht in der zentralen Konfigurationsdatei.

**Angabe:**

1.  Öffnen Sie `src/app/app.config.ts`.
2.  Suchen Sie die Zeile, in der `provideHttpClient()` aufgerufen wird.
3.  Moderne Interceptoren werden über die `withInterceptors`-Funktion bereitgestellt, die als Argument an `provideHttpClient` übergeben wird.
4.  Importieren Sie Ihre `loggingInterceptor`-Funktion und übergeben Sie sie in einem Array an `withInterceptors`.

<details>
<summary>Lösungshinweis</summary>

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

// withInterceptors importieren
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
// Den neuen Interceptor importieren
import { loggingInterceptor } from './interceptors/logging-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // provideHttpClient modifizieren
    provideHttpClient(
      withInterceptors([loggingInterceptor])
    )
  ]
};
```

</details>

-----

### **Überprüfung**

1.  Starten Sie Ihre Anwendung mit `ng serve`.
2.  Öffnen Sie die Entwicklerkonsole Ihres Browsers (F12).
3.  Navigieren Sie zur Seite "Neue Order".
4.  Füllen Sie das Formular aus und klicken Sie auf "Bestellung speichern".
5.  Beobachten Sie die Konsolenausgabe. Bevor der `POST`-Request an das Backend gesendet wird, sollte Ihr Interceptor eine Nachricht ausgeben, die den Body des Requests (das JSON-Objekt mit den Formulardaten) anzeigt.
6.  Die Anwendung sollte weiterhin normal funktionieren, und die neue Bestellung sollte auf der Dashboard-Seite erscheinen. Dies bestätigt, dass der Request erfolgreich weitergeleitet wurde.
