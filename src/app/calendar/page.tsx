import { Calendar as CalendarIcon } from "lucide-react";
import Link from "next/link";
import { getRaceCalendar, RaceCalendarEvent } from "@/services/f1Api";
import { getCalendarEventsMock } from "@/data/mocks";
import Image from "next/image";

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return date.toLocaleDateString("es-ES", options);
};

// Map country names to ISO 3166-1 alpha-2 codes for flag images
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
  return `https://flagcdn.com/w160/${isoCode}.png`;
};

// Extract country name from race name
const getCountryFromRaceName = (raceName: string): string => {
  // Remove "Grand Prix" and common prefixes to get just the country
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

export default async function CalendarPage() {
  let calendarEvents: RaceCalendarEvent[] = [];

  try {
    calendarEvents = await getRaceCalendar("2025");
    if (calendarEvents.length === 0) {
      console.warn("API returned no calendar events, using mock data.");
      calendarEvents = getCalendarEventsMock();
    }
  } catch (error) {
    console.error(
      "Error fetching race calendar, using mock data as fallback:",
      error
    );
    calendarEvents = getCalendarEventsMock();
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <CalendarIcon className="w-8 h-8 text-accent-red-500" />
            <h1 className="text-4xl font-heading font-black text-light-50">
              Calendario F1 2025
            </h1>
          </div>
          <p className="text-light-400">
            Todas las carreras de la temporada 2025 de Formula 1.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-dark-900 border border-dark-700 rounded-lg">
            <thead className="bg-dark-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-light-400 uppercase tracking-wider">
                  Ronda
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-light-400 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-light-400 uppercase tracking-wider">
                  Gran Premio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-light-400 uppercase tracking-wider">
                  Circuito
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-light-400 uppercase tracking-wider">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {calendarEvents.map((race) => (
                <tr key={race.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-light-50">
                    {race.round}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-light-300">
                    {formatDate(race.date)}
                  </td>
                  <td className="px-6 py-4 text-sm text-light-50">
                    <div className="flex items-center gap-4">
                      <div className="relative group perspective-container">
                        {/* Glow effect */}
                        <div className="absolute -inset-2 bg-gradient-to-r from-accent-red-500/20 via-accent-gold/20 to-accent-cyan/20 rounded-2xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500 animate-pulse-slow"></div>

                        {/* Flag container with wave animation */}
                        <div className="relative w-16 h-11 overflow-visible flag-wave-container">
                          <Image
                            src={getFlagUrl(race.country)}
                            alt={`Bandera de ${race.country}`}
                            width={64}
                            height={44}
                            className="flag-wave object-cover rounded-lg shadow-2xl"
                            style={{
                              filter:
                                "drop-shadow(0 4px 12px rgba(0,0,0,0.6)) drop-shadow(0 0 20px rgba(255,255,255,0.1)) brightness(1.1)",
                            }}
                            unoptimized
                          />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-light-50 text-base group-hover:text-accent-cyan transition-colors">
                          {getCountryFromRaceName(race.raceName)}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-light-300">
                    {race.circuitName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href="/schedule"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-accent-cyan/10 hover:bg-accent-cyan/20 text-accent-cyan rounded-lg transition-colors font-semibold"
                    >
                      Ver Horarios
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
