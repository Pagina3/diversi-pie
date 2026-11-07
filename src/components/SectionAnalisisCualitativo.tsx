import React from 'react';
import { InformePIE, EstudiantePIE } from '../types/pie';
import { Sparkles, Brain, HeartHandshake, Activity } from 'lucide-react';

interface SectionAnalisisCualitativoProps {
  estudiante: EstudiantePIE;
  informe: InformePIE;
  onInformeChange: (i: InformePIE) => void;
  onGenerarIA: () => void;
}

export const SectionAnalisisCualitativo: React.FC<SectionAnalisisCualitativoProps> = ({
  estudiante,
  informe,
  onInformeChange,
  onGenerarIA,
}) => {
  const handleAreaChange = (campo: keyof typeof informe.analisisCualitativo, valor: string) => {
    onInformeChange({
      ...informe,
      analisisCualitativo: {
        ...informe.analisisCualitativo,
        [campo]: valor
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="bg-teal-100 text-teal-800 text-[11px] font-bold px-2 py-0.5 rounded uppercase">
            Sección IV
          </span>
          <h2 className="text-base font-bold text-slate-900 mt-1">Análisis Cualitativo de Instrumentos Aplicados</h2>
          <p className="text-xs text-slate-500">
            Descripción clínica y pedagógica articulada en las 3 dimensiones normativas exigidas por la Cartilla 4 MINEDUC.
          </p>
        </div>
        <button
          onClick={onGenerarIA}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generar Redacción Asistida</span>
        </button>
      </div>

      {/* Dimensión A: Cognitiva y Comunicativa */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs border border-teal-200">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              a) Habilidades Cognitivas y Comunicativas
            </h3>
            <p className="text-[11px] text-slate-500">
              Atención y concentración, memoria, funciones ejecutivas, razonamiento lógico, lenguaje oral y escrito, comprensión lectora, expresión escrita y habilidades adaptativas.
            </p>
          </div>
        </div>
        <textarea
          rows={6}
          value={informe.analisisCualitativo.cognitivaYComunicativa}
          onChange={(e) => handleAreaChange('cognitivaYComunicativa', e.target.value)}
          className="w-full text-xs p-3.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed font-sans"
          placeholder="Escriba el análisis cualitativo del desempeño cognitivo y comunicativo..."
        />
      </div>

      {/* Dimensión B: Socioemocional y Aproximación al Aprendizaje */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs border border-indigo-200">
            <HeartHandshake className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              b) Habilidades Personales, Socioemocionales y de Aproximación al Aprendizaje
            </h3>
            <p className="text-[11px] text-slate-500">
              Autoestima, autorregulación emocional, tolerancia a la frustración, trabajo cooperativo, resolución de conflictos, persistencia y flexibilidad cognitiva.
            </p>
          </div>
        </div>
        <textarea
          rows={5}
          value={informe.analisisCualitativo.socioemocionalYAproximacion}
          onChange={(e) => handleAreaChange('socioemocionalYAproximacion', e.target.value)}
          className="w-full text-xs p-3.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed font-sans"
          placeholder="Escriba el análisis cualitativo del área socioemocional..."
        />
      </div>

      {/* Dimensión C: Motoras, de Autonomía y Sensoriales */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs border border-amber-200">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              c) Habilidades Motoras, de Autonomía y Sensoriales
            </h3>
            <p className="text-[11px] text-slate-500">
              Motricidad gruesa, motricidad fina, autonomía funcional, cuidado personal, rutinas y capacidades sensoperceptivas.
            </p>
          </div>
        </div>
        <textarea
          rows={4}
          value={informe.analisisCualitativo.motoraAutonomiaYSensorial}
          onChange={(e) => handleAreaChange('motoraAutonomiaYSensorial', e.target.value)}
          className="w-full text-xs p-3.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed font-sans"
          placeholder="Escriba el análisis cualitativo de la motricidad, autonomía y sentidos..."
        />
      </div>
    </div>
  );
};
