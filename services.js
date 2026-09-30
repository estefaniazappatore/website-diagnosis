
/*
=====================================================
WEBSITE DIAGNOSIS
PREVENTIVATORE NUOVI SERVIZI — VERSIONE 2
=====================================================

Questo file deve essere caricato DOPO script.js.

Modifica esclusivamente la sezione dedicata
ai nuovi servizi. La diagnosi dei fix WordPress
rimane invariata.

IMPORTANTE
Le cifre sono stime commerciali orientative,
non preventivi definitivi o vincolanti.
=====================================================
*/


/* =================================================
   CONFIGURAZIONE ECONOMICA
================================================= */

const servicePricing = {

  // Tariffa interna. Non viene mostrata al cliente.
  hourlyRate: 60,

  // Fasce di incertezza della stima.
  standardBuffer: 0.25,
  uncertainBuffer: 0.40,

  // Arrotondamento al multiplo superiore.
  rounding: 50,

  // Minimi commerciali dei progetti.
  minimums: {
    pages: 300,
    landing: 600,
    redesign: 1080,
    new_site: 1500,
    ecommerce_new: 2700,
    ecommerce_expand: 720,
    feature: 300,
    migration: 480,
    other: 600
  },

  // Materiali consegnati dopo questa finestra:
  // inserimento da quotare separatamente.
  materialsWindowDays: 30

};


/* =================================================
   UTILITÀ
================================================= */

function serviceEuro(amount) {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(amount);
}


function serviceRound(amount) {
  return Math.ceil(
    amount / servicePricing.rounding
  ) * servicePricing.rounding;
}


function serviceOption(label, value, next) {
  return { label, value, next };
}


/* =================================================
   DOMANDA PRINCIPALE NUOVI SERVIZI
================================================= */

questions.request_type = {

  text: 'Che cosa vorresti realizzare?',

  saveAs: 'projectType',

  options: [

    serviceOption(
      '📄 Una o più pagine WordPress',
      'pages',
      'source_pages'
    ),

    serviceOption(
      '🎯 Una landing page',
      'landing',
      'source_landing'
    ),

    serviceOption(
      '🎨 Restyling di un sito',
      'redesign',
      'source_redesign'
    ),

    serviceOption(
      '🌐 Un nuovo sito WordPress',
      'new_site',
      'source_new_site'
    ),

    serviceOption(
      '🛒 Creare o ampliare un e-commerce',
      'ecommerce',
      'source_ecommerce'
    ),

    serviceOption(
      '⚙️ Aggiungere una funzionalità',
      'feature',
      'source_feature'
    ),

    serviceOption(
      '🔄 Migrazione di un sito',
      'migration',
      'source_migration'
    ),

    serviceOption(
      '🔧 Risolvere un problema tecnico',
      'repair',
      'something_wrong'
    ),

    serviceOption(
      'Altro / non so come definirlo',
      'other',
      'source_other'
    )

  ]

};


/* =================================================
   SITO NUOVO O ESISTENTE

   Generiamo una domanda specifica per ogni
   percorso: evitiamo modifiche al motore
   originale della chat.
================================================= */

const serviceEntryPoints = {

  pages: 'service_page_count',
  landing: 'service_page_count',
  redesign: 'service_page_count',
  new_site: 'service_page_count',
  ecommerce: 'service_ecommerce_kind',
  feature: 'service_complexity',
  migration: 'service_migration',
  other: 'service_other'

};


