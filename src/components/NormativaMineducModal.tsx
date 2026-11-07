import React from 'react';
import { X, ShieldCheck, BookOpen, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface NormativaMineducModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NormativaMineducModal: React.FC<NormativaMineducModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const cartillas = [
    {
      numero: 'Cartilla 1',
      titulo: 'Marco Normativo General y Rol del PIE',
      decreto: 'Decreto Supremo N° 170 / 2009',
      descripcion: 'Fija las normas para determinar los alumnos con necesidades educativas especiales (NEE Transitorias y Permanentes) que son beneficiarios de la subvención para educación especial. Establece requisitos de evaluación diagnóstica integral e interdisciplinaria.'
    },
    {
      numero: 'Cartilla 2',
      titulo: 'Trabajo Colaborativo y Co-Docencia de Aula',
      decreto: 'Orientaciones Técnicas PIE',
      descripcion: 'Define la asignación de al menos 3 horas cronológicas semanales para la co-docencia entre el profesor de educación regular y el profesional de educación especial, planificando la enseñanza diversificada y la evaluación auténtica.'
    },
    {
      numero: 'Cartilla 3',
      titulo: 'Diversificación de la Enseñanza y DUA',
      decreto: 'Decreto Supremo N° 83 / 2015',
      descripcion: 'Criterios y orientaciones de adecuación curricular para estudiantes que lo requieran. Fomenta los 3 principios del DUA (múltiples formas de motivación y compromiso, representación de la información, y acción y expresión).'
    },
    {
      numero: 'Cartilla 4',
      titulo: 'Elaboración del Informe Psicopedagógico y Pauta de Observación',
      decreto: 'Actualización Ministerial Decreto 170',
      descripcion: 'Regula la estructura formal del Informe de Evaluación Psicopedagógica. Obliga a incorporar la Pauta de Observación Pedagógica del Estudiante en el Contexto Escolar con sus 20 indicadores (10 pedagógicos y 10 sociales/comunicativos) firmada por docente de aula y especialista.'
    },
    {
      numero: 'Cartilla 5',
      titulo: 'Expediente y Respaldos Documentales del Estudiante',
      decreto: 'Fiscalización y Resguardo Legal',
      descripcion: 'Detalla los documentos obligatorios que deben permanecer archivados en la carpeta del estudiante: FUDEI cerrado, anamnesis, consentimiento firmado de los padres, informe médico/neurológico vigente, informe psicopedagógico y PACI si corresponde.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-teal-400" />
            <div>
              <h2 className="font-bold text-base text-white">Cartillas Técnicas MINEDUC y Marco Legal PIE</h2>
              <p className="text-xs text-slate-300">Normativa vigente de Educación Especial en Chile</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          <p className="text-slate-600 leading-relaxed">
            Esta aplicación integra íntegramente las 5 Cartillas Técnicas actualizadas por el Ministerio de Educación (MINEDUC) en respuesta a las directrices de Contraloría y Superintendencia de Educación, eliminando cobros de tokens y garantizando cumplimiento normativo:
          </p>

          <div className="space-y-3">
            {cartillas.map((c) => (
              <div key={c.numero} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-xs text-teal-700 bg-teal-100 px-2 py-0.5 rounded">
                      {c.numero}
                    </span>
                    <h3 className="font-bold text-slate-900 text-xs">{c.titulo}</h3>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{c.decreto}</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">{c.descripcion}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-medium">
            Formato oficial listo para firmas y entrega a UTP / MINEDUC
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs transition"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
