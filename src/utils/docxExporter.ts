import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  TextRun,
  WidthType,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
} from "docx";
import { EstudiantePIE, InformePIE } from "../types/pie";

export async function exportarInformeADocx(
  estudiante: EstudiantePIE,
  informe: InformePIE
): Promise<Blob> {
  const tableBorder = {
    top: { style: BorderStyle.SINGLE, size: 1, color: "718096" },
    bottom: { style: BorderStyle.SINGLE, size: 1, color: "718096" },
    left: { style: BorderStyle.SINGLE, size: 1, color: "718096" },
    right: { style: BorderStyle.SINGLE, size: 1, color: "718096" },
  };

  const createCell = (
    text: string,
    bold = false,
    widthPercent = 50,
    shadingColor = "",
    alignment: (typeof AlignmentType)[keyof typeof AlignmentType] = AlignmentType.LEFT
  ) => {
    return new TableCell({
      width: { size: widthPercent, type: WidthType.PERCENTAGE },
      borders: tableBorder,
      shading: shadingColor ? { fill: shadingColor } : undefined,
      children: [
        new Paragraph({
          alignment,
          children: [new TextRun({ text, bold, font: "Arial", size: 18 })], // 9pt
        }),
      ],
    });
  };

  const createHeaderCell = (text: string, colSpan = 1, subtext = "") => {
    const children = [
      new TextRun({ text, bold: true, font: "Arial", size: 19 }), // ~9.5pt
    ];
    if (subtext) {
      children.push(
        new TextRun({ text: " " + subtext, bold: false, font: "Arial", size: 16 }) // 8pt
      );
    }
    return new TableCell({
      columnSpan: colSpan,
      borders: tableBorder,
      shading: { fill: "E2E8F0" },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children,
        }),
      ],
    });
  };

  // Section 1: Identificación
  const tableIdentificacion = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({ children: [createHeaderCell("IDENTIFICACIÓN", 2)] }),
      new TableRow({
        children: [
          createCell("NOMBRE DE IDENTIDAD ESTUDIANTE", true, 38, "F8FAFC"),
          createCell(estudiante.nombreCompleto, false, 62),
        ],
      }),
      new TableRow({
        children: [
          createCell("NOMBRE SOCIAL DEL ESTUDIANTE", true, 38, "F8FAFC"),
          createCell(estudiante.nombreSocial || estudiante.nombreCompleto, false, 62),
        ],
      }),
      new TableRow({
        children: [
          createCell("FECHA DE NACIMIENTO", true, 38, "F8FAFC"),
          createCell(estudiante.fechaNacimiento, false, 62),
        ],
      }),
      new TableRow({
        children: [
          createCell("EDAD", true, 38, "F8FAFC"),
          createCell(estudiante.edad, false, 62),
        ],
      }),
      new TableRow({
        children: [
          createCell("ESTABLECIMIENTO", true, 38, "F8FAFC"),
          createCell(informe.establecimiento, false, 62),
        ],
      }),
      new TableRow({
        children: [
          createCell("CURSO/NIVEL", true, 38, "F8FAFC"),
          createCell(estudiante.curso, true, 62),
        ],
      }),
      new TableRow({
        children: [
          createCell("DIAGNÓSTICO", true, 38, "F8FAFC"),
          createCell(`${estudiante.diagnostico} (${estudiante.tipoNEE})`, true, 62),
        ],
      }),
      new TableRow({
        children: [
          createCell("FECHA DE EMISIÓN DE DIAGNÓSTICO", true, 38, "F8FAFC"),
          createCell(informe.fechaEmisionDiagnostico || "-", false, 62),
        ],
      }),
      new TableRow({
        children: [
          createCell("FECHA DEL INFORME", true, 38, "F8FAFC"),
          createCell(informe.fechaInforme, false, 62),
        ],
      }),
    ],
  });

  // Section 2: Motivo de Evaluación Psicopedagógica e Instrumentos
  const tableMotivo = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [createHeaderCell("MOTIVO DE EVALUACIÓN PSICOPEDAGOGICA", 3)],
      }),
      new TableRow({
        children: [
          createCell(
            `INGRESO: ${informe.periodo === "Ingreso" ? "[ X ]" : "[   ]"}`,
            informe.periodo === "Ingreso",
            33,
            "",
            AlignmentType.CENTER
          ),
          createCell(
            `REEVALUACIÓN: ${informe.periodo === "Reevaluación" ? "[ X ]" : "[   ]"}`,
            informe.periodo === "Reevaluación",
            33,
            "",
            AlignmentType.CENTER
          ),
          createCell(
            `OTRO: ${informe.periodo === "Otro" ? "[ X ]" : "[   ]"}`,
            informe.periodo === "Otro",
            34,
            "",
            AlignmentType.CENTER
          ),
        ],
      }),
      new TableRow({
        children: [createHeaderCell("INSTRUMENTOS APLICADOS", 3)],
      }),
      new TableRow({
        children: [
          new TableCell({
            columnSpan: 3,
            borders: tableBorder,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: informe.instrumentosAplicados,
                    font: "Arial",
                    size: 18,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  // Section 3: Antecedentes relevantes sobre la historia escolar
  const tableAntecedentes = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          createHeaderCell("ANTECEDENTES RELEVANTES SOBRE LA HISTORIA ESCOLAR", 1),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            borders: tableBorder,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: informe.antecedentesHistoriaEscolar,
                    font: "Arial",
                    size: 18,
                  }),
                ],
              }),
              new Paragraph({ text: "" }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Antecedentes de Salud y Familia: ",
                    bold: true,
                    font: "Arial",
                    size: 18,
                  }),
                  new TextRun({
                    text: informe.antecedentesSaludFamilia,
                    font: "Arial",
                    size: 18,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  // Section 4: Quantitative table rows
  const quantRows: TableRow[] = [
    new TableRow({
      children: [
        createHeaderCell("Área / Dimensión"),
        createHeaderCell("Ítem"),
        createHeaderCell("Ptje. ideal"),
        createHeaderCell("Ptje. obtenido"),
        createHeaderCell("% logro"),
        createHeaderCell("Nivel"),
      ],
    }),
  ];

  informe.evaluacionInformal.areas.forEach((area) => {
    area.subareas.forEach((sub) => {
      sub.items.forEach((item, index) => {
        const pct =
          item.ptjeIdeal > 0
            ? Math.round((item.ptjeObtenido / item.ptjeIdeal) * 100)
            : 0;
        const nivel =
          pct >= 70 ? "Bueno" : pct >= 40 ? "Medio" : "Por desarrollar";

        quantRows.push(
          new TableRow({
            children: [
              createCell(
                index === 0 ? `${area.nombre} - ${sub.nombre}` : "",
                false,
                32
              ),
              createCell(
                item.numero.toString() + (item.nombre ? ` (${item.nombre})` : ""),
                false,
                28
              ),
              createCell(item.ptjeIdeal.toString(), false, 10, "", AlignmentType.CENTER),
              createCell(item.ptjeObtenido.toString(), true, 10, "", AlignmentType.CENTER),
              createCell(`${pct}%`, true, 10, "", AlignmentType.CENTER),
              createCell(nivel, false, 10, "", AlignmentType.CENTER),
            ],
          })
        );
      });
    });
  });

  const tableAnalisisCuantitativo = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: quantRows,
  });

  // Section 4: Análisis cualitativo de instrumentos aplicados
  const tableAnalisisCualitativo = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          createHeaderCell(
            "ANÁLISIS CUALITATIVO DE INSTRUMENTOS APLICADOS (incorporar análisis cuantitativo de ser necesario)",
            1
          ),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            borders: tableBorder,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "a) Habilidades Cognitivas y Comunicativas ",
                    bold: true,
                    font: "Arial",
                    size: 18,
                  }),
                  new TextRun({
                    text: "(Atención y concentración, Memoria (a corto y largo plazo), Funciones ejecutivas (planificación, organización, control inhibitorio), Razonamiento lógico-matemático, Resolución de problemas y creatividad, Lenguaje oral y escrito (vocabulario, gramática, coherencia), Comprensión lectora y auditiva, Expresión oral y escrita, Uso de sistemas alternativos o aumentativos de comunicación (cuando es necesario), Relaciones lógico-matemáticas, lectura, escritura, aprendizajes matemáticos, Habilidades digitales (manejo de tecnología), Habilidades adaptativas (transferencia de aprendizajes a contextos nuevos).",
                    font: "Arial",
                    size: 16,
                    color: "4A5568",
                  }),
                ],
              }),
              new Paragraph({ text: "" }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: informe.analisisCualitativo.cognitivaYComunicativa,
                    font: "Arial",
                    size: 18,
                  }),
                ],
              }),
              new Paragraph({ text: "" }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Tabulación Cuantitativa - ${informe.evaluacionInformal.nombre} (${estudiante.tipoEvaluacion === 'tabulatest' ? 'Tabulatest R-3' : 'Diversi'}):`,
                    bold: true,
                    font: "Arial",
                    size: 18,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  const tableAnalisisOtrasAreas = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: tableBorder,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "b) Habilidades Personales, Socioemocionales y de Aproximación al Aprendizaje ",
                    bold: true,
                    font: "Arial",
                    size: 18,
                  }),
                  new TextRun({
                    text: "(autoestima y autoconfianza, motivación intrínseca, talentos e intereses personales, manejo de emociones y autorregulación emocional, tolerancia a la frustración, trabajo en equipo y cooperación, empatía y respeto por la diversidad, resolución de conflictos, habilidades para pedir ayuda y ofrecer apoyo, curiosidad e interés, persistencia y esfuerzo, estrategias para aprender —organización, uso de recursos, autocontrol— y flexibilidad cognitiva para adaptarse a cambios y nuevos desafíos).",
                    font: "Arial",
                    size: 16,
                    color: "4A5568",
                  }),
                ],
              }),
              new Paragraph({ text: "" }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: informe.analisisCualitativo.socioemocionalYAproximacion,
                    font: "Arial",
                    size: 18,
                  }),
                ],
              }),
              new Paragraph({ text: "" }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "c) Habilidades motoras, de autonomía y sensoriales ",
                    bold: true,
                    font: "Arial",
                    size: 18,
                  }),
                  new TextRun({
                    text: "(motricidad gruesa (equilibrio, desplazamiento, coordinación general), motricidad fina (destreza manual, escritura, manipulación de objetos), autonomía funcional / cuidado de sí mismo (higiene personal, alimentación, vestuario, manejo del tiempo y rutinas, seguridad personal y autocuidado) y capacidades sensoperceptivas (visión, audición, tacto, gusto y olfato, integración sensorial, uso de ayudas técnicas como audífonos, lentes o bastón).",
                    font: "Arial",
                    size: 16,
                    color: "4A5568",
                  }),
                ],
              }),
              new Paragraph({ text: "" }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: informe.analisisCualitativo.motoraAutonomiaYSensorial,
                    font: "Arial",
                    size: 18,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  // Section 5: Síntesis
  const tableSintesis = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          createHeaderCell(
            "SINTESIS",
            1,
            "(Fortalezas: los aspectos positivos o recursos del/la estudiante — capacidades, avances, intereses, Desafíos o necesidades: dificultades, barreras o aspectos por mejorar, Progresos: cómo ha evolucionado respecto de evaluaciones previas o metas establecidas, Contexto: factores del entorno que influyen — familia, escuela, apoyos, condiciones socioemocionales, Recomendaciones / proyecciones: sugerencias para continuar el apoyo, adaptaciones, objetivos próximos, Estrategias que han funcionado: prácticas, metodologías o recursos que han sido efectivos)"
          ),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            borders: tableBorder,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "a) Habilidades Cognitivas y Comunicativas: ",
                    bold: true,
                    font: "Arial",
                    size: 18,
                  }),
                  new TextRun({
                    text: informe.sintesis.cognitivaYComunicativa,
                    font: "Arial",
                    size: 18,
                  }),
                ],
              }),
              new Paragraph({ text: "" }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "b) Habilidades Personales, Socioemocionales y de Aproximación al Aprendizaje: ",
                    bold: true,
                    font: "Arial",
                    size: 18,
                  }),
                  new TextRun({
                    text: informe.sintesis.socioemocionalYAproximacion,
                    font: "Arial",
                    size: 18,
                  }),
                ],
              }),
              new Paragraph({ text: "" }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "c) Habilidades motoras, de autonomía y sensoriales: ",
                    bold: true,
                    font: "Arial",
                    size: 18,
                  }),
                  new TextRun({
                    text: informe.sintesis.motoraAutonomiaYSensorial,
                    font: "Arial",
                    size: 18,
                  }),
                ],
              }),
              new Paragraph({ text: "" }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Conclusión: ",
                    bold: true,
                    font: "Arial",
                    size: 18,
                  }),
                  new TextRun({
                    text: informe.sintesis.conclusion,
                    font: "Arial",
                    size: 18,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  // Section 6: Sugerencias
  const tableSugerencias = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({ children: [createHeaderCell("Sugerencias", 2)] }),
      new TableRow({
        children: [
          createCell("1.- Al establecimiento educacional", true, 35, "F8FAFC"),
          createCell(informe.sugerencias.alEstablecimiento, false, 65),
        ],
      }),
      new TableRow({
        children: [
          createCell("2.- Al equipo de aula", true, 35, "F8FAFC"),
          createCell(informe.sugerencias.alEquipoAula, false, 65),
        ],
      }),
      new TableRow({
        children: [
          createCell("3.- Al estudiante", true, 35, "F8FAFC"),
          createCell(informe.sugerencias.alEstudiante, false, 65),
        ],
      }),
      new TableRow({
        children: [
          createCell("4.- A la familia", true, 35, "F8FAFC"),
          createCell(informe.sugerencias.aLaFamilia, false, 65),
        ],
      }),
      new TableRow({
        children: [
          createCell("5.- Otros", true, 35, "F8FAFC"),
          createCell(informe.sugerencias.otros, false, 65),
        ],
      }),
    ],
  });

  // Section 7: Identificación del Profesional que emite el informe
  const tableProfesional = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          createHeaderCell(
            "IDENTIFICACIÓN DEL PROFESIONAL QUE EMITE EL INFORME",
            2
          ),
        ],
      }),
      new TableRow({
        children: [
          createCell("Nombre completo", true, 38, "F8FAFC"),
          createCell(informe.profesional.nombre, true, 62),
        ],
      }),
      new TableRow({
        children: [
          createCell("RUT", true, 38, "F8FAFC"),
          createCell(informe.profesional.rut, false, 62),
        ],
      }),
      new TableRow({
        children: [
          createCell("Profesión", true, 38, "F8FAFC"),
          createCell(informe.profesional.profesion, false, 62),
        ],
      }),
      new TableRow({
        children: [
          createCell("N° de registro", true, 38, "F8FAFC"),
          createCell(informe.profesional.registroMineduc, false, 62),
        ],
      }),
      new TableRow({
        children: [
          createCell("Firma y Timbre", true, 38, "F8FAFC"),
          new TableCell({
            width: { size: 62, type: WidthType.PERCENTAGE },
            borders: tableBorder,
            children: [
              new Paragraph({ text: "" }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "________________________________________",
                    font: "Arial",
                    size: 18,
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "Firma / Timbre Profesional Especialista PIE",
                    font: "Arial",
                    size: 16,
                    color: "718096",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  // Section 8: Pauta de Observación Pedagógica en Contexto Escolar (Cartilla 4 MINEDUC)
  const tablePautaIdentificacion = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [createHeaderCell("IDENTIFICACIÓN", 2)],
      }),
      new TableRow({
        children: [
          createCell("NOMBRE ESTUDIANTE", true, 38, "F8FAFC"),
          createCell(estudiante.nombreCompleto, false, 62),
        ],
      }),
      new TableRow({
        children: [
          createCell("CURSO", true, 38, "F8FAFC"),
          createCell(estudiante.curso, true, 62),
        ],
      }),
      new TableRow({
        children: [
          createCell("FECHA DE APLICACIÓN", true, 38, "F8FAFC"),
          createCell(informe.fechaInforme, false, 62),
        ],
      }),
    ],
  });

  const tableEscalaLogro = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [createHeaderCell("Escala de logro para indicadores", 4)],
      }),
      new TableRow({
        children: [
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            borders: tableBorder,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "1.- En inicio: ",
                    bold: true,
                    font: "Arial",
                    size: 17,
                  }),
                  new TextRun({
                    text: "El/la estudiante aún no cumple el indicador de forma independiente y requiere apoyo permanente.",
                    font: "Arial",
                    size: 16,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            borders: tableBorder,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "2.- En desarrollo: ",
                    bold: true,
                    font: "Arial",
                    size: 17,
                  }),
                  new TextRun({
                    text: "El/la estudiante cumple el indicador en algunas ocasiones o requiere apoyo frecuente.",
                    font: "Arial",
                    size: 16,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            borders: tableBorder,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "3.- Logrado: ",
                    bold: true,
                    font: "Arial",
                    size: 17,
                  }),
                  new TextRun({
                    text: "El/la estudiante cumple el indicador de manera constante y autónoma, o con los apoyos necesarios.",
                    font: "Arial",
                    size: 16,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            borders: tableBorder,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "N/O: ",
                    bold: true,
                    font: "Arial",
                    size: 17,
                  }),
                  new TextRun({
                    text: "No Observado.",
                    font: "Arial",
                    size: 16,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  const obsPedRows: TableRow[] = [
    new TableRow({
      children: [
        createHeaderCell("Antecedentes pedagógicos", 1),
        createHeaderCell("1", 1),
        createHeaderCell("2", 1),
        createHeaderCell("3", 1),
        createHeaderCell("N/O", 1),
      ],
    }),
  ];

  informe.pautaObservacion.antecedentesPedagogicos.forEach((ind) => {
    obsPedRows.push(
      new TableRow({
        children: [
          createCell(ind.texto, false, 72),
          createCell(
            ind.valor === "1" ? "X" : "",
            true,
            7,
            "",
            AlignmentType.CENTER
          ),
          createCell(
            ind.valor === "2" ? "X" : "",
            true,
            7,
            "",
            AlignmentType.CENTER
          ),
          createCell(
            ind.valor === "3" ? "X" : "",
            true,
            7,
            "",
            AlignmentType.CENTER
          ),
          createCell(
            ind.valor === "N/O" ? "X" : "",
            true,
            7,
            "",
            AlignmentType.CENTER
          ),
        ],
      })
    );
  });

  const obsSocRows: TableRow[] = [
    new TableRow({
      children: [
        createHeaderCell("Antecedentes sociales y comunicativos", 1),
        createHeaderCell("1", 1),
        createHeaderCell("2", 1),
        createHeaderCell("3", 1),
        createHeaderCell("N/O", 1),
      ],
    }),
  ];

  informe.pautaObservacion.antecedentesSocialesComunicativos.forEach((ind) => {
    obsSocRows.push(
      new TableRow({
        children: [
          createCell(ind.texto, false, 72),
          createCell(
            ind.valor === "1" ? "X" : "",
            true,
            7,
            "",
            AlignmentType.CENTER
          ),
          createCell(
            ind.valor === "2" ? "X" : "",
            true,
            7,
            "",
            AlignmentType.CENTER
          ),
          createCell(
            ind.valor === "3" ? "X" : "",
            true,
            7,
            "",
            AlignmentType.CENTER
          ),
          createCell(
            ind.valor === "N/O" ? "X" : "",
            true,
            7,
            "",
            AlignmentType.CENTER
          ),
        ],
      })
    );
  });

  const tableObsPed = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: obsPedRows,
  });

  const tableObsSoc = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: obsSocRows,
  });

  const tableDocenteAula = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          createHeaderCell(
            "IDENTIFICACIÓN DEL DOCENTE DE AULA REGULAR QUE EMITE EL INFORME",
            2
          ),
        ],
      }),
      new TableRow({
        children: [
          createCell("Nombre completo", true, 38, "F8FAFC"),
          createCell(informe.pautaObservacion.docenteAulaRegular.nombre, false, 62),
        ],
      }),
      new TableRow({
        children: [
          createCell("RUT", true, 38, "F8FAFC"),
          createCell(informe.pautaObservacion.docenteAulaRegular.rut, false, 62),
        ],
      }),
      new TableRow({
        children: [
          createCell("Profesión", true, 38, "F8FAFC"),
          createCell(informe.pautaObservacion.docenteAulaRegular.profesion, false, 62),
        ],
      }),
      new TableRow({
        children: [
          createCell("Firma", true, 38, "F8FAFC"),
          new TableCell({
            width: { size: 62, type: WidthType.PERCENTAGE },
            borders: tableBorder,
            children: [
              new Paragraph({ text: "" }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "________________________________________",
                    font: "Arial",
                    size: 18,
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "Firma Docente de Aula Regular (Co-Docencia)",
                    font: "Arial",
                    size: 16,
                    color: "718096",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720, // 0.5 in
              bottom: 720,
              left: 720,
              right: 720,
            },
          },
        },
        children: [
          new Paragraph({
            text: "REPÚBLICA DE CHILE • MINISTERIO DE EDUCACIÓN • EDUCACIÓN ESPECIAL",
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "REPÚBLICA DE CHILE • MINISTERIO DE EDUCACIÓN • EDUCACIÓN ESPECIAL",
                font: "Arial",
                size: 16,
                bold: true,
                color: "718096",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            heading: HeadingLevel.TITLE,
            children: [
              new TextRun({
                text: "INFORME DE EVALUACIÓN PSICOPEDAGÓGICA",
                font: "Arial",
                size: 26,
                bold: true,
                color: "1A202C",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "PROGRAMA DE INTEGRACIÓN ESCOLAR (PIE) • DECRETO SUPREMO N° 170 / DECRETO N° 83",
                font: "Arial",
                size: 17,
                bold: false,
                color: "4A5568",
              }),
            ],
          }),
          new Paragraph({ text: "" }),
          tableIdentificacion,
          new Paragraph({ text: "" }),
          tableMotivo,
          new Paragraph({ text: "" }),
          tableAntecedentes,
          new Paragraph({ text: "" }),
          tableAnalisisCualitativo,
          new Paragraph({ text: "" }),
          tableAnalisisCuantitativo,
          new Paragraph({ text: "" }),
          tableAnalisisOtrasAreas,
          new Paragraph({ text: "" }),
          tableSintesis,
          new Paragraph({ text: "" }),
          tableSugerencias,
          new Paragraph({ text: "" }),
          tableProfesional,
          new Paragraph({ text: "" }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: "PAUTA DE EVALUACIÓN Y OBSERVACIÓN PEDAGÓGICA DEL ESTUDIANTE EN EL CONTEXTO ESCOLAR",
                font: "Arial",
                size: 22,
                bold: true,
                color: "1A202C",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "Cartilla 4 MINEDUC • Decreto 170 / Co-Docencia de Aula Regular",
                font: "Arial",
                size: 17,
                color: "4A5568",
              }),
            ],
          }),
          new Paragraph({ text: "" }),
          tablePautaIdentificacion,
          new Paragraph({ text: "" }),
          tableEscalaLogro,
          new Paragraph({ text: "" }),
          tableObsPed,
          new Paragraph({ text: "" }),
          tableObsSoc,
          new Paragraph({ text: "" }),
          tableDocenteAula,
        ],
      },
    ],
  });

  return await Packer.toBlob(doc);
}
