import type { JolpicaResponse, RaceTable, StandingsTable } from "@/types/api";

// API Configuration
const API_BASE_URL = "https://api.jolpi.ca/ergast/f1";
const CURRENT_SEASON = "2025"; // Force 2025 season data
const REQUEST_TIMEOUT = 10000; // 10 seconds

// --- NEW TRANSFORMED TYPES ---
export interface CurrentDriverStanding {
  position: string;
  points: string;
  wins: string;
  driver: {
    id: string; // driverId de la api
    name: string; // givenName + familyName
    code: string; // ej: VER
    nationality: string;
    flagEmoji: string | null; // Intentar mapear o dejar null
    image: string; // Ruta a la imagen del piloto
  };
  constructor: {
    id: string;
    name: string;
  };
}

export interface CurrentConstructorStanding {
  position: number;
  name: string;
  points: number;
  wins: number;
  constructorId: string;
  image: string; // Ruta a la imagen del constructor
}

export interface RaceCalendarEvent {
  round: number;
  raceName: string;
  circuitName: string;
  circuitId: string;
  date: string; // YYYY-MM-DD
  time?: string; // HH:MM:SSZ
  city: string;
  country: string;
  flagEmoji: string;
  id: string; // slug from raceName
}

export interface DriverDetails {
  id: string; // driverId de la API
  name: string; // givenName + familyName
  number?: number;
  code?: string;
  nationality: string;
  dateOfBirth: string;
  url: string; // URL a Wikipedia
  image: string; // Ruta de imagen generada
  flagEmoji: string | null;
}

export interface ConstructorDetails {
  id: string; // constructorId de la API
  name: string;
  nationality: string;
  url: string; // URL a Wikipedia
  image: string; // Ruta de imagen generada
}
// --------------------------

// Error Classes
export class F1ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public endpoint?: string
  ) {
    super(message);
    this.name = "F1ApiError";
  }
}

export class F1ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "F1ValidationError";
  }
}

// HTTP Client with timeout and error handling
async function fetchWithTimeout(
  url: string,
  timeout = REQUEST_TIMEOUT
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
      // Next.js caching: revalidate every 1 hour
      next: { revalidate: 3600 },
    });

    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new F1ApiError("Request timeout", 408, url);
    }
    throw error;
  }
}

// Generic API fetcher with validation
async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      throw new F1ApiError(
        `API request failed: ${response.statusText}`,
        response.status,
        endpoint
      );
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof F1ApiError) {
      throw error;
    }

    if (error instanceof Error) {
      throw new F1ApiError(
        `Network error: ${error.message}`,
        undefined,
        endpoint
      );
    }

    throw new F1ApiError("Unknown error occurred", undefined, endpoint);
  }
}

// Transformed data types for application use
export interface RaceSession {
  date: string;
  time: string;
}

export interface NextRaceInfo {
  name: string;
  location: string;
  circuit: string;
  date: string;
  round: number;
  season: number;
  country: string;
  flagEmoji: string;
  sessions: {
    firstPractice?: RaceSession;
    secondPractice?: RaceSession;
    thirdPractice?: RaceSession;
    qualifying?: RaceSession;
    sprint?: RaceSession;
  };
}

// Country to flag emoji mapping (for countries/locations)
const countryFlags: Record<string, string> = {
  Australia: "🇦🇺",
  Bahrain: "🇧🇭",
  "Saudi Arabia": "🇸🇦",
  Italy: "🇮🇹",
  USA: "🇺🇸",
  Monaco: "🇲🇨",
  Spain: "🇪🇸",
  Canada: "🇨🇦",
  Austria: "🇦🇹",
  UK: "🇬🇧",
  Hungary: "🇭🇺",
  Belgium: "🇧🇪",
  Netherlands: "🇳🇱",
  Singapore: "🇸🇬",
  Japan: "🇯🇵",
  Qatar: "🇶🇦",
  Mexico: "🇲🇽",
  Brazil: "🇧🇷",
  "United States": "🇺🇸",
  UAE: "🇦🇪",
  Azerbaijan: "🇦🇿",
  France: "🇫🇷",
  Germany: "🇩🇪",
  Portugal: "🇵🇹",
  Russia: "🇷🇺",
  Turkey: "🇹🇷",
};

function getFlagEmojiByCountry(country: string): string {
  return countryFlags[country] || "🏁";
}

