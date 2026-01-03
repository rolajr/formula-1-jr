import { Calendar as CalendarIcon } from 'lucide-react';
import { getRaceCalendar, RaceCalendarEvent } from '@/services/f1Api';
import { getCalendarEventsMock } from '@/data/mocks';

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return date.toLocaleDateString('es-ES', options);
};

export default async function CalendarPage() {
  let calendarEvents: RaceCalendarEvent[] = [];

  try {
    calendarEvents = await getRaceCalendar('2025');
    if (calendarEvents.length === 0) {
      console.warn("API returned no calendar events, using mock data.");
      calendarEvents = getCalendarEventsMock();
    }
  } catch (error) {
    console.error("Error fetching race calendar, using mock data as fallback:", error);
    calendarEvents = getCalendarEventsMock();
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <CalendarIcon className="w-8 h-8 text-accent-red-500" />
            <h1 className="text-4xl font-heading font-black text-light-50">
              Calendario F1 2025
            </h1>
          </div>
          <p className="text-light-400">
            Todas las carreras de la temporada 2025 de Formula 1.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-dark-900 border border-dark-700 rounded-lg">
            <thead className="bg-dark-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-light-400 uppercase tracking-wider">Ronda</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-light-400 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-light-400 uppercase tracking-wider">Gran Premio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-light-400 uppercase tracking-wider">Circuito</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-light-400 uppercase tracking-wider">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {calendarEvents.map((race) => (
                <tr key={race.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-light-50">{race.round}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-light-300">{formatDate(race.date)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-light-50">
                    <div className="flex items-center">
                      <span className="mr-3">{race.flagEmoji}</span>
                      {race.raceName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-light-300">{race.circuitName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-accent-cyan hover:text-accent-cyan/80">Ver Horarios</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
