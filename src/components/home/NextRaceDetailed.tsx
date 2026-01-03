'use client';

import { useState } from 'react';
import { MapPin, Flag, Calendar } from 'lucide-react';

const raceData = {
  gpName: 'Gran Premio de Bahréin',
  countryFlag: '🇧🇭',
  circuitName: 'Circuito Internacional de Bahréin',
};

const schedule = [
  { session: 'Prácticas 1', day: 'Vie 05', time: '13:30' },
  { session: 'Prácticas 2', day: 'Vie 05', time: '17:00' },
  { session: 'Prácticas 3', day: 'Sáb 06', time: '14:00' },
  { session: 'Clasificación', day: 'Sáb 06', time: '17:30' },
  { session: 'Carrera', day: 'Dom 07', time: '18:00' },
];

const tabs = ['Horarios', 'Neumáticos', 'Clima'];

export default function NextRaceDetailed() {
  const [activeTab, setActiveTab] = useState('Horarios');

  return (
    <div className="bg-dark-900 border border-dark-700 rounded-2xl p-4 text-light-50 shadow-lg">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <Flag className="w-6 h-6 text-accent-red-500" />
          <div>
            <h2 className="text-xl font-bold font-heading">{raceData.gpName}</h2>
            <div className="flex items-center gap-2 text-xs text-light-400">
              <span className="text-base">{raceData.countryFlag}</span>
              <MapPin className="w-3 h-3" />
              <span>{raceData.circuitName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder de la imagen del circuito */}
      <div className="h-32 bg-dark-800 rounded-md flex items-center justify-center my-3">
        <p className="text-sm text-light-400">Placeholder Imagen</p>
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
            <ul role="list" className="-mb-3">
              {schedule.map((item, index) => (
                <li key={index}>
                  <div className="relative pb-3">
                    {index !== schedule.length - 1 ? (
                      <span className="absolute top-3 left-3 -ml-px h-full w-0.5 bg-dark-700" aria-hidden="true" />
                    ) : null}
                    <div className="relative flex items-center space-x-2">
                      <div>
                        <span className="h-6 w-6 rounded-full bg-dark-800 flex items-center justify-center ring-4 ring-dark-900">
                          <Calendar className="h-3 w-3 text-light-400" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 flex justify-between items-center space-x-2">
                        <div>
                          <p className="text-xs font-semibold text-light-100">{item.session}</p>
                        </div>
                        <div className="text-right text-xs whitespace-nowrap text-light-300">
                          <p>{item.day}</p>
                          <p className="font-mono text-light-400 text-xs">{item.time}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Botón de Acción */}
      <div className="mt-4">
        <button className="w-full bg-accent-red-500 hover:bg-accent-red-600 text-light-50 font-bold py-2 px-3 rounded-md transition-colors text-sm">
          Horarios en todos los países
        </button>
      </div>
    </div>
  );
}
