# Diversi PIE • Gestión de Informes y Evaluaciones Informales MINEDUC

Plataforma web integral para profesionales de la Educación Especial en Chile (Educadoras Diferenciales, Psicopedagogos y Equipos PIE). Replica y amplía las capacidades de **Diversi** (`diversi.cl`), ofreciendo herramientas gratuitas, sin límite de tokens, con tabulación automatizada y cumplimiento riguroso de la normativa del **Ministerio de Educación de Chile (MINEDUC)**.

---

## 🌟 Características Principales

* 📊 **Evaluaciones Informales Psicopedagógicas:**
  * Tabulación digital por áreas (Cognitiva, Lenguaje Verbal, Pensamiento Matemático).
  * Cálculo instantáneo de porcentajes de logro y categorización ministerial (*Bueno*, *Medio*, *Por desarrollar*).
  * Banco de baterías organizadas desde Educación Parvularia (Pre-kínder) hasta Enseñanza Media (4° Medio).
* 📝 **Informe de Evaluación Psicopedagógica (Cartilla 4 MINEDUC):**
  * Estructura ministerial en 7 secciones: *Identificación*, *Motivo*, *Historia escolar y familiar*, *Análisis cualitativo y cuantitativo* (3 dimensiones), *Síntesis diagnóstica* y *Sugerencias diversificadas*.
* 📋 **Pauta de Observación del Estudiante en Contexto Escolar:**
  * Los **20 indicadores oficiales de la Cartilla 4** (10 pedagógicos y 10 sociales/comunicativos).
  * Escala ministerial del 1 al 3 y N/O.
  * Respaldo para la co-docencia y firmas conjuntas con el profesor de aula regular.
* 🤖 **Asistente Pedagógico Integrado (Sin cobro de tokens):**
  * Genera automáticamente borradores de análisis cualitativo y recomendaciones para el establecimiento, el equipo de aula (DUA - Decreto 83), el estudiante y la familia a partir de los puntajes obtenidos.
* 📱 **Diseño 100% Adaptable para Celulares y Tablets:**
  * Menú deslizante tipo drawer.
  * Tarjetas táctiles e interactivas con botones de incremento/decremento (`+` / `-`) para ingresar puntajes cómodamente desde el móvil en el aula.
  * Barra de navegación inferior rápida para smartphones.
* 📄 **Exportación Oficial Inmediata:**
  * **Descarga directa en Word (.docx)** con formato idéntico al emitido por Diversi y MINEDUC.
  * **Impresión / PDF oficial** listo para adjuntar al expediente del estudiante (Cartilla 5).
* 💾 **Privacidad y Persistencia:**
  * Almacenamiento local seguro (`localStorage`), tus informes y datos de estudiantes no se envían a servidores de terceros.

---

## 🚀 Instalación y Uso Local

```bash
# Clonar el repositorio
git clone https://github.com/Pagina3/diversi-pie.git

# Entrar a la carpeta
cd diversi-pie

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación se abrirá en `http://localhost:5173/`.

---

## 📜 Normativa y Cartillas Integradas

* **Decreto Supremo N° 170 / 2009:** Normas para determinar alumnos con NEE beneficiarios de subvención especial.
* **Decreto Supremo N° 83 / 2015:** Criterios y orientaciones de adecuación curricular (DUA).
* **Cartillas Técnicas 1 a 5 MINEDUC:** Orientaciones actualizadas para expedientes, informes psicopedagógicos y co-docencia.

---

Desarrollado para la comunidad docente y de educación diferencial en Chile.
