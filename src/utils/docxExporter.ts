import { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, WidthType, AlignmentType, HeadingLevel, BorderStyle } from "docx";
import { EstudiantePIE, InformePIE } from "../types/pie";

export async function exportarInformeADocx(estudiante: EstudiantePIE, informe: InformePIE): Promise<Blob> {
  const tableBorder = {
    top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
    bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
    left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
    right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
  };

  const createCell = (text: string, bold = false, widthPercent = 50, shadingColor = "") => {
    return new TableCell({
      width: { size: widthPercent, type: WidthType.PERCENTAGE },
      borders: tableBorder,
      shading: shadingColor ? { fill: shadingColor } : undefined,
      children: [
        new Paragraph({
          children: [new TextRun({ text, bold, font: "Arial", size: 18 })], // 9pt
        }),
      ],
    });
  };

  const createHeaderCell = (text: string, colSpan = 1) => {
    return new TableCell({
      columnSpan: colSpan,
      borders: tableBorder,
      shading: { fill: "E0E0E0" },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text, bold: true, font: "Arial", size: 20 })], // 10pt
        }),
      ],
    });
  };

  // Section 1: Identificación
  const tableIdentificacion = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({ children: [createHeaderCell("IDENTIFICACIÓN", 2)] }),
      new TableRow({ children: [createCell("NOMBRE DE IDENTIDAD ESTUDIANTE", true, 40), createCell(estudiante.nombreCompleto, false, 60)] }),
      new TableRow({ children: [createCell("NOMBRE SOCIAL DEL ESTUDIANTE", true, 40), createCell(estudiante.nombreSocial, false, 60)] }),
      new TableRow({ children: [createCell("FECHA DE NACIMIENTO", true, 40), createCell(estudiante.fechaNacimiento, false, 60)] }),
      new TableRow({ children: [createCell("EDAD", true, 40), createCell(estudiante.edad, false, 60)] }),
      new TableRow({ children: [createCell("ESTABLECIMIENTO", true, 40), createCell(informe.establecimiento, false, 60)] }),
      new TableRow({ children: [createCell("CURSO / NIVEL", true, 40), createCell(estudiante.curso, false, 60)] }),
      new TableRow({ children: [createCell("DIAGNÓSTICO", true, 40), createCell(estudiante.diagnostico, false, 60)] }),
      new TableRow({ children: [createCell("FECHA DE EMISIÓN DE DIAGNÓSTICO", true, 40), createCell(informe.fechaEmisionDiagnostico || "-", false, 60)] }),
      new TableRow({ children: [createCell("FECHA DEL INFORME", true, 40), createCell(informe.fechaInforme, false, 60)] }),
    ],
  });

  // Section 2: Motivo
  const tableMotivo = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({ children: [createHeaderCell("MOTIVO DE EVALUACIÓN PSICOPEDAGOGICA", 3)] }),
      new TableRow({
        children: [
          createCell(`INGRESO: ${informe.periodo === 'Ingreso' ? '[ X ]' : '[   ]'}`, false, 33),
          createCell(`REEVALUACIÓN: ${informe.periodo === 'Reevaluación' ? '[ X ]' : '[   ]'}`, false, 33),
          createCell(`OTRO: ${informe.periodo === 'Otro' ? '[ X ]' : '[   ]'}`, false, 34),
        ]
      }),
      new TableRow({ children: [createHeaderCell("INSTRUMENTOS APLICADOS", 3)] }),
      new TableRow({
        children: [
          new TableCell({
            columnSpan: 3,
            borders: tableBorder,
            children: [
              new Paragraph({
                children: [new TextRun({ text: informe.instrumentosAplicados, font: "Arial", size: 18 })]
              })
            ]
          })
        ]
      }),
    ]
  });

  // Section 3: Antecedentes relevantes
  const tableAntecedentes = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({ children: [createHeaderCell("ANTECEDENTES RELEVANTES SOBRE LA HISTORIA ESCOLAR", 1)] }),
      new TableRow({
        children: [
          new TableCell({
            borders: tableBorder,
            children: [
              new Paragraph({
                children: [new TextRun({ text: informe.antecedentesHistoriaEscolar, font: "Arial", size: 18 })]
              }),
              new Paragraph({ text: "" }),
              new Paragraph({
                children: [
                  new TextRun({ text: "Antecedentes de Salud y Familia: ", bold: true, font: "Arial", size: 18 }),
                  new TextRun({ text: informe.antecedentesSaludFamilia, font: "Arial", size: 18 })
                ]
              })
            ]
          })
        ]
      })
    ]
  });

  // Table items rows helper for quantitative items
  const quantRows: TableRow[] = [
    new TableRow({
      children: [
        createHeaderCell("Área / Dimensión"),
        createHeaderCell("Ítem"),
        createHeaderCell("Ptje. ideal"),
        createHeaderCell("Ptje. obtenido"),
        createHeaderCell("% logro"),
        createHeaderCell("Nivel"),
      ]
    })
  ];

  informe.evaluacionInformal.areas.forEach(area => {
    area.subareas.forEach(sub => {
      sub.items.forEach((item, index) => {
        const pct = item.ptjeIdeal > 0 ? Math.round((item.ptjeObtenido / item.ptjeIdeal) * 100) : 0;
        const nivel = pct >= 70 ? "Bueno" : pct >= 40 ? "Medio" : "Por desarrollar";
        
        quantRows.push(
          new TableRow({
            children: [
              createCell(index === 0 ? `${area.nombre} - ${sub.nombre}` : "", false, 35),
              createCell(item.numero.toString() + (item.nombre ? ` (${item.nombre})` : ""), false, 25),
              createCell(item.ptjeIdeal.toString(), false, 10),
              createCell(item.ptjeObtenido.toString(), false, 10),
              createCell(`${pct}%`, false, 10),
              createCell(nivel, false, 10),
            ]
          })
        );
      });
    });
  });

  const tableAnalisisCuantitativo = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: quantRows
  });

  // Section 4: Análisis cualitativo
  const tableAnalisisCualitativo = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [createHeaderCell("ANÁLISIS CUALITATIVO DE INSTRUMENTOS APLICADOS (incorporar análisis cuantitativo de ser necesario)", 1)]
      }),
      new TableRow({
        children: [
          new TableCell({
            borders: tableBorder,
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: "a) Habilidades Cognitivas y Comunicativas:", bold: true, font: "Arial", size: 18 }),
                ]
              }),
              new Paragraph({
                children: [new TextRun({ text: informe.analisisCualitativo.cognitivaYComunicativa, font: "Arial", size: 18 })]
              }),
              new Paragraph({ text: "" }),
              new Paragraph({
                children: [new TextRun({ text: "Tabulación Cuantitativa - Evaluación Informal Diversi:", bold: true, font: "Arial", size: 18 })]
              }),
            ]
          })
        ]
      })
    ]
  });

  // Section 4 continued: Habilidades personales y motoras
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
                  new TextRun({ text: "b) Habilidades Personales, Socioemocionales y de Aproximación al Aprendizaje:", bold: true, font: "Arial", size: 18 }),
                ]
              }),
              new Paragraph({
                children: [new TextRun({ text: informe.analisisCualitativo.socioemocionalYAproximacion, font: "Arial", size: 18 })]
              }),
              new Paragraph({ text: "" }),
              new Paragraph({
                children: [
                  new TextRun({ text: "c) Habilidades motoras, de autonomía y sensoriales:", bold: true, font: "Arial", size: 18 }),
                ]
              }),
              new Paragraph({
                children: [new TextRun({ text: informe.analisisCualitativo.motoraAutonomiaYSensorial, font: "Arial", size: 18 })]
              }),
            ]
          })
        ]
      })
    ]
  });

  // Section 5: Síntesis
  const tableSintesis = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({ children: [createHeaderCell("SÍNTESIS (Fortalezas, Desafíos, Contexto, Estrategias)", 1)] }),
      new TableRow({
        children: [
          new TableCell({
            borders: tableBorder,
            children: [
              new Paragraph({
                children: [new TextRun({ text: "a) Habilidades Cognitivas y Comunicativas: ", bold: true, font: "Arial", size: 18 }), new TextRun({ text: informe.sintesis.cognitivaYComunicativa, font: "Arial", size: 18 })]
              }),
              new Paragraph({
                children: [new TextRun({ text: "b) Habilidades Personales, Socioemocionales: ", bold: true, font: "Arial", size: 18 }), new TextRun({ text: informe.sintesis.socioemocionalYAproximacion, font: "Arial", size: 18 })]
              }),
              new Paragraph({
                children: [new TextRun({ text: "c) Habilidades motoras, de autonomía: ", bold: true, font: "Arial", size: 18 }), new TextRun({ text: informe.sintesis.motoraAutonomiaYSensorial, font: "Arial", size: 18 })]
              }),
              new Paragraph({ text: "" }),
              new Paragraph({
                children: [new TextRun({ text: "Conclusión: ", bold: true, font: "Arial", size: 18 }), new TextRun({ text: informe.sintesis.conclusion, font: "Arial", size: 18 })]
              }),
            ]
          })
        ]
      })
    ]
  });

  // Section 6: Sugerencias
  const tableSugerencias = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({ children: [createHeaderCell("SUGERENCIAS", 2)] }),
      new TableRow({ children: [createCell("1.- Al establecimiento educacional", true, 35), createCell(informe.sugerencias.alEstablecimiento, false, 65)] }),
      new TableRow({ children: [createCell("2.- Al equipo de aula", true, 35), createCell(informe.sugerencias.alEquipoAula, false, 65)] }),
      new TableRow({ children: [createCell("3.- Al estudiante", true, 35), createCell(informe.sugerencias.alEstudiante, false, 65)] }),
      new TableRow({ children: [createCell("4.- A la familia", true, 35), createCell(informe.sugerencias.aLaFamilia, false, 65)] }),
      new TableRow({ children: [createCell("5.- Otros", true, 35), createCell(informe.sugerencias.otros, false, 65)] }),
    ]
  });

  // Section 7: Identificación del Profesional
  const tableProfesional = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({ children: [createHeaderCell("IDENTIFICACIÓN DEL PROFESIONAL QUE EMITE EL INFORME", 2)] }),
      new TableRow({ children: [createCell("Nombre completo", true, 40), createCell(informe.profesional.nombre, false, 60)] }),
      new TableRow({ children: [createCell("RUT", true, 40), createCell(informe.profesional.rut, false, 60)] }),
      new TableRow({ children: [createCell("Profesión / Cargo", true, 40), createCell(`${informe.profesional.profesion} (${informe.profesional.cargo})`, false, 60)] }),
      new TableRow({ children: [createCell("N° de registro SECREDUC/MINEDUC", true, 40), createCell(informe.profesional.registroMineduc, false, 60)] }),
      new TableRow({ children: [createCell("Firma y Timbre", true, 40), createCell("________________________________________", false, 60)] }),
    ]
  });

  // Section 8: Pauta de Observación (Cartilla 4 MINEDUC)
  const obsPedRows: TableRow[] = [
    new TableRow({
      children: [
        createHeaderCell("Antecedentes Pedagógicos (Cartilla 4 Mineduc)", 1),
        createHeaderCell("1 (Inicio)", 1),
        createHeaderCell("2 (Desarrollo)", 1),
        createHeaderCell("3 (Logrado)", 1),
        createHeaderCell("N/O", 1),
      ]
    })
  ];

  informe.pautaObservacion.antecedentesPedagogicos.forEach(ind => {
    obsPedRows.push(
      new TableRow({
        children: [
          createCell(ind.texto, false, 68),
          createCell(ind.valor === '1' ? 'X' : '', true, 8),
          createCell(ind.valor === '2' ? 'X' : '', true, 8),
          createCell(ind.valor === '3' ? 'X' : '', true, 8),
          createCell(ind.valor === 'N/O' ? 'X' : '', true, 8),
        ]
      })
    );
  });

  const obsSocRows: TableRow[] = [
    new TableRow({
      children: [
        createHeaderCell("Antecedentes Sociales y Comunicativos (Cartilla 4 Mineduc)", 1),
        createHeaderCell("1 (Inicio)", 1),
        createHeaderCell("2 (Desarrollo)", 1),
        createHeaderCell("3 (Logrado)", 1),
        createHeaderCell("N/O", 1),
      ]
    })
  ];

  informe.pautaObservacion.antecedentesSocialesComunicativos.forEach(ind => {
    obsSocRows.push(
      new TableRow({
        children: [
          createCell(ind.texto, false, 68),
          createCell(ind.valor === '1' ? 'X' : '', true, 8),
          createCell(ind.valor === '2' ? 'X' : '', true, 8),
          createCell(ind.valor === '3' ? 'X' : '', true, 8),
          createCell(ind.valor === 'N/O' ? 'X' : '', true, 8),
        ]
      })
    );
  });

  const tableObsPed = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: obsPedRows
  });

  const tableObsSoc = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: obsSocRows
  });

  const tableDocenteAula = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({ children: [createHeaderCell("IDENTIFICACIÓN DEL DOCENTE DE AULA REGULAR QUE EMITE EL INFORME", 2)] }),
      new TableRow({ children: [createCell("Nombre completo", true, 40), createCell(informe.pautaObservacion.docenteAulaRegular.nombre, false, 60)] }),
      new TableRow({ children: [createCell("RUT", true, 40), createCell(informe.pautaObservacion.docenteAulaRegular.rut, false, 60)] }),
      new TableRow({ children: [createCell("Profesión / Asignatura", true, 40), createCell(`${informe.pautaObservacion.docenteAulaRegular.profesion} - ${informe.pautaObservacion.docenteAulaRegular.asignatura}`, false, 60)] }),
      new TableRow({ children: [createCell("Firma", true, 40), createCell("________________________________________", false, 60)] }),
    ]
  });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: "INFORME DE EVALUACIÓN PSICOPEDAGÓGICA",
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: "FORMATO OFICIAL MINEDUC - PROGRAMA DE INTEGRACIÓN ESCOLAR (PIE)",
            alignment: AlignmentType.CENTER,
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
            text: "PAUTA DE EVALUACIÓN Y OBSERVACIÓN PEDAGÓGICA DEL ESTUDIANTE EN EL CONTEXTO ESCOLAR",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
          }),
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
