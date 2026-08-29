import type { Metadata } from 'next';
import { ArrowRight, Flag, Timer, TrendingUp } from 'lucide-react';
import { DriverCard, SignalIcon, Trend } from '@/components/driver/DriverCard';
import { buildMetadata, getPageMetadata } from '@/lib/utils';

const pageMetadata = getPageMetadata('home');
export const metadata: Metadata = buildMetadata({ ...pageMetadata, title: 'Driver ratings | Kartiiing' });

const signals = [
  { type: 'pace' as const, label: 'Speed rating', value: '92', detail: 'Qualifying + fastest lap pace', trend: '+4.2' },
  { type: 'result' as const, label: 'Result rating', value: '89', detail: 'Finish position vs. field strength', trend: '+2.8' },
  { type: 'gain' as const, label: 'Racecraft rating', value: '87', detail: 'Positions gained across races', trend: '+6.0' },
];

export default function HomePage() {
  return (
    <div className="min-h-full py-10 sm:py-14">
      <header className="mx-auto flex max-w-6xl flex-col gap-5 border-b border-dashed pb-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.24em] text-primary">Driver intelligence / prototype 01</p>
          <h1 className="text-balance text-4xl font-black tracking-tight sm:text-6xl">Turn every lap into a rating.</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">A motorsport-specific performance card that makes pace, racecraft, and results instantly comparable.</p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground"><span className="size-2 rounded-full bg-lime-400" /> Live model preview</div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-12 py-10 lg:grid-cols-[minmax(320px,360px)_1fr] lg:items-start lg:gap-20">
        <section aria-labelledby="card-title">
          <div className="mb-4 flex items-center justify-between"><h2 id="card-title" className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Featured driver</h2><span className="font-mono text-xs text-muted-foreground">01 / 12</span></div>
          <DriverCard />
        </section>

        <section className="flex flex-col gap-8 pt-1" aria-labelledby="model-title">
          <div><p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">How it works</p><h2 id="model-title" className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">One card. The full weekend.</h2><p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">Ratings blend normalized lap data with race outcomes, so a driver can earn credit for raw speed, smart moves, and delivering when it counts.</p></div>
          <div className="grid gap-3 sm:grid-cols-3">
            {signals.map((signal) => <div key={signal.label} className="rounded-xl border border-dashed bg-muted/30 p-4"><div className="flex items-center justify-between"><SignalIcon type={signal.type} /><Trend value={signal.trend} /></div><p className="mt-7 text-sm font-semibold">{signal.label}</p><div className="mt-1 flex items-end justify-between gap-2"><span className="font-mono text-3xl font-black">{signal.value}</span><span className="pb-1 text-right text-[11px] leading-tight text-muted-foreground">{signal.detail}</span></div></div>)}
          </div>
          <div className="rounded-xl border bg-card/50 p-5"><div className="mb-5 flex items-center justify-between"><h3 className="text-sm font-bold">Recent form</h3><span className="font-mono text-xs text-muted-foreground">last 5 races</span></div><div className="flex flex-wrap gap-2">{['P2', 'P1', 'P4', 'P3', 'P1'].map((position, index) => <div key={`${position}-${index}`} className="flex size-12 flex-col items-center justify-center rounded-lg border border-dashed bg-muted/40"><span className="font-mono text-sm font-bold">{position}</span><span className="text-[9px] uppercase text-muted-foreground">R{index + 1}</span></div>)}<div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground"><TrendingUp aria-hidden="true" className="size-4 text-primary" /> trending up</div></div></div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-dashed pt-5 text-xs text-muted-foreground"><span className="inline-flex items-center gap-2"><Timer aria-hidden="true" className="size-4 text-primary" /> Pace normalized by track</span><span className="inline-flex items-center gap-2"><Flag aria-hidden="true" className="size-4 text-primary" /> Field strength weighted</span><span className="inline-flex items-center gap-2 text-primary">Explore the model <ArrowRight aria-hidden="true" className="size-4" /></span></div>
        </section>
      </main>
    </div>
  );
}
