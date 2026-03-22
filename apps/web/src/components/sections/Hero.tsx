'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '@/hooks/useLocale';
import { MagneticButton } from '@/components/ui/MagneticButton';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const statsData = [
  { value: '6+', labelKey: 'products' },
  { value: '20+', labelKey: 'clients' },
  { value: '3+', labelKey: 'years' },
  { value: '99%', labelKey: 'uptime' },
];

const statsLabels: Record<string, Record<string, string>> = {
  products: { en: 'Products & Projects', ru: 'Продуктов и проектов', uz: 'Mahsulot va loyihalar' },
  clients: { en: 'Happy Clients', ru: 'Довольных клиентов', uz: "Mamnun mijozlar" },
  years: { en: 'Years Experience', ru: 'Года опыта', uz: "Yillik tajriba" },
  uptime: { en: 'Service Uptime', ru: 'Время работы', uz: "Xizmat ishlashi" },
};

const productShowcase = [
  { name: 'Yuridix', slug: 'yuridix', image: '/products/yuridix/screenshot-1.png', gradient: 'from-blue-600 to-indigo-700' },
  { name: 'Ordo', slug: 'ordo', image: '/products/ordo/screenshot-1.png', gradient: 'from-emerald-500 to-teal-600' },
  { name: 'TalimX', slug: 'talimx', image: '/products/talimx/screenshot-1.png', gradient: 'from-orange-500 to-amber-500' },
];

interface HeroProps {
  overrides?: { title?: string; subtitle?: string };
}

export function Hero({ overrides }: HeroProps) {
  const { locale, t } = useLocale();
  const title = overrides?.title || t.home.hero.title;
  const subtitle = overrides?.subtitle || t.home.hero.subtitle;
  const titleWords = title.split(' ');

  return (
    <section className="min-h-screen flex flex-col justify-center pt-16 pb-8 px-4 relative overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute inset-0 noise-overlay" />
      </div>

      <div className="max-w-6xl mx-auto text-center w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={fadeUpVariants} className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-600 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {t.home.hero.badge}
            </div>
          </motion.div>

          {/* Massive Title - word by word reveal */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className="inline-block gradient-text mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUpVariants}
            className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            {subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <MagneticButton>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 text-lg"
              >
                {t.home.hero.contact}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </MagneticButton>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-medium text-lg transition-colors"
            >
              {t.home.hero.cta}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>

          {/* Product Showcase */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          >
            {productShowcase.map((product) => (
              <Link
                key={product.slug}
                href={`/solutions/${product.slug}`}
                className="group relative w-full sm:w-64 h-40 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient}`} />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                <Image
                  src={product.image}
                  alt={`${product.name} screenshot`}
                  fill
                  className="object-cover object-top opacity-60 group-hover:opacity-80 transition-opacity mix-blend-luminosity group-hover:mix-blend-normal"
                  sizes="(max-width: 640px) 100vw, 256px"
                />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <span className="text-white font-semibold text-sm drop-shadow-lg">{product.name}</span>
                  <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-xs">
                    {locale === 'ru' ? 'Продукт' : locale === 'uz' ? 'Mahsulot' : 'Product'}
                  </span>
                </div>
              </Link>
            ))}
          </motion.div>

          {/* Stats / Social Proof */}
          <motion.div
            variants={fadeUpVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {statsData.map((stat) => (
              <div key={stat.labelKey} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{statsLabels[stat.labelKey][locale] || statsLabels[stat.labelKey].en}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
