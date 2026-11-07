import { EstudiantePIE, BateriaEvaluacionInformal } from "../types/pie";

export function generarRedaccionPedagogica(estudiante: EstudiantePIE, bateria: BateriaEvaluacionInformal) {
  // Calculate area stats
  let totalIdeal = 0;
  let totalObtenido = 0;
  
  const statsPorArea: Record<string, { ideal: number; obtenido: number; pct: number }> = {};
  
  bateria.areas.forEach(area => {
    let aIdeal = 0;
    let aObt = 0;
    area.subareas.forEach(sub => {
      sub.items.forEach(it => {
        aIdeal += it.ptjeIdeal;
        aObt += it.ptjeObtenido;
      });
    });
    const pct = aIdeal > 0 ? Math.round((aObt / aIdeal) * 100) : 0;
    statsPorArea[area.id] = { ideal: aIdeal, obtenido: aObt, pct };
    totalIdeal += aIdeal;
    totalObtenido += aObt;
  });

  const pctGlobal = totalIdeal > 0 ? Math.round((totalObtenido / totalIdeal) * 100) : 0;

  const cogPct = statsPorArea['area-cognitiva']?.pct ?? 50;
  const lenPct = statsPorArea['area-lenguaje']?.pct ?? 50;
  const matPct = statsPorArea['area-matematica']?.pct ?? 50;

  const nombre = estudiante.nombreCompleto.split(' ')[0] || "El/la estudiante";
  const diag = estudiante.diagnostico;

  // 1. Análisis Cognitivo y Comunicativo
  let redaccionCognitiva = `En el ámbito cognitivo y de funciones ejecutivas, ${nombre} (quien presenta diagnóstico de ${diag}) logra un rendimiento global del ${pctGlobal}% en los instrumentos informales aplicados. `;
  
  if (cogPct >= 70) {
    redaccionCognitiva += `Demuestra un sólido desempeño general en tareas cognitivas (${cogPct}%), con destacada capacidad de atención focalizada y comprensión de consignas estructuradas. `;
  } else if (cogPct >= 45) {
    redaccionCognitiva += `Presenta un desempeño cognitivo medio (${cogPct}%), evidenciando variabilidad en sus niveles de concentración sostenida y requiriendo mediación periódica para focalizar la atención ante tareas de extensión prolongada. `;
  } else {
    redaccionCognitiva += `En el área cognitiva (${cogPct}%) se aprecian importantes barreras asociadas a fatiga atencional rápida, dispersión ante estímulos secundarios y sobrecarga en memoria operativa de trabajo. `;
  }

  if (lenPct >= 70) {
    redaccionCognitiva += `En la dimensión de lenguaje verbal (${lenPct}%), manifiesta fluidez en comprensión inferencial y vocabulario adecuado a su nivel escolar. `;
  } else {
    redaccionCognitiva += `En el área de lenguaje verbal (${lenPct}%), presenta mejor ejecución en comprensión de enunciados breves y directos, disminuyendo su precisión al enfrentar textos complejos que demandan síntesis, deducción de ideas implícitas y redacción argumentativa independiente. `;
  }

  if (matPct >= 60) {
    redaccionCognitiva += `Respecto al pensamiento matemático (${matPct}%), maneja algoritmos operatorios básicos de forma autónoma. `;
  } else {
    redaccionCognitiva += `En pensamiento lógico-matemático (${matPct}%), requiere andamiaje en la interpretación de problemas verbales, álgebra y análisis probabilístico, mostrando beneficio cuando se utilizan representaciones gráficas y material concreto.`;
  }

  // 2. Socioemocional
  const redaccionSocioemocional = `${nombre} muestra una disposición favorable hacia el aprendizaje y la interacción en el aula cuando percibe un entorno empático y predecible. Presenta buen nivel de trabajo colaborativo con sus pares. Ante situaciones de evaluación con alta presión temporal o dificultad creciente, puede experimentar frustración o ansiedad momentánea, la cual se regula satisfactoriamente mediante contención verbal y validación emocional oportuna. Manifiesta curiosidad e interés frente a metodologías activas y proyectos dinámicos.`;

  // 3. Motora y Sensorial
  const redaccionMotora = `No se evidencian dificultades motoras significativas; presenta adecuada prensión instrumental, control postural y coordinación visomotriz acorde a su etapa del desarrollo. En la esfera sensorial, se observa que entornos con exceso de contaminación acústica o estímulos visuales concurrentes tienden a dispersar su foco atencional, recomendándose una ubicación estratégica en el aula regular.`;

  // 4. Síntesis
  const sintesisCog = `Fortalezas en razonamiento analógico y tareas dinámicas guiadas (${pctGlobal}% global). Barreras prioritarias en la memoria de trabajo, velocidad de procesamiento y planificación temporal autónoma ante exigencias de mayor complejidad.`;
  const sintesisSoc = `Actitud participativa, empatía y receptividad al acompañamiento docente. Desafío en fortalecer la autorregulación ante la frustración escolar.`;
  const sintesisMot = `Desarrollo psicomotor y sensorial normativo con necesidad de resguardo de distractores ambientales.`;
  const conclusion = `A partir de los resultados integrales, se concluye que ${nombre} requiere continuidad de apoyos especializados en el Programa de Integración Escolar (PIE), bajo adecuaciones curriculares de acceso y diversificación de la enseñanza en aula común y aula de recursos (Decreto 83 / Decreto 170 / Cartilla 4 MINEDUC).`;

  // 5. Sugerencias
  const sugEstablecimiento = `Facilitar la aplicación de pautas DUA en la planificación institucional y asegurar la coordinación horaria para el trabajo colaborativo entre profesores de aula regular y profesionales PIE.`;
  const sugEquipo = `1. Ubicar a ${nombre} en un asiento preferencial alejado de focos distractores (puertas, ventanas).\n2. Fraccionar las guías y evaluaciones extensas en bloques con metas intermedias.\n3. Otorgar tiempo adicional del 30% en evaluaciones sumativas escritas.\n4. Incorporar apoyos visuales, organizadores gráficos y listas de cotejo para el automonitoreo de tareas.`;
  const sugEstudiante = `1. Emplear un calendario o agenda de tareas organizada con colores para priorizar actividades.\n2. Fraccionar las sesiones de estudio en bloques breves (25 minutos de estudio por 5 de pausa activa).\n3. Solicitar clarificación de instrucciones cuando sienta confusión antes de comenzar.`;
  const sugFamilia = `1. Establecer rutinas y horarios estables para el estudio y el descanso en el hogar.\n2. Evitar el uso de pantallas o distractores durante los momentos dedicados a tareas escolares.\n3. Reconocer y celebrar el esfuerzo y la constancia de ${nombre}, fomentando una autoimagen positiva.`;
  const sugOtros = `Mantener retroalimentación constante con el equipo de salud médica/psicológica tratante y asistir a las reuniones periódicas de seguimiento PIE.`;

  return {
    analisisCualitativo: {
      cognitivaYComunicativa: redaccionCognitiva,
      socioemocionalYAproximacion: redaccionSocioemocional,
      motoraAutonomiaYSensorial: redaccionMotora,
    },
    sintesis: {
      cognitivaYComunicativa: sintesisCog,
      socioemocionalYAproximacion: sintesisSoc,
      motoraAutonomiaYSensorial: sintesisMot,
      conclusion,
    },
    sugerencias: {
      alEstablecimiento: sugEstablecimiento,
      alEquipoAula: sugEquipo,
      alEstudiante: sugEstudiante,
      aLaFamilia: sugFamilia,
      otros: sugOtros,
    }
  };
}
