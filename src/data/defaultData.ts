import type { EstudiantePIE, InformePIE, BateriaEvaluacionInformal } from '../types/pie';

export const indicadoresPedagogicosBase = [
  "Demuestra comprensión de instrucciones orales, escritas o en lengua de señas, respondiendo a ellas de acuerdo con sus posibilidades comunicativas y utilizando los apoyos necesarios.",
  "Manifiesta disposición para el aprendizaje, prestando atención a quien conduce la actividad y mostrando interés por las tareas.",
  "Mantiene la atención en las actividades, con o sin apoyo, durante períodos adecuados a su edad, características y necesidades educativas.",
  "Organiza su tiempo y materiales para iniciar, desarrollar y concluir una actividad, demostrando progresiva autonomía en función de los apoyos que requiere.",
  "Utiliza estrategias personales o apoyos disponibles para resolver dificultades, solicitando colaboración cuando lo necesita o respondiendo positivamente al acompañamiento del adulto.",
  "Participa en actividades grupales, colaborando según sus posibilidades, respetando turnos, aportando ideas o interactuando con sus pares con apoyo si es necesario.",
  "Muestra iniciativa en el desarrollo de tareas, proponiendo ideas, alternativas o formas propias de realizar una actividad, con o sin mediación del adulto.",
  "Expresa ideas, emociones o experiencias a través de diversos lenguajes (oral, escrito, gestual, plástico o tecnológico), utilizando los apoyos comunicativos pertinentes.",
  "Evidencia avances en la ejecución de tareas escolares, mostrando esfuerzo, persistencia y sentido de logro, considerando su punto de partida y los apoyos recibidos.",
  "Reflexiona sobre su propio proceso de aprendizaje, reconociendo sus logros y desafíos con apoyo del adulto o mediante estrategias de autorreflexión adaptadas a sus necesidades."
];

export const indicadoresSocialesBase = [
  "Atiende y muestra interés ante las interacciones comunicativas (conversaciones, exposiciones o gestos) utilizando los medios de comunicación que le resultan accesibles.",
  "Participa en intercambios comunicativos, respetando turnos e interviniendo mediante lenguaje oral, señas, gestos, apoyos visuales o sistemas aumentativos y alternativos de comunicación.",
  "Colabora y participa en actividades grupales o de juego colectivo, de acuerdo con sus intereses, posibilidades y utilizando los apoyos necesarios.",
  "Inicia interacciones sociales (conversaciones, juegos o gestos de acercamiento) y propone ideas o acciones en actividades compartidas, mostrando disposición e iniciativa para participar con otros.",
  "Participa en la organización de juegos o tareas, expresando sus ideas, escuchando a otros y negociando acuerdos, con o sin apoyo según sus necesidades.",
  "Recibe y responde a comentarios, críticas o sugerencias de sus pares o adultos, adaptando su conducta o expresando su punto de vista de forma respetuosa.",
  "Solicita ayuda o colaboración cuando la necesita, utilizando las formas de comunicación disponibles y adecuadas a su contexto.",
  "Acepta ayuda o acompañamiento de sus pares o adultos, mostrando disposición para el trabajo colaborativo y la interacción positiva.",
  "Establece y mantiene vínculos positivos con sus compañeros, participando en interacciones sociales significativas y desarrollando sentido de pertenencia al grupo.",
  "Reconoce y expresa emociones propias y de otros durante las interacciones, mostrando empatía y ajustando su conducta de manera respetuosa."
];

