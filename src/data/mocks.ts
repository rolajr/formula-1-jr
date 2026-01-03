// Mock data for development and preview purposes

export const mockNextRace = {
  name: 'Bahrain Grand Prix',
  location: 'Sakhir, Bahrain',
  circuit: 'Bahrain International Circuit',
  date: '2026-03-01T15:00:00Z',
  round: 1,
  season: 2026,
  country: 'Bahrain',
  flagEmoji: '🇧🇭',
  circuitImage: '/imagenes/circuitos/bahrain.png',
};

export const mockStandingsTop3 = [
  {
    position: 1,
    driver: {
      name: 'Max Verstappen',
      number: 1,
      code: 'VER',
      team: 'Red Bull Racing',
      nationality: 'Dutch',
      flagEmoji: '🇳🇱',
    },
    points: 287,
    wins: 12,
  },
  {
    position: 2,
    driver: {
      name: 'Lewis Hamilton',
      number: 44,
      code: 'HAM',
      team: 'Ferrari',
      nationality: 'British',
      flagEmoji: '🇬🇧',
    },
    points: 256,
    wins: 8,
  },
  {
    position: 3,
    driver: {
      name: 'Charles Leclerc',
      number: 16,
      code: 'LEC',
      team: 'Ferrari',
      nationality: 'Monégasque',
      flagEmoji: '🇲🇨',
    },
    points: 234,
    wins: 6,
  },
];

export const mockNews = [
  {
    id: 1,
    title: 'Hamilton hace un movimiento histórico a Ferrari para la temporada 2026',
    excerpt: 'El siete veces campeón del mundo Lewis Hamilton se une al Cavallino Rampante en un traspaso de gran éxito.',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=600',
    category: 'Traspaso',
    date: '2026-01-15',
  },
  {
    id: 2,
    title: 'Las nuevas regulaciones técnicas transformarán la parrilla de 2026',
    excerpt: 'La FIA presenta cambios revolucionarios en la unidad de potencia y la aerodinámica para la próxima temporada.',
    image: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?w=800&h=600',
    category: 'Reglamento',
    date: '2026-01-10',
  },
  {
    id: 3,
    title: 'Las pruebas de pretemporada comienzan la próxima semana en Barcelona',
    excerpt: 'Los diez equipos se preparan para salir a la pista por primera vez con sus monoplazas de 2026.',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=600',
    category: 'Pruebas',
    date: '2026-02-20',
  },
];

export const mockDrivers = [
  {
    id: 'max_verstappen',
    name: 'Max Verstappen',
    slug: 'max-verstappen',
    number: 1,
    team: 'Red Bull Racing',
    teamColor: 'hsl(221, 83%, 27%)',
    country: 'Netherlands',
    flag: '🇳🇱',
  },
  {
    id: 'hamilton',
    name: 'Lewis Hamilton',
    slug: 'lewis-hamilton',
    number: 44,
    team: 'Ferrari',
    teamColor: 'hsl(358, 75%, 39%)',
    country: 'United Kingdom',
    flag: '🇬🇧',
  },
  {
    id: 'leclerc',
    name: 'Charles Leclerc',
    slug: 'charles-leclerc',
    number: 16,
    team: 'Ferrari',
    teamColor: 'hsl(358, 75%, 39%)',
    country: 'Monaco',
    flag: '🇲🇨',
  },
  {
    id: 'norris',
    name: 'Lando Norris',
    slug: 'lando-norris',
    number: 4,
    team: 'McLaren',
    teamColor: 'hsl(21, 89%, 52%)',
    country: 'United Kingdom',
    flag: '🇬🇧',
  },
  {
    id: 'alonso',
    name: 'Fernando Alonso',
    slug: 'fernando-alonso',
    number: 14,
    team: 'Aston Martin',
    teamColor: 'hsl(142, 69%, 26%)',
    country: 'Spain',
    flag: '🇪🇸',
  },
  {
    id: 'perez',
    name: 'Sergio Pérez',
    slug: 'sergio-perez',
    number: 11,
    team: 'Red Bull Racing',
    teamColor: 'hsl(221, 83%, 27%)',
    country: 'Mexico',
    flag: '🇲🇽',
  },
  {
    id: 'russell',
    name: 'George Russell',
    slug: 'george-russell',
    number: 63,
    team: 'Mercedes',
    teamColor: 'hsl(187, 85%, 80%)',
    country: 'United Kingdom',
    flag: '🇬🇧'
  },
  {
    id: 'piastri',
    name: 'Oscar Piastri',
    slug: 'oscar-piastri',
    number: 81,
    team: 'McLaren',
    teamColor: 'hsl(21, 89%, 52%)',
    country: 'Australia',
    flag: '🇦🇺'
  },
];