Object.entries(serviceEntryPoints).forEach(
  ([type, nextQuestion]) => {

    questions['source_' + type] = {

      text:
        'Partiamo da un sito nuovo oppure ' +
        'dobbiamo lavorare su un sito già esistente?',

      saveAs: 'projectSource',

      options: [

        serviceOption(
          'Partiamo da zero',
          'new',
          nextQuestion
        ),

        serviceOption(
          'Il sito esiste già',
          'existing',
          'builder_' + type
        ),

        serviceOption(
          'Non lo so / devo ancora decidere',
          'unknown',
          'builder_' + type
        )

      ]

    };


    questions['builder_' + type] = {

      text:
        'Sai come è costruito il sito attuale?',

      saveAs: 'projectBuilder',

      options: [

        serviceOption(
          'WordPress con Gutenberg',
          'gutenberg',
          nextQuestion
        ),

        serviceOption(
          'WordPress con Elementor',
          'elementor',
          nextQuestion
        ),

        serviceOption(
          'WordPress con Divi',
          'divi',
          nextQuestion
        ),

        serviceOption(
          'Tema o codice personalizzato',
          'custom',
          nextQuestion
        ),

        serviceOption(
          'Un altro page builder',
          'other',
          nextQuestion
        ),

        serviceOption(
          'Non lo so',
          'unknown',
          nextQuestion
        )

      ]

    };

  }
);


/* =================================================
   NUMERO PAGINE
================================================= */

questions.service_page_count = {

  text: 'Quante pagine sono coinvolte nel progetto?',

  saveAs: 'projectCount',

  options: [

    serviceOption(
      'Una pagina',
      '1',
      'service_design'
    ),

    serviceOption(
      '2–3 pagine',
      '3',
      'service_design'
    ),

    serviceOption(
      '4–6 pagine',
      '5',
      'service_design'
    ),

    serviceOption(
      '7 o più pagine',
      '8',
      'service_design'
    )

  ]

};


/* =================================================
   NUOVO E-COMMERCE O AMPLIAMENTO
================================================= */

questions.service_ecommerce_kind = {

  text: 'Che intervento vuoi fare sul negozio online?',

  saveAs: 'projectEcommerceKind',

  options: [

    serviceOption(
      'Creare un nuovo negozio WooCommerce',
      'new_shop',
      'service_catalog'
    ),

    serviceOption(
      'Ampliare un negozio già esistente',
      'expand',
      'service_catalog'
    ),

    serviceOption(
      'Non ho ancora deciso',
      'unknown',
      'service_catalog'
    )

  ]

};


questions.service_catalog = {

  text:
    'Quanti prodotti sono coinvolti ' +
    'nel progetto o nell’ampliamento?',

  saveAs: 'projectCatalog',

  options: [

    serviceOption(
      'Fino a 10 prodotti',
      'small',
      'service_design'
    ),

    serviceOption(
      'Da 11 a 50 prodotti',
      'medium',
      'service_design'
    ),

    serviceOption(
      'Da 51 a 200 prodotti',
      'large',
      'service_design'
    ),

    serviceOption(
      'Più di 200 prodotti',
      'extra_large',
      'service_design'
    ),

    serviceOption(
      'Non lo so ancora',
      'unknown',
      'service_design'
    )

  ]

};


/* =================================================
   NUOVE FUNZIONALITÀ
================================================= */

questions.service_complexity = {

  text: 'Che tipo di funzionalità vuoi aggiungere?',

  saveAs: 'projectComplexity',

  options: [

    serviceOption(
      'Modulo o funzionalità semplice',
      'simple',
      'service_design'
    ),

    serviceOption(
      'Prenotazioni, calendari o automazioni',
      'medium',
      'service_design'
    ),

    serviceOption(
      'Integrazione con un servizio esterno',
      'integration',
      'service_design'
    ),

    serviceOption(
      'Sviluppo personalizzato complesso',
      'custom',
      'service_design'
    ),

    serviceOption(
      'Non sono sicuro',
      'unknown',
      'service_design'
    )

  ]

};


/* =================================================
   MIGRAZIONE
================================================= */

questions.service_migration = {

  text: 'Che tipo di sito devi trasferire?',

  saveAs: 'projectMigration',

  options: [

    serviceOption(
      'WordPress standard',
      'standard',
      'service_design'
    ),

    serviceOption(
      'WooCommerce con ordini e clienti',
      'woocommerce',
      'service_design'
    ),

    serviceOption(
      'Un sito da un’altra piattaforma',
      'other_platform',
      'service_design'
    ),

    serviceOption(
      'Non lo so',
      'unknown',
      'service_design'
    )

  ]

};


