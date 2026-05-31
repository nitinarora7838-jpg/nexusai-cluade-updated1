'use client';

import { ArrowRight, CheckCircle2 } from 'lucide-react';
import {
  MarketingSection,
  SectionContainer,
  SectionGridBg,
  SectionHeader,
  MarketingCard,
} from '@/components/marketing';
import { PRODUCTS, type ProductItem } from '@/lib/content/products';
import { accentBadgeStyle, getAccentStyles, gridStaggerDelay } from '@/lib/theme';

function ProductCard({ product, index }: { product: ProductItem; index: number }) {
  const Icon = product.icon;
  const styles = getAccentStyles(product.accent);

  return (
    <MarketingCard
      {...gridStaggerDelay(index)}
      className="group shimmer-effect flex flex-col"
      aria-label={product.name}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${styles.hex}12, transparent 70%)` }}
        aria-hidden="true"
      />

      <div className="flex items-start justify-between mb-4 sm:mb-5">
        <div
          className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 border"
          style={accentBadgeStyle(styles.hex)}
          aria-hidden="true"
        >
          <Icon className="w-5 h-5" style={{ color: styles.hex }} />
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 border" style={accentBadgeStyle(styles.hex)}>
          {product.tag}
        </span>
      </div>

      <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{product.name}</h3>
      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 sm:mb-5 flex-1">{product.description}</p>

      <ul className="space-y-1.5 sm:space-y-2 mb-5 sm:mb-6" aria-label={`${product.name} features`}>
        {product.features.map(f => (
          <li key={f} className="flex items-center gap-2 text-xs text-slate-600">
            <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 ${styles.text}`} aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>

      <a
        href={`/products/${product.slug}`}
        className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-all group/link focus-visible:outline-2 focus-visible:outline-offset-2 ${styles.text}`}
        aria-label={`Learn more about ${product.name}`}
      >
        Learn More
        <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" aria-hidden="true" />
      </a>
    </MarketingCard>
  );
}

export default function Products() {
  return (
    <MarketingSection id="products" ariaLabelledBy="products-heading" bg="slate">
      <SectionGridBg opacity={40} />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-px bg-gradient-to-r from-transparent via-teal-300/50 to-transparent"
        aria-hidden="true"
      />
      <SectionContainer>
        <SectionHeader
          label="AI Products"
          headingId="products-heading"
          titlePrimary="Intelligent Platforms"
          titleAccent="Built for Enterprise"
          description="A comprehensive suite of AI-powered products that modernize every aspect of your enterprise operations."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.name} product={product} index={i} />
          ))}
        </div>
      </SectionContainer>
    </MarketingSection>
  );
}
