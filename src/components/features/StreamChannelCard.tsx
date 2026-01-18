'use client';

import Link from 'next/link';
import { Radio } from 'lucide-react';

interface StreamChannelCardProps {
  channelName: string;
  channelLogo?: string;
  href: string;
  isLive?: boolean;
  description?: string;
}

export default function StreamChannelCard({
  channelName,
  channelLogo,
  href,
  isLive = true,
  description,
}: StreamChannelCardProps) {
  return (
    <Link href={href} className="block h-full">
      <div className="group relative bg-dark-900 border border-dark-700 rounded-2xl overflow-hidden transition-all duration-300 hover:border-accent-red-500/50 hover:shadow-lg hover:shadow-accent-red-500/10 h-full flex flex-col">
        {/* Live Badge */}
        {isLive && (
          <div className="absolute top-4 left-4 z-10">
            <div className="flex items-center gap-2 bg-accent-red-500 px-3 py-1.5 rounded-full shadow-lg shadow-accent-red-500/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white text-xs font-bold uppercase tracking-wide">
                En vivo
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 pt-16 text-center">
          {/* Logo */}
          {channelLogo ? (
            <img
              src={channelLogo}
              alt={`Logo de ${channelName}`}
              className="w-24 h-24 object-contain mb-6 opacity-90 group-hover:opacity-100 transition-opacity"
            />
          ) : (
            <div className="w-24 h-24 mb-6 flex items-center justify-center bg-dark-800 rounded-2xl border border-dark-700 group-hover:border-accent-red-500/50 transition-colors">
              <Radio className="w-12 h-12 text-light-400 group-hover:text-accent-red-500 transition-colors" />
            </div>
          )}

          {/* Channel Name */}
          <h3 className="text-2xl font-bold font-heading text-light-50 mb-2">
            {channelName}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-light-400 text-sm">
              {description}
            </p>
          )}
        </div>

        {/* Footer Action */}
        <div className="p-4 bg-dark-950/50 border-t border-dark-700 transition-colors group-hover:border-accent-red-500/30">
          <p className="text-center text-accent-red-500 font-semibold">
            Ver Canal
          </p>
        </div>
      </div>
    </Link>
  );
}
