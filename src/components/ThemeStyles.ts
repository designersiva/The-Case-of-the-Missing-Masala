import { CreatorTheme } from '../types';

export interface ThemeColors {
  bg: string;
  sidebarBg: string;
  cardBg: string;
  text: string;
  muted: string;
  accent: string;
  hover: string;
  border: string;
}

export const themePalettes: Record<CreatorTheme, ThemeColors> = {
  default: {
    bg: 'bg-black',
    sidebarBg: 'bg-[#0c0c0c]',
    cardBg: 'bg-[#121212] border border-[#d4af37]/20 shadow-[0_8px_30px_rgb(0,0,0,0.85)]',
    text: 'text-zinc-100',
    muted: 'text-[#cfa840]/80',
    accent: 'bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-black hover:opacity-90 active:scale-95 transition-all font-bold',
    hover: 'hover:bg-[#d4af37]/10 text-[#d4af37]',
    border: 'border-[#d4af37]/15'
  },
  'cinematic-dark': {
    bg: 'bg-[#050505]',
    sidebarBg: 'bg-[#0d0d0c]',
    cardBg: 'bg-[#151514] border border-[#d4af37]/20',
    text: 'text-zinc-100',
    muted: 'text-[#d4af37]/70',
    accent: 'bg-[#d4af37] hover:bg-[#aa7c11] text-black transition-all font-semibold',
    hover: 'hover:bg-[#d4af37]/5 text-zinc-100',
    border: 'border-[#d4af37]/15'
  },
  'creator-neon': {
    bg: 'bg-zinc-950',
    sidebarBg: 'bg-black',
    cardBg: 'bg-[#18181a] border border-[#b59228]/25',
    text: 'text-zinc-100',
    muted: 'text-[#b59228]',
    accent: 'bg-gradient-to-r from-[#e3c153] to-[#b59228] text-black shadow-[0_0_15px_rgba(227,193,83,0.3)]',
    hover: 'hover:bg-[#e3c153]/10 text-[#e3c153]',
    border: 'border-[#e3c153]/20'
  },
  'eco-green': {
    bg: 'bg-[#040904]',
    sidebarBg: 'bg-[#081208]',
    cardBg: 'bg-[#121c12] border border-[#d4af37]/20',
    text: 'text-zinc-100',
    muted: 'text-emerald-400',
    accent: 'bg-[#d4af37] hover:bg-emerald-600 text-black',
    hover: 'hover:bg-[#d4af37]/10 text-emerald-300',
    border: 'border-emerald-900/30'
  },
  'vintage-paper': {
    bg: 'bg-neutral-900',
    sidebarBg: 'bg-[#1c1917]',
    cardBg: 'bg-[#292524] border border-[#aa7c11]/30',
    text: 'text-amber-100',
    muted: 'text-amber-350/70',
    accent: 'bg-[#aa7c11] hover:bg-[#d4af37] text-black font-semibold',
    hover: 'hover:bg-[#aa7c11]/10 text-[#d4af37]',
    border: 'border-[#stone-800]'
  }
};
