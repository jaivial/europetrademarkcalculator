# Frontend Task 009: i18n - Romance Language Translations

## Metadata
- **Task**: 9 of 40
- **Area**: Frontend
- **Feature**: Internationalization - Romance Languages
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 4
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create complete translation files for Romance languages: Spanish (es), French (fr), Italian (it), and Portuguese (pt). All UI strings, labels, messages, and content are translated to match the English base language structure. Each subtask is fully independent with exclusive file ownership. No subtask depends on another subtask's output.

---

## Subtasks

### Subtask 009.1: Spanish (es) Translation File

#### Status
status: pending

#### Objective
Create complete Spanish translation file matching the English translation structure with professional, natural Spanish terminology.

#### Context
Spanish translation is essential for Spanish-speaking European users (Spain, Portugal region users). Must maintain identical JSON structure as English file with keys for all UI sections: app metadata, navigation, theme, language selection, world map, country list, country cards, calculator, error messages, and common UI terms.

#### Files to Create/Modify (Exclusive Ownership)
- `src/i18n/locales/es.json` - Complete Spanish translations

#### Implementation

```json
{
  "app": {
    "title": "Calculadora de Registro de Marcas",
    "description": "Calcule los costos de registro de marcas en países europeos"
  },
  "navigation": {
    "worldMap": "Mapa Mundial",
    "countryList": "Lista de Países"
  },
  "theme": {
    "light": "Modo Claro",
    "dark": "Modo Oscuro",
    "toggle": "Cambiar Tema"
  },
  "language": {
    "select": "Seleccionar Idioma",
    "current": "Idioma Actual"
  },
  "worldMap": {
    "title": "Mapa Mundial Interactivo",
    "clickToSelect": "Haga clic en un país para seleccionarlo",
    "rotateGlobe": "Arrastre para rotar el globo",
    "zoomIn": "Acercar",
    "zoomOut": "Alejar",
    "resetView": "Restablecer Vista"
  },
  "countryList": {
    "title": "Países",
    "search": "Buscar países...",
    "filterByContinent": "Filtrar por Continente",
    "filterByRegion": "Filtrar por Región",
    "sortBy": "Ordenar Por",
    "noResults": "No se encontraron países",
    "showingResults": "Mostrando {{count}} países",
    "allContinents": "Todos los Continentes",
    "europe": "Europa",
    "asia": "Asia",
    "africa": "África",
    "americas": "Américas",
    "oceania": "Oceanía"
  },
  "countryCard": {
    "select": "Seleccionar",
    "selected": "Seleccionado",
    "basePrice": "Precio Base",
    "pricePerClass": "Por Clase",
    "viewDetails": "Ver Detalles",
    "population": "Población",
    "capital": "Capital",
    "currency": "Moneda"
  },
  "calculator": {
    "title": "Calculadora de Registro de Marca",
    "selectCountry": "Por favor, seleccione un país primero",
    "numberOfClasses": "Número de Clases",
    "classesInfo": "Seleccione 1-45 clases de Clasificación de Niza",
    "registrationType": "Tipo de Registro",
    "standard": "Estándar",
    "standardDesc": "Tiempo de procesamiento normal",
    "express": "Express",
    "expressDesc": "Procesamiento más rápido",
    "priority": "Prioritario",
    "priorityDesc": "Procesamiento más rápido",
    "optionalServices": "Servicios Opcionales",
    "monitoring": "Monitoreo de Marca",
    "monitoringDesc": "Monitorear posibles infracciones",
    "legalSupport": "Apoyo Legal",
    "legalSupportDesc": "Consulta y apoyo legal",
    "fastTrack": "Vía Rápida",
    "fastTrackDesc": "Examen acelerado",
    "priceBreakdown": "Desglose de Precios",
    "baseRegistration": "Registro Base",
    "additionalClasses": "Clases Adicionales",
    "servicesTotal": "Total de Servicios",
    "subtotal": "Subtotal",
    "tax": "Impuesto",
    "total": "Total",
    "estimatedTime": "Tiempo de Procesamiento Estimado",
    "calculate": "Calcular",
    "reset": "Restablecer",
    "saveCalculation": "Guardar Cálculo"
  },
  "errors": {
    "countryNotSelected": "Por favor, seleccione un país",
    "invalidNumberOfClasses": "El número de clases debe estar entre 1 y 45",
    "calculationFailed": "El cálculo falló. Por favor, inténtelo de nuevo.",
    "networkError": "Error de red. Por favor, verifique su conexión.",
    "unknownError": "Ocurrió un error desconocido"
  },
  "common": {
    "loading": "Cargando...",
    "error": "Error",
    "success": "Éxito",
    "close": "Cerrar",
    "cancel": "Cancelar",
    "confirm": "Confirmar",
    "save": "Guardar",
    "delete": "Eliminar",
    "edit": "Editar",
    "back": "Atrás",
    "next": "Siguiente",
    "previous": "Anterior",
    "yes": "Sí",
    "no": "No"
  }
}
```

