'use client';

import React, { useState, useEffect, useRef } from 'react';

const instances = [
  'https://fox.kittycat.boo/',
  'https://dog.kittycat.boo/',
  'https://cobaltapi.kittycat.boo/',
  'https://cobaltapi.squair.xyz/',
  'https://api.cobalt.liubquanti.click/',
  'https://api.dl.woof.monster/'
];

const proxyBuilders = [
  (t) => `https://corsproxy.io/?url=${encodeURIComponent(t)}`,
  (t) => `https://proxy.cors.sh/${t}`,
  (t) => t // Direct
];

const detectPlatform = (url) => {
  const u = url.toLowerCase();
  if (u.includes('tiktok') || u.includes('vm.tiktok')) return 'tiktok';
  if (u.includes('youtube') || u.includes('youtu.be')) return 'youtube';
  if (u.includes('instagram')) return 'instagram';
  if (u.includes('twitter') || u.includes('x.com')) return 'twitter';
  if (u.includes('facebook') || u.includes('fb.')) return 'facebook';
  return 'other';
};

const getYouTubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export default function UniversalDownloader() {
  const [isAudioOnly, setIsAudioOnly] = useState(false);
  const [targetUrl, setTargetUrl] = useState('');
  
  // Terminal log / Progress
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalLog, setTerminalLog] = useState('Awaiting request parameters...');
  const [progressPercent, setProgressPercent] = useState('0%');
  const [progressWidth, setProgressWidth] = useState('0%');
  const [progressColor, setProgressColor] = useState('');

  // Isolated single asset presentation
  const [showAsset, setShowAsset] = useState(false);
  const [assetTitle, setAssetTitle] = useState('Original Stream Segment Isolated');
  const [assetMeta, setAssetMeta] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('#');
  const [videoSrc, setVideoSrc] = useState('');
  const [videoPoster, setVideoPoster] = useState('');

  // Extracted slide gallery
  const [showGallery, setShowGallery] = useState(false);
  const [galleryAssets, setGalleryAssets] = useState([]);

  // Cloudflare worker fallback hint
  const [showWorkerHint, setShowWorkerHint] = useState(false);



  const videoRef = useRef(null);

  // Custom clipboard pasting
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setTargetUrl(text.trim());
      }
    } catch (err) {
      const manualText = prompt('Please paste your URL here:');
      if (manualText) {
        setTargetUrl(manualText.trim());
      }
    }
  };

  const writeLog = (html, percent) => {
    setTerminalLog(html);
    if (!isNaN(percent)) {
      setProgressWidth(`${percent}%`);
      setProgressPercent(`${percent}%`);
    }
  };

  // TikTok API extraction
  const fetchTikTok = async (videoUrl) => {
    const endpoints = [
      `https://tikwm.com/api/?url=${encodeURIComponent(videoUrl)}&hd=1`,
      `https://www.tikwm.com/api/?url=${encodeURIComponent(videoUrl)}`
    ];

    for (let i = 0; i < endpoints.length; i++) {
      writeLog(`TikWM API · Attempt ${i + 1}...`, 30 + i * 15);
      try {
        const res = await fetch(endpoints[i]);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        if (data.code === 0 && data.data) {
          const d = data.data;
          if (d.images && Array.isArray(d.images) && d.images.length > 0 && !isAudioOnly) {
            return {
              status: 'picker',
              picker: d.images.map(img => ({ type: 'photo', url: img, thumb: img })),
              title: d.title || 'TikTok Slideshow'
            };
          }
          const videoLink = isAudioOnly
            ? (d.music_info?.play || d.play)
            : (d.play || d.hdplay || d.wmplay);
          return {
            url: videoLink,
            title: d.title || 'TikTok Video',
            quality: isAudioOnly ? 'Audio · MP3' : 'HD Video · No Watermark',
            thumbnail: d.cover || d.origin_cover || d.dynamic_cover || null
          };
        }
      } catch (e) {
        console.warn(`TikWM attempt ${i + 1} failed:`, e.message);
      }
    }
    return null;
  };

  // Cobalt API + CORS Proxy extraction
  const fetchViaCobaltProxy = async (inputUrl) => {
    const body = JSON.stringify({
      url: inputUrl,
      videoQuality: '1080',
      audioFormat: isAudioOnly ? 'mp3' : 'best',
      audioBitrate: '320',
      downloadMode: isAudioOnly ? 'audio' : 'auto',
      filenameStyle: 'classic',
      disableMetadata: false
    });

    const personalWorker = 'https://cobalt-cors-proxy-udownloader.sshihabb007.workers.dev/';
    writeLog(`Connecting to personal Cloudflare Worker...`, 20);

    try {
      const workerRes = await fetch(personalWorker, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: body
      });

      if (workerRes.ok) {
        const workerData = await workerRes.json();
        if ((workerData.status === 'stream' || workerData.status === 'redirect' ||
             workerData.status === 'success' || workerData.status === 'tunnel') && workerData.url) {
          return { 
            url: workerData.url, 
            title: workerData.text || 'Media Stream', 
            quality: '1080p HD · Lossless',
            thumbnail: workerData.thumbnail || workerData.thumb || null
          };
        }
        if (workerData.status === 'picker' && Array.isArray(workerData.picker) && workerData.picker.length > 0) {
          return {
            status: 'picker',
            picker: workerData.picker,
            title: workerData.text || 'Extracted Slide Gallery'
          };
        }
      }
    } catch (e) {
      console.warn('Personal Worker request failed, falling back to public Cobalt instances...', e.message);
    }

    let attempt = 0;
    const totalAttempts = instances.length * proxyBuilders.length;

    for (const instance of instances) {
      for (const buildProxy of proxyBuilders) {
        attempt++;
        const pct = Math.min(30 + Math.floor((attempt / totalAttempts) * 60), 92);
        let label = instance;
        try { label = new URL(instance).hostname; } catch(e) {}

        writeLog(`Fallback · ${label} · Proxy ${attempt}...`, pct);

        try {
          const proxyUrl = buildProxy(instance);
          const res = await fetch(proxyUrl, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: body
          });

          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();

          if ((data.status === 'stream' || data.status === 'redirect' ||
               data.status === 'success' || data.status === 'tunnel') && data.url) {
            return { 
              url: data.url, 
              title: data.text || 'Media Stream', 
              quality: '1080p HD · Lossless',
              thumbnail: data.thumbnail || data.thumb || null
            };
          }
          if (data.status === 'picker' && Array.isArray(data.picker) && data.picker.length > 0) {
            return {
              status: 'picker',
              picker: data.picker,
              title: data.text || 'Extracted Slide Gallery'
            };
          }
          if (data.status === 'error') break;

        } catch (e) {
          console.warn(`[Cobalt Fallback] ${label} via proxy ${attempt}:`, e.message);
        }
      }
    }
    return null;
  };

  const handleExtraction = async () => {
    const inputUrl = targetUrl.trim();
    if (!inputUrl) {
      alert('Please paste a valid media link first.');
      return;
    }

    const platform = detectPlatform(inputUrl);

    // Reset UI state
    setShowAsset(false);
    setShowGallery(false);
    setShowWorkerHint(false);
    setShowTerminal(true);
    setProgressColor('');
    setProgressWidth('0%');
    setProgressPercent('0%');
    setVideoSrc('');
    setVideoPoster('');

    writeLog('Detecting platform and routing request...', 10);

    let result = null;

    try {
      if (platform === 'tiktok') {
        result = await fetchTikTok(inputUrl);
      } else {
        result = await fetchViaCobaltProxy(inputUrl);
      }
    } catch (err) {
      console.error('Extraction fatal error:', err);
    }

    if (result) {
      if (result.status === 'picker' && Array.isArray(result.picker)) {
        writeLog('Success! Extracted gallery assets...', 100);
        setGalleryAssets(result.picker);
        setTimeout(() => {
          setShowTerminal(false);
          setShowGallery(true);
        }, 400);
      } else if (result.url) {
        writeLog('Success! Binding download stream...', 100);
        setAssetTitle(result.title || 'Lossless Media Asset');
        setAssetMeta(
          isAudioOnly
            ? 'Format: MP3 Audio · Lossless Quality'
            : (result.quality || 'High Definition · Lossless Stream')
        );
        setDownloadUrl(result.url);

        let thumb = result.thumbnail || result.thumb || '';
        if (!thumb && platform === 'youtube') {
          const ytId = getYouTubeId(inputUrl);
          if (ytId) {
            thumb = `https://img.youtube.com/vi/${ytId}/mqdefault.jpg`;
          }
        }

        if (!isAudioOnly && result.url) {
          setVideoSrc(result.url);
          setVideoPoster(thumb);
        }

        setTimeout(() => {
          setShowTerminal(false);
          setShowAsset(true);
        }, 400);
      } else {
        writeLog('All extraction routes failed.', 100);
        setProgressPercent('ERR');
        setProgressColor('bg-red-500');
        setShowWorkerHint(true);
      }
    } else {
      writeLog('All extraction routes failed.', 100);
      setProgressPercent('ERR');
      setProgressColor('bg-red-500');
      setShowWorkerHint(true);
    }
  };

  const handleDownloadSlide = async (url, idx) => {
    try {
      const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      
      const tempLink = document.createElement('a');
      tempLink.href = blobUrl;
      tempLink.download = `slide_${idx + 1}.jpg`;
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      
      setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
    } catch (err) {
      window.open(url, '_blank');
    }
  };



  return (
    <main className="w-full max-w-7xl mx-auto flex-grow flex flex-col px-4 py-8 items-center justify-center relative overflow-hidden">


      {/* Glowing Hero Backgrounds */}
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl" style={{ background: 'var(--hero-glow-1)', opacity: 0.15, pointerEvents: 'none' }}></div>
      <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full blur-3xl" style={{ background: 'var(--hero-glow-2)', opacity: 0.15, pointerEvents: 'none' }}></div>

      <div className="text-center mb-8 z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2" style={{ color: 'var(--text-main)' }}>
          Universal <span className="text-indigo-500">Downloader</span>
        </h1>
        <p style={{ color: 'var(--text-muted)' }} className="font-medium text-sm sm:text-base mb-1">Lossless Media Streamer Core</p>
        <p style={{ color: 'var(--text-muted)' }} className="text-xs sm:text-sm font-semibold">
          Developed by <a href="/" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>Mehedi Hasan Shihab</a>
        </p>
      </div>

      {/* Downloader Module Glass Card */}
      <div 
        className="shihab_glass_card p-5 sm:p-8 rounded-3xl shadow-2xl w-full max-w-3xl mx-auto z-10"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}
      >
        <div className="space-y-6">
          
          {/* Format Toggle Options */}
          <div className="flex justify-between items-center">
            <label className="block text-xs font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Format Mode</label>
            <div className="mehedi_toggle_container" style={{ display: 'inline-flex', backgroundColor: 'var(--bg-hover)', padding: '4px', borderRadius: '9999px', border: '1px solid var(--border-color)' }}>
              <button 
                onClick={() => setIsAudioOnly(false)}
                className={`mehedi_toggle_btn ${!isAudioOnly ? 'active' : ''}`}
                style={{
                  padding: '8px 20px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: !isAudioOnly ? 'var(--primary-color)' : 'transparent',
                  color: !isAudioOnly ? 'var(--bg-dark)' : 'var(--text-muted)'
                }}
              >
                Video/Images
              </button>
              <button 
                onClick={() => setIsAudioOnly(true)}
                className={`mehedi_toggle_btn ${isAudioOnly ? 'active' : ''}`}
                style={{
                  padding: '8px 20px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: isAudioOnly ? 'var(--primary-color)' : 'transparent',
                  color: isAudioOnly ? 'var(--bg-dark)' : 'var(--text-muted)'
                }}
              >
                Audio (MP3)
              </button>
            </div>
          </div>

          {/* Input Stream URL */}
          <div>
            <label className="block text-xs font-bold uppercase mb-2" style={{ color: 'var(--text-muted)' }}>Target Stream URL</label>
            <div className="relative flex items-center">
              <input 
                type="url" 
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="Paste YouTube, TikTok, Instagram, Twitter or Reddit Link..." 
                className="sshihabb007_input w-full border p-4 pr-14 rounded-2xl outline-none font-semibold text-sm focus:ring-2 focus:ring-indigo-500"
                style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
              />
              <button 
                onClick={handlePaste}
                type="button" 
                className="absolute right-3 w-9 h-9 rounded-xl flex items-center justify-center transition border-none cursor-pointer duration-200"
                style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-main)', border: '1px solid var(--border-color)' }}
                title="Paste from clipboard"
              >
                <i className="fas fa-paste text-xs"></i>
              </button>
            </div>
          </div>

          {/* Action Execution Button */}
          <button 
            onClick={handleExtraction}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black tracking-wider uppercase text-xs py-4 px-6 rounded-2xl transition duration-200 active:scale-[0.99] shadow-lg shadow-indigo-900/10 cursor-pointer border-none"
          >
            Execute Lossless Extraction
          </button>

          {/* Processing status log terminal */}
          {showTerminal && (
            <div className="mt-6 rounded-2xl border p-4 space-y-3 font-mono text-xs" style={{ backgroundColor: 'var(--bg-hover)', borderColor: 'var(--border-color)' }}>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 flex-1 min-w-0" style={{ color: 'var(--text-muted)' }}>
                  &gt; {terminalLog}
                  <span className="shihab_cursor_blink text-sky-500 animate-pulse ml-1">_</span>
                </span>
                <span className="font-bold ml-3 flex-shrink-0" style={{ color: 'var(--primary-color)' }}>{progressPercent}</span>
              </div>
              <div className="w-full rounded-full h-1.5 overflow-hidden" style={{ backgroundColor: 'var(--bg-dark)' }}>
                <div 
                  className={`h-1.5 rounded-full transition-all duration-300 ${progressColor ? progressColor : 'bg-sky-500'}`} 
                  style={{ width: progressWidth }}
                ></div>
              </div>
            </div>
          )}

          {/* Isolated Asset Presentation Drawer */}
          {showAsset && (
            <div className="mt-6 rounded-2xl border p-4 space-y-4 animate-rise" style={{ backgroundColor: 'var(--bg-hover)', borderColor: 'var(--border-color)' }}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center border font-bold text-2xl" style={{ backgroundColor: 'var(--bg-dark)', borderColor: 'var(--border-color)' }}>🎬</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-bold truncate" style={{ color: 'var(--text-main)' }}>{assetTitle}</h3>
                  <p className="text-[10px] font-mono mt-1" style={{ color: 'var(--text-muted)' }}>{assetMeta}</p>
                </div>
              </div>
              
              {videoSrc && (
                <div className="w-full rounded-2xl overflow-hidden border transition duration-300" style={{ borderColor: 'var(--border-color)', aspectRatio: '16/9', backgroundColor: '#000' }}>
                  <video ref={videoRef} src={videoSrc} poster={videoPoster} className="w-full h-full object-contain" controls playsInline preload="metadata"></video>
                </div>
              )}
              
              <a 
                href={downloadUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full text-center font-bold text-xs py-3 rounded-xl transition uppercase tracking-wider cursor-pointer"
                style={{ backgroundColor: 'var(--primary-color)', color: 'var(--bg-dark)', textDecoration: 'none' }}
              >
                ↓ &nbsp; Download Original File
              </a>
            </div>
          )}

          {/* Multi-Asset Slide Presentation Gallery */}
          {showGallery && (
            <div className="mt-6 rounded-2xl border p-4 space-y-4" style={{ backgroundColor: 'var(--bg-hover)', borderColor: 'var(--border-color)' }}>
              <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: 'var(--border-color)' }}>
                <h3 className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--text-main)' }}>
                  <i className="fas fa-images text-indigo-500"></i> Extracted Slide Gallery
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: 'var(--bg-dark)', color: 'var(--primary-color)' }}>
                  {galleryAssets.length} Assets
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {galleryAssets.map((item, index) => (
                  <div 
                    key={index} 
                    className="relative rounded-2xl overflow-hidden group border transition duration-300 hover:scale-[1.03] shadow-md hover:shadow-xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--bg-dark)', borderColor: 'var(--border-color)', aspectRatio: '1/1' }}
                  >
                    <img 
                      src={item.thumb || item.url} 
                      alt={`Slide ${index + 1}`} 
                      className="w-full h-full object-cover transition duration-300 group-hover:scale-110" 
                      loading="lazy" 
                    />
                    
                    {item.type === 'video' && (
                      <div className="absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] z-10 shadow-lg" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                        <i className="fas fa-play"></i>
                      </div>
                    )}

                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[9px] font-bold z-10 shadow-sm" style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-main)', border: '1px solid var(--border-color)' }}>
                      #{index + 1}
                    </div>

                    <div className="absolute inset-0 flex flex-col justify-end p-2 opacity-0 group-hover:opacity-100 transition duration-200 z-20 bg-black/75">
                      <div className="flex gap-2 w-full">
                        <button 
                          onClick={() => handleDownloadSlide(item.url, index)}
                          className="flex-1 font-bold text-[10px] py-2 rounded-xl transition uppercase tracking-wider cursor-pointer border-none flex items-center justify-center gap-1 hover:brightness-110 active:scale-95"
                          style={{ backgroundColor: 'var(--primary-color)', color: 'var(--bg-dark)' }}
                        >
                          <i className="fas fa-arrow-down"></i> Save
                        </button>
                        <a 
                          href={item.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-xl flex items-center justify-center transition border-none cursor-pointer hover:bg-white/20 text-white bg-white/10"
                        >
                          <i className="fas fa-external-link-alt text-[10px]"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cloudflare Worker Setup Hint */}
          {showWorkerHint && (
            <div className="mt-4 rounded-2xl border p-4 text-xs" style={{ borderColor: '#f59e0b33', backgroundColor: 'rgba(245,158,11,0.05)' }}>
              <p className="font-bold mb-2 text-amber-500">⚠️ Why does this happen?</p>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                All public Cobalt servers block direct browser requests (CORS policy) and Instagram requires login. For a permanent fix,{' '}
                <a href="https://github.com/sshihabb007" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">
                  deploy a free Cloudflare Worker
                </a>{' '}
                as a personal CORS bridge — takes 2 minutes and is 100% free.
              </p>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