export const mockTeams = [
  {
    id: 1,
    slug: 'oracle-red-bull-racing',
    name: 'Oracle Red Bull Racing',
    logo: '/imagenes/escuderias/red-bull.png',
    base: 'Milton Keynes, UK',
    teamPrincipal: 'Christian Horner',
    teamColor: '#001A3D',
  },
  {
    id: 2,
    slug: 'scuderia-ferrari-hp',
    name: 'Scuderia Ferrari HP',
    logo: '/imagenes/escuderias/ferrari.png',
    base: 'Maranello, Italy',
    teamPrincipal: 'Frédéric Vasseur',
    teamColor: '#D92A2A',
  },
  {
    id: 3,
    slug: 'mclaren-formula-1-team',
    name: 'McLaren Formula 1 Team',
    logo: '/imagenes/escuderias/mclaren.png',
    base: 'Woking, UK',
    teamPrincipal: 'Andrea Stella',
    teamColor: '#FF8000',
  },
  {
    id: 4,
    slug: 'mercedes-amg-petronas-f1-team',
    name: 'Mercedes-AMG PETRONAS F1 Team',
    logo: '/imagenes/escuderias/mercedes.png',
    base: 'Brackley, UK',
    teamPrincipal: 'Toto Wolff',
    teamColor: '#00A19C',
  },
  {
    id: 5,
    slug: 'aston-martin-aramco-f1-team',
    name: 'Aston Martin Aramco F1 Team',
    logo: '/imagenes/escuderias/aston-martin.png',
    base: 'Silverstone, UK',
    teamPrincipal: 'Mike Krack',
    teamColor: '#00594F',
  },
  {
    id: 6,
    slug: 'bwt-alpine-f1-team',
    name: 'BWT Alpine F1 Team',
    logo: '/imagenes/escuderias/alpine.png',
    base: 'Enstone, UK',
    teamPrincipal: 'Bruno Famin',
    teamColor: '#0078C1',
  },
  {
    id: 7,
    slug: 'williams-racing',
    name: 'Williams Racing',
    logo: '/imagenes/escuderias/williams.png',
    base: 'Grove, UK',
    teamPrincipal: 'James Vowles',
    teamColor: '#00A3E0',
  },
  {
    id: 8,
    slug: 'visa-cash-app-rb-f1-team',
    name: 'Visa Cash App RB F1 Team',
    logo: '/imagenes/escuderias/rb.png',
    base: 'Faenza, Italy',
    teamPrincipal: 'Laurent Mekies',
    teamColor: '#002E5A',
  },
  {
    id: 9,
    slug: 'moneygram-haas-f1-team',
    name: 'MoneyGram Haas F1 Team',
    logo: '/imagenes/escuderias/haas.png',
    base: 'Kannapolis, USA',
    teamPrincipal: 'Ayao Komatsu',
    teamColor: '#B6B6B6',
  },
  {
    id: 10,
    slug: 'audi-f1-team',
    name: 'Audi F1 Team',
    logo: '/imagenes/escuderias/audi.png',
    base: 'Hinwil, Switzerland',
    teamPrincipal: 'Andreas Seidl',
    teamColor: '#FF0000',
  },
];

