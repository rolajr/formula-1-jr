/**
 * Stream Proxy API Route
 *
 * Este proxy servidor-side resuelve el problema de X-Frame-Options y código anti-iframe
 * fetcheando el contenido desde el servidor, limpiándolo, y sirviéndolo desde nuestro dominio.
 *
 * Estrategia:
 * 1. Recibe la URL del stream como query parameter
 * 2. Fetchea el contenido desde el servidor (bypassing CORS)
 * 3. Limpia el HTML:
 *    - Elimina código JavaScript de detección de iframe (top.location !== self.location)
 *    - Elimina scripts de redirección
 *    - Elimina scripts de publicidad
 * 4. Inyecta headers permisivos para embedding
 * 5. Retorna el HTML limpio
 */

import { NextRequest, NextResponse } from 'next/server';

// Lista de dominios permitidos (whitelist de seguridad)
const ALLOWED_DOMAINS = [
  'tvplusgratis2.com',
  'tvporinternet2.com',
  'embed.ksdjugfsddeports.com',
];

// Scripts conocidos que debemos bloquear (anti-iframe, publicidad)
const BLOCKED_SCRIPT_PATTERNS = [
  /top\.location\s*!==?\s*self\.location/gi,
  /top\.location\s*!=\s*location/gi,
  /top\s*!==?\s*self/gi,
  /parent\.location/gi,
  /bvtpk\.com/gi,
  /push-sdk\.com/gi,
  /tvporinternet2\.com/gi,
];

export async function GET(request: NextRequest) {
  try {
    // Obtener la URL del stream desde los query params
    const searchParams = request.nextUrl.searchParams;
    const streamUrl = searchParams.get('url');

    if (!streamUrl) {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 }
      );
    }

    // Validar que la URL sea de un dominio permitido
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

    // Fetchear el contenido desde el servidor
    const response = await fetch(streamUrl, {
      headers: {
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

    let html = await response.text();
    console.log(`[Stream Proxy] Fetched ${html.length} bytes`);

    // Limpiar el HTML
    html = cleanHTML(html);

    // Crear respuesta con headers permisivos
    const proxyResponse = new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        // Permitir embedding desde cualquier origen
        'X-Frame-Options': 'ALLOWALL',
        'Content-Security-Policy': "frame-ancestors 'self' *",
        // CORS permisivo
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        // Cache por 5 minutos
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
 * Limpia el HTML eliminando código anti-iframe y scripts bloqueados
 */
function cleanHTML(html: string): string {
  let cleaned = html;

  // 1. Eliminar código JavaScript de detección de iframe
  BLOCKED_SCRIPT_PATTERNS.forEach(pattern => {
    cleaned = cleaned.replace(pattern, '// [REMOVED BY PROXY]');
  });

  // 2. Eliminar scripts específicos bloqueados
  cleaned = cleaned.replace(
    /<script[^>]*src=["']https?:\/\/(bvtpk\.com|push-sdk\.com)[^"']*["'][^>]*>[\s\S]*?<\/script>/gi,
    '<!-- [BLOCKED SCRIPT REMOVED BY PROXY] -->'
  );

  // 3. Eliminar inline scripts que contengan redirecciones
  cleaned = cleaned.replace(
    /<script[^>]*>([\s\S]*?top\.location[\s\S]*?)<\/script>/gi,
    '<!-- [REDIRECT SCRIPT REMOVED BY PROXY] -->'
  );

  // 4. Inyectar base tag para que las rutas relativas funcionen
  const baseUrl = 'https://www.tvplusgratis2.com/';
  if (!cleaned.includes('<base')) {
    cleaned = cleaned.replace(
      /<head>/i,
      `<head>\n  <base href="${baseUrl}">`
    );
  }

  // 5. Inyectar CSS para ocultar posibles elementos molestos
  const injectedStyles = `
    <style>
      /* Estilos inyectados por el proxy */
      body {
        margin: 0;
        padding: 0;
        overflow: hidden;
      }

      /* Ocultar posibles ads o banners */
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

// Manejar preflight requests
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
