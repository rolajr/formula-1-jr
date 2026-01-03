# 📚 Índice de Documentación del Proyecto

**Guía Rápida** - ¿Qué hace cada archivo?

---

## 📋 ROADMAP.md
**¿Qué es?** Plan maestro del proyecto
**¿Para qué sirve?**
- Ver el plan completo de desarrollo
- Conocer las fases del proyecto (Fase 0, 1, 2, 3)
- Entender los objetivos y alcance
- Revisar el cronograma y sprints

**Cuándo leerlo:**
- Al iniciar el proyecto
- Cuando necesites entender el plan general
- Para saber en qué fase estamos

---

## 🎨 DESIGN_SPECS.md
**¿Qué es?** Especificaciones de diseño y UX
**¿Para qué sirve?**
- Ver el sistema de colores y tipografías
- Consultar wireframes de páginas
- Entender decisiones de diseño
- Conocer el sistema de componentes
- Guías de accesibilidad y responsive

**Cuándo leerlo:**
- Antes de diseñar nuevos componentes
- Cuando necesites colores o estilos
- Para mantener consistencia visual
- Al hacer cambios de UI

---

## 📊 PROGRESS.md
**¿Qué es?** Reporte de progreso actualizado
**¿Para qué sirve?**
- Ver el estado actual del proyecto (85% Sprint 1)
- Conocer qué está completado y qué falta
- Revisar métricas y estadísticas
- Entender las decisiones técnicas tomadas
- Ver los próximos pasos inmediatos

**Cuándo leerlo:**
- Al retomar el proyecto después de un tiempo
- Para saber en qué punto estamos
- Antes de empezar una nueva tarea
- Para actualizar al equipo

---

## 🔌 API_INTEGRATION.md
**¿Qué es?** Guía técnica de la API
**¿Para qué sirve?**
- Entender cómo funciona la integración con Jolpica F1
- Ver funciones disponibles (`getNextRace()`, `getDriverStandings()`)
- Conocer la estrategia de caché (ISR)
- Aprender sobre el manejo de errores
- Troubleshooting de problemas de API

**Cuándo leerlo:**
- Cuando trabajes con datos de la API
- Si hay errores de conexión
- Para añadir nuevas funciones de API
- Al debuggear problemas de datos

---

## 📦 GEMINI_PACK.md
**¿Qué es?** Pack de relevo para otra IA
**¿Para qué sirve?**
- Transferir contexto completo a Gemini (u otra IA)
- Contiene ROADMAP + DESIGN_SPECS + PROGRESS + código clave
- Incluye instrucciones específicas para continuar
- No lo necesitas leer como humano (es muy largo)

**Cuándo leerlo:**
- Nunca (es para IAs)
- Está bien como backup de documentación completa

---

## 📖 README.md
**¿Qué es?** Documentación técnica principal
**¿Para qué sirve?**
- Ver descripción general del proyecto
- Conocer el stack tecnológico
- Instrucciones de instalación
- Comandos principales (dev, build, lint)
- Estructura de carpetas

**Cuándo leerlo:**
- Primera vez que abres el proyecto
- Para instalar y configurar
- Al incorporar nuevos desarrolladores
- Como referencia rápida de comandos

---

## 🚀 SETUP.md
**¿Qué es?** Guía de configuración y traspaso
**¿Para qué sirve?**
- Instrucciones paso a paso para setup inicial
- Configuración de entorno de desarrollo
- Variables de entorno necesarias
- Troubleshooting de instalación
- Guía para transferir el proyecto

**Cuándo leerlo:**
- Al configurar el proyecto por primera vez
- Si hay problemas con npm install
- Cuando incorporas un nuevo desarrollador
- Al cambiar de máquina/computadora

---

## 🗂️ Resumen Visual

```
┌─────────────────────────────────────────────────────┐
│  🎯 ¿Qué archivo leer según tu necesidad?          │
├─────────────────────────────────────────────────────┤
│                                                     │
│  📍 Empezar proyecto       → README.md + SETUP.md  │
│  📍 Ver plan completo      → ROADMAP.md            │
│  📍 Hacer diseño/UI        → DESIGN_SPECS.md       │
│  📍 Saber estado actual    → PROGRESS.md           │
│  📍 Trabajar con API       → API_INTEGRATION.md    │
│  📍 Transferir a otra IA   → GEMINI_PACK.md        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 💡 Tips de Uso

### Si eres desarrollador nuevo:
1. Lee **README.md** primero
2. Sigue **SETUP.md** para instalación
3. Revisa **PROGRESS.md** para estado actual
4. Consulta **DESIGN_SPECS.md** antes de crear UI

### Si retomas el proyecto:
1. Lee **PROGRESS.md** (¿dónde estamos?)
2. Revisa **ROADMAP.md** (¿qué sigue?)
3. Consulta el archivo específico según tu tarea

### Si vas a hacer diseño:
1. Abre **DESIGN_SPECS.md** como referencia
2. Usa los colores y componentes definidos
3. No inventes nuevos estilos sin documentar

### Si trabajas con datos:
1. Lee **API_INTEGRATION.md** completo
2. Usa las funciones ya creadas en `src/services/f1Api.ts`
3. No hagas fetch directo, usa el cliente

---

## 📏 Tamaños de Referencia

| Archivo | Tamaño | Tiempo de lectura |
|---------|--------|------------------|
| README.md | 5 KB | 2 minutos |
| SETUP.md | 8 KB | 3 minutos |
| PROGRESS.md | 25 KB | 10 minutos |
| ROADMAP.md | 15 KB | 8 minutos |
| DESIGN_SPECS.md | 60 KB | 20 minutos |
| API_INTEGRATION.md | 15 KB | 8 minutos |
| GEMINI_PACK.md | 135 KB | No leer (es para IA) |

---

## 🔄 Actualización de Documentos

**Documentos que se actualizan frecuentemente:**
- ✏️ **PROGRESS.md** - Cada vez que completes una tarea importante
- ✏️ **API_INTEGRATION.md** - Cuando añadas nuevas funciones de API

**Documentos que casi no cambian:**
- 📌 **ROADMAP.md** - Solo si cambia el plan general
- 📌 **DESIGN_SPECS.md** - Solo si cambias el sistema de diseño
- 📌 **README.md** - Solo si cambias configuración base

---

**Última actualización**: 2026-01-02
**Versión**: 1.0

_Este archivo es tu mapa de navegación. ¡Úsalo siempre que no sepas dónde buscar algo!_
