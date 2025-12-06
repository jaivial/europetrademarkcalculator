# Frontend Task 010: i18n - Germanic & Other Language Translations

## Metadata
- **Task**: 10 of 40
- **Area**: Frontend
- **Feature**: Multi-Language Support - Germanic & European Languages
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 5
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create complete translation files for 5 European languages: German (de), Dutch (nl), Polish (pl), Swedish (sv), and Greek (el). Each translation file contains all keys from the English master file with natural, professional translations appropriate for each language. All subtasks are independent and can be completed in parallel.

---

## Subtasks

### Subtask 010.1: German Translation (de.json)

#### Status
status: pending

#### Objective
Create complete German translation file with all keys translated naturally for German speakers.

#### Context
German is a major language in Central Europe with significant brand registration activity. Translations must be formal and professional, appropriate for legal/business context.

#### Files to Create/Modify (Exclusive Ownership)
- `src/i18n/locales/de.json` - German translations

#### Implementation

```json
{
  "common": {
    "appTitle": "Markenregistrierungsrechner",
    "appDescription": "Berechnen Sie Markenregistrierungskosten in europäischen Ländern",
    "language": "Sprache",
    "country": "Land",
    "currency": "EUR",
    "loading": "Wird geladen...",
    "error": "Ein Fehler ist aufgetreten",
    "success": "Erfolgreich",
    "cancel": "Abbrechen",
    "confirm": "Bestätigen",
    "close": "Schließen",
    "back": "Zurück",
    "next": "Weiter",
    "save": "Speichern",
    "delete": "Löschen",
    "edit": "Bearbeiten",
    "search": "Suchen",
    "clear": "Löschen",
    "reset": "Zurücksetzen",
    "noResults": "Keine Ergebnisse gefunden"
  },
  "navigation": {
    "worldMap": "Weltkarte",
    "countryList": "Länderliste",
    "calculator": "Rechner",
    "about": "Über uns",
    "contact": "Kontakt",
    "help": "Hilfe"
  },
  "theme": {
    "dark": "Dunkel",
    "light": "Hell",
    "system": "System",
    "toggleTheme": "Design wechseln"
  },
  "calculator": {
    "title": "Markenregistrierungsrechner",
    "subtitle": "Berechnen Sie Ihre Registrierungskosten",
    "numberOfClasses": "Anzahl der Klassen",
    "classesLabel": "Klassen",
    "registrationType": "Registrierungstyp",
    "standard": "Standard",
    "express": "Express",
    "priority": "Priorität",
    "optionalServices": "Zusätzliche Dienstleistungen",
    "monitoring": "Überwachung",
    "legalSupport": "Rechtsunterstützung",
    "fastTrack": "Schnellbearbeitung",
    "basePrice": "Grundpreis",
    "servicesPrice": "Gebühren für Dienstleistungen",
    "totalPrice": "Gesamtpreis",
    "calculate": "Berechnen",
    "resetCalculator": "Zurücksetzen",
    "priceEstimate": "Geschätzte Kosten",
    "perClass": "pro Klasse",
    "savings": "Einsparungen"
  },
  "globe": {
    "title": "Weltkarte",
    "selectCountry": "Wählen Sie ein Land aus",
    "rotating": "Automatische Rotation",
    "stopRotation": "Rotation stoppen",
    "startRotation": "Rotation starten",
    "zoom": "Vergrößerung",
    "zoomIn": "Vergrößern",
    "zoomOut": "Verkleinern",
    "resetView": "Ansicht zurücksetzen",
    "noCountrySelected": "Kein Land ausgewählt",
    "selectToCalculate": "Wählen Sie ein Land aus, um zu beginnen"
  },
  "countryList": {
    "title": "Länderliste",
    "searchPlaceholder": "Nach Land suchen...",
    "filter": "Filtern",
    "continent": "Kontinent",
    "europe": "Europa",
    "asia": "Asien",
    "africa": "Afrika",
    "americas": "Amerika",
    "oceania": "Ozeanien",
    "all": "Alle",
    "countries": "Länder",
    "selectedCountries": "Ausgewählte Länder",
    "noCountries": "Keine Länder gefunden",
    "clearSelection": "Auswahl löschen"
  },
  "pricing": {
    "title": "Preisgestaltung",
    "basePrice": "Grundpreis",
    "additionalServices": "Zusätzliche Dienstleistungen",
    "currency": "EUR",
    "estimatedCost": "Geschätzte Kosten",
    "finalPrice": "Endgültiger Preis",
    "discounts": "Rabatte",
    "vatNotIncluded": "MwSt. nicht enthalten",
    "priceBreakdown": "Preisaufschlüsselung"
  },
  "validation": {
    "required": "Dieses Feld ist erforderlich",
    "invalidInput": "Ungültige Eingabe",
    "minValue": "Mindestwert: {value}",
    "maxValue": "Maximalwert: {value}",
    "selectCountry": "Bitte wählen Sie ein Land",
    "selectAtLeastOne": "Bitte wählen Sie mindestens ein Element"
  },
  "messages": {
    "success": "Aktion erfolgreich",
    "error": "Ein Fehler ist aufgetreten",
    "warning": "Warnung",
    "info": "Information",
    "noData": "Keine Daten verfügbar",
    "tryAgain": "Versuchen Sie es erneut",
    "loading": "Wird geladen, bitte warten...",
    "saved": "Erfolgreich gespeichert",
    "deleted": "Erfolgreich gelöscht",
    "updated": "Erfolgreich aktualisiert"
  }
}
```