export const mockSchedule = {
  raceName: 'Gran Premio de Australia',
  weekend: '06 - 08 de Marzo, 2026',
  schedule: [
    {
      day: 'Viernes',
      sessions: [
        { session: 'Práctica Libre 1', status: 'Finalizado', time: '12:30 - 13:30' },
        { session: 'Práctica Libre 2', status: 'Finalizado', time: '16:00 - 17:00' },
      ],
    },
    {
      day: 'Sábado',
      sessions: [
        { session: 'Práctica Libre 3', status: 'Próximamente', time: '12:30 - 13:30' },
        { session: 'Clasificación', status: 'Próximamente', time: '16:00 - 17:00' },
      ],
    },
    {
      day: 'Domingo',
      sessions: [
        { session: 'Carrera', status: 'Próximamente', time: '15:00' },
      ],
    },
  ],
};

export const mockDriverStandings = [
  { position: 1, name: 'Max Verstappen', team: 'Oracle Red Bull Racing', teamColor: '#001A3D', points: 287, flag: '🇳🇱', avatar: '/imagenes/pilotos/verstappen.png' },
  { position: 2, name: 'Lewis Hamilton', team: 'Scuderia Ferrari HP', teamColor: '#D92A2A', points: 256, flag: '🇬🇧', avatar: '/imagenes/pilotos/hamilton.png' },
  { position: 3, name: 'Lando Norris', team: 'McLaren Formula 1 Team', teamColor: '#FF8000', points: 240, flag: '🇬🇧', avatar: '/imagenes/pilotos/norris.png' },
  { position: 4, name: 'Charles Leclerc', team: 'Scuderia Ferrari HP', teamColor: '#D92A2A', points: 234, flag: '🇲🇨', avatar: '/imagenes/pilotos/leclerc.png' },
  { position: 5, name: 'Oscar Piastri', team: 'McLaren Formula 1 Team', teamColor: '#FF8000', points: 222, flag: '🇦🇺', avatar: '/imagenes/pilotos/piastri.png' },
  { position: 6, name: 'George Russell', team: 'Mercedes-AMG F1', teamColor: '#00A19C', points: 198, flag: '🇬🇧', avatar: '/imagenes/pilotos/russell.png' },
  { position: 7, name: 'Sergio Pérez', team: 'Oracle Red Bull Racing', teamColor: '#001A3D', points: 180, flag: '🇲🇽', avatar: '/imagenes/pilotos/perez.png' },
  { position: 8, name: 'Fernando Alonso', team: 'Aston Martin Aramco', teamColor: '#00594F', points: 154, flag: '🇪🇸', avatar: '/imagenes/pilotos/alonso.png' },
  { position: 9, name: 'Carlos Sainz', team: 'Williams Racing', teamColor: '#00A3E0', points: 140, flag: '🇪🇸', avatar: '/imagenes/pilotos/sainz.png' },
  { position: 10, name: 'Lance Stroll', team: 'Aston Martin Aramco', teamColor: '#00594F', points: 88, flag: '🇨🇦', avatar: '/imagenes/pilotos/stroll.png' },
  { position: 11, name: 'Yuki Tsunoda', team: 'Visa Cash App RB', teamColor: '#002E5A', points: 62, flag: '🇯🇵', avatar: '/imagenes/pilotos/tsunoda.png' },
  { position: 12, name: 'Pierre Gasly', team: 'BWT Alpine F1 Team', teamColor: '#0078C1', points: 50, flag: '🇫🇷', avatar: '/imagenes/pilotos/gasly.png' },
  { position: 13, name: 'Alexander Albon', team: 'Williams Racing', teamColor: '#00A3E0', points: 45, flag: '🇹🇭', avatar: '/imagenes/pilotos/albon.png' },
  { position: 14, name: 'Nico Hülkenberg', team: 'Audi F1 Team', teamColor: '#FF0000', points: 38, flag: '🇩🇪', avatar: '/imagenes/pilotos/hulkenberg.png' },
  { position: 15, name: 'Esteban Ocon', team: 'BWT Alpine F1 Team', teamColor: '#0078C1', points: 29, flag: '🇫🇷', avatar: '/imagenes/pilotos/ocon.png' },
  { position: 16, name: 'Kevin Magnussen', team: 'MoneyGram Haas F1 Team', teamColor: '#B6B6B6', points: 18, flag: '🇩🇰', avatar: '/imagenes/pilotos/magnussen.png' },
  { position: 17, name: 'Daniel Ricciardo', team: 'Visa Cash App RB', teamColor: '#002E5A', points: 12, flag: '🇦🇺', avatar: '/imagenes/pilotos/ricciardo.png' },
  { position: 18, name: 'Valtteri Bottas', team: 'Audi F1 Team', teamColor: '#FF0000', points: 10, flag: '🇫🇮', avatar: '/imagenes/pilotos/bottas.png' },
  { position: 19, name: 'Oliver Bearman', team: 'MoneyGram Haas F1 Team', teamColor: '#B6B6B6', points: 6, flag: '🇬🇧', avatar: '/imagenes/pilotos/bearman.png' },
  { position: 20, name: 'Franco Colapinto', team: 'Williams Racing', teamColor: '#00A3E0', points: 0, flag: '🇦🇷', avatar: '/imagenes/pilotos/colapinto.png' },
];

