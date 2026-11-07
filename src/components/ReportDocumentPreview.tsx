import React from 'react';
import { EstudiantePIE, InformePIE } from '../types/pie';
import { FileDown, Printer, ShieldCheck } from 'lucide-react';

interface ReportDocumentPreviewProps {
  estudiante: EstudiantePIE;
  informe: InformePIE;
  onExportarDocx: () => void;
  onImprimir: () => void;
}

export const ReportDocumentPreview: React.FC<ReportDocumentPreviewProps> = ({
  estudiante,
  informe,
  onExportarDocx,
  onImprimir,
}) => {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Top Banner Actions */}
      <div className="bg-white p-3.5 md:p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-xs md:text-sm">Vista Previa del Documento Oficial Mineduc</h3>
            <p className="text-[11px] md:text-xs text-slate-500">Formato idéntico al emitido por Diversi y alineado con la Cartilla 4 y 5 del MINEDUC.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={onExportarDocx}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
          >
            <FileDown className="w-4 h-4 shrink-0" />
            <span>Descargar Word</span>
          </button>
          <button
            onClick={onImprimir}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs transition"
          >
            <Printer className="w-4 h-4 shrink-0" />
            <span>Imprimir / PDF</span>
          </button>
        </div>
      </div>

      {/* Mobile scroll hint */}
      <div className="md:hidden text-center text-[11px] text-slate-500 bg-slate-100 p-2 rounded-lg border border-slate-200 no-print">
        👉 Desliza horizontalmente la hoja para visualizar las tablas completas
      </div>

      {/* Simulated Paper Document Container with Horizontal Scroll on Mobile */}
      <div className="overflow-x-auto pb-4">
        <div className="bg-white border border-slate-300 shadow-lg rounded-sm p-4 sm:p-8 md:p-10 min-w-[650px] md:min-w-0 max-w-4xl mx-auto text-slate-900 text-xs font-sans print:shadow-none print:border-none print:p-0 print:min-w-0">
          {/* Document Title Header */}
          <div className="text-center mb-6 md:mb-8 pb-4 border-b border-slate-200">
            <div className="text-[10px] md:text-[11px] font-bold tracking-wider text-slate-500 uppercase mb-1">
              REPÚBLICA DE CHILE • MINISTERIO DE EDUCACIÓN
            </div>
            <h1 className="text-lg md:text-xl font-black text-slate-900 tracking-tight uppercase">
              Informe de Evaluación Psicopedagógica
            </h1>
            <p className="text-[11px] md:text-xs font-medium text-slate-600 mt-1">
              PROGRAMA DE INTEGRACIÓN ESCOLAR (PIE) • DECRETOS SUPREMOS N° 170 / N° 83
            </p>
          </div>

          {/* 1. Identificación Table */}
          <div className="mb-6">
            <table className="w-full border-collapse border border-slate-400 text-xs">
              <thead>
                <tr className="bg-slate-200 text-center font-bold">
                  <th colSpan={2} className="border border-slate-400 py-1.5 uppercase">
                    IDENTIFICACIÓN
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold w-1/3 bg-slate-50">NOMBRE DE IDENTIDAD ESTUDIANTE</td>
                  <td className="border border-slate-400 p-2">{estudiante.nombreCompleto}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">NOMBRE SOCIAL DEL ESTUDIANTE</td>
                  <td className="border border-slate-400 p-2">{estudiante.nombreSocial || estudiante.nombreCompleto}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">FECHA DE NACIMIENTO</td>
                  <td className="border border-slate-400 p-2">{estudiante.fechaNacimiento}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">EDAD</td>
                  <td className="border border-slate-400 p-2">{estudiante.edad}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">ESTABLECIMIENTO</td>
                  <td className="border border-slate-400 p-2">{informe.establecimiento}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">CURSO / NIVEL</td>
                  <td className="border border-slate-400 p-2 font-semibold">{estudiante.curso}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">DIAGNÓSTICO</td>
                  <td className="border border-slate-400 p-2 font-semibold">{estudiante.diagnostico} ({estudiante.tipoNEE})</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">FECHA DE EMISIÓN DE DIAGNÓSTICO</td>
                  <td className="border border-slate-400 p-2">{informe.fechaEmisionDiagnostico || "-"}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">FECHA DEL INFORME</td>
                  <td className="border border-slate-400 p-2">{informe.fechaInforme}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 2. Motivo Table */}
          <div className="mb-6">
            <table className="w-full border-collapse border border-slate-400 text-xs">
              <thead>
                <tr className="bg-slate-200 text-center font-bold">
                  <th colSpan={3} className="border border-slate-400 py-1.5 uppercase">
                    MOTIVO DE EVALUACIÓN PSICOPEDAGOGICA
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center font-medium">
                  <td className="border border-slate-400 p-2">INGRESO: {informe.periodo === 'Ingreso' ? '[ X ]' : '[   ]'}</td>
                  <td className="border border-slate-400 p-2">REEVALUACIÓN: {informe.periodo === 'Reevaluación' ? '[ X ]' : '[   ]'}</td>
                  <td className="border border-slate-400 p-2">OTRO: {informe.periodo === 'Otro' ? '[ X ]' : '[   ]'}</td>
                </tr>
                <tr className="bg-slate-200 text-center font-bold">
                  <th colSpan={3} className="border border-slate-400 py-1.5 uppercase">
                    INSTRUMENTOS APLICADOS
                  </th>
                </tr>
                <tr>
                  <td colSpan={3} className="border border-slate-400 p-3 leading-relaxed whitespace-pre-line">
                    {informe.instrumentosAplicados}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 3. Antecedentes Table */}
          <div className="mb-6">
            <table className="w-full border-collapse border border-slate-400 text-xs">
              <thead>
                <tr className="bg-slate-200 text-center font-bold">
                  <th className="border border-slate-400 py-1.5 uppercase">
                    ANTECEDENTES RELEVANTES SOBRE LA HISTORIA ESCOLAR
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-3 leading-relaxed space-y-2">
                    <p>{informe.antecedentesHistoriaEscolar}</p>
                    <p className="pt-2 border-t border-slate-200">
                      <span className="font-bold">Antecedentes Familiares y de Salud: </span>
                      {informe.antecedentesSaludFamilia}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 4. Análisis Cualitativo & Cuantitativo */}
          <div className="mb-6">
            <table className="w-full border-collapse border border-slate-400 text-xs">
              <thead>
                <tr className="bg-slate-200 text-center font-bold">
                  <th className="border border-slate-400 py-1.5 uppercase">
                    ANÁLISIS CUALITATIVO DE INSTRUMENTOS APLICADOS (incorporar análisis cuantitativo de ser necesario)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-3 leading-relaxed">
                    <p className="font-bold mb-1">a) Habilidades Cognitivas y Comunicativas:</p>
                    <p className="mb-4">{informe.analisisCualitativo.cognitivaYComunicativa}</p>

                    <div className="my-3">
                      <p className="font-bold text-[11px] mb-2 uppercase text-slate-700">
                        Evaluación psicopedagógica informal - Diversi (Nivel: {informe.evaluacionInformal.cursoNivel})
                      </p>
                      <table className="w-full border-collapse border border-slate-400 text-[11px]">
                        <thead>
                          <tr className="bg-slate-100 font-bold text-center">
                            <th className="border border-slate-400 p-1">Área / Dimensión</th>
                            <th className="border border-slate-400 p-1">Ítem</th>
                            <th className="border border-slate-400 p-1">Ptje. ideal</th>
                            <th className="border border-slate-400 p-1">Ptje. obtenido</th>
                            <th className="border border-slate-400 p-1">% logro</th>
                            <th className="border border-slate-400 p-1">Nivel</th>
                          </tr>
                        </thead>
                        <tbody>
                          {informe.evaluacionInformal.areas.map(area => 
                            area.subareas.map(sub => 
                              sub.items.map((item, index) => {
                                const pct = item.ptjeIdeal > 0 ? Math.round((item.ptjeObtenido / item.ptjeIdeal) * 100) : 0;
                                const nivel = pct >= 70 ? "Bueno" : pct >= 40 ? "Medio" : "Por desarrollar";
                                return (
                                  <tr key={item.id} className="text-center">
                                    <td className="border border-slate-400 p-1 text-left font-medium">
                                      {index === 0 ? `${area.nombre} - ${sub.nombre}` : ''}
                                    </td>
                                    <td className="border border-slate-400 p-1">{item.numero} ({item.nombre})</td>
                                    <td className="border border-slate-400 p-1 font-mono">{item.ptjeIdeal}</td>
                                    <td className="border border-slate-400 p-1 font-mono font-bold">{item.ptjeObtenido}</td>
                                    <td className="border border-slate-400 p-1 font-mono">{pct}%</td>
                                    <td className="border border-slate-400 p-1 font-medium">{nivel}</td>
                                  </tr>
                                );
                              })
                            )
                          )}
                        </tbody>
                      </table>
                    </div>

                    <p className="font-bold mt-4 mb-1">b) Habilidades Personales, Socioemocionales y de Aproximación al Aprendizaje:</p>
                    <p className="mb-4">{informe.analisisCualitativo.socioemocionalYAproximacion}</p>

                    <p className="font-bold mb-1">c) Habilidades motoras, de autonomía y sensoriales:</p>
                    <p>{informe.analisisCualitativo.motoraAutonomiaYSensorial}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 5. Síntesis Table */}
          <div className="mb-6">
            <table className="w-full border-collapse border border-slate-400 text-xs">
              <thead>
                <tr className="bg-slate-200 text-center font-bold">
                  <th className="border border-slate-400 py-1.5 uppercase">
                    SÍNTESIS (Fortalezas, Desafíos, Progresos, Contexto y Conclusión)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-3 leading-relaxed space-y-2">
                    <p><span className="font-bold">a) Habilidades Cognitivas y Comunicativas: </span>{informe.sintesis.cognitivaYComunicativa}</p>
                    <p><span className="font-bold">b) Habilidades Personales, Socioemocionales: </span>{informe.sintesis.socioemocionalYAproximacion}</p>
                    <p><span className="font-bold">c) Habilidades motoras, de autonomía: </span>{informe.sintesis.motoraAutonomiaYSensorial}</p>
                    <p className="pt-2 border-t border-slate-200">
                      <span className="font-bold uppercase">Conclusión: </span>
                      {informe.sintesis.conclusion}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 6. Sugerencias Table */}
          <div className="mb-6">
            <table className="w-full border-collapse border border-slate-400 text-xs">
              <thead>
                <tr className="bg-slate-200 text-center font-bold">
                  <th colSpan={2} className="border border-slate-400 py-1.5 uppercase">
                    SUGERENCIAS Y ADECUACIONES (PACI / DUA)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold w-1/3 bg-slate-50">1.- Al establecimiento educacional</td>
                  <td className="border border-slate-400 p-2">{informe.sugerencias.alEstablecimiento}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">2.- Al equipo de aula</td>
                  <td className="border border-slate-400 p-2 whitespace-pre-line">{informe.sugerencias.alEquipoAula}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">3.- Al estudiante</td>
                  <td className="border border-slate-400 p-2 whitespace-pre-line">{informe.sugerencias.alEstudiante}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">4.- A la familia</td>
                  <td className="border border-slate-400 p-2 whitespace-pre-line">{informe.sugerencias.aLaFamilia}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">5.- Otros</td>
                  <td className="border border-slate-400 p-2">{informe.sugerencias.otros}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 7. Firma Profesional */}
          <div className="mb-8">
            <table className="w-full border-collapse border border-slate-400 text-xs">
              <thead>
                <tr className="bg-slate-200 text-center font-bold">
                  <th colSpan={2} className="border border-slate-400 py-1.5 uppercase">
                    IDENTIFICACIÓN DEL PROFESIONAL QUE EMITE EL INFORME
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold w-1/3 bg-slate-50">Nombre completo</td>
                  <td className="border border-slate-400 p-2 font-semibold">{informe.profesional.nombre}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">RUT</td>
                  <td className="border border-slate-400 p-2 font-mono">{informe.profesional.rut}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">Profesión / Cargo</td>
                  <td className="border border-slate-400 p-2">{informe.profesional.profesion} ({informe.profesional.cargo})</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">N° de registro SECREDUC/MINEDUC</td>
                  <td className="border border-slate-400 p-2 font-mono">{informe.profesional.registroMineduc}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-4 font-bold bg-slate-50">Firma y Timbre</td>
                  <td className="border border-slate-400 p-4 text-center">
                    <div className="pt-8 border-b border-dashed border-slate-400 w-48 mx-auto" />
                    <p className="text-[10px] text-slate-500 mt-1">Firma / Timbre Profesional Especialista PIE</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* PAGE BREAK FOR PRINT */}
          <div className="page-break my-8 border-t-2 border-dashed border-slate-300 pt-6 no-print text-center text-slate-400 text-[11px] font-mono">
            --- Salto de página oficial: Pauta de Observación (Cartilla 4 Mineduc) ---
          </div>

          {/* 8. PAUTA DE OBSERVACIÓN (CARTILLA 4 MINEDUC) */}
          <div>
            <div className="text-center mb-6">
              <h2 className="text-sm md:text-base font-bold uppercase tracking-tight text-slate-900">
                PAUTA DE EVALUACIÓN Y OBSERVACIÓN PEDAGÓGICA DEL ESTUDIANTE EN EL CONTEXTO ESCOLAR
              </h2>
              <p className="text-xs text-slate-600 font-medium">
                Cartilla 4 MINEDUC • Decreto 170 / Co-Docencia de Aula Regular
              </p>
            </div>

            <table className="w-full border-collapse border border-slate-400 text-xs mb-4">
              <thead>
                <tr className="bg-slate-200 text-center font-bold">
                  <th colSpan={2} className="border border-slate-400 py-1.5 uppercase">IDENTIFICACIÓN</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold w-1/3 bg-slate-50">NOMBRE ESTUDIANTE</td>
                  <td className="border border-slate-400 p-2">{estudiante.nombreCompleto}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">CURSO</td>
                  <td className="border border-slate-400 p-2">{estudiante.curso}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">FECHA DE APLICACIÓN</td>
                  <td className="border border-slate-400 p-2">{informe.fechaInforme}</td>
                </tr>
              </tbody>
            </table>

            {/* Antecedentes Pedagógicos */}
            <table className="w-full border-collapse border border-slate-400 text-[11px] mb-4">
              <thead>
                <tr className="bg-slate-100 font-bold">
                  <th className="border border-slate-400 p-1.5 text-left">Antecedentes pedagógicos</th>
                  <th className="border border-slate-400 p-1.5 w-10 md:w-12 text-center">1</th>
                  <th className="border border-slate-400 p-1.5 w-10 md:w-12 text-center">2</th>
                  <th className="border border-slate-400 p-1.5 w-10 md:w-12 text-center">3</th>
                  <th className="border border-slate-400 p-1.5 w-10 md:w-12 text-center">N/O</th>
                </tr>
              </thead>
              <tbody>
                {informe.pautaObservacion.antecedentesPedagogicos.map(ind => (
                  <tr key={ind.id}>
                    <td className="border border-slate-400 p-1.5">{ind.texto}</td>
                    <td className="border border-slate-400 p-1.5 text-center font-bold">{ind.valor === '1' ? 'X' : ''}</td>
                    <td className="border border-slate-400 p-1.5 text-center font-bold">{ind.valor === '2' ? 'X' : ''}</td>
                    <td className="border border-slate-400 p-1.5 text-center font-bold">{ind.valor === '3' ? 'X' : ''}</td>
                    <td className="border border-slate-400 p-1.5 text-center font-bold">{ind.valor === 'N/O' ? 'X' : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Antecedentes Sociales y Comunicativos */}
            <table className="w-full border-collapse border border-slate-400 text-[11px] mb-6">
              <thead>
                <tr className="bg-slate-100 font-bold">
                  <th className="border border-slate-400 p-1.5 text-left">Antecedentes sociales y comunicativos</th>
                  <th className="border border-slate-400 p-1.5 w-10 md:w-12 text-center">1</th>
                  <th className="border border-slate-400 p-1.5 w-10 md:w-12 text-center">2</th>
                  <th className="border border-slate-400 p-1.5 w-10 md:w-12 text-center">3</th>
                  <th className="border border-slate-400 p-1.5 w-10 md:w-12 text-center">N/O</th>
                </tr>
              </thead>
              <tbody>
                {informe.pautaObservacion.antecedentesSocialesComunicativos.map(ind => (
                  <tr key={ind.id}>
                    <td className="border border-slate-400 p-1.5">{ind.texto}</td>
                    <td className="border border-slate-400 p-1.5 text-center font-bold">{ind.valor === '1' ? 'X' : ''}</td>
                    <td className="border border-slate-400 p-1.5 text-center font-bold">{ind.valor === '2' ? 'X' : ''}</td>
                    <td className="border border-slate-400 p-1.5 text-center font-bold">{ind.valor === '3' ? 'X' : ''}</td>
                    <td className="border border-slate-400 p-1.5 text-center font-bold">{ind.valor === 'N/O' ? 'X' : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 9. Docente Aula Regular */}
            <table className="w-full border-collapse border border-slate-400 text-xs">
              <thead>
                <tr className="bg-slate-200 text-center font-bold">
                  <th colSpan={2} className="border border-slate-400 py-1.5 uppercase">
                    IDENTIFICACIÓN DEL DOCENTE DE AULA REGULAR QUE EMITE EL INFORME
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold w-1/3 bg-slate-50">Nombre completo</td>
                  <td className="border border-slate-400 p-2">{informe.pautaObservacion.docenteAulaRegular.nombre}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">RUT</td>
                  <td className="border border-slate-400 p-2 font-mono">{informe.pautaObservacion.docenteAulaRegular.rut}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">Profesión / Asignatura</td>
                  <td className="border border-slate-400 p-2">{informe.pautaObservacion.docenteAulaRegular.profesion} - {informe.pautaObservacion.docenteAulaRegular.asignatura}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-4 font-bold bg-slate-50">Firma</td>
                  <td className="border border-slate-400 p-4 text-center">
                    <div className="pt-8 border-b border-dashed border-slate-400 w-48 mx-auto" />
                    <p className="text-[10px] text-slate-500 mt-1">Firma Docente de Aula Regular (Co-Docencia)</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
