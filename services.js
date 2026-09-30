
/*
 * WEBSITE DIAGNOSIS
 * Modulo preventivi per nuovi servizi WordPress
 *
 * Caricare DOPO script.js.
 *
 * I valori economici sono IPOTESI INIZIALI
 * da calibrare prima dell'uso commerciale.
 */

const servicePricing = {
  hourlyRate: 50,
  lowFactor: 0.90,
  highFactor: 1.35,
  rounding: 50
};

/* ---------------------------------------------
   PERCORSO NUOVI SERVIZI
--------------------------------------------- */

questions.request_type = {
  text: 'Che cosa vorresti realizzare?',
  saveAs: 'projectType',
  options: [
    {
      label: '📄 Una o più pagine WordPress',
      value: 'pages',
      next: 'service_page_count'
    },
    {
      label: '🎯 Una landing page',
      value: 'landing',
      next: 'service_page_count'
    },
    {
      label: '🎨 Restyling di un sito esistente',
      value: 'redesign',
      next: 'service_page_count'
    },
    {
      label: '🌐 Un nuovo sito WordPress',
      value: 'new_site',
      next: 'service_page_count'
    },
    {
      label: '🛒 Creazione o ampliamento e-commerce',
      value: 'ecommerce',
      next: 'service_catalog'
    },
    {
      label: '⚙️ Una nuova funzionalità',
      value: 'feature',
      next: 'service_complexity'
    },
    {
      label: '🔄 Una migrazione completa',
      value: 'migration',
      next: 'service_migration'
    },
    {
      label: '🔧 Devo riparare qualcosa',
      value: 'repair',
      next: 'something_wrong'
    },
    {
      label: 'Altro / non so come definirlo',
      value: 'other',
      next: 'service_other'
    }
  ]
};

/* QUANTE PAGINE */

questions.service_page_count = {
  text: 'Quante pagine sono coinvolte nel progetto?',
  saveAs: 'projectCount',
  options: [
    {
      label: 'Una pagina',
      value: '1',
      next: 'service_design'
    },
    {
      label: '2–3 pagine',
      value: '3',
      next: 'service_design'
    },
    {
      label: '4–6 pagine',
      value: '5',
      next: 'service_design'
    },
    {
      label: '7 o più pagine',
      value: '8',
      next: 'service_design'
    }
  ]
};

/* DIMENSIONE CATALOGO E-COMMERCE */

questions.service_catalog = {
  text: 'Quanti prodotti contiene o conterrà lo shop?',
  saveAs: 'projectCatalog',
  options: [
    {
      label: 'Fino a 10 prodotti',
      value: 'small',
      next: 'service_design'
    },
    {
      label: '11–50 prodotti',
      value: 'medium',
      next: 'service_design'
    },
    {
      label: '51–200 prodotti',
      value: 'large',
      next: 'service_design'
    },
    {
      label: 'Più di 200 prodotti',
      value: 'extra_large',
      next: 'service_design'
    },
    {
      label: 'Non lo so ancora',
      value: 'unknown',
      next: 'service_design'
    }
  ]
};

/* NUOVA FUNZIONALITÀ */

questions.service_complexity = {
  text: 'Che tipo di funzionalità vuoi aggiungere?',
  saveAs: 'projectComplexity',
  options: [
    {
      label: 'Un modulo o una funzione semplice',
      value: 'simple',
      next: 'service_design'
    },
    {
      label: 'Prenotazioni, calendari o automazioni',
      value: 'medium',
      next: 'service_design'
    },
    {
      label: 'Integrazione con servizi esterni',
      value: 'integration',
      next: 'service_design'
    },
    {
      label: 'Sviluppo personalizzato complesso',
      value: 'custom',
      next: 'service_design'
    },
    {
      label: 'Non sono sicuro',
      value: 'unknown',
      next: 'service_design'
    }
  ]
};

/* MIGRAZIONE */

questions.service_migration = {
  text: 'Che cosa devi trasferire?',
  saveAs: 'projectMigration',
  options: [
    {
      label: 'Un sito WordPress standard',
      value: 'standard',
      next: 'service_design'
    },
    {
      label: 'Un sito WooCommerce con ordini e clienti',
      value: 'woocommerce',
      next: 'service_design'
    },
    {
      label: 'Un sito da un’altra piattaforma',
      value: 'other_platform',
      next: 'service_design'
    },
    {
      label: 'Non lo so',
      value: 'unknown',
      next: 'service_design'
    }
  ]
};

/* DESCRIZIONE GENERICA */

questions.service_other = {
  text: 'Quale di queste descrizioni si avvicina al tuo progetto?',
  saveAs: 'projectOther',
  options: [
    {
      label: 'Modifiche a un sito esistente',
      value: 'existing_changes',
      next: 'service_design'
    },
    {
      label: 'Un progetto completamente nuovo',
      value: 'new_project',
      next: 'service_design'
    },
    {
      label: 'Consulenza o analisi tecnica',
      value: 'consulting',
      next: 'service_design'
    },
    {
      label: 'Non saprei',
      value: 'unknown',
      next: 'service_design'
    }
  ]
};