#### Acceptance Criteria
- [ ] All Spanish translations complete and accurate
- [ ] JSON structure matches English file exactly
- [ ] All keys translated (no English fallbacks)
- [ ] Professional Spanish terminology
- [ ] Proper Spanish grammar and accents
- [ ] JSON is valid and parseable
- [ ] No circular references or missing values
- [ ] Common UI terms standardized across sections

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify es.json is valid JSON
node -e "console.log(JSON.parse(require('fs').readFileSync('src/i18n/locales/es.json')))"
```

---

### Subtask 009.2: French (fr) Translation File

#### Status
status: pending

#### Objective
Create complete French translation file matching the English translation structure with professional, natural French terminology.

#### Context
French translation is critical for French-speaking European users. Must maintain identical JSON structure as English file with precise French terminology appropriate for legal/trademark context.

#### Files to Create/Modify (Exclusive Ownership)
- `src/i18n/locales/fr.json` - Complete French translations

#### Implementation

```json
{
  "app": {
    "title": "Calculateur d'Enregistrement de Marque",
    "description": "Calculez les coûts d'enregistrement de marque dans les pays européens"
  },
  "navigation": {
    "worldMap": "Carte du Monde",
    "countryList": "Liste des Pays"
  },
  "theme": {
    "light": "Mode Clair",
    "dark": "Mode Sombre",
    "toggle": "Changer de Thème"
  },
  "language": {
    "select": "Sélectionner la Langue",
    "current": "Langue Actuelle"
  },
  "worldMap": {
    "title": "Carte du Monde Interactive",
    "clickToSelect": "Cliquez sur un pays pour le sélectionner",
    "rotateGlobe": "Faites glisser pour faire pivoter le globe",
    "zoomIn": "Zoomer",
    "zoomOut": "Dézoomer",
    "resetView": "Réinitialiser la Vue"
  },
  "countryList": {
    "title": "Pays",
    "search": "Rechercher des pays...",
    "filterByContinent": "Filtrer par Continent",
    "filterByRegion": "Filtrer par Région",
    "sortBy": "Trier Par",
    "noResults": "Aucun pays trouvé",
    "showingResults": "Affichage de {{count}} pays",
    "allContinents": "Tous les Continents",
    "europe": "Europe",
    "asia": "Asie",
    "africa": "Afrique",
    "americas": "Amériques",
    "oceania": "Océanie"
  },
  "countryCard": {
    "select": "Sélectionner",
    "selected": "Sélectionné",
    "basePrice": "Prix de Base",
    "pricePerClass": "Par Classe",
    "viewDetails": "Voir les Détails",
    "population": "Population",
    "capital": "Capitale",
    "currency": "Devise"
  },
  "calculator": {
    "title": "Calculateur d'Enregistrement de Marque",
    "selectCountry": "Veuillez d'abord sélectionner un pays",
    "numberOfClasses": "Nombre de Classes",
    "classesInfo": "Sélectionnez 1-45 classes de Classification de Nice",
    "registrationType": "Type d'Enregistrement",
    "standard": "Standard",
    "standardDesc": "Temps de traitement normal",
    "express": "Express",
    "expressDesc": "Traitement plus rapide",
    "priority": "Prioritaire",
    "priorityDesc": "Traitement plus rapide",
    "optionalServices": "Services Optionnels",
    "monitoring": "Surveillance de Marque",
    "monitoringDesc": "Surveillez les contrefaçons potentielles",
    "legalSupport": "Soutien Juridique",
    "legalSupportDesc": "Consultation et assistance juridiques",
    "fastTrack": "Voie Rapide",
    "fastTrackDesc": "Examen accéléré",
    "priceBreakdown": "Détail des Prix",
    "baseRegistration": "Enregistrement de Base",
    "additionalClasses": "Classes Supplémentaires",
    "servicesTotal": "Total des Services",
    "subtotal": "Sous-total",
    "tax": "Taxe",
    "total": "Total",
    "estimatedTime": "Temps de Traitement Estimé",
    "calculate": "Calculer",
    "reset": "Réinitialiser",
    "saveCalculation": "Enregistrer le Calcul"
  },
  "errors": {
    "countryNotSelected": "Veuillez sélectionner un pays",
    "invalidNumberOfClasses": "Le nombre de classes doit être entre 1 et 45",
    "calculationFailed": "Le calcul a échoué. Veuillez réessayer.",
    "networkError": "Erreur réseau. Veuillez vérifier votre connexion.",
    "unknownError": "Une erreur inconnue s'est produite"
  },
  "common": {
    "loading": "Chargement...",
    "error": "Erreur",
    "success": "Succès",
    "close": "Fermer",
    "cancel": "Annuler",
    "confirm": "Confirmer",
    "save": "Enregistrer",
    "delete": "Supprimer",
    "edit": "Modifier",
    "back": "Retour",
    "next": "Suivant",
    "previous": "Précédent",
    "yes": "Oui",
    "no": "Non"
  }
}
```

#### Acceptance Criteria
- [ ] All French translations complete and accurate
- [ ] JSON structure matches English file exactly
- [ ] All keys translated (no English fallbacks)
- [ ] Professional French terminology
- [ ] Proper French grammar and accents
- [ ] JSON is valid and parseable
- [ ] Accent characters properly encoded (é, è, ê, ù, etc.)
- [ ] Common UI terms standardized across sections

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify fr.json is valid JSON
node -e "console.log(JSON.parse(require('fs').readFileSync('src/i18n/locales/fr.json')))"
```

