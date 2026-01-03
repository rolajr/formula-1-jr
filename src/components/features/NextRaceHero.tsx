'use client';

import { useEffect, useState } from 'react';
import { Calendar, MapPin, Timer } from 'lucide-react';

interface NextRaceHeroProps {
  raceName: string;
  location: string;
  circuit: string;
  date: string;
  round: number;
  flagEmoji?: string;
}

export default function NextRaceHero({
  raceName,
  location,
  circuit,
  date,
  round,
  flagEmoji = '🏁',
}: NextRaceHeroProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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
