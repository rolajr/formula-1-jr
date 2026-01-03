
import { Building, Trophy } from 'lucide-react';
import type { CurrentConstructorStanding } from '@/services/f1Api';

interface ConstructorStandingsTableProps {
  standings: CurrentConstructorStanding[];
}

const getPositionClass = (position: number) => {
  switch (position) {
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

const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 2:
        return <Trophy className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Trophy className="w-5 h-5 text-yellow-700" />;
      default:
        return <span className="text-light-400 font-mono w-5 text-center">{position}</span>;
    }
};

export default function ConstructorStandingsTable({ standings }: ConstructorStandingsTableProps) {
  return (
    <div className="bg-dark-900 rounded-lg overflow-hidden">
      <ul className="divide-y divide-dark-800">
        {standings.map((team) => (
          <li
            key={team.constructorId}
            className={`flex items-center p-3 transition-colors duration-200 hover:bg-dark-800 ${getPositionClass(team.position)}`}
          >
            <div className="w-12 text-center font-bold text-lg flex items-center justify-center">
                {getPositionIcon(team.position)}
            </div>

            <div className="w-12 h-12 bg-dark-800 rounded-full flex items-center justify-center overflow-hidden mr-4 relative">
              <div className="w-full h-full bg-dark-800 flex items-center justify-center">
                  <Building className="w-8 h-8 text-dark-700" />
              </div>
            </div>

            <div className="flex-grow">
                <span className="font-bold text-light-50 text-lg">{team.name}</span>
            </div>

            <div className="w-24 text-right">
              <span className="font-black text-xl font-mono text-light-50">{team.points}</span>
              <span className="text-light-400 text-xs block">PTS</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
