import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { DiversiStudentBanner } from './components/DiversiStudentBanner';
import { SectionIdentificacion } from './components/SectionIdentificacion';
import { SectionMotivo } from './components/SectionMotivo';
import { SectionAntecedentes } from './components/SectionAntecedentes';
import { InformalEvaluationEditor } from './components/InformalEvaluationEditor';
import { SectionAnalisisCualitativo } from './components/SectionAnalisisCualitativo';
import { SectionSintesis } from './components/SectionSintesis';
import { SectionSugerencias } from './components/SectionSugerencias';
import { PautaObservacionEditor } from './components/PautaObservacionEditor';
import { ReportDocumentPreview } from './components/ReportDocumentPreview';
import { StudentFolderView } from './components/StudentFolderView';
import { BancoEvaluacionesView } from './components/BancoEvaluacionesView';
import { TabulatestView } from './components/TabulatestView';
import { NormativaMineducModal } from './components/NormativaMineducModal';
import { StudentManagementModal } from './components/StudentManagementModal';

import { EstudiantePIE, InformePIE, BateriaEvaluacionInformal } from './types/pie';
import { otrosEstudiantes, estudianteInicial, informeInicial, crearInformeParaEstudiante, profesorPredeterminado } from './data/defaultData';
import { exportarInformeADocx } from './utils/docxExporter';
import { generarRedaccionPedagogica } from './utils/pedagogicalAI';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Calculator, 
  FileText, 
  FileCheck2, 
  ClipboardList, 
  Menu,
  LayoutDashboard
} from 'lucide-react';

