export type LogroNivel = 'Bueno' | 'Medio' | 'Por desarrollar' | 'Sin evaluar';

export type TipoEvaluacionSistema = 'diversi' | 'tabulatest';

export interface EvaluacionItem {
  id: string;
  numero: number;
  nombre: string;
  ptjeIdeal: number;
  ptjeObtenido: number;
  porcentajeLogro?: number;
  nivel?: LogroNivel;
}

export interface SubAreaEvaluacion {
  id: string;
  nombre: string;
  items: EvaluacionItem[];
}

export interface AreaEvaluacion {
  id: string;
  nombre: string;
  subareas: SubAreaEvaluacion[];
}

export interface BateriaEvaluacionInformal {
  id: string;
  nombre: string;
  cursoNivel: string; // ej: "1° Medio", "8° Básico", etc.
  sistema?: TipoEvaluacionSistema;
  areas: AreaEvaluacion[];
}

export type EscalaObservacion = '1' | '2' | '3' | 'N/O' | '';

export interface IndicadorObservacion {
  id: string;
  texto: string;
  valor: EscalaObservacion;
}

export interface PautaObservacion {
  antecedentesPedagogicos: IndicadorObservacion[];
  antecedentesSocialesComunicativos: IndicadorObservacion[];
  observacionesGenerales: string;
  docenteAulaRegular: {
    nombre: string;
    rut: string;
    profesion: string;
    asignatura: string;
  };
}

export interface InformePIE {
  id: string;
  estudianteId: string;
  tipoEvaluacion: TipoEvaluacionSistema; // 'diversi' | 'tabulatest' (exclusiva, no ambas)
  fechaCreacion: string;
  fechaInforme: string;
  fechaEmisionDiagnostico: string;
  periodo: 'Ingreso' | 'Reevaluación' | 'Otro';
  estado: 'En proceso' | 'Terminado' | 'Pendiente';
  
  // I. Identificación
  establecimiento: string;
  rbd: string;
  
  // II. Motivo
  motivoDetalle: string;
  instrumentosAplicados: string;
  
  // III. Antecedentes relevantes historia escolar
  antecedentesHistoriaEscolar: string;
  antecedentesSaludFamilia: string;
  
  // IV. Análisis cualitativo y cuantitativo
  evaluacionInformal: BateriaEvaluacionInformal;
  analisisCualitativo: {
    cognitivaYComunicativa: string;
    socioemocionalYAproximacion: string;
    motoraAutonomiaYSensorial: string;
  };
  
  // V. Síntesis
  sintesis: {
    cognitivaYComunicativa: string;
    socioemocionalYAproximacion: string;
    motoraAutonomiaYSensorial: string;
    conclusion: string;
  };
  
  // VI. Sugerencias
  sugerencias: {
    alEstablecimiento: string;
    alEquipoAula: string;
    alEstudiante: string;
    aLaFamilia: string;
    otros: string;
  };
  
  // VII. Pauta de Observación (Cartilla 4 MINEDUC)
  pautaObservacion: PautaObservacion;
  
  // Profesional Responsable
  profesional: {
    nombre: string;
    rut: string;
    profesion: string;
    registroMineduc: string;
    cargo: string;
  };
}

export interface EstudiantePIE {
  id: string;
  nombreCompleto: string;
  nombreSocial: string;
  rut: string;
  fechaNacimiento: string;
  edad: string;
  curso: string;
  establecimiento?: string;
  tipoNEE: 'NEET' | 'NEEP';
  diagnostico: string;
  siglaDiagnostico: string;
  tipoEvaluacion: TipoEvaluacionSistema; // 'diversi' | 'tabulatest'
  apoderadoNombre: string;
  apoderadoTelefono: string;
  informeIdActual?: string;
}
