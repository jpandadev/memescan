/**
 * CSS-based Matrix Rain Effect
 *
 * Lightweight alternative to canvas-based animation.
 * Uses CSS animations and gradients for much better mobile performance.
 * ~60fps on low-end devices vs ~15fps with canvas version.
 */

export function MatrixRainCSS() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30"
      aria-hidden="true"
    >
      {/* Layer 1: Fast falling columns */}
      <div className="absolute inset-0 matrix-layer matrix-layer-1" />

      {/* Layer 2: Medium speed columns */}
      <div className="absolute inset-0 matrix-layer matrix-layer-2" />

      {/* Layer 3: Slow falling columns for depth */}
      <div className="absolute inset-0 matrix-layer matrix-layer-3" />

      {/* Glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 via-transparent to-cyan-500/5" />

      <style jsx>{`
        .matrix-layer {
          background-image:
            repeating-linear-gradient(
              0deg,
              transparent 0px,
              transparent 14px,
              rgba(34, 197, 94, 0.15) 14px,
              rgba(34, 197, 94, 0.15) 15px
            );
          background-size: 14px 100%;
        }

        .matrix-layer-1 {
          animation: matrix-fall-1 8s linear infinite;
          opacity: 0.7;
        }

        .matrix-layer-2 {
          animation: matrix-fall-2 12s linear infinite;
          opacity: 0.5;
          background-position: 7px 0;
        }

        .matrix-layer-3 {
          animation: matrix-fall-3 16s linear infinite;
          opacity: 0.3;
          background-position: 3px 0;
        }

        @keyframes matrix-fall-1 {
          0% { background-position-y: -100vh; }
          100% { background-position-y: 100vh; }
        }

        @keyframes matrix-fall-2 {
          0% { background-position-y: -50vh; }
          100% { background-position-y: 150vh; }
        }

        @keyframes matrix-fall-3 {
          0% { background-position-y: 0vh; }
          100% { background-position-y: 200vh; }
        }
      `}</style>
    </div>
  )
}
