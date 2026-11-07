import React from 'react';
import { EstudiantePIE, InformePIE } from '../types/pie';
import { 
  Puzzle, 
  Calendar, 
  School, 
  Sparkles,
  Unlock,
  GraduationCap,
  ClipboardCheck
} from 'lucide-react';

interface DiversiStudentBannerProps {
  estudiante: EstudiantePIE;
  informe: InformePIE;
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onGenerarIA: () => void;
}

export const DiversiStudentBanner: React.FC<DiversiStudentBannerProps> = ({
  estudiante,
  informe,
  currentTab,
  onSelectTab,
  onGenerarIA,
}) => {
  const esDiversi = (estudiante.tipoEvaluacion || 'diversi') === 'diversi';

  const secciones = [
    { id: 'identificacion', label: 'I. Identificación', estado: 'Terminado', color: 'bg-emerald-500' },
    { id: 'motivo', label: 'II. Motivo', estado: 'Terminado', color: 'bg-emerald-500' },
    { id: 'antecedentes', label: 'III. Antecedentes', estado: 'Terminado', color: 'bg-emerald-500' },
    { id: 'evaluacion-cuantitativa', label: esDiversi ? 'IV. Ev. Informal Diversi' : 'IV. Ev. Informal Tabulatest', estado: 'En proceso', color: esDiversi ? 'bg-teal-500' : 'bg-indigo-500' },
    { id: 'analisis-cualitativo', label: 'IV. Análisis Cualitativo', estado: 'En proceso', color: 'bg-teal-500' },
    { id: 'sintesis', label: 'V. Síntesis', estado: 'Terminado', color: 'bg-emerald-500' },
    { id: 'sugerencias', label: 'VI. Sugerencias', estado: 'Terminado', color: 'bg-emerald-500' },
    { id: 'pauta-observacion', label: 'VII. Pauta Mineduc', estado: 'Terminado', color: 'bg-blue-500' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 md:p-6 mb-5">
      {/* Top Diversi Badge & Branding */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-3">
          <img 
            src="./logo-diversi.png" 
            alt="Diversi" 
            className="h-7 w-auto object-contain hidden sm:block"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm md:text-base">
                Plataforma Académica + PIE | Diversi
              </span>
              <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase font-mono">
                Formato Mineduc
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Informe de evaluación psicopedagógica y evaluaciones informales ({informe.establecimiento})
            </p>
          </div>
        </div>

        {/* Free Unlocked Status & Exclusive Battery Pill */}
        <div className="flex items-center gap-2">
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border flex items-center gap-1.5 ${
            esDiversi
              ? 'bg-teal-50 text-teal-800 border-teal-300'
              : 'bg-indigo-50 text-indigo-800 border-indigo-300'
          }`}>
            <ClipboardCheck className="w-3.5 h-3.5" />
            <span>{esDiversi ? 'Batería Asignada: Diversi' : 'Batería Asignada: Tabulatest R-3'}</span>
          </span>

          <div className="hidden sm:flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-xl shrink-0">
            <Unlock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="text-[10px] font-bold text-emerald-800">
              Gratis y Libre
            </span>
          </div>
        </div>
      </div>

      {/* Main Student Card (Identical to Diversi app.diversi.cl) */}
      <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Avatar Circle with initials */}
          <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl text-white font-black text-xl md:text-2xl flex items-center justify-center shadow-md shrink-0 ${
            esDiversi ? 'bg-teal-600 shadow-teal-600/20' : 'bg-indigo-600 shadow-indigo-600/20'
          }`}>
            {estudiante.nombreCompleto.split(' ').map(n => n[0]).slice(0, 2).join('')}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base md:text-lg font-bold text-slate-900">
                {estudiante.nombreCompleto}
              </h2>
              <span className="bg-amber-100 text-amber-800 border border-amber-300 text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                <Puzzle className="w-3.5 h-3.5 text-amber-700" />
                {estudiante.siglaDiagnostico}
              </span>
              <span className="bg-slate-100 text-slate-700 text-[11px] font-mono px-2 py-0.5 rounded-md font-semibold">
                RUT: {estudiante.rut}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 mt-1 font-medium">
              <span className="flex items-center gap-1 text-slate-700">
                <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                <strong>{estudiante.curso}</strong>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-700">
                <School className="w-3.5 h-3.5 text-slate-400" />
                {informe.establecimiento}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-700">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Edad: {estudiante.edad}
              </span>
            </div>
            
            <p className="text-xs text-slate-500 mt-1">
              <strong>Diagnóstico:</strong> {estudiante.diagnostico} ({estudiante.tipoNEE})
            </p>
          </div>
        </div>

        {/* Quick action: IA Redactar */}
        <button
          onClick={onGenerarIA}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generar con IA</span>
        </button>
      </div>

      {/* Diversi Section Progress Stepper Tabs */}
      <div className="mt-5 pt-4 border-t border-slate-100 overflow-x-auto pb-1 scrollbar-none">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          Secciones del Informe (Haz clic para editar):
        </p>
        <div className="flex items-center gap-2 min-w-max">
          {secciones.map((sec) => (
            <button
              key={sec.id}
              onClick={() => onSelectTab(sec.id)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 border ${
                currentTab === sec.id
                  ? esDiversi
                    ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                    : 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${
                currentTab === sec.id ? 'bg-white' : sec.color
              }`} />
              <span>{sec.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
