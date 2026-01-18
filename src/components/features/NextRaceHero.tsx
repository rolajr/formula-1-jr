'use client';

import { useEffect, useState } from 'react';
import { Calendar, MapPin, Timer } from 'lucide-react';

interface RaceSession {
  date: string;
  time: string;
}

interface NextRaceHeroProps {
  raceName: string;
  location: string;
  circuit: string;
  date: string;
  round: number;
  flagEmoji?: string;
  sessions?: {
    firstPractice?: RaceSession;
    secondPractice?: RaceSession;
    thirdPractice?: RaceSession;
    qualifying?: RaceSession;
    sprint?: RaceSession;
  };
}

export default function NextRaceHero({
  raceName,
  location,
  circuit,
  date,
  round,
  flagEmoji = '🏁',
  sessions,
}: NextRaceHeroProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Función para convertir fecha/hora UTC a hora local
  const formatLocalDateTime = (dateStr: string, timeStr: string): string => {
    try {
      const utcDateTime = new Date(`${dateStr}T${timeStr}`);
      return new Intl.DateTimeFormat('es-ES', {
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(utcDateTime);
    } catch (error) {
      return 'Hora no disponible';
    }
  };

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(date).getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [date]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(225,6,0,0.1),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,224,255,0.05),transparent)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="text-center space-y-8">


          {/* Race Title */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-light-50">
              {raceName}
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-light-200">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent-red-500" />
                <span className="font-medium">{location}</span>
              </div>
              <span className="hidden sm:block text-light-600">•</span>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent-cyan" />
                <span className="font-medium">{circuit}</span>
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 text-light-400">
              <Timer className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">
                La carrera comienza en
              </span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-2xl mx-auto">
            {/* Days */}
            <div className="bg-dark-900/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-dark-700 hover:border-accent-red-500/50 transition-all">
              <div className="text-3xl sm:text-5xl font-heading font-black text-accent-red-500 mb-1 font-mono">
                {timeLeft.days.toString().padStart(2, '0')}
              </div>
              <div className="text-xs sm:text-sm text-light-400 uppercase tracking-wide">
                Días
              </div>
            </div>

            {/* Hours */}
            <div className="bg-dark-900/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-dark-700 hover:border-accent-cyan/50 transition-all">
              <div className="text-3xl sm:text-5xl font-heading font-black text-accent-cyan mb-1 font-mono">
                {timeLeft.hours.toString().padStart(2, '0')}
              </div>
              <div className="text-xs sm:text-sm text-light-400 uppercase tracking-wide">
                Horas
              </div>
            </div>

            {/* Minutes */}
            <div className="bg-dark-900/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-dark-700 hover:border-accent-gold/50 transition-all">
              <div className="text-3xl sm:text-5xl font-heading font-black text-accent-gold mb-1 font-mono">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </div>
              <div className="text-xs sm:text-sm text-light-400 uppercase tracking-wide">
                Minutos
              </div>
            </div>

            {/* Seconds */}
            <div className="bg-dark-900/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-dark-700 hover:border-success/50 transition-all">
              <div className="text-3xl sm:text-5xl font-heading font-black text-success mb-1 font-mono">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </div>
              <div className="text-xs sm:text-sm text-light-400 uppercase tracking-wide">
                Segundos
              </div>
            </div>
          </div>

          {/* Session Schedule */}
          {sessions && (
            <div className="max-w-3xl mx-auto">
              <div className="bg-dark-900/80 backdrop-blur-sm rounded-xl p-6 border border-dark-700">
                <h3 className="text-xl font-heading font-bold text-light-50 mb-4 text-center">
                  Horarios de Sesiones (Tu Hora Local)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sessions.firstPractice && (
                    <div className="flex items-start gap-3 p-3 bg-dark-800/50 rounded-lg border border-dark-700/50">
                      <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-accent-cyan"></div>
                      <div>
                        <p className="text-sm font-semibold text-accent-cyan uppercase tracking-wide">
                          Práctica 1
                        </p>
                        <p className="text-light-200 text-sm mt-1 capitalize">
                          {formatLocalDateTime(sessions.firstPractice.date, sessions.firstPractice.time)}
                        </p>
                      </div>
                    </div>
                  )}
                  {sessions.secondPractice && (
                    <div className="flex items-start gap-3 p-3 bg-dark-800/50 rounded-lg border border-dark-700/50">
                      <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-accent-cyan"></div>
                      <div>
                        <p className="text-sm font-semibold text-accent-cyan uppercase tracking-wide">
                          Práctica 2
                        </p>
                        <p className="text-light-200 text-sm mt-1 capitalize">
                          {formatLocalDateTime(sessions.secondPractice.date, sessions.secondPractice.time)}
                        </p>
                      </div>
                    </div>
                  )}
                  {sessions.thirdPractice && (
                    <div className="flex items-start gap-3 p-3 bg-dark-800/50 rounded-lg border border-dark-700/50">
                      <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-accent-cyan"></div>
                      <div>
                        <p className="text-sm font-semibold text-accent-cyan uppercase tracking-wide">
                          Práctica 3
                        </p>
                        <p className="text-light-200 text-sm mt-1 capitalize">
                          {formatLocalDateTime(sessions.thirdPractice.date, sessions.thirdPractice.time)}
                        </p>
                      </div>
                    </div>
                  )}
                  {sessions.sprint && (
                    <div className="flex items-start gap-3 p-3 bg-dark-800/50 rounded-lg border border-dark-700/50">
                      <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-accent-gold"></div>
                      <div>
                        <p className="text-sm font-semibold text-accent-gold uppercase tracking-wide">
                          Sprint
                        </p>
                        <p className="text-light-200 text-sm mt-1 capitalize">
                          {formatLocalDateTime(sessions.sprint.date, sessions.sprint.time)}
                        </p>
                      </div>
                    </div>
                  )}
                  {sessions.qualifying && (
                    <div className="flex items-start gap-3 p-3 bg-dark-800/50 rounded-lg border border-dark-700/50">
                      <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-warning"></div>
                      <div>
                        <p className="text-sm font-semibold text-warning uppercase tracking-wide">
                          Clasificación
                        </p>
                        <p className="text-light-200 text-sm mt-1 capitalize">
                          {formatLocalDateTime(sessions.qualifying.date, sessions.qualifying.time)}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3 p-3 bg-dark-800/50 rounded-lg border border-accent-red-500/50">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-accent-red-500"></div>
                    <div>
                      <p className="text-sm font-semibold text-accent-red-500 uppercase tracking-wide">
                        Carrera
                      </p>
                      <p className="text-light-200 text-sm mt-1 capitalize">
                        {formatLocalDateTime(date.split('T')[0], date.split('T')[1] || '15:00:00Z')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="pt-4">
            <a
              href="/calendar"
              className="inline-flex items-center gap-2 px-8 py-3 bg-accent-red-500 hover:bg-accent-red-600 text-light-50 font-semibold rounded-lg transition-all hover:scale-105 active:scale-95"
            >
              Ver Calendario Completo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
