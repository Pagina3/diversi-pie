import React from 'react';
import { EstudiantePIE, InformePIE } from '../types/pie';
import { 
  Puzzle, 
  Calendar, 
  School, 
  Award, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Unlock,
  Building,
  GraduationCap
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
  const secciones = [
    { id: 'identificacion', label: 'I. Identificación', estado: 'Terminado', color: 'bg-emerald-500' },
    { id: 'motivo', label: 'II. Motivo', estado: 'Terminado', color: 'bg-emerald-500' },
    { id: 'antecedentes', label: 'III. Antecedentes', estado: 'Terminado', color: 'bg-emerald-500' },
    { id: 'evaluacion-cuantitativa', label: 'IV. Ev. Informal Diversi', estado: 'En proceso', color: 'bg-teal-500' },
    { id: 'analisis-cualitativo', label: 'IV. Análisis Cualitativo', estado: 'En proceso', color: 'bg-teal-500' },
    { id: 'sintesis', label: 'V. Síntesis', estado: 'Terminado', color: 'bg-emerald-500' },
    { id: 'sugerencias', label: 'VI. Sugerencias', estado: 'Terminado', color: 'bg-emerald-500' },
    { id: 'pauta-observacion', label: 'VII. Pauta Mineduc', estado: 'Terminado', color: 'bg-blue-500' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-6 mb-6">
      {/* Top Diversi Badge & Branding */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-3">
          <img 
            src="./logo-diversi.png" 
            alt="Diversi" 
            className="h-7 w-auto object-contain hidden sm:block"
            onError={(e) => {
              // fallback if logo fails
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
              Informe de evaluación psicopedagógica y evaluaciones informales (Colegio Ana María Janer)
            </p>
          </div>
        </div>

        {/* Free Unlocked Status */}
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl shrink-0">
          <Unlock className="w-4 h-4 text-emerald-600 shrink-0" />
          <div className="text-right">
            <span className="text-[11px] font-bold text-emerald-800 block leading-tight">
              Informe 100% Desbloqueado
            </span>
            <span className="text-[10px] text-emerald-600 block">
              Sin cobro de tokens ($2.150) • Libre
            </span>
          </div>
        </div>
      </div>

      {/* Main Student Card (Identical to Diversi app.diversi.cl) */}
      <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Avatar Circle with initials */}
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-teal-600 text-white font-black text-xl md:text-2xl flex items-center justify-center shadow-md shadow-teal-600/20 shrink-0">
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
          <span>Generar con IA Diversi</span>
        </button>
      </div>

      {/* Diversi Section Progress Stepper Tabs */}
      <div className="mt-5 pt-4 border-t border-slate-100 overflow-x-auto pb-1 scrollbar-none">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          Secciones del Informe Diversi (Haz clic para editar):
        </p>
        <div className="flex items-center gap-2 min-w-max">
          {secciones.map((sec) => (
            <button
              key={sec.id}
              onClick={() => onSelectTab(sec.id)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 border ${
                currentTab === sec.id
                  ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
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
