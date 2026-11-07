import React from 'react';
import { 
  Sparkles, 
  FileDown, 
  Printer, 
  Save, 
  Unlock, 
  Menu,
  Users
} from 'lucide-react';
import { EstudiantePIE, InformePIE } from '../types/pie';

interface NavbarProps {
  estudiante: EstudiantePIE;
  informe: InformePIE;
  onGenerarIA: () => void;
  onExportarDocx: () => void;
  onImprimir: () => void;
  onGuardar: () => void;
  onOpenMobileMenu: () => void;
  onOpenGestionEstudiantes: () => void;
  isSaving?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  estudiante,
  informe,
  onGenerarIA,
  onExportarDocx,
  onImprimir,
  onGuardar,
  onOpenMobileMenu,
  onOpenGestionEstudiantes,
  isSaving = false
}) => {
  const esDiversi = (estudiante.tipoEvaluacion || 'diversi') === 'diversi';

  return (
    <header className="bg-white border-b border-slate-200 px-3 md:px-6 py-2.5 md:h-16 flex flex-col md:flex-row md:items-center justify-between sticky top-0 z-30 shadow-xs gap-2.5">
      {/* Top Row: Hamburger + Student Identity */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* Mobile hamburger button */}
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            aria-label="Abrir menú de navegación"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium truncate">
              <span className="hidden sm:inline">Estudiante:</span>
              <span className="text-slate-900 font-bold truncate max-w-[150px] sm:max-w-none">
                {estudiante.nombreCompleto}
              </span>
              <button
                onClick={onOpenGestionEstudiantes}
                className="ml-1 text-[10px] text-teal-700 hover:text-teal-900 font-bold underline flex items-center gap-0.5"
              >
                <span>(Cambiar / Agregar)</span>
              </button>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
              <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full border ${
                esDiversi
                  ? 'bg-teal-50 text-teal-800 border-teal-300'
                  : 'bg-indigo-50 text-indigo-800 border-indigo-300'
              }`}>
                {esDiversi ? '🟢 Batería Diversi' : '🟣 Batería Tabulatest'}
              </span>
              <h1 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                {informe.periodo} PIE • {estudiante.curso}
              </h1>
              <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-semibold px-1.5 py-0.2 rounded-full">
                {estudiante.siglaDiagnostico}
              </span>
            </div>
          </div>
        </div>

        {/* Status pill (mobile compact) */}
        <div className="flex md:hidden items-center gap-1">
          <button
            onClick={onOpenGestionEstudiantes}
            className="p-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1"
          >
            <Users className="w-3.5 h-3.5 text-teal-600" />
            <span className="text-[10px]">+ Estudiantes</span>
          </button>
        </div>
      </div>

      {/* Center status button for desktop */}
      <div className="hidden lg:flex items-center gap-2">
        <button
          onClick={onOpenGestionEstudiantes}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs text-slate-700 font-bold transition"
        >
          <Users className="w-3.5 h-3.5 text-teal-600" />
          <span>Administrar Estudiantes ({esDiversi ? 'Diversi' : 'Tabulatest'})</span>
        </button>
      </div>

      {/* Action buttons (scroll horizontally or wrap cleanly on mobile) */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
        <button
          onClick={onGenerarIA}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-medium text-xs shadow-xs transition shrink-0"
          title="Generar redacción pedagógica y sugerencias DUA a partir de los puntajes"
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden sm:inline">Asistente IA</span>
          <span className="sm:hidden">IA</span>
        </button>

        <button
          onClick={onExportarDocx}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 font-medium text-xs transition shrink-0"
          title="Exportar a Word editable oficial"
        >
          <FileDown className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span className="hidden sm:inline">Descargar .DOCX</span>
          <span className="sm:hidden">.DOCX</span>
        </button>

        <button
          onClick={onImprimir}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200 font-medium text-xs transition shrink-0"
          title="Imprimir o Guardar como PDF oficial"
        >
          <Printer className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="hidden sm:inline">Imprimir / PDF</span>
          <span className="sm:hidden">PDF</span>
        </button>

        <button
          onClick={onGuardar}
          disabled={isSaving}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition shadow-xs shrink-0"
        >
          {isSaving ? (
            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save className="w-3.5 h-3.5 shrink-0" />
          )}
          <span>{isSaving ? 'Guardando...' : 'Guardar'}</span>
        </button>
      </div>
    </header>
  );
};
