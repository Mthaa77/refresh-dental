'use client'

export default function ParallaxStatement() {
  return (
    <section className="relative min-h-[60vh] overflow-hidden bg-espresso py-24">
      {/* Background Image (static, no parallax y) */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/images/clinic/dental-treatment-room.jpg")' }}
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-espresso/60" />

      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(15, 13, 10, 0.5) 100%)',
      }} />

      {/* Content */}
      <div
        className="relative z-10 flex min-h-[60vh] flex-col items-center justify-center px-6 text-center"
      >
        {/* Static quote mark */}
        <span className="relative mb-6 block font-cormorant text-7xl leading-none md:text-9xl text-champagne-gold/30">
          &ldquo;
        </span>

        {/* Quote Text with double-line frame */}
        <div className="relative px-6 py-5 md:px-10 md:py-7 shadow-gold-strong rounded-xl">
          {/* Double border frame */}
          <div className="absolute inset-0 rounded-xl border border-champagne-gold/20 pointer-events-none" />
          <div className="absolute inset-[5px] rounded-lg border border-champagne-gold/10 pointer-events-none" />

          <blockquote className="relative font-cormorant text-3xl md:text-4xl lg:text-5xl font-light italic leading-snug text-ivory text-shadow-ivory md:leading-tight">
            <span className="block">One refreshed smile</span>
            <span className="block mt-1">at a time.</span>
          </blockquote>
        </div>

        {/* Gold Separator Line */}
        <div
          className="mx-auto mt-8 h-px w-16 bg-champagne-gold"
        />

        {/* Attribution */}
        <p className="mt-6 font-jost text-sm font-light tracking-wide shimmer-text">
          — Dr. Lebogang Malunga
        </p>

        <p className="mt-4 font-jost text-xs tracking-wider text-ivory/65">
          Serving Centurion · Lyttelton Manor · Family Wellness Centre
        </p>
      </div>
    </section>
  )
}