#### Acceptance Criteria
- [ ] All translation keys present and accurate
- [ ] German translations are natural and professional
- [ ] Proper formatting for currency (EUR) and numbers
- [ ] No untranslated English strings
- [ ] JSON structure valid and matches source file
- [ ] German terminology consistent throughout
- [ ] Legal/business language appropriate

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify JSON syntax
cat src/i18n/locales/de.json | jq .
```

---

### Subtask 010.2: Dutch Translation (nl.json)

#### Status
status: pending

#### Objective
Create complete Dutch translation file with all keys translated naturally for Dutch speakers.

#### Context
Dutch is spoken in the Netherlands and Belgium (Flanders), important markets for brand registration. Translations should be professional and clear.

#### Files to Create/Modify (Exclusive Ownership)
- `src/i18n/locales/nl.json` - Dutch translations

#### Implementation

```json
{
  "common": {
    "appTitle": "Merkregistratiecalculator",
    "appDescription": "Bereken merkregistratiekosten in Europese landen",
    "language": "Taal",
    "country": "Land",
    "currency": "EUR",
    "loading": "Bezig met laden...",
    "error": "Er is een fout opgetreden",
    "success": "Geslaagd",
    "cancel": "Annuleren",
    "confirm": "Bevestigen",
    "close": "Sluiten",
    "back": "Terug",
    "next": "Volgende",
    "save": "Opslaan",
    "delete": "Verwijderen",
    "edit": "Bewerken",
    "search": "Zoeken",
    "clear": "Wissen",
    "reset": "Opnieuw instellen",
    "noResults": "Geen resultaten gevonden"
  },
  "navigation": {
    "worldMap": "Wereldkaart",
    "countryList": "Landlijst",
    "calculator": "Calculator",
    "about": "Over ons",
    "contact": "Contact",
    "help": "Hulp"
  },
  "theme": {
    "dark": "Donker",
    "light": "Licht",
    "system": "Systeem",
    "toggleTheme": "Ontwerp omschakelen"
  },
  "calculator": {
    "title": "Merkregistratiecalculator",
    "subtitle": "Bereken uw registratiekosten",
    "numberOfClasses": "Aantal klassen",
    "classesLabel": "Klassen",
    "registrationType": "Registratietype",
    "standard": "Standaard",
    "express": "Express",
    "priority": "Prioriteit",
    "optionalServices": "Aanvullende diensten",
    "monitoring": "Bewaking",
    "legalSupport": "Juridische ondersteuning",
    "fastTrack": "Snelle verwerking",
    "basePrice": "Basisprijs",
    "servicesPrice": "Servicebijdragen",
    "totalPrice": "Totaalprijs",
    "calculate": "Berekenen",
    "resetCalculator": "Opnieuw instellen",
    "priceEstimate": "Geschatte kosten",
    "perClass": "per klasse",
    "savings": "Besparingen"
  },
  "globe": {
    "title": "Wereldkaart",
    "selectCountry": "Selecteer een land",
    "rotating": "Automatische rotatie",
    "stopRotation": "Rotatie stoppen",
    "startRotation": "Rotatie starten",
    "zoom": "Zoom",
    "zoomIn": "Inzoomen",
    "zoomOut": "Uitzoomen",
    "resetView": "Weergave opnieuw instellen",
    "noCountrySelected": "Geen land geselecteerd",
    "selectToCalculate": "Selecteer een land om te beginnen"
  },
  "countryList": {
    "title": "Landlijst",
    "searchPlaceholder": "Zoek naar een land...",
    "filter": "Filteren",
    "continent": "Continent",
    "europe": "Europa",
    "asia": "Azië",
    "africa": "Afrika",
    "americas": "Amerika",
    "oceania": "Oceanië",
    "all": "Alle",
    "countries": "Landen",
    "selectedCountries": "Geselecteerde landen",
    "noCountries": "Geen landen gevonden",
    "clearSelection": "Selectie wissen"
  },
  "pricing": {
    "title": "Prijsstelling",
    "basePrice": "Basisprijs",
    "additionalServices": "Aanvullende diensten",
    "currency": "EUR",
    "estimatedCost": "Geschatte kosten",
    "finalPrice": "Uiteindelijke prijs",
    "discounts": "Kortingen",
    "vatNotIncluded": "BTW niet inbegrepen",
    "priceBreakdown": "Kostenuitsplitsing"
  },
  "validation": {
    "required": "Dit veld is vereist",
    "invalidInput": "Ongeldige invoer",
    "minValue": "Minimumwaarde: {value}",
    "maxValue": "Maximumwaarde: {value}",
    "selectCountry": "Selecteer een land",
    "selectAtLeastOne": "Selecteer minstens één item"
  },
  "messages": {
    "success": "Actie geslaagd",
    "error": "Er is een fout opgetreden",
    "warning": "Waarschuwing",
    "info": "Informatie",
    "noData": "Geen gegevens beschikbaar",
    "tryAgain": "Probeer het opnieuw",
    "loading": "Bezig met laden, even geduld...",
    "saved": "Succesvol opgeslagen",
    "deleted": "Succesvol verwijderd",
    "updated": "Succesvol bijgewerkt"
  }
}
```

#### Acceptance Criteria
- [ ] All translation keys present and accurate
- [ ] Dutch translations are natural and professional
- [ ] Proper formatting for currency (EUR) and numbers
- [ ] No untranslated English strings
- [ ] JSON structure valid and matches source file
- [ ] Dutch terminology consistent throughout
- [ ] Legal/business language appropriate

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify JSON syntax
cat src/i18n/locales/nl.json | jq .
```