// Nationality to flag emoji mapping (for drivers)
const nationalityFlags: Record<string, string> = {
  Dutch: "🇳🇱",
  British: "🇬🇧",
  Mexican: "🇲🇽",
  Spanish: "🇪🇸",
  Monegasque: "🇲🇨",
  Thai: "🇹🇭",
  German: "🇩🇪",
  Finnish: "🇫🇮",
  French: "🇫🇷",
  Australian: "🇦🇺",
  Canadian: "🇨🇦",
  Danish: "🇩🇰",
  Chinese: "🇨🇳",
  Japanese: "🇯🇵",
  American: "🇺🇸",
  New_Zealander: "🇳🇿",
  Brazilian: "🇧🇷",
  Argentine: "🇦🇷",
  Austrian: "🇦🇹",
  Belgian: "🇧🇪",
  Hungarian: "🇭🇺",
  Italian: "🇮🇹",
  Russian: "🇷🇺",
  Turkish: "🇹🇷",
  Portuguese: "🇵🇹",
  Azerbaijani: "🇦🇿",
};

function getFlagEmojiByNationality(nationality: string): string | null {
  return nationalityFlags[nationality] || null;
}

/**
 * Get the next scheduled race
 * @returns Next race information or null if no upcoming race
 */
export async function getNextRace(): Promise<NextRaceInfo | null> {
  try {
    const data = await fetchFromAPI<JolpicaResponse<RaceTable>>(
      `/${CURRENT_SEASON}/next.json`
    );

    // Validate response structure
    if (
      !data?.MRData?.RaceTable?.Races ||
      data.MRData.RaceTable.Races.length === 0
    ) {
      console.warn("No upcoming races found");
      return null;
    }

    const race = data.MRData.RaceTable.Races[0];

    // Validate required fields
    if (!race.raceName || !race.Circuit || !race.date) {
      throw new F1ValidationError("Invalid race data: missing required fields");
    }

    return {
      name: race.raceName,
      location: `${race.Circuit.Location.locality}, ${race.Circuit.Location.country}`,
      circuit: race.Circuit.circuitName,
      date: race.time ? `${race.date}T${race.time}` : `${race.date}T15:00:00Z`,
      round: parseInt(race.round, 10),
      season: parseInt(race.season, 10),
      country: race.Circuit.Location.country,
      flagEmoji: getFlagEmojiByCountry(race.Circuit.Location.country),
      sessions: {
        firstPractice: race.FirstPractice,
        secondPractice: race.SecondPractice,
        thirdPractice: race.ThirdPractice,
        qualifying: race.Qualifying,
        sprint: race.Sprint,
      },
    };
  } catch (error) {
    console.error("Error fetching next race:", error);

    // Return fallback data instead of crashing
    return {
      name: "Season Starting Soon",
      location: "TBA",
      circuit: "Check back for updates",
      date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      round: 1,
      season: 2025,
      country: "International",
      flagEmoji: "🏁",
      sessions: {},
    };
  }
}

/**
 * Get current driver standings for the whole season
 * @returns Array of driver standings
 */
export async function getDriverStandings(): Promise<CurrentDriverStanding[]> {
  try {
    const data = await fetchFromAPI<JolpicaResponse<StandingsTable>>(
      `/${CURRENT_SEASON}/driverStandings.json`
    );

    if (!data?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings) {
      console.warn("No driver standings found in API response.");
      return [];
    }

    const standings =
      data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

    return standings.map((s) => {
      if (!s.Driver || !s.Constructors?.[0]) {
        throw new F1ValidationError(
          "Invalid standing data: missing driver or constructor"
        );
      }
      return {
        position: s.position, // Keep as string
        points: s.points, // Keep as string
        wins: s.wins, // Keep as string
        driver: {
          id: s.Driver.driverId,
          name: `${s.Driver.givenName} ${s.Driver.familyName}`,
          code: s.Driver.code,
          nationality: s.Driver.nationality,
          flagEmoji: getFlagEmojiByNationality(s.Driver.nationality),
          image: `/imagenes/pilotos/${s.Driver.driverId}.png`, // Added image path
        },
        constructor: {
          id: s.Constructors[0].constructorId,
          name: s.Constructors[0].name,
        },
      };
    });
  } catch (error) {
    console.error("Error fetching driver standings:", error);
    return []; // Return empty array as a fallback
  }
}

/**
 * Get current constructor standings for the whole season
 * @returns Array of constructor standings
 */
export async function getConstructorStandings(): Promise<
  CurrentConstructorStanding[]
> {
  try {
    const data = await fetchFromAPI<any>(
      `/${CURRENT_SEASON}/constructorStandings.json`
    );

    if (
      !data?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings
    ) {
      console.warn("No constructor standings found in API response.");
      return [];
    }

    const standings =
      data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;

    return standings.map((s: any) => {
      if (!s.Constructor) {
        throw new F1ValidationError(
          "Invalid standing data: missing constructor"
        );
      }
      return {
        position: parseInt(s.position, 10),
        name: s.Constructor.name,
        points: parseInt(s.points, 10),
        wins: parseInt(s.wins, 10),
        constructorId: s.Constructor.constructorId,
        image: `/imagenes/escuderias/${s.Constructor.constructorId}.png`, // Added image path
      };
    });
  } catch (error) {
    console.error("Error fetching constructor standings:", error);
    return []; // Return empty array as a fallback
  }
}

