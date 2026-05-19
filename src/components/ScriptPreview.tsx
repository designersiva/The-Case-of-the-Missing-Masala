import React, { useState } from 'react';
import { 
  Copy, Check, Image as ImageIcon, Film, BookOpen, AlertCircle, 
  ExternalLink, Sparkles, Code, Play, Download, Trash, User, Eye, Sparkle
} from 'lucide-react';
import { Scene, ScriptMetadata, PdfOptions, CreatorTheme } from '../types';
import { themePalettes } from './ThemeStyles';

interface ScriptPreviewProps {
  scenes: Scene[];
  metadata: ScriptMetadata;
  pdfOptions: PdfOptions;
  selectedTemplate: string;
  activeSceneId: string;
  onSelectScene: (id: string) => void;
  promptStylePreset: string;
  promptArSuffix: string;
  onUpdateSceneImage: (sceneId: string, url: string) => void;
}

export default function ScriptPreview({
  scenes,
  metadata,
  pdfOptions,
  selectedTemplate,
  activeSceneId,
  onSelectScene,
  promptStylePreset,
  promptArSuffix,
  onUpdateSceneImage
}: ScriptPreviewProps) {
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [copiedScriptTextId, setCopiedScriptTextId] = useState<string | null>(null);

  const colors = themePalettes[pdfOptions.selectedTheme] || themePalettes.default;

  const fontClass = () => {
    switch (pdfOptions.selectedTheme) {
      case 'vintage-paper': return 'font-script';
      case 'cinematic-dark': return 'font-sans';
      case 'creator-neon': return 'font-mono text-zinc-300';
      default: return 'font-sans';
    }
  };

  const getFullPrompt = (rawPrompt: string) => {
    let result = rawPrompt;
    if (promptStylePreset) {
      // Prepend the cinematic style
      result = `${promptStylePreset}, ${result}`;
    }
    if (promptArSuffix) {
      // Append Midjourney parameters
      result = `${result} ${promptArSuffix}`;
    }
    return result;
  };

  const handleCopyPrompt = (sceneId: string, text: string) => {
    navigator.clipboard.writeText(getFullPrompt(text));
    setCopiedPromptId(sceneId);
    setTimeout(() => setCopiedPromptId(null), 1500);
  };

  // Pre-configured character avatar indicators
  const getAvatarFallback = (characterName: string) => {
    const name = characterName.toLowerCase();
    if (name.includes('aloo') || name.includes('potato')) return { emoji: '🥔', bg: 'from-amber-500/20 to-yellow-600/10 border-amber-500/35 text-amber-300' };
    if (name.includes('tamatar') || name.includes('tomato')) return { emoji: '🍅', bg: 'from-red-500/20 to-orange-600/10 border-red-500/35 text-red-300' };
    if (name.includes('mirchi') || name.includes('chili') || name.includes('chili')) return { emoji: '🌶️', bg: 'from-rose-500/20 to-red-600/10 border-rose-500/35 text-rose-300' };
    if (name.includes('dhaniya') || name.includes('coriander')) return { emoji: '🌿', bg: 'from-emerald-500/20 to-teal-600/10 border-emerald-500/35 text-emerald-300' };
    if (name.includes('pyaaz') || name.includes('onion')) return { emoji: '🧅', bg: 'from-purple-500/20 to-fuchsia-600/10 border-purple-500/35 text-purple-300' };
    if (name.includes('google') || name.includes('ai') || name.includes('chef')) return { emoji: '🤖', bg: 'from-indigo-500/20 to-blue-600/10 border-indigo-500/35 text-indigo-300' };
    return { emoji: '🎭', bg: 'from-zinc-500/20 to-zinc-650/10 border-zinc-750 text-zinc-300' };
  };

  return (
    <div className={`flex-1 flex flex-col h-full overflow-hidden ${colors.bg} ${colors.text} transition-all duration-300`}>
      {/* Script Deck Header bar */}
      <div className={`px-6 py-3 border-b ${colors.border} flex items-center justify-between bg-white/5 backdrop-blur-sm sticky top-0 z-10`}>
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider">
            Live Reader Canvas ({pdfOptions.selectedTheme.replace('-', ' ')})
          </span>
        </div>
        
        <div className="text-[11px] font-mono text-zinc-500 font-medium">
          {scenes.length} Scenes • {scenes.reduce((acc, s) => {
            const lines = s.estimatedDuration?.split(':') || ['0'];
            return acc + (parseInt(lines[0]) * 60) + (parseInt(lines[1] || '0'));
          }, 0)}s Est. Length
        </div>
      </div>

      {/* Main Preview Container scroller */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 selection:bg-amber-500 selection:text-black">
        
        {/* ========================================================== */}
        {/* TEMPLATE: SCREENPLAY STANDARD */}
        {/* ========================================================== */}
        {selectedTemplate === 'screenplay' && (
          <div className="max-w-2xl mx-auto space-y-12">
            
            {/* Title Page (industry spec style) */}
            <div className="text-center py-16 px-4 border-b border-zinc-200/5 min-h-[500px] flex flex-col justify-between select-none">
              <div />
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold font-script tracking-tight text-white uppercase block">
                  {metadata.title}
                </h1>
                <p className="text-sm font-sans text-zinc-400 capitalize italic leading-relaxed max-w-md mx-auto">
                  {metadata.subtitle}
                </p>
              </div>
              
              <div className="space-y-6 text-xs font-script text-zinc-400">
                <div className="h-0.5 w-12 bg-amber-500/40 mx-auto" />
                <p>By</p>
                <p className="text-sm text-white font-bold">{metadata.author}</p>
                <p className="opacity-70">{metadata.date} • Version {metadata.version}</p>
              </div>

              <div className="text-[10px] font-mono text-zinc-500 space-y-1 text-left max-w-xs mx-auto pt-6">
                <p className="font-semibold uppercase text-zinc-400">Distributor Contact:</p>
                <p>Email: {metadata.email}</p>
                {metadata.phone && <p>Phone: {metadata.phone}</p>}
                <p className="mt-2.5 text-[9px] opacity-75">{metadata.copyright}</p>
              </div>
            </div>

            {/* Script Pages */}
            <div className={`space-y-12 font-script ${fontClass()} pl-4 md:pl-10 text-xs text-zinc-200 leading-normal`}>
              {scenes.map((scene) => (
                <div 
                  key={scene.id} 
                  id={`screenplay-scene-${scene.sceneNumber}`}
                  onClick={() => onSelectScene(scene.id)}
                  className={`group relative p-6 rounded-xl transition-all duration-200 cursor-pointer ${
                    activeSceneId === scene.id 
                      ? 'bg-amber-500/10 ring-1 ring-amber-500/30' 
                      : 'hover:bg-zinc-900/40'
                  }`}
                >
                  {/* Scene Header */}
                  <div className="flex items-center gap-2 mb-4 text-amber-400 font-bold uppercase tracking-wider text-sm select-none border-b border-zinc-800/60 pb-1.5">
                    {pdfOptions.showSceneNumbers && <span className="text-zinc-550 mr-1 font-mono">SCENE {scene.sceneNumber} —</span>}
                    <span>{scene.location} - {scene.timeOfDay}</span>
                  </div>

                  {/* Character Name and Title of Scene */}
                  <div className="mb-4 italic text-zinc-450 text-[11px]">
                    Scene Title: {scene.title}
                  </div>

                  {/* Visual Scene Prompt Card Block embedded */}
                  <div className="bg-zinc-900/80 border border-zinc-850 rounded-lg p-3.5 mb-5 space-y-2 text-sans font-sans select-none">
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                      <span className="flex items-center gap-1.5 font-bold"><Film className="w-3.5 h-3.5 text-zinc-500" /> Action Prompt for AI generation:</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyPrompt(scene.id, scene.actionPrompt);
                        }}
                        className="text-amber-400 hover:underline flex items-center gap-1 transition-colors cursor-pointer"
                        title="Copy Midjourney Prompt"
                      >
                        {copiedPromptId === scene.id ? (
                          <>
                            <Check className="w-3 h-3 text-green-400" />
                            <span className="text-green-400 font-bold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Prompt</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-zinc-300 italic tracking-wide leading-relaxed pl-1.5 border-l-2 border-amber-500/25">
                      {getFullPrompt(scene.actionPrompt)}
                    </p>
                  </div>

                  {/* Dialogues */}
                  <div className="space-y-4 max-w-lg mx-auto pl-6 sm:pl-16">
                    {scene.dialogue.map((dial) => {
                      const avatar = getAvatarFallback(dial.character);
                      return (
                        <div key={dial.id} className="text-zinc-150 space-y-1 font-mono text-xs">
                          {/* Character heading name */}
                          <div className="text-center font-bold text-amber-400/90 uppercase text-[10px] tracking-widest block py-0.5">
                            {dial.character}
                          </div>
                          
                          {/* Dialogue quote text */}
                          <div className={`px-6 text-center leading-relaxed text-zinc-100 italic ${pdfOptions.isDoubleSpaced ? 'py-1' : ''}`}>
                            "{dial.text}"
                          </div>

                          {/* Translations if any */}
                          {dial.translation && (
                            <div className="text-center text-[10px] text-zinc-500 italic block">
                              ({dial.translation})
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TEMPLATE: STORYBOARD DECK */}
        {/* ========================================================== */}
        {selectedTemplate === 'storyboard' && (
          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {scenes.map((scene) => {
                const isSelected = activeSceneId === scene.id;
                return (
                  <div
                    key={scene.id}
                    onClick={() => onSelectScene(scene.id)}
                    className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col ${
                      isSelected 
                        ? 'bg-zinc-900 border-amber-500 ring-4 ring-amber-500/10' 
                        : 'bg-zinc-900/60 hover:bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {/* Visual Placeholders drawing stylized cinematic backdrops */}
                    <div className="relative aspect-[16/9] bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 overflow-hidden group flex items-center justify-center border-b border-zinc-850">
                      {/* Stylized background graphics based on character involvement! */}
                      <div className="absolute inset-0 opacity-15 mix-blend-color-dodge flex flex-wrap gap-2 p-1">
                        {scene.dialogue.map((dl, i) => (
                          <span key={i} className="text-2xl select-none">{getAvatarFallback(dl.character).emoji}</span>
                        ))}
                      </div>

                      {/* Cover Image paste panel */}
                      {scene.image ? (
                        <img 
                          src={scene.image} 
                          alt={scene.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="text-center p-6 space-y-2 select-none">
                          <ImageIcon className="w-8 h-8 text-zinc-700 mx-auto stroke-[1.5] group-hover:text-amber-500 transition-colors" />
                          <p className="text-[10px] font-mono text-zinc-500">
                            Scene {scene.sceneNumber} • Aspect 9:16
                          </p>
                          
                          {/* Manual backdrop url entry */}
                          <div className="pt-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                            <input
                              type="text"
                              placeholder="Paste picture URL..."
                              onClick={(e) => e.stopPropagation()}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  onUpdateSceneImage(scene.id, (e.target as HTMLInputElement).value);
                                  (e.target as HTMLInputElement).value = '';
                                }
                              }}
                              className="bg-zinc-950 text-white rounded text-[9px] px-2 py-1 border border-zinc-850 w-32 focus:outline-none"
                            />
                          </div>
                        </div>
                      )}

                      {/* Overlays top badge */}
                      <div className="absolute left-3 top-3 px-2 py-0.5 rounded bg-black/75 border border-zinc-800 text-[9px] font-mono text-amber-400 font-bold backdrop-blur-sm shadow-md">
                        SCENE {scene.sceneNumber}
                      </div>

                      <div className="absolute right-3 top-3 px-2 py-0.5 rounded bg-black/75 border border-zinc-800 text-[9px] font-mono text-zinc-400 backdrop-blur-sm">
                        {scene.estimatedDuration || '0:45'}s
                      </div>
                    </div>

                    {/* Metadata body */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-1.5">
                        <div className="text-[10px] uppercase font-mono text-zinc-400 font-bold tracking-tight">
                          {scene.location} • {scene.timeOfDay}
                        </div>
                        <h4 className="font-bold text-sm text-white font-display">
                          {scene.title}
                        </h4>
                      </div>

                      {/* Prompt Block */}
                      <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-850 text-xs text-zinc-300 leading-relaxed font-sans relative group/p select-none">
                        <p className="line-clamp-2 italic pr-6 text-[11px]">
                          {getFullPrompt(scene.actionPrompt)}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyPrompt(scene.id, scene.actionPrompt);
                          }}
                          className="absolute right-2 top-2 p-1 rounded bg-zinc-900/60 border border-zinc-800 hover:text-white text-zinc-550 transition-colors group-hover/p:opacity-100 opacity-0 cursor-pointer"
                          title="Copy Full Action Prompt"
                        >
                          {copiedPromptId === scene.id ? (
                            <Check className="w-3.5 h-3.5 text-green-400 font-bold animate-pulse-slow" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Dialogue Highlights snippet */}
                      {scene.dialogue.length > 0 && (
                        <div className="border-t border-zinc-850 pt-3 space-y-1.5 font-mono text-[10px] text-zinc-400">
                          {scene.dialogue.slice(0, 2).map((dl, i) => (
                            <div key={i} className="flex gap-1">
                              <span className="text-amber-400 font-bold uppercase shrink-0">{dl.character}:</span>
                              <span className="truncate italic">"{dl.text}"</span>
                            </div>
                          ))}
                          {scene.dialogue.length > 2 && (
                            <div className="text-[9px] text-zinc-500 font-medium">
                              + {scene.dialogue.length - 2} more dialogues
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TEMPLATE: PROMPT PACK DETAILS */}
        {/* ========================================================== */}
        {selectedTemplate === 'prompt-pack' && (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="bg-purple-950/15 border border-purple-900/40 p-5 rounded-2xl flex items-start gap-4">
              <Sparkles className="w-6 h-6 text-pink-400 shrink-0 mt-0.5 animate-pulse-slow" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold font-display text-white uppercase tracking-wider">
                  Complete Creator AI Prompt Compilation
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Optimized for Midjourney v6, Stable Diffusion XL, and DALL-E 3. Copy prompts directly with style modifer overlays. All 16 aspect-ratio synchronized storyboard frames.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {scenes.map((scene) => (
                <div 
                  key={scene.id}
                  onClick={() => onSelectScene(scene.id)}
                  className={`bg-zinc-900/40 rounded-2xl p-5 border transition-all duration-200 cursor-pointer flex flex-col md:flex-row gap-5 ${
                    activeSceneId === scene.id 
                      ? 'border-amber-500 bg-zinc-900' 
                      : 'border-zinc-850 hover:border-zinc-800'
                  }`}
                >
                  {/* Scene indexing number */}
                  <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-850 flex items-center justify-center shrink-0 self-start text-xs font-mono font-bold text-amber-400 shadow-inner">
                    #{scene.sceneNumber}
                  </div>

                  <div className="flex-1 space-y-3.5">
                    <div>
                      <h4 className="text-sm font-bold font-display text-white">
                        Scene {scene.sceneNumber}: {scene.title}
                      </h4>
                      <p className="text-[10px] font-mono text-zinc-500 mt-0.5">
                        {scene.location} • {scene.timeOfDay}
                      </p>
                    </div>

                    {/* Copy Box Container */}
                    <div className="bg-zinc-950 rounded-xl border border-zinc-850 p-4 space-y-3 relative group select-all">
                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 font-bold">
                        <span>FULL AI IMAGE PROMPT STYLE:</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyPrompt(scene.id, scene.actionPrompt);
                          }}
                          className="text-pink-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          {copiedPromptId === scene.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-green-400 font-bold" />
                              <span className="text-green-400 font-bold">PROMPT COPIED!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>COPY CORE IMAGE PROMPT</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-xs text-zinc-200 italic font-mono leading-relaxed bg-zinc-900/40 p-2.5 rounded border border-zinc-850/40 pr-10">
                        {getFullPrompt(scene.actionPrompt)}
                      </p>
                    </div>

                    {/* Quick subtitles timings snippet */}
                    <div className="mt-2.5 space-y-1.5 bg-zinc-950/40 px-3 py-2 rounded-lg border border-zinc-850/30 text-[10px] font-mono text-zinc-400">
                      <span className="text-[9px] font-bold uppercase text-zinc-550 block mb-1">Timing Dialogues Info:</span>
                      {scene.dialogue.map((dl, i) => (
                        <div key={i} className="flex gap-1">
                          <span className="text-amber-500 font-medium lowercase shrink-0">{dl.character}:</span>
                          <span className="italic">"{dl.text}"</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TEMPLATE: COMPACT DUAL-COLUMN */}
        {/* ========================================================== */}
        {selectedTemplate === 'compact' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden divide-y divide-zinc-850">
              
              {/* Header inside compact */}
              <div className="p-4 bg-zinc-950 font-display flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-0.5">{metadata.title}</h3>
                  <p className="text-[11px] text-zinc-500">{metadata.subtitle}</p>
                </div>
                <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/10 px-2.5 py-1 rounded font-bold">
                  COMPACT SCREEN EDIT
                </span>
              </div>

              {/* Rows */}
              {scenes.map((scene) => (
                <div 
                  key={scene.id}
                  onClick={() => onSelectScene(scene.id)}
                  className={`grid grid-cols-1 md:grid-cols-12 gap-5 p-4.5 cursor-pointer transition-colors ${
                    activeSceneId === scene.id
                      ? 'bg-amber-500/5'
                      : 'hover:bg-zinc-900/20'
                  }`}
                >
                  {/* Left Scene identification */}
                  <div className="md:col-span-3 space-y-1 font-mono">
                    <span className="text-xs text-zinc-500">## SCENE {scene.sceneNumber}</span>
                    <h5 className="text-xs font-bold text-white font-display uppercase truncate">{scene.title}</h5>
                    <p className="text-[9px] text-zinc-450 uppercase truncate">{scene.location}</p>
                  </div>

                  {/* Middle: dialogues text block */}
                  <div className="md:col-span-4 space-y-2.5 pl-0 md:pl-2 border-l border-zinc-850">
                    {scene.dialogue.slice(0, 3).map((dl, i) => (
                      <div key={i} className="text-[10px] leading-normal font-sans">
                        <strong className="text-amber-400 font-display block uppercase text-[9px] tracking-wide mb-0.5">{dl.character}</strong>
                        <p className="text-zinc-300 italic">"{dl.text}"</p>
                      </div>
                    ))}
                    {scene.dialogue.length > 3 && (
                      <em className="text-[9px] text-zinc-500 block font-mono font-medium">+ {scene.dialogue.length - 3} additional dialogues</em>
                    )}
                  </div>

                  {/* Right: prompt pack clip */}
                  <div className="md:col-span-5 bg-zinc-950/70 rounded-xl border border-zinc-850/80 p-3 flex flex-col justify-between space-y-2 select-all relative group">
                    <div className="flex items-center justify-between text-[8px] font-mono text-zinc-500 font-semibold mb-1">
                      <span>ANIMATED SHOT DESIGN PROMPT:</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyPrompt(scene.id, scene.actionPrompt);
                        }}
                        className="text-pink-400 font-bold hover:underline cursor-pointer"
                      >
                        {copiedPromptId === scene.id ? 'COPIED!' : 'COPY'}
                      </button>
                    </div>
                    <p className="text-[10px] text-zinc-350 italic line-clamp-3 leading-relaxed">
                      {getFullPrompt(scene.actionPrompt)}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