---

### Subtask 009.3: Italian (it) Translation File

#### Status
status: pending

#### Objective
Create complete Italian translation file matching the English translation structure with professional, natural Italian terminology.

#### Context
Italian translation serves Italian users across Europe. Must maintain identical JSON structure as English file with accurate Italian legal/business terminology.

#### Files to Create/Modify (Exclusive Ownership)
- `src/i18n/locales/it.json` - Complete Italian translations

#### Implementation

```json
{
  "app": {
    "title": "Calcolatore di Registrazione del Marchio",
    "description": "Calcola i costi di registrazione del marchio nei paesi europei"
  },
  "navigation": {
    "worldMap": "Mappa del Mondo",
    "countryList": "Elenco Paesi"
  },
  "theme": {
    "light": "Modalità Chiara",
    "dark": "Modalità Scura",
    "toggle": "Cambia Tema"
  },
  "language": {
    "select": "Seleziona Lingua",
    "current": "Lingua Attuale"
  },
  "worldMap": {
    "title": "Mappa Mondiale Interattiva",
    "clickToSelect": "Fai clic su un paese per selezionarlo",
    "rotateGlobe": "Trascina per ruotare il globo",
    "zoomIn": "Aumenta Zoom",
    "zoomOut": "Riduci Zoom",
    "resetView": "Ripristina Vista"
  },
  "countryList": {
    "title": "Paesi",
    "search": "Ricerca paesi...",
    "filterByContinent": "Filtra per Continente",
    "filterByRegion": "Filtra per Regione",
    "sortBy": "Ordina Per",
    "noResults": "Nessun paese trovato",
    "showingResults": "Visualizzazione di {{count}} paesi",
    "allContinents": "Tutti i Continenti",
    "europe": "Europa",
    "asia": "Asia",
    "africa": "Africa",
    "americas": "Americhe",
    "oceania": "Oceania"
  },
  "countryCard": {
    "select": "Seleziona",
    "selected": "Selezionato",
    "basePrice": "Prezzo Base",
    "pricePerClass": "Per Classe",
    "viewDetails": "Visualizza Dettagli",
    "population": "Popolazione",
    "capital": "Capitale",
    "currency": "Valuta"
  },
  "calculator": {
    "title": "Calcolatore di Registrazione del Marchio",
    "selectCountry": "Seleziona prima un paese",
    "numberOfClasses": "Numero di Classi",
    "classesInfo": "Seleziona 1-45 classi di Classificazione di Nizza",
    "registrationType": "Tipo di Registrazione",
    "standard": "Standard",
    "standardDesc": "Tempo di elaborazione normale",
    "express": "Express",
    "expressDesc": "Elaborazione più veloce",
    "priority": "Prioritario",
    "priorityDesc": "Elaborazione più veloce",
    "optionalServices": "Servizi Opzionali",
    "monitoring": "Monitoraggio del Marchio",
    "monitoringDesc": "Monitora potenziali contraffazioni",
    "legalSupport": "Supporto Legale",
    "legalSupportDesc": "Consulenza e supporto legale",
    "fastTrack": "Corsia Veloce",
    "fastTrackDesc": "Esame accelerato",
    "priceBreakdown": "Dettaglio dei Prezzi",
    "baseRegistration": "Registrazione Base",
    "additionalClasses": "Classi Aggiuntive",
    "servicesTotal": "Totale Servizi",
    "subtotal": "Subtotale",
    "tax": "Tassa",
    "total": "Totale",
    "estimatedTime": "Tempo di Elaborazione Stimato",
    "calculate": "Calcola",
    "reset": "Ripristina",
    "saveCalculation": "Salva Calcolo"
  },
  "errors": {
    "countryNotSelected": "Seleziona un paese",
    "invalidNumberOfClasses": "Il numero di classi deve essere tra 1 e 45",
    "calculationFailed": "Calcolo fallito. Riprova.",
    "networkError": "Errore di rete. Controlla la tua connessione.",
    "unknownError": "Si è verificato un errore sconosciuto"
  },
  "common": {
    "loading": "Caricamento...",
    "error": "Errore",
    "success": "Successo",
    "close": "Chiudi",
    "cancel": "Annulla",
    "confirm": "Conferma",
    "save": "Salva",
    "delete": "Elimina",
    "edit": "Modifica",
    "back": "Indietro",
    "next": "Prossimo",
    "previous": "Precedente",
    "yes": "Sì",
    "no": "No"
  }
}
```

