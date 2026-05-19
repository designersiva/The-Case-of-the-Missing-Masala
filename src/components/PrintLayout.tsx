import React, { useState } from 'react';
import { Scene, ScriptMetadata, PdfOptions } from '../types';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Download, Printer, FileText, Check, CornerUpLeft, Loader2 } from 'lucide-react';

interface PrintLayoutProps {
  scenes: Scene[];
  metadata: ScriptMetadata;
  pdfOptions: PdfOptions;
  selectedTemplate: string;
  onClose: () => void;
  promptStylePreset: string;
  promptArSuffix: string;
}

export default function PrintLayout({
  scenes,
  metadata,
  pdfOptions,
  selectedTemplate,
  onClose,
  promptStylePreset,
  promptArSuffix
}: PrintLayoutProps) {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfProgress, setPdfProgress] = useState('');

  const handleTriggerPrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    const element = document.getElementById('printable-paper-block');
    if (!element) return;
    
    setIsGeneratingPdf(true);
    setPdfProgress('Capturing high-resolution print vectors...');
    
    try {
      // Configure canvas with premium options and oklch color sanitizer
      const canvas = await html2canvas(element, {
        scale: 2, // ultra HD output
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1024, // lock width for beautiful layout symmetry
        onclone: (clonedDoc) => {
          // Remove or cleanse any oklch color styles inside the cloned elements to prevent parser issues
          const clonedElement = clonedDoc.getElementById('printable-paper-block');
          if (clonedElement) {
            const win = clonedDoc.defaultView || window;
            
            const traverseAndCleanOklch = (el: HTMLElement) => {
              const properties = [
                'color', 
                'backgroundColor', 
                'borderColor', 
                'borderTopColor', 
                'borderBottomColor', 
                'borderLeftColor', 
                'borderRightColor',
                'boxShadow',
                'textShadow',
                'fill',
                'stroke'
              ];
              
              const computedStyle = win.getComputedStyle(el);
              
              properties.forEach(prop => {
                try {
                  // @ts-ignore
                  const val = computedStyle[prop];
                  if (val && typeof val === 'string' && val.includes('oklch')) {
                    let fallback = 'rgb(120, 120, 120)';
                    
                    if (prop === 'backgroundColor') {
                      if (el.id === 'printable-paper-block') {
                        fallback = '#ffffff';
                      } else if (el.classList.contains('bg-zinc-50')) {
                        fallback = '#f4f4f5';
                      } else if (el.classList.contains('bg-neutral-50')) {
                        fallback = '#fafafa';
                      } else if (el.classList.contains('bg-zinc-100')) {
                        fallback = '#f4f4f5';
                      } else if (el.classList.contains('bg-zinc-950') || el.classList.contains('bg-black')) {
                        fallback = '#09090b';
                      } else {
                        fallback = '#f4f4f5';
                      }
                    } else if (prop.toLowerCase().includes('border')) {
                      fallback = '#e4e4e7';
                    } else if (prop === 'color') {
                      if (el.classList.contains('text-zinc-900')) {
                        fallback = '#18181b';
                      } else if (el.classList.contains('text-zinc-650') || el.classList.contains('text-zinc-600') || el.classList.contains('text-zinc-550')) {
                        fallback = '#52525b';
                      } else if (el.classList.contains('text-zinc-400')) {
                        fallback = '#a1a1aa';
                      } else if (el.classList.contains('text-[#d4af37]') || el.classList.contains('text-amber-300')) {
                        fallback = '#d4af37';
                      } else {
                        fallback = '#18181b';
                      }
                    } else if (prop === 'boxShadow') {
                      fallback = 'none';
                    }
                    
                    // Convert camelCase prop to kebab-case for CSS setProperty
                    const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                    el.style.setProperty(cssProp, fallback, 'important');
                  }
                } catch (e) {
                  // Catch style write-failures
                }
              });
              
              Array.from(el.children).forEach(child => {
                traverseAndCleanOklch(child as HTMLElement);
              });
            };
            
            traverseAndCleanOklch(clonedElement as HTMLElement);
          }
        }
      });
      
      setPdfProgress('Compiling pages into standard PDF vectors...');
      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      
      // Calculate ideal vertical page breaks (A4 size format)
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // 210mm A4 width
      const pageHeight = 297; // 297mm A4 height
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pageHeight;
      }
      
      setPdfProgress('Initiating file download...');
      pdf.save(`${metadata.title.toLowerCase().replace(/\s+/g, '_')}_89studio.pdf`);
    } catch (err: any) {
      console.error('PDF error:', err);
      alert('Local browser security policy may have restricted vector rendering. Try the Standalone Print HTML fallback or Open Print Dialog!');
    } finally {
      setIsGeneratingPdf(false);
      setPdfProgress('');
    }
  };

  const getFullPrompt = (rawPrompt: string) => {
    let result = rawPrompt;
    if (promptStylePreset) {
      result = `${promptStylePreset}, ${result}`;
    }
    if (promptArSuffix) {
      result = `${result} ${promptArSuffix}`;
    }
    return result;
  };

  const renderContentForExport = () => {
    if (selectedTemplate === 'screenplay') {
      return `
        <div class="space-y-10 pt-10 font-script text-xs leading-relaxed text-zinc-900">
          ${pdfOptions.headerText ? `
            <div class="text-[10px] text-zinc-400 font-mono tracking-wider border-b border-zinc-150 pb-2 mb-8 uppercase flex justify-between">
              <span>${pdfOptions.headerText}</span>
              ${pdfOptions.showPageNumbers ? `<span>Page 1</span>` : ''}
            </div>
          ` : ''}

          ${scenes.map((scene) => `
            <div class="space-y-6 break-inside-avoid px-2 pt-4">
              <!-- Scene Location Heading -->
              <div class="font-bold uppercase border-b-2 border-zinc-250 pb-1 text-sm tracking-widest flex items-center justify-between">
                <span>
                  ${pdfOptions.showSceneNumbers ? `SCENE ${scene.sceneNumber} — ` : ''}
                  ${scene.location} - ${scene.timeOfDay}
                </span>
                <span class="text-xs font-normal text-zinc-500 font-mono italic">
                  (${scene.estimatedDuration || '0:45'})
                </span>
              </div>

              <p class="italic font-sans text-zinc-650 text-xs pl-2 border-l-2 border-zinc-300">
                Scene Title: ${scene.title}
              </p>

              <div class="bg-zinc-50 p-4 border border-zinc-200 rounded-lg text-xs font-sans leading-relaxed space-y-1.5 shadow-sm">
                <span class="text-[9px] font-mono text-zinc-500 font-bold uppercase block tracking-wider">
                  🎬 AI Production Art Composition:
                </span>
                <p class="italic text-zinc-800 text-[11px]">
                  ${getFullPrompt(scene.actionPrompt).replace(/"/g, '&quot;')}
                </p>
              </div>

              <!-- Dialogues Centered -->
              <div class="space-y-4 max-w-lg mx-auto pl-10 md:pl-20">
                ${scene.dialogue.map((dl) => `
                  <div class="space-y-1 font-script">
                    <div class="text-center font-bold font-sans uppercase text-[10px] tracking-widest block text-zinc-700">
                      ${dl.character}
                    </div>
                    <div class="text-center italic px-3 text-[11px] leading-relaxed text-zinc-900 ${pdfOptions.isDoubleSpaced ? 'py-1' : ''}">
                      "${dl.text.replace(/"/g, '&quot;')}"
                    </div>
                    ${dl.translation ? `
                      <div class="text-center text-[9px] text-zinc-500 italic">
                        (${dl.translation.replace(/"/g, '&quot;')})
                      </div>
                    ` : ''}
                  </div>
                `).join('')}
              </div>

              <div class="h-4 print:break-after-page page-break-after-always"></div>
            </div>
          `).join('')}
        </div>
      `;
    } else if (selectedTemplate === 'storyboard') {
      return `
        <div class="grid grid-cols-2 gap-6 pt-10 font-sans text-xs">
          ${scenes.map((scene) => `
            <div class="border border-zinc-200 rounded-xl overflow-hidden flex flex-col break-inside-avoid bg-white">
              <div class="aspect-[16/9] bg-zinc-100 flex items-center justify-center border-b border-zinc-100 overflow-hidden" style="aspect-ratio: 16/9;">
                ${scene.image ? `<img src="${scene.image}" alt="${scene.title}" class="w-full h-full object-cover">` : `
                  <div class="text-center text-zinc-400 p-8">
                    <p class="text-[10px] font-mono uppercase font-bold text-zinc-400 mb-1">SCENE ${scene.sceneNumber} FRAME</p>
                    <p class="text-[9px] text-zinc-500">Aspect 9:16 Cinematic</p>
                  </div>
                `}
              </div>

              <div class="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div class="space-y-1">
                  <span class="text-[9px] font-mono text-zinc-500 uppercase font-semibold">SCENE ${scene.sceneNumber} • ${scene.location}</span>
                  <h4 class="font-bold text-zinc-900 text-xs">${scene.title}</h4>
                </div>

                <div class="p-2.5 bg-neutral-50 rounded italic text-[10px] text-zinc-600 border border-zinc-150 leading-relaxed font-mono">
                  ${getFullPrompt(scene.actionPrompt).replace(/"/g, '&quot;')}
                </div>

                ${scene.dialogue.length > 0 ? `
                  <div class="space-y-1 text-[9px] border-t border-zinc-100 pt-2 text-zinc-500 font-mono">
                    ${scene.dialogue.slice(0, 2).map((dl) => `
                      <div class="flex gap-1">
                        <strong class="text-zinc-800 uppercase shrink-0">${dl.character}:</strong>
                        <span>"${dl.text.substring(0, 48).replace(/"/g, '&quot;')}..."</span>
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } else if (selectedTemplate === 'prompt-pack') {
      return `
        <div class="space-y-8 pt-10 font-sans text-xs">
          <div class="bg-zinc-50 border border-zinc-200 p-4 rounded-xl">
            <h3 class="font-bold text-sm text-zinc-900 mb-1 uppercase tracking-wider">AI Storybook Scene Compilation</h3>
            <p class="text-zinc-500 text-xs">All ${scenes.length} scene action descriptions with custom camera lighting and style overrides.</p>
          </div>

          ${scenes.map((scene) => `
            <div class="border border-zinc-200 p-4.5 rounded-xl space-y-3 break-inside-avoid">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold font-mono text-zinc-800">SCENE #${scene.sceneNumber}: ${scene.title}</span>
                <span class="text-[10px] font-mono text-zinc-500 uppercase">${scene.location} • ${scene.timeOfDay}</span>
              </div>

              <div class="p-3 bg-zinc-950 text-amber-300 rounded border border-zinc-850 font-mono text-[11px] leading-relaxed break-words">
                ${getFullPrompt(scene.actionPrompt).replace(/"/g, '&quot;')}
              </div>

              ${scene.dialogue.length > 0 ? `
                <div class="text-[9px] text-zinc-500 font-mono space-y-1 leading-normal pl-2 border-l border-zinc-200">
                  <strong>TIMING SUBTITLE LINES:</strong>
                  ${scene.dialogue.map((dl) => `
                    <div>
                      <span>${dl.character}: ${dl.text.replace(/"/g, '&quot;')} (${dl.translation ? dl.translation.replace(/"/g, '&quot;') : 'English Sub'})</span>
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      `;
    } else {
      // compact layout
      return `
        <div class="max-w-4xl mx-auto space-y-6 pt-10">
          <div class="border border-zinc-200 rounded-xl overflow-hidden divide-y divide-zinc-200">
            <div class="p-4 bg-zinc-50 font-bold text-xs uppercase text-zinc-800">COMPACT EDIT PACK</div>
            ${scenes.map((scene) => `
              <div class="grid grid-cols-12 gap-5 p-4 break-inside-avoid bg-white">
                <div class="col-span-3 font-mono text-[11px]">
                  <span class="text-zinc-400"># SCENE ${scene.sceneNumber}</span>
                  <h5 class="font-bold text-zinc-900 uppercase truncate">${scene.title}</h5>
                  <p class="text-[9px] text-zinc-500 uppercase truncate">${scene.location}</p>
                </div>
                <div class="col-span-4 border-l border-zinc-100 pl-4 space-y-2">
                  ${scene.dialogue.slice(0, 3).map((dl) => `
                    <div class="text-[10px] leading-tight">
                      <strong class="text-zinc-700 uppercase block text-[9px]">${dl.character}</strong>
                      <p class="text-zinc-600 italic">"${dl.text.replace(/"/g, '&quot;')}"</p>
                    </div>
                  `).join('')}
                </div>
                <div class="col-span-5 bg-neutral-50 p-3 rounded-lg border border-zinc-150">
                  <span class="text-[8px] font-mono text-zinc-400 font-bold block uppercase mb-1">SHOT PROMPT:</span>
                  <p class="text-[10px] text-zinc-700 italic leading-relaxed">${getFullPrompt(scene.actionPrompt).replace(/"/g, '&quot;')}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  };

  const handleExportHtml = () => {
    const styledHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${metadata.title} | Premium Script & Storybook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@550;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            script: ['"Courier Prime"', 'monospace'],
            display: ['"Space Grotesk"', 'sans-serif'],
          }
        }
      }
    }
  </script>
  <style>
    body {
      font-family: 'Inter', sans-serif;
    }
    .font-script {
      font-family: 'Courier Prime', monospace;
    }
    .font-display {
      font-family: 'Space Grotesk', sans-serif;
    }
    @media print {
      body {
        background: white !important;
        color: black !important;
      }
      .print-hidden {
        display: none !important;
      }
      .page-break-after-always {
        page-break-after: always !important;
        break-after: page !important;
      }
      .break-inside-avoid {
        break-inside: avoid !important;
        page-break-inside: avoid !important;
      }
    }
  </style>
</head>
<body class="bg-[#050505] text-zinc-100 min-h-screen">
  
  <div class="print-hidden fixed top-0 left-0 right-0 bg-black/95 border-b border-[#d4af37]/25 p-4.5 flex justify-between items-center z-50 backdrop-blur-md shadow-lg">
    <div class="flex items-center gap-3">
      <div class="w-2.5 h-2.5 rounded-full bg-[#d4af37] animate-ping"></div>
      <div>
        <h1 class="text-xs font-mono font-black text-[#d4af37] tracking-widest uppercase">89Studio.in Pro Print Server</h1>
        <p class="text-[10px] text-zinc-400">Offline printable compiled file beats any iframe browser blockage! Press CMD+P / Ctrl+P anytime.</p>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <button onclick="window.print()" class="px-5 py-2.5 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#b59228] font-black text-xs text-black rounded-lg shadow-lg hover:scale-102 active:scale-98 transition-all duration-150 cursor-pointer">
        ⚡ Launch Print / Save as Vector PDF
      </button>
    </div>
  </div>

  <div class="pt-24 px-4 pb-16 max-w-4xl mx-auto print:p-0 print:max-w-none">
    <div class="bg-white text-black p-8 md:p-16 rounded-xl shadow-[0_0_50px_rgba(212,175,55,0.08)] print:shadow-none print:p-0 print:rounded-none">
      
      <!-- Cover Page -->
      <div class="min-h-[29.7cm] flex flex-col justify-between py-24 px-10 border-b border-zinc-100 print:border-none print:pb-0 print:min-h-0 print:h-[26cm] print:break-after-page page-break-after-always">
        <div></div>
        
        <div class="text-center space-y-4">
          <h1 class="text-4xl font-bold font-script uppercase tracking-wide text-zinc-900 leading-tight">
            ${metadata.title}
          </h1>
          <p class="text-sm text-zinc-650 tracking-wide">
            ${metadata.subtitle}
          </p>
        </div>

        <div class="space-y-6 text-center text-xs font-script text-zinc-600">
          <p class="tracking-widest uppercase text-[10px] text-zinc-400">By</p>
          <p class="text-sm text-zinc-900 font-bold uppercase">${metadata.author}</p>
          <p class="opacity-75">${metadata.date} • Version ${metadata.version}</p>
        </div>

        <div class="text-[10px] font-mono text-zinc-500 space-y-1 block max-w-xs mx-auto border-t border-zinc-100 pt-6">
          <p class="font-bold text-zinc-800 uppercase">Production & Creative Office:</p>
          <p>Email: ${metadata.email}</p>
          ${metadata.phone ? `<p>Phone: ${metadata.phone}</p>` : ''}
          <p class="mt-2.5 text-[9px] text-[#aa7c11]">${metadata.copyright}</p>
        </div>
      </div>

      <!-- Content -->
      ${renderContentForExport()}

      <div class="mt-16 pt-8 border-t border-zinc-200 text-center text-[10px] text-zinc-400 font-mono">
        ${metadata.title} Compiled Booklet • ${pdfOptions.footerText || metadata.copyright}
      </div>

    </div>
  </div>

</body>
</html>`;

    const blob = new Blob([styledHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${metadata.title.toLowerCase().replace(/\s+/g, '_')}_printable_89studio.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900 text-white flex flex-col overflow-hidden print:p-0 print:absolute print:inset-auto print:w-full print:bg-white print:text-black">
      
      {/* Top Header Controls (hidden in print) */}
      <div className="px-6 py-4 bg-zinc-950 border-b border-[#d4af37]/25 flex flex-col md:flex-row md:items-center md:justify-between gap-4 print:hidden">
        <div>
          <h2 className="text-sm font-black font-display text-[#edd06c] tracking-widest uppercase flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37] animate-pulse"></span>
            89Studio.in Pro PDF Compiler
          </h2>
          <p className="text-[11px] text-zinc-400 leading-normal max-w-xl">
            {isGeneratingPdf ? (
              <span className="text-amber-400 font-bold animate-pulse flex items-center gap-1.5 font-mono">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                {pdfProgress || 'Analyzing vectors...'}
              </span>
            ) : (
              <span>Generate and export high-fidelity vector PDF matching your custom black and gold themes natively.</span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-end md:self-auto shrink-0">
          <button
            onClick={onClose}
            disabled={isGeneratingPdf}
            className="px-4 py-2 bg-zinc-850 hover:bg-zinc-800 disabled:opacity-50 text-zinc-300 rounded-lg text-xs font-bold cursor-pointer transition-colors border border-zinc-800 flex items-center gap-1.5"
          >
            <CornerUpLeft className="w-3.5 h-3.5" />
            Go Back
          </button>
          
          <button
            onClick={handleExportHtml}
            disabled={isGeneratingPdf}
            className="px-4 py-2 bg-black border border-zinc-800 hover:border-[#d4af37]/30 text-zinc-400 hover:text-white font-semibold text-xs rounded-lg shadow-md cursor-pointer transition-all flex items-center gap-1.5"
            title="Saves standalone page that allows infinite printing bypassing web sandbox boundaries"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Save HTML Booklet</span>
          </button>

          <button
            onClick={handleTriggerPrint}
            disabled={isGeneratingPdf}
            className="px-4 py-2 bg-zinc-900 border border-[#d4af37]/20 hover:border-[#d4af37]/40 text-[#d4af37] font-bold text-xs rounded-lg cursor-pointer transition-transform flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Command
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="px-5 py-2.5 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#b59228] disabled:from-zinc-700 disabled:to-zinc-800 disabled:text-zinc-500 hover:opacity-90 active:scale-95 text-black font-black text-xs rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.3)] cursor-pointer transition-transform flex items-center gap-1.5"
          >
            {isGeneratingPdf ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Compiling...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>EXPORT PDF DIRECTLY</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main scrolling scroll-wrap */}
      <div className="flex-1 overflow-y-auto bg-zinc-950 p-6 md:p-12 print:p-0 print:bg-white print:text-black font-script">
        
        {/* Printable Paper Block representing standard Letter / A4 width */}
        <div id="printable-paper-block" className="max-w-4xl mx-auto bg-white text-black p-8 md:p-16 rounded-xl shadow-2xl print:shadow-none print:p-0 print:m-0 print:max-w-none print:rounded-none">
          
          {/* Cover Page */}
          <div className="min-h-[29.7cm] flex flex-col justify-between py-24 px-10 border-b border-zinc-100 print:border-none print:pb-0 print:min-h-0 print:h-[26cm] print:break-after-page page-break-after-always">
            <div />
            
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold font-script uppercase tracking-wide text-zinc-900 leading-tight">
                {metadata.title}
              </h1>
              <p className="text-sm text-zinc-600 font-sans tracking-wide">
                {metadata.subtitle}
              </p>
            </div>

            <div className="space-y-6 text-center text-xs font-script text-zinc-650">
              <p>By</p>
              <p className="text-sm text-zinc-900 font-bold uppercase">{metadata.author}</p>
              <p className="opacity-75">{metadata.date} • Version {metadata.version}</p>
            </div>

            <div className="text-[10px] font-mono text-zinc-550 space-y-1 block max-w-xs mx-auto border-t border-zinc-100 pt-6">
              <p className="font-bold text-zinc-700 uppercase">Contact Information:</p>
              <p>Email: {metadata.email}</p>
              {metadata.phone && <p>Phone: {metadata.phone}</p>}
              <p className="mt-2.5 text-[9px] text-zinc-400">{metadata.copyright}</p>
            </div>
          </div>

          {/* ==================================== */}
          {/* PRINT VIEW: SCREENPLAY STANDARD */}
          {/* ==================================== */}
          {selectedTemplate === 'screenplay' && (
            <div className="space-y-10 pt-10 font-script text-xs leading-relaxed text-zinc-900">
              
              {/* Optional custom running header */}
              {pdfOptions.headerText && (
                <div className="text-[10px] text-zinc-400 font-mono tracking-wider border-b border-zinc-150 pb-2 mb-8 uppercase select-none flex justify-between">
                  <span>{pdfOptions.headerText}</span>
                  {pdfOptions.showPageNumbers && <span className="print-page-number">Page 1</span>}
                </div>
              )}

              {scenes.map((scene) => (
                <div key={scene.id} className="space-y-6 break-inside-avoid px-2 pt-4">
                  {/* Scene Location Heading */}
                  <div className="font-bold uppercase border-b-2 border-zinc-250 pb-1 text-sm tracking-widest flex items-center justify-between">
                    <span>
                      {pdfOptions.showSceneNumbers && `SCENE ${scene.sceneNumber} — `}
                      {scene.location} - {scene.timeOfDay}
                    </span>
                    <span className="text-xs font-normal text-zinc-500 font-mono italic">
                      ({scene.estimatedDuration || '0:45'})
                    </span>
                  </div>

                  <p className="italic font-sans text-zinc-600 text-xs pl-2 border-l-2 border-zinc-300">
                    Scene Title: {scene.title}
                  </p>

                  {/* Midjourney prompting card embedded right inside script */}
                  <div className="bg-zinc-50 p-4 border border-zinc-200 rounded-lg text-xs font-sans leading-relaxed space-y-1.5 shadow-sm">
                    <span className="text-[9px] font-mono text-zinc-500 font-bold uppercase block tracking-wider">
                      🎬 AI Production Art Composition:
                    </span>
                    <p className="italic text-zinc-800 text-[11px]">
                      {getFullPrompt(scene.actionPrompt)}
                    </p>
                  </div>

                  {/* Dialogues centered */}
                  <div className="space-y-4 max-w-md mx-auto pl-10 md:pl-20">
                    {scene.dialogue.map((dl) => (
                      <div key={dl.id} className="space-y-1 font-script">
                        <div className="text-center font-bold font-sans uppercase text-[10px] tracking-widest block text-zinc-700">
                          {dl.character}
                        </div>
                        <div className={`text-center italic px-3 text-[11px] leading-relaxed text-zinc-900 ${pdfOptions.isDoubleSpaced ? 'py-1' : ''}`}>
                          "{dl.text}"
                        </div>
                        {dl.translation && (
                          <div className="text-center text-[9px] text-zinc-500 italic">
                            ({dl.translation})
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Scene footer gap spacing / page breaking trick */}
                  <div className="h-4 print:break-after-page page-break-after-always" />
                </div>
              ))}
            </div>
          )}

          {/* ==================================== */}
          {/* PRINT VIEW: STORYBOARD */}
          {/* ==================================== */}
          {selectedTemplate === 'storyboard' && (
            <div className="grid grid-cols-2 gap-6 pt-10 font-sans text-xs">
              {scenes.map((scene) => (
                <div key={scene.id} className="border border-zinc-200 rounded-xl overflow-hidden flex flex-col break-inside-avoid bg-white">
                  
                  {/* Mock placeholder canvas frame */}
                  <div className="aspect-[16/9] bg-zinc-100 flex items-center justify-center border-b border-zinc-100">
                    {scene.image ? (
                      <img src={scene.image} alt={scene.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="text-center text-zinc-400 p-4">
                        <p className="text-[10px] font-mono uppercase font-bold text-zinc-400 mb-1">SCENE {scene.sceneNumber} FRAME</p>
                        <p className="text-[9px] text-zinc-500">Aspect 9:16 Cinematic</p>
                      </div>
                    )}
                  </div>

                  {/* Script Details */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase font-semibold">SCENE {scene.sceneNumber} • {scene.location}</span>
                      <h4 className="font-bold text-zinc-900 text-xs font-display">{scene.title}</h4>
                    </div>

                    <div className="p-2.5 bg-neutral-50 rounded italic text-[10px] text-zinc-600 border border-zinc-150 leading-relaxed font-mono">
                      {getFullPrompt(scene.actionPrompt)}
                    </div>

                    {scene.dialogue.length > 0 && (
                      <div className="space-y-1 text-[9px] border-t border-zinc-100 pt-2 text-zinc-500 font-mono">
                        {scene.dialogue.slice(0, 2).map((dl, i) => (
                          <div key={i} className="flex gap-1">
                            <strong className="text-zinc-800 uppercase shrink-0">{dl.character}:</strong>
                            <span>"{dl.text.substring(0, 48)}..."</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ==================================== */}
          {/* PRINT VIEW: PROMPT PACK */}
          {/* ==================================== */}
          {selectedTemplate === 'prompt-pack' && (
            <div className="space-y-8 pt-10 font-sans text-xs">
              <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl">
                <h3 className="font-bold text-sm font-display text-zinc-900 mb-1 uppercase tracking-wider">AI Storybook Scene Compilation</h3>
                <p className="text-zinc-500 text-xs">All 16 scene action descriptions with custom camera lighting and style overrides.</p>
              </div>

              {scenes.map((scene) => (
                <div key={scene.id} className="border border-zinc-200 p-4.5 rounded-xl space-y-3 break-inside-avoid">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-zinc-800">SCENE #{scene.sceneNumber}: {scene.title}</span>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">{scene.location} • {scene.timeOfDay}</span>
                  </div>

                  <div className="p-3 bg-zinc-950 text-amber-300 rounded border border-zinc-850 font-mono text-[11px] leading-relaxed break-words select-all">
                    {getFullPrompt(scene.actionPrompt)}
                  </div>

                  {scene.dialogue.length > 0 && (
                    <div className="text-[9px] text-zinc-500 font-mono space-y-1 leading-normal pl-2 border-l border-zinc-200">
                      <strong>TIMING SUBTITLE LINES:</strong>
                      {scene.dialogue.map((dl, i) => (
                        <div key={i}>
                          <span>{dl.character}: {dl.text} ({dl.translation || 'English Sub'})</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Footer of the entire booklet */}
          <div className="mt-16 pt-8 border-t border-zinc-150 text-center text-[10px] text-zinc-400 font-mono">
            {metadata.title} Booklet • {pdfOptions.footerText || metadata.copyright}
          </div>

        </div>
      </div>
    </div>
  );
}
