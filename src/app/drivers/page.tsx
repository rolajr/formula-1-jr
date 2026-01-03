import { Users } from 'lucide-react';
import DriverCard from '@/components/drivers/DriverCard';
import { mockDrivers } from '@/data/mocks';

export default function DriversPage() {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-8 h-8 text-accent-red-500" />
            <h1 className="text-4xl font-heading font-bold text-light-50">
              Parrilla de Pilotos 2026
            </h1>
          </div>
          <p className="text-light-400">
            Conoce a los competidores de la temporada 2026 de Formula 1.
          </p>
        </div>

        {/* Drivers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockDrivers.map((driver) => (
            <DriverCard key={driver.id} driver={driver} />
          ))}
        </div>
      </div>
    </div>
  );
}