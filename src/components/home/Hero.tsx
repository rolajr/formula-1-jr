'use client';

import { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock, Flag, Timer } from 'lucide-react';
import type { NextRaceInfo } from '@/services/f1Api';

interface HeroProps {
  race: NextRaceInfo | null;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface LocalSession {
  name: string;
  dateTime: string;
  color: string;
  icon: 'practice' | 'qualifying' | 'race';
}

export default function Hero({ race }: HeroProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isClient, setIsClient] = useState(false);

  // Protección contra errores: Si no hay carrera, muestra skeleton
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Cronómetro de cuenta regresiva
  useEffect(() => {
    if (!race?.date) return;

    const calculateTimeLeft = () => {
      const targetDate = new Date(race.date);
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [race?.date]);

  /**
   * Convierte fecha/hora UTC a la zona horaria local del usuario
   */
  const formatLocalDateTime = (utcDate: string, utcTime: string): string => {
    try {
      const dateTime = new Date(`${utcDate}T${utcTime}`);
      return new Intl.DateTimeFormat('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(dateTime);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Fecha no disponible';
    }
  };

  /**
   * Convierte fecha/hora UTC a solo hora local
   */
  const formatLocalTime = (utcDate: string, utcTime: string): string => {
    try {
      const dateTime = new Date(`${utcDate}T${utcTime}`);
      return new Intl.DateTimeFormat('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(dateTime);
    } catch (error) {
      console.error('Error formatting time:', error);
      return 'N/A';
    }
  };

  /**
   * Obtiene el día de la semana abreviado
   */
  const formatDayOfWeek = (utcDate: string, utcTime: string): string => {
    try {
      const dateTime = new Date(`${utcDate}T${utcTime}`);
      return new Intl.DateTimeFormat('es-ES', {
        weekday: 'short',
        day: 'numeric',
      }).format(dateTime);
    } catch (error) {
      return 'N/A';
    }
  };

  // Estado de carga o error
  if (!isClient) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-black min-h-[600px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(225,6,0,0.15),transparent)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-dark-800 rounded-lg w-3/4 mx-auto"></div>
            <div className="h-8 bg-dark-800 rounded-lg w-1/2 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!race) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-black min-h-[600px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(225,6,0,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,224,255,0.08),transparent)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center min-h-[600px]">
          <div className="text-center space-y-4">
            <Flag className="w-16 h-16 text-dark-600 mx-auto" />
            <h2 className="text-3xl font-heading font-bold text-light-300">
              No hay información de la próxima carrera
            </h2>
            <p className="text-light-500">
              Los datos de la carrera se actualizarán próximamente
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Construir lista de sesiones con horarios locales
  const sessions: LocalSession[] = [];

  if (race.sessions?.firstPractice) {
    sessions.push({
      name: 'Práctica 1',
      dateTime: formatLocalDateTime(race.sessions.firstPractice.date, race.sessions.firstPractice.time),
      color: 'text-accent-cyan',
      icon: 'practice',
    });
  }

  if (race.sessions?.secondPractice) {
    sessions.push({
      name: 'Práctica 2',
      dateTime: formatLocalDateTime(race.sessions.secondPractice.date, race.sessions.secondPractice.time),
      color: 'text-accent-cyan',
      icon: 'practice',
    });
  }

  if (race.sessions?.thirdPractice) {
    sessions.push({
      name: 'Práctica 3',
      dateTime: formatLocalDateTime(race.sessions.thirdPractice.date, race.sessions.thirdPractice.time),
      color: 'text-accent-cyan',
      icon: 'practice',
    });
  }

  if (race.sessions?.sprint) {
    sessions.push({
      name: 'Sprint',
      dateTime: formatLocalDateTime(race.sessions.sprint.date, race.sessions.sprint.time),
      color: 'text-accent-gold',
      icon: 'qualifying',
    });
  }

  if (race.sessions?.qualifying) {
    sessions.push({
      name: 'Clasificación',
      dateTime: formatLocalDateTime(race.sessions.qualifying.date, race.sessions.qualifying.time),
      color: 'text-warning',
      icon: 'qualifying',
    });
  }

  // Siempre agregar la carrera
  const raceDateTime = race.date.includes('T')
    ? race.date
    : `${race.date}T15:00:00Z`;
  const [raceDate, raceTime] = raceDateTime.split('T');

  sessions.push({
    name: 'Carrera',
    dateTime: formatLocalDateTime(raceDate, raceTime),
    color: 'text-accent-red-500',
    icon: 'race',
  });

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-black">
      {/* Efectos de fondo con CSS puro */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(225,6,0,0.15),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,224,255,0.08),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,215,0,0.05),transparent)]" />

      {/* Líneas decorativas */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-red-500 to-transparent opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-cyan to-transparent opacity-30"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="space-y-10">

          {/* Encabezado del Gran Premio */}
          <div className="text-center space-y-6">
            {/* Badge de Round */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-dark-800/60 backdrop-blur-sm rounded-full border border-dark-700">
              <Flag className="w-4 h-4 text-accent-red-500" />
              <span className="text-sm font-semibold text-light-300 uppercase tracking-wider">
                Ronda {race.round} • {race.season}
              </span>
            </div>

            {/* Nombre del GP */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-light-50 via-light-100 to-light-300">
                {race.name}
              </h1>

              {/* Ubicación y Circuito */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-light-300">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{race.flagEmoji}</span>
                  <MapPin className="w-5 h-5 text-accent-red-500" />
                  <span className="font-medium text-lg">{race.location}</span>
                </div>
                <span className="hidden sm:block text-dark-600">•</span>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-accent-cyan" />
                  <span className="font-medium">{race.circuit}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cronómetro de Cuenta Regresiva */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-light-400">
              <Timer className="w-5 h-5 animate-pulse" />
              <span className="text-sm font-semibold uppercase tracking-wide">
                La carrera comienza en
              </span>
            </div>

            <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto">
              {/* Días */}
              <div className="group bg-dark-900/80 backdrop-blur-sm rounded-2xl p-4 sm:p-8 border border-dark-700 hover:border-accent-red-500/50 transition-all duration-300 hover:scale-105">
                <div className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black text-accent-red-500 mb-2 font-mono tabular-nums">
                  {timeLeft.days.toString().padStart(2, '0')}
                </div>
                <div className="text-xs sm:text-sm text-light-400 uppercase tracking-wider font-semibold">
                  Días
                </div>
              </div>

              {/* Horas */}
              <div className="group bg-dark-900/80 backdrop-blur-sm rounded-2xl p-4 sm:p-8 border border-dark-700 hover:border-accent-cyan/50 transition-all duration-300 hover:scale-105">
                <div className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black text-accent-cyan mb-2 font-mono tabular-nums">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </div>
                <div className="text-xs sm:text-sm text-light-400 uppercase tracking-wider font-semibold">
                  Horas
                </div>
              </div>

              {/* Minutos */}
              <div className="group bg-dark-900/80 backdrop-blur-sm rounded-2xl p-4 sm:p-8 border border-dark-700 hover:border-accent-gold/50 transition-all duration-300 hover:scale-105">
                <div className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black text-accent-gold mb-2 font-mono tabular-nums">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </div>
                <div className="text-xs sm:text-sm text-light-400 uppercase tracking-wider font-semibold">
                  Min
                </div>
              </div>

              {/* Segundos */}
              <div className="group bg-dark-900/80 backdrop-blur-sm rounded-2xl p-4 sm:p-8 border border-dark-700 hover:border-success/50 transition-all duration-300 hover:scale-105">
                <div className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black text-success mb-2 font-mono tabular-nums">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </div>
                <div className="text-xs sm:text-sm text-light-400 uppercase tracking-wider font-semibold">
                  Seg
                </div>
              </div>
            </div>
          </div>

          {/* Horarios de Sesiones */}
          {sessions.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-dark-900/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-dark-700 shadow-2xl">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Clock className="w-5 h-5 text-accent-cyan" />
                  <h2 className="text-2xl font-heading font-bold text-light-50 text-center">
                    Horarios en tu Zona Local
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sessions.map((session, index) => (
                    <div
                      key={index}
                      className={`
                        group relative p-5 rounded-xl border transition-all duration-300
                        ${session.icon === 'race'
                          ? 'bg-dark-800/80 border-accent-red-500/50 hover:border-accent-red-500 hover:bg-dark-800'
                          : 'bg-dark-800/40 border-dark-700 hover:border-dark-600 hover:bg-dark-800/60'
                        }
                      `}
                    >
                      {/* Indicador visual */}
                      <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 rounded-r-full ${
                        session.icon === 'race' ? 'bg-accent-red-500' :
                        session.icon === 'qualifying' ? 'bg-warning' :
                        'bg-accent-cyan'
                      }`}></div>

                      <div className="flex items-start justify-between gap-4 ml-4">
                        <div className="flex-1">
                          <h3 className={`text-base sm:text-lg font-bold ${session.color} uppercase tracking-wide mb-1`}>
                            {session.name}
                          </h3>
                          <p className="text-light-300 text-sm sm:text-base capitalize leading-relaxed">
                            {session.dateTime}
                          </p>
                        </div>

                        {session.icon === 'race' && (
                          <div className="flex-shrink-0">
                            <Flag className="w-6 h-6 text-accent-red-500 animate-pulse" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Nota informativa */}
                <div className="mt-6 pt-6 border-t border-dark-700">
                  <p className="text-center text-xs text-light-500">
                    Los horarios se muestran automáticamente en tu zona horaria local
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center pt-4">
            <a
              href="/calendar"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent-red-500 hover:bg-accent-red-600 text-light-50 font-bold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-accent-red-500/25"
            >
              <Calendar className="w-5 h-5" />
              Ver Calendario Completo
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
