import Image from 'next/image';
import heroData from '@/data/hero.json';

/**
 * Server component for LCP image - renders immediately without JS hydration
 */
export default function HeroImage() {
  const firstSlide = heroData.slides[0];

  if (!firstSlide) return null;

  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0">
        <Image
          src={firstSlide.image}
          alt={firstSlide.alt}
          fill
          priority
          loading="eager"
          className="object-cover object-center"
          sizes="100vw"
          quality={70}
        />
        <div className="absolute inset-0 pointer-events-none">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${
              firstSlide.gradient ?? 'from-slate-900/85 via-slate-800/70 to-slate-900/90'
            } mix-blend-multiply opacity-85`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-white/15 mix-blend-screen" />
        </div>
      </div>
    </div>
  );
}
