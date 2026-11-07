import React from 'react';
import { InformePIE } from '../types/pie';
import { Target, CheckCircle2, AlertCircle, FileCheck } from 'lucide-react';

interface SectionSintesisProps {
  informe: InformePIE;
  onInformeChange: (i: InformePIE) => void;
}

export const SectionSintesis: React.FC<SectionSintesisProps> = ({
  informe,
  onInformeChange,
}) => {
  const handleSintesisChange = (campo: keyof typeof informe.sintesis, valor: string) => {
    onInformeChange({
      ...informe,
      sintesis: {
        ...informe.sintesis,
        [campo]: valor
      }
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <span className="bg-teal-100 text-teal-800 text-[11px] font-bold px-2 py-0.5 rounded uppercase">
          Sección V
        </span>
        <h2 className="text-base font-bold text-slate-900 mt-1">Síntesis Diagnóstica Integral</h2>
        <p className="text-xs text-slate-500">
          Resumen articulado de fortalezas, barreras identificadas, progresos acumulados y conclusión diagnóstica para el FUDEI / Mineduc.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            a) Síntesis: Habilidades Cognitivas y Comunicativas
          </label>
          <textarea
            rows={3}
            value={informe.sintesis.cognitivaYComunicativa}
            onChange={(e) => handleSintesisChange('cognitivaYComunicativa', e.target.value)}
            className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Fortalezas cognitivas clave y barreras prioritarias a intervenir..."
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            b) Síntesis: Habilidades Personales, Socioemocionales y de Aproximación al Aprendizaje
          </label>
          <textarea
            rows={3}
            value={informe.sintesis.socioemocionalYAproximacion}
            onChange={(e) => handleSintesisChange('socioemocionalYAproximacion', e.target.value)}
            className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Disposición hacia el aprendizaje, interacción social y recursos emocionales..."
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            c) Síntesis: Habilidades Motoras, de Autonomía y Sensoriales
          </label>
          <textarea
            rows={2}
            value={informe.sintesis.motoraAutonomiaYSensorial}
            onChange={(e) => handleSintesisChange('motoraAutonomiaYSensorial', e.target.value)}
            className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Nivel de autonomía y factores sensoriales a considerar..."
          />
        </div>

        <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-200">
          <label className="block text-xs font-bold text-teal-950 mb-1.5 flex items-center gap-1.5">
            <FileCheck className="w-4 h-4 text-teal-700" />
            <span>Conclusión Diagnóstica y Continuidad en el Programa PIE</span>
          </label>
          <textarea
            rows={4}
            value={informe.sintesis.conclusion}
            onChange={(e) => handleSintesisChange('conclusion', e.target.value)}
            className="w-full text-xs p-3 rounded-lg border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white"
            placeholder="Resolución final sobre la necesidad de apoyos especializados, tipo de adecuación curricular (PACI) y modalidad de atención..."
          />
        </div>
      </div>
    </div>
  );
};