export const mockConstructorStandings = [
  { position: 1, name: 'Scuderia Ferrari HP', logo: '/imagenes/escuderias/ferrari.png', points: 490, teamColor: '#D92A2A' },
  { position: 2, name: 'McLaren Formula 1 Team', logo: '/imagenes/escuderias/mclaren.png', points: 462, teamColor: '#FF8000' },
  { position: 3, name: 'Oracle Red Bull Racing', logo: '/imagenes/escuderias/red-bull.png', points: 467, teamColor: '#001A3D' },
  { position: 4, name: 'Mercedes-AMG PETRONAS F1 Team', logo: '/imagenes/escuderias/mercedes.png', points: 300, teamColor: '#00A19C' },
  { position: 5, name: 'Aston Martin Aramco F1 Team', logo: '/imagenes/escuderias/aston-martin.png', points: 242, teamColor: '#00594F' },
  { position: 6, name: 'Williams Racing', logo: '/imagenes/escuderias/williams.png', points: 185, teamColor: '#00A3E0' },
  { position: 7, name: 'Visa Cash App RB F1 Team', logo: '/imagenes/escuderias/rb.png', points: 74, teamColor: '#002E5A' },
  { position: 8, name: 'BWT Alpine F1 Team', logo: '/imagenes/escuderias/alpine.png', points: 79, teamColor: '#0078C1' },
  { position: 9, name: 'Audi F1 Team', logo: '/imagenes/escuderias/audi.png', points: 48, teamColor: '#FF0000' },
  { position: 10, 'name': 'MoneyGram Haas F1 Team', logo: '/imagenes/escuderias/haas.png', points: 24, teamColor: '#B6B6B6' },
];

export const mockDriverProfiles = {
  'max_verstappen': {
    id: 'max_verstappen',
    name: 'Max Verstappen',
    number: 1,
    team: 'Oracle Red Bull Racing',
    teamColor: '#001A3D',
    country: 'Países Bajos',
    flag: '🇳🇱',
    avatar: '/imagenes/pilotos/verstappen.png',
    stats: {
      podiums: 110,
      points: 2870,
      grandsPrix: 209,
      championships: 3,
    },
    bio: 'Max Verstappen, nacido el 30 de septiembre de 1997, es un piloto de carreras belga-holandés que actualmente compite en la Fórmula Uno con Red Bull Racing. Es conocido por su estilo de conducción agresivo y su inmenso talento natural, lo que le ha llevado a conseguir múltiples campeonatos del mundo.',
  },
  'hamilton': {
    id: 'hamilton',
    name: 'Lewis Hamilton',
    number: 44,
    team: 'Scuderia Ferrari HP',
    teamColor: '#D92A2A',
    country: 'Reino Unido',
    flag: '🇬🇧',
    avatar: '/imagenes/pilotos/hamilton.png',
    stats: {
      podiums: 197,
      points: 4639.5,
      grandsPrix: 332,
      championships: 7,
    },
    bio: 'Sir Lewis Hamilton, nacido el 7 de enero de 1985, es un piloto de carreras británico, conocido por ser uno de los más grandes de la historia de la Fórmula 1. Con siete títulos de Campeón del Mundo, ostenta numerosos récords, incluyendo el mayor número de victorias, pole positions y podios.',
  },
};

