'use client';

import { useState, useEffect } from 'react';
import { Tv, AlertCircle, Settings, RefreshCw, Maximize2, Minimize2 } from 'lucide-react';

interface StreamOption {
  id: string;
  label: string;
  url: string;
  originalUrl: string;
  cropTop: number;
  cropBottom: number;
}

type Channel = 'f1' | 'espn3' | 'espn3-mexico';

interface LiveStreamWidgetProps {
  channel: Channel;
}

interface StreamDefinition {
  url: string;
  label: string; // e.g., "Opción 1 (SD)", "Opción 2 (FHD)"
  cropTop?: number;
  cropBottom?: number;
}

const channelConfig: Record<Channel, { name: string; streams: Record<string, StreamDefinition> }> = {
  f1: {
    name: 'DAZN F1',
    streams: {
      option1_sd: { url: 'https://www.tvplusgratis2.com/live/daznf1.php', label: 'Opción 1 (SD)' },
      option4_fhd: { url: 'https://www.tvplusgratis2.com/live4/daznf1.php', label: 'Opción 2 (FHD)' },
    },
  },
  espn3: {
    name: 'ESPN 3',
    streams: {
      option3_sd: { url: 'https://www.tvplusgratis2.com/live3/espn3.php', label: 'Opción 1 (SD)' },
      option6_fhd: { url: 'https://www.tvplusgratis2.com/live6/espn3.php', label: 'Opción 2 (FHD)' },
    },
  },
  'espn3-mexico': {
    name: 'ESPN 3 Mexico',
    streams: {
      option3_sd: { url: 'https://www.tvplusgratis2.com/live3/espn3mexico.php', label: 'Opción 1 (SD)' },
      option6_fhd: { url: 'https://www.tvplusgratis2.com/live6/espn3mexico.php', label: 'Opción 2 (FHD)' },
    },
  },
};

const generateStreamOptions = (channel: Channel): StreamOption[] => {
  const config = channelConfig[channel];
  return Object.keys(config.streams).map((key) => {
    const streamDef = config.streams[key];
    return {
      id: key,
      label: streamDef.label,
      url: `/api/stream-proxy?url=${encodeURIComponent(streamDef.url)}`,
      originalUrl: streamDef.url,
      cropTop: streamDef.cropTop || 0,
      cropBottom: streamDef.cropBottom || 0,
    };
  });
};

export default function LiveStreamWidget({ channel }: LiveStreamWidgetProps) {
  const streamOptions = generateStreamOptions(channel);
  const displayName = channelConfig[channel].name;
  
  const [selectedOption, setSelectedOption] = useState<StreamOption>(streamOptions[0]);
  const [customCropTop, setCustomCropTop] = useState(0);
  const [customCropBottom, setCustomCropBottom] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Reload iframe
  const reloadStream = () => {
    setIframeKey((prev) => prev + 1);
    setHasError(false);
    setIsLoading(true);
  };

  // Handle option change
  const handleOptionChange = (option: StreamOption) => {
    setSelectedOption(option);
    setCustomCropTop(option.cropTop);
    setCustomCropBottom(option.cropBottom);
    setIsLoading(true);
    setHasError(false);
    reloadStream();
  };

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  // Handle iframe error
  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Timeout para detectar si el iframe no carga
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        setHasError(true);
      }
    }, 15000); // 15 segundos

    return () => clearTimeout(timeout);
  }, [iframeKey, isLoading]);

  // Valores finales de recorte
  const finalCropTop = customCropTop;
  const finalCropBottom = customCropBottom;

  return (
    <div className="bg-dark-900 rounded-2xl border border-dark-700 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-dark-950 border-b border-dark-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent-red-500/10 rounded-lg">
            <Tv className="w-5 h-5 text-accent-red-500" />
          </div>
          <div>
            <h3 className="text-light-50 font-heading font-bold text-lg">
              Transmisión en Vivo - {displayName}
            </h3>
            <p className="text-light-400 text-xs">
              {selectedOption.label} • En vivo
            </p>
          </div>
        </div>

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

      {/* Info Banner */}
      <div className="bg-[#3B82F6]/10 border-b border-[#3B82F6]/20 px-4 py-2 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-info flex-shrink-0 mt-0.5" />
        <p className="text-blue-300 text-xs">
          <strong>Sistema mejorado:</strong> Esta transmisión usa un proxy para una carga más rápida y estable.
        </p>
      </div>

      {/* Stream Options Tabs */}
      <div className="bg-dark-950 border-b border-dark-700 px-4 py-2 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {streamOptions.map((option) => (
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

      {/* Custom Crop Controls */}
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
            💡 Ajusta estos valores para ocultar menús o publicidad del sitio original
          </p>
        </div>
      )}

      {/* Video Container - "TV Screen" */}
      <div
        className={`relative bg-black ${
          isFullscreen ? 'fixed inset-0 z-50' : 'aspect-video'
        }`}
        style={{
          overflow: 'hidden',
        }}
      >
        {/* Loading State */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-dark-950/50 z-10 pointer-events-none">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-accent-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-light-300 text-sm">Cargando transmisión...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-dark-950 z-20">
            <div className="text-center max-w-md px-4">
              <AlertCircle className="w-16 h-16 text-accent-red-500 mx-auto mb-4" />
              <h4 className="text-light-50 font-bold text-lg mb-2">
                No se pudo cargar la transmisión
              </h4>
              <p className="text-light-400 text-sm mb-4">
                <strong>Posibles causas:</strong><br />
                • El proxy backend no pudo conectarse al sitio original<br />
                • La transmisión no está disponible actualmente<br />
                • Problemas de conexión o timeout del servidor
              </p>
              <p className="text-amber-300 text-xs mb-4">
                💡 Prueba con otra opción o abre en el sitio original
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

        {/* Iframe - Estrategia de recorte CSS */}
        <iframe
          key={iframeKey}
          src={selectedOption.url}
          className="absolute left-0 right-0 border-0"
          style={{
            top: `-${finalCropTop}px`,
            width: '100%',
            height: `calc(100% + ${finalCropTop}px + ${finalCropBottom}%)`,
            pointerEvents: 'auto',
          }}
          sandbox="allow-scripts allow-same-origin allow-presentation allow-forms"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          title="DAZN F1 Live Stream"
        />
      </div>

      {/* Footer with Legal Notice */}
      <div className="bg-dark-950 border-t border-dark-700 px-4 py-3">
        <p className="text-light-400 text-xs text-center">
          ⚠️ Contenido de terceros. Esta aplicación no aloja ni distribuye el contenido del stream.
          El stream es proporcionado por{' '}
          <a
            href="https://www.tvplusgratis2.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-cyan hover:underline"
          >
            tvplusgratis2.com
          </a>
        </p>
      </div>
    </div>
  );
}
