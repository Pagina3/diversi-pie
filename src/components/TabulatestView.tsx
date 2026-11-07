import React, { useState } from 'react';
import { 
  ClipboardList, 
  CheckCircle2, 
  AlertCircle, 
  BarChart3, 
  BookOpen, 
  Sparkles, 
  Download,
  ArrowRight,
  Lightbulb,
  Check,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { BateriaEvaluacionInformal, EstudiantePIE } from '../types/pie';
import { bateriasTabulatestCatalogo } from '../data/defaultData';

interface TabulatestViewProps {
  bateriaActual: BateriaEvaluacionInformal;
  estudiante: EstudiantePIE;
  onCargarBateria: (bateria: BateriaEvaluacionInformal) => void;
  onGenerarAnalisis: () => void;
}

export const TabulatestView: React.FC<TabulatestViewProps> = ({
  bateriaActual,
  estudiante,
  onCargarBateria,
  onGenerarAnalisis,
}) => {
  const [subTab, setSubTab] = useState<'revision' | 'catalogo'>('revision');

  // Compute stats for current battery
  let totalIdeal = 0;
  let totalObtenido = 0;
  
  const areaStats = bateriaActual.areas.map(a => {
    let ideal = 0;
    let obt = 0;
    a.subareas.forEach(s => s.items.forEach(it => {
      ideal += it.ptjeIdeal;
      obt += it.ptjeObtenido;
    }));
    const pct = ideal > 0 ? Math.round((obt / ideal) * 100) : 0;
    totalIdeal += ideal;
    totalObtenido += obt;
    return {
      id: a.id,
      nombre: a.nombre,
      ideal,
      obt,
      pct,
      nivel: pct >= 70 ? 'Bueno / Logrado' : pct >= 40 ? 'Medio / En Desarrollo' : 'Por Desarrollar / Descendido'
    };
  });

  const pctGlobal = totalIdeal > 0 ? Math.round((totalObtenido / totalIdeal) * 100) : 0;

  // Identify descents (< 50%) for Tabulatest smart review
  const itemsDescendidos: { area: string; item: string; obtenido: number; ideal: number; pct: number }[] = [];
  bateriaActual.areas.forEach(a => {
    a.subareas.forEach(s => {
      s.items.forEach(it => {
        const pct = it.ptjeIdeal > 0 ? Math.round((it.ptjeObtenido / it.ptjeIdeal) * 100) : 0;
        if (pct < 50) {
          itemsDescendidos.push({
            area: a.nombre,
            item: it.nombre,
            obtenido: it.ptjeObtenido,
            ideal: it.ptjeIdeal,
            pct
          });
        }
      });
    });
  });

  return (
    <div className="space-y-5 md:space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 md:p-6 rounded-2xl shadow-md border border-indigo-900/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-[10px] md:text-[11px] font-bold px-2 py-0.5 rounded uppercase font-mono">
                Integración Tabulatest.cl
              </span>
              <span className="text-xs text-slate-300 font-medium">Baterías R-3 • Revisión & Corrección</span>
            </div>
            <h2 className="text-lg md:text-xl font-black text-white mt-1.5 tracking-tight">
              Módulo de Pruebas Informales y Corrección Tabulatest
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Herramienta de tabulación psicopedagógica inspirada en el estándar de <strong>tabulatest.cl</strong>. Permite aplicar pruebas informales modelo R-3, revisiones analíticas por área y sugerencias pedagógicas automatizadas.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setSubTab('revision')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                subTab === 'revision'
                  ? 'bg-teal-500 text-slate-950 shadow-sm'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Revisión y Gráficos</span>
            </button>
            <button
              onClick={() => setSubTab('catalogo')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                subTab === 'catalogo'
                  ? 'bg-teal-500 text-slate-950 shadow-sm'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Catálogo de Test (R-3)</span>
            </button>
          </div>
        </div>
      </div>

      {/* SUBTAB 1: REVISIÓN Y CORRECCIÓN ANALÍTICA */}
      {subTab === 'revision' && (
        <div className="space-y-5">
          {/* Summary Dashboard Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Evaluación Activa</p>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5 truncate max-w-[200px]">
                  {bateriaActual.nombre}
                </h4>
                <p className="text-xs text-slate-500">Nivel: {bateriaActual.cursoNivel}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold shrink-0">
                <ClipboardList className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Puntaje Global Tabulado</p>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-2xl font-black text-slate-900">{totalObtenido}</span>
                  <span className="text-xs text-slate-400">/ {totalIdeal} pts</span>
                </div>
                <p className="text-xs text-emerald-600 font-semibold">{pctGlobal}% Logro Total</p>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                pctGlobal >= 70 ? 'bg-emerald-100 text-emerald-800' : pctGlobal >= 40 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {pctGlobal}%
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Ítems Descendidos (&lt;50%)</p>
                <h4 className="text-2xl font-black text-rose-600 mt-0.5">
                  {itemsDescendidos.length} <span className="text-xs font-normal text-slate-500">habilidades</span>
                </h4>
                <p className="text-xs text-slate-500">Requieren foco en PACI / DUA</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Gráfico Analítico de Rendimiento por Área (Estilo Tabulatest) */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Gráfico de Rendimiento por Área Evaluada (Perfil de Logro)
                </h3>
                <p className="text-xs text-slate-500">
                  Tabulación porcentual calculada según los criterios de corrección de Tabulatest y MINEDUC.
                </p>
              </div>
              <button
                onClick={onGenerarAnalisis}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Vincular con Informe</span>
              </button>
            </div>

            <div className="space-y-4 pt-1">
              {areaStats.map((st) => (
                <div key={st.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{st.nombre}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-mono text-[11px]">{st.obt} / {st.ideal} pts</span>
                      <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                        st.pct >= 70 ? 'bg-emerald-100 text-emerald-800' : st.pct >= 40 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {st.pct}% ({st.nivel})
                      </span>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        st.pct >= 70 ? 'bg-emerald-500' : st.pct >= 40 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${Math.max(4, st.pct)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Panel de Revisión de Ítems Descendidos y Sugerencias Tabulatest */}
          {itemsDescendidos.length > 0 && (
            <div className="bg-white p-5 rounded-xl border border-rose-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-rose-700">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <h3 className="font-bold text-sm">
                  Revisión Psicopedagógica: Habilidades con Desempeño Descendido
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Según la pauta de corrección de Tabulatest, los siguientes ítems se sitúan bajo el 50% de logro y representan las principales <strong>barreras al aprendizaje</strong> que deben ser abordadas en el PACI:
              </p>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
                {itemsDescendidos.map((it, idx) => (
                  <div key={idx} className="p-3 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">{it.area}</span>
                      <span className="font-bold text-slate-800">{it.item}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono text-slate-600">{it.obtenido} / {it.ideal} pts</span>
                      <span className="px-2 py-0.5 rounded font-black text-rose-700 bg-rose-100 text-[10px]">
                        {it.pct}% Logro
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 2: CATÁLOGO DE PRUEBAS INFORMALES TABULATEST */}
      {subTab === 'catalogo' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
            Selecciona cualquiera de las pruebas informales del catálogo de <strong>Tabulatest (R-3)</strong> para aplicarla al estudiante actual. Se sustituirán los ítems de evaluación en el tabulador para registrar puntajes y generar los pre-informes.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bateriasTabulatestCatalogo.map((bat) => {
              const isSelected = bateriaActual.id === bat.id;
              let bIdeal = 0;
              let itemsCount = 0;
              bat.areas.forEach(a => a.subareas.forEach(s => {
                itemsCount += s.items.length;
                s.items.forEach(it => bIdeal += it.ptjeIdeal);
              }));

              return (
                <div
                  key={bat.id}
                  className={`p-5 rounded-xl border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-indigo-50/60 border-indigo-500 ring-1 ring-indigo-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                        {bat.cursoNivel} • {itemsCount} ítems
                      </span>
                      {isSelected && (
                        <span className="text-xs text-indigo-700 font-bold flex items-center gap-1">
                          <Check className="w-4 h-4" /> Batería en Uso
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">{bat.nombre}</h3>
                    <p className="text-xs text-slate-500 mb-3">
                      Puntaje máximo ideal: <strong>{bIdeal} pts</strong> divididos en {bat.areas.length} áreas principales.
                    </p>

                    <div className="space-y-1 mb-4">
                      <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Dimensiones Evaluadas:</p>
                      <div className="flex flex-wrap gap-1">
                        {bat.areas.map(a => (
                          <span key={a.id} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                            {a.nombre}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-mono">Modelo Tabulatest R-3</span>
                    <button
                      onClick={() => onCargarBateria(bat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-indigo-700 text-white'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      <span>{isSelected ? 'Cargada' : 'Cargar en el informe'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