/* =================================================
   ALTRI PROGETTI
================================================= */

questions.service_other = {

  text: 'Quale descrizione si avvicina di più?',

  saveAs: 'projectOther',

  options: [

    serviceOption(
      'Modifiche a un sito esistente',
      'existing_changes',
      'service_design'
    ),

    serviceOption(
      'Un progetto completamente nuovo',
      'new_project',
      'service_design'
    ),

    serviceOption(
      'Consulenza o analisi tecnica',
      'consulting',
      'service_design'
    ),

    serviceOption(
      'Non saprei',
      'unknown',
      'service_design'
    )

  ]

};


/* =================================================
   DESIGN
================================================= */

questions.service_design = {

  text: 'Per la grafica, da che punto partiamo?',

  saveAs: 'projectDesign',

  options: [

    serviceOption(
      'Ho già un design pronto',
      'ready',
      'service_content'
    ),

    serviceOption(
      'Possiamo seguire lo stile del sito attuale',
      'existing',
      'service_content'
    ),

    serviceOption(
      'Serve progettare un design nuovo',
      'new',
      'service_content'
    ),

    serviceOption(
      'Non lo so',
      'unknown',
      'service_content'
    )

  ]

};


/* =================================================
   CONTENUTI

   Non vengono venduti servizi di produzione
   testi o fotografie.

   Se mancano i materiali, si utilizzano
   placeholder provvisori.
================================================= */

questions.service_content = {

  text: 'Hai già pronti testi e immagini?',

  saveAs: 'projectContent',

  options: [

    serviceOption(
      'Sì, ho tutto pronto',
      'ready',
      'service_features'
    ),

    serviceOption(
      'Ho soltanto una parte dei materiali',
      'partial',
      'service_features'
    ),

    serviceOption(
      'Non ancora: possiamo usare contenuti provvisori',
      'missing',
      'service_features'
    ),

    serviceOption(
      'Non sono necessari',
      'not_needed',
      'service_features'
    )

  ]

};


/* =================================================
   FUNZIONALITÀ AGGIUNTIVE
================================================= */

questions.service_features = {

  text: 'Sono necessarie funzionalità particolari?',

  saveAs: 'projectFeatures',

  options: [

    serviceOption(
      'No, soltanto funzioni standard',
      'none',
      'service_timeline'
    ),

    serviceOption(
      'Form, newsletter o elementi interattivi',
      'basic',
      'service_timeline'
    ),

    serviceOption(
      'Prenotazioni o automazioni',
      'advanced',
      'service_timeline'
    ),

    serviceOption(
      'Pagamenti o integrazioni avanzate',
      'payments',
      'service_timeline'
    ),

    serviceOption(
      'Non lo so ancora',
      'unknown',
      'service_timeline'
    )

  ]

};


/* =================================================
   TEMPISTICHE
================================================= */

questions.service_timeline = {

  text: 'Quando vorresti realizzare il progetto?',

  saveAs: 'projectTimeline',

  options: [

    serviceOption(
      'Non ho una scadenza precisa',
      'flexible',
      'end_project'
    ),

    serviceOption(
      'Entro uno o due mesi',
      'normal',
      'end_project'
    ),

    serviceOption(
      'Il prima possibile',
      'urgent',
      'end_project'
    ),

    serviceOption(
      'Sto soltanto valutando i costi',
      'exploring',
      'end_project'
    )

  ]

};


questions.end_project = {
  result: 'PROJECT'
};


/* =================================================
   SCHEDA RISULTATO
================================================= */

