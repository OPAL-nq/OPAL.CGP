export default function CoreQuestion() {
  return (
    <section className="py-24 md:py-36 bg-white border-b border-border relative overflow-hidden">
      {/* Subtle architectural vertical lines */}
      <div className="absolute inset-0 max-w-6xl mx-auto px-4 pointer-events-none opacity-30">
        <div className="w-full h-full border-x border-dashed border-border" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <span className="text-xs font-bold uppercase tracking-widest text-muted bg-surface-100 px-3.5 py-1.5 rounded-full border border-border">
          La question fondamentale
        </span>

        <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-foreground leading-[1.12] text-balance">
          Votre croissance augmente-t-elle la valeur de votre cabinet…
          <span className="block mt-3 text-opal-red">
            ou simplement votre CHARGE de travail ?
          </span>
        </h2>

        <p className="text-lg sm:text-xl text-muted font-normal leading-relaxed max-w-2xl mx-auto text-balance">
          Le but n&apos;est pas de travailler davantage. Le but est de pouvoir créer
          davantage de valeur et délivrer davantage de conseil{" "}
          <strong className="text-foreground font-semibold">
            sans que chaque nouveau client exige proportionnellement plus de temps.
          </strong>
        </p>

        <div className="pt-4 flex items-center justify-center gap-4 text-xs font-semibold uppercase tracking-wider text-muted">
          <span>Découpler Croissance</span>
          <span className="text-opal-red">⟷</span>
          <span>Charge Opérationnelle</span>
        </div>
      </div>
    </section>
  );
}
