import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Next prints this LAN URL alongside localhost, so keep the development
  // client (HMR and hydrated controls) available when previewing from it.
  allowedDevOrigins: ['192.168.1.*'],
  // Consumes packages/ui's built dist/ (its package.json "exports" already
  // point there), same as apps/docs — rebuild packages/ui + restart this
  // dev server to see a packages/ui source change. transpilePackages lets
  // Next process its ESM output through its own pipeline (CSS-in-JS-free
  // here, but keeps sourcemaps/JSX transforms consistent).
  transpilePackages: ['@pompeitech/vesuvius-ui']
}

export default nextConfig
