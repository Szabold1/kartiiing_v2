'use client';

import Image from 'next/image';
import { ArrowDownRight, ArrowUpRight, Gauge, Trophy, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

type Rating = { label: string; value: number };

const ratings: Rating[] = [
  { label: 'Speed', value: 92 },
  { label: 'Racecraft', value: 88 },
  { label: 'Consistency', value: 86 },
  { label: 'Overtakes', value: 84 },
  { label: 'Qualifying', value: 91 },
  { label: 'Finishing', value: 89 },
];

export function DriverCard() {
  return (
    <article className="relative isolate mx-auto w-full max-w-[360px] overflow-hidden rounded-2xl border border-white/15 bg-zinc-950 text-zinc-100 shadow-2xl shadow-black/30">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#1d2723_0%,#0c0e0d_48%,#17221e_100%)]" />
      <div className="absolute top-0 right-0 left-0 h-1 bg-lime-400" />
      <div className="absolute top-6 right-[-48px] rotate-45 bg-lime-400 px-12 py-1 text-[10px] font-black tracking-[0.24em] text-zinc-950">FORM</div>

      <div className="flex items-start justify-between px-6 pt-7">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-lime-300">KARTIIING / ELITE</p>
          <p className="mt-1 text-xs font-medium text-zinc-400">KZ2 · 2025 season</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-5xl font-black leading-none text-lime-300">91</p>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">OVR</p>
        </div>
      </div>

      <div className="relative mx-5 mt-4 h-64 overflow-hidden rounded-xl border border-white/10 bg-zinc-900">
        <Image src="/images/driver-portrait.png" alt="Portrait of Alex Novak in karting racing gear" fill priority className="object-cover object-top opacity-90 mix-blend-screen" sizes="(max-width: 640px) 90vw, 360px" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime-300">#27 · CZE</p>
          <h2 className="mt-1 text-3xl font-black uppercase tracking-tight">Alex Novak</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-3 px-6 py-5">
        {ratings.map((rating) => (
          <div key={rating.label} className="flex items-center justify-between border-b border-dashed border-white/15 pb-2">
            <span className="text-xs font-semibold text-zinc-400">{rating.label}</span>
            <span className="font-mono text-lg font-bold text-lime-300">{rating.value}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-white/10 bg-white/5 px-6 py-4">
        <div className="flex items-center gap-2 text-xs text-zinc-300"><Trophy aria-hidden="true" className="size-4 text-lime-300" /> 3 podiums</div>
        <div className="flex items-center gap-2 text-xs text-lime-300"><ArrowUpRight aria-hidden="true" className="size-4" /> +7 places</div>
      </div>
    </article>
  );
}

export function SignalIcon({ type }: { type: 'pace' | 'result' | 'gain' }) {
  const Icon = type === 'pace' ? Gauge : type === 'result' ? Trophy : Zap;
  return <Icon aria-hidden="true" className={cn('size-5 text-lime-400')} />;
}

export function Trend({ value }: { value: string }) {
  const positive = value.startsWith('+');
  return <span className={cn('inline-flex items-center gap-1 font-mono text-xs', positive ? 'text-lime-400' : 'text-rose-300')}>{positive ? <ArrowUpRight aria-hidden="true" className="size-3" /> : <ArrowDownRight aria-hidden="true" className="size-3" />}{value}</span>;
}
