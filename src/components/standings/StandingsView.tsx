'use client';

import { useState } from 'react';
import { Users, Building } from 'lucide-react';
import DriverStandingsTable from '@/components/standings/DriverStandingsTable';
import ConstructorStandingsTable from '@/components/standings/ConstructorStandingsTable';
import type { CurrentDriverStanding, CurrentConstructorStanding } from '@/services/f1Api';

interface StandingsViewProps {
  driverStandings: CurrentDriverStanding[];
  constructorStandings: CurrentConstructorStanding[];
}

type View = 'drivers' | 'constructors';

export default function StandingsView({ driverStandings, constructorStandings }: StandingsViewProps) {
  const [activeView, setActiveView] = useState<View>('drivers');

  const getButtonClass = (view: View) => {
    return activeView === view
      ? 'bg-accent-red-500 text-white'
      : 'bg-dark-800 text-light-300 hover:bg-dark-700 hover:text-white';
  };

  return (
    <>
      {/* View Toggle */}
      <div className="mb-8 flex justify-center">
        <div className="bg-dark-950 border border-dark-700 rounded-full p-1 flex items-center text-sm font-semibold">
          <button 
            onClick={() => setActiveView('drivers')}
            className={`flex items-center gap-2 px-6 py-2 rounded-full transition-colors ${getButtonClass('drivers')}`}
          >
            <Users className="w-5 h-5" />
            Pilotos
          </button>
          <button 
            onClick={() => setActiveView('constructors')}
            className={`flex items-center gap-2 px-6 py-2 rounded-full transition-colors ${getButtonClass('constructors')}`}
          >
            <Building className="w-5 h-5" />
            Constructores
          </button>
        </div>
      </div>

      {/* Content */}
      <div>
        {activeView === 'drivers' 
          ? <DriverStandingsTable standings={driverStandings} /> 
          : <ConstructorStandingsTable standings={constructorStandings} />}
      </div>
    </>
  );
}