const mockTeamDetails = {
  'scuderia-ferrari-hp': {
    id: 'scuderia-ferrari-hp',
    name: 'Scuderia Ferrari',
    fullTeamName: 'Scuderia Ferrari HP',
    description: 'La Scuderia Ferrari es la división de carreras del fabricante de automóviles de lujo italiano Ferrari y el equipo de carreras que compite en el campeonato de Fórmula Uno. También llamado "El Cavallino Rampante", Ferrari es el equipo más antiguo y exitoso de la Fórmula 1, habiendo competido en todos los campeonatos mundiales desde la temporada de 1950.',
    base: 'Maranello, Italia',
    teamChief: 'Frédéric Vasseur',
    powerUnit: 'Ferrari',
    worldChampionships: 16,
    driverIds: ['lewis-hamilton', 'charles-leclerc'],
    image: '/imagenes/escuderias/ferrari.png',
    teamColor: '#D92A2A',
  },
  'oracle-red-bull-racing': {
    id: 'oracle-red-bull-racing',
    name: 'Red Bull Racing',
    fullTeamName: 'Oracle Red Bull Racing',
    description: 'Oracle Red Bull Racing es un equipo de carreras de Fórmula Uno, que compite bajo bandera austriaca y tiene su sede en el Reino Unido. El equipo ha ganado múltiples campeonatos de constructores y pilotos, convirtiéndose en una de las fuerzas dominantes en la era moderna de la F1.',
    base: 'Milton Keynes, Reino Unido',
    teamChief: 'Christian Horner',
    powerUnit: 'Honda RBPT',
    worldChampionships: 6,
    driverIds: ['max-verstappen', 'sergio-perez'],
    image: '/imagenes/escuderias/red-bull.png',
    teamColor: '#001A3D',
  }
};

export const getTeamById = (id: string) => {
  return (mockTeamDetails as any)[id];
};

export const getDriverById = (id: string) => {
    return (mockDriverProfiles as any)[id];
};

export const mockCalendarEvents = [
  {
    round: 1,
    raceName: 'Gran Premio de Bahrein',
    circuitName: 'Circuito Internacional de Baréin',
    date: '2025-03-02',
    time: '15:00:00Z',
    city: 'Sakhir',
    country: 'Bahrein',
    flagEmoji: '🇧🇭',
    id: 'gran-premio-de-bahrein',
  },
  {
    round: 2,
    raceName: 'Gran Premio de Arabia Saudita',
    circuitName: 'Circuito de la Corniche de Yeda',
    date: '2025-03-09',
    time: '17:00:00Z',
    city: 'Yeda',
    country: 'Arabia Saudita',
    flagEmoji: '🇸🇦',
    id: 'gran-premio-de-arabia-saudita',
  },
  {
    round: 3,
    raceName: 'Gran Premio de Australia',
    circuitName: 'Circuito de Albert Park',
    date: '2025-03-23',
    time: '06:00:00Z',
    city: 'Melbourne',
    country: 'Australia',
    flagEmoji: '🇦🇺',
    id: 'gran-premio-de-australia',
  },
  {
    round: 4,
    raceName: 'Gran Premio de Japón',
    circuitName: 'Circuito de Suzuka',
    date: '2025-04-06',
    time: '05:00:00Z',
    city: 'Suzuka',
    country: 'Japón',
    flagEmoji: '🇯🇵',
    id: 'gran-premio-de-japon',
  },
  {
    round: 5,
    raceName: 'Gran Premio de China',
    circuitName: 'Circuito Internacional de Shanghái',
    date: '2025-04-20',
    time: '07:00:00Z',
    city: 'Shanghái',
    country: 'China',
    flagEmoji: '🇨🇳',
    id: 'gran-premio-de-china',
  },
];

export const getCalendarEventsMock = () => mockCalendarEvents;
