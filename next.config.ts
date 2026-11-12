import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/config.ts');

/** Jedyny wlasciwy adres strony - pozostale domeny przekierowuja tutaj kodem 301. */
const CANONICAL_ORIGIN = 'https://rolety-smarteks.pl';
const REDIRECTED_HOSTS = ['www.rolety-smarteks.pl', 'smarteks-rolety.vercel.app'];

const nextConfig: NextConfig = {
  // Compress output
  compress: true,

  // Jedna wersja adresu: www i domena Vercel -> rolety-smarteks.pl (301).
  // Podglady (smarteks-rolety-git-*.vercel.app) maja inne hosty, wiec dzialaja dalej.
  async redirects() {
    return REDIRECTED_HOSTS.map((host) => ({
      source: '/:path*',
      has: [{ type: 'host' as const, value: host }],
      destination: `${CANONICAL_ORIGIN}/:path*`,
      statusCode: 301 as const,
    }));
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    // 2560 — tla na pelna szerokosc na ekranach Retina i szerszych niz 1920 px.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // 90 — zdjecia w tle naglowkow; przy 75 widac artefakty pod przyciemnieniem.
    qualities: [75, 90],
  },

  // Logging
  logging: {
    fetches: { fullUrl: false },
  },
};

export default withNextIntl(nextConfig);
