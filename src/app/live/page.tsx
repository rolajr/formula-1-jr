import { Radio } from 'lucide-react';
import StreamChannelCard from '@/components/features/StreamChannelCard';

export const metadata = {
  title: 'Canales en Vivo - F1 App',
  description: 'Mira deportes en vivo: Fórmula 1, ESPN 3 y más',
};

export default function LivePage() {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Radio className="w-8 h-8 text-accent-red-500 animate-pulse" />
            <h1 className="text-4xl font-heading font-bold text-white">
              Canales en Vivo
            </h1>
          </div>
          <p className="text-gray-400">
            Selecciona un canal para ver transmisiones deportivas en vivo
          </p>
        </div>

        {/* 📺 TARJETAS DE CANALES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Tarjeta: DAZN F1 */}
          <StreamChannelCard
            channelName="DAZN F1"
            href="/live/f1"
            description="Transmisión en vivo de Fórmula 1"
          />

          {/* Tarjeta: ESPN 3 */}
          <StreamChannelCard
            channelName="ESPN 3"
            href="/live/espn3"
            description="Deportes en vivo las 24 horas"
          />

          {/* Tarjeta: ESPN 3 México */}
          <StreamChannelCard
            channelName="ESPN 3 México"
            href="/live/espn3-mexico"
            description="Cobertura regional para México"
          />
        </div>
      </div>
    </div>
  );
}