results.PROJECT = {

  tier: 'STIMA PROGETTO',

  icon: '📐',

  label: 'PRIMA STIMA',

  title: 'Ecco una prima stima per il tuo progetto',

  description:
    'La stima è stata elaborata in base ' +
    'alle caratteristiche indicate. ' +
    'Prezzo e condizioni saranno confermati ' +
    'dopo una verifica del progetto.',

  price: 'Da definire',

  meta: 'Stima preliminare, non vincolante',

  button: 'Prosegui con la richiesta'

};


/* =================================================
   MOTORE DI CALCOLO
================================================= */

function calculateServiceEstimate(data) {

  const type = data.projectType;

  const pages = Number(data.projectCount || 1);

  let hours = 0;

  let minimum = 0;

  let uncertain = false;

  let customQuote = false;

  let reason = '';

  let delivery = '';

  /* ---------------------------------------------
     BASE PER TIPOLOGIA
  --------------------------------------------- */

  switch (type) {

    case 'pages':

      // Prima pagina: 5 ore.
      // Successive: 4 ore ciascuna.
      hours = 5 + Math.max(0, pages - 1) * 4;

      minimum = servicePricing.minimums.pages;

      reason = 'Creazione di pagine WordPress';

      delivery = '3–10 giorni lavorativi';

      break;


    case 'landing':

      // Prima landing: 10 ore.
      // Ogni ulteriore landing: 7 ore.
      hours = 10 + Math.max(0, pages - 1) * 7;

      minimum = servicePricing.minimums.landing;

      reason = 'Landing page';

      delivery = '5–10 giorni lavorativi';

      break;


    case 'redesign':

      // Analisi e impostazione: 14 ore.
      // Lavoro incrementale per pagina.
      hours = 14 + pages * 4;

      minimum = servicePricing.minimums.redesign;

      reason = 'Restyling WordPress';

      delivery = '2–5 settimane';

      break;


    case 'new_site':

      // Struttura, configurazione e setup
      // compresi nella base iniziale.
      hours = 20 + pages * 5;

      minimum = servicePricing.minimums.new_site;

      reason = 'Nuovo sito WordPress';

      delivery = '2–4 settimane';

      break;


    case 'ecommerce': {

      const isExpansion =
        data.projectEcommerceKind === 'expand';

      const catalogHours = {
        small: 0,
        medium: 8,
        large: 22,
        extra_large: 45,
        unknown: 15
      };

      if (isExpansion) {

        hours = 12;

        minimum =
          servicePricing.minimums.ecommerce_expand;

        reason = 'Ampliamento e-commerce';

        delivery = '1–4 settimane';

      } else {

        hours = 45;

        minimum =
          servicePricing.minimums.ecommerce_new;

        reason = 'Creazione e-commerce WooCommerce';

        delivery = '4–8 settimane';

      }

      hours +=
        catalogHours[data.projectCatalog] || 0;

      if (
        data.projectCatalog === 'extra_large' ||
        data.projectCatalog === 'unknown' ||
        data.projectEcommerceKind === 'unknown'
      ) {

        uncertain = true;
        customQuote = true;

      }

      break;
    }


    case 'feature': {

      const featureHours = {
        simple: 5,
        medium: 12,
        integration: 20,
        custom: 30,
        unknown: 12
      };

      hours =
        featureHours[data.projectComplexity] || 12;

      minimum = servicePricing.minimums.feature;

      reason = 'Nuova funzionalità WordPress';

      delivery = 'Da concordare dopo analisi';

      if (
        ['integration', 'custom', 'unknown']
          .includes(data.projectComplexity)
      ) {

        uncertain = true;
        customQuote = true;

      }

      break;
    }


    case 'migration': {

      const migrationHours = {
        standard: 8,
        woocommerce: 20,
        other_platform: 28,
        unknown: 16
      };

      hours =
        migrationHours[data.projectMigration] || 16;

      minimum = servicePricing.minimums.migration;

      reason = 'Migrazione di un sito';

      delivery = 'Da concordare dopo verifica';

      if (
        data.projectMigration !== 'standard'
      ) {

        uncertain = true;
        customQuote = true;

      }

      break;
    }


    default:

      hours = 10;

      minimum = servicePricing.minimums.other;

      reason = 'Progetto personalizzato';

      delivery = 'Da concordare';

      uncertain = true;
      customQuote = true;

  }


  /* ---------------------------------------------
     PROGETTI CON MOLTE PAGINE
  --------------------------------------------- */

  if (pages >= 8) {

    uncertain = true;
    customQuote = true;

  }


  /* ---------------------------------------------
     ANALISI DI UN SITO ESISTENTE

     Il sito esistente non è considerato
     automaticamente più semplice.
  --------------------------------------------- */

  if (data.projectSource === 'existing') {

    const inspectionHours = {
      gutenberg: 2,
      elementor: 3,
      divi: 5,
      custom: 8,
      other: 6,
      unknown: 7
    };

    hours += (
      inspectionHours[data.projectBuilder] || 5
    );

    if (
      ['custom', 'other', 'unknown']
        .includes(data.projectBuilder)
    ) {
      uncertain = true;
    }

  }


  if (data.projectSource === 'unknown') {

    hours += 6;

    uncertain = true;

  }


  /* ---------------------------------------------
     DESIGN

     Nessun costo aggiuntivo quando il cliente
     fornisce un design utilizzabile o quando
     lo stile attuale è effettivamente riusabile.
  --------------------------------------------- */

  if (data.projectDesign === 'new') {

    // Progettazione aggiuntiva di base.
    hours += Math.max(5, pages * 2);

  }


  if (data.projectDesign === 'unknown') {

    uncertain = true;

  }


  /* ---------------------------------------------
     CONTENUTI

     Non aumentiamo le ore per inventare
     o scrivere contenuti mancanti.

     I placeholder sono già parte del
     processo operativo standard.

     L'inserimento successivo è incluso
     entro 30 giorni dalla consegna,
     alle condizioni concordate.
  --------------------------------------------- */

  const usesPlaceholders = [
    'partial',
    'missing'
  ].includes(data.projectContent);


  /* ---------------------------------------------
     FUNZIONALITÀ
  --------------------------------------------- */

  const additionalHours = {
    none: 0,
    basic: 3,
    advanced: 10,
    payments: 16,
    unknown: 5
  };

  hours += (
    additionalHours[data.projectFeatures] || 0
  );


  if (
    ['advanced', 'payments', 'unknown']
      .includes(data.projectFeatures)
  ) {

    uncertain = true;

  }


  if (
    ['advanced', 'payments']
      .includes(data.projectFeatures)
  ) {

    customQuote = true;

  }


  /* ---------------------------------------------
     URGENZE

     Non vengono aggiunti sovrapprezzi
     automatici né promesse di consegna.
  --------------------------------------------- */

  const urgent =
    data.projectTimeline === 'urgent';


  /* ---------------------------------------------
     CALCOLO FASCIA

     Nessuno sconto automatico sotto il
     costo interno stimato.

     Il margine superiore rappresenta
     l'incertezza, non un extra obbligatorio.
  --------------------------------------------- */

  const baseCost = Math.max(
    minimum,
    hours * servicePricing.hourlyRate
  );


  const upperFactor = uncertain
    ? servicePricing.uncertainBuffer
    : servicePricing.standardBuffer;


  const low = serviceRound(baseCost);

  const high = serviceRound(
    baseCost * (1 + upperFactor)
  );


  /*
   * Per lavori non sufficientemente definiti
   * mostriamo solo un budget iniziale.
   *
   * Evitiamo una fascia superiore fittizia.
   */

  const price = customQuote
    ? 'Da ' + serviceEuro(low)
    : serviceEuro(low) + '–' + serviceEuro(high);


  return {

    low,

    high: customQuote ? null : high,

    price,

    reason,

    delivery,

    uncertain,

    customQuote,

    urgent,

    usesPlaceholders,

    hours

  };

}


