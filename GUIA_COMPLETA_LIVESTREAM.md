# 🎥 Guía Completa: Sistema de Livestream con Bypass de X-Frame-Options

## 📚 Índice

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [El Problema: X-Frame-Options](#el-problema-x-frame-options)
3. [La Solución: Proxy Backend](#la-solución-proxy-backend)
4. [Arquitectura del Sistema](#arquitectura-del-sistema)
5. [Implementación Paso a Paso](#implementación-paso-a-paso)
6. [Código Completo](#código-completo)
7. [Cómo Replicar en Otro Proyecto](#cómo-replicar-en-otro-proyecto)
8. [Troubleshooting](#troubleshooting)
9. [Optimizaciones y Mejoras](#optimizaciones-y-mejoras)

---

## Resumen Ejecutivo

Este documento explica **cómo implementar un sistema completo de transmisión en vivo** que bypasea las restricciones de X-Frame-Options mediante un proxy backend.

### ✅ Lo que lograrás:
- Incrustar streams de sitios externos que normalmente bloquean iframes
- Eliminar código JavaScript anti-iframe automáticamente
- Remover scripts de publicidad molestos
- Sistema de recorte CSS para ocultar elementos no deseados
- Múltiples opciones de streaming con cambio instantáneo
- Controles ajustables en tiempo real

### 🛠️ Stack Tecnológico:
- **Framework**: Next.js 14+ (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Iconos**: Lucide React
- **Server-Side**: Next.js API Routes

---

## El Problema: X-Frame-Options

### ¿Qué es X-Frame-Options?

Es un **header HTTP** que los servidores envían para controlar si su contenido puede ser mostrado en un iframe.

```http
X-Frame-Options: DENY
```

Este header le dice al navegador: **"NO permitas que este contenido sea mostrado en un iframe"**

### Ejemplo del Problema

Si intentas hacer esto:

```tsx
// ❌ ESTO NO FUNCIONARÁ
<iframe src="https://www.tvplusgratis2.com/live/daznf1.php" />
```

**Resultado**: Página en blanco + error en consola:

```
Refused to display 'https://www.tvplusgratis2.com/live/daznf1.php'
in a frame because it set 'X-Frame-Options' to 'deny'.
```

### Código Anti-Iframe Adicional

Además del header, muchos sitios incluyen JavaScript para detectar iframes:

```javascript
// Código que encontrarás en el sitio original
if (top.location !== self.location) {
  // Detectó que está en un iframe
  top.location = 'https://www.tvporinternet2.com'; // Redirige
}
```

**Resultado**: El iframe se redirige a otro sitio automáticamente.

### ❌ Soluciones que NO Funcionan

1. **Iframe directo**: Bloqueado por X-Frame-Options
2. **Fetch desde el cliente**: Bloqueado por CORS
3. **Cambiar headers del cliente**: Imposible desde JavaScript
4. **Deshabilitar JavaScript del iframe**: Rompe el reproductor de video

---

## La Solución: Proxy Backend

### Concepto Clave

**No puedes cambiar los headers que el navegador recibe, pero SÍ puedes controlar lo que tu propio servidor envía.**

### Flujo de Datos

```
┌─────────────────────────────────────────────────────────────────┐
│                        FLUJO COMPLETO                           │
└─────────────────────────────────────────────────────────────────┘

1. CLIENTE (Navegador del usuario)
   │
   │ Request: /api/stream-proxy?url=https://tvplusgratis2.com/...
   ▼
2. TU SERVIDOR (Next.js API Route)
   │
   │ Fetchea contenido desde: tvplusgratis2.com
   │ ↓ Recibe HTML con X-Frame-Options: DENY
   │ ↓
   │ ✂️ LIMPIEZA DEL HTML:
   │    • Elimina: if (top.location !== self.location) {...}
   │    • Elimina: Scripts de publicidad (bvtpk.com, push-sdk.com)
   │    • Elimina: parent.location redirects
   │    • Inyecta: <base href="https://tvplusgratis2.com/">
   │    • Inyecta: CSS para ocultar ads
   │ ↓
   │ 📤 SIRVE HTML LIMPIO CON HEADERS PERMISIVOS:
   │    X-Frame-Options: ALLOWALL
   │    Content-Security-Policy: frame-ancestors 'self' *
   │    Access-Control-Allow-Origin: *
   ▼
3. IFRAME EN TU PÁGINA
   └─ Carga contenido desde TU dominio
   └─ Sin restricciones de X-Frame-Options
   └─ Sin código anti-iframe
   └─ ✅ FUNCIONA PERFECTAMENTE
```

### Por Qué Funciona

1. **El navegador hace request a TU servidor** (mismo dominio, sin CORS)
2. **Tu servidor fetchea el contenido** (servidor a servidor, sin restricciones de navegador)
3. **Tu servidor limpia el HTML** (elimina código problemático)
4. **Tu servidor envía headers permisivos** (permite embedding)
5. **El navegador carga el iframe sin problemas** (viene de tu dominio, headers permiten iframe)

---

## Arquitectura del Sistema

### Estructura de Archivos

```
tu-proyecto/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── stream-proxy/
│   │   │       └── route.ts          ← ⭐ PROXY BACKEND (API Route)
│   │   └── live/
│   │       └── page.tsx              ← Página de transmisión
│   └── components/
│       └── features/
│           └── LiveStreamWidget.tsx  ← ⭐ COMPONENTE PRINCIPAL
└── GUIA_COMPLETA_LIVESTREAM.md      ← Este documento
```

### Componentes del Sistema

1. **API Route Proxy** (`/api/stream-proxy/route.ts`)
   - Fetchea contenido del sitio original
   - Limpia HTML (elimina anti-iframe)
   - Inyecta headers permisivos
   - Devuelve HTML limpio

2. **LiveStreamWidget** (`components/features/LiveStreamWidget.tsx`)
   - UI con controles
   - Sistema de recorte CSS
   - Manejo de múltiples opciones
   - Estados de loading/error

3. **Página Live** (`app/live/page.tsx`)
   - Contenedor de la página
   - Información adicional
   - Consejos de uso

---

## Implementación Paso a Paso

### Paso 1: Crear el API Route Proxy

Este es el **corazón del sistema**. Crea el archivo que manejará el bypass de X-Frame-Options.

**Ubicación**: `src/app/api/stream-proxy/route.ts`

```typescript
/**
 * Stream Proxy API Route
 *
 * Este proxy resuelve X-Frame-Options fetcheando contenido desde el servidor,
 * limpiándolo, y sirviéndolo desde nuestro dominio con headers permisivos.
 */

import { NextRequest, NextResponse } from 'next/server';

// ⚙️ CONFIGURACIÓN: Dominios permitidos (whitelist de seguridad)
const ALLOWED_DOMAINS = [
  'tvplusgratis2.com',
  'tvporinternet2.com',
  'embed.ksdjugfsddeports.com',
];

// 🚫 Scripts que debemos bloquear (anti-iframe, publicidad)
const BLOCKED_SCRIPT_PATTERNS = [
  /top\.location\s*!==?\s*self\.location/gi,
  /top\.location\s*!=\s*location/gi,
  /top\s*!==?\s*self/gi,
  /parent\.location/gi,
  /bvtpk\.com/gi,
  /push-sdk\.com/gi,
  /tvporinternet2\.com/gi,
];

// 📥 GET Request Handler
export async function GET(request: NextRequest) {
  try {
    // 1️⃣ Obtener la URL del stream desde query params
    const searchParams = request.nextUrl.searchParams;
    const streamUrl = searchParams.get('url');

    if (!streamUrl) {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 }
      );
    }

    // 2️⃣ Validar que la URL sea de un dominio permitido
    const url = new URL(streamUrl);
    const isAllowed = ALLOWED_DOMAINS.some(domain =>
      url.hostname.includes(domain)
    );

    if (!isAllowed) {
      return NextResponse.json(
        { error: 'Domain not allowed' },
        { status: 403 }
      );
    }

    console.log(`[Stream Proxy] Fetching: ${streamUrl}`);

    // 3️⃣ Fetchear el contenido desde el servidor
    const response = await fetch(streamUrl, {
      headers: {
        // Simular un navegador real
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
        'Referer': 'https://www.tvplusgratis2.com/',
      },
    });

    if (!response.ok) {
      console.error(`[Stream Proxy] Fetch failed: ${response.status}`);
      return NextResponse.json(
        { error: `Failed to fetch stream: ${response.status}` },
        { status: response.status }
      );
    }

    // 4️⃣ Obtener el HTML
    let html = await response.text();
    console.log(`[Stream Proxy] Fetched ${html.length} bytes`);

    // 5️⃣ Limpiar el HTML
    html = cleanHTML(html);

    // 6️⃣ Crear respuesta con headers permisivos
    const proxyResponse = new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        // ✅ PERMITIR EMBEDDING
        'X-Frame-Options': 'ALLOWALL',
        'Content-Security-Policy': "frame-ancestors 'self' *",
        // ✅ CORS PERMISIVO
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        // ⏱️ CACHE (5 minutos)
        'Cache-Control': 'public, max-age=300',
      },
    });

    console.log(`[Stream Proxy] Serving cleaned HTML`);
    return proxyResponse;

  } catch (error) {
    console.error('[Stream Proxy] Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to proxy stream',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * 🧹 Función de Limpieza del HTML
 *
 * Elimina código anti-iframe y scripts bloqueados
 */
function cleanHTML(html: string): string {
  let cleaned = html;

  // 1️⃣ Eliminar código JavaScript de detección de iframe
  BLOCKED_SCRIPT_PATTERNS.forEach(pattern => {
    cleaned = cleaned.replace(pattern, '// [REMOVED BY PROXY]');
  });

  // 2️⃣ Eliminar scripts específicos bloqueados (por dominio)
  cleaned = cleaned.replace(
    /<script[^>]*src=["']https?:\/\/(bvtpk\.com|push-sdk\.com)[^"']*["'][^>]*>[\s\S]*?<\/script>/gi,
    '<!-- [BLOCKED SCRIPT REMOVED BY PROXY] -->'
  );

  // 3️⃣ Eliminar inline scripts con redirecciones
  cleaned = cleaned.replace(
    /<script[^>]*>([\s\S]*?top\.location[\s\S]*?)<\/script>/gi,
    '<!-- [REDIRECT SCRIPT REMOVED BY PROXY] -->'
  );

  // 4️⃣ Inyectar base tag (para rutas relativas)
  const baseUrl = 'https://www.tvplusgratis2.com/';
  if (!cleaned.includes('<base')) {
    cleaned = cleaned.replace(
      /<head>/i,
      `<head>\n  <base href="${baseUrl}">`
    );
  }

  // 5️⃣ Inyectar CSS para ocultar ads
  const injectedStyles = `
    <style>
      /* Estilos inyectados por el proxy */
      body {
        margin: 0;
        padding: 0;
        overflow: hidden;
      }

      /* Ocultar ads */
      [class*="banner"],
      [class*="ad-"],
      [id*="ad-"],
      .advertisement {
        display: none !important;
      }
    </style>
  `;

  cleaned = cleaned.replace(
    /<\/head>/i,
    `${injectedStyles}\n</head>`
  );

  return cleaned;
}

// 🔧 Manejar preflight requests (CORS)
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    },
  });
}
```

### Paso 2: Crear el Componente LiveStreamWidget

**Ubicación**: `src/components/features/LiveStreamWidget.tsx`

```tsx
'use client';

import { useState, useEffect } from 'react';
import { Tv, AlertCircle, Settings, RefreshCw, Maximize2, Minimize2 } from 'lucide-react';

/**
 * 🎥 LiveStreamWidget - Componente para incrustar transmisión en vivo
 *
 * Usa proxy backend para bypasear X-Frame-Options
 */

interface StreamOption {
  id: string;
  label: string;
  url: string;           // URL del proxy: /api/stream-proxy?url=...
  originalUrl: string;   // URL original para abrir en nueva pestaña
  cropTop: number;       // Recorte CSS superior (px)
  cropBottom: number;    // Altura extra (%)
}

// 🌐 URLs originales del sitio
const BASE_URLS = {
  option1: 'https://www.tvplusgratis2.com/live/daznf1.php',
  option2: 'https://www.tvplusgratis2.com/live2/daznf1.php',
  option3: 'https://www.tvplusgratis2.com/live3/daznf1.php',
  option4: 'https://www.tvplusgratis2.com/live4/daznf1.php',
  option5: 'https://www.tvplusgratis2.com/live5/daznf1.php',
  option6: 'https://www.tvplusgratis2.com/live6/daznf1.php',
};

// 📺 Opciones de streaming (usando el proxy)
const STREAM_OPTIONS: StreamOption[] = [
  {
    id: 'option1',
    label: 'Opción 1',
    url: `/api/stream-proxy?url=${encodeURIComponent(BASE_URLS.option1)}`,
    originalUrl: BASE_URLS.option1,
    cropTop: 0,
    cropBottom: 0,
  },
  {
    id: 'option2',
    label: 'Opción 2',
    url: `/api/stream-proxy?url=${encodeURIComponent(BASE_URLS.option2)}`,
    originalUrl: BASE_URLS.option2,
    cropTop: 0,
    cropBottom: 0,
  },
  {
    id: 'option3',
    label: 'Opción 3',
    url: `/api/stream-proxy?url=${encodeURIComponent(BASE_URLS.option3)}`,
    originalUrl: BASE_URLS.option3,
    cropTop: 0,
    cropBottom: 0,
  },
  {
    id: 'option4',
    label: 'Opción 4',
    url: `/api/stream-proxy?url=${encodeURIComponent(BASE_URLS.option4)}`,
    originalUrl: BASE_URLS.option4,
    cropTop: 0,
    cropBottom: 0,
  },
  {
    id: 'option5',
    label: 'Opción 5',
    url: `/api/stream-proxy?url=${encodeURIComponent(BASE_URLS.option5)}`,
    originalUrl: BASE_URLS.option5,
    cropTop: 0,
    cropBottom: 0,
  },
  {
    id: 'option6',
    label: 'Opción 6',
    url: `/api/stream-proxy?url=${encodeURIComponent(BASE_URLS.option6)}`,
    originalUrl: BASE_URLS.option6,
    cropTop: 0,
    cropBottom: 0,
  },
];

export default function LiveStreamWidget() {
  // 📊 Estados
  const [selectedOption, setSelectedOption] = useState<StreamOption>(STREAM_OPTIONS[0]);
  const [customCropTop, setCustomCropTop] = useState(0);
  const [customCropBottom, setCustomCropBottom] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 🔄 Recargar iframe
  const reloadStream = () => {
    setIframeKey((prev) => prev + 1);
    setHasError(false);
    setIsLoading(true);
  };

  // 🔀 Cambiar opción de stream
  const handleOptionChange = (option: StreamOption) => {
    setSelectedOption(option);
    setCustomCropTop(option.cropTop);
    setCustomCropBottom(option.cropBottom);
    setIsLoading(true);
    setHasError(false);
    reloadStream();
  };

  // ✅ Iframe cargó correctamente
  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  // ❌ Error al cargar iframe
  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // ⏱️ Timeout: detectar si el iframe no carga
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        setHasError(true);
      }
    }, 15000); // 15 segundos

    return () => clearTimeout(timeout);
  }, [iframeKey, isLoading]);

  return (
    <div className="bg-dark-900 rounded-2xl border border-dark-700 overflow-hidden shadow-2xl">
      {/* 🎯 HEADER */}
      <div className="bg-dark-950 border-b border-dark-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent-red-500/10 rounded-lg">
            <Tv className="w-5 h-5 text-accent-red-500" />
          </div>
          <div>
            <h3 className="text-light-50 font-heading font-bold text-lg">
              Transmisión en Vivo - DAZN F1
            </h3>
            <p className="text-light-400 text-xs">
              {selectedOption.label} • En vivo
            </p>
          </div>
        </div>

        {/* 🎛️ CONTROLES */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowControls(!showControls)}
            className="p-2 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors"
            title="Ajustes de recorte"
          >
            <Settings className="w-4 h-4 text-light-300" />
          </button>
          <button
            onClick={reloadStream}
            className="p-2 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors"
            title="Recargar stream"
          >
            <RefreshCw className="w-4 h-4 text-light-300" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors"
            title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 text-light-300" />
            ) : (
              <Maximize2 className="w-4 h-4 text-light-300" />
            )}
          </button>
        </div>
      </div>

      {/* ✅ BANNER DE ÉXITO */}
      <div className="bg-green-500/10 border-b border-green-500/20 px-4 py-2 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
        <p className="text-green-200 text-xs">
          <strong>Sistema mejorado:</strong> Esta transmisión usa un proxy backend que bypasea X-Frame-Options.
        </p>
      </div>

      {/* 📑 TABS DE OPCIONES */}
      <div className="bg-dark-950 border-b border-dark-700 px-4 py-2 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {STREAM_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionChange(option)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                selectedOption.id === option.id
                  ? 'bg-accent-red-500 text-white'
                  : 'bg-dark-800 text-light-300 hover:bg-dark-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* ⚙️ CONTROLES DE RECORTE (Condicional) */}
      {showControls && (
        <div className="bg-dark-950 border-b border-dark-700 px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-light-300 text-sm mb-2 block">
                Recorte Superior (px)
              </label>
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={customCropTop}
                onChange={(e) => setCustomCropTop(parseInt(e.target.value))}
                className="w-full accent-accent-red-500"
              />
              <span className="text-light-400 text-xs">{customCropTop}px</span>
            </div>
            <div>
              <label className="text-light-300 text-sm mb-2 block">
                Altura Extra (%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={customCropBottom}
                onChange={(e) => setCustomCropBottom(parseInt(e.target.value))}
                className="w-full accent-accent-red-500"
              />
              <span className="text-light-400 text-xs">{customCropBottom}%</span>
            </div>
          </div>
          <p className="text-light-400 text-xs">
            💡 Ajusta estos valores para ocultar menús o publicidad
          </p>
        </div>
      )}

      {/* 📺 CONTENEDOR DEL VIDEO */}
      <div
        className={`relative bg-black ${
          isFullscreen ? 'fixed inset-0 z-50' : 'aspect-video'
        }`}
        style={{ overflow: 'hidden' }}
      >
        {/* ⏳ LOADING STATE */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-dark-950/50 z-10">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-accent-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-light-300 text-sm">Cargando transmisión...</p>
            </div>
          </div>
        )}

        {/* ❌ ERROR STATE */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-dark-950 z-20">
            <div className="text-center max-w-md px-4">
              <AlertCircle className="w-16 h-16 text-accent-red-500 mx-auto mb-4" />
              <h4 className="text-light-50 font-bold text-lg mb-2">
                No se pudo cargar la transmisión
              </h4>
              <p className="text-light-400 text-sm mb-4">
                <strong>Posibles causas:</strong><br />
                • El proxy no pudo conectarse al sitio<br />
                • La transmisión no está disponible<br />
                • Problemas de conexión
              </p>
              <div className="space-y-2">
                <button
                  onClick={reloadStream}
                  className="w-full px-4 py-2 bg-accent-red-500 hover:bg-accent-red-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Reintentar
                </button>
                <a
                  href={selectedOption.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-2 bg-dark-800 hover:bg-dark-700 text-light-50 rounded-lg font-semibold transition-colors"
                >
                  Abrir en sitio original
                </a>
              </div>
            </div>
          </div>
        )}

        {/* 🎬 IFRAME - Técnica de Recorte CSS */}
        <iframe
          key={iframeKey}
          src={selectedOption.url}
          className="absolute left-0 right-0 border-0"
          style={{
            top: `-${customCropTop}px`,
            width: '100%',
            height: `calc(100% + ${customCropTop}px + ${customCropBottom}%)`,
          }}
          sandbox="allow-scripts allow-same-origin allow-presentation allow-forms"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          title="Live Stream"
        />
      </div>

      {/* ⚖️ FOOTER LEGAL */}
      <div className="bg-dark-950 border-t border-dark-700 px-4 py-3">
        <p className="text-light-400 text-xs text-center">
          ⚠️ Contenido de terceros. Esta aplicación no aloja ni distribuye el contenido.
        </p>
      </div>
    </div>
  );
}
```

### Paso 3: Crear la Página Live

**Ubicación**: `src/app/live/page.tsx`

```tsx
import { Radio } from 'lucide-react';
import LiveStreamWidget from '@/components/features/LiveStreamWidget';

export const metadata = {
  title: 'Transmisión en Vivo - F1 App',
  description: 'Mira la Fórmula 1 en vivo',
};

export default function LivePage() {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* 🎯 HEADER DE PÁGINA */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Radio className="w-8 h-8 text-accent-red-500 animate-pulse" />
            <h1 className="text-4xl font-heading font-bold text-light-50">
              Transmisión en Vivo
            </h1>
          </div>
          <p className="text-light-400">
            Mira la Fórmula 1 en directo desde nuestra aplicación
          </p>
        </div>

        {/* 📺 WIDGET DE LIVESTREAM */}
        <div className="mb-8">
          <LiveStreamWidget />
        </div>

        {/* 📊 TARJETAS INFORMATIVAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-dark-900 border border-dark-700 rounded-xl p-6">
            <h3 className="text-light-50 font-bold text-lg mb-2 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Múltiples Opciones
            </h3>
            <p className="text-light-300 text-sm">
              Cambia entre diferentes servidores si uno no funciona.
            </p>
          </div>

          <div className="bg-dark-900 border border-dark-700 rounded-xl p-6">
            <h3 className="text-light-50 font-bold text-lg mb-2 flex items-center gap-2">
              <span className="text-2xl">⚙️</span>
              Controles Ajustables
            </h3>
            <p className="text-light-300 text-sm">
              Usa los controles para ocultar publicidad del stream.
            </p>
          </div>

          <div className="bg-dark-900 border border-dark-700 rounded-xl p-6">
            <h3 className="text-light-50 font-bold text-lg mb-2 flex items-center gap-2">
              <span className="text-2xl">🔄</span>
              Recargar Fácil
            </h3>
            <p className="text-light-300 text-sm">
              Si el stream se detiene, recárgalo con un clic.
            </p>
          </div>
        </div>

        {/* 📋 NOTAS TÉCNICAS */}
        <div className="mt-8 bg-dark-950 border border-dark-700 rounded-xl p-6">
          <h3 className="text-light-50 font-bold text-lg mb-4">
            📋 Cómo Funciona el Sistema
          </h3>
          <div className="space-y-3 text-light-300 text-sm">
            <div className="flex gap-3">
              <span className="text-accent-cyan">•</span>
              <p>
                <strong>Proxy Backend:</strong> Nuestro servidor fetchea el contenido y elimina restricciones de iframe.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-accent-cyan">•</span>
              <p>
                <strong>Bypass X-Frame-Options:</strong> El proxy inyecta headers permisivos que permiten el embedding.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-accent-cyan">•</span>
              <p>
                <strong>Limpieza Automática:</strong> Se eliminan scripts anti-iframe y publicidad molesta.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-accent-cyan">•</span>
              <p>
                <strong>Sandbox Security:</strong> El iframe tiene restricciones para bloquear popups.
              </p>
            </div>
          </div>
        </div>

        {/* 💡 CONSEJOS */}
        <div className="mt-8 bg-gradient-to-r from-accent-red-500/10 to-accent-cyan/10 border border-accent-red-500/20 rounded-xl p-6">
          <h3 className="text-light-50 font-bold text-lg mb-4">
            💡 Consejos
          </h3>
          <ul className="space-y-2 text-light-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-accent-gold mt-1">1.</span>
              <span>Si el stream no carga, prueba con otra opción (1-6).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-gold mt-1">2.</span>
              <span>Usa los controles (⚙️) para ajustar el recorte y ocultar publicidad.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-gold mt-1">3.</span>
              <span>El botón de pantalla completa mejora la experiencia.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
```

---

## Código Completo

Ya tienes los 3 archivos principales:

1. ✅ **API Route Proxy**: `src/app/api/stream-proxy/route.ts`
2. ✅ **LiveStreamWidget**: `src/components/features/LiveStreamWidget.tsx`
3. ✅ **Página Live**: `src/app/live/page.tsx`

---

## Cómo Replicar en Otro Proyecto

### Requisitos Previos

```json
// package.json - Asegúrate de tener:
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "lucide-react": "^0.263.0"
  }
}
```

### Pasos de Instalación

#### 1. Instalar dependencias (si no las tienes)

```bash
npm install lucide-react
```

#### 2. Copiar los archivos

```bash
# Crea las carpetas necesarias
mkdir -p src/app/api/stream-proxy
mkdir -p src/app/live
mkdir -p src/components/features

# Copia los archivos (ajusta las rutas según tu estructura)
# - route.ts → src/app/api/stream-proxy/
# - LiveStreamWidget.tsx → src/components/features/
# - page.tsx → src/app/live/
```

#### 3. Ajustar las URLs de streaming

En `LiveStreamWidget.tsx`, modifica `BASE_URLS` si quieres usar otros sitios:

```typescript
const BASE_URLS = {
  option1: 'https://tu-sitio-de-streaming.com/stream1.php',
  option2: 'https://tu-sitio-de-streaming.com/stream2.php',
  // ...
};
```

#### 4. Actualizar la whitelist en el proxy

En `route.ts`, agrega los dominios permitidos:

```typescript
const ALLOWED_DOMAINS = [
  'tvplusgratis2.com',
  'tu-sitio-de-streaming.com', // ← Agregar aquí
];
```

#### 5. Ajustar estilos Tailwind (opcional)

Si tus clases de Tailwind son diferentes, reemplaza:

```tsx
// ANTES:
bg-dark-900 text-light-50 border-dark-700

// POR:
bg-gray-900 text-white border-gray-700
```

#### 6. Agregar enlace en navegación (opcional)

En tu `Navbar.tsx`:

```tsx
const navLinks = [
  // ...
  { href: '/live', label: '🔴 En Vivo' },
];
```

#### 7. Probar

```bash
npm run dev
```

Navega a: `http://localhost:3000/live`

---

## Troubleshooting

### Problema 1: "Failed to fetch stream: 500"

**Causa**: El sitio original bloqueó tu servidor o está caído.

**Solución**:
- Verifica que el sitio esté accesible en un navegador
- Revisa los logs del servidor: `console.log` en `route.ts`
- Prueba con otra opción de streaming

### Problema 2: Iframe muestra página en blanco

**Causa**: El dominio no está en la whitelist.

**Solución**:
```typescript
// route.ts
const ALLOWED_DOMAINS = [
  'tvplusgratis2.com',
  'tu-nuevo-dominio.com', // ← Agregar
];
```

### Problema 3: "Domain not allowed"

**Causa**: Intentaste usar una URL no permitida.

**Solución**: Agrega el dominio a `ALLOWED_DOMAINS`

### Problema 4: El video no se reproduce

**Causa**: El player de video tiene restricciones CORS en sus recursos.

**Solución**:
1. Verifica que el `base` tag esté correcto
2. Ajusta los controles de recorte CSS
3. Revisa la consola del navegador para errores

### Problema 5: Aparece mucha publicidad

**Causa**: La publicidad está integrada en el video.

**Solución**:
- Ajusta los controles de recorte (⚙️)
- Algunos ads no se pueden eliminar con CSS
- Considera agregar más patrones a `BLOCKED_SCRIPT_PATTERNS`

---

## Optimizaciones y Mejoras

### 1. Agregar Rate Limiting

```typescript
// route.ts
import { Ratelimit } from '@upstash/ratelimit';

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, '1 m'),
});

export async function GET(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  // ... resto del código
}
```

### 2. Cache con Redis

```typescript
// route.ts
import { redis } from '@/lib/redis';

export async function GET(request: NextRequest) {
  const streamUrl = searchParams.get('url');

  // Intentar obtener del cache
  const cached = await redis.get(`stream:${streamUrl}`);
  if (cached) {
    return new NextResponse(cached as string, { /* headers */ });
  }

  // Fetch y guardar en cache
  const html = await fetchAndClean(streamUrl);
  await redis.set(`stream:${streamUrl}`, html, { ex: 600 }); // 10 min

  return new NextResponse(html, { /* headers */ });
}
```

### 3. Guardar Preferencias del Usuario

```tsx
// LiveStreamWidget.tsx
useEffect(() => {
  localStorage.setItem('preferredStream', selectedOption.id);
  localStorage.setItem('cropTop', customCropTop.toString());
}, [selectedOption, customCropTop]);

// Al iniciar
const [selectedOption, setSelectedOption] = useState<StreamOption>(() => {
  if (typeof window !== 'undefined') {
    const savedId = localStorage.getItem('preferredStream');
    if (savedId) {
      return STREAM_OPTIONS.find(o => o.id === savedId) || STREAM_OPTIONS[0];
    }
  }
  return STREAM_OPTIONS[0];
});
```

### 4. Agregar Más Patrones de Bloqueo

```typescript
// route.ts
const BLOCKED_SCRIPT_PATTERNS = [
  /top\.location\s*!==?\s*self\.location/gi,
  /parent\.location/gi,
  /bvtpk\.com/gi,
  /push-sdk\.com/gi,
  // ⬇️ NUEVOS PATRONES
  /window\.open\(/gi,                    // Bloquear popups
  /document\.write/gi,                   // Bloquear document.write
  /eval\(/gi,                            // Bloquear eval (peligroso)
  /\.createElement\(['"]script['"]\)/gi, // Bloquear creación dinámica de scripts
];
```

### 5. Modo Picture-in-Picture

```tsx
// LiveStreamWidget.tsx
const [isPiP, setIsPiP] = useState(false);

const togglePiP = async () => {
  const video = document.querySelector('video');
  if (video && !isPiP) {
    await video.requestPictureInPicture();
    setIsPiP(true);
  } else if (document.pictureInPictureElement) {
    await document.exitPictureInPicture();
    setIsPiP(false);
  }
};

// Botón
<button onClick={togglePiP}>
  {isPiP ? 'Salir PiP' : 'Picture-in-Picture'}
</button>
```

---

## 🎓 Explicación de Conceptos Clave

### ¿Qué hace `encodeURIComponent`?

```javascript
// ANTES
const url = 'https://site.com/stream?id=123&lang=es';

// DESPUÉS de encodeURIComponent
const encoded = 'https%3A%2F%2Fsite.com%2Fstream%3Fid%3D123%26lang%3Des';

// USO
const proxyUrl = `/api/stream-proxy?url=${encodeURIComponent(url)}`;
// Resultado: /api/stream-proxy?url=https%3A%2F%2Fsite.com%2Fstream%3Fid%3D123%26lang%3Des
```

**Por qué**: Los caracteres especiales (`:`, `/`, `?`, `&`) deben ser "escapados" para pasarlos como parámetro en una URL.

### ¿Qué es `sandbox` en el iframe?

```tsx
<iframe sandbox="allow-scripts allow-same-origin allow-presentation allow-forms" />
```

**Controla qué puede hacer el contenido del iframe:**

- `allow-scripts` → Permite ejecutar JavaScript (necesario para el player)
- `allow-same-origin` → Permite acceso a cookies y localStorage
- `allow-presentation` → Permite modo presentación/fullscreen
- `allow-forms` → Permite enviar formularios

**NO incluidos (bloqueados por defecto):**
- `allow-popups` → Bloquea popups automáticos ✅
- `allow-top-navigation` → Bloquea redirecciones al parent ✅
- `allow-modals` → Bloquea `alert()`, `confirm()` ✅

### ¿Cómo funciona el Recorte CSS?

**Técnica: "Overflow Hidden + Márgenes Negativos"**

```tsx
// CONTENEDOR (Máscara)
<div style={{ overflow: 'hidden', height: '500px' }}>

  // IFRAME (Más grande, desplazado hacia arriba)
  <iframe
    style={{
      top: '-100px',                    // Mueve 100px arriba
      height: 'calc(100% + 100px + 20%)', // Compensa
    }}
  />
</div>
```

**Visualización:**

```
┌────────────────────────┐  ← CONTENEDOR (500px alto)
│                        │
│  🚫 Header (oculto)    │  ← top: -100px lo sube
├────────────────────────┤
│  ✅ VIDEO (visible)    │  ← Queda dentro del contenedor
│                        │
│                        │
└────────────────────────┘
   🚫 Footer (oculto)       ← height extra lo baja
```

**Resultado**: Solo ves el video, el header y footer quedan fuera.

---

## 📚 Recursos Adicionales

### Headers HTTP Importantes

```http
X-Frame-Options: DENY
→ No permite iframes

X-Frame-Options: SAMEORIGIN
→ Solo permite iframes del mismo dominio

X-Frame-Options: ALLOWALL
→ Permite iframes de cualquier dominio ✅ (usado en el proxy)

Content-Security-Policy: frame-ancestors 'self' *
→ Política de seguridad que permite embedding ✅
```

### CORS Explicado

```
┌─────────────┐   Request   ┌──────────────┐
│   Browser   │ ─────────→  │ Otro Dominio │
│ (localhost) │             │ (sitio.com)  │
└─────────────┘   ← ❌ CORS  └──────────────┘
                    Blocked

┌─────────────┐   Request   ┌──────────────┐   Request   ┌──────────────┐
│   Browser   │ ─────────→  │  Tu Servidor │ ─────────→  │ Otro Dominio │
│ (localhost) │   ✅ OK     │   (proxy)    │   ✅ OK     │ (sitio.com)  │
└─────────────┘             └──────────────┘             └──────────────┘
```

**CORS solo aplica en el navegador**, servidor-a-servidor no tiene restricciones.

---

## 🎉 Conclusión

Ahora tienes un **sistema completo de livestream** que:

✅ **Bypasea X-Frame-Options** mediante proxy backend
✅ **Elimina código anti-iframe** automáticamente
✅ **Remueve publicidad** con patrones de bloqueo
✅ **Sistema de recorte CSS** para ajustes manuales
✅ **Múltiples opciones** de streaming
✅ **Controles en tiempo real**
✅ **Manejo de errores robusto**
✅ **Fácil de replicar** en otros proyectos

### Archivos Creados

1. `src/app/api/stream-proxy/route.ts` - Proxy backend
2. `src/components/features/LiveStreamWidget.tsx` - Componente UI
3. `src/app/live/page.tsx` - Página de transmisión

### Próximos Pasos

1. Implementa rate limiting para proteger tu servidor
2. Agrega cache con Redis para mejor rendimiento
3. Guarda preferencias del usuario con localStorage
4. Experimenta con más patrones de bloqueo
5. Personaliza los estilos según tu diseño

---

**Documentación creada**: 6 de Enero, 2026
**Versión**: 2.0.0 - Proxy Backend Completo
**Autor**: Guía Completa para Implementación

¡Éxito con tu implementación! 🚀
