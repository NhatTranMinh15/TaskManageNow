import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Workaround for Tailwind dark mode resolution with CSS Modules
    const rules = config.module.rules.find((r: { oneOf: any; }) => !!r.oneOf)

    rules.oneOf.forEach((loaders: { use: any[]; }) => {
      if (Array.isArray(loaders.use)) {
        loaders.use.forEach((loader: { loader: string; options: { modules: { getLocalIdent: any; }; }; }) => {
          const isCssLoader =
            typeof loader?.loader === 'string' &&
            /(?<!post)css-loader/.test(loader?.loader)
          const hasGetLocalIdent = !!loader?.options?.modules?.getLocalIdent

          if (isCssLoader && hasGetLocalIdent) {
            const { getLocalIdent } = loader.options.modules
            if (getLocalIdent) {
              loader.options.modules.getLocalIdent = (...args:  string[]) => {
                if (args.includes('dark')) return 'dark'
                return getLocalIdent(...args)
              }
            }
          }
        })
      }
    })
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ]
  }
};

export default nextConfig;
