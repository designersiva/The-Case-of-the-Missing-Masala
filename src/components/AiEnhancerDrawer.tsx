import React, { useState } from 'react';
import { Sparkles, Brain, Code, AlertTriangle, Key, ArrowRight, Check, Play, RefreshCcw } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface AiEnhancerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onEnhanceCurrentScenePrompt: (enhancedPrompt: string) => void;
  currentPrompt: string;
}

export default function AiEnhancerDrawer({
  isOpen,
  onClose,
  onEnhanceCurrentScenePrompt,
  currentPrompt
}: AiEnhancerDrawerProps) {
  const [apiKey, setApiKey] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedPreview, setEnhancedPreview] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [activePreset, setActivePreset] = useState<'standard' | 'cinematic' | 'anime' | 'clay'>('cinematic');

  if (!isOpen) return null;

  const handleOfflineEnhance = () => {
    setIsEnhancing(true);
    setErrorMessage('');
    
    // Simulate smart local camera styling expansion
    setTimeout(() => {
      let suffix = '';
      switch (activePreset) {
        case 'cinematic':
          suffix = "Shot on ARRI Alexa LF, anamorphic lenses, high-contrast chiaroscuro lighting, moody foggy atmospheric haze, cinematic grading, volumetric raytracing, 8k resolution, ultra-detailed physical surfaces, cinematic masterpiece composition, photorealistic volumetric depth --ar 16:9 --style raw";
          break;
        case 'anime':
          suffix = "Makoto Shinkai style, magical sunset cloudscapes, radiant ambient watercolor wash, hyper-detailed background elements, glittering morning sun flare particles, breathtaking anime key visual composition";
          break;
        case 'clay':
          suffix = "Beautiful claymation puppet textures, miniature studio softbox lighting setup, physical fingerprint details on putty characters, stop-motion physical model framing, retro film grain, Aardman classic look";
          break;
        default:
          suffix = "Pixar 3D CGI rendering, gorgeous cinematic studio lighting setup, rich vibrant primary vegetable colors, high-impact slow motion, depth of field blur, highly polished matte textures";
      }

      const enhanced = `${currentPrompt.replace(/--ar.*|--style.*/g, '').trim()} | ${suffix}`;
      setEnhancedPreview(enhanced);
      setIsEnhancing(false);
    }, 700);
  };

  const handleLiveGeminiEnhance = async () => {
    const keyToUse = apiKey || (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
    if (!keyToUse) {
      setErrorMessage('Please provide a Gemini API Key to run live AI model optimization.');
      return;
    }

    setIsEnhancing(true);
    setErrorMessage('');

    try {
      const ai = new GoogleGenAI({ apiKey: keyToUse });
      const promptText = `
        You are a seasoned Hollywood director and professional Midjourney Prompt Engineer.
        Expand this base scene description into a highly evocative, visually stunning cinematic image prompt.
        Specify: camera angle, exact lens type (e.g., 35mm, anamorphic), specific light setups (e.g., golden sidelight, godrays, dramatic shadows), and mood presets.
        Keep the character attributes (e.g. Potato cop, tomato guy, onion uncle in dhoti, chili Madame) consistent with the plot.
        
        BASE PROMPT: "${currentPrompt}"
        PRESET VIBE: "${activePreset}"

        Return ONLY the final expanded prompt. Do not include introductory text, explanations, or quotes.
      `;

      // Use a fast model for real-time creativity helper
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: promptText
      });

      if (response && response.text) {
        setEnhancedPreview(response.text.trim());
      } else {
        throw new Error('Emply response received from Google Gemini Model API.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Failed connecting to Gemini API. Check your developer token and try again.');
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleApplyEnhancement = () => {
    if (enhancedPreview) {
      onEnhanceCurrentScenePrompt(enhancedPreview);
      setEnhancedPreview('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full md:w-96 bg-zinc-950 border-l border-zinc-850 shadow-2xl flex flex-col text-zinc-100">
      
      {/* Drawer header */}
      <div className="p-5 bg-zinc-900 border-b border-zinc-850 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-400 shrink-0" />
          <div>
            <h3 className="text-sm font-bold font-display text-white">Gemini AI Prompt Studio</h3>
            <p className="text-[10px] text-zinc-400 font-mono">Enhance & Expand Cinematography</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-xs text-zinc-500 hover:text-white transition-colors cursor-pointer"
        >
          Close [×]
        </button>
      </div>

      {/* Body scroll wrap */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        
        {/* Style Preset Selector */}
        <div className="space-y-2">
          <label className="block text-[10px] font-mono text-zinc-400 uppercase font-semibold">
            Choose Stylization Track
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['cinematic', 'anime', 'clay', 'standard'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setActivePreset(p)}
                className={`py-2 px-3 rounded-lg text-xs font-semibold capitalize text-center border cursor-pointer transition-all duration-150 ${
                  activePreset === p
                    ? 'bg-purple-900/40 text-purple-300 border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.15)]'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                {p} Lens Preset
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Key Setting */}
        <div className="space-y-3 p-4 bg-zinc-900/60 rounded-xl border border-zinc-850">
          <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider font-display">
            <Key className="w-3.5 h-3.5 text-amber-500" />
            <span>Connect your Gemini API Key</span>
          </div>
          <p className="text-[10px] text-zinc-400 leading-normal">
            To generate smart custom expanded scenes based on Google's model, input a key. Otherwise, use our preloaded offline visual cinematic compilers!
          </p>

          <div className="space-y-2">
            <input
              type="password"
              placeholder="Paste GEMINI_API_KEY..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-purple-500"
            />
            {errorMessage && (
              <div className="text-[10px] text-red-400 font-mono leading-normal bg-red-950/20 p-2 rounded border border-red-900/20">
                ⚠️ {errorMessage}
              </div>
            )}
          </div>
        </div>

        {/* Active Prompt to optimize */}
        <div className="space-y-2">
          <label className="block text-[11px] font-mono text-zinc-550 uppercase">
            Active Scene Script Prompt
          </label>
          <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-850 text-xs italic text-zinc-450 leading-relaxed max-h-32 overflow-y-auto">
            "{currentPrompt}"
          </div>
        </div>

        {/* Action Triggers */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleOfflineEnhance}
            disabled={isEnhancing}
            className="flex-1 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-750 border border-zinc-750 text-zinc-200 text-xs font-semibold cursor-pointer text-center"
          >
            {isEnhancing ? 'Styling...' : 'Local Stylize'}
          </button>

          <button
            onClick={handleLiveGeminiEnhance}
            disabled={isEnhancing}
            className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 font-bold text-xs cursor-pointer text-center flex items-center justify-center gap-1.5 shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask Gemini AI</span>
          </button>
        </div>

        {/* AI Output preview card */}
        {enhancedPreview && (
          <div className="space-y-3.5 p-4.5 bg-purple-950/20 border border-purple-500/20 rounded-xl animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-purple-300">EXPANDED CINEMATIC OUTPUT:</span>
              <span className="text-[9px] font-mono bg-purple-500/10 text-pink-400 px-2 rounded">MJ-ENG v6</span>
            </div>
            
            <p className="text-xs text-zinc-100 italic leading-relaxed bg-zinc-950/60 p-3 rounded border border-purple-900/30 font-sans">
              {enhancedPreview}
            </p>

            <button
              onClick={handleApplyEnhancement}
              className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-black font-bold text-xs rounded-lg transition-colors cursor-pointer text-center flex items-center justify-center gap-1"
            >
              <Check className="w-4 h-4 text-black stroke-[3]" />
              <span>Apply to Scene Prompt</span>
            </button>
          </div>
        )}
      </div>

      <div className="bg-zinc-950 p-4 border-t border-zinc-850 text-center text-[10px] text-purple-500/80 font-mono">
        Models supported: Gemini-2.5-flash / Gemini-2.5-pro
      </div>
    </div>
  );
}