/* =================================================
   TESTO DELLA STIMA
================================================= */

function buildServiceDescription(estimate) {

  let description =
    'Abbiamo elaborato una prima stima per: ' +
    estimate.reason + '. ';


  if (estimate.customQuote) {

    description +=
      'La cifra indicata rappresenta un budget ' +
      'iniziale orientativo: le funzionalità ' +
      'o le caratteristiche del progetto ' +
      'richiedono una valutazione personalizzata. ';

  } else {

    description +=
      'La fascia economica dipende dalle ' +
      'informazioni raccolte e dovrà essere ' +
      'confermata dopo una verifica tecnica. ';

  }


  if (estimate.usesPlaceholders) {

    description +=
      'Se i testi o le immagini non sono pronti, ' +
      'il sito può essere predisposto con ' +
      'contenuti provvisori. ';

  }


  if (estimate.urgent) {

    description +=
      'La fattibilità della scadenza richiesta ' +
      'deve essere verificata. ';

  }


  description +=
    'La proposta definitiva comprenderà ' +
    'attività, tempi e condizioni concordate.';


  return description;

}


/* =================================================
   CONDIZIONI INFORMATIVE VISIBILI NEL RISULTATO

   Non sostituiscono contratto e preventivo.
================================================= */

function addServiceConditions(estimate, stamp) {

  if (stamp !== session) return;

  if (resultTier !== 'PROJECT') return;

  if (
    resultBox.querySelector(
      '.service-conditions'
    )
  ) {
    return;
  }


  const box = document.createElement('div');

  box.className = 'service-conditions';

  box.style.cssText = [
    'margin-top:18px',
    'padding:16px',
    'border:1px solid #deded9',
    'border-radius:12px',
    'background:#ffffff',
    'color:#444',
    'font-size:12px',
    'line-height:1.65'
  ].join(';');


  const materialsText = estimate.usesPlaceholders
    ? (
      'Il progetto può essere realizzato con ' +
      'testi e immagini provvisori.'
    )
    : (
      'I contenuti devono essere forniti ' +
      'dal cliente nel formato concordato.'
    );


  box.innerHTML = `

    <div style="font-weight:700;margin-bottom:8px">
      Cosa comprende la stima
    </div>

    <p style="margin-bottom:10px">
      Brief iniziale, attività tecniche previste,
      adattamento responsive, test essenziali,
      pubblicazione se inclusa nel progetto
      e un ciclo di revisione consolidato.
    </p>

    <div style="font-weight:700;margin-bottom:7px">
      Revisione inclusa
    </div>

    <p style="margin-bottom:10px">
      Una raccolta unica di piccole correzioni
      coerenti con quanto approvato:
      ad esempio titoli, spaziature,
      colori della palette concordata,
      immagini fornite o dettagli dei pulsanti.
      Non comprende nuove sezioni,
      nuove funzionalità, cambio completo
      del design o riprogettazione della pagina.
      Eventuali malfunzionamenti rispetto
      a quanto pattuito saranno gestiti
      separatamente dalle revisioni.
    </p>

    <div style="font-weight:700;margin-bottom:7px">
      Testi e immagini
    </div>

    <p style="margin-bottom:10px">
      ${escapeHtml(materialsText)}
      Se i materiali definitivi vengono
      consegnati in un unico pacchetto entro
      ${servicePricing.materialsWindowDays}
      giorni di calendario dalla consegna,
      il loro inserimento è incluso,
      purché rispettino quantità e struttura
      approvate. Dopo tale termine,
      il caricamento sarà preventivato
      separatamente.
    </p>

    <div style="font-weight:700;margin-bottom:7px">
      Tempistiche indicative
    </div>

    <p style="margin-bottom:10px">
      ${escapeHtml(estimate.delivery)}.
      Le tempistiche dipendono dalla
      disponibilità, dai materiali
      e dalle approvazioni necessarie.
      Non costituiscono una data
      di consegna garantita.
    </p>

    <div style="font-weight:700;margin-bottom:7px">
      Non incluso, salvo accordi
    </div>

    <p>
      Copywriting, fotografia,
      traduzioni, hosting, dominio,
      licenze a pagamento, manutenzione
      continuativa, modifiche fuori perimetro
      e integrazioni non previste.
    </p>

  `;


  const button = resultBox.querySelector(
    '#result-button'
  );


  if (button) {
    resultBox.insertBefore(box, button);
  } else {
    resultBox.appendChild(box);
  }

}


