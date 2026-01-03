
import { notFound } from 'next/navigation';
import { getDriverDetails } from '@/services/f1Api';
import { User, Trophy, Award, BarChart, BookOpen, Link as LinkIcon } from 'lucide-react';
import ClientImage from '@/components/ui/ClientImage';

type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
};

const StatCard = ({ icon, label, value }: StatCardProps) => (
  <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4">
    <div className="text-accent-cyan">{icon}</div>
    <div>
      <p className="text-light-300 text-sm">{label}</p>
      <p className="text-light-50 font-bold text-2xl">{value}</p>
    </div>
  </div>
);

export default async function DriverProfilePage({ params }: { params: { id: string } }) {
  const driver = await getDriverDetails(params.id);

  if (!driver) {
    notFound();
  }

  // Hardcoded stats for demonstration, as API doesn't provide them directly
  const stats = [
    { icon: <Trophy size={28} />, label: 'Campeonatos', value: 'N/A' },
    { icon: <Award size={28} />, label: 'Podios', value: 'N/A' },
    { icon: <BarChart size={28} />, label: 'Puntos', value: 'N/A' },
    { icon: <BookOpen size={28} />, label: 'Grandes Premios', value: 'N/A' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative pt-24 pb-12 text-white"
        style={{
            background: `linear-gradient(90deg, #E10600 0%, #131316 70%)` // Usar un color estático o de un mock si no viene de la API
        }}
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
                <ClientImage
                    src={driver.image || ''} // Usar la imagen de la API
                    alt={driver.name}
                    objectFit="cover"
                    className="rounded-full"
                    fallback={
                        <div className="w-full h-full bg-dark-950/50 rounded-full flex items-center justify-center">
                            <User className="w-3/5 h-3/5 text-dark-700" />
                        </div>
                    }
                />
                {/* Number */}
                <div className="absolute top-0 right-0 bg-dark-950/80 backdrop-blur-sm p-3 rounded-full">
                    <p className="text-4xl font-black font-mono text-light-50 leading-none">
                        {driver.number || 'N/A'}
                    </p>
                </div>
            </div>

            {/* Driver Info */}
            <div className="text-center md:text-left">
                {/* <p className="text-lg font-semibold" style={{ color: driver.teamColor }}>{driver.team}</p> */}
                <h1 className="text-5xl md:text-7xl font-black font-heading text-light-50 my-1">
                    {driver.name}
                </h1>
                <div className="flex items-center justify-center md:justify-start gap-3 mt-2">
                    <span className="text-4xl">{driver.flagEmoji || '🏁'}</span>
                    <p className="text-xl text-light-200">{driver.nationality}</p>
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map(stat => <StatCard key={stat.label} {...stat} />)}
        </div>

        {/* Biography */}
        <div>
          <h2 className="text-3xl font-bold font-heading text-light-100 mb-4 border-b-2 border-dark-800 pb-2">
            Biografía
          </h2>
          <div className="prose prose-invert max-w-none text-light-300">
            <p>
              Información detallada sobre {driver.name} y su carrera en la Fórmula 1.
              La API no proporciona una biografía completa directamente, pero puedes encontrar más información en su página de Wikipedia.
            </p>
            {driver.url && (
                <p className="mt-4">
                    <a href={driver.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-accent-cyan hover:underline">
                        <LinkIcon className="w-4 h-4 mr-2" />
                        Ver biografía completa en Wikipedia
                    </a>
                </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
