import Link from 'next/link';
import { Trophy, ChevronRight } from 'lucide-react';
import type { StandingEntry } from '@/types/index';

interface StandingsWidgetProps {
  standings: StandingEntry[];
}

export default function StandingsWidget({ standings }: StandingsWidgetProps) {
  // Asegurarse de que solo se muestre el Top 5
  const top5Standings = standings.slice(0, 5);

  return (
    <section className="py-12 lg:py-16 bg-dark-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado de la Sección */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-dark-950 rounded-xl border border-accent-gold/20">
              <Trophy className="w-6 h-6 text-accent-gold" />
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-heading font-bold text-light-50">
                Clasificación de Pilotos
              </h2>
              <p className="text-sm text-light-400 mt-1">Top 5 del Campeonato</p>
            </div>
          </div>
        </div>

        {/* Tabla de Clasificación */}
        <div className="bg-dark-950 border border-dark-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm text-left text-light-200">
            <thead className="bg-dark-800 text-xs text-light-400 uppercase tracking-wider">
              <tr>
                <th scope="col" className="px-4 py-3 text-center">
                  Pos
                </th>
                <th scope="col" className="px-6 py-3">
                  Piloto
                </th>
                <th scope="col" className="hidden md:table-cell px-6 py-3">
                  Equipo
                </th>
                <th scope="col" className="px-4 py-3 text-right">
                  Puntos
                </th>
              </tr>
            </thead>
            <tbody>
              {top5Standings.map((entry) => (
                <tr
                  key={entry.position}
                  className="border-b border-dark-800 hover:bg-dark-800/50 transition-colors"
                >
                  <td className="px-4 py-3 font-bold text-light-50 text-center">
                    {entry.position}
                  </td>
                  <th scope="row" className="px-6 py-3 font-medium text-light-50 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {entry.driver.flagEmoji && (
                        <span className="text-lg">{entry.driver.flagEmoji}</span>
                      )}
                      <span>{entry.driver.name}</span>
                    </div>
                  </th>
                  <td className="hidden md:table-cell px-6 py-3 text-light-400">
                    {entry.driver.team}
                  </td>

                  <td className="px-4 py-3 font-mono font-bold text-light-50 text-right">
                    {entry.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Enlace para ver todo */}
        <div className="mt-6">
          <Link
            href="/standings"
            className="flex items-center justify-center gap-1 w-full px-4 py-3 bg-dark-900 border border-dark-700 hover:border-accent-red-500/50 text-accent-red-500 font-semibold rounded-lg transition-all"
          >
            Ver Clasificación Completa
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
