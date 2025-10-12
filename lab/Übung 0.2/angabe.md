## **Übung 0.2: Angular CLI**

**Ziel:** In dieser Übung festigen wir den Umgang mit der Angular CLI, unserem wichtigsten Werkzeug. Wir werden Code-Strukturen generieren, den Entwicklungsserver nutzen und einen produktiven Build unserer Anwendung erstellen.

**Voraussetzungen:** Übung 0.1 ist abgeschlossen. Frontend Dev-Server ist gestoppt.

-----

### **Aufgabe 1: Code-Strukturen mit `ng generate` erstellen**

Die `generate`-Funktion der CLI nimmt uns die mühsame Arbeit ab, neue Bausteine von Hand zu erstellen. Sie legt die Dateien an, schreibt den nötigen Boilerplate-Code und konfiguriert sie korrekt.

#### **1.1 Eine neue Komponente erstellen**

Wir benötigen eine Komponente, die später eine einzelne Bestellkarte anzeigen soll.

**Aktion:** Führen Sie im Terminal den folgenden Befehl aus, um eine Komponente namens `order-card` im Verzeichnis `src/app/component` zu erstellen:

```bash
# Im Ordner /frontend
ng generate component component/order-card
```

*Kurzform: `ng g c component/order-card`*

**Überprüfung:** Sehen Sie sich die neu erstellten Dateien im `component/order-card`-Ordner an. Sie finden dort eine TypeScript-, HTML-, CSS- und eine Test-Datei.

#### **1.2 Ein Enum für den Bestellstatus erstellen**

Um "magische Strings" wie `'PENDING'` oder `'SHIPPED'` zu vermeiden, erstellen wir ein `Enum`.

**Aktion:** Generieren Sie ein Enum namens `OrderStatus`. Ein guter Ort für solche Datenmodelle ist ein `model`-Ordner.

```bash
ng generate enum model/OrderStatus
```

*Kurzform: `ng g enum model/OrderStatus`*

**Implementierung:** Öffnen Sie die neu erstellte Datei `src/app/model/order-status.enum.ts` und befüllen Sie das Enum mit den folgenden Werten: `PENDING`, `Processing`, `SHIPPED`, `DELIVERED`, `CANCELED`.

#### **1.3 Das `Order`-Interface anpassen**

Jetzt bringen wir unser `Order`-Interface auf den neuesten Stand, damit es das neue `OrderStatus`-Enum verwendet.

**Aktion:** Öffnen Sie die Datei, in der Ihr `Order`-Interface definiert ist (wahrscheinlich `src/app/model/order.ts` oder ähnlich).

**Implementierung:**

1.  Importieren Sie das `OrderStatus`-Enum am Anfang der Datei.
2.  Ändern Sie den Typ der Eigenschaft `status` auf `OrderStatus`.

Das Ergebnis für die `status`-Eigenschaft sollte so aussehen:
`status: OrderStatus;`

#### **1.4 Einen Service erstellen und implementieren**

Die Logik zum Abrufen von Daten sollte nicht in Komponenten liegen. Dafür nutzen wir Services.

**Aktion:** Generieren Sie einen neuen Service namens `OrderService` in einem `service`-Verzeichnis.

```bash
ng generate service service/OrderService
```

*Kurzform: `ng g s service/OrderService`*

**Implementierung:** Öffnen Sie die neue Datei `src/app/service/order-service.ts` und nehmen Sie folgende Änderungen vor:

1.  Fügen Sie im `constructor()` eine `console.log()`-Anweisung hinzu, die die Nachricht "OrderService initialized" ausgibt.
2.  Erstellen Sie eine neue, leere Methode namens `getOrders()`. Fügen Sie innerhalb dieser Methode eine `console.log()`-Anweisung hinzu, die "Fetching orders..." ausgibt.

-----

### **Aufgabe 2: Den Entwicklungsserver mit `ng serve` nutzen**

Der `ng serve`-Befehl kompiliert die Anwendung im Speicher und startet einen Webserver. Er beobachtet Ihre Dateien und lädt die Anwendung bei jeder Änderung automatisch neu.

**Aktion:** Starten Sie den Entwicklungsserver. Um zu zeigen, wie man Optionen mitgibt, nutzen wir dieses Mal einen anderen Port.

```bash
ng serve --port 4201
```

**Überprüfung:** Öffnen Sie Ihren Browser unter `http://localhost:4201/`. Die Anwendung sollte wie zuvor laufen. Öffnen Sie die Entwicklerkonsole (F12). Sie sollten keine Fehler sehen. Die CLI hat die neuen, von uns erstellten Dateien ohne Probleme erkannt und kompiliert.

-----

### **Aufgabe 3: Einen Production Build mit `ng build` erstellen**

Wenn unsere Anwendung fertig ist, müssen wir sie für das Deployment vorbereiten. Der `ng build`-Befehl erstellt eine hochoptimierte Version unserer App.

**Aktion:** Stoppen Sie den Entwicklungsserver (STRG + C im Terminal) und führen Sie den Build-Befehl aus.

```bash
ng build
```

Dieser Prozess kann einen Moment dauern. Die CLI kompiliert Ihren Code, optimiert ihn (entfernt Kommentare, fasst Code zusammen, etc.) und erstellt ein finales Bündel.

**Überprüfung:**

1.  Nachdem der Befehl abgeschlossen ist, sehen Sie in Ihrem Projekt einen neuen Ordner namens `dist/`.
2.  Öffnen Sie diesen Ordner und sehen Sie sich den Inhalt an. Sie finden dort die `index.html` sowie einige JavaScript- und CSS-Dateien. Dies sind die von Angular optimierten Dateien, die Sie auf einen Webserver hochladen würden.

-----

### **Weitere nützliche `ng generate`-Befehle:**

Neben Komponenten, Enums und Services können Sie viele weitere Bausteine generieren. Einige wichtige sind:

* `ng g directive <name>`: Erstellt eine Direktive, um das Verhalten von DOM-Elementen zu ändern.
* `ng g pipe <name>`: Erstellt eine Pipe, um Daten in Templates zu transformieren (z.B. Datumsformatierung).
* `ng g guard <name>`: Erstellt einen Route Guard, um den Zugriff auf bestimmte Seiten zu schützen.
* `ng g class <name>`: Erstellt eine generische TypeScript-Klasse.
