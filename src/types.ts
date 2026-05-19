export interface DialogueLine {
  id: string;
  character: string;
  text: string;
  translation?: string;
}

export interface Scene {
  id: string;
  sceneNumber: number;
  title: string;
  location: string;
  timeOfDay: string;
  dialogue: DialogueLine[];
  actionPrompt: string;
  image?: string;
  estimatedDuration?: string; // e.g. "0:45"
}

export interface ScriptMetadata {
  title: string;
  subtitle: string;
  author: string;
  email: string;
  phone?: string;
  version: string;
  date: string;
  copyright: string;
}

export type PdfTemplate = 'screenplay' | 'storyboard' | 'prompt-pack' | 'compact';

export type CreatorTheme = 'default' | 'cinematic-dark' | 'creator-neon' | 'eco-green' | 'vintage-paper';

export interface PdfOptions {
  margin: 'normal' | 'compact' | 'none';
  isDoubleSpaced: boolean;
  showPageNumbers: boolean;
  showSceneNumbers: boolean;
  headerText?: string;
  footerText?: string;
  selectedTheme: CreatorTheme;
  customLogoUrl?: string;
}
