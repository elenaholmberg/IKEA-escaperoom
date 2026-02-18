# Detaljerat spelflöde — IKEA Escape Room: Överlev barnavdelningen

## Spelinställningar

- **Rörelse:** Klicka på zoner direkt
- **Straff:** +5 sekunder på timern (gäller både fel väg och fel argument)
- **Vinst:** Ta sig från ENTRÉ till UTGÅNG utan att köpa något, så snabbt som möjligt

---

## 1. Spelstart

- Visa kartan med alla zoner
- Starta timern (räknar uppåt)
- Markera **ENTRÉ** som aktiv/synlig startpunkt
- Pappan placeras vid ENTRÉ
- Endast tillåtna nästa zoner är klickbara _(övriga är inaktiva)_

---

## 2. Rörelse — klicka på zon

```
spelaren klickar på en zon
  → är zonen tillåten att klicka på?
      JA → flytta pappan dit
           → trigga zon-händelse (se sektion 3)
      NEJ → visa meddelande: "Du kan inte gå dit!"
            → lägg till +5 sek på timern
```

### Tillåten zonordning (förslag)

```
ENTRÉ → zone-pillow → zone-teddybear → zone-bedsheets → zone-lamp → UTGÅNG
```

_(Du bestämmer själv vilken ordning som passar din labyrint)_

---

## 3. Zon-händelse — möte med dottern

När pappan klickar på en produktzon (kudde, nalle, lakan, lampa):

```
pappan når zonen
  → stoppa vidare klickning
  → visa dialog: dottern dyker upp
  → visa produktbild + dotterns fråga
  → visa 3 argumentationsalternativ
      spelaren väljer ett alternativ
        → RÄTT argument:
              visa feedback: "Bra argument! Dottern ger upp 😤"
              → lås upp nästa zon
              → stäng dialogen
              → fortsätt spelet
        → FEL argument:
              visa feedback: "Dottern tjatar ännu mer! ⏱️ +5 sek"
              → lägg till +5 sek på timern
              → visa argumenten igen (spelaren får försöka igen)
```

---

## 4. Argumentationsalternativ per zon

### 🛏️ Zone-pillow (hjärtakudde)

> _"Pappa, jag MÅSTE ha den kudden!"_

| #   | Argument                         | Utfall          |
| --- | -------------------------------- | --------------- |
| A   | "Du har redan tre kuddar hemma." | ✅ Rätt         |
| B   | "Den är för dyr."                | ❌ Fel — +5 sek |
| C   | "Kanske till jul?"               | ❌ Fel — +5 sek |

---

### 🧸 Zone-teddybear (grisknoa)

> _"Pappa, den där grisen är SÅ söt!"_

| #   | Argument                                     | Utfall          |
| --- | -------------------------------------------- | --------------- |
| A   | "Vi har redan Nalle-Puh hemma som är ensam." | ✅ Rätt         |
| B   | "Nej, vi köper den inte."                    | ❌ Fel — +5 sek |
| C   | "Den ser inte ens så söt ut."                | ❌ Fel — +5 sek |

---

### 🛏️ Zone-bedsheets (hjärtalakan)

> _"Pappa, de där lakanen matchar mitt rum perfekt!"_

| #   | Argument                                                       | Utfall          |
| --- | -------------------------------------------------------------- | --------------- |
| A   | "Vi bytte lakan förra månaden, de håller i minst ett år till." | ✅ Rätt         |
| B   | "Vi har inte råd."                                             | ❌ Fel — +5 sek |
| C   | "De finns säkert billigare någon annanstans."                  | ❌ Fel — +5 sek |

---

### 💡 Zone-lamp (hjärtlampa)

> _"Pappa, den där lampan skulle passa perfekt på mitt skrivbord!"_

| #   | Argument                                                               | Utfall          |
| --- | ---------------------------------------------------------------------- | --------------- |
| A   | "Din gamla lampa fungerar utmärkt, vi fixar en ny glödlampa istället." | ✅ Rätt         |
| B   | "Det är för dyrt."                                                     | ❌ Fel — +5 sek |
| C   | "Lampor behöver du inte."                                              | ❌ Fel — +5 sek |

---

## 5. Utgång — vinst

```
pappan klickar på UTGÅNG
  → alla zoner klarade?
      JA → stoppa timern
           → visa vinst-skärm:
                "🎉 Du tog dig ut utan att köpa något!"
                "Din tid: XX sekunder"
           → visa knapp: "Spela igen"
      NEJ → visa meddelande: "Du måste ta dig igenom hela butiken först!"
```

---

## 6. Vad du kan lägga till i din kod för tydligare UX

| Vad                                                                | Varför                           |
| ------------------------------------------------------------------ | -------------------------------- |
| Markera nästa tillåtna zon med en CSS-klass (t.ex. `.active-zone`) | Spelaren vet vart de kan klicka  |
| Lägg till en pulsande animation på aktiva zoner                    | Tydligare visuell ledtråd        |
| Visa en liten pappa-ikon som flyttar sig mellan zoner              | Spelaren ser var de befinner sig |
| Lägg till en synlig timer i `<header>` eller ovanför kartan        | Spelaren ser sin tid hela tiden  |
| Visa strafftid med röd text "+5 sek" som tonar bort                | Tydlig feedback vid misstag      |
| Lägg till `cursor: pointer` på klickbara zoner                     | Vanlig UX-konvention             |
