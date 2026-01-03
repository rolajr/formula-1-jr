import { notFound } from 'next/navigation';
import { getConstructorDetails, getDriverStandings } from '@/services/f1Api';
import { getTeamConfig } from '@/data/teamConfig';
import ClientImage from '@/components/ui/ClientImage';
import DriverCard from '@/components/drivers/DriverCard';
import { Building, MapPin, UserCircle, Wrench, Trophy, Users, ExternalLink } from 'lucide-react';

type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
};

const StatCard = ({ icon, label, value }: StatCardProps) => (
  <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-5">
    <div className="flex items-center gap-4">
        <div className="text-accent-cyan">{icon}</div>
        <div>
            <p className="text-light-300 text-sm">{label}</p>
            <p className="text-light-50 font-bold text-xl">{value}</p>
        </div>
    </div>
  </div>
);

export default async function TeamProfilePage({ params }: { params: { id: string } }) {
  // Obtener detalles del equipo desde la API
  const teamDetails = await getConstructorDetails(params.id);

  if (!teamDetails) {
    notFound();
  }

  // Obtener configuración adicional del equipo
  const config = getTeamConfig(params.id);

  // Obtener pilotos del equipo (filtrar todos los pilotos por constructorId)
  const allDrivers = await getDriverStandings();
  const teamDrivers = allDrivers.filter(
    (standing) => standing.constructor.id === params.id
  );

  // Preparar datos de pilotos para DriverCard
  const drivers = teamDrivers.map((standing) => ({
    id: standing.driver.id,
    name: standing.driver.name,
    number: 0, // API no proporciona número en standings
    team: teamDetails.name,
    teamColor: config.teamColor,
    country: standing.driver.nationality,
    flag: standing.driver.flagEmoji || '🏁',
    image: standing.driver.image,
  }));

  const stats = [
    { icon: <MapPin size={24} />, label: 'Sede', value: config.base },
    { icon: <UserCircle size={24} />, label: 'Jefe de Equipo', value: config.teamPrincipal },
    { icon: <Wrench size={24} />, label: 'Motor', value: config.powerUnit || 'N/A' },
    { icon: <Trophy size={24} />, label: 'Campeonatos', value: config.worldChampionships || 0 },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="relative pt-24 pb-12 text-white"
        style={{
            background: `linear-gradient(100deg, ${config.teamColor} 0%, #131316 60%)`
        }}
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-48 h-48 md:w-56 md:h-56 flex-shrink-0">
                <ClientImage
                    src={teamDetails.image}
                    alt={`${teamDetails.name} logo`}
                    objectFit="contain"
                    fallback={
                        <div className="w-full h-full bg-dark-950/50 rounded-lg flex items-center justify-center">
                            <Building className="w-3/5 h-3/5 text-dark-700" />
                        </div>
                    }
                />
            </div>
            <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-black font-heading text-light-50">
                    {teamDetails.name}
                </h1>
                <p className="text-light-200 text-lg mt-2">{teamDetails.nationality}</p>
            </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold font-heading text-light-100 mb-4 border-b-2 border-dark-800 pb-2">
                Historia del Equipo
              </h2>
              <div className="prose prose-invert max-w-none text-light-300">
                <p>{config.description || 'Información del equipo próximamente.'}</p>
              </div>

              {/* Wikipedia Link */}
              {teamDetails.url && (
                <a
                  href={teamDetails.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-accent-cyan hover:text-accent-cyan/80 transition-colors"
                >
                  <ExternalLink size={18} />
                  <span>Ver más en Wikipedia</span>
                </a>
              )}
            </div>

            {/* Drivers */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-8 h-8 text-accent-cyan" />
                <h2 className="text-3xl font-bold font-heading text-light-100">
                  Pilotos 2025
                </h2>
              </div>
              {drivers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {drivers.map(driver => <DriverCard key={driver.id} driver={driver} />)}
                </div>
              ) : (
                <p className="text-light-400">Pilotos por confirmar para esta escudería.</p>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            {stats.map(stat => <StatCard key={stat.label} {...stat} />)}
          </div>
        </div>
      </main>
    </div>
  );
}
