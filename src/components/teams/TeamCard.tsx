
import { Building, UserCircle, MapPin } from 'lucide-react';
import ClientImage from '@/components/ui/ClientImage';
import Link from 'next/link';

interface Team {
  id: string; // id ahora es string (constructorId de la API)
  name: string;
  base: string;
  teamPrincipal: string;
  teamColor: string;
  logo?: string; // Ruta del logo, ahora opcional
}

interface TeamCardProps {
  team: Team;
}

export default function TeamCard({ team }: TeamCardProps) {
  const finalImage = team.logo || `/imagenes/escuderias/${team.id}.png`;

  return (
    <Link href={`/teams/${team.id}`} className="block group">
      <div
        className="bg-dark-900 border border-dark-800 rounded-2xl overflow-hidden shadow-lg h-full transition-all duration-300 ease-in-out group-hover:shadow-cyan-500/20 group-hover:-translate-y-1 group-hover:border-cyan-500/30"
        style={{ '--team-color': team.teamColor } as React.CSSProperties}
      >
        <div className="relative">
          {/* Team Color Bar */}
          <div className="h-3 bg-[var(--team-color)]" />

          {/* Logo/Image Placeholder */}
          <div className="aspect-[16/10] bg-dark-800 flex items-center justify-center p-4 relative" style={{ backgroundColor: team.teamColor + '20' }}>
              <ClientImage
                  src={finalImage}
                  alt={`${team.name} logo`}
                  objectFit="contain"
                  fallback={
                      <Building className="w-20 h-20 text-dark-700" style={{ color: team.teamColor }} />
                  }
              />
          </div>
        </div>

        {/* Team Info */}
        <div className="p-5">
          <h3 className="text-xl font-bold font-heading text-light-50 truncate" title={team.name}>
            {team.name}
          </h3>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center gap-2 text-light-200">
              <MapPin className="w-4 h-4 text-accent-cyan" />
              <span>{team.base}</span>
            </div>
            <div className="flex items-center gap-2 text-light-200">
              <UserCircle className="w-4 h-4 text-accent-cyan" />
              <span>{team.teamPrincipal}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