---

### Subtask 010.3: Polish Translation (pl.json)

#### Status
status: pending

#### Objective
Create complete Polish translation file with all keys translated naturally for Polish speakers.

#### Context
Polish is important for Central European market expansion. Translations should be clear and professional for the Polish business audience.

#### Files to Create/Modify (Exclusive Ownership)
- `src/i18n/locales/pl.json` - Polish translations

#### Implementation

```json
{
  "common": {
    "appTitle": "Kalkulator Rejestracji Znaków Towarowych",
    "appDescription": "Oblicz koszty rejestracji znaków towarowych w krajach europejskich",
    "language": "Język",
    "country": "Kraj",
    "currency": "EUR",
    "loading": "Ładowanie...",
    "error": "Wystąpił błąd",
    "success": "Powodzenie",
    "cancel": "Anuluj",
    "confirm": "Potwierdź",
    "close": "Zamknij",
    "back": "Wstecz",
    "next": "Dalej",
    "save": "Zapisz",
    "delete": "Usuń",
    "edit": "Edytuj",
    "search": "Szukaj",
    "clear": "Wyczyść",
    "reset": "Resetuj",
    "noResults": "Nie znaleziono wyników"
  },
  "navigation": {
    "worldMap": "Mapa świata",
    "countryList": "Lista krajów",
    "calculator": "Kalkulator",
    "about": "O nas",
    "contact": "Kontakt",
    "help": "Pomoc"
  },
  "theme": {
    "dark": "Ciemny",
    "light": "Jasny",
    "system": "System",
    "toggleTheme": "Zmień design"
  },
  "calculator": {
    "title": "Kalkulator Rejestracji Znaków Towarowych",
    "subtitle": "Oblicz koszty rejestracji",
    "numberOfClasses": "Liczba klas",
    "classesLabel": "Klasy",
    "registrationType": "Typ rejestracji",
    "standard": "Standardowa",
    "express": "Express",
    "priority": "Priorytet",
    "optionalServices": "Usługi dodatkowe",
    "monitoring": "Monitorowanie",
    "legalSupport": "Wsparcie prawne",
    "fastTrack": "Przyspieszenie",
    "basePrice": "Cena podstawowa",
    "servicesPrice": "Opłaty za usługi",
    "totalPrice": "Cena całkowita",
    "calculate": "Oblicz",
    "resetCalculator": "Resetuj",
    "priceEstimate": "Szacunkowe koszty",
    "perClass": "za klasę",
    "savings": "Oszczędności"
  },
  "globe": {
    "title": "Mapa świata",
    "selectCountry": "Wybierz kraj",
    "rotating": "Automatyczne obrót",
    "stopRotation": "Zatrzymaj obrót",
    "startRotation": "Rozpocznij obrót",
    "zoom": "Powiększenie",
    "zoomIn": "Powiększ",
    "zoomOut": "Pomniejsz",
    "resetView": "Zresetuj widok",
    "noCountrySelected": "Nie wybrano kraju",
    "selectToCalculate": "Wybierz kraj, aby rozpocząć"
  },
  "countryList": {
    "title": "Lista krajów",
    "searchPlaceholder": "Szukaj kraju...",
    "filter": "Filtruj",
    "continent": "Kontynent",
    "europe": "Europa",
    "asia": "Azja",
    "africa": "Afryka",
    "americas": "Ameryka",
    "oceania": "Oceania",
    "all": "Wszystkie",
    "countries": "Kraje",
    "selectedCountries": "Wybrane kraje",
    "noCountries": "Nie znaleziono krajów",
    "clearSelection": "Wyczyść wybór"
  },
  "pricing": {
    "title": "Cennik",
    "basePrice": "Cena podstawowa",
    "additionalServices": "Usługi dodatkowe",
    "currency": "EUR",
    "estimatedCost": "Szacunkowe koszty",
    "finalPrice": "Cena ostateczna",
    "discounts": "Rabaty",
    "vatNotIncluded": "VAT nie wliczony",
    "priceBreakdown": "Podział kosztów"
  },
  "validation": {
    "required": "To pole jest wymagane",
    "invalidInput": "Nieprawidłowe wejście",
    "minValue": "Wartość minimalna: {value}",
    "maxValue": "Wartość maksymalna: {value}",
    "selectCountry": "Proszę wybrać kraj",
    "selectAtLeastOne": "Proszę wybrać co najmniej jeden element"
  },
  "messages": {
    "success": "Operacja powiodła się",
    "error": "Wystąpił błąd",
    "warning": "Ostrzeżenie",
    "info": "Informacja",
    "noData": "Brak dostępnych danych",
    "tryAgain": "Spróbuj ponownie",
    "loading": "Ładowanie, proszę czekać...",
    "saved": "Pomyślnie zapisano",
    "deleted": "Pomyślnie usunięto",
    "updated": "Pomyślnie zaktualizowano"
  }
}
```

