'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import type { NavLink } from '@/types';

const navLinks: NavLink[] = [
  { href: '/', label: 'Inicio' },
  { href: '/standings', label: 'Clasificación' },
  { href: '/calendar', label: 'Calendario' },
  { href: '/drivers', label: 'Pilotos' },
  { href: '/teams', label: 'Escuderías' },
  { href: '/schedule', label: 'Horarios' },
  { href: '/live', label: '🔴 En Vivo' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-dark-900 border-b border-dark-700">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Navegación principal">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Inicio de la aplicación Formula 1"
          >
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-accent-red-500 rounded-lg flex items-center justify-center font-heading font-black text-xl lg:text-2xl transition-transform group-hover:scale-105">
              F1
            </div>
            <span className="hidden sm:block font-heading font-bold text-lg lg:text-xl text-light-50">
              Formula 1
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-light-100 font-medium transition-colors hover:text-light-50 hover:bg-dark-800 rounded-lg relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-red-500 transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right Section - Search & Menu */}
          <div className="flex items-center gap-2">
            {/* Search Button - Desktop */}
            <button
              aria-label="Buscar"
              className="hidden lg:flex items-center justify-center w-10 h-10 text-light-400 hover:text-light-50 hover:bg-dark-800 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMenuOpen}
              className="lg:hidden flex items-center justify-center w-10 h-10 text-light-400 hover:text-light-50 hover:bg-dark-800 rounded-lg transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Search Button - Mobile */}
            <button
              aria-label="Buscar"
              className="lg:hidden flex items-center justify-center w-10 h-10 text-light-400 hover:text-light-50 hover:bg-dark-800 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <div
              className="lg:hidden fixed inset-0 bg-dark-950/60 backdrop-blur-sm"
              onClick={closeMenu}
              aria-hidden="true"
            />

            {/* Menu Panel */}
            <div
              className="lg:hidden fixed top-16 left-0 right-0 bottom-0 bg-dark-900 border-t border-dark-700 overflow-y-auto"
              role="dialog"
              aria-modal="true"
            >
              <div className="px-4 py-6 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="flex items-center px-4 py-3 text-light-100 font-medium hover:text-light-50 hover:bg-dark-800 rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Divider */}
                <div className="pt-4 mt-4 border-t border-dark-700">
                  <Link
                    href="/about"
                    onClick={closeMenu}
                    className="flex items-center px-4 py-3 text-light-400 text-sm hover:text-light-50 hover:bg-dark-800 rounded-lg transition-colors"
                  >
                    Acerca de
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
