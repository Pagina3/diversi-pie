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
  const esDiversi = (estudiante.tipoEvaluacion || 'diversi') === 'diversi';

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Top Banner Actions */}
      <div className="bg-white p-3.5 md:p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-xs md:text-sm">
              Formato Oficial Mineduc • {esDiversi ? 'Evaluación Diversi' : 'Evaluación Tabulatest R-3'}
            </h3>
            <p className="text-[11px] md:text-xs text-slate-500">
              Estructura ministerial con pauta de observación escolar y co-docencia de aula.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={onExportarDocx}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
          >
            <FileDown className="w-4 h-4 shrink-0" />
            <span>Descargar Word (.docx)</span>
          </button>
          <button
            onClick={onImprimir}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs transition"
          >
            <Printer className="w-4 h-4 shrink-0" />
            <span>Imprimir / PDF</span>
          </button>
        </div>
      </div>

      {/* Mobile scroll hint */}
      <div className="md:hidden text-center text-[11px] text-slate-500 bg-slate-100 p-2 rounded-lg border border-slate-200 no-print">
        👉 Desliza horizontalmente la hoja para visualizar las tablas oficiales del MINEDUC
      </div>

      {/* Simulated Official Paper Document Container */}
      <div className="overflow-x-auto pb-6">
        <div className="bg-white border border-slate-300 shadow-lg rounded-sm p-4 sm:p-8 md:p-10 min-w-[720px] md:min-w-0 max-w-4xl mx-auto text-slate-900 text-xs font-sans print:shadow-none print:border-none print:p-0 print:min-w-0">
          
          {/* FRANJA OFICIAL GOBIERNO DE CHILE (MINEDUC) */}
          <div className="flex h-2.5 w-full mb-6 rounded-xs overflow-hidden shadow-xs">
            <div className="w-[35%] bg-[#004B87]" />
            <div className="w-[65%] bg-[#E30613]" />
          </div>

          {/* Document Title Header */}
          <div className="text-center mb-6 pb-4 border-b border-slate-200">
            <div className="text-[10px] md:text-[11px] font-bold tracking-wider text-slate-500 uppercase mb-1">
              REPÚBLICA DE CHILE • MINISTERIO DE EDUCACIÓN • EDUCACIÓN ESPECIAL
            </div>
            <h1 className="text-lg md:text-xl font-black text-slate-900 tracking-tight uppercase">
              INFORME DE EVALUACIÓN PSICOPEDAGÓGICA
            </h1>
            <p className="text-[11px] font-medium text-slate-600 mt-1">
              PROGRAMA DE INTEGRACIÓN ESCOLAR (PIE) • DECRETO SUPREMO N° 170 / DECRETO N° 83
            </p>
          </div>

          {/* 1. IDENTIFICACIÓN */}
          <div className="mb-6">
            <table className="w-full border-collapse border border-slate-400 text-xs">
              <thead>
                <tr className="bg-slate-200 text-center font-bold">
                  <th colSpan={2} className="border border-slate-400 py-1.5 uppercase tracking-wide">
                    IDENTIFICACIÓN
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold w-2/5 bg-slate-50">NOMBRE DE IDENTIDAD ESTUDIANTE</td>
                  <td className="border border-slate-400 p-2 font-medium">{estudiante.nombreCompleto}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">NOMBRE SOCIAL DEL ESTUDIANTE</td>
                  <td className="border border-slate-400 p-2">{estudiante.nombreSocial || estudiante.nombreCompleto}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">FECHA DE NACIMIENTO</td>
                  <td className="border border-slate-400 p-2 font-mono">{estudiante.fechaNacimiento}</td>
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
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">CURSO/NIVEL</td>
                  <td className="border border-slate-400 p-2 font-semibold">{estudiante.curso}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">DIAGNÓSTICO</td>
                  <td className="border border-slate-400 p-2 font-semibold">{estudiante.diagnostico} ({estudiante.tipoNEE})</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">FECHA DE EMISIÓN DE DIAGNÓSTICO</td>
                  <td className="border border-slate-400 p-2 font-mono">{informe.fechaEmisionDiagnostico || "-"}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">FECHA DEL INFORME</td>
                  <td className="border border-slate-400 p-2 font-mono">{informe.fechaInforme}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 2. MOTIVO DE EVALUACIÓN PSICOPEDAGOGICA */}
          <div className="mb-6">
            <table className="w-full border-collapse border border-slate-400 text-xs">
              <thead>
                <tr className="bg-slate-200 text-center font-bold">
                  <th colSpan={3} className="border border-slate-400 py-1.5 uppercase tracking-wide">
                    MOTIVO DE EVALUACIÓN PSICOPEDAGOGICA
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center font-semibold">
                  <td className="border border-slate-400 p-2">INGRESO: {informe.periodo === 'Ingreso' ? '[ X ]' : '[   ]'}</td>
                  <td className="border border-slate-400 p-2">REEVALUACIÓN: {informe.periodo === 'Reevaluación' ? '[ X ]' : '[   ]'}</td>
                  <td className="border border-slate-400 p-2">OTRO: {informe.periodo === 'Otro' ? '[ X ]' : '[   ]'}</td>
                </tr>
                <tr className="bg-slate-200 text-center font-bold">
                  <th colSpan={3} className="border border-slate-400 py-1.5 uppercase tracking-wide">
                    INSTRUMENTOS APLICADOS
                  </th>
                </tr>
                <tr>
                  <td colSpan={3} className="border border-slate-400 p-3 leading-relaxed whitespace-pre-line bg-white">
                    {informe.instrumentosAplicados}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 3. ANTECEDENTES RELEVANTES SOBRE LA HISTORIA ESCOLAR */}
          <div className="mb-6">
            <table className="w-full border-collapse border border-slate-400 text-xs">
              <thead>
                <tr className="bg-slate-200 text-center font-bold">
                  <th className="border border-slate-400 py-1.5 uppercase tracking-wide">
                    ANTECEDENTES RELEVANTES SOBRE LA HISTORIA ESCOLAR
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-3 leading-relaxed space-y-2 bg-white">
                    <p>{informe.antecedentesHistoriaEscolar}</p>
                    <p className="pt-2 border-t border-slate-200">
                      <span className="font-bold">Antecedentes de Salud y Familia: </span>
                      {informe.antecedentesSaludFamilia}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 4. ANÁLISIS CUALITATIVO DE INSTRUMENTOS APLICADOS */}
          <div className="mb-6">
            <table className="w-full border-collapse border border-slate-400 text-xs">
              <thead>
                <tr className="bg-slate-200 text-center font-bold">
                  <th className="border border-slate-400 py-1.5 uppercase tracking-wide">
                    ANÁLISIS CUALITATIVO DE INSTRUMENTOS APLICADOS (incorporar análisis cuantitativo de ser necesario)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-3 leading-relaxed space-y-4 bg-white">
                    {/* a) Habilidades Cognitivas y Comunicativas */}
                    <div>
                      <p className="font-bold text-slate-900 leading-snug mb-1">
                        a) Habilidades Cognitivas y Comunicativas <span className="font-normal text-slate-600">(Atención y concentración, Memoria (a corto y largo plazo), Funciones ejecutivas (planificación, organización, control inhibitorio), Razonamiento lógico-matemático, Resolución de problemas y creatividad, Lenguaje oral y escrito (vocabulario, gramática, coherencia), Comprensión lectora y auditiva, Expresión oral y escrita, Uso de sistemas alternativos o aumentativos de comunicación (cuando es necesario), Relaciones lógico-matemáticas, lectura, escritura, aprendizajes matemáticos, Habilidades digitales (manejo de tecnología), Habilidades adaptativas (transferencia de aprendizajes a contextos nuevos).</span>
                      </p>
                      <p className="mt-2 text-slate-800 leading-relaxed">
                        {informe.analisisCualitativo.cognitivaYComunicativa}
                      </p>
                    </div>

                    {/* Tabulación Cuantitativa Exclusiva (Diversi o Tabulatest) */}
                    <div className="my-3 p-3 bg-slate-50 rounded border border-slate-300">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-bold text-[11px] uppercase tracking-wide text-slate-800">
                          {informe.evaluacionInformal.nombre} — Nivel: {informe.evaluacionInformal.cursoNivel}
                        </p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          esDiversi ? 'bg-teal-100 text-teal-800' : 'bg-indigo-100 text-indigo-800'
                        }`}>
                          {esDiversi ? 'Modelo Diversi' : 'Modelo Tabulatest R-3'}
                        </span>
                      </div>
                      
                      <table className="w-full border-collapse border border-slate-400 text-[11px]">
                        <thead>
                          <tr className="bg-slate-200 font-bold text-center">
                            <th className="border border-slate-400 p-1 text-left">Área / Dimensión</th>
                            <th className="border border-slate-400 p-1">Ítem</th>
                            <th className="border border-slate-400 p-1 w-20">Ptje. ideal</th>
                            <th className="border border-slate-400 p-1 w-24">Ptje. obtenido</th>
                            <th className="border border-slate-400 p-1 w-20">% logro</th>
                            <th className="border border-slate-400 p-1 w-28">Nivel</th>
                          </tr>
                        </thead>
                        <tbody>
                          {informe.evaluacionInformal.areas.map(area => 
                            area.subareas.map(sub => 
                              sub.items.map((item, index) => {
                                const pct = item.ptjeIdeal > 0 ? Math.round((item.ptjeObtenido / item.ptjeIdeal) * 100) : 0;
                                const nivel = pct >= 70 ? "Bueno" : pct >= 40 ? "Medio" : "Por desarrollar";
                                return (
                                  <tr key={item.id} className="text-center bg-white hover:bg-slate-50">
                                    <td className="border border-slate-400 p-1 text-left font-medium">
                                      {index === 0 ? `${area.nombre} - ${sub.nombre}` : ''}
                                    </td>
                                    <td className="border border-slate-400 p-1">{item.numero} ({item.nombre})</td>
                                    <td className="border border-slate-400 p-1 font-mono">{item.ptjeIdeal}</td>
                                    <td className="border border-slate-400 p-1 font-mono font-bold text-slate-900">{item.ptjeObtenido}</td>
                                    <td className="border border-slate-400 p-1 font-mono font-bold">{pct}%</td>
                                    <td className="border border-slate-400 p-1 font-semibold">{nivel}</td>
                                  </tr>
                                );
                              })
                            )
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* b) Habilidades Personales, Socioemocionales */}
                    <div>
                      <p className="font-bold text-slate-900 leading-snug mb-1">
                        b) Habilidades Personales, Socioemocionales y de Aproximación al Aprendizaje <span className="font-normal text-slate-600">(autoestima y autoconfianza, motivación intrínseca, talentos e intereses personales, manejo de emociones y autorregulación emocional, tolerancia a la frustración, trabajo en equipo y cooperación, empatía y respeto por la diversidad, resolución de conflictos, habilidades para pedir ayuda y ofrecer apoyo, curiosidad e interés, persistencia y esfuerzo, estrategias para aprender —organización, uso de recursos, autocontrol— y flexibilidad cognitiva para adaptarse a cambios y nuevos desafíos).</span>
                      </p>
                      <p className="mt-2 text-slate-800 leading-relaxed">
                        {informe.analisisCualitativo.socioemocionalYAproximacion}
                      </p>
                    </div>

                    {/* c) Habilidades motoras, de autonomía y sensoriales */}
                    <div>
                      <p className="font-bold text-slate-900 leading-snug mb-1">
                        c) Habilidades motoras, de autonomía y sensoriales <span className="font-normal text-slate-600">(motricidad gruesa (equilibrio, desplazamiento, coordinación general), motricidad fina (destreza manual, escritura, manipulación de objetos), autonomía funcional / cuidado de sí mismo (higiene personal, alimentación, vestuario, manejo del tiempo y rutinas, seguridad personal y autocuidado) y capacidades sensoperceptivas (visión, audición, tacto, gusto y olfato, integración sensorial, uso de ayudas técnicas como audífonos, lentes o bastón).</span>
                      </p>
                      <p className="mt-2 text-slate-800 leading-relaxed">
                        {informe.analisisCualitativo.motoraAutonomiaYSensorial}
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 5. SÍNTESIS */}
          <div className="mb-6">
            <table className="w-full border-collapse border border-slate-400 text-xs">
              <thead>
                <tr className="bg-slate-200 text-center font-bold">
                  <th className="border border-slate-400 py-1.5 uppercase tracking-wide">
                    SINTESIS <span className="font-normal text-[11px] normal-case">(Fortalezas: los aspectos positivos o recursos del/la estudiante — capacidades, avances, intereses, Desafíos o necesidades: dificultades, barreras o aspectos por mejorar, Progresos: cómo ha evolucionado respecto de evaluaciones previas o metas establecidas, Contexto: factores del entorno que influyen — familia, escuela, apoyos, condiciones socioemocionales, Recomendaciones / proyecciones: sugerencias para continuar el apoyo, adaptaciones, objetivos próximos, Estrategias que han funcionado: prácticas, metodologías o recursos que han sido efectivos)</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-3 leading-relaxed space-y-2 bg-white">
                    <p><span className="font-bold">a) Habilidades Cognitivas y Comunicativas: </span>{informe.sintesis.cognitivaYComunicativa}</p>
                    <p><span className="font-bold">b) Habilidades Personales, Socioemocionales y de Aproximación al Aprendizaje: </span>{informe.sintesis.socioemocionalYAproximacion}</p>
                    <p><span className="font-bold">c) Habilidades motoras, de autonomía y sensoriales: </span>{informe.sintesis.motoraAutonomiaYSensorial}</p>
                    <p className="pt-2 border-t border-slate-200">
                      <span className="font-bold uppercase text-slate-900">Conclusión: </span>
                      {informe.sintesis.conclusion}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 6. SUGERENCIAS */}
          <div className="mb-6">
            <table className="w-full border-collapse border border-slate-400 text-xs">
              <thead>
                <tr className="bg-slate-200 text-center font-bold">
                  <th colSpan={2} className="border border-slate-400 py-1.5 uppercase tracking-wide">
                    Sugerencias
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold w-1/3 bg-slate-50">1.- Al establecimiento educacional</td>
                  <td className="border border-slate-400 p-2 bg-white">{informe.sugerencias.alEstablecimiento}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">2.- Al equipo de aula</td>
                  <td className="border border-slate-400 p-2 whitespace-pre-line bg-white">{informe.sugerencias.alEquipoAula}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">3.- Al estudiante</td>
                  <td className="border border-slate-400 p-2 whitespace-pre-line bg-white">{informe.sugerencias.alEstudiante}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">4.- A la familia</td>
                  <td className="border border-slate-400 p-2 whitespace-pre-line bg-white">{informe.sugerencias.aLaFamilia}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">5.- Otros</td>
                  <td className="border border-slate-400 p-2 bg-white">{informe.sugerencias.otros}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 7. IDENTIFICACIÓN DEL PROFESIONAL QUE EMITE EL INFORME */}
          <div className="mb-8">
            <table className="w-full border-collapse border border-slate-400 text-xs">
              <thead>
                <tr className="bg-slate-200 text-center font-bold">
                  <th colSpan={2} className="border border-slate-400 py-1.5 uppercase tracking-wide">
                    IDENTIFICACIÓN DEL PROFESIONAL QUE EMITE EL INFORME
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold w-1/3 bg-slate-50">Nombre completo</td>
                  <td className="border border-slate-400 p-2 font-semibold bg-white">{informe.profesional.nombre}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">RUT</td>
                  <td className="border border-slate-400 p-2 font-mono bg-white">{informe.profesional.rut}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">Profesión</td>
                  <td className="border border-slate-400 p-2 bg-white">{informe.profesional.profesion}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">N° de registro</td>
                  <td className="border border-slate-400 p-2 font-mono bg-white">{informe.profesional.registroMineduc}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-4 font-bold bg-slate-50">Firma y Timbre</td>
                  <td className="border border-slate-400 p-4 text-center bg-white">
                    <div className="pt-8 border-b border-dashed border-slate-400 w-52 mx-auto" />
                    <p className="text-[10px] text-slate-500 mt-1">Firma / Timbre Profesional Especialista PIE</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* SALTO DE PÁGINA PARA IMPRESIÓN Y SEPARADOR OFICIAL */}
          <div className="page-break my-8 border-t-2 border-dashed border-slate-300 pt-6 no-print text-center text-slate-400 text-[11px] font-mono">
            --- Pauta de Evaluación y Observación Pedagógica del Estudiante (Cartilla 4 Mineduc) ---
          </div>

          {/* FRANJA DE GOBIERNO DE CHILE (SEGUNDA HOJA) */}
          <div className="flex h-2.5 w-full mb-6 rounded-xs overflow-hidden shadow-xs">
            <div className="w-[35%] bg-[#004B87]" />
            <div className="w-[65%] bg-[#E30613]" />
          </div>

          {/* TÍTULO PAUTA DE OBSERVACIÓN */}
          <div className="mb-6">
            <div className="text-center mb-4">
              <h2 className="text-sm md:text-base font-black uppercase tracking-tight text-slate-900">
                PAUTA DE EVALUACIÓN Y OBSERVACIÓN PEDAGÓGICA DEL ESTUDIANTE EN EL CONTEXTO ESCOLAR
              </h2>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                Cartilla 4 MINEDUC • Decreto 170 / Co-Docencia de Aula Regular
              </p>
            </div>

            {/* TABLA IDENTIFICACIÓN PAUTA */}
            <table className="w-full border-collapse border border-slate-400 text-xs mb-4">
              <thead>
                <tr className="bg-slate-200 text-center font-bold">
                  <th colSpan={2} className="border border-slate-400 py-1.5 uppercase tracking-wide">
                    IDENTIFICACIÓN
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold w-1/3 bg-slate-50">NOMBRE ESTUDIANTE</td>
                  <td className="border border-slate-400 p-2 font-medium bg-white">{estudiante.nombreCompleto}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">CURSO</td>
                  <td className="border border-slate-400 p-2 font-semibold bg-white">{estudiante.curso}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">FECHA DE APLICACIÓN</td>
                  <td className="border border-slate-400 p-2 font-mono bg-white">{informe.fechaInforme}</td>
                </tr>
              </tbody>
            </table>

            {/* TABLA ESCALA DE LOGRO */}
            <table className="w-full border-collapse border border-slate-400 text-[11px] mb-4">
              <thead>
                <tr className="bg-slate-200 text-center font-bold">
                  <th colSpan={4} className="border border-slate-400 py-1.5 uppercase tracking-wide">
                    Escala de logro para indicadores
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="align-top bg-white text-slate-800">
                  <td className="border border-slate-400 p-2 w-1/4">
                    <strong className="text-slate-900 block mb-0.5">1.- En inicio:</strong>
                    El/la estudiante aún no cumple el indicador de forma independiente y requiere apoyo permanente.
                  </td>
                  <td className="border border-slate-400 p-2 w-1/4">
                    <strong className="text-slate-900 block mb-0.5">2.- En desarrollo:</strong>
                    El/la estudiante cumple el indicador en algunas ocasiones o requiere apoyo frecuente.
                  </td>
                  <td className="border border-slate-400 p-2 w-1/4">
                    <strong className="text-slate-900 block mb-0.5">3.- Logrado:</strong>
                    El/la estudiante cumple el indicador de manera constante y autónoma, o con los apoyos necesarios.
                  </td>
                  <td className="border border-slate-400 p-2 w-1/4">
                    <strong className="text-slate-900 block mb-0.5">N/O:</strong>
                    No Observado.
                  </td>
                </tr>
              </tbody>
            </table>

            {/* TABLA ANTECEDENTES PEDAGÓGICOS (10 INDICADORES EXACTOS) */}
            <table className="w-full border-collapse border border-slate-400 text-[11px] mb-4">
              <thead>
                <tr className="bg-slate-200 font-bold">
                  <th className="border border-slate-400 p-2 text-left">Antecedentes pedagógicos</th>
                  <th className="border border-slate-400 p-1.5 w-12 text-center">1</th>
                  <th className="border border-slate-400 p-1.5 w-12 text-center">2</th>
                  <th className="border border-slate-400 p-1.5 w-12 text-center">3</th>
                  <th className="border border-slate-400 p-1.5 w-12 text-center">N/O</th>
                </tr>
              </thead>
              <tbody>
                {informe.pautaObservacion.antecedentesPedagogicos.map(ind => (
                  <tr key={ind.id} className="bg-white hover:bg-slate-50">
                    <td className="border border-slate-400 p-2 text-slate-800">{ind.texto}</td>
                    <td className="border border-slate-400 p-1.5 text-center font-bold text-slate-900">{ind.valor === '1' ? 'X' : ''}</td>
                    <td className="border border-slate-400 p-1.5 text-center font-bold text-slate-900">{ind.valor === '2' ? 'X' : ''}</td>
                    <td className="border border-slate-400 p-1.5 text-center font-bold text-slate-900">{ind.valor === '3' ? 'X' : ''}</td>
                    <td className="border border-slate-400 p-1.5 text-center font-bold text-slate-900">{ind.valor === 'N/O' ? 'X' : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* TABLA ANTECEDENTES SOCIALES Y COMUNICATIVOS (10 INDICADORES EXACTOS) */}
            <table className="w-full border-collapse border border-slate-400 text-[11px] mb-6">
              <thead>
                <tr className="bg-slate-200 font-bold">
                  <th className="border border-slate-400 p-2 text-left">Antecedentes sociales y comunicativos</th>
                  <th className="border border-slate-400 p-1.5 w-12 text-center">1</th>
                  <th className="border border-slate-400 p-1.5 w-12 text-center">2</th>
                  <th className="border border-slate-400 p-1.5 w-12 text-center">3</th>
                  <th className="border border-slate-400 p-1.5 w-12 text-center">N/O</th>
                </tr>
              </thead>
              <tbody>
                {informe.pautaObservacion.antecedentesSocialesComunicativos.map(ind => (
                  <tr key={ind.id} className="bg-white hover:bg-slate-50">
                    <td className="border border-slate-400 p-2 text-slate-800">{ind.texto}</td>
                    <td className="border border-slate-400 p-1.5 text-center font-bold text-slate-900">{ind.valor === '1' ? 'X' : ''}</td>
                    <td className="border border-slate-400 p-1.5 text-center font-bold text-slate-900">{ind.valor === '2' ? 'X' : ''}</td>
                    <td className="border border-slate-400 p-1.5 text-center font-bold text-slate-900">{ind.valor === '3' ? 'X' : ''}</td>
                    <td className="border border-slate-400 p-1.5 text-center font-bold text-slate-900">{ind.valor === 'N/O' ? 'X' : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* IDENTIFICACIÓN DEL DOCENTE DE AULA REGULAR */}
            <table className="w-full border-collapse border border-slate-400 text-xs">
              <thead>
                <tr className="bg-slate-200 text-center font-bold">
                  <th colSpan={2} className="border border-slate-400 py-1.5 uppercase tracking-wide">
                    IDENTIFICACIÓN DEL DOCENTE DE AULA REGULAR QUE EMITE EL INFORME
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold w-1/3 bg-slate-50">Nombre completo</td>
                  <td className="border border-slate-400 p-2 font-medium bg-white">{informe.pautaObservacion.docenteAulaRegular.nombre}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">RUT</td>
                  <td className="border border-slate-400 p-2 font-mono bg-white">{informe.pautaObservacion.docenteAulaRegular.rut}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 font-bold bg-slate-50">Profesión</td>
                  <td className="border border-slate-400 p-2 bg-white">{informe.pautaObservacion.docenteAulaRegular.profesion}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-4 font-bold bg-slate-50">Firma</td>
                  <td className="border border-slate-400 p-4 text-center bg-white">
                    <div className="pt-8 border-b border-dashed border-slate-400 w-52 mx-auto" />
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
