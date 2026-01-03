# Documentación de Integración API (Jolpica F1)

## 1. Resumen General
La aplicación utiliza la **Jolpica F1 API** (api.jolpi.ca), una API pública y gratuita que sirve como una alternativa moderna y más robusta a la antigua "Ergast API". Su función principal es proveer datos en tiempo real y resultados históricos sobre carreras de Fórmula 1, pilotos, constructores y sus clasificaciones, lo que nos permite mantener el contenido de la aplicación actualizado y dinámico.

## 2. Arquitectura de Conexión

-   **Archivo Principal:** Toda la lógica de conexión y transformación de datos de la API se encuentra centralizada en `src/services/f1Api.ts`.
-   **Tecnología:** Utilizamos la Fetch API nativa de JavaScript, integrada eficientemente con las capacidades de manejo de datos de Next.js, especialmente para la renderización en el servidor (Server Components).
-   **Estrategia de Caché:** Para optimizar el rendimiento y reducir la carga sobre la API externa, implementamos la estrategia de **ISR (Incremental Static Regeneration)** con una política de revalidación. Esto significa que los datos obtenidos de la API se almacenan en caché y se actualizan automáticamente **una vez cada hora (`revalidate: 3600` segundos)**. Esto asegura que los usuarios siempre vean información relativamente reciente sin necesidad de hacer una nueva petición a la API en cada carga de página.
-   **Seguridad y Robustez:** Todas las llamadas a la API están envueltas en bloques `try/catch`, implementando un manejo de errores proactivo. Esto previene que la aplicación colapse o muestre pantallas de error al usuario si la API externa falla o devuelve datos inesperados.

## 3. Funciones Implementadas

### `getDriverStandings()`
-   **Propósito:** Esta función asíncrona es responsable de obtener la tabla de posiciones de todos los pilotos de la temporada actual de Fórmula 1.
-   **Transformación de Datos (Mapping):** La respuesta original de la API es un JSON complejo y profundamente anidado. Nuestro servicio procesa esta respuesta, extrae la información más relevante y la transforma en un array limpio y plano de objetos, con la siguiente estructura simplificada por cada piloto:
    ```typescript
    {
      position: number;       // Posición en la clasificación
      driverName: string;     // Nombre completo del piloto
      constructorName: string;// Nombre del equipo/constructor
      points: number;         // Puntos totales acumulados
      wins: number;           // Número de victorias
      driverId: string;       // ID único del piloto (slug)
      constructorId: string;  // ID único del constructor (slug)
    }
    ```

### `getConstructorStandings()`
-   **Propósito:** Esta función asíncrona obtiene la tabla de posiciones de todas las escuderías (constructores) de la temporada actual.
-   **Transformación de Datos (Mapping):** Similar a `getDriverStandings()`, esta función limpia y aplana la respuesta anidada de la API en un array de objetos con la siguiente estructura por cada escudería:
    ```typescript
    {
      position: number;       // Posición en la clasificación
      name: string;           // Nombre del equipo/constructor
      points: number;         // Puntos totales acumulados
      wins: number;           // Número de victorias
      constructorId: string;  // ID único del constructor (slug)
    }
    ```

### `getRaceCalendar()`
-   **Propósito:** Esta función asíncrona obtiene el calendario completo de carreras para una temporada específica (actualmente configurada para 2025).
-   **Transformación de Datos (Mapping):** Procesa la respuesta de la API y la convierte en un array de objetos, donde cada objeto representa un evento del calendario con la siguiente estructura:
    ```typescript
    {
      round: number;          // Ronda de la carrera
      raceName: string;       // Nombre del Gran Premio
      circuitName: string;    // Nombre del circuito
      date: string;           // Fecha de la carrera (YYYY-MM-DD)
      time?: string;          // Hora de la carrera (HH:MM:SSZ, opcional)
      city: string;           // Ciudad donde se celebra
      country: string;        // País
      flagEmoji: string;      // Emoji de la bandera del país
      id: string;             // ID único del evento (slug del nombre de la carrera)
    }
    ```

## 4. Conceptos Clave

### ¿Qué es el "Mapping" o Transformación?
El "Mapping" o transformación de datos es el proceso mediante el cual tomamos la información "cruda" (raw data) que la API nos entrega. Esta data suele ser compleja y tener una estructura que no es ideal para ser usada directamente en nuestra interfaz de usuario (por ejemplo, con muchos niveles de anidamiento). Nuestro servicio de API se encarga de "traducir" estos datos a un formato limpio, más sencillo y directamente utilizable por nuestros componentes de React, facilitando su visualización y gestión.

### ¿Qué es ISR (Revalidación)?
**ISR (Incremental Static Regeneration)** es una característica de Next.js que nos permite optimizar la carga de datos y la experiencia del usuario. En lugar de llamar a la API cada vez que un usuario visita una página (lo cual podría ser lento y generar muchas peticiones, arriesgándonos a bloqueos por parte de la API), Next.js guarda una copia de la página (o de los datos) ya generada. Luego, de forma inteligente, solo pregunta a la API por datos nuevos **una vez cada cierto tiempo (en nuestro caso, cada hora)**. Si hay datos nuevos, actualiza la copia guardada; de lo contrario, sigue sirviendo la versión en caché. Esto combina la rapidez de las páginas estáticas con la actualidad de los datos dinámicos.

## 5. Endpoints Utilizados
Estos son los endpoints específicos de la API de Jolpica/Ergast que se utilizan:

-   **Clasificación de Pilotos:** `http://api.jolpi.ca/ergast/f1/current/driverStandings.json`
-   **Clasificación de Constructores:** `http://api.jolpi.ca/ergast/f1/current/constructorStandings.json`
-   **Calendario de Carreras (2025):** `http://api.jolpi.ca/ergast/f1/2025.json`

## 6. Manejo de Errores
Nuestra filosofía es "Fail Gracefully" (Fallo Elegante). Esto significa que la aplicación está diseñada para manejar de manera robusta los posibles fallos de la API externa. Si la API se cae, no responde o devuelve un error, la aplicación captura estas excepciones a través de bloques `try/catch`. En lugar de mostrar una pantalla blanca de error (lo que sería una mala experiencia para el usuario), la aplicación intenta:
1.  Devolver una lista vacía.
2.  Utilizar datos de ejemplo (mock data) predefinidos como respaldo.

De esta manera, la interfaz de usuario permanece funcional y el usuario puede seguir interactuando con las partes de la aplicación que no dependen de la API, o al menos ve un contenido alternativo en lugar de un error.