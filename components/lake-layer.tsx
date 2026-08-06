export function LakeLayer() {
  return (
    <div
      className="fixed inset-0 -z-20 overflow-hidden"
      aria-hidden="true"
    >
      {/* Base water surface */}
      <div className="absolute inset-0 bg-moss-background" />

      {/* Soft green orb — upper left */}
      <div
        className="absolute -left-[20vw] -top-[20vh] h-[80vh] w-[80vh] rounded-full blur-[120px] animate-breathe"
        style={{
          background:
            "radial-gradient(circle at center, var(--color-moss-soft) 0%, transparent 70%)",
        }}
      />

      {/* Pale light orb — lower right */}
      <div
        className="absolute -bottom-[20vh] -right-[20vw] h-[90vh] w-[90vh] rounded-full blur-[140px] animate-breathe-slow"
        style={{
          background:
            "radial-gradient(circle at center, var(--color-moss-light) 0%, transparent 65%)",
        }}
      />

      {/* Warm gray mist — center */}
      <div
        className="absolute left-1/3 top-1/3 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] animate-drift"
        style={{
          background:
            "radial-gradient(circle at center, var(--color-moss-warm) 0%, transparent 60%)",
        }}
      />

      {/* Subtle sunlight shimmer */}
      <div
        className="absolute inset-0 animate-shimmer"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.55) 0%, transparent 50%)",
        }}
      />

      {/* Very faint texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