/* =================================================
   INTEGRAZIONE CON LA CHAT ESISTENTE
================================================= */

/*
 * Manteniamo intatto il sistema di diagnosi
 * originale e intercettiamo solo PROJECT.
 */

const originalResolveResult = resolveResult;


resolveResult = function(raw) {

  if (raw === 'PROJECT') {
    return 'PROJECT';
  }

  return originalResolveResult(raw);

};


/* ---------------------------------------------
   RISULTATO DEI NUOVI SERVIZI
--------------------------------------------- */

const originalShowResult = showResult;


showResult = async function(raw) {

  if (raw !== 'PROJECT') {
    return originalShowResult(raw);
  }


  /*
   * L'elaborazione è locale.
   * Salviamo il numero della sessione
   * per evitare interventi su chat riavviate.
   */

  const stamp = session;

  const estimate =
    calculateServiceEstimate(caseData);


  results.PROJECT.price =
    estimate.price;


  results.PROJECT.description =
    buildServiceDescription(estimate);


  results.PROJECT.meta =
    estimate.customQuote
      ? 'Budget iniziale · preventivo personalizzato'
      : 'Fascia preliminare · non vincolante';


  caseData.estimateMin =
    estimate.low;


  caseData.estimateMax =
    estimate.high;


  caseData.estimateType =
    estimate.customQuote
      ? 'personalized'
      : 'range';


  await originalShowResult(raw);


  if (stamp !== session) {
    return;
  }


  addServiceConditions(estimate, stamp);

};


