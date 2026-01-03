import { Building } from 'lucide-react';
import TeamCard from '@/components/teams/TeamCard';
import { getConstructorStandings } from '@/services/f1Api';
import { getTeamConfig } from '@/data/teamConfig';

export default async function TeamsPage() {
  // Obtener datos reales de la API
  const constructorStandings = await getConstructorStandings();

  // Transformar datos de la API para TeamCard
  const teams = constructorStandings.map((standing) => {
    const config = getTeamConfig(standing.constructorId);
    return {
      id: standing.constructorId, // Usar constructorId como id (ej: "ferrari", "red_bull")
      name: standing.name,
      base: config.base,
      teamPrincipal: config.teamPrincipal,
      teamColor: config.teamColor,
      logo: standing.image, // Ruta de imagen desde la API
    };
  });

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Building className="w-8 h-8 text-accent-cyan" />
            <h1 className="text-4xl font-heading font-bold text-light-50">
              Escuderías 2025
            </h1>
          </div>
          <p className="text-light-400">
            Los equipos que compiten en el Campeonato Mundial de Formula 1 de 2025.
          </p>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </div>
    </div>
  );
}