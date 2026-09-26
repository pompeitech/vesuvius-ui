import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Consumes packages/ui's built dist/ (its package.json "exports" already
  // point there), same as apps/docs — rebuild packages/ui + restart this
  // dev server to see a packages/ui source change. transpilePackages lets
  // Next process its ESM output through its own pipeline (CSS-in-JS-free
  // here, but keeps sourcemaps/JSX transforms consistent).
  transpilePackages: ['@pompeitech/admin-kit']
}

export default nextConfig