export const bateria1MedioDiversi: BateriaEvaluacionInformal = {
  id: "bateria-1-medio-diversi",
  nombre: "Evaluación psicopedagógica informal - Diversi",
  cursoNivel: "1° Medio",
  areas: [
    {
      id: "area-cognitiva",
      nombre: "Área Cognitiva",
      subareas: [
        {
          id: "sub-cognitiva",
          nombre: "Área Cognitiva General",
          items: [
            { id: "cog-1", numero: 1, nombre: "Atención sostenida y selectiva", ptjeIdeal: 12, ptjeObtenido: 12 },
            { id: "cog-2", numero: 2, nombre: "Memoria de trabajo y retención", ptjeIdeal: 7, ptjeObtenido: 2 },
            { id: "cog-3", numero: 3, nombre: "Funciones ejecutivas y organización", ptjeIdeal: 23, ptjeObtenido: 23 },
            { id: "cog-4", numero: 4, nombre: "Razonamiento deductivo y lógico", ptjeIdeal: 4, ptjeObtenido: 4 },
            { id: "cog-5", numero: 5, nombre: "Resolución de problemas y flexibilidad", ptjeIdeal: 6, ptjeObtenido: 0 }
          ]
        }
      ]
    },
    {
      id: "area-lenguaje",
      nombre: "Área de Lenguaje Verbal",
      subareas: [
        {
          id: "sub-comprension",
          nombre: "I. Comprensión Lectora",
          items: [
            { id: "len-1", numero: 1, nombre: "Extracción de información explícita", ptjeIdeal: 6, ptjeObtenido: 3 },
            { id: "len-2", numero: 2, nombre: "Inferencia de sentido global del texto", ptjeIdeal: 4, ptjeObtenido: 2 },
            { id: "len-3", numero: 3, nombre: "Léxico contextual y significado", ptjeIdeal: 4, ptjeObtenido: 2 },
            { id: "len-4", numero: 4, nombre: "Estructura del texto y propósito", ptjeIdeal: 1, ptjeObtenido: 0 },
            { id: "len-5", numero: 5, nombre: "Postura crítica y argumentación", ptjeIdeal: 3, ptjeObtenido: 0 },
            { id: "len-6", numero: 6, nombre: "Comprensión literal de párrafos", ptjeIdeal: 6, ptjeObtenido: 6 },
            { id: "len-7", numero: 7, nombre: "Identificación de ideas principales", ptjeIdeal: 6, ptjeObtenido: 6 },
            { id: "len-8", numero: 8, nombre: "Cohesión y conectores discursivos", ptjeIdeal: 3, ptjeObtenido: 1 },
            { id: "len-9", numero: 9, nombre: "Evaluación de forma y contenido", ptjeIdeal: 2, ptjeObtenido: 1 }
          ]
        },
        {
          id: "sub-escritura",
          nombre: "II. Escritura",
          items: [
            { id: "esc-1", numero: 1, nombre: "Producción de texto, coherencia, cohesión y ortografía", ptjeIdeal: 12, ptjeObtenido: 5 }
          ]
        }
      ]
    },
    {
      id: "area-matematica",
      nombre: "Área de Pensamiento Matemático",
      subareas: [
        {
          id: "sub-num-op",
          nombre: "I. Números y operaciones",
          items: [
            { id: "mat-1", numero: 1, nombre: "Operatoria con números racionales y enteros", ptjeIdeal: 6, ptjeObtenido: 3 },
            { id: "mat-2", numero: 2, nombre: "Propiedades de las potencias", ptjeIdeal: 3, ptjeObtenido: 0 },
            { id: "mat-3", numero: 3, nombre: "Porcentajes y aplicaciones", ptjeIdeal: 3, ptjeObtenido: 2 }
          ]
        },
        {
          id: "sub-algebra",
          nombre: "II. Álgebra y funciones",
          items: [
            { id: "mat-4", numero: 1, nombre: "Reducción de expresiones algebraicas", ptjeIdeal: 3, ptjeObtenido: 0 },
            { id: "mat-5", numero: 2, nombre: "Ecuaciones lineales de primer grado", ptjeIdeal: 3, ptjeObtenido: 0 }
          ]
        },
        {
          id: "sub-resolucion",
          nombre: "III. Resolución de problemas",
          items: [
            { id: "mat-6", numero: 1, nombre: "Estrategias de resolución en contextos reales", ptjeIdeal: 8, ptjeObtenido: 2 }
          ]
        },
        {
          id: "sub-prob-est",
          nombre: "IV. Probabilidad y estadística",
          items: [
            { id: "mat-7", numero: 1, nombre: "Tablas y gráficos estadísticos", ptjeIdeal: 9, ptjeObtenido: 0 },
            { id: "mat-8", numero: 2, nombre: "Medidas de tendencia central", ptjeIdeal: 4, ptjeObtenido: 0 },
            { id: "mat-9", numero: 3, nombre: "Probabilidad simple y regla de Laplace", ptjeIdeal: 2, ptjeObtenido: 0 },
            { id: "mat-10", numero: 4, nombre: "Toma de decisiones basadas en datos", ptjeIdeal: 3, ptjeObtenido: 2 }
          ]
        }
      ]
    }
  ]
};

