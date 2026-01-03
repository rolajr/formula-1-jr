import Link from 'next/link';
import { Trophy, ChevronRight } from 'lucide-react';
import type { StandingEntry } from '@/types';

interface StandingsPreviewProps {
  standings: StandingEntry[];
}

export default function StandingsPreview({ standings }: StandingsPreviewProps) {
  const getMedalColor = (position: number) => {
    switch (position) {
      case 1:
        return 'text-accent-gold';
      case 2:
        return 'text-light-300';
      case 3:
        return 'text-orange-400';
      default:
        return 'text-light-400';
    }
  };

  const getPositionBg = (position: number) => {
    switch (position) {
      case 1:
        return 'bg-accent-gold/10 border-accent-gold/30';
      case 2:
        return 'bg-light-300/10 border-light-300/30';
      case 3:
        return 'bg-orange-400/10 border-orange-400/30';
      default:
        return 'bg-dark-800 border-dark-700';
    }
  };

  return (
    <section className="py-12 lg:py-16 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-dark-900 rounded-xl border border-accent-gold/20">
              <Trophy className="w-6 h-6 text-accent-gold" />
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-heading font-bold text-light-50">
                Clasificación de Pilotos
              </h2>
              <p className="text-sm text-light-400 mt-1">Top 3 Líderes del Campeonato</p>
            </div>
          </div>

          <Link
            href="/standings"
            className="hidden sm:flex items-center gap-1 px-4 py-2 text-accent-red-500 hover:text-accent-red-400 font-semibold transition-colors group"
          >
            Ver Todos
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Standings List */}
        <div className="space-y-4">
          {standings.map((entry) => (
            <div
              key={entry.position}
              className={`group relative overflow-hidden rounded-xl border ${getPositionBg(
                entry.position
              )} hover:border-accent-red-500/50 transition-all`}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent-red-500/0 via-accent-red-500/5 to-accent-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative flex items-center gap-4 p-4 sm:p-6">
                {/* Position */}
                <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
                  <span
                    className={`text-3xl sm:text-4xl font-heading font-black ${getMedalColor(
                      entry.position
                    )}`}
                  >
                    {entry.position}
                  </span>
                </div>

                {/* Driver Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {entry.driver.flagEmoji && (
                      <span className="text-xl sm:text-2xl">{entry.driver.flagEmoji}</span>
                    )}
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-light-50 truncate">
                      {entry.driver.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-light-400">
                    <span className="font-mono font-semibold text-accent-cyan">
                      #{entry.driver.number}
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="truncate">{entry.driver.team}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 sm:gap-8">
                  {/* Wins */}
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-heading font-black text-accent-red-500">
                      {entry.wins}
                    </div>
                    <div className="text-xs text-light-400 uppercase">Victorias</div>
                  </div>

                  {/* Points */}
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-heading font-black text-light-50">
                      {entry.points}
                    </div>
                    <div className="text-xs text-light-400 uppercase">Puntos</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-6 sm:hidden">
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
