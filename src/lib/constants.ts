/**
 * Application-wide constants
 */

export const APP_NAME = 'Formula 1 App';
export const APP_DESCRIPTION = 'Your ultimate Formula 1 companion';

export const ROUTES = {
  HOME: '/',
  STANDINGS: '/standings',
  DRIVERS: '/drivers',
  TEAMS: '/teams',
  RACES: '/races',
  ABOUT: '/about',
} as const;

export const EXTERNAL_LINKS = {
  ERGAST_API: 'https://ergast.com/mrd/',
  OPENF1_API: 'https://openf1.org/',
  F1_OFFICIAL: 'https://www.formula1.com/',
} as const;

export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const TEAM_COLORS = {
  ferrari: '#DC0000',
  mercedes: '#00D2BE',
  redbull: '#0600EF',
  mclaren: '#FF8700',
  alpine: '#0090FF',
  aston: '#006F62',
  williams: '#005AFF',
  alfa: '#900000',
  haas: '#787878',
  alphatauri: '#2B4562',
} as const;