#### Acceptance Criteria
- [ ] All translation keys present and accurate
- [ ] Polish translations are natural and professional
- [ ] Proper formatting for currency (EUR) and numbers
- [ ] No untranslated English strings
- [ ] JSON structure valid and matches source file
- [ ] Polish terminology consistent throughout
- [ ] Legal/business language appropriate

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify JSON syntax
cat src/i18n/locales/pl.json | jq .
```

---

### Subtask 010.4: Swedish Translation (sv.json)

#### Status
status: pending

#### Objective
Create complete Swedish translation file with all keys translated naturally for Swedish speakers.

#### Context
Swedish is important for Scandinavian market. Translations should be professional and clear for Swedish business audience.

#### Files to Create/Modify (Exclusive Ownership)
- `src/i18n/locales/sv.json` - Swedish translations

#### Implementation

```json
{
  "common": {
    "appTitle": "Märkesregistreringskalkylator",
    "appDescription": "Beräkna märkesregistreringskostnader i europeiska länder",
    "language": "Språk",
    "country": "Land",
    "currency": "EUR",
    "loading": "Läser in...",
    "error": "Ett fel har inträffat",
    "success": "Lyckades",
    "cancel": "Avbryt",
    "confirm": "Bekräfta",
    "close": "Stäng",
    "back": "Tillbaka",
    "next": "Nästa",
    "save": "Spara",
    "delete": "Ta bort",
    "edit": "Redigera",
    "search": "Sök",
    "clear": "Rensa",
    "reset": "Återställ",
    "noResults": "Inga resultat hittades"
  },
  "navigation": {
    "worldMap": "Världskarta",
    "countryList": "Länderlista",
    "calculator": "Miniräknare",
    "about": "Om oss",
    "contact": "Kontakt",
    "help": "Hjälp"
  },
  "theme": {
    "dark": "Mörk",
    "light": "Ljus",
    "system": "System",
    "toggleTheme": "Växla design"
  },
  "calculator": {
    "title": "Märkesregistreringskalkylator",
    "subtitle": "Beräkna dina registreringskostnader",
    "numberOfClasses": "Antal klasser",
    "classesLabel": "Klasser",
    "registrationType": "Registreringstyp",
    "standard": "Standard",
    "express": "Express",
    "priority": "Prioritet",
    "optionalServices": "Valfria tjänster",
    "monitoring": "Övervakning",
    "legalSupport": "Juridisk support",
    "fastTrack": "Snabbspår",
    "basePrice": "Baspris",
    "servicesPrice": "Serviceavgifter",
    "totalPrice": "Totalpris",
    "calculate": "Beräkna",
    "resetCalculator": "Återställ",
    "priceEstimate": "Uppskattade kostnader",
    "perClass": "per klass",
    "savings": "Besparingar"
  },
  "globe": {
    "title": "Världskarta",
    "selectCountry": "Välj ett land",
    "rotating": "Automatisk rotation",
    "stopRotation": "Stoppa rotation",
    "startRotation": "Starta rotation",
    "zoom": "Zoom",
    "zoomIn": "Zooma in",
    "zoomOut": "Zooma ut",
    "resetView": "Återställ vy",
    "noCountrySelected": "Inget land valt",
    "selectToCalculate": "Välj ett land för att börja"
  },
  "countryList": {
    "title": "Länderlista",
    "searchPlaceholder": "Sök efter ett land...",
    "filter": "Filtrera",
    "continent": "Kontinent",
    "europe": "Europa",
    "asia": "Asien",
    "africa": "Afrika",
    "americas": "Amerika",
    "oceania": "Oceanien",
    "all": "Alla",
    "countries": "Länder",
    "selectedCountries": "Valda länder",
    "noCountries": "Inga länder hittades",
    "clearSelection": "Rensa val"
  },
  "pricing": {
    "title": "Prissättning",
    "basePrice": "Baspris",
    "additionalServices": "Valfria tjänster",
    "currency": "EUR",
    "estimatedCost": "Uppskattade kostnader",
    "finalPrice": "Slutpris",
    "discounts": "Rabatter",
    "vatNotIncluded": "Moms ej inkluderad",
    "priceBreakdown": "Kostnadsbeskrivning"
  },
  "validation": {
    "required": "Det här fältet är obligatoriskt",
    "invalidInput": "Ogiltig inmatning",
    "minValue": "Minimivärde: {value}",
    "maxValue": "Maximivärde: {value}",
    "selectCountry": "Vänligen välj ett land",
    "selectAtLeastOne": "Vänligen välj minst ett objekt"
  },
  "messages": {
    "success": "Åtgärden lyckades",
    "error": "Ett fel har inträffat",
    "warning": "Varning",
    "info": "Information",
    "noData": "Ingen data tillgänglig",
    "tryAgain": "Försök igen",
    "loading": "Läser in, vänligen vänta...",
    "saved": "Sparad",
    "deleted": "Raderad",
    "updated": "Uppdaterad"
  }
}
```

#### Acceptance Criteria
- [ ] All translation keys present and accurate
- [ ] Swedish translations are natural and professional
- [ ] Proper formatting for currency (EUR) and numbers
- [ ] No untranslated English strings
- [ ] JSON structure valid and matches source file
- [ ] Swedish terminology consistent throughout
- [ ] Legal/business language appropriate

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify JSON syntax
cat src/i18n/locales/sv.json | jq .
```

