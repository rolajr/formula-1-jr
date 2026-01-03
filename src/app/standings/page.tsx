import { Trophy } from 'lucide-react';
import { getDriverStandings, getConstructorStandings } from '@/services/f1Api';
import StandingsView from '@/components/standings/StandingsView';

export default async function StandingsPage() {
  // Fetch real data from API
  const [driverStandings, constructorStandings] = await Promise.all([
    getDriverStandings(),
    getConstructorStandings(),
  ]);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-8">
            <Trophy className="w-12 h-12 text-accent-red-500 mx-auto mb-2" />
          <h1 className="text-4xl font-heading font-black text-light-50 tracking-wide">
            Campeonato Mundial
          </h1>
          <p className="text-md text-light-300 mt-2">Clasificación de la Temporada Actual</p>
        </div>
        
        <StandingsView 
          driverStandings={driverStandings}
          constructorStandings={constructorStandings}
        />
      </div>
    </div>
  );
}
