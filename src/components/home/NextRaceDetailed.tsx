'use client';

import { useState } from 'react';
import { MapPin, Flag, Calendar, Clock } from 'lucide-react';
import type { NextRaceInfo } from '@/services/f1Api';

interface NextRaceDetailedProps {
  race: NextRaceInfo | null;
}

interface ScheduleItem {
  session: string;
  day: string;
  time: string;
  color: string;
}

const tabs = ['Horarios', 'Neumáticos', 'Clima'];

export default function NextRaceDetailed({ race }: NextRaceDetailedProps) {
  const [activeTab, setActiveTab] = useState('Horarios');

  /**
   * Convierte fecha/hora UTC a día corto local (ej: "Vie 05")
   */
  const formatShortDay = (utcDate: string, utcTime: string): string => {
    try {
      const dateTime = new Date(`${utcDate}T${utcTime}`);
      return new Intl.DateTimeFormat('es-ES', {
        weekday: 'short',
        day: '2-digit',
      }).format(dateTime);
    } catch (error) {
      return 'N/A';
    }
  };

  /**
   * Convierte fecha/hora UTC a hora local (ej: "07:30 PM")
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
      return 'N/A';
    }
  };

  // Si no hay datos de carrera, mostrar placeholder
  if (!race) {
    return (
      <div className="bg-dark-900 border border-dark-700 rounded-2xl p-4 text-light-50 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Flag className="w-6 h-6 text-dark-600" />
            <div>
              <h2 className="text-lg font-bold font-heading text-light-500">
                Próxima Carrera
              </h2>
              <p className="text-xs text-light-600">
                Sin datos disponibles
              </p>
            </div>
          </div>
        </div>
        <div className="h-32 bg-dark-800 rounded-md flex items-center justify-center my-3">
          <Clock className="w-8 h-8 text-dark-600" />
        </div>
      </div>
    );
  }

  // Construir horario dinámicamente desde los datos de la API
  const schedule: ScheduleItem[] = [];

  if (race.sessions?.firstPractice) {
    schedule.push({
      session: 'Práctica 1',
      day: formatShortDay(race.sessions.firstPractice.date, race.sessions.firstPractice.time),
      time: formatLocalTime(race.sessions.firstPractice.date, race.sessions.firstPractice.time),
      color: 'text-accent-cyan',
    });
  }

  if (race.sessions?.secondPractice) {
    schedule.push({
      session: 'Práctica 2',
      day: formatShortDay(race.sessions.secondPractice.date, race.sessions.secondPractice.time),
      time: formatLocalTime(race.sessions.secondPractice.date, race.sessions.secondPractice.time),
      color: 'text-accent-cyan',
    });
  }

  if (race.sessions?.thirdPractice) {
    schedule.push({
      session: 'Práctica 3',
      day: formatShortDay(race.sessions.thirdPractice.date, race.sessions.thirdPractice.time),
      time: formatLocalTime(race.sessions.thirdPractice.date, race.sessions.thirdPractice.time),
      color: 'text-accent-cyan',
    });
  }

  if (race.sessions?.sprint) {
    schedule.push({
      session: 'Sprint',
      day: formatShortDay(race.sessions.sprint.date, race.sessions.sprint.time),
      time: formatLocalTime(race.sessions.sprint.date, race.sessions.sprint.time),
      color: 'text-accent-gold',
    });
  }

  if (race.sessions?.qualifying) {
    schedule.push({
      session: 'Clasificación',
      day: formatShortDay(race.sessions.qualifying.date, race.sessions.qualifying.time),
      time: formatLocalTime(race.sessions.qualifying.date, race.sessions.qualifying.time),
      color: 'text-warning',
    });
  }

  // Siempre agregar la carrera principal
  const raceDateTime = race.date.includes('T')
    ? race.date
    : `${race.date}T15:00:00Z`;
  const [raceDate, raceTime] = raceDateTime.split('T');

  schedule.push({
    session: 'Carrera',
    day: formatShortDay(raceDate, raceTime),
    time: formatLocalTime(raceDate, raceTime),
    color: 'text-success',
  });

  return (
    <div className="bg-dark-900 border border-dark-700 rounded-2xl p-4 text-light-50 shadow-lg">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <Flag className="w-6 h-6 text-accent-red-500" />
          <div>
            <h2 className="text-lg font-bold font-heading leading-tight">
              {race.name}
            </h2>
            <div className="flex items-center gap-2 text-xs text-light-400 mt-1">
              <span className="text-base">{race.flagEmoji}</span>
              <MapPin className="w-3 h-3" />
              <span className="truncate">{race.circuit}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder de la imagen del circuito - Sin imagen real */}
      <div className="h-32 bg-gradient-to-br from-dark-800 to-dark-900 rounded-md flex items-center justify-center my-3 border border-dark-700">
        <div className="text-center">
          <Flag className="w-10 h-10 text-dark-600 mx-auto mb-2" />
          <p className="text-xs text-light-600 font-semibold">
            {race.location}
          </p>
          <p className="text-xs text-dark-500 mt-1">
            Ronda {race.round} • {race.season}
          </p>
        </div>
      </div>

      {/* Pestañas */}
      <div className="border-b border-dark-700 mb-3">
        <nav className="-mb-px flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              disabled={tab !== 'Horarios'}
              className={`whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-xs transition-colors
                ${
                  activeTab === tab
                    ? 'border-accent-red-500 text-accent-red-500'
                    : 'border-transparent text-light-400 hover:text-light-100 hover:border-dark-500'
                }
                ${tab !== 'Horarios' ? 'cursor-not-allowed opacity-50' : ''}
              `}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Contenido de la Pestaña */}
      <div>
        {activeTab === 'Horarios' && (
          <div className="flow-root">
            {schedule.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="w-8 h-8 text-dark-600 mx-auto mb-2" />
                <p className="text-sm text-light-500">
                  No hay horarios disponibles
                </p>
              </div>
            ) : (
              <ul role="list" className="-mb-3">
                {schedule.map((item, index) => (
                  <li key={index}>
                    <div className="relative pb-3">
                      {index !== schedule.length - 1 ? (
                        <span
                          className="absolute top-3 left-3 -ml-px h-full w-0.5 bg-dark-700"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex items-center space-x-2">
                        <div>
                          <span
                            className={`h-6 w-6 rounded-full ${
                              item.session === 'Carrera' ? 'bg-success/20' : 'bg-dark-800'
                            } flex items-center justify-center ring-4 ring-dark-900`}
                          >
                            <Calendar
                              className={`h-3 w-3 ${
                                item.session === 'Carrera' ? 'text-success' : 'text-light-400'
                              }`}
                            />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 flex justify-between items-center space-x-2">
                          <div>
                            <p className={`text-xs font-semibold ${item.color}`}>
                              {item.session}
                            </p>
                          </div>
                          <div className="text-right text-xs whitespace-nowrap text-light-300">
                            <p className="capitalize">{item.day}</p>
                            <p className="font-mono text-light-400 text-xs">{item.time}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === 'Neumáticos' && (
          <div className="text-center py-8">
            <p className="text-sm text-light-500">
              Información de neumáticos próximamente
            </p>
          </div>
        )}

        {activeTab === 'Clima' && (
          <div className="text-center py-8">
            <p className="text-sm text-light-500">
              Pronóstico del clima próximamente
            </p>
          </div>
        )}
      </div>

      {/* Botón de Acción */}
      <div className="mt-4">
        <a
          href="/calendar"
          className="block w-full bg-accent-red-500 hover:bg-accent-red-600 text-light-50 font-bold py-2 px-3 rounded-md transition-colors text-sm text-center"
        >
          Ver Calendario Completo
        </a>
      </div>

      {/* Nota informativa */}
      <div className="mt-3 pt-3 border-t border-dark-700">
        <p className="text-center text-xs text-light-600">
          Horarios en tu zona local
        </p>
      </div>
    </div>
  );
}