---

### Subtask 010.5: Greek Translation (el.json)

#### Status
status: pending

#### Objective
Create complete Greek translation file with all keys translated naturally for Greek speakers.

#### Context
Greek expands market reach to Greece and Cyprus. Translations should be professional and clear for the Greek business community.

#### Files to Create/Modify (Exclusive Ownership)
- `src/i18n/locales/el.json` - Greek translations

#### Implementation

```json
{
  "common": {
    "appTitle": "Αριθμομηχανή Εγγραφής Εμπορικών Σημάτων",
    "appDescription": "Υπολογίστε το κόστος εγγραφής εμπορικών σημάτων σε ευρωπαϊκές χώρες",
    "language": "Γλώσσα",
    "country": "Χώρα",
    "currency": "EUR",
    "loading": "Φόρτωση...",
    "error": "Παρουσιάστηκε σφάλμα",
    "success": "Επιτυχία",
    "cancel": "Ακύρωση",
    "confirm": "Επιβεβαίωση",
    "close": "Κλείσιμο",
    "back": "Πίσω",
    "next": "Επόμενο",
    "save": "Αποθήκευση",
    "delete": "Διذγραφή",
    "edit": "Επεξεργασία",
    "search": "Αναζήτηση",
    "clear": "Κατάκαθαρση",
    "reset": "Επαναφορά",
    "noResults": "Δεν βρέθηκαν αποτελέσματα"
  },
  "navigation": {
    "worldMap": "Παγκόσμιος Χάρτης",
    "countryList": "Λίστα Χωρών",
    "calculator": "Αριθμομηχανή",
    "about": "Σχετικά με Εμάς",
    "contact": "Επικοινωνία",
    "help": "Βοήθεια"
  },
  "theme": {
    "dark": "Σκοτεινό",
    "light": "Φωτεινό",
    "system": "Σύστημα",
    "toggleTheme": "Εναλλαγή Σχεδίασης"
  },
  "calculator": {
    "title": "Αριθμομηχανή Εγγραφής Εμπορικών Σημάτων",
    "subtitle": "Υπολογίστε τα κόστη εγγραφής σας",
    "numberOfClasses": "Αριθμός Τάξεων",
    "classesLabel": "Τάξεις",
    "registrationType": "Τύπος Εγγραφής",
    "standard": "Τυπική",
    "express": "Express",
    "priority": "Προτεραιότητα",
    "optionalServices": "Προαιρετικές Υπηρεσίες",
    "monitoring": "Παρακολούθηση",
    "legalSupport": "Νομική Υποστήριξη",
    "fastTrack": "Γρήγορη Διαδρομή",
    "basePrice": "Βασική Τιμή",
    "servicesPrice": "Τέλη Υπηρεσιών",
    "totalPrice": "Συνολική Τιμή",
    "calculate": "Υπολογισμός",
    "resetCalculator": "Επαναφορά",
    "priceEstimate": "Εκτιμώμενα Κόστη",
    "perClass": "ανά τάξη",
    "savings": "Εξοικονομήσεις"
  },
  "globe": {
    "title": "Παγκόσμιος Χάρτης",
    "selectCountry": "Επιλέξτε μια Χώρα",
    "rotating": "Αυτόματη Περιστροφή",
    "stopRotation": "Σταματήστε την Περιστροφή",
    "startRotation": "Ξεκινήστε την Περιστροφή",
    "zoom": "Μεγέθυνση",
    "zoomIn": "Μεγέθυνση",
    "zoomOut": "Σμίκρυνση",
    "resetView": "Επαναφορά Προβολής",
    "noCountrySelected": "Δεν Επιλέχθηκε Χώρα",
    "selectToCalculate": "Επιλέξτε μια χώρα για να ξεκινήσετε"
  },
  "countryList": {
    "title": "Λίστα Χωρών",
    "searchPlaceholder": "Αναζήτηση χώρας...",
    "filter": "Φιλτράρισμα",
    "continent": "Ηπείρων",
    "europe": "Ευρώπη",
    "asia": "Ασία",
    "africa": "Αφρική",
    "americas": "Αμερική",
    "oceania": "Ωκεανία",
    "all": "Όλες",
    "countries": "Χώρες",
    "selectedCountries": "Επιλεγμένες Χώρες",
    "noCountries": "Δεν Βρέθηκαν Χώρες",
    "clearSelection": "Κατάκαθαρση Επιλογής"
  },
  "pricing": {
    "title": "Προσδιορισμός Τιμής",
    "basePrice": "Βασική Τιμή",
    "additionalServices": "Προαιρετικές Υπηρεσίες",
    "currency": "EUR",
    "estimatedCost": "Εκτιμώμενα Κόστη",
    "finalPrice": "Τελική Τιμή",
    "discounts": "Εκπτώσεις",
    "vatNotIncluded": "ΦΠΑ Δεν περιλαμβάνεται",
    "priceBreakdown": "Ανάλυση Κόστους"
  },
  "validation": {
    "required": "Αυτό το πεδίο είναι απαιτούμενο",
    "invalidInput": "Μη έγκυρη εισαγωγή",
    "minValue": "Ελάχιστη τιμή: {value}",
    "maxValue": "Μέγιστη τιμή: {value}",
    "selectCountry": "Επιλέξτε μια χώρα",
    "selectAtLeastOne": "Επιλέξτε τουλάχιστον ένα στοιχείο"
  },
  "messages": {
    "success": "Η ενέργεια ήταν επιτυχής",
    "error": "Παρουσιάστηκε σφάλμα",
    "warning": "Προειδοποίηση",
    "info": "Πληροφορίες",
    "noData": "Κανένα δεδομένο διαθέσιμο",
    "tryAgain": "Προσπαθήστε ξανά",
    "loading": "Φόρτωση, παρακαλώ περιμένετε...",
    "saved": "Αποθηκεύθηκε με Επιτυχία",
    "deleted": "Διεγράφη με Επιτυχία",
    "updated": "Ενημερώθηκε με Επιτυχία"
  }
}
```

