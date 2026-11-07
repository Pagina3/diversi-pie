import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
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

import { EstudiantePIE, InformePIE, BateriaEvaluacionInformal } from './types/pie';
import { otrosEstudiantes, estudianteInicial, informeInicial } from './data/defaultData';
import { exportarInformeADocx } from './utils/docxExporter';
import { generarRedaccionPedagogica } from './utils/pedagogicalAI';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Calculator, 
  FileText, 
  FileCheck2, 
  ClipboardList, 
  Menu 
} from 'lucide-react';

export function App() {
  const [estudiantes, setEstudiantes] = useState<EstudiantePIE[]>(() => {
    const saved = localStorage.getItem('diversi_pie_estudiantes');
    return saved ? JSON.parse(saved) : otrosEstudiantes;
  });

  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState<EstudiantePIE>(() => {
    const saved = localStorage.getItem('diversi_pie_estudiante_actual');
    return saved ? JSON.parse(saved) : estudianteInicial;
  });

  const [informe, setInforme] = useState<InformePIE>(() => {
    const saved = localStorage.getItem('diversi_pie_informe_actual');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure teacher information matches user request
        parsed.profesional = {
          nombre: "Francisca Lorena Tello Rojas",
          rut: "21.232.592-9",
          profesion: "Profesora Diferencial mención Discapacidad Intelectual",
          registroMineduc: parsed.profesional?.registroMineduc || "145892",
          cargo: "Educadora Diferencial PIE / Especialista"
        };
        return parsed;
      } catch (e) {
        return informeInicial;
      }
    }
    return informeInicial;
  });

  const [currentTab, setCurrentTab] = useState<string>('tabulatest');
  const [isModalNormativaOpen, setIsModalNormativaOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Auto save to localStorage
  useEffect(() => {
    localStorage.setItem('diversi_pie_estudiantes', JSON.stringify(estudiantes));
  }, [estudiantes]);

  useEffect(() => {
    localStorage.setItem('diversi_pie_estudiante_actual', JSON.stringify(estudianteSeleccionado));
  }, [estudianteSeleccionado]);

  useEffect(() => {
    localStorage.setItem('diversi_pie_informe_actual', JSON.stringify(informe));
  }, [informe]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
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
    setInforme(prev => ({
      ...prev,
      analisisCualitativo: redaccion.analisisCualitativo,
      sintesis: redaccion.sintesis,
      sugerencias: redaccion.sugerencias
    }));

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
    setInforme(prev => ({
      ...prev,
      evaluacionInformal: bateria,
      instrumentosAplicados: prev.instrumentosAplicados.includes(bateria.nombre)
        ? prev.instrumentosAplicados
        : `${prev.instrumentosAplicados}, ${bateria.nombre}`
    }));
    showToast(`Batería "${bateria.nombre}" vinculada al informe con éxito.`);
  };

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

      {/* Responsive Sidebar */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        estudiantes={estudiantes}
        estudianteSeleccionado={estudianteSeleccionado}
        setEstudianteSeleccionado={setEstudianteSeleccionado}
        onOpenNormativa={() => setIsModalNormativaOpen(true)}
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
          isSaving={isSaving}
        />

        {/* Scrollable Workspace */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-5 md:p-6 custom-scrollbar">
          <div className="max-w-5xl mx-auto">
            {currentTab === 'tabulatest' && (
              <TabulatestView
                bateriaActual={informe.evaluacionInformal}
                estudiante={estudianteSeleccionado}
                onCargarBateria={handleCargarBateriaTabulatest}
                onGenerarAnalisis={handleGenerarIA}
              />
            )}

            {currentTab === 'identificacion' && (
              <SectionIdentificacion
                estudiante={estudianteSeleccionado}
                informe={informe}
                onEstudianteChange={setEstudianteSeleccionado}
                onInformeChange={setInforme}
              />
            )}

            {currentTab === 'motivo' && (
              <SectionMotivo
                informe={informe}
                onInformeChange={setInforme}
              />
            )}

            {currentTab === 'antecedentes' && (
              <SectionAntecedentes
                informe={informe}
                onInformeChange={setInforme}
              />
            )}

            {currentTab === 'evaluacion-cuantitativa' && (
              <InformalEvaluationEditor
                bateria={informe.evaluacionInformal}
                onChange={(nuevaBateria) => setInforme({ ...informe, evaluacionInformal: nuevaBateria })}
                onGenerarAnalisis={handleGenerarIA}
              />
            )}

            {currentTab === 'analisis-cualitativo' && (
              <SectionAnalisisCualitativo
                estudiante={estudianteSeleccionado}
                informe={informe}
                onInformeChange={setInforme}
                onGenerarIA={handleGenerarIA}
              />
            )}

            {currentTab === 'sintesis' && (
              <SectionSintesis
                informe={informe}
                onInformeChange={setInforme}
              />
            )}

            {currentTab === 'sugerencias' && (
              <SectionSugerencias
                informe={informe}
                onInformeChange={setInforme}
              />
            )}

            {currentTab === 'pauta-observacion' && (
              <PautaObservacionEditor
                pauta={informe.pautaObservacion}
                onChange={(nuevaPauta) => setInforme({ ...informe, pautaObservacion: nuevaPauta })}
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
                  setInforme(prev => ({
                    ...prev,
                    evaluacionInformal: {
                      ...prev.evaluacionInformal,
                      cursoNivel: nivel
                    }
                  }));
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
            onClick={() => setCurrentTab('tabulatest')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-semibold transition ${
              currentTab === 'tabulatest' ? 'text-indigo-700 bg-indigo-50' : 'text-slate-500'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>Tabulatest</span>
          </button>

          <button
            onClick={() => setCurrentTab('evaluacion-cuantitativa')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-semibold transition ${
              currentTab === 'evaluacion-cuantitativa' ? 'text-teal-700 bg-teal-50' : 'text-slate-500'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Puntajes</span>
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
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-semibold text-slate-500 active:text-teal-700"
          >
            <Menu className="w-4 h-4" />
            <span>Menú</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

export default App;
