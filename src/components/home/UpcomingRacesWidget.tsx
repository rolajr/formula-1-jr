import Link from 'next/link';
import { ChevronRight, Calendar } from 'lucide-react';

const upcomingRaces = [
  { date: 'Mar 08', country: 'Australia', circuit: 'Albert Park', flag: '🇦🇺' },
  { date: 'Mar 22', country: 'Japón', circuit: 'Suzuka', flag: '🇯🇵' },
  { date: 'Abr 05', country: 'China', circuit: 'Shanghai', flag: '🇨🇳' },
  { date: 'Abr 19', country: 'Miami', circuit: 'Miami', flag: '🇺🇸' },
  { date: 'May 03', country: 'Imola', circuit: 'Imola', flag: '🇮🇹' },
];

export default function UpcomingRacesWidget() {
  return (
    <div className="bg-dark-900 border border-dark-700 rounded-2xl p-4 text-light-50 shadow-lg h-full flex flex-col">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold font-heading">Próximos GP&apos;s F1</h3>
        <Link
          href="/calendar"
          className="flex items-center gap-1 text-sm text-accent-red-500 hover:text-accent-red-400 font-semibold transition-colors group"
        >
          Ver Todos
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Tabla de Carreras */}
      <div className="flex-grow">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-light-400 uppercase">
            <tr>
              <th scope="col" className="pb-2 font-medium">
                Fecha
              </th>
              <th scope="col" className="pb-2 font-medium">
                País
              </th>
              <th scope="col" className="pb-2 font-medium hidden sm:table-cell">
                Circuito
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-800">
            {upcomingRaces.map((race, index) => (
              <tr key={index} className="hover:bg-dark-800/50 transition-colors">
                <td className="py-3 font-mono">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-accent-cyan" />
                    {race.date}
                  </div>
                </td>
                <td className="py-3 font-semibold">
                  <span className="mr-2">{race.flag}</span>
                  {race.country}
                </td>
                <td className="py-3 text-light-300 hidden sm:table-cell">
                  {race.circuit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
