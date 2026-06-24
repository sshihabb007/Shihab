'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function AudioToText() {
  const [engine, setEngine] = useState('gemini');
  const [geminiKey, setGeminiKey] = useState('');
  const [groqKey, setGroqKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [statusText, setStatusText] = useState('Upload a file to start transcribing...');
  const [progressPercent, setProgressPercent] = useState(0);
  const [statusPanelVisible, setStatusPanelVisible] = useState(false);
  const [transcriptContent, setTranscriptContent] = useState('');
  const [copyVisible, setCopyVisible] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef(null);
  const workerRef = useRef(null);

  useEffect(() => {
    // Load Settings
    const savedEngine = localStorage.getItem('shihab_engine') || 'gemini';
    setEngine(savedEngine);
    setGeminiKey(localStorage.getItem('shihab_gemini_key') || '');
    setGroqKey(localStorage.getItem('shihab_groq_key') || '');

    // Initialize Web Worker
    workerRef.current = new Worker('/audio-to-text/mehedi_worker.js', { type: 'module' });

    workerRef.current.onmessage = (event) => {
      console.log('Worker message received:', event.data);
      const { 
        shihab_status_state, 
        mehedi_message_text, 
        sshihabb007_text_chunk, 
        shihab_progress_obj, 
        mehedi_final_output 
      } = event.data;

      if (shihab_status_state === 'progress') {
        updateProgressBar(shihab_progress_obj);
      } else if (shihab_status_state === 'partial') {
        setTranscriptContent((prev) => prev + ' ' + sshihabb007_text_chunk);
      } else if (shihab_status_state === 'complete') {
        setStatusText("Transcription Finished!");
        setCopyVisible(true);
        if (mehedi_final_output && mehedi_final_output.text && mehedi_final_output.text.trim().length > 0) {
          setTranscriptContent(mehedi_final_output.text);
        } else {
          setTranscriptContent('No speech detected, or Local AI failed to process. If using Local AI, try switching to Gemini 2.5 in Settings.');
        }
      } else if (shihab_status_state === 'loading') {
        setStatusText(mehedi_message_text || "Loading AI model...");
      } else if (shihab_status_state === 'processing') {
        setStatusText(mehedi_message_text || "Analyzing audio...");
      } else if (shihab_status_state === 'error') {
        setStatusText("Error analyzing audio!");
        setTranscriptContent(mehedi_message_text);
        console.error("Worker Error:", mehedi_message_text);
      }
    };

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  const updateProgressBar = (p) => {
    if (!p) return;
    if (p.status === 'initiate' || p.status === 'download') {
      setStatusText(`Downloading ${p.file || 'model files'}...`);
    } else if (p.status === 'progress') {
      setStatusText(`Downloading ${p.file || 'model files'}...`);
      setProgressPercent(Math.round(p.progress || 0));
    } else if (p.status === 'done') {
      setProgressPercent(100);
    } else if (p.status === 'ready') {
      setStatusText(`Model loaded! Preparing for transcription...`);
    } else if (p.status === 'transcribing') {
      setStatusText(`Transcribing audio...`);
      setProgressPercent(Math.round(p.progress || 0));
    }
  };

  const handleSaveSettings = () => {
    localStorage.setItem('shihab_engine', engine);
    localStorage.setItem('shihab_gemini_key', geminiKey);
    localStorage.setItem('shihab_groq_key', groqKey);
    setShowSettings(false);
  };

  const parseAudio = async (file) => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    const shihab_audioCtx = new AudioContextClass({ sampleRate: 16000 });
    const mehedi_arrayBuffer = await file.arrayBuffer();
    const sshihabb007_audioBuffer = await shihab_audioCtx.decodeAudioData(mehedi_arrayBuffer);
    return sshihabb007_audioBuffer.getChannelData(0);
  };

  const handleFile = async (file) => {
    setStatusPanelVisible(true);
    setTranscriptContent('');
    setProgressPercent(0);
    setCopyVisible(false);

    const selectedEngine = localStorage.getItem('shihab_engine') || 'local';

    if (selectedEngine === 'local') {
      try {
        setStatusText("Loading model...");
        const audioData = await parseAudio(file);
        if (workerRef.current) {
          workerRef.current.postMessage({ sshihabb007_audio: audioData });
        }
      } catch (err) {
        setStatusText("Error pre-processing audio!");
        setTranscriptContent(err.message);
      }
    } else if (selectedEngine === 'gemini') {
      processGemini(file);
    } else if (selectedEngine === 'groq') {
      processGroq(file);
    }
  };

  const processGroq = async (file) => {
    const currentGroqKey = localStorage.getItem('shihab_groq_key');
    if (!currentGroqKey) {
      setStatusText("Error: Groq API Key missing! Open Settings.");
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      setStatusText("Error: File too large for Groq (Max 25MB). Please use Gemini 1.5 Pro.");
      return;
    }

    setStatusText("Uploading to Groq Cloud...");
    setIsUploading(true);
    setProgressPercent(100);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("model", "whisper-large-v3-turbo");
    formData.append("response_format", "json");

    try {
      const response = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
        method: "POST",
        headers: { "Authorization": `Bearer ${currentGroqKey}` },
        body: formData
      });

      if (!response.ok) throw new Error(await response.text());

      const data = await response.json();
      setStatusText("Transcription Finished!");
      setIsUploading(false);
      setCopyVisible(true);
      setTranscriptContent(data.text || "No text found.");
    } catch (error) {
      setStatusText("Groq API Error!");
      setIsUploading(false);
      setTranscriptContent(error.message);
    }
  };

  const processGemini = async (file) => {
    const currentGeminiKey = localStorage.getItem('shihab_gemini_key');
    if (!currentGeminiKey) {
      setStatusText("Error: Gemini API Key missing! Open Settings.");
      return;
    }

    try {
      setStatusText("Initiating Google AI Studio Upload...");
      setIsUploading(true);
      setProgressPercent(30);

      const initResponse = await fetch(`https://generativelanguage.googleapis.com/upload/v1beta/files?key=${currentGeminiKey}`, {
        method: 'POST',
        headers: {
          'X-Goog-Upload-Protocol': 'resumable',
          'X-Goog-Upload-Command': 'start',
          'X-Goog-Upload-Header-Content-Length': file.size.toString(),
          'X-Goog-Upload-Header-Content-Type': file.type || 'audio/mp3',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ file: { display_name: file.name } })
      });

      if (!initResponse.ok) throw new Error(await initResponse.text());

      let uploadUrl = initResponse.headers.get('X-Goog-Upload-URL') || initResponse.headers.get('x-goog-upload-url');
      if (!uploadUrl) throw new Error("Failed to get upload URL from Google API headers");

      setStatusText("Uploading audio to Google AI Studio...");
      setProgressPercent(60);

      const uploadResponse = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'Content-Length': file.size.toString(),
          'X-Goog-Upload-Offset': '0',
          'X-Goog-Upload-Command': 'upload, finalize'
        },
        body: file
      });

      if (!uploadResponse.ok) throw new Error(await uploadResponse.text());

      const fileInfo = await uploadResponse.json();
      const fileUri = fileInfo.file.uri;

      setStatusText("Transcribing via Gemini 2.5 Flash-Lite...");
      setProgressPercent(90);

      const genResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${currentGeminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: "Transcribe this audio file perfectly. Output only the transcript text." },
              { fileData: { fileUri: fileUri, mimeType: fileInfo.file.mimeType || file.type || 'audio/mp3' } }
            ]
          }]
        })
      });

      if (!genResponse.ok) throw new Error(await genResponse.text());

      const genData = await genResponse.json();
      const transcript = genData.candidates?.[0]?.content?.parts?.[0]?.text || "No text generated.";

      setStatusText("Transcription Finished!");
      setProgressPercent(100);
      setIsUploading(false);
      setCopyVisible(true);
      setTranscriptContent(transcript);
    } catch (error) {
      setStatusText("Gemini API Error!");
      setIsUploading(false);
      setTranscriptContent(error.message);
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(transcriptContent).then(() => {
      setIsCopying(true);
      setTimeout(() => setIsCopying(false), 2000);
    });
  };

  return (
    <main className="w-full max-w-7xl mx-auto flex-grow flex items-center justify-center px-4 py-10">
      <div className="w-full">
        {/* Sub-header */}
        <div
          className="max-w-4xl mx-auto mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-6"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Scribe<span className="text-indigo-500">AI</span>
            </h1>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base" style={{ color: 'var(--text-muted)' }}>
              Private, browser-based transcription for long audio. By{' '}
              <span style={{ color: 'var(--primary-color)', fontWeight: 600 }}>MEHEDI HASAN SHIHAB</span>.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 w-full sm:w-auto">
            <button 
              onClick={() => setShowSettings(true)}
              className="p-2 sm:p-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors w-full sm:w-auto flex justify-center border border-zinc-700"
            >
              ⚙️ Settings
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Drop Zone */}
          <div 
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const dropped = e.dataTransfer.files[0];
              if (dropped) handleFile(dropped);
            }}
            className="border-2 border-dashed border-zinc-800 rounded-2xl p-6 md:p-12 text-center hover:border-indigo-500 transition-colors cursor-pointer group"
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={(e) => {
                const selected = e.target.files[0];
                if (selected) handleFile(selected);
              }}
              className="hidden" 
              accept="audio/*"
            />
            <div className="text-zinc-500 group-hover:text-zinc-300">
              <p className="text-lg">Drag & drop your audio file here</p>
              <p className="text-sm mt-1">Supports MP3, M4A, WAV (Max 2GB)</p>
            </div>
          </div>

          {/* Progress Indicator */}
          {statusPanelVisible && (
            <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-indigo-400">{statusText}</span>
                <span className="text-sm text-zinc-500">{progressPercent}%</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-1.5">
                <div 
                  className={`bg-indigo-500 h-1.5 rounded-full transition-all duration-300 ${isUploading ? 'animate-pulse' : ''}`}
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Transcript content */}
          <div className="bg-zinc-900 rounded-xl p-4 sm:p-8 min-h-[400px] border border-zinc-800 shadow-2xl relative">
            <div className="prose prose-invert max-w-none leading-relaxed text-zinc-300">
              {transcriptContent ? (
                transcriptContent
              ) : (
                <span className="text-zinc-600 italic">Upload a file to start transcribing...</span>
              )}
            </div>
            {copyVisible && (
              <button 
                onClick={handleCopyText}
                className="absolute top-4 right-4 p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
              >
                {isCopying ? 'Copied!' : 'Copy Text'}
              </button>
            )}
          </div>

          {/* Guidelines */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800/50">
              <h3 className="text-xl font-bold text-indigo-400 mb-4">⚡ How to Use</h3>
              <ol className="list-decimal list-inside space-y-2 text-zinc-400 text-sm">
                <li>Click <strong className="text-zinc-200">⚙️ Settings</strong> (top right) to configure your AI.</li>
                <li>Enter your <strong className="text-zinc-200">Google AI Studio</strong> or <strong className="text-zinc-200">Groq</strong> API Key.</li>
                <li>Select your preferred <strong className="text-zinc-200">Transcription Engine</strong>.</li>
                <li>Drag & Drop any audio file (MP3, WAV, M4A).</li>
                <li>Click <strong className="text-zinc-200">Copy Text</strong> when transcription finishes!</li>
              </ol>
            </div>

            <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800/50">
              <h3 className="text-xl font-bold text-indigo-400 mb-4">✨ Key Features</h3>
              <ul className="space-y-2 text-zinc-400 text-sm">
                <li>👉 <strong className="text-zinc-200">Gemini 2.5 Flash-Lite:</strong> Deep multimodal analysis for massive files.</li>
                <li>👉 <strong className="text-zinc-200">Groq Whisper V3:</strong> Lightning-fast hardware processing for smaller files.</li>
                <li>👉 <strong className="text-zinc-200">100% Private Local AI:</strong> Fallback to browser WebGPU engine.</li>
                <li>👉 <strong className="text-zinc-200">Live Progress:</strong> Real-time transfer and generation tracking.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 m-0">
          <div className="bg-zinc-900 rounded-xl p-5 sm:p-8 w-full max-w-md border border-zinc-700 m-4">
            <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Transcription Engine</label>
                <select 
                  value={engine}
                  onChange={(e) => setEngine(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg p-2 focus:border-indigo-500 outline-none"
                  style={{ color: 'var(--text-main)', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-color)' }}
                >
                  <option value="gemini">Google Gemini 1.5 Pro (Best for Songs/Huge Files)</option>
                  <option value="groq">Groq Whisper V3 (Fastest for &lt;25MB)</option>
                  <option value="local">Local Browser AI (Whisper Base)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Google AI Studio (Gemini) Key</label>
                <input 
                  type="password" 
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg p-2 focus:border-indigo-500 outline-none"
                  style={{ color: 'var(--text-main)', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-color)' }}
                  placeholder="AIzaSy..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Groq API Key</label>
                <input 
                  type="password" 
                  value={groqKey}
                  onChange={(e) => setGroqKey(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg p-2 focus:border-indigo-500 outline-none"
                  style={{ color: 'var(--text-main)', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-color)' }}
                  placeholder="gsk_..."
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-3">
              <button 
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveSettings}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
