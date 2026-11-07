import React from 'react';
import { InformePIE } from '../types/pie';

interface SectionAntecedentesProps {
  informe: InformePIE;
  onInformeChange: (i: InformePIE) => void;
}

export const SectionAntecedentes: React.FC<SectionAntecedentesProps> = ({
  informe,
  onInformeChange,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <span className="bg-teal-100 text-teal-800 text-[11px] font-bold px-2 py-0.5 rounded uppercase">
          Sección III
        </span>
        <h2 className="text-base font-bold text-slate-900 mt-1">Antecedentes Relevantes de la Historia Escolar y Familiar</h2>
        <p className="text-xs text-slate-500">Historial educativo, adaptaciones previas, dinámica familiar y controles de salud.</p>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Historia Escolar y Trayectoria Académica
        </label>
        <textarea
          rows={5}
          value={informe.antecedentesHistoriaEscolar}
          onChange={(e) => onInformeChange({ ...informe, antecedentesHistoriaEscolar: e.target.value })}
          className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed"
          placeholder="Describa el ingreso al establecimiento, cursos repetidos, asistencia previa a programas de apoyo, permanencia en aula común..."
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Antecedentes Familiares, Sociales y de Salud
        </label>
        <textarea
          rows={4}
          value={informe.antecedentesSaludFamilia}
          onChange={(e) => onInformeChange({ ...informe, antecedentesSaludFamilia: e.target.value })}
          className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed"
          placeholder="Composición familiar, figuras significativas de apoyo, controles médicos vigentes (neurología, fonoaudiología, psicología), farmacoterapia si corresponde..."
        />
      </div>
    </div>
  );
};
