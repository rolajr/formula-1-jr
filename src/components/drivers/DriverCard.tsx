import Link from "next/link";
import ClientImage from '@/components/ui/ClientImage';
import { ChevronRight } from "lucide-react";

interface Driver {
  id: string;
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
  
  // Separar nombre y apellido para el énfasis visual
  const nameParts = driver.name.split(' ');
  const firstName = nameParts.slice(0, -1).join(' ');
  const lastName = nameParts[nameParts.length - 1];

  return (
    <Link href={`/drivers/${driver.id}`} className="block group w-full">
      <div 
        className="relative h-60 w-full overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
        style={{ backgroundColor: driver.teamColor || '#1f1f1f' }}
      >
        {/* Capa de gradiente para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none z-10" />
        
        {/* Icono de flecha en hover */}
        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-1">
                <ChevronRight className="w-5 h-5 text-white" />
            </div>
        </div>

        <div className="flex h-full relative">
            {/* LADO IZQUIERDO: Tipografía y Datos */}
            <div className="relative z-20 flex flex-col justify-between w-[55%] p-6 h-full">
                
                {/* Header: Nombre y Equipo */}
                <div className="space-y-1">
                    <p className="text-base font-medium text-white/90 tracking-wide leading-none">
                        {firstName}
                    </p>
                    <h2 className="text-4xl sm:text-5xl font-black font-heading text-white uppercase italic tracking-tighter leading-[0.9]">
                        {lastName}
                    </h2>
                    <div className="pt-3">
                         <span className="inline-block text-xs font-bold text-white/80 border-l-[3px] border-white/40 pl-2 uppercase tracking-wider">
                            {driver.team}
                        </span>
                    </div>
                </div>

                {/* Footer: Número */}
                <div className="mt-auto">
                    <span className="font-heading text-6xl font-black text-white leading-none">
                        {driver.number}
                    </span>
                </div>
            </div>

            {/* LADO DERECHO: Imagen del Piloto (Contenedor de Columna) */}
            <div className="absolute inset-y-0 right-0 w-[60%] h-full z-0">
                <ClientImage
                    src={imageSrc}
                    alt={driver.name}
                    fill
                    className="object-cover object-right drop-shadow-2xl transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 60vw, 40vw"
                    priority={false}
                />
            </div>
        </div>
      </div>
    </Link>
  );
}