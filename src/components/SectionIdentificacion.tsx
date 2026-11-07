import React from 'react';
import { EstudiantePIE, InformePIE } from '../types/pie';
import { School, User, Calendar, Tag, ShieldCheck } from 'lucide-react';

interface SectionIdentificacionProps {
  estudiante: EstudiantePIE;
  informe: InformePIE;
  onEstudianteChange: (e: EstudiantePIE) => void;
  onInformeChange: (i: InformePIE) => void;
}

export const SectionIdentificacion: React.FC<SectionIdentificacionProps> = ({
  estudiante,
  informe,
  onEstudianteChange,
  onInformeChange
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <span className="bg-teal-100 text-teal-800 text-[11px] font-bold px-2 py-0.5 rounded uppercase">
            Sección I
          </span>
          <h2 className="text-base font-bold text-slate-900 mt-1">Identificación del Estudiante y Establecimiento</h2>
          <p className="text-xs text-slate-500">Datos institucionales y antecedentes generales para el informe formal Mineduc.</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 font-mono">RBD: {informe.rbd || "Sin registrar"}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre Completo de Identidad</label>
          <input
            type="text"
            value={estudiante.nombreCompleto}
            onChange={(e) => onEstudianteChange({ ...estudiante, nombreCompleto: e.target.value })}
            className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre Social (si aplica)</label>
          <input
            type="text"
            value={estudiante.nombreSocial}
            onChange={(e) => onEstudianteChange({ ...estudiante, nombreSocial: e.target.value })}
            className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">RUT Estudiante</label>
          <input
            type="text"
            value={estudiante.rut}
            onChange={(e) => onEstudianteChange({ ...estudiante, rut: e.target.value })}
            className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Fecha de Nacimiento</label>
            <input
              type="date"
              value={estudiante.fechaNacimiento}
              onChange={(e) => onEstudianteChange({ ...estudiante, fechaNacimiento: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Edad Actual</label>
            <input
              type="text"
              value={estudiante.edad}
              onChange={(e) => onEstudianteChange({ ...estudiante, edad: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Establecimiento Educacional</label>
          <input
            type="text"
            value={informe.establecimiento}
            onChange={(e) => onInformeChange({ ...informe, establecimiento: e.target.value })}
            className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Curso / Nivel</label>
            <input
              type="text"
              value={estudiante.curso}
              onChange={(e) => onEstudianteChange({ ...estudiante, curso: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Tipo de NEE</label>
            <select
              value={estudiante.tipoNEE}
              onChange={(e) => onEstudianteChange({ ...estudiante, tipoNEE: e.target.value as 'NEET' | 'NEEP' })}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold"
            >
              <option value="NEET">Transitoria (NEET)</option>
              <option value="NEEP">Permanente (NEEP)</option>
            </select>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">Diagnóstico Específico</label>
          <input
            type="text"
            value={estudiante.diagnostico}
            onChange={(e) => onEstudianteChange({ ...estudiante, diagnostico: e.target.value })}
            className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Ej: Trastorno de Déficit Atencional con Hiperactividad"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Fecha Emisión Diagnóstico</label>
          <input
            type="date"
            value={informe.fechaEmisionDiagnostico}
            onChange={(e) => onInformeChange({ ...informe, fechaEmisionDiagnostico: e.target.value })}
            className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Fecha del Informe</label>
          <input
            type="date"
            value={informe.fechaInforme}
            onChange={(e) => onInformeChange({ ...informe, fechaInforme: e.target.value })}
            className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
          />
        </div>
      </div>
    </div>
  );
};