/* DESIGN */

questions.service_design = {
  text: 'Per la grafica, da che punto partiamo?',
  saveAs: 'projectDesign',
  options: [
    {
      label: 'Il design è già pronto',
      value: 'ready',
      next: 'service_content'
    },
    {
      label: 'Possiamo seguire la grafica attuale',
      value: 'existing',
      next: 'service_content'
    },
    {
      label: 'Serve progettare un nuovo design',
      value: 'new',
      next: 'service_content'
    },
    {
      label: 'Non lo so',
      value: 'unknown',
      next: 'service_content'
    }
  ]
};

/* MATERIALI */

questions.service_content = {
  text: 'Hai già preparato testi e immagini?',
  saveAs: 'projectContent',
  options: [
    {
      label: 'Sì, è tutto pronto',
      value: 'ready',
      next: 'service_features'
    },
    {
      label: 'Solo una parte',
      value: 'partial',
      next: 'service_features'
    },
    {
      label: 'No, devo ancora prepararli',
      value: 'missing',
      next: 'service_features'
    },
    {
      label: 'Non sono necessari',
      value: 'not_needed',
      next: 'service_features'
    }
  ]
};

/* ELEMENTI AGGIUNTIVI */

questions.service_features = {
  text: 'Ci sono funzionalità particolari da includere?',
  saveAs: 'projectFeatures',
  options: [
    {
      label: 'No, solo le funzionalità standard',
      value: 'none',
      next: 'service_timeline'
    },
    {
      label: 'Form, newsletter o elementi interattivi',
      value: 'basic',
      next: 'service_timeline'
    },
    {
      label: 'Prenotazioni o automazioni',
      value: 'advanced',
      next: 'service_timeline'
    },
    {
      label: 'Pagamenti o integrazioni avanzate',
      value: 'payments',
      next: 'service_timeline'
    },
    {
      label: 'Non lo so ancora',
      value: 'unknown',
      next: 'service_timeline'
    }
  ]
};

/* TEMPISTICHE */

questions.service_timeline = {
  text: 'Quando vorresti realizzare il progetto?',
  saveAs: 'projectTimeline',
  options: [
    {
      label: 'Non ho una scadenza precisa',
      value: 'flexible',
      next: 'end_project'
    },
    {
      label: 'Entro uno o due mesi',
      value: 'normal',
      next: 'end_project'
    },
    {
      label: 'Il prima possibile',
      value: 'urgent',
      next: 'end_project'
    },
    {
      label: 'Sto solo valutando i costi',
      value: 'exploring',
      next: 'end_project'
    }
  ]
};

questions.end_project = {
  result: 'PROJECT'
};

/* ---------------------------------------------
   NUOVO RISULTATO
--------------------------------------------- */

results.PROJECT = {
  tier: 'STIMA PROGETTO',
  icon: '📐',
  label: 'PRIMA STIMA',
  title: 'Ecco una prima stima per il tuo progetto',
  description:
    'Abbiamo elaborato una fascia orientativa ' +
    'in base alle informazioni raccolte. ' +
    'Il prezzo non è definitivo e richiede ' +
    'la verifica del progetto e delle attività incluse.',
  price: 'Da definire',
  meta: 'Stima preliminare, non vincolante',
  button: 'Prosegui con la richiesta'
};

/* ---------------------------------------------
   MOTORE DELLE STIME
--------------------------------------------- */

