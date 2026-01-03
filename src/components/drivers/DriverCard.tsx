import { Car } from "lucide-react";
import Link from "next/link";
import ClientImage from '@/components/ui/ClientImage';

interface Driver {
  id: string; // id ahora es string (driverId de la API)
  name: string;
  number: number;
  team: string;
  teamColor: string;
  country: string;
  flag: string;
  image?: string;
}

interface DriverCardProps {
  driver: Driver;
}

export default function DriverCard({ driver }: DriverCardProps) {
  const imageSrc = driver.image || `/imagenes/pilotos/${driver.id}.png`;

  return (
    <Link href={`/drivers/${driver.id}`} className="block group">
        <div
        className="bg-dark-950 border border-dark-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out group-hover:shadow-2xl group-hover:-translate-y-1 group-hover:border-light-500/30"
        style={{ '--team-color': driver.teamColor } as React.CSSProperties}
        >
        <div className="relative">
            {/* Team Color Accent */}
            <div className="h-2 bg-[var(--team-color)]" />

            {/* Photo */}
            <div className="aspect-square bg-dark-800 flex items-center justify-center relative">
                <ClientImage
                    src={imageSrc}
                    alt={driver.name}
                    objectFit="cover"
                    fallback={
                        <div className="w-full h-full bg-dark-800 flex items-center justify-center">
                            <Car className="w-16 h-16 text-dark-700" />
                        </div>
                    }
                />
            </div>

            {/* Driver Number */}
            <div className="absolute top-4 right-4 bg-dark-950/80 backdrop-blur-sm p-2 rounded-lg">
            <p className="text-3xl font-black font-mono text-light-50 leading-none">
                {driver.number}
            </p>
            </div>
        </div>

        {/* Driver Info */}
        <div className="p-5">
            <div className="flex items-start justify-between">
            <div>
                <p className="text-xs font-medium text-light-400">{driver.team}</p>
                <h3 className="text-2xl font-bold font-heading text-light-50 mt-1">
                {driver.name}
                </h3>
            </div>
            <div className="text-3xl pt-2">{driver.flag}</div>
            </div>
        </div>
        </div>
    </Link>
  );
}
