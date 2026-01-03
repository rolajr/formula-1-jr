import { Clock, Globe, MapPin } from 'lucide-react';
import { mockSchedule } from '@/data/mocks';

const StatusIndicator = ({ status }: { status: string }) => {
  const isFinished = status === 'Finalizado';
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${isFinished ? 'bg-gray-500' : 'bg-green-500'}`} />
      <span className={isFinished ? 'text-light-400' : 'text-light-200'}>{status}</span>
    </div>
  );
};

export default function SchedulePage() {
  const { raceName, weekend, schedule } = mockSchedule;

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-heading font-black text-light-50 tracking-wide">
            {raceName}
          </h1>
          <p className="text-lg text-light-300 mt-2">{weekend}</p>
        </div>

        {/* Timezone Toggle */}
        <div className="mb-8 flex justify-center">
          <div className="bg-dark-900 border border-dark-700 rounded-full p-1 flex items-center text-sm">
            <button className="flex items-center gap-2 px-4 py-2 bg-accent-red-500 rounded-full text-white font-semibold">
              <Globe className="w-4 h-4" />
              Tu Hora Local
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-light-300 hover:text-white transition-colors">
              <MapPin className="w-4 h-4" />
              Hora del Circuito
            </button>
          </div>
        </div>

        {/* Schedule Table */}
        <div className="space-y-8">
          {schedule.map((daySchedule) => (
            <div key={daySchedule.day}>
              <h2 className="text-2xl font-bold font-heading text-light-100 mb-4 border-b-2 border-dark-800 pb-2">
                {daySchedule.day}
              </h2>
              <ul className="space-y-3">
                {daySchedule.sessions.map((session) => {
                  const isRace = session.session === 'Carrera';
                  return (
                    <li
                      key={session.session}
                      className={`
                        flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg 
                        transition-all duration-300
                        ${isRace 
                          ? 'bg-accent-red-500/10 border-l-4 border-accent-red-500 shadow-lg' 
                          : 'bg-dark-900 border border-dark-800 hover:bg-dark-800/60'
                        }
                      `}
                    >
                      <span className={`font-semibold text-lg ${isRace ? 'text-white' : 'text-light-100'}`}>
                        {session.session}
                      </span>
                      <div className="flex items-center gap-4 sm:gap-6 mt-2 sm:mt-0 text-sm">
                        <StatusIndicator status={session.status} />
                        <span className={`font-mono text-base ${isRace ? 'text-white font-bold' : 'text-accent-cyan'}`}>
                          {session.time}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Timezone Notice */}
        <div className="text-center mt-10">
          <p className="text-xs text-light-400">
            Los horarios se muestran convertidos a tu zona horaria local automáticamente.
          </p>
        </div>
      </div>
    </div>
  );
}
