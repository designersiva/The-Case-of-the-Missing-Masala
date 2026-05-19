import React from 'react';
import { Film, Printer, RotateCcw, Download, Sparkles, HelpCircle, FileText } from 'lucide-react';
import { ScriptMetadata } from '../types';

interface HeaderProps {
  metadata: ScriptMetadata;
  onPrint: () => void;
  onReset: () => void;
  onExportJson: () => void;
  selectedTemplate: string;
  onChangeTemplate: (t: any) => void;
  isCustomKeyLoaded: boolean;
  onToggleAiDrawer: () => void;
}

export default function Header({
  metadata,
  onPrint,
  onReset,
  onExportJson,
  selectedTemplate,
  onChangeTemplate,
  isCustomKeyLoaded,
  onToggleAiDrawer
}: HeaderProps) {
  return (
    <header className="bg-zinc-900 border-b border-zinc-800 text-white sticky top-0 z-40 px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Logo and App Title */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-tr from-[#aa7c11] via-[#d4af37] to-[#f3e5ab] rounded-xl shadow-lg animate-pulse-slow">
            <Film className="w-6 h-6 text-black stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight font-display bg-gradient-to-r from-[#edd06c] via-[#d4af37] to-[#b59228] bg-clip-text text-transparent">
                89Studio.in
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black text-[#d4af37] font-bold border border-[#d4af37]/35 shadow-[0_0_8px_rgba(212,175,55,0.15)]">
                GOLD VIP
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">
              Premia Script & Storyboard Lab
            </p>
          </div>
        </div>

        {/* Template Quick Selection */}
        <div className="flex items-center gap-2 bg-zinc-950 p-1.5 rounded-lg border border-[#d4af37]/20 self-start md:self-auto shadow-inner">
          <span className="text-xs text-[#d4af37]/70 px-2 font-mono font-bold hidden sm:inline">LAYOUT:</span>
          {(['screenplay', 'storyboard', 'prompt-pack', 'compact'] as const).map((t) => (
            <button
              key={t}
              onClick={() => onChangeTemplate(t)}
              className={`text-xs px-3 py-1.5 rounded-md font-bold transition-all duration-200 capitalize cursor-pointer ${
                selectedTemplate === t
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#edd06c] text-black font-extrabold shadow-[0_0_12px_rgba(212,175,55,0.3)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              {t.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* AI Enhancer drawer toggle */}
          <button
            onClick={onToggleAiDrawer}
            className="flex items-center gap-1.5 px-3 py-2 bg-purple-950/40 text-purple-300 hover:bg-purple-950/60 rounded-lg border border-purple-500/35 text-xs font-semibold cursor-pointer transition-all duration-200"
            title="Configure AI Prompt Assistants"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>AI Studio</span>
          </button>

          {/* Export JSON Raw */}
          <button
            onClick={onExportJson}
            className="flex items-center gap-1.5 px-3 py-2 bg-zinc-800 text-zinc-300 hover:bg-zinc-750 rounded-lg border border-zinc-700 text-xs font-semibold cursor-pointer transition-all duration-200"
            title="Download script & prompt data as raw JSON"
          >
            <Download className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden lg:inline">Export Script JSON</span>
          </button>

          {/* Reset button */}
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 bg-zinc-800 hover:bg-red-950/20 text-zinc-300 hover:text-red-400 rounded-lg border border-zinc-700 hover:border-red-900/40 text-xs font-semibold cursor-pointer transition-all duration-200"
            title="Reset script back to default story"
          >
            <RotateCcw className="w-3.5 h-3.5 text-zinc-400 hover:text-red-400" />
          </button>

          {/* Export PDF / Print Button */}
          <button
            onClick={onPrint}
            className="flex items-center gap-2 px-4.5 py-2 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#b59228] hover:opacity-90 active:scale-95 text-black font-black text-xs rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.25)] transition-all duration-200 cursor-pointer"
            title="Open high-fidelity print window to print or save a vector PDF"
          >
            <Printer className="w-4 h-4 stroke-[2.5]" />
            <span>EXPORT PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
}
