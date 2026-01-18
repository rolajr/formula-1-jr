# 📺 Guía Completa de Modificación - LiveStream Widget

## 📚 Índice

1. [Introducción](#introducción)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Archivos y Su Propósito](#archivos-y-su-propósito)
4. [Cómo Funciona el Recorte CSS](#cómo-funciona-el-recorte-css)
5. [Modificaciones Comunes](#modificaciones-comunes)
6. [Agregar Nuevas Opciones de Stream](#agregar-nuevas-opciones-de-stream)
7. [Cambiar el Diseño Visual](#cambiar-el-diseño-visual)
8. [Agregar Nuevas Funcionalidades](#agregar-nuevas-funcionalidades)
9. [Troubleshooting](#troubleshooting)
10. [Flujo de Datos Completo](#flujo-de-datos-completo)

---

## Introducción

Este documento te guiará paso a paso para entender y modificar el sistema de transmisión en vivo. Está diseñado para que puedas hacer cambios sin romper nada, incluso si vuelves a este código meses después.

---

## Arquitectura del Sistema

### Estructura de Archivos

```
src/
├── components/
│   └── features/
│       └── LiveStreamWidget.tsx        ← Componente principal
├── app/
│   └── live/
│       └── page.tsx                    ← Página que usa el widget
└── components/
    └── layout/
        └── Navbar.tsx                  ← Navegación (enlace agregado)

Raíz del proyecto/
├── LIVESTREAM_DOCS.md                  ← Documentación técnica
├── LIVESTREAM_README.md                ← Guía de usuario
└── LIVESTREAM_GUIA_MODIFICACION.md     ← Este archivo
```

### Diagrama de Componentes

```
┌─────────────────────────────────────────┐
│         /live/page.tsx                  │
│  (Página Next.js - Server Component)    │
└─────────────────┬───────────────────────┘
                  │
                  ↓
┌─────────────────────────────────────────┐
│    LiveStreamWidget.tsx                 │
│    (Client Component - 'use client')    │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  Header                          │   │
│  │  - Logo y título                 │   │
│  │  - Botones de control            │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  Stream Options Tabs             │   │
│  │  - Opción 1, 2, 3, 4, 5, 6      │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  Crop Controls (condicional)     │   │
│  │  - Slider recorte superior       │   │
│  │  - Slider altura extra           │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  Video Container                 │   │
│  │  ┌───────────────────────────┐  │   │
│  │  │  <iframe>                 │  │   │
│  │  │  - URL del stream         │  │   │
│  │  │  - Recorte CSS aplicado   │  │   │
│  │  │  - Sandbox security       │  │   │
│  │  └───────────────────────────┘  │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  Footer Legal                    │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

---

## Archivos y Su Propósito

### 1. `src/components/features/LiveStreamWidget.tsx`

**Propósito:** Componente React que maneja toda la lógica del streaming.

**Responsabilidades:**
- Renderizar el iframe con el stream
- Manejar el cambio entre opciones
- Aplicar recorte CSS dinámico
- Gestionar errores y estados de carga
- Controles de usuario (pantalla completa, recarga, ajustes)

**Tipo:** Client Component (`'use client'`)

**Por qué Client Component:**
- Usa hooks de React (useState)
- Maneja eventos del navegador
- Actualiza el DOM dinámicamente

### 2. `src/app/live/page.tsx`

**Propósito:** Página Next.js que contiene el widget y contenido informativo.

**Responsabilidades:**
- Importar y renderizar LiveStreamWidget
- Mostrar información de uso
- Consejos y troubleshooting
- Metadata para SEO

**Tipo:** Server Component (por defecto en Next.js)

### 3. `src/components/layout/Navbar.tsx`

**Propósito:** Barra de navegación principal.

**Modificación hecha:**
```tsx
// ✅ Línea agregada:
{ href: '/live', label: '🔴 En Vivo' },
```

---

## Cómo Funciona el Recorte CSS

### El Problema

Cuando incrustas un iframe de un sitio externo, cargas **toda la página**, incluyendo:
- ❌ Headers con menús
- ❌ Banners publicitarios
- ❌ Footers con enlaces
- ✅ El video (lo que queremos)

### La Solución: Técnica de "Máscara con Overflow Hidden"

#### Paso 1: Contenedor con Overflow Hidden

```tsx
<div
  className="relative bg-black aspect-video"
  style={{ overflow: 'hidden' }}
>
  {/* Este div actúa como una "ventana" */}
</div>
```

**Función:**
- `overflow: hidden` → Todo lo que sobresalga será invisible
- `aspect-ratio: 16/9` → Mantiene proporciones de video
- `position: relative` → Para posicionar el iframe dentro

#### Paso 2: Iframe Más Grande con Márgenes Negativos

```tsx
<iframe
  src="https://stream-url.com"
  style={{
    top: `-${cropTop}px`,              // Mueve hacia arriba
    width: '100%',
    height: `calc(100% + ${cropTop}px + ${cropBottom}%)`, // Compensa
  }}
/>
```

**Función:**
- `top: -150px` → Mueve el iframe 150px hacia arriba
- `height: calc(100% + 150px + 20%)` → Aumenta la altura para compensar

#### Visualización Paso a Paso

**Sin Recorte:**
```
┌─────────────────────────────┐
│  CONTENEDOR (visible)       │
│  ┌───────────────────────┐  │
│  │ 📋 Header del sitio   │  │ ← Visible (no queremos)
│  │ 🎥 VIDEO              │  │ ← Visible (queremos)
│  │ 📢 Footer del sitio   │  │ ← Visible (no queremos)
│  └───────────────────────┘  │
└─────────────────────────────┘
```

**Con Recorte (top: -100px):**
```
┌─────────────────────────────┐
│  CONTENEDOR (visible)       │
│                             │
│    📋 Header (arriba,       │ ← Invisible (overflow hidden)
│       fuera del contenedor) │
│  ┌───────────────────────┐  │
│  │ 🎥 VIDEO              │  │ ← Visible (centrado)
│  │                       │  │
│  └───────────────────────┘  │
│    📢 Footer (abajo,        │ ← Invisible (overflow hidden)
│       fuera del contenedor) │
└─────────────────────────────┘
```

### Valores de Recorte en el Código

```tsx
// Estado del componente
const [customCropTop, setCustomCropTop] = useState(0);
const [customCropBottom, setCustomCropBottom] = useState(0);

// Aplicado al iframe
style={{
  top: `-${customCropTop}px`,
  height: `calc(100% + ${customCropTop}px + ${customCropBottom}%)`
}}
```

**Ejemplo numérico:**
- `customCropTop = 150` → Mueve 150px arriba
- `customCropBottom = 20` → Añade 20% de altura extra
- Resultado: Oculta ~150px de header y ~20% de footer

---

## Modificaciones Comunes

### 1. Cambiar los Valores de Recorte por Defecto

**Archivo:** `LiveStreamWidget.tsx`

**Busca:**
```tsx
const STREAM_OPTIONS: StreamOption[] = [
  {
    id: 'option1',
    label: 'Opción 1',
    url: 'https://www.tvplusgratis2.com/live/daznf1.php',
    cropTop: 0,        // ← Cambiar aquí
    cropBottom: 0,     // ← Cambiar aquí
  },
```

**Modifica:**
```tsx
    cropTop: 150,      // ← Nuevo valor (oculta 150px arriba)
    cropBottom: 20,    // ← Nuevo valor (20% altura extra)
```

**Resultado:**
Cuando el usuario seleccione "Opción 1", automáticamente aplicará un recorte de 150px superior y 20% inferior.

### 2. Cambiar el Rango de los Sliders

**Archivo:** `LiveStreamWidget.tsx`

**Busca:**
```tsx
<input
  type="range"
  min="0"
  max="500"    // ← Cambiar el máximo
  step="10"    // ← Cambiar el incremento
  value={customCropTop}
  onChange={(e) => setCustomCropTop(parseInt(e.target.value))}
/>
```

**Modifica:**
```tsx
  min="0"
  max="800"    // ← Ahora permite hasta 800px
  step="20"    // ← Incrementos de 20px
```

**Resultado:**
El slider ahora permite recortar hasta 800px en pasos de 20px.

### 3. Cambiar los Textos del Componente

**Archivo:** `LiveStreamWidget.tsx`

**Busca el texto que quieres cambiar:**

```tsx
<h3 className="...">
  Transmisión en Vivo - DAZN F1  // ← Cambiar aquí
</h3>
```

**Modifica:**
```tsx
  Live Stream - Formula 1  // ← Nuevo texto
```

**Otros textos a modificar:**
- Título: `Transmisión en Vivo - DAZN F1`
- Warning: `Nota técnica: Si la transmisión no carga...`
- Footer: `Contenido de terceros...`

### 4. Cambiar la Cantidad de Opciones de Stream

**Archivo:** `LiveStreamWidget.tsx`

**Busca:**
```tsx
const STREAM_OPTIONS: StreamOption[] = [
  // ... opciones existentes
];
```

**Para agregar una nueva opción:**
```tsx
const STREAM_OPTIONS: StreamOption[] = [
  // ... opciones existentes
  {
    id: 'option7',    // ← ID único
    label: 'Opción 7', // ← Nombre mostrado
    url: 'https://www.tvplusgratis2.com/live7/daznf1.php', // ← URL
    cropTop: 0,
    cropBottom: 0,
  },
];
```

**Para eliminar una opción:**
Simplemente borra el objeto completo de la opción que no quieres.

---

## Agregar Nuevas Opciones de Stream

### Escenario: Quieres agregar streams de otro sitio

**Pasos:**

#### 1. Agregar la nueva opción al array

```tsx
const STREAM_OPTIONS: StreamOption[] = [
  // ... opciones existentes
  {
    id: 'newsource1',
    label: 'Fuente Nueva 1',
    url: 'https://otro-sitio.com/f1-live.html',
    cropTop: 0,    // Ajustar después de probar
    cropBottom: 0, // Ajustar después de probar
  },
];
```

#### 2. Probar y ajustar el recorte

1. Ejecuta la app: `npm run dev`
2. Ve a `/live`
3. Selecciona la nueva opción
4. Usa los controles de ajuste (⚙️) para encontrar los valores correctos
5. Anota los valores finales

#### 3. Actualizar con valores correctos

```tsx
  {
    id: 'newsource1',
    label: 'Fuente Nueva 1',
    url: 'https://otro-sitio.com/f1-live.html',
    cropTop: 180,   // ← Valor encontrado
    cropBottom: 25, // ← Valor encontrado
  },
```

### Consideraciones Importantes

**1. X-Frame-Options:**
Algunos sitios bloquean iframes. No hay solución del lado del cliente.

**2. CORS:**
No podrás acceder al contenido del iframe si es de otro dominio.

**3. Sandbox:**
Mantén los atributos sandbox para seguridad:
```tsx
sandbox="allow-scripts allow-same-origin allow-presentation allow-forms"
```

---

## Cambiar el Diseño Visual

### 1. Cambiar Colores

**Archivo:** `LiveStreamWidget.tsx`

**Clases de Tailwind a modificar:**

```tsx
// Fondo principal
bg-dark-900        → bg-slate-900
border-dark-700    → border-slate-700

// Header
bg-dark-950        → bg-slate-950

// Botón activo
bg-accent-red-500  → bg-blue-500
text-white         → text-white

// Botón inactivo
bg-dark-800        → bg-slate-800
text-light-300     → text-gray-300
```

**Ejemplo completo:**

**Antes:**
```tsx
<div className="bg-dark-900 rounded-2xl border border-dark-700">
```

**Después:**
```tsx
<div className="bg-slate-900 rounded-2xl border border-slate-700">
```

### 2. Cambiar el Aspect Ratio del Video

**Archivo:** `LiveStreamWidget.tsx`

**Busca:**
```tsx
<div className="relative bg-black aspect-video">
```

**Opciones:**
```tsx
aspect-video     // 16:9 (actual)
aspect-square    // 1:1
aspect-[21/9]    // 21:9 (ultrawide)
aspect-[4/3]     // 4:3 (clásico TV)
```

### 3. Cambiar Tamaño de Iconos

**Busca:**
```tsx
<Tv className="w-5 h-5 text-accent-red-500" />
```

**Modifica:**
```tsx
<Tv className="w-6 h-6 text-accent-red-500" />  // Más grande
<Tv className="w-4 h-4 text-accent-red-500" />  // Más pequeño
```

### 4. Cambiar Bordes y Sombras

```tsx
// Bordes
rounded-2xl      → rounded-xl     (menos redondeado)
rounded-2xl      → rounded-3xl    (más redondeado)

// Sombras
shadow-2xl       → shadow-lg      (menos sombra)
shadow-2xl       → shadow-3xl     (más sombra)
```

---

## Agregar Nuevas Funcionalidades

### Funcionalidad 1: Guardar Preferencias del Usuario

**Objetivo:** Recordar la última opción seleccionada y los valores de recorte.

**Implementación:**

#### Paso 1: Agregar useEffect para guardar

```tsx
// Al inicio del componente
import { useEffect } from 'react';

// Dentro del componente, después de los useState
useEffect(() => {
  // Guardar preferencias cuando cambian
  localStorage.setItem('preferredStream', selectedOption.id);
  localStorage.setItem('cropTop', customCropTop.toString());
  localStorage.setItem('cropBottom', customCropBottom.toString());
}, [selectedOption, customCropTop, customCropBottom]);
```

#### Paso 2: Cargar preferencias al iniciar

```tsx
// Modificar los useState iniciales
const [selectedOption, setSelectedOption] = useState<StreamOption>(() => {
  // Intentar cargar desde localStorage
  if (typeof window !== 'undefined') {
    const savedId = localStorage.getItem('preferredStream');
    if (savedId) {
      const found = STREAM_OPTIONS.find(opt => opt.id === savedId);
      if (found) return found;
    }
  }
  return STREAM_OPTIONS[0]; // Default
});

const [customCropTop, setCustomCropTop] = useState(() => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('cropTop');
    if (saved) return parseInt(saved);
  }
  return 0;
});
```

### Funcionalidad 2: Indicador de Calidad/Buffering

**Objetivo:** Mostrar al usuario si el stream está buffeando.

**Implementación:**

#### Paso 1: Agregar estado

```tsx
const [isBuffering, setIsBuffering] = useState(false);
```

#### Paso 2: Agregar indicador visual

```tsx
{/* En el video container, después del loading state */}
{isBuffering && (
  <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-lg text-sm font-semibold flex items-center gap-2">
    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    Buffering...
  </div>
)}
```

**Nota:** Detectar buffering desde un iframe cross-origin es imposible por CORS. Este es solo un placeholder que podrías activar manualmente o con un timeout.

### Funcionalidad 3: Presets de Recorte

**Objetivo:** Botones rápidos para aplicar recortes predefinidos.

**Implementación:**

#### Paso 1: Definir presets

```tsx
const CROP_PRESETS = {
  none: { cropTop: 0, cropBottom: 0, label: 'Sin Recorte' },
  minimal: { cropTop: 50, cropBottom: 10, label: 'Mínimo' },
  balanced: { cropTop: 150, cropBottom: 20, label: 'Balanceado' },
  aggressive: { cropTop: 250, cropBottom: 30, label: 'Agresivo' },
};
```

#### Paso 2: Agregar botones

```tsx
{/* En la sección de controles */}
<div className="flex gap-2 mb-4">
  <span className="text-light-300 text-sm">Presets:</span>
  {Object.entries(CROP_PRESETS).map(([key, preset]) => (
    <button
      key={key}
      onClick={() => {
        setCustomCropTop(preset.cropTop);
        setCustomCropBottom(preset.cropBottom);
      }}
      className="px-3 py-1 bg-dark-800 hover:bg-dark-700 text-light-300 rounded-lg text-xs transition-colors"
    >
      {preset.label}
    </button>
  ))}
</div>
```

### Funcionalidad 4: Chat en Vivo Lateral

**Objetivo:** Mostrar un chat de Discord o Telegram al lado del video.

**Implementación:**

#### Paso 1: Modificar el layout

```tsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
  {/* Video - 2/3 del ancho */}
  <div className="lg:col-span-2">
    <div className="video-container">
      {/* ... contenido del video */}
    </div>
  </div>

  {/* Chat - 1/3 del ancho */}
  <div className="lg:col-span-1">
    <div className="bg-dark-900 rounded-xl border border-dark-700 h-full">
      <iframe
        src="https://discord.com/widget?id=YOUR_SERVER_ID&theme=dark"
        width="100%"
        height="100%"
        allowTransparency={true}
        frameBorder="0"
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      />
    </div>
  </div>
</div>
```

---

## Troubleshooting

### Problema 1: El iframe no carga (página en blanco)

**Causa:** X-Frame-Options del sitio fuente.

**Cómo diagnosticar:**
1. Abre DevTools (F12)
2. Ve a la pestaña Console
3. Busca error: `Refused to display in a frame`

**Soluciones:**
- ❌ No hay solución del lado del cliente
- ✅ Cambiar a otra opción de stream
- ✅ Abrir en nueva pestaña
- ✅ Usar un proxy backend (avanzado)

### Problema 2: El recorte no funciona correctamente

**Causa:** Los valores de cropTop y cropBottom no son correctos para ese sitio.

**Solución:**
1. Activa los controles (⚙️)
2. Ajusta manualmente con los sliders
3. Anota los valores finales
4. Actualiza los defaults en el código:

```tsx
const STREAM_OPTIONS: StreamOption[] = [
  {
    id: 'option1',
    label: 'Opción 1',
    url: '...',
    cropTop: 180,   // ← Valor correcto encontrado
    cropBottom: 25, // ← Valor correcto encontrado
  },
];
```

### Problema 3: Veo publicidad que no puedo quitar

**Causa:** La publicidad está integrada en el stream de video (video ads).

**Diagnóstico:**
- Si la publicidad está **dentro del reproductor** → No se puede quitar con CSS
- Si la publicidad está **en el header/footer** → Usa más recorte

**Solución parcial:**
```tsx
// Aumenta el recorte
cropTop: 300,    // Más agresivo
cropBottom: 40,  // Más agresivo
```

### Problema 4: El iframe se recarga constantemente

**Causa:** El estado `iframeKey` cambia frecuentemente.

**Solución:**
Verifica que solo cambie cuando es necesario:

```tsx
// ✅ Correcto: Solo cambia al presionar reload
const reloadStream = () => {
  setIframeKey((prev) => prev + 1);
};

// ❌ Incorrecto: Cambiaría en cada render
const iframeKey = Math.random();
```

### Problema 5: Los controles no aparecen

**Causa:** El estado `showControls` está en false.

**Solución:**
Cambia el default:

```tsx
// Antes
const [showControls, setShowControls] = useState(false);

// Después
const [showControls, setShowControls] = useState(true); // ← Siempre visible
```

---

## Flujo de Datos Completo

### 1. Inicialización del Componente

```
1. Componente se monta
   ↓
2. useState inicializa estados:
   - selectedOption = STREAM_OPTIONS[0]
   - customCropTop = 0
   - customCropBottom = 0
   - showControls = false
   - isFullscreen = false
   - iframeKey = 0
   - hasError = false
   ↓
3. Renderiza UI inicial
   ↓
4. Iframe comienza a cargar
```

### 2. Usuario Selecciona una Opción

```
Usuario hace clic en "Opción 2"
   ↓
handleOptionChange(STREAM_OPTIONS[1]) se ejecuta
   ↓
setSelectedOption(opción 2)
   ↓
setCustomCropTop(opción 2.cropTop)
   ↓
setCustomCropBottom(opción 2.cropBottom)
   ↓
reloadStream() se ejecuta
   ↓
setIframeKey(prev + 1)  // Incrementa de 0 a 1
   ↓
setHasError(false)
   ↓
React detecta cambio en iframeKey
   ↓
Iframe se desmonta y se vuelve a montar con nueva key
   ↓
Nueva URL se carga en el iframe
```

### 3. Usuario Ajusta el Recorte

```
Usuario mueve slider de cropTop
   ↓
onChange event se dispara
   ↓
setCustomCropTop(nuevoValor)
   ↓
Estado se actualiza
   ↓
React re-renderiza
   ↓
Iframe recibe nuevo style:
  style={{ top: `-${nuevoValor}px`, ... }}
   ↓
CSS se aplica instantáneamente
   ↓
Visual se actualiza (sin recargar iframe)
```

### 4. Ocurre un Error

```
Iframe no puede cargar (X-Frame-Options)
   ↓
onError event se dispara en iframe
   ↓
setHasError(true)
   ↓
Estado se actualiza
   ↓
React re-renderiza
   ↓
Renderiza componente de error en lugar del loading
   ↓
Usuario ve mensaje y botones de acción
```

### 5. Usuario Recarga el Stream

```
Usuario hace clic en botón Reload (🔄)
   ↓
reloadStream() se ejecuta
   ↓
setIframeKey(prev + 1)  // Incrementa key
   ↓
setHasError(false)      // Resetea error
   ↓
React detecta cambio en key
   ↓
Iframe se desmonta y vuelve a montar
   ↓
Stream se recarga desde cero
```

### 6. Modo Pantalla Completa

```
Usuario hace clic en botón Fullscreen (🔲)
   ↓
setIsFullscreen(!isFullscreen)
   ↓
Estado cambia a true
   ↓
React re-renderiza
   ↓
Contenedor cambia className:
  - De: "aspect-video"
  - A: "fixed inset-0 z-50"
   ↓
Video se expande a pantalla completa
```

---

## Checklist de Modificación Segura

Cuando hagas cambios, verifica:

- [ ] ✅ El componente tiene `'use client'` al inicio
- [ ] ✅ Todos los imports están presentes
- [ ] ✅ Los tipos TypeScript son correctos
- [ ] ✅ No hay errores de sintaxis
- [ ] ✅ Los estados se actualizan correctamente
- [ ] ✅ El iframe tiene el atributo `key={iframeKey}`
- [ ] ✅ Las URLs de stream son válidas
- [ ] ✅ Los valores de recorte son números
- [ ] ✅ Build pasa: `npm run build`
- [ ] ✅ Prueba en el navegador: `npm run dev`

---

## Comandos Útiles

```bash
# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build

# Ver errores de TypeScript
npm run type-check

# Ver errores de linting
npm run lint

# Limpiar caché de Next.js
rm -rf .next
```

---

## Contacto y Soporte

Si después de leer esta guía aún tienes dudas, verifica:

1. **LIVESTREAM_DOCS.md** - Documentación técnica profunda
2. **LIVESTREAM_README.md** - Guía de usuario rápida
3. **Console del navegador** - Errores en tiempo real
4. **Next.js DevTools** - Inspecciona componentes

---

_Última actualización: 03 de Enero, 2026_
_Versión del componente: 1.0.0_
_Compatible con: Next.js 14.2.35, React 18, TypeScript 5_
