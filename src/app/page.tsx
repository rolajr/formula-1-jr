import NextRaceHero from '@/components/features/NextRaceHero';
import StandingsWidget from '@/components/features/StandingsWidget';
import NewsGrid from '@/components/features/NewsGrid';
import NextRaceDetailed from '@/components/home/NextRaceDetailed';
import UpcomingRacesWidget from '@/components/home/UpcomingRacesWidget';
import { getNextRace, getDriverStandings } from '@/services/f1Api';
import { mockNews } from '@/data/mocks';

export default async function HomePage() {
  // Fetch real data from API
  const [nextRace, allStandings] = await Promise.all([
    getNextRace(),
    getDriverStandings(),
  ]);

  // Get top 5 drivers and transform to StandingEntry format
  const standings = allStandings.slice(0, 5).map((s) => ({
    position: parseInt(s.position, 10),
    driver: {
      name: s.driver.name,
      number: 0, // API doesn't provide number in standings
      code: s.driver.code,
      team: s.constructor.name,
      nationality: s.driver.nationality,
      flagEmoji: s.driver.flagEmoji || undefined,
    },
    points: parseInt(s.points, 10),
    wins: parseInt(s.wins, 10),
  }));

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Columna Principal (75%) */}
        <main className="lg:col-span-3 space-y-8">
          {nextRace ? (
            <NextRaceHero
              raceName={nextRace.name}
              location={nextRace.location}
              circuit={nextRace.circuit}
              date={nextRace.date}
              round={nextRace.round}
              flagEmoji={nextRace.flagEmoji}
            />
          ) : (
            // Opcional: Mostrar un placeholder si no hay próxima carrera
            <div className="aspect-video bg-dark-800 rounded-2xl flex items-center justify-center">
              <p className="text-light-400">No hay información de la próxima carrera.</p>
            </div>
          )}

          {standings.length > 0 && <StandingsWidget standings={standings} />}
          
          <NewsGrid articles={mockNews} />
        </main>

        {/* Barra Lateral (25%) */}
        <aside className="lg:col-span-1 space-y-8">
          <NextRaceDetailed />
          <UpcomingRacesWidget />
        </aside>

      </div>
    </div>
  );
}
