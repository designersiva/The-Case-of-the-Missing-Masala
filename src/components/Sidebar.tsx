import React, { useState } from 'react';
import { 
  FileText, Sliders, Palette, Users, Settings, Plus, Trash2, 
  MapPin, Clock, Video, Sparkles, AlertCircle, Copy, Check 
} from 'lucide-react';
import { ScriptMetadata, PdfOptions, CreatorTheme } from '../types';

interface SidebarProps {
  metadata: ScriptMetadata;
  onChangeMetadata: (meta: ScriptMetadata) => void;
  pdfOptions: PdfOptions;
  onChangePdfOptions: (opts: PdfOptions) => void;
  promptStylePreset: string;
  onChangePromptStylePreset: (style: string) => void;
  promptArSuffix: string;
  onChangePromptArSuffix: (ar: string) => void;
}

export default function Sidebar({
  metadata,
  onChangeMetadata,
  pdfOptions,
  onChangePdfOptions,
  promptStylePreset,
  onChangePromptStylePreset,
  promptArSuffix,
  onChangePromptArSuffix
}: SidebarProps) {
  const [activeTab, setActiveTab] = useState<'metadata' | 'design' | 'prompts' | 'characters'>('metadata');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const updateMetadataField = (field: keyof ScriptMetadata, val: string) => {
    onChangeMetadata({
      ...metadata,
      [field]: val
    });
  };

  const updatePdfOptionField = (field: keyof PdfOptions, val: any) => {
    onChangePdfOptions({
      ...pdfOptions,
      [field]: val
    });
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  // Vegetable character list
  const characters = [
    { name: 'Inspector Aloo', role: 'Main Detective / Potato Cop', emoji: '🥔', color: 'bg-amber-100 text-amber-900 border-amber-300' },
    { name: 'Tamatar Bhai', role: 'Cool Suspect / Tomato Dude', emoji: '🍅', color: 'bg-red-100 text-red-900 border-red-300' },
    { name: 'Dhaniya Devi', role: 'Eager Partner / Coriander Hero', emoji: '🌿', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
    { name: 'Mirchi Madam', role: 'Femme Fatale / Chili Antagonist', emoji: '🌶️', color: 'bg-rose-100 text-rose-900 border-rose-300' },
    { name: 'Pyaaz Uncle', role: 'Emotional Sabzi Stall Owner', emoji: '🧅', color: 'bg-purple-100 text-purple-900 border-purple-300' },
    { name: 'Chef Google', role: 'Evil Overlord / AI Optimizer', emoji: '🤖', color: 'bg-indigo-100 text-indigo-900 border-indigo-300' }
  ];

  return (
    <aside className="w-full xl:w-96 flex-shrink-0 bg-zinc-900 border-r border-zinc-800 flex flex-col text-zinc-100">
      {/* Tabs */}
      <div className="flex border-b border-zinc-855 bg-zinc-950 p-1 gap-1">
        {(['metadata', 'design', 'prompts', 'characters'] as const).map((tab) => {
          const getIcon = () => {
            switch(tab) {
              case 'metadata': return <FileText className="w-3.5 h-3.5" />;
              case 'design': return <Sliders className="w-3.5 h-3.5" />;
              case 'prompts': return <Sparkles className="w-3.5 h-3.5" />;
              case 'characters': return <Users className="w-3.5 h-3.5" />;
            }
          };
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-1 rounded-md text-xs font-semibold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                activeTab === tab
                  ? 'bg-zinc-800 text-[#d4af37] border border-zinc-700/60 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
              }`}
            >
              {getIcon()}
              <span className="hidden sm:inline-block xl:inline-block">{tab}</span>
            </button>
          );
        })}
      </div>

      {/* Scrolling Content Block */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* TAB 1: SCRIPT METADATA */}
        {activeTab === 'metadata' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#d4af37] font-display uppercase tracking-wider">
              1. Title Page & Script Info
            </h3>
            
            <div className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-mono font-semibold uppercase text-zinc-400 mb-1">
                  Script Title
                </label>
                <input
                  type="text"
                  value={metadata.title}
                  onChange={(e) => updateMetadataField('title', e.target.value)}
                  className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-semibold uppercase text-zinc-400 mb-1">
                  Subtitle / Description
                </label>
                <textarea
                  rows={2}
                  value={metadata.subtitle}
                  onChange={(e) => updateMetadataField('subtitle', e.target.value)}
                  className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-500 transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono font-semibold uppercase text-zinc-400 mb-1">
                    Author / Creator
                  </label>
                  <input
                    type="text"
                    value={metadata.author}
                    onChange={(e) => updateMetadataField('author', e.target.value)}
                    className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-semibold uppercase text-zinc-400 mb-1">
                    Script Version
                  </label>
                  <input
                    type="text"
                    value={metadata.version}
                    onChange={(e) => updateMetadataField('version', e.target.value)}
                    className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-semibold uppercase text-zinc-400 mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={metadata.email}
                  onChange={(e) => updateMetadataField('email', e.target.value)}
                  className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-semibold uppercase text-zinc-400 mb-1">
                  Studio Phone
                </label>
                <input
                  type="text"
                  value={metadata.phone}
                  onChange={(e) => updateMetadataField('phone', e.target.value || "")}
                  className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-semibold uppercase text-zinc-400 mb-1">
                  Copyright Notice
                </label>
                <input
                  type="text"
                  value={metadata.copyright}
                  onChange={(e) => updateMetadataField('copyright', e.target.value)}
                  className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            <div className="bg-amber-950/20 border border-amber-900/30 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center gap-1.5 text-amber-400">
                <AlertCircle className="w-4 h-4" />
                <span className="text-xs font-bold font-display uppercase">Creator Tip</span>
              </div>
              <p className="text-[11px] text-zinc-300 leading-relaxed">
                This info prints on a gorgeous dedicated <strong>Title Cover Page</strong> in standard industry format when you export to PDF!
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: DESIGN & LAYOUT */}
        {activeTab === 'design' && (
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-[#d4af37] font-display uppercase tracking-wider">
              2. PDF Compiling Style
            </h3>

            <div className="space-y-4">
              {/* Theme selection */}
              <div>
                <label className="block text-[10px] font-mono font-semibold uppercase text-zinc-400 mb-2">
                  Creator Color Palette
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    { id: 'default', label: '89Studio.in Gold', color: 'bg-[#d4af37] border-transparent shadow-[0_0_6px_rgba(212,175,55,0.7)] text-zinc-100' },
                    { id: 'cinematic-dark', label: 'Obsidian & Gold', color: 'bg-black border-[#d4af37]/30 text-zinc-100' },
                    { id: 'creator-neon', label: 'Carbon Gold Fiber', color: 'bg-zinc-800 border-[#edd06c]/30 text-white' },
                    { id: 'eco-green', label: 'Golden Sage Mint', color: 'bg-[#121c12] border-emerald-500/30 text-emerald-50' },
                    { id: 'vintage-paper', label: 'Aged Gold Parchment', color: 'bg-[#292524] border-[#aa7c11]/30 text-stone-300' }
                  ] as const).map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => updatePdfOptionField('selectedTheme', theme.id)}
                      className={`flex flex-col items-start p-2.5 rounded-lg border text-left cursor-pointer transition-all duration-150 ${
                        pdfOptions.selectedTheme === theme.id
                          ? 'ring-2 ring-[#d4af37] border-transparent scale-[1.02] bg-[#1a1a1a]'
                          : 'border-zinc-800 hover:border-zinc-700 bg-zinc-950/40'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 w-full">
                        <span className={`w-3.5 h-3.5 rounded-full ${theme.color.split(' ')[0]} border border-zinc-650`} />
                        <span className="text-xs font-semibold text-white">{theme.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* PDF Settings */}
              <div className="space-y-3 border-t border-zinc-850 pt-4">
                <label className="block text-[10px] font-mono font-semibold uppercase text-zinc-400 mb-0.5">
                  Page Layout Options
                </label>
                
                <label className="flex items-center gap-2.5 text-xs text-zinc-300 py-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pdfOptions.showPageNumbers}
                    onChange={(e) => updatePdfOptionField('showPageNumbers', e.target.checked)}
                    className="rounded border-zinc-700 bg-zinc-950 text-amber-500 focus:ring-amber-500"
                  />
                  <span>Show page numbers on header</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs text-zinc-300 py-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pdfOptions.showSceneNumbers}
                    onChange={(e) => updatePdfOptionField('showSceneNumbers', e.target.checked)}
                    className="rounded border-zinc-700 bg-zinc-950 text-amber-500 focus:ring-amber-500"
                  />
                  <span>Show industry scene numbers</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs text-zinc-300 py-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pdfOptions.isDoubleSpaced}
                    onChange={(e) => updatePdfOptionField('isDoubleSpaced', e.target.checked)}
                    className="rounded border-zinc-700 bg-zinc-950 text-amber-500 focus:ring-amber-500"
                  />
                  <span>Double-spaced dialogue</span>
                </label>
              </div>

              {/* Header/Footer text */}
              <div className="space-y-3 border-t border-zinc-850 pt-4">
                <div>
                  <label className="block text-[10px] font-mono font-semibold uppercase text-zinc-400 mb-1">
                    Custom Running Header text
                  </label>
                  <input
                    type="text"
                    value={pdfOptions.headerText || ''}
                    placeholder="e.g. MISSION: MASALA DIRECTORS CUT"
                    onChange={(e) => updatePdfOptionField('headerText', e.target.value)}
                    className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-semibold uppercase text-zinc-400 mb-1">
                    Custom Running Footer text
                  </label>
                  <input
                    type="text"
                    value={pdfOptions.footerText || ''}
                    placeholder="e.g. Confidential - Do Not Distribute"
                    onChange={(e) => updatePdfOptionField('footerText', e.target.value)}
                    className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PROMPT SUFFIX ENGINEERING */}
        {activeTab === 'prompts' && (
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-[#d4af37] font-display uppercase tracking-wider">
              3. AI Image Prompts Customizer
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono font-semibold uppercase text-zinc-400 mb-1">
                  Visual Renderer Style
                </label>
                <select
                  value={promptStylePreset}
                  onChange={(e) => onChangePromptStylePreset(e.target.value)}
                  className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-500 cursor-pointer transition-colors"
                >
                  <option value="">(Keep raw prompts)</option>
                  <option value="Pixar-style 3D cinematic render, super detailed, vivid colors">
                    🎬 Pixar 3D Cinematic Render (Original)
                  </option>
                  <option value="Studio Ghibli aesthetic, watercolor painting, detailed anime background, magical lighting">
                    🎏 Studio Ghibli Anime Watercolor
                  </option>
                  <option value="Claymation, Aardman animations style, detailed textured putty, cute physical model photoshoot">
                    🧸 Claymation / Physical Puppet Style
                  </option>
                  <option value="Hyperrealistic 35mm movie cinematography, movie poster lighting, high-contrast rustic atmospheric depth">
                    🎥 Real Movie Cinematography (35mm)
                  </option>
                  <option value="Retro comic book ink sketch, vivid popart watercolor fill, bold comic shadows, halftone dot details">
                    🎨 Pop Art Comic Book Sketch
                  </option>
                </select>
                <p className="text-[10px] text-zinc-500 mt-1 leading-normal">
                  Modifies active Midjourney / Stable Diffusion prompts globally.
                </p>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-semibold uppercase text-zinc-400 mb-1">
                  Aspect Ratio / Parameters Suffix
                </label>
                <select
                  value={promptArSuffix}
                  onChange={(e) => onChangePromptArSuffix(e.target.value)}
                  className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-500 cursor-pointer transition-colors"
                >
                  <option value="">(No parameters)</option>
                  <option value="--ar 9:16 --v 6.0 --style raw">📱 TikTok / Reel Format (--ar 9:16)</option>
                  <option value="--ar 16:9 --v 6.0 --stylize 250">🖥️ Widescreen / Youtube Format (--ar 16:9)</option>
                  <option value="--ar 4:5">📸 Instagram Portait Format (--ar 4:5)</option>
                  <option value="--ar 1:1 --chaos 10">⬜ Standard Square Format (--ar 1:1)</option>
                </select>
              </div>

              <div className="bg-zinc-950/70 border border-zinc-800 rounded-xl p-4 space-y-3.5">
                <span className="text-[10px] font-mono font-semibold text-zinc-300 uppercase block tracking-wider">
                  Live Global Modifier Preview:
                </span>
                <div className="bg-zinc-950 rounded-lg p-2.5 border border-purple-950/40 text-[11px] font-mono text-pink-400 leading-normal select-all relative group break-words p-3.5 pr-10">
                  <span className="text-zinc-500">
                    {promptStylePreset ? `${promptStylePreset}, ` : "Original prompt content..."}
                  </span>
                  <span className="text-amber-300">
                    {" [Specific Scene Description Text] "}
                  </span>
                  <span className="text-pink-400">
                    {promptArSuffix ? ` ${promptArSuffix}` : ""}
                  </span>

                  <button
                    onClick={() => copyToClipboard(
                      `${promptStylePreset ? `${promptStylePreset}, ` : ""}[Specific Scene Description Text]${promptArSuffix ? ` ${promptArSuffix}` : ""}`,
                      'modifier-preview'
                    )}
                    className="absolute right-2 top-2 p-1 text-zinc-500 hover:text-white transition-colors"
                    title="Copy template modifier string"
                  >
                    {copiedIndex === 'modifier-preview' ? (
                      <Check className="w-3.5 h-3.5 text-green-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CHARACTER DATABASE */}
        {activeTab === 'characters' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#d4af37] font-display uppercase tracking-wider">
              4. Character Roster ({characters.length})
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-mono">
              The Cast of Rasoi Nagar vegetable characters:
            </p>

            <div className="space-y-3.5">
              {characters.map((char) => (
                <div 
                  key={char.name}
                  className="bg-zinc-950 hover:bg-zinc-855 rounded-xl p-3 border border-zinc-850 flex items-start gap-3 transition-colors"
                >
                  <div className="text-2xl p-1 bg-zinc-900 rounded-lg border border-zinc-800 flex-shrink-0">
                    {char.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-zinc-100 font-display flex items-center gap-1.5 leading-none">
                      {char.name}
                    </h4>
                    <p className="text-[11px] text-zinc-450 mt-1">
                      {char.role}
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-950/20 text-amber-400 border border-amber-500/10 font-medium">
                        Cinematic Pixar
                      </span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 font-medium">
                        9:16 Aspect
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sidebar Footer with download stats */}
      <div className="bg-zinc-950 p-4 border-t border-zinc-855 text-center text-[10px] text-zinc-500 font-mono">
        Compiled: {metadata.version} • {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
      </div>
    </aside>
  );
}
