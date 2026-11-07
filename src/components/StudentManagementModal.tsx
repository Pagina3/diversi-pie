import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  X, 
  Trash2, 
  Edit, 
  Check, 
  Sparkles, 
  ClipboardCheck, 
  AlertTriangle,
  GraduationCap,
  Calendar,
  Phone,
  School
} from 'lucide-react';
import { EstudiantePIE, TipoEvaluacionSistema } from '../types/pie';

interface StudentManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  estudiantes: EstudiantePIE[];
  estudianteSeleccionado: EstudiantePIE;
  onSelectEstudiante: (e: EstudiantePIE) => void;
  onGuardarEstudiante: (nuevoEstudiante: EstudiantePIE) => void;
  onEliminarEstudiante: (id: string) => void;
}

export const StudentManagementModal: React.FC<StudentManagementModalProps> = ({
  isOpen,
  onClose,
  estudiantes,
  estudianteSeleccionado,
  onSelectEstudiante,
  onGuardarEstudiante,
  onEliminarEstudiante,
}) => {
  const [modoCrear, setModoCrear] = useState<boolean>(false);
  const [estudianteAEditar, setEstudianteAEditar] = useState<EstudiantePIE | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    nombreSocial: '',
    rut: '',
    fechaNacimiento: '2012-05-20',
    curso: '1° Medio A',
    establecimiento: 'Colegio Ana María Janer',
    tipoNEE: 'NEET' as 'NEET' | 'NEEP',
    diagnostico: 'Trastorno de Déficit Atencional con Hiperactividad',
    siglaDiagnostico: 'TDA-H',
    tipoEvaluacion: 'diversi' as TipoEvaluacionSistema, // Exclusive choice: 'diversi' | 'tabulatest'
    apoderadoNombre: '',
    apoderadoTelefono: ''
  });

  if (!isOpen) return null;

  const calcularEdad = (fechaNac: string) => {
    if (!fechaNac) return '-';
    const nac = new Date(fechaNac);
    const hoy = new Date();
    let anios = hoy.getFullYear() - nac.getFullYear();
    let meses = hoy.getMonth() - nac.getMonth();
    if (meses < 0 || (meses === 0 && hoy.getDate() < nac.getDate())) {
      anios--;
      meses = (meses + 12) % 12;
    }
    return `${anios} años, ${meses} meses`;
  };

  const handleAbrirCrear = () => {
    setFormData({
      nombreCompleto: '',
      nombreSocial: '',
      rut: '',
      fechaNacimiento: '2013-03-15',
      curso: '8° Básico A',
      establecimiento: 'Colegio Ana María Janer',
      tipoNEE: 'NEET',
      diagnostico: 'Dificultad Específica del Aprendizaje (DEA)',
      siglaDiagnostico: 'DEA',
      tipoEvaluacion: 'diversi',
      apoderadoNombre: '',
      apoderadoTelefono: ''
    });
    setEstudianteAEditar(null);
    setModoCrear(true);
  };

  const handleAbrirEditar = (st: EstudiantePIE) => {
    setFormData({
      nombreCompleto: st.nombreCompleto,
      nombreSocial: st.nombreSocial || st.nombreCompleto,
      rut: st.rut,
      fechaNacimiento: st.fechaNacimiento,
      curso: st.curso,
      establecimiento: st.establecimiento || 'Colegio Ana María Janer',
      tipoNEE: st.tipoNEE,
      diagnostico: st.diagnostico,
      siglaDiagnostico: st.siglaDiagnostico,
      tipoEvaluacion: st.tipoEvaluacion || 'diversi',
      apoderadoNombre: st.apoderadoNombre,
      apoderadoTelefono: st.apoderadoTelefono
    });
    setEstudianteAEditar(st);
    setModoCrear(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombreCompleto.trim()) return;

    const edadCalc = calcularEdad(formData.fechaNacimiento);

    const estudianteParaGuardar: EstudiantePIE = {
      id: estudianteAEditar ? estudianteAEditar.id : `st-${Date.now()}`,
      nombreCompleto: formData.nombreCompleto.trim(),
      nombreSocial: formData.nombreSocial.trim() || formData.nombreCompleto.trim(),
      rut: formData.rut.trim() || 'Sin registrar',
      fechaNacimiento: formData.fechaNacimiento,
      edad: edadCalc,
      curso: formData.curso,
      establecimiento: formData.establecimiento,
      tipoNEE: formData.tipoNEE,
      diagnostico: formData.diagnostico,
      siglaDiagnostico: formData.siglaDiagnostico,
      tipoEvaluacion: formData.tipoEvaluacion, // exclusive: 'diversi' | 'tabulatest'
      apoderadoNombre: formData.apoderadoNombre.trim() || 'Apoderado no registrado',
      apoderadoTelefono: formData.apoderadoTelefono.trim() || '+56 9'
    };

    onGuardarEstudiante(estudianteParaGuardar);
    setModoCrear(false);
    setEstudianteAEditar(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 md:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/40 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base text-white">Administración de Estudiantes PIE</h2>
              <p className="text-xs text-slate-400">
                Agrega, edita y asigna la evaluación correspondiente a cada estudiante (Diversi o Tabulatest).
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 md:p-6 overflow-y-auto flex-1 custom-scrollbar">
          {modoCrear ? (
            /* FORMULARIO AGREGAR / EDITAR ESTUDIANTE */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {estudianteAEditar ? 'Editar Ficha del Estudiante' : 'Ingresar Nuevo Estudiante PIE'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Define los datos personales y el sistema de evaluación asignado (una u otra, no ambas).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setModoCrear(false)}
                  className="text-xs text-slate-600 hover:text-slate-900 font-semibold px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                >
                  Volver al Listado
                </button>
              </div>

              {/* SELECTOR EXCLUSIVO DE EVALUACIÓN: "O UNA EVALUACIÓN U OTRA, NO AMBAS" */}
              <div className="p-4 bg-teal-50/50 rounded-xl border-2 border-teal-400/80 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase tracking-wider text-teal-950 flex items-center gap-2">
                    <ClipboardCheck className="w-4 h-4 text-teal-700" />
                    <span>Sistema de Evaluación Asignado (Exclusivo: una u otra):</span>
                  </label>
                  <span className="text-[10px] font-bold bg-teal-200/60 text-teal-900 px-2 py-0.5 rounded-full">
                    No se mezclan
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {/* Opción 1: Diversi */}
                  <label 
                    onClick={() => setFormData({ ...formData, tipoEvaluacion: 'diversi' })}
                    className={`p-3.5 rounded-xl border-2 cursor-pointer transition flex items-start gap-3 ${
                      formData.tipoEvaluacion === 'diversi'
                        ? 'border-teal-600 bg-white ring-2 ring-teal-500/20 shadow-xs'
                        : 'border-slate-200 bg-white/60 hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="tipoEvaluacion"
                      value="diversi"
                      checked={formData.tipoEvaluacion === 'diversi'}
                      onChange={() => setFormData({ ...formData, tipoEvaluacion: 'diversi' })}
                      className="mt-1 text-teal-600 focus:ring-teal-500"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                        <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                        <span>Evaluación Informal Diversi (diversi.cl)</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        Batería psicopedagógica completa por áreas (Cognitiva, Lenguaje y Matemáticas) con formato oficial del informe Diversi.
                      </p>
                    </div>
                  </label>

                  {/* Opción 2: Tabulatest */}
                  <label 
                    onClick={() => setFormData({ ...formData, tipoEvaluacion: 'tabulatest' })}
                    className={`p-3.5 rounded-xl border-2 cursor-pointer transition flex items-start gap-3 ${
                      formData.tipoEvaluacion === 'tabulatest'
                        ? 'border-indigo-600 bg-white ring-2 ring-indigo-500/20 shadow-xs'
                        : 'border-slate-200 bg-white/60 hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="tipoEvaluacion"
                      value="tabulatest"
                      checked={formData.tipoEvaluacion === 'tabulatest'}
                      onChange={() => setFormData({ ...formData, tipoEvaluacion: 'tabulatest' })}
                      className="mt-1 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                        <span>Prueba Informal Tabulatest (R-3)</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        Baterías R-3 (Básica 4°, 8°, Fonoaudiológica y Estilos VAK) con tabulación y detección de ítems descendidos de Tabulatest.cl.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Campos de Identificación */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre Completo de Identidad *</label>
                  <input
                    type="text"
                    required
                    value={formData.nombreCompleto}
                    onChange={(e) => setFormData({ ...formData, nombreCompleto: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                    placeholder="Ej: Sofía Antonia Lagos Morales"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre Social (si corresponde)</label>
                  <input
                    type="text"
                    value={formData.nombreSocial}
                    onChange={(e) => setFormData({ ...formData, nombreSocial: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Ej: Sofía Lagos"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">RUT Estudiante *</label>
                  <input
                    type="text"
                    required
                    value={formData.rut}
                    onChange={(e) => setFormData({ ...formData, rut: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
                    placeholder="Ej: 22.345.678-9"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Fecha Nacimiento</label>
                    <input
                      type="date"
                      value={formData.fechaNacimiento}
                      onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Edad Estimada</label>
                    <div className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-slate-100 text-slate-600 truncate">
                      {calcularEdad(formData.fechaNacimiento)}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Curso / Nivel *</label>
                  <select
                    value={formData.curso}
                    onChange={(e) => setFormData({ ...formData, curso: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold"
                  >
                    <option value="Pre-Kínder">Pre-Kínder (NT1)</option>
                    <option value="Kínder">Kínder (NT2)</option>
                    <option value="1° Básico">1° Básico</option>
                    <option value="2° Básico">2° Básico</option>
                    <option value="3° Básico">3° Básico</option>
                    <option value="4° Básico">4° Básico</option>
                    <option value="5° Básico">5° Básico</option>
                    <option value="6° Básico">6° Básico</option>
                    <option value="7° Básico">7° Básico</option>
                    <option value="8° Básico">8° Básico</option>
                    <option value="1° Medio A">1° Medio A</option>
                    <option value="1° Medio B">1° Medio B</option>
                    <option value="2° Medio">2° Medio</option>
                    <option value="3° Medio">3° Medio</option>
                    <option value="4° Medio">4° Medio</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tipo de NEE *</label>
                  <select
                    value={formData.tipoNEE}
                    onChange={(e) => setFormData({ ...formData, tipoNEE: e.target.value as 'NEET' | 'NEEP' })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold"
                  >
                    <option value="NEET">Transitoria (NEET) - DEA, TDAH, TEL, FIL</option>
                    <option value="NEEP">Permanente (NEEP) - TEA, DI Leve/Mod, Motora</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Diagnóstico Específico</label>
                  <input
                    type="text"
                    value={formData.diagnostico}
                    onChange={(e) => setFormData({ ...formData, diagnostico: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Ej: Dificultad Específica del Aprendizaje en Lectoescritura (DEA)"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre Apoderado Titular</label>
                  <input
                    type="text"
                    value={formData.apoderadoNombre}
                    onChange={(e) => setFormData({ ...formData, apoderadoNombre: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Ej: Carmen Morales"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Teléfono Apoderado</label>
                  <input
                    type="text"
                    value={formData.apoderadoTelefono}
                    onChange={(e) => setFormData({ ...formData, apoderadoTelefono: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Ej: +56 9 1234 5678"
                  />
                </div>
              </div>

              {/* Botones de acción del formulario */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setModoCrear(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-xs transition"
                >
                  {estudianteAEditar ? 'Guardar Cambios' : 'Registrar Estudiante'}
                </button>
              </div>
            </form>
          ) : (
            /* LISTADO Y ADMINISTRACIÓN DE ESTUDIANTES */
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Estudiantes Registrados ({estudiantes.length})
                </span>
                <button
                  onClick={handleAbrirCrear}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition"
                >
                  <UserPlus className="w-4 h-4 text-teal-400" />
                  <span>+ Agregar Nuevo Estudiante</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {estudiantes.map((st) => {
                  const isSelected = st.id === estudianteSeleccionado.id;
                  const esDiversi = (st.tipoEvaluacion || 'diversi') === 'diversi';

                  return (
                    <div
                      key={st.id}
                      className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-teal-50/50 border-teal-500 ring-1 ring-teal-500 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`w-11 h-11 rounded-xl text-white font-bold flex items-center justify-center text-sm shrink-0 ${
                          esDiversi ? 'bg-teal-600' : 'bg-indigo-600'
                        }`}>
                          {st.nombreCompleto.split(' ').map(n => n[0]).slice(0, 2).join('')}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-slate-900 text-sm">
                              {st.nombreCompleto}
                            </h4>
                            {/* Badges de sistema exclusivo */}
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              esDiversi
                                ? 'bg-teal-50 text-teal-800 border-teal-300'
                                : 'bg-indigo-50 text-indigo-800 border-indigo-300'
                            }`}>
                              {esDiversi ? '🟢 Batería Diversi' : '🟣 Batería Tabulatest R-3'}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 flex-wrap">
                            <span className="font-medium text-slate-700">{st.curso}</span>
                            <span>•</span>
                            <span className="font-mono">{st.rut}</span>
                            <span>•</span>
                            <span>{st.diagnostico} ({st.siglaDiagnostico})</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        {isSelected ? (
                          <span className="px-3 py-1.5 rounded-lg bg-teal-100 text-teal-800 text-xs font-bold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> En uso
                          </span>
                        ) : (
                          <button
                            onClick={() => {
                              onSelectEstudiante(st);
                              onClose();
                            }}
                            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition"
                          >
                            Abrir Informe
                          </button>
                        )}

                        <button
                          onClick={() => handleAbrirEditar(st)}
                          className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-lg transition"
                          title="Editar datos y tipo de evaluación"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        {estudiantes.length > 1 && (
                          <button
                            onClick={() => {
                              if (window.confirm(`¿Seguro que deseas eliminar el registro de ${st.nombreCompleto}?`)) {
                                onEliminarEstudiante(st.id);
                              }
                            }}
                            className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg transition"
                            title="Eliminar estudiante"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Los datos se guardan de forma privada en el almacenamiento local de tu navegador.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
