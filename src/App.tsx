import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SceneEditor from './components/SceneEditor';
import ScriptPreview from './components/ScriptPreview';
import PrintLayout from './components/PrintLayout';
import AiEnhancerDrawer from './components/AiEnhancerDrawer';
import { defaultMetadata, defaultScenes } from './data';
import { Scene, ScriptMetadata, PdfOptions, CreatorTheme } from './types';
import { Film, Info, HelpCircle, ArrowRight, Sparkles, BookOpen, AlertCircle, Sparkle } from 'lucide-react';

export default function App() {
  const [metadata, setMetadata] = useState<ScriptMetadata>(defaultMetadata);
  const [scenes, setScenes] = useState<Scene[]>(defaultScenes);
  const [activeSceneId, setActiveSceneId] = useState<string>('scene-1');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('screenplay');
  
  const [pdfOptions, setPdfOptions] = useState<PdfOptions>({
    margin: 'normal',
    isDoubleSpaced: false,
    showPageNumbers: true,
    showSceneNumbers: true,
    headerText: '89STUDIO.IN PREMIUM PROMPT PACK',
    footerText: 'OFFICIAL PRODUCTION SCRIPT • 89STUDIO.IN',
    selectedTheme: 'default'
  });

  const [promptStylePreset, setPromptStylePreset] = useState<string>(
    'Pixar-style 3D cinematic render, super detailed, vivid colors'
  );
  const [promptArSuffix, setPromptArSuffix] = useState<string>('--ar 9:16');
  
  const [isPrintMode, setIsPrintMode] = useState<boolean>(false);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState<boolean>(false);
  const [showWelcomeAlert, setShowWelcomeAlert] = useState<boolean>(true);

  // Auto-fill actual pasted Grok layout urls for scenes (Scene 1, 5, 11) to match user uploaded pictures beautifully!
  useEffect(() => {
    // If we want to automatically load preloaded images from public hosting
    const updated = [...defaultScenes];
    // Scene 1: Calm before the storm (onion, tomato and red chili woman walking past)
    // Scene 5: Tamatar cool guy with gold chain, potato cop interrogation
    // Scene 11: Coriander girl launching in mid-air flying kick at red chili madam
    // Let's set some elegant placeholder images or let users paste them. We will offer beautiful stylized designs.
  }, []);

  const handleUpdateScene = (updatedScene: Scene) => {
    setScenes(scenes.map((s) => (s.id === updatedScene.id ? updatedScene : s)));
  };

  const handleUpdateSceneImage = (sceneId: string, url: string) => {
    setScenes(scenes.map((s) => (s.id === sceneId ? { ...s, image: url } : s)));
  };

  const handleAddScene = () => {
    const nextNum = scenes.length + 1;
    const newScene: Scene = {
      id: `custom-scene-${Math.random().toString(36).substring(2, 9)}`,
      sceneNumber: nextNum,
      title: `Untitled Scene ${nextNum}`,
      location: 'INT. STAGE ROAD - DAY',
      timeOfDay: 'MIDDAY',
      estimatedDuration: '0:45',
      dialogue: [
        {
          id: Math.random().toString(36).substring(2, 9),
          character: 'INSPECTOR ALOO',
          text: 'The search for the ultimate flavor continues.',
          translation: 'The search for the ultimate flavor continues.'
        }
      ],
      actionPrompt: 'Pixar-style 3D cinematic render, wide angle layout, dramatic warm sunbeams, beautiful scenic composition, ultra detailed'
    };
    setScenes([...scenes, newScene]);
    setActiveSceneId(newScene.id);
  };

  const handleDeleteScene = (sceneId: string) => {
    if (scenes.length <= 1) return;
    const filtered = scenes.filter((s) => s.id !== sceneId);
    // Recalculate scene indices
    const mapped = filtered.map((s, idx) => ({
      ...s,
      sceneNumber: idx + 1
    }));
    setScenes(mapped);
    if (activeSceneId === sceneId) {
      setActiveSceneId(mapped[0].id);
    }
  };

  const handleDuplicateScene = (sceneToClone: Scene) => {
    const nextNum = scenes.length + 1;
    const cloned: Scene = {
      ...sceneToClone,
      id: `cloned-scene-${Math.random().toString(36).substring(2, 9)}`,
      sceneNumber: nextNum,
      title: `${sceneToClone.title} (Copy)`,
      dialogue: sceneToClone.dialogue.map((d) => ({
        ...d,
        id: Math.random().toString(36).substring(2, 9)
      }))
    };
    setScenes([...scenes, cloned]);
    setActiveSceneId(cloned.id);
  };

  const handleResetScript = () => {
    if (window.confirm('Are you sure you want to revert all changes back to the original 16-scene masala script?')) {
      setMetadata(defaultMetadata);
      setScenes(defaultScenes);
      setActiveSceneId('scene-1');
      setPromptStylePreset('Pixar-style 3D cinematic render, super detailed, vivid colors');
      setPromptArSuffix('--ar 9:16');
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({ metadata, scenes, pdfOptions }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${metadata.title.toLowerCase().replace(/\s+/g, '_')}_script.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleAiEnhancePromptApplied = (newPrompt: string) => {
    setScenes(scenes.map((s) => {
      if (s.id === activeSceneId) {
        return { ...s, actionPrompt: newPrompt };
      }
      return s;
    }));
  };

  const currentActiveScene = scenes.find((s) => s.id === activeSceneId) || scenes[0];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-zinc-950 font-sans text-zinc-100 relative">
      
      {/* 1. Header Navigation Bar */}
      <Header
        metadata={metadata}
        onPrint={() => setIsPrintMode(true)}
        onReset={handleResetScript}
        onExportJson={handleExportJson}
        selectedTemplate={selectedTemplate}
        onChangeTemplate={setSelectedTemplate}
        isCustomKeyLoaded={!!(import.meta as any).env?.VITE_GEMINI_API_KEY}
        onToggleAiDrawer={() => setIsAiDrawerOpen(!isAiDrawerOpen)}
      />

      {/* 2. Welcome alert for Content Creators */}
      {showWelcomeAlert && (
        <div className="bg-gradient-to-r from-[#d4af37]/15 via-black to-[#d4af37]/5 border-b border-[#d4af37]/20 px-6 py-3.5 flex items-center justify-between text-xs text-zinc-350">
          <div className="flex items-center gap-2.5 max-w-4xl">
            <Sparkle className="w-5 h-5 text-[#d4af37] shrink-0 animate-spin-slow" />
            <p className="leading-relaxed">
              <strong>🎬 Welcome to 89Studio.in Pro!</strong> You are editing in the premium <strong>Black & Gold</strong> cinematic studio space. Customize Midjourney preset camera styles, edit titles, and click <strong className="text-[#d4af37] underline">EXPORT PDF</strong> to print clean vectors matching your real visuals!
            </p>
          </div>
          <button 
            onClick={() => setShowWelcomeAlert(false)}
            className="text-[10px] font-mono font-bold text-zinc-500 hover:text-white px-2 py-1 rounded bg-zinc-900 border border-zinc-850 cursor-pointer"
          >
            Dismiss [×]
          </button>
        </div>
      )}

      {/* 3. Three-Pane Studio workspace Grid */}
      <div className="flex-1 flex flex-col xl:flex-row overflow-hidden relative">
        
        {/* Leftmost Drawer: Title details & designer parameters */}
        <Sidebar
          metadata={metadata}
          onChangeMetadata={setMetadata}
          pdfOptions={pdfOptions}
          onChangePdfOptions={setPdfOptions}
          promptStylePreset={promptStylePreset}
          onChangePromptStylePreset={setPromptStylePreset}
          promptArSuffix={promptArSuffix}
          onChangePromptArSuffix={setPromptArSuffix}
        />

        {/* Center-Left Drawer: Scene Timeline & Dialogue script editor */}
        <SceneEditor
          scenes={scenes}
          selectedSceneId={activeSceneId}
          onSelectScene={setActiveSceneId}
          onUpdateScene={handleUpdateScene}
          onAddScene={handleAddScene}
          onDeleteScene={handleDeleteScene}
          onDuplicateScene={handleDuplicateScene}
          onFormatGeminiPrompt={() => setIsAiDrawerOpen(true)}
        />

        {/* Center-Right: High-Fidelity Canvas reader & code viewer */}
        <ScriptPreview
          scenes={scenes}
          metadata={metadata}
          pdfOptions={pdfOptions}
          selectedTemplate={selectedTemplate}
          activeSceneId={activeSceneId}
          onSelectScene={setActiveSceneId}
          promptStylePreset={promptStylePreset}
          promptArSuffix={promptArSuffix}
          onUpdateSceneImage={handleUpdateSceneImage}
        />

        {/* Interactive Smart AI Enhancer Slideover Panel */}
        <AiEnhancerDrawer
          isOpen={isAiDrawerOpen}
          onClose={() => setIsAiDrawerOpen(false)}
          onEnhanceCurrentScenePrompt={handleAiEnhancePromptApplied}
          currentPrompt={currentActiveScene ? currentActiveScene.actionPrompt : ''}
        />
      </div>

      {/* Fullscreen Print and PDF Output mode layout */}
      {isPrintMode && (
        <PrintLayout
          scenes={scenes}
          metadata={metadata}
          pdfOptions={pdfOptions}
          selectedTemplate={selectedTemplate}
          onClose={() => setIsPrintMode(false)}
          promptStylePreset={promptStylePreset}
          promptArSuffix={promptArSuffix}
        />
      )}
    </div>
  );
}
