import React from 'react';
import { EstudiantePIE, InformePIE } from '../types/pie';
import { 
  Folder, 
  FileText, 
  FileCheck2, 
  ShieldCheck, 
  Download, 
  Upload, 
  User, 
  Phone, 
  Calendar,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface StudentFolderViewProps {
  estudiante: EstudiantePIE;
  informe: InformePIE;
  onGoToInforme: () => void;
}

export const StudentFolderView: React.FC<StudentFolderViewProps> = ({
  estudiante,
  informe,
  onGoToInforme,
}) => {
  const documentosExpediente = [
    {
      id: 'doc-1',
      titulo: 'FUDEI (Formulario Único de Evaluación Integral)',
      estado: 'Completado',
      fecha: '2026-03-15',
      tipo: 'Ministerial Obligatorio',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      id: 'doc-2',
      titulo: 'Informe de Evaluación Psicopedagógica (Mineduc)',
      estado: informe.estado,
      fecha: informe.fechaInforme,
      tipo: 'Cartilla 4 MINEDUC',
      color: 'bg-teal-50 text-teal-700 border-teal-200',
      action: onGoToInforme
    },
    {
      id: 'doc-3',
      titulo: 'Pauta de Observación Pedagógica en Aula Común',
      estado: 'Completado',
      fecha: informe.fechaInforme,
      tipo: 'Co-Docencia Cartilla 4',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      action: onGoToInforme
    },
    {
      id: 'doc-4',
      titulo: 'Consentimiento Informado de la Familia / Apoderado',
      estado: 'Firmado y Archivado',
      fecha: '2026-03-10',
      tipo: 'Cartilla 5 MINEDUC',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      id: 'doc-5',
      titulo: 'Evaluación Médica / Neurológica de Ingreso o Control',
      estado: 'Vigente',
      fecha: '2025-03-12',
      tipo: 'Médico Especialista',
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      id: 'doc-6',
      titulo: 'PACI (Plan de Adecuación Curricular Individual)',
      estado: 'En ejecución',
      fecha: '2026-04-02',
      tipo: 'Decreto 83',
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      id: 'doc-7',
      titulo: 'Registro de Planificación y Co-Docencia de Aula',
      estado: 'Al día',
      fecha: '2026-11-02',
      tipo: 'Libro Co-Docencia',
      color: 'bg-slate-50 text-slate-700 border-slate-200'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Student Profile Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-700 to-emerald-500 text-white font-black text-2xl flex items-center justify-center shadow-md">
            {estudiante.nombreCompleto.split(' ').map(n => n[0]).slice(0, 2).join('')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-slate-900">{estudiante.nombreCompleto}</h2>
              <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                {estudiante.tipoNEE}
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-600 mt-0.5">
              {estudiante.diagnostico} ({estudiante.siglaDiagnostico})
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2 font-medium">
              <span>Curso: <strong className="text-slate-700">{estudiante.curso}</strong></span>
              <span>•</span>
              <span>RUT: <strong className="text-slate-700 font-mono">{estudiante.rut}</strong></span>
              <span>•</span>
              <span>Edad: <strong className="text-slate-700">{estudiante.edad}</strong></span>
            </div>
          </div>
        </div>

        {/* Apoderado Contact Info */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs shrink-0">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Apoderada Titular</p>
          <p className="font-bold text-slate-800">{estudiante.apoderadoNombre}</p>
          <div className="flex items-center gap-1.5 text-slate-500 mt-1">
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            <span>{estudiante.apoderadoTelefono}</span>
          </div>
        </div>
      </div>

      {/* Cartilla 5 Expediente Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 text-[11px] font-bold px-2 py-0.5 rounded uppercase">
                Cartilla 5 MINEDUC
              </span>
              <span className="text-xs text-slate-500 font-medium">Auditoría & Fiscalización de Expediente</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              Expediente Digital del Estudiante en PIE
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Documentos obligatorios para respaldar la subvención de educación especial y asegurar el debido proceso pedagógico.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" /> 100% Conforme
            </span>
          </div>
        </div>

        {/* Document List */}
        <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
          {documentosExpediente.map((doc) => (
            <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-slate-50/70 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{doc.titulo}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5 font-medium">
                    <span className="text-slate-600">{doc.tipo}</span>
                    <span>•</span>
                    <span>Fecha: {doc.fecha}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${doc.color}`}>
                  {doc.estado}
                </span>
                {doc.action ? (
                  <button
                    onClick={doc.action}
                    className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
                  >
                    Abrir Editor
                  </button>
                ) : (
                  <button
                    className="p-1.5 hover:bg-slate-200 text-slate-500 rounded-lg transition"
                    title="Descargar documento respaldado"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