export const bateriasTabulatestCatalogo: BateriaEvaluacionInformal[] = [
  bateria1MedioDiversi,
  {
    id: "tabulatest-r3-basica-4",
    nombre: "Prueba Informal Psicopedagógica Tabulatest (R-3) - 4° Básico",
    cursoNivel: "4° Básico",
    areas: [
      {
        id: "tab-cog-4",
        nombre: "Área Cognitiva y Procesamiento",
        subareas: [
          {
            id: "sub-tab-cog-4",
            nombre: "Funciones Ejecutivas y Atención",
            items: [
              { id: "tc4-1", numero: 1, nombre: "Atención focalizada y selectiva visual", ptjeIdeal: 10, ptjeObtenido: 8 },
              { id: "tc4-2", numero: 2, nombre: "Memoria visual inmediata y retención secuencial", ptjeIdeal: 10, ptjeObtenido: 7 },
              { id: "tc4-3", numero: 3, nombre: "Razonamiento analógico y clasificación lógica", ptjeIdeal: 12, ptjeObtenido: 9 }
            ]
          }
        ]
      },
      {
        id: "tab-len-4",
        nombre: "Área Lectoescritura Tabulatest",
        subareas: [
          {
            id: "sub-tab-lec-4",
            nombre: "Lectura y Comprensión",
            items: [
              { id: "tl4-1", numero: 1, nombre: "Exactitud y fluidez lectora (palabras por minuto)", ptjeIdeal: 10, ptjeObtenido: 6 },
              { id: "tl4-2", numero: 2, nombre: "Comprensión explícita e identificación de personajes", ptjeIdeal: 8, ptjeObtenido: 7 },
              { id: "tl4-3", numero: 3, nombre: "Comprensión inferencial y causa-efecto", ptjeIdeal: 8, ptjeObtenido: 4 }
            ]
          },
          {
            id: "sub-tab-esc-4",
            nombre: "Producción Escrita y Ortografía",
            items: [
              { id: "te4-1", numero: 1, nombre: "Ortografía acentual y puntual básica", ptjeIdeal: 10, ptjeObtenido: 5 },
              { id: "te4-2", numero: 2, nombre: "Coherencia temática en redacción de párrafo", ptjeIdeal: 10, ptjeObtenido: 6 }
            ]
          }
        ]
      },
      {
        id: "tab-mat-4",
        nombre: "Área de Cálculo y Pensamiento Matemático",
        subareas: [
          {
            id: "sub-tab-mat-4",
            nombre: "Operaciones y Resolución de Problemas",
            items: [
              { id: "tm4-1", numero: 1, nombre: "Numeración hasta el 10.000 y valor posicional", ptjeIdeal: 10, ptjeObtenido: 8 },
              { id: "tm4-2", numero: 2, nombre: "Operatoria combinada (adición, sustracción, multiplicación)", ptjeIdeal: 10, ptjeObtenido: 7 },
              { id: "tm4-3", numero: 3, nombre: "Resolución de problemas verbales simples y compuestos", ptjeIdeal: 12, ptjeObtenido: 6 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "tabulatest-r3-basica-8",
    nombre: "Prueba Informal Psicopedagógica Tabulatest (R-3) - 8° Básico",
    cursoNivel: "8° Básico",
    areas: [
      {
        id: "tab-cog-8",
        nombre: "Procesos Cognitivos Superiores",
        subareas: [
          {
            id: "sub-tab-cog-8",
            nombre: "Atención, Memoria y Planificación",
            items: [
              { id: "tc8-1", numero: 1, nombre: "Control inhibitorio y flexibilidad mental", ptjeIdeal: 15, ptjeObtenido: 11 },
              { id: "tc8-2", numero: 2, nombre: "Memoria operativa de dígitos en orden inverso", ptjeIdeal: 10, ptjeObtenido: 6 },
              { id: "tc8-3", numero: 3, nombre: "Planificación de secuencias y laberintos complejos", ptjeIdeal: 15, ptjeObtenido: 12 }
            ]
          }
        ]
      },
      {
        id: "tab-len-8",
        nombre: "Comprensión y Análisis Lingüístico",
        subareas: [
          {
            id: "sub-tab-lec-8",
            nombre: "Lectura Crítica",
            items: [
              { id: "tl8-1", numero: 1, nombre: "Inferencia global y propósito del emisor", ptjeIdeal: 12, ptjeObtenido: 8 },
              { id: "tl8-2", numero: 2, nombre: "Diferenciación de hechos y opiniones", ptjeIdeal: 8, ptjeObtenido: 5 },
              { id: "tl8-3", numero: 3, nombre: "Síntesis y elaboración de resumen textual", ptjeIdeal: 10, ptjeObtenido: 6 }
            ]
          },
          {
            id: "sub-tab-esc-8",
            nombre: "Escritura Argumentativa",
            items: [
              { id: "te8-1", numero: 1, nombre: "Estructura argumentativa (tesis, argumento, conclusión)", ptjeIdeal: 15, ptjeObtenido: 9 },
              { id: "te8-2", numero: 2, nombre: "Conectores lógicos y riqueza léxica", ptjeIdeal: 10, ptjeObtenido: 6 }
            ]
          }
        ]
      },
      {
        id: "tab-mat-8",
        nombre: "Pensamiento Matemático Curricular",
        subareas: [
          {
            id: "sub-tab-mat-8",
            nombre: "Álgebra y Números Racionales",
            items: [
              { id: "tm8-1", numero: 1, nombre: "Operatoria con fracciones y decimales positivos/negativos", ptjeIdeal: 12, ptjeObtenido: 6 },
              { id: "tm8-2", numero: 2, nombre: "Ecuaciones e inecuaciones de primer grado", ptjeIdeal: 12, ptjeObtenido: 5 },
              { id: "tm8-3", numero: 3, nombre: "Cálculo de áreas y perímetros en polígonos", ptjeIdeal: 10, ptjeObtenido: 7 },
              { id: "tm8-4", numero: 4, nombre: "Modelamiento de problemas con variables", ptjeIdeal: 12, ptjeObtenido: 6 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "tabulatest-fonoaudiologica",
    nombre: "Evaluación Informal Fonoaudiológica Tabulatest",
    cursoNivel: "Enseñanza Básica y Media",
    areas: [
      {
        id: "fono-fonetica",
        nombre: "Nivel Fonético - Fonológico",
        subareas: [
          {
            id: "sub-fono-1",
            nombre: "Metría y Conciencia Fonológica",
            items: [
              { id: "ff-1", numero: 1, nombre: "Segmentación y conteo silábico", ptjeIdeal: 10, ptjeObtenido: 9 },
              { id: "ff-2", numero: 2, nombre: "Identificación de sonido vocálico y consonántico inicial/final", ptjeIdeal: 10, ptjeObtenido: 8 },
              { id: "ff-3", numero: 3, nombre: "Inversión y manipulación fonémica", ptjeIdeal: 10, ptjeObtenido: 6 }
            ]
          }
        ]
      },
      {
        id: "fono-semantica",
        nombre: "Nivel Semántico y Vocabulario",
        subareas: [
          {
            id: "sub-fono-2",
            nombre: "Relaciones Léxicas",
            items: [
              { id: "fs-1", numero: 1, nombre: "Definición de palabras por categoría y uso", ptjeIdeal: 12, ptjeObtenido: 8 },
              { id: "fs-2", numero: 2, nombre: "Asociación por semejanzas y diferencias léxicas", ptjeIdeal: 10, ptjeObtenido: 7 },
              { id: "fs-3", numero: 3, nombre: "Comprensión de lenguaje figurado y metáforas simples", ptjeIdeal: 10, ptjeObtenido: 5 }
            ]
          }
        ]
      },
      {
        id: "fono-morfo-pragma",
        nombre: "Nivel Morfosintáctico y Pragmático",
        subareas: [
          {
            id: "sub-fono-3",
            nombre: "Discurso y Comunicación Social",
            items: [
              { id: "fmp-1", numero: 1, nombre: "Estructuración de oraciones complejas con nexos", ptjeIdeal: 12, ptjeObtenido: 7 },
              { id: "fmp-2", numero: 2, nombre: "Mantenimiento del tópico conversacional y toma de turnos", ptjeIdeal: 10, ptjeObtenido: 9 },
              { id: "fmp-3", numero: 3, nombre: "Contacto visual, proxémica y comprensión de intenciones", ptjeIdeal: 10, ptjeObtenido: 8 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "tabulatest-estilos-vak",
    nombre: "Test de Estilos de Aprendizaje PNL - VAK (Tabulatest)",
    cursoNivel: "Todos los niveles",
    areas: [
      {
        id: "vak-canales",
        nombre: "Canales de Percepción y Procesamiento",
        subareas: [
          {
            id: "sub-vak",
            nombre: "Predominancia Perceptual",
            items: [
              { id: "vak-1", numero: 1, nombre: "Canal Visual (imágenes, esquemas, lectura visual)", ptjeIdeal: 20, ptjeObtenido: 16 },
              { id: "vak-2", numero: 2, nombre: "Canal Auditivo (explicaciones orales, debate, repetición)", ptjeIdeal: 20, ptjeObtenido: 11 },
              { id: "vak-3", numero: 3, nombre: "Canal Kinestésico (manipulación, acción corporal, práctica)", ptjeIdeal: 20, ptjeObtenido: 18 }
            ]
          }
        ]
      }
    ]
  }
];

export const estudianteInicial: EstudiantePIE = {
  id: "3400",
  nombreCompleto: "Fernanda Esperanza García Parra",
  nombreSocial: "Fernanda Esperanza García Parra",
  rut: "23.954.789-3",
  fechaNacimiento: "2012-05-20",
  edad: "14 años, 5 meses",
  curso: "1° Medio A",
  tipoNEE: "NEET",
  diagnostico: "Trastorno de Déficit Atencional con Hiperactividad",
  siglaDiagnostico: "TDA-H",
  apoderadoNombre: "Patricia Parra",
  apoderadoTelefono: "+56 9 8765 4321",
  informeIdActual: "51895"
};

export const otrosEstudiantes: EstudiantePIE[] = [
  estudianteInicial,
  {
    id: "3257",
    nombreCompleto: "Victoria Merino",
    nombreSocial: "Victoria Merino",
    rut: "24.112.540-K",
    fechaNacimiento: "2013-09-14",
    edad: "13 años, 2 meses",
    curso: "8° Básico B",
    tipoNEE: "NEEP",
    diagnostico: "Trastorno del Espectro Autista",
    siglaDiagnostico: "TEA-A",
    apoderadoNombre: "Claudia Soto",
    apoderadoTelefono: "+56 9 7654 3210"
  },
  {
    id: "3510",
    nombreCompleto: "Matías Ignacio Muñoz Castro",
    nombreSocial: "Matías Muñoz",
    rut: "23.456.789-1",
    fechaNacimiento: "2011-11-03",
    edad: "15 años, 0 meses",
    curso: "2° Medio C",
    tipoNEE: "NEET",
    diagnostico: "Dificultad Específica del Aprendizaje (Lectoescritura)",
    siglaDiagnostico: "DEA",
    apoderadoNombre: "Rodrigo Muñoz",
    apoderadoTelefono: "+56 9 9123 4567"
  }
];

export const informeInicial: InformePIE = {
  id: "51895",
  estudianteId: "3400",
  fechaCreacion: "2026-11-05",
  fechaInforme: "2026-11-07",
  fechaEmisionDiagnostico: "2025-03-12",
  periodo: "Reevaluación",
  estado: "En proceso",
  establecimiento: "Colegio Ana María Janer",
  rbd: "9876-5",
  motivoDetalle: "Proceso de Reevaluación Integral del Programa de Integración Escolar (PIE) según normativa Decreto 170 y Decreto 83 de Educación Especial del Ministerio de Educación de Chile.",
  instrumentosAplicados: "Evaluación psicopedagógica informal - Diversi (Nivel 1° Medio), Prueba Informal Tabulatest (R-3), Pauta de Observación Pedagógica en el Contexto Escolar (Cartilla 4 MINEDUC), Entrevista a la familia y revisión de antecedentes escolares previos.",
  antecedentesHistoriaEscolar: "La estudiante cursa 1° Medio. Ha contado con apoyo del PIE en años anteriores bajo diagnóstico de TDAH. Presenta buen desempeño vincular con sus pares y docentes, sin embargo, en periodos de alta exigencia académica muestra dificultades para sostener la concentración en actividades de extensa duración y estructuración temporal de tareas.",
  antecedentesSaludFamilia: "Vive con sus padres y hermano menor. La familia muestra alto compromiso y asistencia a citaciones del equipo de aula. Cuenta con control neurológico regular.",
  evaluacionInformal: bateria1MedioDiversi,
  analisisCualitativo: {
    cognitivaYComunicativa: "En el área cognitiva, la estudiante evidencia fortalezas en atención focalizada inmediata y organización de secuencias conocidas (100% en ítems 1 y 3). Presenta desafíos significativos en memoria operativa de trabajo (29% de logro) y en tareas de resolución de problemas complejos que exigen flexibilidad cognitiva y cambio de set mental (0%), donde suele dispersarse ante enunciados largos o con múltiples distractores. En lenguaje verbal, logra buen nivel en comprensión literal y determinación de ideas centrales en textos breves (100%), no obstante, decae en inferencias complejas, vocabulario contextual abstracto y expresión escrita formal (42%), requiriendo apoyos visuales y andamiaje para la redacción de párrafos argumentativos.",
    socioemocionalYAproximacion: "Fernanda muestra motivación intrínseca cuando las actividades incorporan recursos interactivos o trabajos prácticos. En situaciones de frustración académica manifiesta ansiedad transitoria, la cual canaliza adecuadamente al recibir mediación afectiva y retroalimentación positiva por parte del equipo docente. Mantiene relaciones de respeto y empatía con su grupo curso.",
    motoraAutonomiaYSensorial: "Presenta adecuada motricidad fina y gruesa. Es autónoma en su cuidado personal y desplazamiento dentro del establecimiento. No presenta dificultades sensoriales aparentes."
  },
  sintesis: {
    cognitivaYComunicativa: "Fortalezas en razonamiento básico y retención de instrucciones claras. Barreras identificadas en memoria operativa y funciones ejecutivas de autorregulación y planificación temporal.",
    socioemocionalYAproximacion: "Excelente receptividad al apoyo pedagógico y disposición al trabajo colaborativo. Requiere fortalecimiento en tolerancia al error y estrategias de automonitoreo.",
    motoraAutonomiaYSensorial: "Sin observaciones críticas en el plano motor ni sensorial.",
    conclusion: "La estudiante requiere continuar en el Programa de Integración Escolar (PIE) bajo apoyos de aula común y aula de recursos (PACI de acceso y temporalidad) conforme a las directrices de la Cartilla 4 y 5 del MINEDUC."
  },
  sugerencias: {
    alEstablecimiento: "Garantizar la aplicación de los principios del Diseño Universal para el Aprendizaje (DUA) en las evaluaciones de nivel, permitiendo formatos diversificados (orales, digitales o rúbricas segmentadas).",
    alEquipoAula: "Segmentar las instrucciones largas en pasos numerados. Asignar asiento preferencial cercano al docente y alejado de ventanas. Otorgar tiempos adicionales (25% a 30%) en evaluaciones escritas. Monitorear activamente el inicio de las tareas.",
    alEstudiante: "Utilizar agenda visual o digital con alarmas para entregas. Aplicar técnicas de estudio fraccionadas (método Pomodoro). Solicitar aclaración de dudas de manera oportuna.",
    aLaFamilia: "Mantener un ambiente libre de distractores durante el horario de estudio en el hogar. Supervisar la agenda escolar diariamente. Reforzar positivamente los avances y la persistencia antes que solo el resultado final.",
    otros: "Mantener coordinación bimensual con neurólogo tratante y equipo psicosocial."
  },
  pautaObservacion: {
    antecedentesPedagogicos: indicadoresPedagogicosBase.map((texto, i) => ({
      id: `ped-${i+1}`,
      texto,
      valor: i === 0 || i === 5 || i === 8 ? '3' : i === 2 || i === 3 ? '1' : '2'
    })),
    antecedentesSocialesComunicativos: indicadoresSocialesBase.map((texto, i) => ({
      id: `soc-${i+1}`,
      texto,
      valor: i === 0 || i === 1 || i === 8 || i === 9 ? '3' : '2'
    })),
    observacionesGenerales: "Fernanda es muy colaborativa en aula, su mayor necesidad radica en la contención de distractores externos y estructuración de sus tiempos de respuesta.",
    docenteAulaRegular: {
      nombre: "María Elena Morales",
      rut: "14.285.932-4",
      profesion: "Profesora de Educación Media en Lengua y Literatura",
      asignatura: "Lenguaje y Comunicación"
    }
  },
  profesional: {
    nombre: "Francisca Lorena Tello Rojas",
    rut: "21.232.592-9",
    profesion: "Profesora Diferencial mención Discapacidad Intelectual",
    registroMineduc: "145892",
    cargo: "Educadora Diferencial PIE / Especialista"
  }
};
