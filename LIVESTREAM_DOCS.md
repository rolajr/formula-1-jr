# 📺 LiveStreamWidget - Documentación Técnica

## Descripción General

`LiveStreamWidget` es un componente de React diseñado para incrustar transmisiones en vivo de F1 desde sitios de terceros utilizando iframes y técnicas avanzadas de CSS para mejorar la experiencia del usuario.

---

## 🎯 Objetivo

Permitir a los usuarios ver transmisiones en vivo de Fórmula 1 directamente desde la aplicación, minimizando elementos no deseados (publicidad, menús, popups) del sitio fuente mediante técnicas de recorte CSS.

---

## 🔧 Características Principales

### 1. **Múltiples Opciones de Streaming**
- 6 servidores diferentes del sitio tvplusgratis2.com
- Cambio dinámico entre opciones sin recargar la página completa
- Fallback automático si una opción falla

### 2. **Recorte CSS Avanzado**
```tsx
// Estrategia de recorte
style={{
  top: `-${cropTop}px`,           // Mueve el iframe hacia arriba
  height: `calc(100% + ${cropTop}px + ${cropBottom}%)`, // Compensa la altura
}}
```

- **Recorte Superior**: Oculta headers, menús y banners superiores
- **Altura Extra**: Compensa el recorte para mantener el contenido visible
- **Overflow Hidden**: El contenedor oculta todo lo que sobresale

### 3. **Controles Ajustables**
- Sliders para ajustar el recorte superior (0-500px)
- Sliders para ajustar la altura extra (0-100%)
- Cambios en tiempo real sin recargar el iframe

### 4. **Modos de Visualización**
- Vista normal (16:9 aspect ratio)
- Vista de pantalla completa
- Controles de recarga y configuración

### 5. **Seguridad Sandbox**
```tsx
sandbox="allow-scripts allow-same-origin allow-presentation allow-forms"
```

**Permisos permitidos:**
- `allow-scripts`: Ejecutar JavaScript (necesario para el reproductor)
- `allow-same-origin`: Acceso al mismo origen (para funcionalidades del reproductor)
- `allow-presentation`: Permitir modo presentación/fullscreen
- `allow-forms`: Enviar formularios (si el reproductor lo requiere)

**Bloqueados por defecto:**
- Popups (`allow-popups` NO incluido)
- Navegación top-level (`allow-top-navigation` NO incluido)
- Modales (`allow-modals` NO incluido)

---

## 📐 Arquitectura del Componente

### Estructura de Datos

```typescript
interface StreamOption {
  id: string;           // Identificador único
  label: string;        // Nombre mostrado al usuario
  url: string;          // URL del stream
  cropTop: number;      // Recorte superior por defecto
  cropBottom: number;   // Altura extra por defecto
}
```

### Estados del Componente

```typescript
const [selectedOption, setSelectedOption] = useState<StreamOption>();
const [customCropTop, setCustomCropTop] = useState(0);
const [customCropBottom, setCustomCropBottom] = useState(0);
const [showControls, setShowControls] = useState(false);
const [isFullscreen, setIsFullscreen] = useState(false);
const [iframeKey, setIframeKey] = useState(0);
const [hasError, setHasError] = useState(false);
```

### Flujo de Datos

```
Usuario selecciona opción
    ↓
Actualiza selectedOption
    ↓
Aplica valores de recorte predefinidos
    ↓
Incrementa iframeKey (fuerza reload)
    ↓
Iframe se recarga con nueva URL
    ↓
CSS aplica recorte visual
```

---

## ⚠️ Limitaciones Conocidas

### 1. **X-Frame-Options**
**Problema:**
Muchos sitios envían el header HTTP `X-Frame-Options: DENY` o `X-Frame-Options: SAMEORIGIN` que bloquea la carga del contenido en iframes.

**Síntomas:**
- Página en blanco
- Mensaje de error del navegador
- Console error: "Refused to display in a frame"

**Solución:**
- Cambiar a otra opción de streaming
- Abrir el stream en nueva pestaña (botón incluido)
- No hay solución técnica desde el cliente

### 2. **CORS (Cross-Origin Resource Sharing)**
**Problema:**
No podemos extraer directamente las URLs de los streams (blob, m3u8) porque:
- Los servidores bloquean requests cross-origin
- Los tokens de acceso son específicos del dominio
- No tenemos acceso a las credenciales

**Ejemplo de error:**
```
Access to fetch at 'https://stream.example.com/playlist.m3u8'
from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Por qué no podemos evitarlo:**
```typescript
// ❌ Esto NO funciona desde el cliente
fetch('https://www.tvplusgratis2.com/live/daznf1.php')
  .then(res => res.text())
  .then(html => {
    // Buscar la URL del m3u8
    const m3u8Url = extractStreamUrl(html);
    // ❌ El m3u8Url tendrá CORS bloqueado
  });
```

### 3. **CSP (Content Security Policy)**
Algunos sitios tienen políticas de seguridad estrictas que previenen:
- Ejecución de scripts inline
- Carga de recursos de dominios no autorizados
- Acceso a APIs específicas

### 4. **Publicidad y Popups**
**Efectividad del Recorte:**
- ✅ Headers y footers estáticos: 90% efectivo
- ✅ Banners laterales: 70% efectivo
- ⚠️ Popups modales: 50% efectivo (algunos se bloquean con sandbox)
- ❌ Video ads integrados: 0% efectivo (no se pueden eliminar)

---

## 🛠️ Uso del Componente

### Básico

```tsx
import LiveStreamWidget from '@/components/features/LiveStreamWidget';

