// Configuración adicional de equipos que no proporciona la API
// Mapea constructorId de la API con datos de presentación

export interface TeamConfig {
  base: string;
  teamPrincipal: string;
  teamColor: string;
  description?: string;
  powerUnit?: string;
  worldChampionships?: number;
}

export const teamConfigs: Record<string, TeamConfig> = {
  ferrari: {
    base: 'Maranello, Italia',
    teamPrincipal: 'Frédéric Vasseur',
    teamColor: '#D92A2A',
    description: 'La Scuderia Ferrari es la división de carreras del fabricante de automóviles de lujo italiano Ferrari y el equipo de carreras que compite en el campeonato de Fórmula Uno. También llamado "El Cavallino Rampante", Ferrari es el equipo más antiguo y exitoso de la Fórmula 1, habiendo competido en todos los campeonatos mundiales desde la temporada de 1950.',
    powerUnit: 'Ferrari',
    worldChampionships: 16,
  },
  red_bull: {
    base: 'Milton Keynes, Reino Unido',
    teamPrincipal: 'Christian Horner',
    teamColor: '#001A3D',
    description: 'Oracle Red Bull Racing es un equipo de carreras de Fórmula Uno, que compite bajo bandera austriaca y tiene su sede en el Reino Unido. El equipo ha ganado múltiples campeonatos de constructores y pilotos, convirtiéndose en una de las fuerzas dominantes en la era moderna de la F1.',
    powerUnit: 'Honda RBPT',
    worldChampionships: 6,
  },
  mclaren: {
    base: 'Woking, Reino Unido',
    teamPrincipal: 'Andrea Stella',
    teamColor: '#FF8000',
    description: 'McLaren Racing es un equipo británico de Fórmula Uno con sede en Woking, Inglaterra. El equipo compite en el Campeonato Mundial de Fórmula Uno desde 1966 y es uno de los equipos más exitosos en la historia del deporte.',
    powerUnit: 'Mercedes',
    worldChampionships: 8,
  },
  mercedes: {
    base: 'Brackley, Reino Unido',
    teamPrincipal: 'Toto Wolff',
    teamColor: '#00A19C',
    description: 'Mercedes-AMG Petronas Formula One Team es el equipo de fábrica de Fórmula Uno de Mercedes-Benz. El equipo ha dominado la era híbrida de la F1, ganando múltiples campeonatos consecutivos de constructores y pilotos.',
    powerUnit: 'Mercedes',
    worldChampionships: 8,
  },
  aston_martin: {
    base: 'Silverstone, Reino Unido',
    teamPrincipal: 'Mike Krack',
    teamColor: '#00594F',
    description: 'Aston Martin Aramco Cognizant Formula One Team es un equipo de carreras de Fórmula Uno con sede en Silverstone, Reino Unido. El equipo representa a la icónica marca británica Aston Martin en el campeonato mundial.',
    powerUnit: 'Mercedes',
    worldChampionships: 0,
  },
  alpine: {
    base: 'Enstone, Reino Unido',
    teamPrincipal: 'Bruno Famin',
    teamColor: '#0078C1',
    description: 'BWT Alpine F1 Team es el equipo de Fórmula Uno de la marca Alpine de Renault Group. Con sede en Enstone, el equipo tiene una rica historia en la F1 bajo varios nombres.',
    powerUnit: 'Renault',
    worldChampionships: 2,
  },
  williams: {
    base: 'Grove, Reino Unido',
    teamPrincipal: 'James Vowles',
    teamColor: '#00A3E0',
    description: 'Williams Racing es uno de los equipos más icónicos y exitosos en la historia de la Fórmula Uno. Fundado por Sir Frank Williams, el equipo ha ganado múltiples campeonatos y ha sido hogar de legendarios pilotos.',
    powerUnit: 'Mercedes',
    worldChampionships: 9,
  },
  rb: {
    base: 'Faenza, Italia',
    teamPrincipal: 'Laurent Mekies',
    teamColor: '#002E5A',
    description: 'Visa Cash App RB Formula One Team, anteriormente conocido como AlphaTauri y Toro Rosso, es el equipo hermano de Red Bull Racing. Con sede en Faenza, Italia, el equipo sirve como academia de pilotos para el grupo Red Bull.',
    powerUnit: 'Honda RBPT',
    worldChampionships: 0,
  },
  haas: {
    base: 'Kannapolis, USA',
    teamPrincipal: 'Ayao Komatsu',
    teamColor: '#B6B6B6',
    description: 'MoneyGram Haas F1 Team es el primer equipo estadounidense de Fórmula Uno en décadas. Fundado por el empresario Gene Haas, el equipo debutó en 2016 y tiene su base en Kannapolis, Carolina del Norte.',
    powerUnit: 'Ferrari',
    worldChampionships: 0,
  },
  sauber: {
    base: 'Hinwil, Suiza',
    teamPrincipal: 'Andreas Seidl',
    teamColor: '#FF0000',
    description: 'El equipo Sauber, actualmente compitiendo como Stake F1 Team Kick Sauber, se convertirá en Audi F1 Team a partir de 2026. Con sede en Hinwil, Suiza, el equipo tiene una larga historia en la Fórmula Uno.',
    powerUnit: 'Ferrari',
    worldChampionships: 0,
  },
  kick_sauber: {
    base: 'Hinwil, Suiza',
    teamPrincipal: 'Andreas Seidl',
    teamColor: '#FF0000',
    description: 'El equipo Sauber, actualmente compitiendo como Stake F1 Team Kick Sauber, se convertirá en Audi F1 Team a partir de 2026. Con sede en Hinwil, Suiza, el equipo tiene una larga historia en la Fórmula Uno.',
    powerUnit: 'Ferrari',
    worldChampionships: 0,
  },
};

/**
 * Obtiene la configuración adicional de un equipo por su constructorId
 */
export function getTeamConfig(constructorId: string): TeamConfig {
  return teamConfigs[constructorId] || {
    base: 'Ubicación desconocida',
    teamPrincipal: 'Por confirmar',
    teamColor: '#6B7280',
    description: 'Información del equipo próximamente.',
    powerUnit: 'Por confirmar',
    worldChampionships: 0,
  };
}
