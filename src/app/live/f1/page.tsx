import { Radio, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import LiveStreamWidget from '@/components/features/LiveStreamWidget';

export const metadata = {
  title: 'DAZN F1 en Vivo - F1 App',
  description: 'Mira la Fórmula 1 en vivo',
};

export default function F1LivePage() {
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
              Transmisión en Vivo - DAZN F1
            </h1>
          </div>
          <p className="text-light-400">
            Mira la Fórmula 1 en directo desde nuestra aplicación
          </p>
        </div>

        {/* Live Stream Widget */}
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <LiveStreamWidget channel="f1" />
          </div>
        </div>
      </div>
    </div>
  );
}