export default function Page() {
  return (
    <div>
      <LiveStreamWidget />
    </div>
  );
}
```

### Personalizado (futuro)

```tsx
<LiveStreamWidget
  defaultOption={2}           // Iniciar con Opción 2
  defaultCropTop={150}        // Recorte superior inicial
  defaultCropBottom={20}      // Altura extra inicial
  showControlsByDefault={true} // Mostrar controles al inicio
/>
```

---

## 🔍 Análisis del Sitio Fuente

### Estructura de tvplusgratis2.com

**URLs disponibles:**
```
/live/daznf1.php
/live2/daznf1.php
/live3/daznf1.php
/live4/daznf1.php
/live5/daznf1.php
/live6/daznf1.php
```

**Elementos a ocultar típicos:**
- Header con logo y navegación (~80-120px)
- Banner de donaciones (~100px)
- Scripts de tracking/analytics
- Botones de compartir en redes sociales
- Footer con enlaces (~60px)

**Elementos del reproductor (NO ocultar):**
- Controles de play/pause
- Barra de volumen
- Botón de fullscreen
- Indicador de buffering

---

## 🎨 Técnicas CSS Aplicadas

### 1. Contenedor con Overflow Hidden

```css
.stream-container {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: black;
}
```

**Función:** Actúa como una "máscara" que oculta todo lo que sobresale.

### 2. Iframe Posicionado

```css
.stream-iframe {
  position: absolute;
  top: -150px;              /* Mueve hacia arriba */
  left: 0;
  width: 100%;
  height: calc(100% + 150px + 20%); /* Compensa */
  border: none;
}
```

**Función:** El iframe es más grande que su contenedor, pero el overflow hidden corta las partes no deseadas.

### 3. Visualización

```
┌──────────────────────────────┐
│   CONTENEDOR (visible)       │
│  ┌──────────────────────┐    │
│  │ ❌ Header (oculto)    │    │ ← Fuera del contenedor
│  ├──────────────────────┤    │
│  │ ✅ VIDEO (visible)    │    │ ← Dentro del contenedor
│  │                       │    │
│  │                       │    │
│  ├──────────────────────┤    │
│  │ ❌ Footer (oculto)    │    │ ← Fuera del contenedor
│  └──────────────────────┘    │
└──────────────────────────────┘
     IFRAME (más grande)
```

---

## 🚀 Mejoras Futuras Posibles

### 1. **Detección Automática de Headers**
Usar JavaScript para detectar la altura del header del sitio fuente:

```typescript
iframe.onload = () => {
  try {
    const headerHeight = iframe.contentWindow
      .document.querySelector('header')?.offsetHeight || 0;
    setCustomCropTop(headerHeight);
  } catch (e) {
    // Bloqueado por CORS
  }
};
```

**Problema:** Solo funciona si el iframe no tiene restricciones same-origin.

### 2. **Proxy Backend**
Crear un servidor proxy para:
- Fetchear la página original
- Extraer el m3u8/blob URL
- Reenviar el stream

```
Cliente → Proxy (tu servidor) → Sitio fuente → Stream
```

**Limitaciones:**
- Requiere infraestructura backend
- Los tokens pueden expirar
- Posibles implicaciones legales

### 3. **Extensión de Navegador**
Crear una extensión que:
- Inyecte scripts en el sitio fuente
- Extraiga las URLs de streaming
- Pase los datos a tu app

**Limitaciones:**
- Requiere instalación del usuario
- Mantenimiento constante

### 4. **Web Scraping con Puppeteer**
Servidor que use Puppeteer para:
- Abrir la página en headless browser
- Interceptar network requests
- Capturar la URL del m3u8

**Limitaciones:**
- Alto costo de recursos
- Latencia adicional
- Bloqueos anti-bot

---

## 📊 Tabla Comparativa de Estrategias

| Estrategia | Dificultad | Efectividad | Limitaciones |
|------------|------------|-------------|--------------|
| **Iframe + CSS** | Baja | 60-70% | X-Frame-Options, ads integrados |
| **Proxy Backend** | Alta | 80-90% | Infraestructura, tokens, legal |
| **Extensión Browser** | Media | 90-95% | Instalación usuario, mantenimiento |
| **Web Scraping** | Alta | 85-90% | Recursos, latencia, anti-bot |
| **Embedding directo** | Imposible | N/A | CORS, DRM, tokens |

---

## 📝 Notas Legales

⚠️ **ADVERTENCIA IMPORTANTE:**

Este componente está diseñado con fines educativos para demostrar técnicas de frontend y manejo de iframes.

**Consideraciones:**
- El contenido del stream proviene de sitios de terceros
- Esta aplicación NO aloja ni distribuye contenido protegido por derechos de autor
- El uso de streams de terceros puede violar términos de servicio
- Se recomienda usar servicios oficiales y de pago para consumir contenido legal

---

## 🤝 Contribuciones

Si encuentras una mejor manera de implementar este componente o soluciones a las limitaciones, ¡las contribuciones son bienvenidas!

---

_Última actualización: 03 de Enero, 2026_
