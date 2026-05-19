import React, { useState } from 'react';
import { 
  Plus, Trash2, MapPin, Clock, Film, Save, RefreshCw, 
  ArrowUp, ArrowDown, ChevronRight, MessageSquare, ChevronDown, Check, Sparkles 
} from 'lucide-react';
import { Scene, DialogueLine } from '../types';

interface SceneEditorProps {
  scenes: Scene[];
  selectedSceneId: string;
  onSelectScene: (id: string) => void;
  onUpdateScene: (scene: Scene) => void;
  onAddScene: () => void;
  onDeleteScene: (id: string) => void;
  onDuplicateScene: (scene: Scene) => void;
  onFormatGeminiPrompt?: (sceneId: string) => void;
}

export default function SceneEditor({
  scenes,
  selectedSceneId,
  onSelectScene,
  onUpdateScene,
  onAddScene,
  onDeleteScene,
  onDuplicateScene,
  onFormatGeminiPrompt
}: SceneEditorProps) {
  const currentScene = scenes.find(s => s.id === selectedSceneId) || scenes[0];
  const [copiedScene, setCopiedScene] = useState<string | null>(null);

  const handleFieldChange = (key: keyof Scene, value: any) => {
    if (!currentScene) return;
    onUpdateScene({
      ...currentScene,
      [key]: value
    });
  };

  // Dialogues updates
  const handleDialogueChange = (dialogueId: string, field: keyof DialogueLine, value: string) => {
    if (!currentScene) return;
    const updatedDialogue = currentScene.dialogue.map(line => {
      if (line.id === dialogueId) {
        return { ...line, [field]: value };
      }
      return line;
    });
    handleFieldChange('dialogue', updatedDialogue);
  };

  const addDialogueLine = () => {
    if (!currentScene) return;
    const newLine: DialogueLine = {
      id: Math.random().toString(36).substring(2, 9),
      character: 'CHARACTER',
      text: 'Write dialogue here...',
      translation: 'Click to translate or add subtitle translation here...'
    };
    handleFieldChange('dialogue', [...currentScene.dialogue, newLine]);
  };

  const removeDialogueLine = (id: string) => {
    if (!currentScene) return;
    const filtered = currentScene.dialogue.filter(line => line.id !== id);
    handleFieldChange('dialogue', filtered);
  };

  const moveDialogueLine = (index: number, direction: 'up' | 'down') => {
    if (!currentScene) return;
    const list = [...currentScene.dialogue];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;
    
    // Swap
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;
    
    handleFieldChange('dialogue', list);
  };

  return (
    <div className="bg-zinc-950 border-r border-zinc-900 w-full lg:w-[460px] flex-shrink-0 flex flex-col h-full text-zinc-200">
      {/* Selector dropdown header */}
      <div className="p-4 bg-zinc-900 border-b border-zinc-850 flex items-center justify-between gap-2">
        <div className="flex-1 min-w-0">
          <label className="block text-[9px] font-mono uppercase text-zinc-500 font-semibold mb-1">
            Now Editing
          </label>
          <div className="relative">
            <select
              value={selectedSceneId}
              onChange={(e) => onSelectScene(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs font-bold font-display text-amber-400 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              {scenes.map((s) => (
                <option key={s.id} value={s.id} className="text-white">
                  Scene {s.sceneNumber}: {s.title.substring(0, 32)}{s.title.length > 32 ? '...' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={onAddScene}
          className="p-2 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-amber-400 rounded-lg border border-zinc-700 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer self-end"
          title="Add a new Scene"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>

      {/* Editor Main Scroller */}
      {currentScene ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Metadata Block */}
          <div className="bg-zinc-900/60 p-4.5 rounded-xl border border-zinc-850 space-y-3.5">
            <div className="flex items-center justify-between border-b border-zinc-850 pb-2">
              <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5 text-amber-500" /> Scene Metadata
              </span>
              <span className="text-xs font-mono text-zinc-550">
                #{currentScene.sceneNumber} OF {scenes.length}
              </span>
            </div>

            <div className="grid grid-cols-6 gap-3">
              <div className="col-span-4">
                <label className="block text-[9px] font-mono text-zinc-500 uppercase font-bold mb-1">Scene Title</label>
                <input
                  type="text"
                  value={currentScene.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  className="w-full bg-zinc-950 text-white rounded-lg border border-zinc-800 px-2.5 py-1 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-[9px] font-mono text-zinc-500 uppercase font-bold mb-1">Duration</label>
                <input
                  type="text"
                  value={currentScene.estimatedDuration || ''}
                  onChange={(e) => handleFieldChange('estimatedDuration', e.target.value)}
                  placeholder="e.g. 0:45"
                  className="w-full bg-zinc-950 text-white rounded-lg border border-zinc-800 px-2.5 py-1 text-xs text-center focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[9px] font-mono text-zinc-500 uppercase font-bold mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-red-400" /> Location
                </label>
                <input
                  type="text"
                  value={currentScene.location}
                  onChange={(e) => handleFieldChange('location', e.target.value)}
                  placeholder="INT. KITCHEN"
                  className="w-full bg-zinc-950 text-white rounded-lg border border-zinc-800 px-2.5 py-1 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[9px] font-mono text-zinc-500 uppercase font-bold mb-1 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-blue-400" /> Time of Day
                </label>
                <input
                  type="text"
                  value={currentScene.timeOfDay}
                  onChange={(e) => handleFieldChange('timeOfDay', e.target.value)}
                  placeholder="SUNSET"
                  className="w-full bg-zinc-950 text-white rounded-lg border border-zinc-800 px-2.5 py-1 text-xs focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Action Prompt Block */}
          <div className="bg-zinc-900/60 p-4.5 rounded-xl border border-zinc-850 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" /> Midjourney Action Prompt
              </span>
              
              {onFormatGeminiPrompt && (
                <button
                  onClick={() => onFormatGeminiPrompt(currentScene.id)}
                  className="text-[10px] font-mono font-bold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-0.5"
                  title="Optimize with Gemini AI"
                >
                  <RefreshCw className="w-3 h-3 animate-spin-slow" /> AI Enhance
                </button>
              )}
            </div>

            <textarea
              rows={4}
              value={currentScene.actionPrompt}
              onChange={(e) => handleFieldChange('actionPrompt', e.target.value)}
              placeholder="Describe the 16:9 or 9:16 cinematic visuals for AI image models..."
              className="w-full bg-zinc-950 text-zinc-150 rounded-lg border border-zinc-800 p-2.5 text-xs focus:outline-none focus:border-amber-500 leading-relaxed font-sans"
            />
          </div>

          {/* Dialogues List */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-amber-500" /> Scene Dialogues & Subs ({currentScene.dialogue.length})
              </span>
              <button
                onClick={addDialogueLine}
                className="text-[10px] font-mono font-semibold text-amber-400 hover:underline flex items-center gap-0.5"
              >
                <Plus className="w-3.5 h-3.5" /> Dialogue Line
              </button>
            </div>

            <div className="space-y-3">
              {currentScene.dialogue.map((line, idx) => (
                <div 
                  key={line.id} 
                  className="bg-zinc-900/40 rounded-xl p-3 border border-zinc-850/70 hover:border-zinc-800/80 transition-all duration-150 space-y-2 relative group"
                >
                  {/* Dialogue controls */}
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={line.character}
                      onChange={(e) => handleDialogueChange(line.id, 'character', e.target.value)}
                      className="bg-zinc-950 text-amber-400 font-bold font-display px-2 py-0.5 rounded border border-zinc-800 text-[10px] uppercase w-32 focus:outline-none focus:border-amber-500"
                    />
                    
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => moveDialogueLine(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white disabled:opacity-20 transition-colors"
                        title="Move draft dialogue up"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => moveDialogueLine(idx, 'down')}
                        disabled={idx === currentScene.dialogue.length - 1}
                        className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white disabled:opacity-20 transition-colors"
                        title="Move draft dialogue down"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeDialogueLine(line.id)}
                        className="p-1 hover:bg-red-950/40 rounded text-zinc-550 hover:text-red-400 transition-colors"
                        title="Delete dialogue line"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Speech input */}
                  <div className="space-y-1.5 pt-0.5">
                    <input
                      type="text"
                      value={line.text}
                      onChange={(e) => handleDialogueChange(line.id, 'text', e.target.value)}
                      placeholder="Line text..."
                      className="w-full bg-zinc-950 text-white rounded border border-zinc-850 px-2 py-1 text-xs focus:outline-none focus:border-zinc-700"
                    />

                    <input
                      type="text"
                      value={line.translation || ''}
                      onChange={(e) => handleDialogueChange(line.id, 'translation', e.target.value)}
                      placeholder="English translation / subtitles..."
                      className="w-full bg-zinc-950 text-zinc-400 italic rounded border border-zinc-850 px-2 py-1 text-[11px] focus:outline-none focus:border-zinc-700 font-sans"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom panel actions for the Scene itself */}
          <div className="flex items-center justify-between border-t border-zinc-900 pt-4 gap-2">
            <button
              onClick={() => onDuplicateScene(currentScene)}
              className="flex-1 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold border border-zinc-800 transition-colors cursor-pointer text-center"
            >
              Duplicate Scene
            </button>
            <button
              onClick={() => onDeleteScene(currentScene.id)}
              disabled={scenes.length <= 1}
              className="flex-1 py-2 rounded-lg bg-red-950/10 hover:bg-red-950/20 text-red-400 disabled:opacity-30 disabled:hover:bg-transparent disabled:text-zinc-600 border border-red-900/20 disabled:border-zinc-800 text-xs font-semibold transition-colors cursor-pointer text-center"
            >
              Delete Scene
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-zinc-500">
          <Film className="w-12 h-12 text-zinc-700 mb-2 animate-bounce-slow" />
          <p className="text-sm">Select or add a scene to start designing.</p>
        </div>
      )}
    </div>
  );
}
