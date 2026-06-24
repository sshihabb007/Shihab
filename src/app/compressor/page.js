'use client';

import React, { useState, useEffect, useRef } from 'react';
import Script from 'next/script';

export default function Compressor() {
  const [scriptsLoaded, setScriptsLoaded] = useState({
    wavesurfer: false,
    ffmpeg: false
  });

  const [files, setFiles] = useState([]);
  const [isAudio, setIsAudio] = useState(false);

  // Image Settings state
  const [outputFormat, setOutputFormat] = useState('jpeg');
  const [compressionQuality, setCompressionQuality] = useState(80);
  const [resizeLarge, setResizeLarge] = useState(false);

  // Image Preview state
  const [imagePreview, setImagePreview] = useState(null);

  // Audio state
  const [audioFormat, setAudioFormat] = useState('mp3');
  const [audioBitrate, setAudioBitrate] = useState('128k');
  const [audioQscale, setAudioQscale] = useState('');
  const [audioSampleRate, setAudioSampleRate] = useState('');
  const [audioChannels, setAudioChannels] = useState('');

  // Audio Trimming state
  const [trimStart, setTrimStart] = useState('00:00:00');
  const [trimEnd, setTrimEnd] = useState('00:00:00');
  const [showAudioModal, setShowAudioModal] = useState(false);

  // Conversion Progress
  const [isConverting, setIsConverting] = useState(false);
  const [statusText, setStatusText] = useState('Initializing Engine...');
  const [progressPercent, setProgressPercent] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [downloadFilename, setDownloadFilename] = useState('');

  const fileInputRef = useRef(null);
  const ffmpegRef = useRef(null);
  const wavesurferRef = useRef(null);
  const waveformContainerRef = useRef(null);

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // WebP support detection
  const [webpSupported, setWebpSupported] = useState(true);
  useEffect(() => {
    const canvas = document.createElement('canvas');
    if (canvas.getContext && canvas.getContext('2d')) {
      setWebpSupported(canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0);
    } else {
      setWebpSupported(false);
    }
  }, []);

  useEffect(() => {
    function loadScript(src, globalVarName) {
      return new Promise((resolve, reject) => {
        if (globalVarName && typeof window !== 'undefined' && window[globalVarName]) {
          resolve();
          return;
        }
        
        let script = document.querySelector(`script[src="${src}"]`);
        if (script) {
          if (script.dataset.loaded === 'true') {
            resolve();
          } else {
            script.addEventListener('load', () => {
              script.dataset.loaded = 'true';
              resolve();
            });
            script.addEventListener('error', () => reject(new Error(`Failed to load script: ${src}`)));
          }
          return;
        }

        script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.dataset.loaded = 'false';
        script.onload = () => {
          script.dataset.loaded = 'true';
          resolve();
        };
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.body.appendChild(script);
      });
    }

    async function loadAll() {
      try {
        await loadScript('https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.min.js', 'WaveSurfer');
        setScriptsLoaded(prev => ({ ...prev, wavesurfer: true }));

        await loadScript('https://unpkg.com/@ffmpeg/ffmpeg@0.11.6/dist/ffmpeg.min.js', 'FFmpeg');
        setScriptsLoaded(prev => ({ ...prev, ffmpeg: true }));
      } catch (e) {
        console.error('Failed to load compressor scripts:', e);
      }
    }

    loadAll();
  }, []);

  // Initialize FFmpeg when loaded
  useEffect(() => {
    if (!scriptsLoaded.ffmpeg) return;

    try {
      const { createFFmpeg } = window.FFmpeg;
      ffmpegRef.current = createFFmpeg({
        log: true,
        corePath: '/compressor/ffmpeg-core.js',
        progress: ({ ratio }) => {
          const pct = Math.round(ratio * 100);
          setProgressPercent(pct);
        }
      });

      ffmpegRef.current.load().then(() => {
        setStatusText('Engine Ready. Click Convert.');
        setProgressPercent(100);
      }).catch(err => {
        setStatusText('Engine failed: ' + (err.message || err));
        console.error(err);
      });
    } catch (e) {
      console.error('Error initializing FFmpeg:', e);
    }
  }, [scriptsLoaded.ffmpeg]);

  const handleFileChange = (e) => {
    if (!e.target.files || !e.target.files.length) return;
    const selectedFiles = Array.from(e.target.files);
    const first = selectedFiles[0];
    const isMedia = first.type.startsWith('audio/') || first.type.startsWith('video/') || /\.(m4a|ts|mkv|avi|flv|wmv)$/i.test(first.name);

    setDownloadUrl(null);
    setDownloadFilename('');

    if (isMedia) {
      setIsAudio(true);
      setFiles([first]);
      setStatusText('Media loaded. Click options to configure or click Convert Audio.');
      setProgressPercent(0);
    } else if (selectedFiles.every(f => f.type.startsWith('image/'))) {
      setIsAudio(false);
      setFiles(selectedFiles);
      processImages(selectedFiles, outputFormat, compressionQuality, resizeLarge);
    } else {
      alert('Please select only image files, or a single audio/video file.');
    }
  };

  const processImages = async (imageFiles, format, quality, resize) => {
    if (!imageFiles.length) return;

    const qualityVal = quality / 100;
    let totalOriginalSize = 0;
    let totalConvertedSize = 0;

    const processed = await Promise.all(imageFiles.map(file => {
      totalOriginalSize += file.size;
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (ev) => {
          const img = new Image();
          img.src = ev.target.result;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            let w = img.width;
            let h = img.height;

            if (resize && (w > 2000 || h > 2000)) {
              if (w > h) {
                h = (h / w) * 2000;
                w = 2000;
              } else {
                w = (w / h) * 2000;
                h = 2000;
              }
            }

            canvas.width = w;
            canvas.height = h;
            if (format === 'jpeg') {
              ctx.fillStyle = '#FFFFFF';
              ctx.fillRect(0, 0, w, h);
            }
            ctx.drawImage(img, 0, 0, w, h);

            canvas.toBlob((blob) => {
              totalConvertedSize += blob.size;
              resolve({
                originalUrl: URL.createObjectURL(file),
                originalSize: file.size,
                originalW: img.width,
                originalH: img.height,
                convertedUrl: URL.createObjectURL(blob),
                convertedSize: blob.size,
                convertedW: w,
                convertedH: h,
                blob
              });
            }, `image/${format}`, qualityVal);
          };
        };
      });
    }));

    if (processed.length > 0) {
      const first = processed[0];
      setImagePreview({
        originalUrl: first.originalUrl,
        originalSizeText: formatBytes(totalOriginalSize) + (imageFiles.length > 1 ? ` (${imageFiles.length} files)` : ''),
        originalDims: `${first.originalW} x ${first.originalH}`,
        convertedUrl: first.convertedUrl,
        convertedSizeText: formatBytes(totalConvertedSize) + (imageFiles.length > 1 ? ` (${imageFiles.length} files)` : ''),
        convertedDims: `${Math.round(first.convertedW)} x ${Math.round(first.convertedH)}`,
        processedList: processed
      });

      // Prepare Download
      if (imageFiles.length === 1) {
        setDownloadUrl(first.convertedUrl);
        setDownloadFilename(`${imageFiles[0].name.split('.')[0]}_converted.${format === 'jpeg' ? 'jpg' : format}`);
      } else {
        // Zip not imported in vanilla so it downloaded one by one in original script
        setDownloadUrl('multiple');
      }
    }
  };

  // Re-process images on settings change
  useEffect(() => {
    if (!isAudio && files.length) {
      processImages(files, outputFormat, compressionQuality, resizeLarge);
    }
  }, [outputFormat, compressionQuality, resizeLarge]);

  const handleOpenAudioModal = () => {
    setShowAudioModal(true);
    setTimeout(() => {
      if (!wavesurferRef.current && window.WaveSurfer && waveformContainerRef.current) {
        wavesurferRef.current = window.WaveSurfer.create({
          container: waveformContainerRef.current,
          waveColor: '#ef4444',
          progressColor: '#b91c1c',
          cursorColor: '#fca5a5',
          barWidth: 2,
          barRadius: 3,
          responsive: true,
          height: 100,
        });
      }
      if (wavesurferRef.current && files[0]) {
        wavesurferRef.current.load(URL.createObjectURL(files[0]));
      }
    }, 100);
  };

  const handleCloseAudioModal = () => {
    setShowAudioModal(false);
    if (wavesurferRef.current) {
      wavesurferRef.current.pause();
    }
  };

  const handleConvertAudio = async () => {
    if (!ffmpegRef.current || !files.length) return;
    setIsConverting(true);
    setStatusText('Converting...');
    setProgressPercent(0);

    try {
      const file = files[0];
      const inputExt = file.name.split('.').pop().toLowerCase();
      const outputFmt = audioFormat;
      const inputName = `input.${inputExt}`;
      const outputName = `output.${outputFmt}`;

      const { fetchFile } = window.FFmpeg;
      ffmpegRef.current.FS('writeFile', inputName, await fetchFile(file));

      const cmd = ['-i', inputName];
      if (trimStart && trimStart !== '00:00:00') cmd.push('-ss', trimStart);
      if (trimEnd && trimEnd !== '00:00:00') cmd.push('-to', trimEnd);

      if (audioBitrate) cmd.push('-b:a', audioBitrate);
      if (audioQscale) cmd.push('-q:a', audioQscale);
      if (audioSampleRate) cmd.push('-ar', audioSampleRate);
      if (audioChannels) cmd.push('-ac', audioChannels);

      cmd.push(outputName);

      await ffmpegRef.current.run(...cmd);

      const data = ffmpegRef.current.FS('readFile', outputName);
      const mimeMap = { mp3: 'audio/mpeg', aac: 'audio/aac', wav: 'audio/wav', ogg: 'audio/ogg' };
      const blob = new Blob([data.buffer], { type: mimeMap[outputFmt] || 'audio/mpeg' });

      // Cleanup virtual FS
      try { ffmpegRef.current.FS('unlink', inputName); } catch(e) {}
      try { ffmpegRef.current.FS('unlink', outputName); } catch(e) {}

      const blobUrl = URL.createObjectURL(blob);
      setDownloadUrl(blobUrl);
      setDownloadFilename(`${file.name.replace(/\.[^/.]+$/, '')}_converted.${outputFmt}`);
      setStatusText(`Done! ${formatBytes(blob.size)}`);
      setProgressPercent(100);
      setIsConverting(false);
    } catch (err) {
      console.error(err);
      setStatusText('Error: ' + (err.message || 'Conversion failed'));
      setIsConverting(false);
    }
  };

  const handleDownload = async () => {
    if (downloadUrl === 'multiple' && imagePreview) {
      for (let i = 0; i < imagePreview.processedList.length; i++) {
        const item = imagePreview.processedList[i];
        const a = document.createElement('a');
        a.href = item.convertedUrl;
        a.download = `${files[i].name.split('.')[0]}_converted.${outputFormat === 'jpeg' ? 'jpg' : outputFormat}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        await new Promise(r => setTimeout(r, 300));
      }
    } else if (downloadUrl) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = downloadFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <>
      {/* COI Service Worker - MUST load as early as possible for SharedArrayBuffer support */}
      {/* On first load: registers SW and reloads page. On second load: SW is active with COOP/COEP headers */}
      <Script src="/compressor/coi-serviceworker.js" strategy="afterInteractive" />

      <main className="w-full max-w-7xl mx-auto flex-grow flex flex-col items-center justify-center px-4 py-10">
        <div className="max-w-4xl w-full p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-8 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 relative mx-auto">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Image &amp; Audio Converter
            </h1>
            <p className="font-medium" style={{ color: 'var(--text-muted)' }}>
              Local, private, and lightning-fast format conversion by{' '}
              <span style={{ color: 'var(--primary-color)', fontWeight: 600 }}>MEHEDI HASAN SHIHAB</span>
            </p>
          </div>

          {/* Drop Zone */}
          <div 
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files && e.dataTransfer.files.length) {
                fileInputRef.current.files = e.dataTransfer.files;
                const event = { target: { files: e.dataTransfer.files } };
                handleFileChange(event);
              }
            }}
            className="relative group border-4 border-dashed border-gray-600 rounded-xl p-8 md:p-16 text-center hover:border-blue-500 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer bg-gray-800"
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple 
              className="hidden"
              accept="image/*, audio/*, .m4a, video/*, .ts"
            />
            <div className="space-y-4 group-hover:scale-105 transition-transform duration-300">
              <svg className="mx-auto h-20 w-20 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <p className="text-xl text-gray-300 font-medium">
                <span className="text-blue-400 font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-sm text-gray-500">Supports PNG, JPG, WEBP, MP3, WAV, AAC, MP4, WEBM, MOV, TS (up to 200MB)</p>
            </div>
          </div>

          {/* Settings for Image */}
          {!isAudio && files.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-750 border border-gray-700 p-6 rounded-xl bg-gray-900/30">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-300 uppercase tracking-wider">Output Format</label>
                <select 
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  style={{ color: 'var(--text-main)', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-color)' }}
                >
                  <option value="jpeg">JPEG</option>
                  <option value="png">PNG</option>
                  {webpSupported && <option value="webp">WebP</option>}
                </select>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-300 uppercase tracking-wider flex justify-between">
                  <span>Quality Compression</span>
                  <span className="text-blue-400 font-bold bg-blue-900/30 px-2 py-0.5 rounded">{compressionQuality}%</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={compressionQuality}
                  onChange={(e) => setCompressionQuality(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400"
                />
              </div>

              <div className="space-y-2 md:col-span-2 flex items-center p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600">
                <input 
                  type="checkbox" 
                  id="Mehedi_resizeCheckboxId"
                  checked={resizeLarge}
                  onChange={(e) => setResizeLarge(e.target.checked)}
                  className="w-5 h-5 text-blue-600 bg-gray-900 border-gray-600 rounded focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="Mehedi_resizeCheckboxId" className="ml-3 text-sm font-medium text-gray-300 cursor-pointer select-none">
                  Resize large images (Cap maximum width/height at 2000px)
                </label>
              </div>
            </div>
          )}

          {/* Settings for Audio */}
          {isAudio && files.length > 0 && (
            <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-xl border border-gray-700 shadow-inner">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white max-w-[200px] sm:max-w-xs truncate">{files[0].name}</h4>
                  <p className="text-sm text-gray-400">{formatBytes(files[0].size)}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="flex items-center space-x-2 bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-600">
                  <span className="text-sm text-gray-400 hidden sm:inline">Convert to:</span>
                  <select 
                    value={audioFormat}
                    onChange={(e) => setAudioFormat(e.target.value)}
                    className="bg-transparent text-white focus:outline-none text-sm font-semibold outline-none border-none cursor-pointer"
                  >
                    <option value="mp3">MP3</option>
                    <option value="aac">AAC</option>
                    <option value="wav">WAV</option>
                    <option value="ogg">OGG</option>
                  </select>
                </div>
                <button 
                  onClick={handleOpenAudioModal}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center space-x-2 transition border border-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                  </svg>
                  <span className="hidden sm:inline">Options</span>
                </button>
              </div>
            </div>
          )}

          {/* Image Preview Panel */}
          {!isAudio && imagePreview && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-200 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-gray-400 mr-2"></span> Original File
                  </h3>
                  <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center border border-gray-700 relative group shadow-inner">
                    <img className="max-w-full max-h-full object-contain p-2" src={imagePreview.originalUrl} alt="Original Preview" />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent pt-8 pb-3 px-4 text-sm text-center flex justify-between items-end opacity-90">
                      <span className="font-mono text-gray-300 bg-gray-800 px-2 py-1 rounded">{imagePreview.originalSizeText}</span>
                      <span className="font-mono text-gray-400">{imagePreview.originalDims}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-200 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span> Converted Result
                  </h3>
                  <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center border border-blue-500/50 relative group shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                    <img className="max-w-full max-h-full object-contain p-2" src={imagePreview.convertedUrl} alt="Converted Preview" />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent pt-8 pb-3 px-4 text-sm text-center flex justify-between items-end opacity-90">
                      <span className="font-mono text-green-400 font-bold bg-green-900/30 px-2 py-1 rounded border border-green-500/30">{imagePreview.convertedSizeText}</span>
                      <span className="font-mono text-blue-300">{imagePreview.convertedDims}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Audio Conversion progress panel */}
          {isAudio && files.length > 0 && !downloadUrl && (
            <div className="space-y-2 mt-4 bg-gray-800 p-4 rounded-xl border border-gray-700">
              <div className="flex justify-between text-sm text-gray-300 font-medium">
                <span>{statusText}</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 shadow-inner overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-red-600 to-pink-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Buttons */}
          {isAudio && files.length > 0 && !downloadUrl && (
            <button 
              onClick={handleConvertAudio}
              disabled={isConverting}
              className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold py-4 px-6 rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.4)] transform transition duration-200 hover:-translate-y-1 focus:outline-none flex justify-center items-center space-x-3 text-lg mt-4 disabled:opacity-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              <span>{isConverting ? 'Processing...' : 'Convert Audio'}</span>
            </button>
          )}

          {downloadUrl && (
            <button 
              onClick={handleDownload}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 px-6 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.4)] transform transition duration-200 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] focus:outline-none focus:ring-4 focus:ring-blue-500/50 flex justify-center items-center space-x-3 text-lg mt-4"
            >
              <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              <span>{isAudio ? 'Download Converted Audio' : 'Download Converted Image(s)'}</span>
            </button>
          )}
        </div>

        {/* Audio settings Options Modal */}
        {showAudioModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 m-0">
            <div className="bg-zinc-900 rounded-2xl w-full max-w-2xl border border-zinc-700 shadow-2xl overflow-hidden">
              <div className="flex justify-between items-center p-5 border-b border-zinc-700 bg-zinc-800/50">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                  </svg>
                  Audio Options
                </h3>
                <button onClick={handleCloseAudioModal} className="text-gray-400 hover:text-white transition bg-zinc-800 hover:bg-zinc-700 rounded-lg p-1.5 border-none cursor-pointer">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-8 max-h-[75vh] overflow-y-auto">
                {/* Trimming */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-300 uppercase tracking-wider">Trim Audio</label>
                  <div ref={waveformContainerRef} className="w-full h-28 bg-zinc-950 rounded-lg border border-zinc-700 overflow-hidden relative shadow-inner">
                    {/* WaveSurfer mounts here */}
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1 font-medium">Start Time (HH:MM:SS)</label>
                      <input 
                        type="text" 
                        value={trimStart}
                        onChange={(e) => setTrimStart(e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none"
                        style={{ color: 'var(--text-main)', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-color)' }}
                        placeholder="00:00:00"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1 font-medium">End Time (HH:MM:SS)</label>
                      <input 
                        type="text" 
                        value={trimEnd}
                        onChange={(e) => setTrimEnd(e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none"
                        style={{ color: 'var(--text-main)', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-color)' }}
                        placeholder="00:00:00"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Settings */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-zinc-800/30 p-4 rounded-xl border border-zinc-800">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-300">Audio Bitrate</label>
                    <select 
                      value={audioBitrate}
                      onChange={(e) => setAudioBitrate(e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none"
                      style={{ color: 'var(--text-main)', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-color)' }}
                    >
                      <option value="">Auto (Copy)</option>
                      <option value="64k">64 kbps</option>
                      <option value="128k">128 kbps</option>
                      <option value="192k">192 kbps</option>
                      <option value="256k">256 kbps</option>
                      <option value="320k">320 kbps</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-300">Audio Qscale</label>
                    <select 
                      value={audioQscale}
                      onChange={(e) => setAudioQscale(e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none"
                      style={{ color: 'var(--text-main)', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-color)' }}
                    >
                      <option value="">Auto</option>
                      <option value="0">0 (Highest Quality)</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9 (Lowest Quality)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-300">Sample Rate</label>
                    <select 
                      value={audioSampleRate}
                      onChange={(e) => setAudioSampleRate(e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none"
                      style={{ color: 'var(--text-main)', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-color)' }}
                    >
                      <option value="">Auto (Copy)</option>
                      <option value="44100">44100 Hz</option>
                      <option value="48000">48000 Hz</option>
                    </select>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="block text-sm font-semibold text-gray-300">Channels</label>
                    <select 
                      value={audioChannels}
                      onChange={(e) => setAudioChannels(e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none"
                      style={{ color: 'var(--text-main)', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-color)' }}
                    >
                      <option value="">Auto (Copy)</option>
                      <option value="1">Mono</option>
                      <option value="2">Stereo</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-zinc-700 bg-zinc-800/50 flex justify-end space-x-3">
                <button onClick={handleCloseAudioModal} className="px-6 py-2.5 rounded-lg font-medium text-gray-300 bg-transparent border border-gray-600 hover:text-white hover:bg-zinc-700 transition">
                  Cancel
                </button>
                <button onClick={handleCloseAudioModal} className="bg-red-600 hover:bg-red-500 text-white px-8 py-2.5 rounded-lg font-bold shadow-lg transition-all">
                  Save Options
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
