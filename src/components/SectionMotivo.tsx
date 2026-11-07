import React from 'react';
import { InformePIE } from '../types/pie';

interface SectionMotivoProps {
  informe: InformePIE;
  onInformeChange: (i: InformePIE) => void;
}

export const SectionMotivo: React.FC<SectionMotivoProps> = ({
  informe,
  onInformeChange,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <span className="bg-teal-100 text-teal-800 text-[11px] font-bold px-2 py-0.5 rounded uppercase">
          Sección II
        </span>
        <h2 className="text-base font-bold text-slate-900 mt-1">Motivo de Evaluación e Instrumentos Aplicados</h2>
        <p className="text-xs text-slate-500">Determinación del objetivo del informe (ingreso o reevaluación) e inventario de pruebas administradas.</p>
      </div>

      {/* Período / Tipo de Motivo */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">Período de Evaluación</label>
        <div className="grid grid-cols-3 gap-3">
          {(['Ingreso', 'Reevaluación', 'Otro'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onInformeChange({ ...informe, periodo: p })}
              className={`py-3 px-4 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                informe.periodo === p
                  ? 'bg-teal-50 border-teal-500 text-teal-800 ring-1 ring-teal-500 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className={`w-3 h-3 rounded-full border flex items-center justify-center ${
                informe.periodo === p ? 'border-teal-600 bg-teal-600' : 'border-slate-300'
              }`}>
                {informe.periodo === p && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
              </span>
              <span>{p}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Detalle Motivo */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Descripción del Motivo de Evaluación
        </label>
        <textarea
          rows={3}
          value={informe.motivoDetalle}
          onChange={(e) => onInformeChange({ ...informe, motivoDetalle: e.target.value })}
          className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed"
          placeholder="Ej: Proceso de Reevaluación Integral del Programa de Integración Escolar (PIE) según normativa Decreto 170 y Decreto 83..."
        />
      </div>

      {/* Instrumentos Aplicados */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Instrumentos y Pautas Aplicadas
        </label>
        <textarea
          rows={4}
          value={informe.instrumentosAplicados}
          onChange={(e) => onInformeChange({ ...informe, instrumentosAplicados: e.target.value })}
          className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed font-mono"
          placeholder="Listado de pruebas estandarizadas, informales, entrevistas y pautas de observación..."
        />
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="text-[10px] text-slate-400">Inserción rápida:</span>
          <button
            type="button"
            onClick={() => onInformeChange({
              ...informe,
              instrumentosAplicados: informe.instrumentosAplicados + (informe.instrumentosAplicados ? ", " : "") + "Evaluación psicopedagógica informal - Diversi (Nivel 1° Medio)"
            })}
            className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded border border-slate-200"
          >
            + Batería Informal Diversi
          </button>
          <button
            type="button"
            onClick={() => onInformeChange({
              ...informe,
              instrumentosAplicados: informe.instrumentosAplicados + (informe.instrumentosAplicados ? ", " : "") + "Pauta de Observación Pedagógica del Estudiante en el Contexto Escolar (Cartilla 4 MINEDUC)"
            })}
            className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded border border-slate-200"
          >
            + Pauta Observación Mineduc
          </button>
          <button
            type="button"
            onClick={() => onInformeChange({
              ...informe,
              instrumentosAplicados: informe.instrumentosAplicados + (informe.instrumentosAplicados ? ", " : "") + "Entrevista a la familia y revisión de anamnesis escolar"
            })}
            className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded border border-slate-200"
          >
            + Anamnesis / Entrevista Familia
          </button>
        </div>
      </div>
    </div>
  );
};
