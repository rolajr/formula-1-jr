
import { User, Trophy } from 'lucide-react';
import ClientImage from '@/components/ui/ClientImage';
import type { CurrentDriverStanding } from '@/services/f1Api';

interface DriverStandingsTableProps {
  standings: CurrentDriverStanding[];
}

const getPositionClass = (position: string | number) => {
  const pos = typeof position === 'string' ? parseInt(position, 10) : position;
  switch (pos) {
    case 1:
      return 'border-l-4 border-yellow-400';
    case 2:
      return 'border-l-4 border-gray-400';
    case 3:
      return 'border-l-4 border-yellow-700';
    default:
      return 'border-l-4 border-dark-800';
  }
};

const getPositionIcon = (position: string | number) => {
    const pos = typeof position === 'string' ? parseInt(position, 10) : position;
    switch (pos) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 2:
        return <Trophy className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Trophy className="w-5 h-5 text-yellow-700" />;
      default:
        return <span className="text-light-400 font-mono w-5 text-center">{pos}</span>;
    }
  };

export default function DriverStandingsTable({ standings }: DriverStandingsTableProps) {
  return (
    <div className="bg-dark-900 rounded-lg overflow-hidden">
      <ul className="divide-y divide-dark-800">
        {standings.map((standing) => (
          <li
            key={standing.driver.id}
            className={`flex items-center p-3 transition-colors duration-200 hover:bg-dark-800 ${getPositionClass(standing.position)}`}
          >
            <div className="w-12 text-center font-bold text-lg flex items-center justify-center">
                {getPositionIcon(standing.position)}
            </div>

            <div className="w-12 h-12 bg-dark-800 rounded-full flex items-center justify-center overflow-hidden mr-4 relative">
              {/* The API doesn't provide avatars, so we use a placeholder */}
              <div className="w-full h-full bg-dark-800 flex items-center justify-center">
                  <User className="w-8 h-8 text-dark-700" />
              </div>
            </div>

            <div className="flex-grow">
              <div className="flex items-center gap-3">
                <span className="font-bold text-light-50 text-lg">{standing.driver.name}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                 {/* The API doesn't provide team colors, so this is disabled */}
                 {/* <div className="w-2 h-2 rounded-full" style={{ backgroundColor: standing.teamColor }}></div> */}
                 <span className="text-light-300 text-sm">{standing.constructor.name}</span>
              </div>
            </div>

            <div className="w-24 text-right">
              <span className="font-black text-xl font-mono text-light-50">{standing.points}</span>
              <span className="text-light-400 text-xs block">PTS</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
