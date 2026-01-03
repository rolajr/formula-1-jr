// Jolpica F1 API Response Types
// API Documentation: https://api.jolpi.ca/ergast/f1

// Base API Response
export interface JolpicaResponse<T> {
  MRData: {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
  } & T;
}

// Race API Types
export interface RaceTable {
  RaceTable: {
    season: string;
    Races: RaceData[];
  };
}

export interface RaceData {
  season: string;
  round: string;
  raceName: string;
  Circuit: {
    circuitId: string;
    circuitName: string;
    Location: {
      locality: string;
      country: string;
      lat: string;
      long: string;
    };
  };
  date: string;
  time?: string;
  url: string;
  FirstPractice?: SessionData;
  SecondPractice?: SessionData;
  ThirdPractice?: SessionData;
  Qualifying?: SessionData;
  Sprint?: SessionData;
}

export interface SessionData {
  date: string;
  time: string;
}

// Driver Standings API Types
export interface StandingsTable {
  StandingsTable: {
    season: string;
    round?: string;
    StandingsLists: StandingsList[];
  };
}

export interface StandingsList {
  season: string;
  round: string;
  DriverStandings: DriverStandingData[];
}

export interface DriverStandingData {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: DriverData;
  Constructors: ConstructorData[];
}

export interface DriverData {
  driverId: string;
  permanentNumber?: string;
  code: string;
  givenName: string;
  familyName: string;
  dateOfBirth?: string;
  nationality: string;
  url: string;
}

export interface ConstructorData {
  constructorId: string;
  name: string;
  nationality: string;
  url: string;
}

// Type guards for runtime validation
export function isValidRaceResponse(data: unknown): data is JolpicaResponse<RaceTable> {
  return (
    typeof data === 'object' &&
    data !== null &&
    'MRData' in data &&
    typeof (data as any).MRData === 'object' &&
    'RaceTable' in (data as any).MRData
  );
}

export function isValidStandingsResponse(
  data: unknown
): data is JolpicaResponse<StandingsTable> {
  return (
    typeof data === 'object' &&
    data !== null &&
    'MRData' in data &&
    typeof (data as any).MRData === 'object' &&
    'StandingsTable' in (data as any).MRData
  );
}