function calculateServiceEstimate(data) {

  const type = data.projectType;
  const pages = Number(data.projectCount || 1);

  let hours = 0;
  let uncertain = false;
  let reason = '';

  switch (type) {

    case 'pages':
      hours = 3 + (pages - 1) * 2.5;
      reason = 'Creazione di pagine WordPress';
      break;

    case 'landing':
      hours = 7 + (pages - 1) * 5;
      reason = 'Landing page';
      break;

    case 'redesign':
      hours = 6 + pages * 3.5;
      reason = 'Restyling del sito';
      break;

    case 'new_site':
      hours = 10 + pages * 4;
      reason = 'Nuovo sito WordPress';
      break;

    case 'ecommerce': {
      const catalogHours = {
        small: 0,
        medium: 8,
        large: 22,
        extra_large: 42,
        unknown: 16
      };

      hours =
        18 +
        (catalogHours[data.projectCatalog] || 0);

      uncertain = [
        'extra_large',
        'unknown'
      ].includes(data.projectCatalog);

      reason = 'E-commerce WordPress / WooCommerce';
      break;
    }

    case 'feature': {
      const complexityHours = {
        simple: 4,
        medium: 9,
        integration: 16,
        custom: 28,
        unknown: 12
      };

      hours =
        complexityHours[data.projectComplexity] || 12;

      uncertain = [
        'integration',
        'custom',
        'unknown'
      ].includes(data.projectComplexity);

      reason = 'Nuova funzionalità WordPress';
      break;
    }

    case 'migration': {
      const migrationHours = {
        standard: 6,
        woocommerce: 16,
        other_platform: 24,
        unknown: 14
      };

      hours =
        migrationHours[data.projectMigration] || 14;

      uncertain =
        data.projectMigration !== 'standard';

      reason = 'Migrazione del sito';
      break;
    }

    default:
      hours = 8;
      uncertain = true;
      reason = 'Progetto personalizzato';
  }

  /* Maggiorazione design:
     ipotesi di ore aggiuntive */

  if (data.projectDesign === 'new') {
    hours += Math.max(3, pages * 1.5);
  }

  if (data.projectDesign === 'unknown') {
    uncertain = true;
  }

  /* Materiali mancanti:
     tempo aggiuntivo per coordinamento
     e preparazione di base.
     NON equivale a un servizio di copywriting. */

  if (data.projectContent === 'partial') {
    hours += Math.min(pages, 5);
  }

  if (data.projectContent === 'missing') {
    hours += Math.min(pages * 1.5, 9);
    uncertain = true;
  }

  /* Funzioni extra */

  const extraHours = {
    none: 0,
    basic: 2,
    advanced: 7,
    payments: 12,
    unknown: 4
  };

  hours +=
    extraHours[data.projectFeatures] || 0;

  if (
    ['advanced', 'payments', 'unknown']
      .includes(data.projectFeatures)
  ) {
    uncertain = true;
  }

  /* Urgenza: solo fattore di stima,
     non promessa di disponibilità. */

  if (data.projectTimeline === 'urgent') {
    hours *= 1.2;
  }

  if (
    pages >= 8 ||
    data.projectType === 'other'
  ) {
    uncertain = true;
  }

  const round = value =>
    Math.ceil(
      value / servicePricing.rounding
    ) * servicePricing.rounding;

  const low = round(
    hours *
    servicePricing.hourlyRate *
    servicePricing.lowFactor
  );

  const high = round(
    hours *
    servicePricing.hourlyRate *
    (
      uncertain
        ? 1.65
        : servicePricing.highFactor
    )
  );

  const euro = amount =>
    new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);

  return {
    low,
    high,
    price: `${euro(low)}–${euro(high)}`,
    reason,
    uncertain
  };
}

/* ---------------------------------------------
   INTEGRAZIONE CON LA CHAT ESISTENTE
--------------------------------------------- */

/*
 * Le funzioni originali restano operative.
 * Intercettiamo soltanto il nuovo risultato
 * PROJECT, preservando la diagnosi dei fix.
 */

const originalResolveResult = resolveResult;

resolveResult = function(raw) {

  if (raw === 'PROJECT') {
    return 'PROJECT';
  }

  return originalResolveResult(raw);
};

const originalShowResult = showResult;

showResult = async function(raw) {

  if (raw === 'PROJECT') {

    const estimate =
      calculateServiceEstimate(caseData);

    results.PROJECT.price = estimate.price;

    results.PROJECT.description =
      'Stima orientativa per: ' +
      estimate.reason +
      '. Il calcolo usa ipotesi di lavoro ' +
      'e le informazioni indicate nella chat. ' +
      'Il prezzo definitivo sarà confermato ' +
      'soltanto dopo una verifica delle attività.';

    results.PROJECT.meta =
      estimate.uncertain
        ? 'Stima preliminare con elevata incertezza'
        : 'Stima preliminare non vincolante';

    caseData.estimateMin = estimate.low;
    caseData.estimateMax = estimate.high;
  }

  return originalShowResult(raw);
};

/* ---------------------------------------------
   RIEPILOGO DEL PROGETTO
--------------------------------------------- */

const originalCaseRows = caseRows;

caseRows = function() {

  const existing = originalCaseRows();

  if (!caseData.projectType) {
    return existing;
  }

  const labels = {
    projectType: 'Tipo di progetto',
    projectCount: 'Numero di pagine',
    projectCatalog: 'Dimensione catalogo',
    projectComplexity: 'Tipo di funzionalità',
    projectMigration: 'Tipo di migrazione',
    projectOther: 'Altra richiesta',
    projectDesign: 'Design',
    projectContent: 'Materiali',
    projectFeatures: 'Funzionalità aggiuntive',
    projectTimeline: 'Tempistiche'
  };

  const readable = {};

  Object.values(questions).forEach(question => {

    if (!question.saveAs || !question.options) {
      return;
    }

    question.options.forEach(option => {
      readable[
        question.saveAs + ':' + option.value
      ] = option.label;
    });
  });

  const extra = Object.entries(labels)
    .filter(([key]) =>
      caseData[key] !== undefined
    )
    .map(([key, label]) => {

      const value =
        readable[key + ':' + caseData[key]] ||
        String(caseData[key]);

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

  return existing + extra;
};
