import Image from 'next/image';
import { Newspaper, ArrowUpRight, Calendar } from 'lucide-react';

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
}

interface NewsGridProps {
  articles: NewsArticle[];
}

export default function NewsGrid({ articles }: NewsGridProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Traspaso: 'bg-accent-red-500/10 text-accent-red-500 border-accent-red-500/30',
      Reglamento: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30',
      Pruebas: 'bg-accent-gold/10 text-accent-gold border-accent-gold/30',
      default: 'bg-light-300/10 text-light-300 border-light-300/30',
    };
    return colors[category] || colors.default;
  };

  return (
    <section className="py-12 lg:py-16 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-dark-950 rounded-xl border border-accent-cyan/20">
            <Newspaper className="w-6 h-6 text-accent-cyan" />
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl font-heading font-bold text-light-50">
              Últimas Noticias
            </h2>
            <p className="text-sm text-light-400 mt-1">Mantente al día con los titulares de F1</p>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article
              key={article.id}
              className="group bg-dark-950 rounded-xl border border-dark-700 hover:border-accent-red-500/50 overflow-hidden transition-all hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden bg-dark-800">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full border backdrop-blur-sm ${getCategoryColor(
                      article.category
                    )}`}
                  >
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Date */}
                <div className="flex items-center gap-2 text-xs text-light-400 mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  <time dateTime={article.date}>{formatDate(article.date)}</time>
                </div>

                {/* Title */}
                <h3 className="text-lg font-heading font-bold text-light-50 mb-2 line-clamp-2 group-hover:text-accent-red-500 transition-colors">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-light-300 line-clamp-2 mb-4">{article.excerpt}</p>

                {/* Read More Link */}
                <div className="flex items-center gap-1 text-sm font-semibold text-accent-red-500 group-hover:gap-2 transition-all">
                  Leer Más
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-10 text-center">
          <a
            href="/news"
            className="inline-flex items-center gap-2 px-8 py-3 bg-dark-950 border-2 border-dark-700 hover:border-accent-red-500 text-light-50 font-semibold rounded-lg transition-all hover:scale-105"
          >
            Ver Todas las Noticias
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
