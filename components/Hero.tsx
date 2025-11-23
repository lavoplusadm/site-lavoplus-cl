import heroData from '@/data/hero.json';

const primarySlide = heroData.slides?.[0];

if (!primarySlide) {
  throw new Error('Hero necesita al menos un slide en data/hero.json');
}

export default function Hero() {
  const highlightTextClass = primarySlide.highlightColor ?? 'text-blue-200';
  const cta = heroData.cta ?? {
    primary: { text: 'Ver Servicios', link: '#servicios' },
    secondary: { text: 'Contáctanos', link: '#contacto' },
  };

  return (
    <>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-white text-center md:text-left flex flex-col gap-8 max-w-4xl lg:max-w-5xl mx-auto md:mx-0 justify-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-semibold tracking-wide text-blue-100 backdrop-blur">
              {primarySlide.badge}
            </p>
            <h1
              id="hero-heading"
              className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-xl"
            >
              {primarySlide.title.line1}
              <br />
              <span
                className={`${highlightTextClass} bg-white/10 backdrop-blur-sm px-6 py-2 rounded-lg inline-block mt-4 border border-white/20`}
              >
                {primarySlide.title.line2}
              </span>
            </h1>
          </div>

          <p className="text-base sm:text-lg md:text-xl text-white/90 mx-auto md:mx-0 leading-relaxed max-w-3xl lg:max-w-4xl">
            {primarySlide.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href={cta.primary.link}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-2xl text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              {cta.primary.text}
            </a>
            <a
              href={cta.secondary.link}
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white border-2 border-white/70 rounded-xl hover:bg-white/10 transition-all duration-300 text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-white/40"
            >
              {cta.secondary.text}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