/**
 * Get the race calendar for a specific season.
 * @param season The season year (e.g., '2025'). Defaults to '2025'.
 * @returns Array of race events.
 */
export async function getRaceCalendar(
  season: string = "2025"
): Promise<RaceCalendarEvent[]> {
  try {
    const data = await fetchFromAPI<JolpicaResponse<RaceTable>>(
      `/${season}.json`
    );

    if (!data?.MRData?.RaceTable?.Races) {
      console.warn(`No race calendar found for season ${season}.`);
      return [];
    }

    return data.MRData.RaceTable.Races.map((race) => {
      if (
        !race.raceName ||
        !race.Circuit ||
        !race.Circuit.Location ||
        !race.date
      ) {
        throw new F1ValidationError(
          "Invalid race data in calendar: missing required fields"
        );
      }
      return {
        round: parseInt(race.round, 10),
        raceName: race.raceName,
        circuitName: race.Circuit.circuitName,
        circuitId: race.Circuit.circuitId,
        date: race.date,
        time: race.time,
        city: race.Circuit.Location.locality,
        country: race.Circuit.Location.country,
        flagEmoji: getFlagEmojiByCountry(race.Circuit.Location.country),
        id: race.raceName.toLowerCase().replace(/\s+/g, "-"),
      };
    });
  } catch (error) {
    console.error(`Error fetching race calendar for season ${season}:`, error);
    return [];
  }
}

// NEW FUNCTION: getDriverDetails
export interface DriverDetails {
  id: string; // driverId de la API
  name: string; // givenName + familyName
  number?: number;
  code?: string;
  nationality: string;
  dateOfBirth: string;
  url: string; // URL a Wikipedia
  image: string; // Ruta de imagen generada
  flagEmoji: string | null;
}

/**
 * Get details for a specific driver.
 * @param driverId The driver's ID (e.g., 'max_verstappen').
 * @returns DriverDetails object or null if not found/error.
 */
export async function getDriverDetails(
  driverId: string
): Promise<DriverDetails | null> {
  try {
    const data = await fetchFromAPI<JolpicaResponse<any>>(
      `/${CURRENT_SEASON}/drivers/${driverId}.json`
    );

    if (!data?.MRData?.DriverTable?.Drivers?.[0]) {
      console.warn(`Driver with ID ${driverId} not found.`);
      return null;
    }

    const d = data.MRData.DriverTable.Drivers[0];

    return {
      id: d.driverId,
      name: `${d.givenName} ${d.familyName}`,
      number: d.permanentNumber ? parseInt(d.permanentNumber, 10) : undefined,
      code: d.code,
      nationality: d.nationality,
      dateOfBirth: d.dateOfBirth,
      url: d.url,
      image: `/imagenes/pilotos/${d.driverId}.png`,
      flagEmoji: getFlagEmojiByNationality(d.nationality),
    };
  } catch (error) {
    console.error(`Error fetching driver details for ${driverId}:`, error);
    return null;
  }
}

// NEW FUNCTION: getConstructorDetails
export interface ConstructorDetails {
  id: string; // constructorId de la API
  name: string;
  nationality: string;
  url: string; // URL a Wikipedia
  image: string; // Ruta de imagen generada
}

/**
 * Get details for a specific constructor.
 * @param constructorId The constructor's ID (e.g., 'ferrari').
 * @returns ConstructorDetails object or null if not found/error.
 */
export async function getConstructorDetails(
  constructorId: string
): Promise<ConstructorDetails | null> {
  try {
    const data = await fetchFromAPI<JolpicaResponse<any>>(
      `/${CURRENT_SEASON}/constructors/${constructorId}.json`
    );

    if (!data?.MRData?.ConstructorTable?.Constructors?.[0]) {
      console.warn(`Constructor with ID ${constructorId} not found.`);
      return null;
    }

    const c = data.MRData.ConstructorTable.Constructors[0];

    return {
      id: c.constructorId,
      name: c.name,
      nationality: c.nationality,
      url: c.url,
      image: `/imagenes/escuderias/${c.constructorId}.png`,
    };
  } catch (error) {
    console.error(
      `Error fetching constructor details for ${constructorId}:`,
      error
    );
    return null;
  }
}

/**
 * Health check for API availability
 * @returns true if API is reachable
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/2025.json`, 5000);
    return response.ok;
  } catch {
    return false;
  }
}
