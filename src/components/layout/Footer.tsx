import Link from 'next/link';

const currentYear = new Date().getFullYear();

const footerLinks = [
  { href: '/about', label: 'Acerca de' },
  { href: '/api', label: 'API' },
  { href: '/privacy', label: 'Privacidad' },
  { href: '/terms', label: 'Términos' },
];

export default function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-dark-700 mt-auto" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Inicio de la aplicación Formula 1"
          >
            <div className="w-10 h-10 bg-accent-red-500 rounded-lg flex items-center justify-center font-heading font-black text-xl transition-transform group-hover:scale-105">
              F1
            </div>
            <span className="font-heading font-bold text-lg text-light-50">
              App de Formula 1
            </span>
          </Link>

          {/* Quick Links */}
          <nav aria-label="Navegación del pie de página">
            <ul className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-light-400 hover:text-light-50 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Divider */}
          <div className="w-full border-t border-dark-700" />

          {/* Copyright & Disclaimer */}
          <div className="text-center space-y-2">
            <p className="text-sm text-light-400">
              © {currentYear} App para Fans de Formula 1. Todos los derechos reservados.
            </p>
            <p className="text-xs text-light-600">
              No afiliado con Formula 1, FIA, o Formula One Management.
            </p>
            <p className="text-xs text-light-600">
              Hecho con pasión para los fans de F1 de todo el mundo.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
