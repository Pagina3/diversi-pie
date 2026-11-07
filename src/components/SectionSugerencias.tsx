import React from 'react';
import { InformePIE } from '../types/pie';
import { Lightbulb, Building2, Users2, User, Home, ShieldAlert, Award } from 'lucide-react';

interface SectionSugerenciasProps {
  informe: InformePIE;
  onInformeChange: (i: InformePIE) => void;
}

export const SectionSugerencias: React.FC<SectionSugerenciasProps> = ({
  informe,
  onInformeChange,
}) => {
  const handleSugerenciaChange = (campo: keyof typeof informe.sugerencias, valor: string) => {
    onInformeChange({
      ...informe,
      sugerencias: {
        ...informe.sugerencias,
        [campo]: valor
      }
    });
  };

  const handleProfesionalChange = (campo: keyof typeof informe.profesional, valor: string) => {
    onInformeChange({
      ...informe,
      profesional: {
        ...informe.profesional,
        [campo]: valor
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <span className="bg-teal-100 text-teal-800 text-[11px] font-bold px-2 py-0.5 rounded uppercase">
            Sección VI
          </span>
          <h2 className="text-base font-bold text-slate-900 mt-1">Sugerencias Pedagógicas y Plan de Apoyo (PACI / DUA)</h2>
          <p className="text-xs text-slate-500">
            Orientaciones diversificadas dirigidas a los distintos actores del proceso educativo en el marco del Decreto 83.
          </p>
        </div>

        <div className="space-y-4">
          {/* 1. Al establecimiento */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 mb-2 font-bold text-xs text-slate-800">
              <Building2 className="w-4 h-4 text-teal-600" />
              <span>1.- Al Establecimiento Educacional</span>
            </div>
            <textarea
              rows={2}
              value={informe.sugerencias.alEstablecimiento}
              onChange={(e) => handleSugerenciaChange('alEstablecimiento', e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            />
          </div>

          {/* 2. Al equipo de aula */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 mb-2 font-bold text-xs text-slate-800">
              <Users2 className="w-4 h-4 text-teal-600" />
              <span>2.- Al Equipo de Aula (Co-docencia, DUA y Adecuaciones)</span>
            </div>
            <textarea
              rows={4}
              value={informe.sugerencias.alEquipoAula}
              onChange={(e) => handleSugerenciaChange('alEquipoAula', e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white font-mono"
            />
          </div>

          {/* 3. Al estudiante */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 mb-2 font-bold text-xs text-slate-800">
              <User className="w-4 h-4 text-teal-600" />
              <span>3.- Al Estudiante (Estrategias metacognitivas y hábitos)</span>
            </div>
            <textarea
              rows={3}
              value={informe.sugerencias.alEstudiante}
              onChange={(e) => handleSugerenciaChange('alEstudiante', e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            />
          </div>

          {/* 4. A la familia */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 mb-2 font-bold text-xs text-slate-800">
              <Home className="w-4 h-4 text-teal-600" />
              <span>4.- A la Familia (Apoyos en el hogar y rutinas)</span>
            </div>
            <textarea
              rows={3}
              value={informe.sugerencias.aLaFamilia}
              onChange={(e) => handleSugerenciaChange('aLaFamilia', e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            />
          </div>

          {/* 5. Otros */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 mb-2 font-bold text-xs text-slate-800">
              <ShieldAlert className="w-4 h-4 text-teal-600" />
              <span>5.- Otros (Interconsultas y profesionales de la salud)</span>
            </div>
            <textarea
              rows={2}
              value={informe.sugerencias.otros}
              onChange={(e) => handleSugerenciaChange('otros', e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            />
          </div>
        </div>
      </div>

      {/* Identificación del profesional emisor */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-teal-600" />
          <h3 className="font-bold text-sm text-slate-900">
            Identificación del Profesional que Emite el Informe (Firma Oficial)
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Nombre Completo</label>
            <input
              type="text"
              value={informe.profesional.nombre}
              onChange={(e) => handleProfesionalChange('nombre', e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">RUT Profesional</label>
            <input
              type="text"
              value={informe.profesional.rut}
              onChange={(e) => handleProfesionalChange('rut', e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Profesión</label>
            <input
              type="text"
              value={informe.profesional.profesion}
              onChange={(e) => handleProfesionalChange('profesion', e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">N° de Registro SECREDUC / Mineduc</label>
            <input
              type="text"
              value={informe.profesional.registroMineduc}
              onChange={(e) => handleProfesionalChange('registroMineduc', e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