#### Acceptance Criteria
- [ ] All Italian translations complete and accurate
- [ ] JSON structure matches English file exactly
- [ ] All keys translated (no English fallbacks)
- [ ] Professional Italian terminology
- [ ] Proper Italian grammar (accents on é, à where appropriate)
- [ ] JSON is valid and parseable
- [ ] No special characters causing encoding issues
- [ ] Common UI terms standardized across sections

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify it.json is valid JSON
node -e "console.log(JSON.parse(require('fs').readFileSync('src/i18n/locales/it.json')))"
```

---

### Subtask 009.4: Portuguese (pt) Translation File

#### Status
status: pending

#### Objective
Create complete Portuguese translation file matching the English translation structure with professional, natural Portuguese terminology.

#### Context
Portuguese translation serves Portuguese and Portuguese-speaking European users. Must maintain identical JSON structure as English file with accurate Portuguese terminology.

#### Files to Create/Modify (Exclusive Ownership)
- `src/i18n/locales/pt.json` - Complete Portuguese translations

#### Implementation

```json
{
  "app": {
    "title": "Calculadora de Registro de Marca",
    "description": "Calcule os custos de registro de marca em países europeus"
  },
  "navigation": {
    "worldMap": "Mapa Mundial",
    "countryList": "Lista de Países"
  },
  "theme": {
    "light": "Modo Claro",
    "dark": "Modo Escuro",
    "toggle": "Alternar Tema"
  },
  "language": {
    "select": "Selecionar Idioma",
    "current": "Idioma Atual"
  },
  "worldMap": {
    "title": "Mapa Mundi Interativo",
    "clickToSelect": "Clique em um país para selecioná-lo",
    "rotateGlobe": "Arraste para girar o globo",
    "zoomIn": "Aumentar Zoom",
    "zoomOut": "Diminuir Zoom",
    "resetView": "Redefinir Visualização"
  },
  "countryList": {
    "title": "Países",
    "search": "Pesquisar países...",
    "filterByContinent": "Filtrar por Continente",
    "filterByRegion": "Filtrar por Região",
    "sortBy": "Ordenar Por",
    "noResults": "Nenhum país encontrado",
    "showingResults": "Exibindo {{count}} países",
    "allContinents": "Todos os Continentes",
    "europe": "Europa",
    "asia": "Ásia",
    "africa": "África",
    "americas": "Américas",
    "oceania": "Oceania"
  },
  "countryCard": {
    "select": "Selecionar",
    "selected": "Selecionado",
    "basePrice": "Preço Base",
    "pricePerClass": "Por Classe",
    "viewDetails": "Ver Detalhes",
    "population": "População",
    "capital": "Capital",
    "currency": "Moeda"
  },
  "calculator": {
    "title": "Calculadora de Registro de Marca",
    "selectCountry": "Selecione um país primeiro",
    "numberOfClasses": "Número de Classes",
    "classesInfo": "Selecione 1-45 classes de Classificação de Nice",
    "registrationType": "Tipo de Registro",
    "standard": "Padrão",
    "standardDesc": "Tempo de processamento normal",
    "express": "Express",
    "expressDesc": "Processamento mais rápido",
    "priority": "Prioritário",
    "priorityDesc": "Processamento mais rápido",
    "optionalServices": "Serviços Opcionais",
    "monitoring": "Monitoramento de Marca",
    "monitoringDesc": "Monitore possíveis infrações",
    "legalSupport": "Suporte Jurídico",
    "legalSupportDesc": "Consultoria e suporte jurídico",
    "fastTrack": "Via Rápida",
    "fastTrackDesc": "Exame acelerado",
    "priceBreakdown": "Detalhamento de Preços",
    "baseRegistration": "Registro Base",
    "additionalClasses": "Classes Adicionais",
    "servicesTotal": "Total de Serviços",
    "subtotal": "Subtotal",
    "tax": "Imposto",
    "total": "Total",
    "estimatedTime": "Tempo de Processamento Estimado",
    "calculate": "Calcular",
    "reset": "Redefinir",
    "saveCalculation": "Salvar Cálculo"
  },
  "errors": {
    "countryNotSelected": "Selecione um país",
    "invalidNumberOfClasses": "O número de classes deve estar entre 1 e 45",
    "calculationFailed": "Falha no cálculo. Tente novamente.",
    "networkError": "Erro de rede. Verifique sua conexão.",
    "unknownError": "Ocorreu um erro desconhecido"
  },
  "common": {
    "loading": "Carregando...",
    "error": "Erro",
    "success": "Sucesso",
    "close": "Fechar",
    "cancel": "Cancelar",
    "confirm": "Confirmar",
    "save": "Salvar",
    "delete": "Excluir",
    "edit": "Editar",
    "back": "Voltar",
    "next": "Próximo",
    "previous": "Anterior",
    "yes": "Sim",
    "no": "Não"
  }
}
```

#### Acceptance Criteria
- [ ] All Portuguese translations complete and accurate
- [ ] JSON structure matches English file exactly
- [ ] All keys translated (no English fallbacks)
- [ ] Professional Portuguese terminology
- [ ] Proper Portuguese grammar and accents (ã, õ, ç, á, é, etc.)
- [ ] JSON is valid and parseable
- [ ] Accent characters properly encoded
- [ ] Common UI terms standardized across sections

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
# Verify pt.json is valid JSON
node -e "console.log(JSON.parse(require('fs').readFileSync('src/i18n/locales/pt.json')))"
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/i18n/locales/es.json` - Spanish translations (exclusive)
- `src/i18n/locales/fr.json` - French translations (exclusive)
- `src/i18n/locales/it.json` - Italian translations (exclusive)
- `src/i18n/locales/pt.json` - Portuguese translations (exclusive)

### Imports From Existing Code
- English translation file structure from Task 004 (reference only, not imported)
- i18n configuration from Task 004 (which loads these files)

### Exports For Other Code
- Translation resources for all Romance language speakers
- JSON files loaded by i18n system in Task 004
- Language strings for components across application

---

## Task-Level Verification
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator

# Verify all JSON files are valid
node -e "
const fs = require('fs');
const langs = ['es', 'fr', 'it', 'pt'];
langs.forEach(lang => {
  try {
    const data = JSON.parse(fs.readFileSync(\`src/i18n/locales/\${lang}.json\`));
    console.log(\`✓ \${lang}.json is valid\`);
  } catch (e) {
    console.error(\`✗ \${lang}.json error: \${e.message}\`);
  }
});
"

# Run type checking
npm run type-check

# Run linting
npm run lint
```

---

## Parallelization Notes
- All 4 subtasks are completely independent
- Each subtask owns exactly one translation file
- No subtask depends on another subtask's output
- All files can be created in parallel (ES, FR, IT, PT simultaneously)
- No cross-dependencies between language files
- Each language file follows identical structure
- All subtasks can run first, last, or simultaneously
- Tasks can be completed in any order