#### Acceptance Criteria
- [ ] All translation keys present and accurate
- [ ] Greek translations are natural and professional
- [ ] Proper formatting for currency (EUR) and numbers
- [ ] No untranslated English strings
- [ ] JSON structure valid and matches source file
- [ ] Greek terminology consistent throughout
- [ ] Legal/business language appropriate

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify JSON syntax
cat src/i18n/locales/el.json | jq .
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/i18n/locales/de.json`
- `src/i18n/locales/nl.json`
- `src/i18n/locales/pl.json`
- `src/i18n/locales/sv.json`
- `src/i18n/locales/el.json`

### Imports From Existing Code
- None (translation files are data files, not code)

### Exports For Other Code
- Translation strings via i18next integration (configured in task 11)
- Used by i18n hook and language atom (task 2)

---

## Task-Level Verification
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator

# Verify all translation files exist
test -f src/i18n/locales/de.json && echo "German translation OK"
test -f src/i18n/locales/nl.json && echo "Dutch translation OK"
test -f src/i18n/locales/pl.json && echo "Polish translation OK"
test -f src/i18n/locales/sv.json && echo "Swedish translation OK"
test -f src/i18n/locales/el.json && echo "Greek translation OK"

# Verify JSON syntax
jq . src/i18n/locales/de.json > /dev/null && echo "German JSON valid"
jq . src/i18n/locales/nl.json > /dev/null && echo "Dutch JSON valid"
jq . src/i18n/locales/pl.json > /dev/null && echo "Polish JSON valid"
jq . src/i18n/locales/sv.json > /dev/null && echo "Swedish JSON valid"
jq . src/i18n/locales/el.json > /dev/null && echo "Greek JSON valid"

# Type check
npm run type-check
```

---

## Parallelization Notes
- All 5 subtasks in this task can run in complete parallel
- Each subtask owns a single, exclusive translation file
- No subtask depends on another subtask's output
- Translation files are independent data files
- All subtasks can be completed simultaneously without any ordering requirements
- No file conflicts or shared dependencies between language files
