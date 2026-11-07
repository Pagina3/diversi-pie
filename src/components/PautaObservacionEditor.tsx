import React from 'react';
import { PautaObservacion, EscalaObservacion } from '../types/pie';
import { UserCheck, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

interface PautaObservacionEditorProps {
  pauta: PautaObservacion;
  onChange: (nuevaPauta: PautaObservacion) => void;
}

export const PautaObservacionEditor: React.FC<PautaObservacionEditorProps> = ({
  pauta,
  onChange,
}) => {
  const handlePedagogicoChange = (id: string, valor: EscalaObservacion) => {
    onChange({
      ...pauta,
      antecedentesPedagogicos: pauta.antecedentesPedagogicos.map(ind => 
        ind.id === id ? { ...ind, valor } : ind
      )
    });
  };

  const handleSocialChange = (id: string, valor: EscalaObservacion) => {
    onChange({
      ...pauta,
      antecedentesSocialesComunicativos: pauta.antecedentesSocialesComunicativos.map(ind => 
        ind.id === id ? { ...ind, valor } : ind
      )
    });
  };

  const handleDocenteChange = (campo: string, valor: string) => {
    onChange({
      ...pauta,
      docenteAulaRegular: {
        ...pauta.docenteAulaRegular,
        [campo]: valor
      }
    });
  };

  // Stats calculation
  const todosIndicadores = [...pauta.antecedentesPedagogicos, ...pauta.antecedentesSocialesComunicativos];
  const totalLogrado = todosIndicadores.filter(i => i.valor === '3').length;
  const totalDesarrollo = todosIndicadores.filter(i => i.valor === '2').length;
  const totalInicio = todosIndicadores.filter(i => i.valor === '1').length;

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Official Header */}
      <div className="bg-white p-4 md:p-5 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-800 text-[10px] md:text-[11px] font-bold px-2.5 py-0.5 rounded uppercase">
              Cartilla 4 Mineduc
            </span>
            <span className="text-xs text-slate-500 font-medium">Decreto 170 / Co-Docencia</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3 text-xs flex-wrap">
            <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" /> Logrado: {totalLogrado}
            </span>
            <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-semibold text-[11px]">
              <Clock className="w-3.5 h-3.5" /> En Desarrollo: {totalDesarrollo}
            </span>
            <span className="flex items-center gap-1 text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 font-semibold text-[11px]">
              <AlertTriangle className="w-3.5 h-3.5" /> En Inicio: {totalInicio}
            </span>
          </div>
        </div>
        <h2 className="text-sm md:text-base font-bold text-slate-900">
          PAUTA DE EVALUACIÓN Y OBSERVACIÓN PEDAGÓGICA DEL ESTUDIANTE EN EL CONTEXTO ESCOLAR
        </h2>
        <p className="text-xs text-slate-500 mt-1 hidden sm:block">
          Instrumento oficial para registrar la observación directa del desempeño del estudiante en aula común, completado colaborativamente con el docente de aula regular.
        </p>

        {/* Criterios de la Escala */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3 md:mt-4 p-2.5 md:p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
          <div className="p-2 bg-white rounded border border-slate-200">
            <div className="font-bold text-slate-900 text-[11px]">1.- En inicio</div>
            <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
              Requiere apoyo permanente.
            </p>
          </div>
          <div className="p-2 bg-white rounded border border-slate-200">
            <div className="font-bold text-slate-900 text-[11px]">2.- En desarrollo</div>
            <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
              Cumple en ocasiones / apoyo frecuente.
            </p>
          </div>
          <div className="p-2 bg-white rounded border border-slate-200">
            <div className="font-bold text-slate-900 text-[11px]">3.- Logrado</div>
            <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
              Cumple de manera autónoma.
            </p>
          </div>
          <div className="p-2 bg-white rounded border border-slate-200">
            <div className="font-bold text-slate-900 text-[11px]">N/O</div>
            <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
              No observado en el período.
            </p>
          </div>
        </div>
      </div>

      {/* Tabla 1: Antecedentes Pedagógicos */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="bg-teal-700 text-white px-4 md:px-5 py-3 flex items-center justify-between">
          <h3 className="font-bold text-xs md:text-sm">1. Antecedentes Pedagógicos (10 Indicadores)</h3>
          <span className="text-[11px] text-teal-100 hidden sm:inline">Observación en actividades de aula</span>
        </div>

        {/* MOBILE VIEW: Touch Cards */}
        <div className="md:hidden p-3 space-y-3">
          {pauta.antecedentesPedagogicos.map((ind, index) => (
            <div key={ind.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-md bg-teal-100 text-teal-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  #{index + 1}
                </span>
                <p className="text-xs font-medium text-slate-800 leading-relaxed">
                  {ind.texto}
                </p>
              </div>

              {/* 4 Touch Option Buttons */}
              <div className="grid grid-cols-4 gap-1.5 pt-1">
                {(['1', '2', '3', 'N/O'] as EscalaObservacion[]).map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handlePedagogicoChange(ind.id, val)}
                    className={`py-2 px-1 rounded-lg font-bold text-xs transition flex flex-col items-center justify-center ${
                      ind.valor === val
                        ? val === '3'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : val === '2'
                          ? 'bg-amber-500 text-white shadow-xs'
                          : val === '1'
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'bg-slate-700 text-white shadow-xs'
                        : 'bg-white border border-slate-300 text-slate-700 active:bg-slate-100'
                    }`}
                  >
                    <span>{val}</span>
                    <span className="text-[9px] font-normal opacity-80">
                      {val === '1' ? 'Inicio' : val === '2' ? 'Desarr.' : val === '3' ? 'Logrado' : 'N/O'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP VIEW: Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4 w-12 text-center">N°</th>
                <th className="py-2.5 px-4">Indicador de Desempeño</th>
                <th className="py-2.5 px-2 w-20 text-center text-rose-700 bg-rose-50/50">1 (Inicio)</th>
                <th className="py-2.5 px-2 w-20 text-center text-amber-700 bg-amber-50/50">2 (Desarrollo)</th>
                <th className="py-2.5 px-2 w-20 text-center text-emerald-700 bg-emerald-50/50">3 (Logrado)</th>
                <th className="py-2.5 px-2 w-20 text-center text-slate-600 bg-slate-100/50">N/O</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pauta.antecedentesPedagogicos.map((ind, index) => (
                <tr key={ind.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-4 text-center font-bold text-slate-400">
                    {index + 1}
                  </td>
                  <td className="py-2.5 px-4 text-slate-800 leading-relaxed font-medium">
                    {ind.texto}
                  </td>
                  {(['1', '2', '3', 'N/O'] as EscalaObservacion[]).map(val => (
                    <td key={val} className="py-2.5 px-2 text-center">
                      <button
                        type="button"
                        onClick={() => handlePedagogicoChange(ind.id, val)}
                        className={`w-7 h-7 rounded-md font-bold text-xs transition flex items-center justify-center mx-auto ${
                          ind.valor === val
                            ? val === '3'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : val === '2'
                              ? 'bg-amber-500 text-white shadow-xs'
                              : val === '1'
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'bg-slate-700 text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                        }`}
                      >
                        {ind.valor === val ? '✓' : ''}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabla 2: Antecedentes Sociales y Comunicativos */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="bg-teal-700 text-white px-4 md:px-5 py-3 flex items-center justify-between">
          <h3 className="font-bold text-xs md:text-sm">2. Antecedentes Sociales y Comunicativos (10 Indicadores)</h3>
          <span className="text-[11px] text-teal-100 hidden sm:inline">Interacción con pares y adultos</span>
        </div>

        {/* MOBILE VIEW: Touch Cards */}
        <div className="md:hidden p-3 space-y-3">
          {pauta.antecedentesSocialesComunicativos.map((ind, index) => (
            <div key={ind.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-md bg-teal-100 text-teal-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  #{index + 1}
                </span>
                <p className="text-xs font-medium text-slate-800 leading-relaxed">
                  {ind.texto}
                </p>
              </div>

              <div className="grid grid-cols-4 gap-1.5 pt-1">
                {(['1', '2', '3', 'N/O'] as EscalaObservacion[]).map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleSocialChange(ind.id, val)}
                    className={`py-2 px-1 rounded-lg font-bold text-xs transition flex flex-col items-center justify-center ${
                      ind.valor === val
                        ? val === '3'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : val === '2'
                          ? 'bg-amber-500 text-white shadow-xs'
                          : val === '1'
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'bg-slate-700 text-white shadow-xs'
                        : 'bg-white border border-slate-300 text-slate-700 active:bg-slate-100'
                    }`}
                  >
                    <span>{val}</span>
                    <span className="text-[9px] font-normal opacity-80">
                      {val === '1' ? 'Inicio' : val === '2' ? 'Desarr.' : val === '3' ? 'Logrado' : 'N/O'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP VIEW: Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4 w-12 text-center">N°</th>
                <th className="py-2.5 px-4">Indicador de Desempeño</th>
                <th className="py-2.5 px-2 w-20 text-center text-rose-700 bg-rose-50/50">1 (Inicio)</th>
                <th className="py-2.5 px-2 w-20 text-center text-amber-700 bg-amber-50/50">2 (Desarrollo)</th>
                <th className="py-2.5 px-2 w-20 text-center text-emerald-700 bg-emerald-50/50">3 (Logrado)</th>
                <th className="py-2.5 px-2 w-20 text-center text-slate-600 bg-slate-100/50">N/O</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pauta.antecedentesSocialesComunicativos.map((ind, index) => (
                <tr key={ind.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-4 text-center font-bold text-slate-400">
                    {index + 1}
                  </td>
                  <td className="py-2.5 px-4 text-slate-800 leading-relaxed font-medium">
                    {ind.texto}
                  </td>
                  {(['1', '2', '3', 'N/O'] as EscalaObservacion[]).map(val => (
                    <td key={val} className="py-2.5 px-2 text-center">
                      <button
                        type="button"
                        onClick={() => handleSocialChange(ind.id, val)}
                        className={`w-7 h-7 rounded-md font-bold text-xs transition flex items-center justify-center mx-auto ${
                          ind.valor === val
                            ? val === '3'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : val === '2'
                              ? 'bg-amber-500 text-white shadow-xs'
                              : val === '1'
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'bg-slate-700 text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                        }`}
                      >
                        {ind.valor === val ? '✓' : ''}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Docente de Aula Regular (Co-Docencia) */}
      <div className="bg-white p-4 md:p-5 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <UserCheck className="w-4 h-4 text-teal-600 shrink-0" />
          <h3 className="font-bold text-slate-900 text-xs md:text-sm">
            Identificación del Docente de Aula Regular que Emite el Informe (Co-Docencia)
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Nombre Completo</label>
            <input
              type="text"
              value={pauta.docenteAulaRegular.nombre}
              onChange={(e) => handleDocenteChange('nombre', e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Ej: María Elena Morales"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">RUT Docente</label>
            <input
              type="text"
              value={pauta.docenteAulaRegular.rut}
              onChange={(e) => handleDocenteChange('rut', e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Ej: 14.285.932-4"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Profesión / Asignatura</label>
            <input
              type="text"
              value={`${pauta.docenteAulaRegular.profesion} - ${pauta.docenteAulaRegular.asignatura}`}
              onChange={(e) => handleDocenteChange('profesion', e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Ej: Docente Lenguaje y Comunicación"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
