import React from 'react';
import { BookOpen, Check, Layers, Sparkles, Download, FileCheck } from 'lucide-react';
import { BateriaEvaluacionInformal } from '../types/pie';

interface BancoEvaluacionesViewProps {
  onSelectNivel: (nivel: string) => void;
  nivelActual: string;
}

export const BancoEvaluacionesView: React.FC<BancoEvaluacionesViewProps> = ({
  onSelectNivel,
  nivelActual,
}) => {
  const niveles = [
    {
      id: 'pre-kinder',
      nombre: 'Educación Parvularia (Pre-kínder y Kínder)',
      areas: ['Funciones Básicas', 'Lenguaje Oral y Conciencia Fonológica', 'Nociones Pre-Numéricas', 'Psicomotricidad'],
      descripcion: 'Batería adaptada para detección temprana de barreras en el aprendizaje y rezagos en desarrollo cognitivo.',
      itemsCount: 18,
      ptjeMax: 65
    },
    {
      id: '1-4-basico',
      nombre: 'Primer Ciclo Básico (1° a 4° Básico)',
      areas: ['Lectura Inicial y Decodificación', 'Escritura y Grafomotricidad', 'Cálculo y Numeración', 'Atención y Memoria'],
      descripcion: 'Evaluación informal para diagnósticos DEA en lectoescritura, discalculia, TDAH y TEL.',
      itemsCount: 22,
      ptjeMax: 88
    },
    {
      id: '5-8-basico',
      nombre: 'Segundo Ciclo Básico (5° a 8° Básico)',
      areas: ['Comprensión Lectora Literal e Inferencial', 'Ortografía y Redacción', 'Resolución de Problemas Matemáticos', 'Funciones Ejecutivas'],
      descripcion: 'Instrumentos psicopedagógicos para evaluación de competencias curriculares y razonamiento abstracto.',
      itemsCount: 26,
      ptjeMax: 110
    },
    {
      id: '1-medio',
      nombre: 'Enseñanza Media (1° a 4° Medio)',
      areas: ['Área Cognitiva Superior', 'Comprensión Crítica y Escritura', 'Pensamiento Matemático (Álgebra y Estadística)', 'Habilidades Adaptativas'],
      descripcion: 'Batería completa oficial Diversi aplicada en enseñanza media, con tabulación automatizada y análisis normativo.',
      itemsCount: 24,
      ptjeMax: 97,
      actual: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-sky-100 text-sky-800 text-[11px] font-bold px-2 py-0.5 rounded uppercase">
            Recursos Psicopedagógicos
          </span>
          <span className="text-xs text-slate-500 font-medium">Baterías Informales Diversi / Mineduc</span>
        </div>
        <h2 className="text-base font-bold text-slate-900">
          Banco de Evaluaciones Informales por Nivel Educativo
        </h2>
        <p className="text-xs text-slate-500 mt-1 max-w-2xl">
          Selecciona un cuadernillo e instrumento de evaluación informal adaptado al curso de tu estudiante. La tabulación de puntajes, cálculo de porcentaje y niveles se configuran automáticamente.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {niveles.map((n) => (
          <div
            key={n.id}
            className={`p-5 rounded-xl border transition-all flex flex-col justify-between ${
              n.actual || n.nombre.includes(nivelActual)
                ? 'bg-teal-50/50 border-teal-500 ring-1 ring-teal-500 shadow-xs'
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-full">
                  {n.itemsCount} Ítems • {n.ptjeMax} pts máx.
                </span>
                {(n.actual || n.nombre.includes(nivelActual)) && (
                  <span className="text-xs text-teal-700 font-bold flex items-center gap-1">
                    <Check className="w-4 h-4" /> Batería Activa
                  </span>
                )}
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">{n.nombre}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">{n.descripcion}</p>

              <div className="space-y-1 mb-4">
                <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Áreas Evaluadas:</p>
                <div className="flex flex-wrap gap-1">
                  {n.areas.map(a => (
                    <span key={a} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium border border-slate-200">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">Gratuito y Descargable</span>
              <button
                onClick={() => onSelectNivel(n.nombre)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  n.actual || n.nombre.includes(nivelActual)
                    ? 'bg-teal-700 text-white'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                <span>{n.actual || n.nombre.includes(nivelActual) ? 'En uso en informe' : 'Cargar en informe'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
