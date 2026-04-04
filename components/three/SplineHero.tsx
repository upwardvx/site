'use client'
import dynamic from 'next/dynamic'

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => null,
})

interface SplineHeroProps {
  scene?: string
  className?: string
}

// Default scene: abstract minimal sphere from Spline community
// Swap scene URL at spline.design/community — search "minimal sphere" or "abstract particles"
// with transparent background. Copy the public embed URL.
const DEFAULT_SCENE = 'https://prod.spline.design/BrHcEUlEFUCJJRkA/scene.splinecode'

export function SplineHero({ scene = DEFAULT_SCENE, className }: SplineHeroProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
      }}
      className={className}
    >
      <Spline
        scene={scene}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
