import React from 'react';
import { 
  FileText, 
  Folder, 
  BookOpen, 
  FileCheck2, 
  ShieldCheck,
  X,
  ClipboardList,
  Sparkles,
  LayoutDashboard
} from 'lucide-react';
import { EstudiantePIE } from '../types/pie';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  estudiantes: EstudiantePIE[];
  estudianteSeleccionado: EstudiantePIE;
  setEstudianteSeleccionado: (e: EstudiantePIE) => void;
  onOpenNormativa: () => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  estudiantes,
  estudianteSeleccionado,
  setEstudianteSeleccionado,
  onOpenNormativa,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const seccionesInformeDiversi = [
    { id: 'identificacion', label: 'I. Identificación', badge: 'Listo' },
    { id: 'motivo', label: 'II. Motivo de evaluación', badge: 'Listo' },
    { id: 'antecedentes', label: 'III. Historia escolar y familiar', badge: 'Listo' },
    { id: 'evaluacion-cuantitativa', label: 'IV. Ev. Informal Diversi (Puntajes)', badge: 'Activo' },
    { id: 'analisis-cualitativo', label: 'IV. Análisis cualitativo (Redacción)', badge: 'Activo' },
    { id: 'sintesis', label: 'V. Síntesis diagnóstica', badge: 'Listo' },
    { id: 'sugerencias', label: 'VI. Sugerencias y PACI', badge: 'Listo' },
    { id: 'pauta-observacion', label: 'VII. Pauta observación Mineduc', badge: 'Cartilla 4' },
  ];

  const handleTabClick = (tabId: string) => {
    setCurrentTab(tabId);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-sidebar text-slate-300 flex flex-col h-full border-r border-slate-800 shrink-0 select-none transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header with Official Diversi Logo */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="./logo-diversi-white.png" 
              alt="Diversi" 
              className="h-7 w-auto object-contain"
              onError={(e) => {
                // If image fails, show fallback badge
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white tracking-wide text-base">diversi</span>
                <span className="text-[10px] bg-teal-500/20 text-teal-300 px-1.5 py-0.5 rounded font-mono font-bold">PIE</span>
              </div>
              <p className="text-[10px] text-slate-400">Plataforma Académica Oficial</p>
            </div>
          </div>

          {/* Mobile close button */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Student Quick Switcher */}
        <div className="px-4 py-3 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1.5">
            <span>Estudiante en curso</span>
            <span className="text-[10px] text-teal-400 bg-teal-950/80 px-1.5 py-0.5 rounded border border-teal-800/60 font-bold">
              {estudianteSeleccionado.siglaDiagnostico}
            </span>
          </div>
          <select
            value={estudianteSeleccionado.id}
            onChange={(e) => {
              const found = estudiantes.find(st => st.id === e.target.value);
              if (found) {
                setEstudianteSeleccionado(found);
                setIsMobileOpen(false);
              }
            }}
            className="w-full bg-slate-800/90 text-white text-xs rounded-lg px-2.5 py-2 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium"
          >
            {estudiantes.map((st) => (
              <option key={st.id} value={st.id}>
                {st.nombreCompleto} ({st.curso})
              </option>
            ))}
          </select>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4 custom-scrollbar text-xs">
          {/* Main platforms switcher */}
          <div>
            <div className="px-2.5 mb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Plataformas & Vistas
            </div>
            <div className="space-y-1">
              {/* DIVERSI PRINCIPAL BUTTON */}
              <button
                onClick={() => handleTabClick('evaluacion-cuantitativa')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition-all ${
                  currentTab === 'evaluacion-cuantitativa' || currentTab === 'analisis-cualitativo' || currentTab === 'identificacion' || currentTab === 'motivo' || currentTab === 'antecedentes' || currentTab === 'sintesis' || currentTab === 'sugerencias' || currentTab === 'pauta-observacion'
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-900/40'
                    : 'hover:bg-slate-800/70 text-slate-200 bg-slate-900/40 border border-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard className="w-4 h-4 text-teal-300 shrink-0" />
                  <span className="text-left font-bold">Plataforma Diversi PIE</span>
                </div>
                <span className="text-[10px] bg-teal-400/20 text-teal-200 px-1.5 py-0.5 rounded font-mono">
                  Principal
                </span>
              </button>

              {/* TABULATEST BUTTON */}
              <button
                onClick={() => handleTabClick('tabulatest')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                  currentTab === 'tabulatest'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950/50'
                    : 'hover:bg-slate-800/70 text-slate-300 bg-slate-900/40 border border-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ClipboardList className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Módulo Tabulatest (R-3)</span>
                </div>
                <span className="text-[9px] bg-indigo-950 text-indigo-300 border border-indigo-700 px-1.5 py-0.5 rounded font-mono">
                  Nuevo
                </span>
              </button>

              {/* VISTA PREVIA Y DESCARGAS */}
              <button
                onClick={() => handleTabClick('vista-previa')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium transition-colors ${
                  currentTab === 'vista-previa'
                    ? 'bg-teal-500/15 text-teal-300 font-semibold border-l-2 border-teal-400'
                    : 'hover:bg-slate-800/60 text-slate-300'
                }`}
              >
                <FileCheck2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Vista Previa del Informe Word/PDF</span>
              </button>

              <button
                onClick={() => handleTabClick('carpeta')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium transition-colors ${
                  currentTab === 'carpeta'
                    ? 'bg-teal-500/15 text-teal-300 font-semibold border-l-2 border-teal-400'
                    : 'hover:bg-slate-800/60 text-slate-300'
                }`}
              >
                <Folder className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Carpeta del Estudiante (Expediente)</span>
              </button>

              <button
                onClick={() => handleTabClick('evaluaciones-banco')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium transition-colors ${
                  currentTab === 'evaluaciones-banco'
                    ? 'bg-teal-500/15 text-teal-300 font-semibold border-l-2 border-teal-400'
                    : 'hover:bg-slate-800/60 text-slate-300'
                }`}
              >
                <BookOpen className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Banco de Ev. Informales (PreK - 4°M)</span>
              </button>
            </div>
          </div>

          {/* Section: Informe Psicopedagógico Diversi (Desplegado) */}
          <div>
            <div className="px-2.5 mb-1.5 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <span>Secciones Diversi (Mineduc)</span>
              <span className="text-[10px] text-teal-400 font-mono">7 Pasos</span>
            </div>
            <div className="space-y-0.5">
              {seccionesInformeDiversi.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => handleTabClick(sec.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                    currentTab === sec.id
                      ? 'bg-teal-600/30 text-white font-bold border-l-2 border-teal-400'
                      : 'hover:bg-slate-800/50 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{sec.label}</span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0 font-mono">
                    {sec.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Cartillas Mineduc banner */}
          <div className="p-3 mx-1 rounded-xl bg-gradient-to-br from-slate-800/90 to-slate-800/40 border border-slate-700/60">
            <div className="flex items-center gap-2 mb-1 text-teal-300 font-medium text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Normativa Mineduc</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">
              Cartillas 1 a 5 actualizadas. Decretos 170 y 83 integrados sin cobro de tokens.
            </p>
            <button
              onClick={() => {
                onOpenNormativa();
                setIsMobileOpen(false);
              }}
              className="w-full text-center py-2 bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 rounded border border-teal-500/30 text-[11px] font-semibold transition"
            >
              Ver resumen de cartillas
            </button>
          </div>
        </div>

        {/* User profile footer with Francisca Lorena Tello Rojas */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5 truncate">
            <div className="w-8 h-8 rounded-full bg-teal-700 text-white font-bold flex items-center justify-center text-xs shrink-0">
              FL
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-white truncate" title="Francisca Lorena Tello Rojas">
                Francisca Lorena Tello Rojas
              </p>
              <p className="text-[10px] text-teal-400 font-mono truncate" title="RUT: 21.232.592-9">
                RUT: 21.232.592-9
              </p>
              <p className="text-[10px] text-slate-400 truncate" title="Profesora Diferencial mención Discapacidad Intelectual">
                Prof. Dif. Mención DI
              </p>
            </div>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400 shrink-0 ml-1" title="Sistema Activo" />
        </div>
      </aside>
    </>
  );
};
