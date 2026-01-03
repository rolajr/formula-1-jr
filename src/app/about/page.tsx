import { Info } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-theme(spacing.64))] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-8 h-8 text-info" />
            <h1 className="text-4xl font-heading font-bold text-light-50">
              About Formula 1 App
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="bg-dark-900 rounded-xl p-8 border border-dark-700 space-y-6">
          <section>
            <h2 className="text-2xl font-heading font-bold text-light-50 mb-3">
              Our Mission
            </h2>
            <p className="text-light-400 leading-relaxed">
              Formula 1 App is your ultimate companion for everything Formula 1.
              We provide live standings, comprehensive driver and team profiles,
              race schedules, and detailed statistics to enhance your F1 experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-light-50 mb-3">
              Features
            </h2>
            <ul className="space-y-2 text-light-400">
              <li className="flex items-start gap-2">
                <span className="text-accent-red-500 mt-1">•</span>
                <span>Real-time championship standings for drivers and constructors</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-red-500 mt-1">•</span>
                <span>Detailed driver profiles with statistics and career highlights</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-red-500 mt-1">•</span>
                <span>Complete team information and history</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-red-500 mt-1">•</span>
                <span>Full race calendar with results and circuit information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-red-500 mt-1">•</span>
                <span>Modern, responsive design optimized for all devices</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-light-50 mb-3">
              Disclaimer
            </h2>
            <p className="text-light-400 leading-relaxed">
              This is an unofficial fan-made application and is not affiliated with,
              endorsed by, or connected to Formula 1, FIA, or Formula One Management.
              All F1-related trademarks and content are the property of their respective owners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-light-50 mb-3">
              Technology
            </h2>
            <p className="text-light-400 leading-relaxed">
              Built with Next.js 14, React 18, TypeScript, and Tailwind CSS.
              Designed with performance, accessibility, and user experience in mind.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
