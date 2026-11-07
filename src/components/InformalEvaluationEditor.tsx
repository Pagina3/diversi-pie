import React from 'react';
import { 
  Sparkles,
  Minus,
  Plus
} from 'lucide-react';
import { BateriaEvaluacionInformal } from '../types/pie';

interface InformalEvaluationEditorProps {
  bateria: BateriaEvaluacionInformal;
  onChange: (bateriaActualizada: BateriaEvaluacionInformal) => void;
  onGenerarAnalisis: () => void;
}

export const InformalEvaluationEditor: React.FC<InformalEvaluationEditorProps> = ({
  bateria,
  onChange,
  onGenerarAnalisis,
}) => {
  // Update item score
  const handleScoreChange = (areaId: string, subareaId: string, itemId: string, nuevoPtje: number) => {
    const nuevaBateria = { ...bateria };
    nuevaBateria.areas = nuevaBateria.areas.map(area => {
      if (area.id !== areaId) return area;
      return {
        ...area,
        subareas: area.subareas.map(sub => {
          if (sub.id !== subareaId) return sub;
          return {
            ...sub,
            items: sub.items.map(item => {
              if (item.id !== itemId) return item;
              const safePtje = Math.max(0, Math.min(item.ptjeIdeal, nuevoPtje));
              return { ...item, ptjeObtenido: safePtje };
            })
          };
        })
      };
    });
    onChange(nuevaBateria);
  };

  // Compute overall stats
  let totalIdeal = 0;
  let totalObtenido = 0;
  bateria.areas.forEach(a => {
    a.subareas.forEach(s => {
      s.items.forEach(it => {
        totalIdeal += it.ptjeIdeal;
        totalObtenido += it.ptjeObtenido;
      });
    });
  });
  const porcentajeGlobal = totalIdeal > 0 ? Math.round((totalObtenido / totalIdeal) * 100) : 0;

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-4 md:p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-teal-100 text-teal-800 text-[10px] md:text-[11px] font-bold px-2 py-0.5 rounded uppercase">
              Tabulación Cuantitativa
            </span>
            <span className="text-xs text-slate-500 font-medium">Nivel: {bateria.cursoNivel}</span>
          </div>
          <h2 className="text-base md:text-lg font-bold text-slate-900 mt-1">
            {bateria.nombre}
          </h2>
          <p className="text-xs text-slate-500 max-w-xl hidden sm:block">
            Ingresa o ajusta los puntajes obtenidos por el estudiante. El sistema calcula automáticamente el porcentaje de logro y el nivel de desempeño conforme a las cartillas MINEDUC.
          </p>
        </div>

        {/* Global Score Card */}
        <div className="flex items-center justify-between sm:justify-start gap-3 md:gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200 shrink-0">
          <div>
            <p className="text-[10px] md:text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Puntaje</p>
            <p className="text-lg md:text-xl font-black text-slate-900">
              {totalObtenido} <span className="text-xs font-normal text-slate-400">/{totalIdeal}</span>
            </p>
          </div>
          <div className="w-px h-8 md:h-10 bg-slate-200" />
          <div className="text-right">
            <p className="text-[10px] md:text-[11px] uppercase tracking-wider text-slate-400 font-semibold">% Logro</p>
            <span className={`text-lg md:text-xl font-black ${
              porcentajeGlobal >= 70 ? 'text-emerald-600' : porcentajeGlobal >= 40 ? 'text-amber-600' : 'text-rose-600'
            }`}>
              {porcentajeGlobal}%
            </span>
          </div>
          <button
            onClick={onGenerarAnalisis}
            className="flex items-center gap-1.5 px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold shadow-xs transition shrink-0 ml-1"
            title="Redactar análisis cualitativo automáticamente"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Generar Redacción</span>
            <span className="sm:hidden">Redactar</span>
          </button>
        </div>
      </div>

      {/* Areas & Subareas */}
      {bateria.areas.map((area) => {
        let areaIdeal = 0;
        let areaObt = 0;
        area.subareas.forEach(s => s.items.forEach(it => {
          areaIdeal += it.ptjeIdeal;
          areaObt += it.ptjeObtenido;
        }));
        const areaPct = areaIdeal > 0 ? Math.round((areaObt / areaIdeal) * 100) : 0;

        return (
          <div key={area.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            {/* Area Header */}
            <div className="bg-slate-50/80 px-4 md:px-5 py-3 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500 shrink-0" />
                <h3 className="font-bold text-slate-800 text-xs md:text-sm">{area.nombre}</h3>
              </div>
              <div className="flex items-center gap-2 md:gap-3 text-xs">
                <span className="text-slate-500 font-medium hidden sm:inline">
                  {areaObt} de {areaIdeal} pts
                </span>
                <span className={`font-bold px-2 py-0.5 rounded text-[10px] md:text-[11px] ${
                  areaPct >= 70 ? 'bg-emerald-100 text-emerald-800' : areaPct >= 40 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {areaPct}% ({areaPct >= 70 ? 'Bueno' : areaPct >= 40 ? 'Medio' : 'Por desarrollar'})
                </span>
              </div>
            </div>

            {/* Subareas */}
            <div className="divide-y divide-slate-100">
              {area.subareas.map((subarea) => (
                <div key={subarea.id} className="p-3 md:p-4">
                  <div className="text-[11px] md:text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                    {subarea.nombre}
                  </div>
                  
                  {/* MOBILE VIEW: Touch-Friendly Responsive Cards */}
                  <div className="md:hidden space-y-2.5">
                    {subarea.items.map((item) => {
                      const pct = item.ptjeIdeal > 0 ? Math.round((item.ptjeObtenido / item.ptjeIdeal) * 100) : 0;
                      const nivel = pct >= 70 ? "Bueno" : pct >= 40 ? "Medio" : "Por desarrollar";

                      return (
                        <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-1.5">
                              <span className="w-5 h-5 rounded-md bg-teal-100 text-teal-800 font-bold text-[10px] flex items-center justify-center shrink-0">
                                #{item.numero}
                              </span>
                              <span className="text-xs font-semibold text-slate-800 leading-tight">
                                {item.nombre}
                              </span>
                            </div>
                            <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              pct >= 70 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : pct >= 40 
                                ? 'bg-amber-100 text-amber-800' 
                                : 'bg-rose-100 text-rose-800'
                            }`}>
                              {nivel}
                            </span>
                          </div>

                          {/* Stepper & Progress */}
                          <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleScoreChange(area.id, subarea.id, item.id, item.ptjeObtenido - 1)}
                                disabled={item.ptjeObtenido <= 0}
                                className="w-8 h-8 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-slate-700 active:bg-slate-200 disabled:opacity-30 disabled:pointer-events-none"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              
                              <input
                                type="number"
                                min="0"
                                max={item.ptjeIdeal}
                                value={item.ptjeObtenido}
                                onChange={(e) => handleScoreChange(area.id, subarea.id, item.id, Number(e.target.value))}
                                className="w-12 h-8 text-center font-bold font-mono text-xs rounded-lg border border-slate-300 bg-white"
                              />

                              <button
                                type="button"
                                onClick={() => handleScoreChange(area.id, subarea.id, item.id, item.ptjeObtenido + 1)}
                                disabled={item.ptjeObtenido >= item.ptjeIdeal}
                                className="w-8 h-8 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-slate-700 active:bg-slate-200 disabled:opacity-30 disabled:pointer-events-none"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                              
                              <span className="text-[11px] text-slate-500 font-mono ml-1">
                                de {item.ptjeIdeal} pts
                              </span>
                            </div>

                            <div className="text-right">
                              <span className="text-xs font-black font-mono text-slate-700">{pct}%</span>
                              <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden mt-0.5">
                                <div 
                                  className={`h-full rounded-full ${
                                    pct >= 70 ? 'bg-emerald-500' : pct >= 40 ? 'bg-amber-500' : 'bg-rose-500'
                                  }`}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* DESKTOP VIEW: Full Structured Table */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 text-slate-600 font-semibold border-y border-slate-200">
                        <tr>
                          <th className="py-2 px-3 w-12 text-center">Ítem</th>
                          <th className="py-2 px-3">Habilidad / Contenido Evaluado</th>
                          <th className="py-2 px-3 w-28 text-center">Ptje. Ideal</th>
                          <th className="py-2 px-3 w-32 text-center">Ptje. Obtenido</th>
                          <th className="py-2 px-3 w-28 text-center">% Logro</th>
                          <th className="py-2 px-3 w-32 text-center">Nivel</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {subarea.items.map((item) => {
                          const pct = item.ptjeIdeal > 0 ? Math.round((item.ptjeObtenido / item.ptjeIdeal) * 100) : 0;
                          const nivel = pct >= 70 ? "Bueno" : pct >= 40 ? "Medio" : "Por desarrollar";
                          
                          return (
                            <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                              <td className="py-2 px-3 text-center font-bold text-slate-400">
                                {item.numero}
                              </td>
                              <td className="py-2 px-3 text-slate-800 font-medium">
                                {item.nombre}
                              </td>
                              <td className="py-2 px-3 text-center text-slate-500 font-mono">
                                {item.ptjeIdeal}
                              </td>
                              <td className="py-2 px-3 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  <input
                                    type="number"
                                    min="0"
                                    max={item.ptjeIdeal}
                                    value={item.ptjeObtenido}
                                    onChange={(e) => handleScoreChange(area.id, subarea.id, item.id, Number(e.target.value))}
                                    className="w-16 text-center font-bold font-mono py-1 px-1.5 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-xs"
                                  />
                                  <span className="text-[11px] text-slate-400 font-mono">/{item.ptjeIdeal}</span>
                                </div>
                              </td>
                              <td className="py-2 px-3 text-center">
                                <div className="flex flex-col items-center">
                                  <span className="font-bold font-mono">{pct}%</span>
                                  <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden mt-1">
                                    <div 
                                      className={`h-full rounded-full ${
                                        pct >= 70 ? 'bg-emerald-500' : pct >= 40 ? 'bg-amber-500' : 'bg-rose-500'
                                      }`}
                                      style={{ width: `${pct}%` }}
                                    />
                                  </div>
                                </div>
                              </td>
                              <td className="py-2 px-3 text-center">
                                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                                  pct >= 70 
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                    : pct >= 40 
                                    ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                                }`}>
                                  {nivel}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
