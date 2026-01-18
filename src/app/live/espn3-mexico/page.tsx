import { Radio, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import LiveStreamWidget from '@/components/features/LiveStreamWidget';

export const metadata = {
  title: 'ESPN 3 México en Vivo - F1 App',
  description: 'Mira ESPN 3 México en vivo',
};

export default function ESPN3MexicoPage() {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Botón de Regreso */}
        <Link
          href="/live"
          className="inline-flex items-center gap-2 text-light-400 hover:text-light-50 mb-6 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Volver a canales</span>
        </Link>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Radio className="w-8 h-8 text-accent-red-500 animate-pulse" />
            <h1 className="text-4xl font-heading font-bold text-light-50">
              Transmisión en Vivo - ESPN 3 México
            </h1>
          </div>
          <p className="text-light-400">
            Disfruta de ESPN 3 México en directo desde nuestra aplicación
          </p>
        </div>

        {/* Live Stream Widget */}
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <LiveStreamWidget channel="espn3-mexico" />
          </div>
        </div>
      </div>
    </div>
  );
}
