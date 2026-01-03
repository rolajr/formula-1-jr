// Navigation types
export interface NavLink {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

// Driver types
export interface Driver {
  id: string;
  name: string;
  number: number;
  team: string;
  nationality: string;
  points: number;
  position: number;
  photo?: string;
}

// Team types
export interface Team {
  id: string;
  name: string;
  fullName: string;
  logo?: string;
  color: string;
  points: number;
  position: number;
}

// Race types
export interface Race {
  id: string;
  name: string;
  circuit: string;
  country: string;
  date: string;
  status: 'upcoming' | 'live' | 'completed';
}

// Standing types
export interface DriverStanding extends Driver {
  wins: number;
  podiums: number;
}

export interface TeamStanding extends Team {
  wins: number;
  podiums: number;
}

export interface StandingEntry {
  position: number;
  driver: {
    name: string;
    number: number;
    code: string;
    team: string;
    nationality: string;
    flagEmoji?: string;
  };
  points: number;
  wins: number;
}