export function App() {
  // 1. Estudiantes registrados
  const [estudiantes, setEstudiantes] = useState<EstudiantePIE[]>(() => {
    const saved = localStorage.getItem('diversi_pie_estudiantes');
    if (saved) {
      try {
        const parsed: EstudiantePIE[] = JSON.parse(saved);
        // Ensure each student has tipoEvaluacion defined
        return parsed.map(st => ({
          ...st,
          tipoEvaluacion: st.tipoEvaluacion || (st.id === '3400' ? 'diversi' : 'tabulatest')
        }));
      } catch (e) {
        return otrosEstudiantes;
      }
    }
    return otrosEstudiantes;
  });

  // 2. Estudiante actualmente seleccionado
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState<EstudiantePIE>(() => {
    const saved = localStorage.getItem('diversi_pie_estudiante_actual');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          tipoEvaluacion: parsed.tipoEvaluacion || 'diversi'
        };
      } catch (e) {
        return estudianteInicial;
      }
    }
    return estudianteInicial;
  });

  // 3. Mapa de informes individuales por estudiante (para que cada estudiante tenga su propio informe y no se sobreescriban)
  const [informesMap, setInformesMap] = useState<Record<string, InformePIE>>(() => {
    const saved = localStorage.getItem('diversi_pie_informes_map');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure teacher information is up to date
        Object.keys(parsed).forEach(key => {
          parsed[key].profesional = profesorPredeterminado;
        });
        return parsed;
      } catch (e) {}
    }
    return {
      [estudianteInicial.id]: informeInicial
    };
  });

  // Informe activo para el estudiante actual
  const informe = informesMap[estudianteSeleccionado.id] || crearInformeParaEstudiante(estudianteSeleccionado);

  const updateCurrentInforme = (nuevoInforme: InformePIE) => {
    setInformesMap(prev => ({
      ...prev,
      [estudianteSeleccionado.id]: nuevoInforme
    }));
  };

  const [currentTab, setCurrentTab] = useState<string>('evaluacion-cuantitativa');
  const [isModalNormativaOpen, setIsModalNormativaOpen] = useState<boolean>(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Persistence to localStorage
  useEffect(() => {
    localStorage.setItem('diversi_pie_estudiantes', JSON.stringify(estudiantes));
  }, [estudiantes]);

  useEffect(() => {
    localStorage.setItem('diversi_pie_estudiante_actual', JSON.stringify(estudianteSeleccionado));
  }, [estudianteSeleccionado]);

  useEffect(() => {
    localStorage.setItem('diversi_pie_informes_map', JSON.stringify(informesMap));
  }, [informesMap]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Switch student & load their specific report
  const handleSelectEstudiante = (st: EstudiantePIE) => {
    setEstudianteSeleccionado(st);
    if (!informesMap[st.id]) {
      const nuevoInf = crearInformeParaEstudiante(st);
      setInformesMap(prev => ({ ...prev, [st.id]: nuevoInf }));
    }
    // Set appropriate starting view according to student's assigned evaluation
    if (st.tipoEvaluacion === 'tabulatest') {
      setCurrentTab('tabulatest');
    } else {
      setCurrentTab('evaluacion-cuantitativa');
    }
    showToast(`Estudiante activo: ${st.nombreCompleto} (${st.tipoEvaluacion === 'diversi' ? 'Evaluación Diversi' : 'Evaluación Tabulatest'})`);
  };

  // Save or Add student
  const handleGuardarEstudiante = (nuevoEstudiante: EstudiantePIE) => {
    const existe = estudiantes.some(s => s.id === nuevoEstudiante.id);
    if (existe) {
      setEstudiantes(prev => prev.map(s => s.id === nuevoEstudiante.id ? nuevoEstudiante : s));
      // Update student in current state if it's the active one
      if (estudianteSeleccionado.id === nuevoEstudiante.id) {
        setEstudianteSeleccionado(nuevoEstudiante);
      }
      showToast(`Ficha de ${nuevoEstudiante.nombreCompleto} actualizada correctamente.`);
    } else {
      setEstudiantes(prev => [...prev, nuevoEstudiante]);
      // Create their independent report
      const nuevoInf = crearInformeParaEstudiante(nuevoEstudiante);
      setInformesMap(prev => ({ ...prev, [nuevoEstudiante.id]: nuevoInf }));
      setEstudianteSeleccionado(nuevoEstudiante);
      if (nuevoEstudiante.tipoEvaluacion === 'tabulatest') {
        setCurrentTab('tabulatest');
      } else {
        setCurrentTab('evaluacion-cuantitativa');
      }
      showToast(`¡Estudiante ${nuevoEstudiante.nombreCompleto} agregado y listo con su evaluación!`);
    }
  };

  // Delete student
  const handleEliminarEstudiante = (id: string) => {
    const filtrados = estudiantes.filter(s => s.id !== id);
    setEstudiantes(filtrados);
    setInformesMap(prev => {
      const copia = { ...prev };
      delete copia[id];
      return copia;
    });
    if (estudianteSeleccionado.id === id && filtrados.length > 0) {
      handleSelectEstudiante(filtrados[0]);
    }
    showToast("Estudiante eliminado del registro.");
  };

  const handleGuardar = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast("¡Informe y evaluaciones respaldados con éxito en almacenamiento local!");
    }, 500);
  };

  const handleGenerarIA = () => {
    const redaccion = generarRedaccionPedagogica(estudianteSeleccionado, informe.evaluacionInformal);
    updateCurrentInforme({
      ...informe,
      analisisCualitativo: redaccion.analisisCualitativo,
      sintesis: redaccion.sintesis,
      sugerencias: redaccion.sugerencias
    });

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {}

    showToast("✨ ¡Redacción pedagógica generada automáticamente y vinculada a las cartillas MINEDUC!");
  };

  const handleExportarDocx = async () => {
    try {
      showToast("Generando documento oficial Word (.docx)...");
      const blob = await exportarInformeADocx(estudianteSeleccionado, informe);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const cleanName = estudianteSeleccionado.nombreCompleto.replace(/\s+/g, '_');
      a.download = `Informe_de_evaluacion_psicopedagogica_${cleanName}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast("✅ Archivo Word descargado exitosamente");
    } catch (error) {
      console.error(error);
      showToast("Error al generar el archivo Word.");
    }
  };

  const handleImprimir = () => {
    if (currentTab !== 'vista-previa') {
      setCurrentTab('vista-previa');
      setTimeout(() => {
        window.print();
      }, 300);
    } else {
      window.print();
    }
  };

  const handleCargarBateriaTabulatest = (bateria: BateriaEvaluacionInformal) => {
    updateCurrentInforme({
      ...informe,
      evaluacionInformal: bateria,
      instrumentosAplicados: informe.instrumentosAplicados.includes(bateria.nombre)
        ? informe.instrumentosAplicados
        : `${informe.instrumentosAplicados}, ${bateria.nombre}`
    });
    showToast(`Batería "${bateria.nombre}" asignada al estudiante.`);
  };

  const esDiversi = (estudianteSeleccionado.tipoEvaluacion || 'diversi') === 'diversi';

  const isDiversiSection = [
    'identificacion', 
    'motivo', 
    'antecedentes', 
    'evaluacion-cuantitativa', 
    'analisis-cualitativo', 
    'sintesis', 
    'sugerencias', 
    'pauta-observacion'
  ].includes(currentTab);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-5 right-4 left-4 md:left-auto md:right-5 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Normativa Modal */}
      <NormativaMineducModal
        isOpen={isModalNormativaOpen}
        onClose={() => setIsModalNormativaOpen(false)}
      />

      {/* Student Management & Add Modal */}
      <StudentManagementModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        estudiantes={estudiantes}
        estudianteSeleccionado={estudianteSeleccionado}
        onSelectEstudiante={handleSelectEstudiante}
        onGuardarEstudiante={handleGuardarEstudiante}
        onEliminarEstudiante={handleEliminarEstudiante}
      />

      {/* Responsive Sidebar */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        estudiantes={estudiantes}
        estudianteSeleccionado={estudianteSeleccionado}
        setEstudianteSeleccionado={handleSelectEstudiante}
        onOpenNormativa={() => setIsModalNormativaOpen(true)}
        onOpenGestionEstudiantes={() => setIsStudentModalOpen(true)}
        isMobileOpen={isMobileMenuOpen}
        setIsMobileOpen={setIsMobileMenuOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden pb-14 md:pb-0">
        {/* Responsive Navbar */}
        <Navbar
          estudiante={estudianteSeleccionado}
          informe={informe}
          onGenerarIA={handleGenerarIA}
          onExportarDocx={handleExportarDocx}
          onImprimir={handleImprimir}
          onGuardar={handleGuardar}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onOpenGestionEstudiantes={() => setIsStudentModalOpen(true)}
          isSaving={isSaving}
        />

        {/* Scrollable Workspace */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-5 md:p-6 custom-scrollbar">
          <div className="max-w-5xl mx-auto">
            {/* DIVERSI STUDENT BANNER: Displayed on report sections */}
            {isDiversiSection && (
              <DiversiStudentBanner
                estudiante={estudianteSeleccionado}
                informe={informe}
                currentTab={currentTab}
                onSelectTab={setCurrentTab}
                onGenerarIA={handleGenerarIA}
              />
            )}

            {/* TABULATEST VIEW */}
            {currentTab === 'tabulatest' && (
              <TabulatestView
                bateriaActual={informe.evaluacionInformal}
                estudiante={estudianteSeleccionado}
                onCargarBateria={handleCargarBateriaTabulatest}
                onGenerarAnalisis={handleGenerarIA}
              />
            )}

            {/* DIVERSI / MINEDUC REPORT SECTIONS */}
            {currentTab === 'identificacion' && (
              <SectionIdentificacion
                estudiante={estudianteSeleccionado}
                informe={informe}
                onEstudianteChange={(e) => {
                  setEstudianteSeleccionado(e);
                  setEstudiantes(prev => prev.map(s => s.id === e.id ? e : s));
                }}
                onInformeChange={updateCurrentInforme}
              />
            )}

            {currentTab === 'motivo' && (
              <SectionMotivo
                informe={informe}
                onInformeChange={updateCurrentInforme}
              />
            )}

            {currentTab === 'antecedentes' && (
              <SectionAntecedentes
                informe={informe}
                onInformeChange={updateCurrentInforme}
              />
            )}

            {currentTab === 'evaluacion-cuantitativa' && (
              <InformalEvaluationEditor
                bateria={informe.evaluacionInformal}
                onChange={(nuevaBateria) => updateCurrentInforme({ ...informe, evaluacionInformal: nuevaBateria })}
                onGenerarAnalisis={handleGenerarIA}
              />
            )}

            {currentTab === 'analisis-cualitativo' && (
              <SectionAnalisisCualitativo
                estudiante={estudianteSeleccionado}
                informe={informe}
                onInformeChange={updateCurrentInforme}
                onGenerarIA={handleGenerarIA}
              />
            )}

            {currentTab === 'sintesis' && (
              <SectionSintesis
                informe={informe}
                onInformeChange={updateCurrentInforme}
              />
            )}

            {currentTab === 'sugerencias' && (
              <SectionSugerencias
                informe={informe}
                onInformeChange={updateCurrentInforme}
              />
            )}

            {currentTab === 'pauta-observacion' && (
              <PautaObservacionEditor
                pauta={informe.pautaObservacion}
                onChange={(nuevaPauta) => updateCurrentInforme({ ...informe, pautaObservacion: nuevaPauta })}
              />
            )}

            {currentTab === 'vista-previa' && (
              <ReportDocumentPreview
                estudiante={estudianteSeleccionado}
                informe={informe}
                onExportarDocx={handleExportarDocx}
                onImprimir={handleImprimir}
              />
            )}

            {currentTab === 'carpeta' && (
              <StudentFolderView
                estudiante={estudianteSeleccionado}
                informe={informe}
                onGoToInforme={() => setCurrentTab('vista-previa')}
              />
            )}

            {currentTab === 'evaluaciones-banco' && (
              <BancoEvaluacionesView
                nivelActual={informe.evaluacionInformal.cursoNivel}
                onSelectNivel={(nivel) => {
                  updateCurrentInforme({
                    ...informe,
                    evaluacionInformal: {
                      ...informe.evaluacionInformal,
                      cursoNivel: nivel
                    }
                  });
                  setCurrentTab('evaluacion-cuantitativa');
                  showToast(`Batería actualizada al nivel: ${nivel}`);
                }}
              />
            )}
          </div>
        </main>

        {/* MOBILE STICKY BOTTOM NAVIGATION BAR */}
        <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 z-30 px-2 py-1.5 flex items-center justify-around shadow-lg">
          <button
            onClick={() => setCurrentTab('evaluacion-cuantitativa')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-semibold transition ${
              isDiversiSection && currentTab === 'evaluacion-cuantitativa' ? 'text-teal-700 bg-teal-50' : 'text-slate-500'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-teal-600" />
            <span>{esDiversi ? 'Diversi' : 'Evaluación'}</span>
          </button>

          <button
            onClick={() => setCurrentTab('tabulatest')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-semibold transition ${
              currentTab === 'tabulatest' ? 'text-indigo-700 bg-indigo-50' : 'text-slate-500'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>Tabulatest</span>
          </button>

          <button
            onClick={() => setCurrentTab('analisis-cualitativo')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-semibold transition ${
              currentTab === 'analisis-cualitativo' || currentTab === 'sintesis' || currentTab === 'sugerencias' ? 'text-teal-700 bg-teal-50' : 'text-slate-500'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Informe</span>
          </button>

          <button
            onClick={() => setCurrentTab('vista-previa')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-semibold transition ${
              currentTab === 'vista-previa' ? 'text-teal-700 bg-teal-50' : 'text-slate-500'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Previa</span>
          </button>

          <button
            onClick={() => setIsStudentModalOpen(true)}
            className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-semibold text-slate-500 active:text-teal-700"
          >
            <Menu className="w-4 h-4" />
            <span>Alumnos</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

export default App;
