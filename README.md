# Formula 1 App 🏎️

Una aplicación web moderna y responsive para fanáticos de Fórmula 1 con clasificaciones en vivo, perfiles de pilotos, información de equipos y calendario de carreras.

## 🚀 Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Iconos**: Lucide React
- **Gestión de Estado**: Zustand
- **Gestor de Paquetes**: npm

## 📋 Características

- ✅ **Clasificaciones en Vivo**: Clasificaciones del campeonato en tiempo real para pilotos y constructores
- ✅ **Perfiles de Pilotos**: Información detallada sobre los pilotos de F1
- ✅ **Información de Equipos**: Perfiles completos de equipos y estadísticas
- ✅ **Calendario de Carreras**: Calendario completo de la temporada con resultados
- ✅ **Diseño Responsive**: Optimizado para móvil, tablet y escritorio
- ✅ **Tema Oscuro**: Diseño moderno en modo oscuro inspirado en la estética de F1
- ✅ **Accesibilidad**: Cumple con WCAG 2.1 y navegación por teclado

## 🏗️ Estructura del Proyecto

```
formula-1-jr/
├── src/
│   ├── app/                 # Páginas de Next.js App Router
│   │   ├── layout.tsx       # Layout raíz con Navbar y Footer
│   │   ├── page.tsx         # Página principal
│   │   ├── standings/       # Página de clasificaciones
│   │   ├── drivers/         # Página de pilotos
│   │   ├── teams/           # Página de equipos
│   │   ├── races/           # Página de carreras
│   │   └── about/           # Página acerca de
│   ├── components/
│   │   ├── layout/          # Componentes de layout (Navbar, Footer)
│   │   ├── ui/              # Componentes UI reutilizables
│   │   └── features/        # Componentes específicos de funcionalidades
│   ├── lib/                 # Funciones de utilidad y helpers
│   ├── types/               # Definiciones de tipos TypeScript
│   └── styles/              # Estilos globales y CSS
├── public/                  # Assets estáticos
├── ROADMAP.md              # Hoja de ruta y planificación del proyecto
├── DESIGN_SPECS.md         # Especificaciones de diseño
└── README.md               # Este archivo
```

## 🎨 Sistema de Diseño

### Colores

- **Fondos Oscuros**: `#0A0A0B`, `#131316`, `#1C1C21`
- **Rojo Acento**: `#E10600` (CTA Principal)
- **Cyan Acento**: `#00E0FF` (Destacados secundarios)
- **Dorado Acento**: `#FFD700` (Ganadores/Podio)
- **Colores de Equipos**: Rojo Ferrari, Cyan Mercedes, Azul Red Bull, etc.

### Tipografía

- **Encabezados**: Rajdhani (Inspirada en carreras, geométrica)
- **Cuerpo**: Inter (Alta legibilidad)
- **Monoespaciada**: JetBrains Mono (Datos técnicos)

## 🚦 Comenzar

### Prerequisitos

- Node.js 18+ instalado
- Gestor de paquetes npm o yarn

### Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd formula-1-jr
```

2. Instalar dependencias:
```bash
npm install
```

3. Ejecutar el servidor de desarrollo:
```bash
npm run dev
```

4. Abrir [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📜 Scripts Disponibles

- `npm run dev` - Iniciar servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run start` - Iniciar servidor de producción
- `npm run lint` - Ejecutar ESLint
- `npm run type-check` - Ejecutar verificación de tipos TypeScript

## 🗺️ Hoja de Ruta

Ver [ROADMAP.md](./ROADMAP.md) para planificación detallada del proyecto y fases de implementación.

### Fase 1: MVP (Actual)
- [x] Inicialización del proyecto
- [x] Layout base con Navbar y Footer
- [x] Configuración del sistema de diseño
- [x] Páginas placeholder para rutas principales
- [ ] Integración de API (Ergast/OpenF1)
- [ ] Implementación de página de clasificaciones
- [ ] Perfiles de pilotos
- [ ] Calendario de carreras

### Fase 2: Características Mejoradas
- [ ] Resultados detallados de carreras
- [ ] Información de circuitos
- [ ] Funcionalidad de búsqueda
- [ ] Estadísticas y gráficos
- [ ] Toggle modo Oscuro/Claro

### Fase 3: Pulido y Optimización
- [ ] Optimización de rendimiento
- [ ] Mejoras de SEO
- [ ] Auditoría de accesibilidad
- [ ] Despliegue a producción

## 🎯 Objetivos de Rendimiento

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **Puntuación Lighthouse**: > 90

## ♿ Accesibilidad

- Cumple con WCAG 2.1 Nivel AA
- Soporte de navegación por teclado
- Optimizado para lectores de pantalla
- Ratios de contraste altos (AAA para texto crítico)
- Respeta `prefers-reduced-motion`

## 📄 Licencia

Esta es una aplicación no oficial hecha por fanáticos. No está afiliada con Fórmula 1, FIA, o Formula One Management.

## 🙏 Agradecimientos

- Diseño inspirado en la estética moderna de F1
- Construido con pasión para fanáticos de F1 en todo el mundo
- Datos proporcionados por Ergast Developer API / OpenF1 API

---

**Construido con ❤️ para los fanáticos de Fórmula 1**