/* =================================================
   RIEPILOGO DEL PROGETTO
================================================= */

const originalCaseRows = caseRows;


caseRows = function() {

  const existing = originalCaseRows();


  if (!caseData.projectType) {
    return existing;
  }


  const labels = {

    projectType:
      'Tipo di progetto',

    projectSource:
      'Sito nuovo o esistente',

    projectBuilder:
      'Tecnologia del sito',

    projectCount:
      'Numero di pagine',

    projectEcommerceKind:
      'Tipo di intervento e-commerce',

    projectCatalog:
      'Prodotti coinvolti',

    projectComplexity:
      'Tipo di funzionalità',

    projectMigration:
      'Tipo di migrazione',

    projectOther:
      'Descrizione progetto',

    projectDesign:
      'Design',

    projectContent:
      'Testi e immagini',

    projectFeatures:
      'Funzionalità aggiuntive',

    projectTimeline:
      'Tempistiche richieste'

  };


  /*
   * Recupera le etichette leggibili
   * dalle risposte dell'albero.
   */

  const readable = {};


  Object.values(questions).forEach(question => {

    if (
      !question.saveAs ||
      !question.options
    ) {
      return;
    }


    question.options.forEach(option => {

      readable[
        question.saveAs + ':' + option.value
      ] = option.label;

    });

  });


  const rows = Object.entries(labels)

    .filter(([key]) =>
      caseData[key] !== undefined
    )

    .map(([key, label]) => {

      const value =
        readable[
          key + ':' + caseData[key]
        ] || String(caseData[key]);


      return `

        <div
          class="data-item"
          style="margin-bottom:10px"
        >

          <span
            style="
              display:block;
              color:#777;
              font-size:11px;
            "
          >
            ${escapeHtml(label)}
          </span>

          <strong
            style="
              display:block;
              font-size:13px;
            "
          >
            ${escapeHtml(value)}
          </strong>

        </div>

      `;

    })

    .join('');


  return existing + rows;

};
