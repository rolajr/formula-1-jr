"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Calendar } from "lucide-react";
import type { RaceCalendarEvent } from "@/services/f1Api";

interface UpcomingRacesWidgetProps {
  races: RaceCalendarEvent[];
}

// Map country names to ISO codes for flag images
const countryToISO: Record<string, string> = {
  Australia: "au",
  Bahrain: "bh",
  "Saudi Arabia": "sa",
  Italy: "it",
  USA: "us",
  Monaco: "mc",
  Spain: "es",
  Canada: "ca",
  Austria: "at",
  UK: "gb",
  Hungary: "hu",
  Belgium: "be",
  Netherlands: "nl",
  Singapore: "sg",
  Japan: "jp",
  Qatar: "qa",
  Mexico: "mx",
  Brazil: "br",
  "United States": "us",
  UAE: "ae",
  Azerbaijan: "az",
  France: "fr",
  Germany: "de",
  Portugal: "pt",
  Russia: "ru",
  Turkey: "tr",
  China: "cn",
  "Great Britain": "gb",
};

// Get flag image URL
const getFlagUrl = (country: string): string => {
  const isoCode = countryToISO[country] || "xx";
  return `https://flagcdn.com/w40/${isoCode}.png`;
};

export default function UpcomingRacesWidget({
  races,
}: UpcomingRacesWidgetProps) {
  // Formatear fecha a formato corto
  const formatShortDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      const month = date.toLocaleDateString("es-ES", { month: "short" });
      const day = date.toLocaleDateString("es-ES", { day: "2-digit" });
      return `${month.charAt(0).toUpperCase() + month.slice(1)} ${day}`;
    } catch (error) {
      return "N/A";
    }
  };

  // Obtener solo el nombre del país (sin "Grand Prix")
  const getCountryName = (raceName: string): string => {
    return raceName
      .replace(/Grand Prix$/i, "")
      .replace(/^Australian /i, "Australia")
      .replace(/^Chinese /i, "China")
      .replace(/^Japanese /i, "Japón")
      .replace(/^Bahrain /i, "Bahréin")
      .replace(/^Saudi Arabian /i, "Arabia Saudita")
      .replace(/^Miami /i, "Miami")
      .replace(/^Emilia Romagna /i, "Emilia Romagna")
      .replace(/^Monaco /i, "Mónaco")
      .replace(/^Spanish /i, "España")
      .replace(/^Canadian /i, "Canadá")
      .replace(/^Austrian /i, "Austria")
      .replace(/^British /i, "Gran Bretaña")
      .replace(/^Belgian /i, "Bélgica")
      .replace(/^Hungarian /i, "Hungría")
      .replace(/^Dutch /i, "Países Bajos")
      .replace(/^Italian /i, "Italia")
      .replace(/^Azerbaijan /i, "Azerbaiyán")
      .replace(/^Singapore /i, "Singapur")
      .replace(/^United States /i, "Estados Unidos")
      .replace(/^Mexico City /i, "México")
      .replace(/^São Paulo /i, "Brasil")
      .replace(/^Las Vegas /i, "Las Vegas")
      .replace(/^Qatar /i, "Catar")
      .replace(/^Abu Dhabi /i, "Abu Dabi")
      .trim();
  };

  // Tomar las primeras 5 carreras
  const upcomingRaces = races.slice(0, 5);

  return (
    <div className="bg-dark-900 border border-dark-700 rounded-2xl p-4 text-light-50 shadow-lg">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold font-heading">
          Próximos GP&apos;s F1
        </h3>
        <Link
          href="/calendar"
          className="flex items-center gap-1 text-sm text-accent-red-500 hover:text-accent-red-400 font-semibold transition-colors group"
        >
          Ver Todos
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Tabla de Carreras */}
      <div className="flex-grow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs text-light-400 uppercase border-b border-dark-700">
            <tr>
              <th scope="col" className="pb-2 font-medium text-left">
                Fecha
              </th>
              <th scope="col" className="pb-2 font-medium text-left">
                País
              </th>
              <th
                scope="col"
                className="pb-2 font-medium text-left hidden sm:table-cell"
              >
                Circuito
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-800">
            {upcomingRaces.map((race, index) => (
              <tr
                key={index}
                className="hover:bg-dark-800/50 transition-colors"
              >
                <td className="py-3 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-accent-cyan flex-shrink-0" />
                    <span className="whitespace-nowrap">
                      {formatShortDate(race.date)}
                    </span>
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src={getFlagUrl(race.country)}
                      alt={race.country}
                      width={24}
                      height={16}
                      className="rounded shadow-sm flex-shrink-0"
                      unoptimized
                    />
                    <span className="font-semibold text-xs truncate">
                      {getCountryName(race.raceName)}
                    </span>
                  </div>
                </td>
                <td className="py-3 text-light-300 text-xs hidden sm:table-cell">
                  <span className="truncate block max-w-[100px]">
                    {race.city}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
