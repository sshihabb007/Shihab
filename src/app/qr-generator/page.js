'use client';

import React, { useState, useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';

const presetLogos = {
  fb: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/facebook.svg',
  tw: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/twitter.svg',
  yt: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/youtube.svg',
  wa: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/whatsapp.svg',
  ig: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/instagram.svg',
  in: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg'
};

export default function QrGenerator() {
  const canvasRef = useRef(null);
  const [qrInstance, setQrInstance] = useState(null);

  // Accordion section states
  const [activeAccordion, setActiveAccordion] = useState('content');

  // Form tab type
  const [activeTab, setActiveTab] = useState('url');

  // Input states
  const [urlVal, setUrlVal] = useState('https://sshihabb007.github.io');
  const [textVal, setTextVal] = useState('');
  const [emailVal, setEmailVal] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [phoneType, setPhoneType] = useState('tel');
  const [phoneVal, setPhoneVal] = useState('');
  const [smsPhone, setSmsPhone] = useState('');
  const [smsText, setSmsText] = useState('');
  
  // vCard
  const [vcName, setVcName] = useState('');
  const [vcRole, setVcRole] = useState('');
  const [vcComp, setVcComp] = useState('');
  const [vcPhone, setVcPhone] = useState('');
  const [vcEmail, setVcEmail] = useState('');
  const [vcWebsite, setVcWebsite] = useState('');

  // meCard
  const [mcName, setMcName] = useState('');
  const [mcPhone, setMcPhone] = useState('');
  const [mcEmail, setMcEmail] = useState('');
  const [mcUrl, setMcUrl] = useState('');

  // Location
  const [locLat, setLocLat] = useState('');
  const [locLng, setLocLng] = useState('');

  // Social
  const [fbUrl, setFbUrl] = useState('');
  const [twUrl, setTwUrl] = useState('');
  const [ytUrl, setYtUrl] = useState('');

  // WiFi
  const [wfSsid, setWfSsid] = useState('');
  const [wfPass, setWfPass] = useState('');
  const [wfEnc, setWfEnc] = useState('WPA');

  // Event
  const [evTitle, setEvTitle] = useState('');
  const [evStart, setEvStart] = useState('');
  const [evEnd, setEvEnd] = useState('');
  const [evLocation, setEvLocation] = useState('');

  // Bitcoin
  const [btcAddr, setBtcAddr] = useState('');
  const [btcAmt, setBtcAmt] = useState('');

  // Colors state
  const [colorType, setColorType] = useState('single');
  const [fgColor1, setFgColor1] = useState('#000000');
  const [fgColor2, setFgColor2] = useState('#10B981');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [customEyeColor, setCustomEyeColor] = useState(false);
  const [eyeColor, setEyeColor] = useState('#000000');

  // Logo state
  const [logoUrl, setLogoUrl] = useState('');
  const [textOverlay, setTextOverlay] = useState(false);
  const [overlayText, setOverlayText] = useState('SCAN ME');
  const [overlayTextColor, setOverlayTextColor] = useState('#ffffff');
  const [overlayBgColor, setOverlayBgColor] = useState('#3B82F6');
  const [overlayFontSize, setOverlayFontSize] = useState(18);
  const [overlayRadius, setOverlayRadius] = useState(50);

  // Design state
  const [bodyShape, setBodyShape] = useState('square');
  const [eyeFrameShape, setEyeFrameShape] = useState('square');
  const [eyeBallShape, setEyeBallShape] = useState('square');
  const [padding, setPadding] = useState(10);
  const [size, setSize] = useState(400);

  // Initializing the qr-code-styling library dynamically
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Dynamically import to avoid SSR issues
    import('qr-code-styling').then((mod) => {
      const QRCodeStyling = mod.default || mod;
      const qr = new QRCodeStyling({
        width: size,
        height: size,
        type: 'svg',
        data: 'https://sshihabb007.github.io',
        dotsOptions: { color: '#000000', type: 'square' },
        backgroundOptions: { color: '#ffffff' },
        cornersSquareOptions: { color: '#000000', type: 'square' },
        cornersDotOptions: { color: '#000000', type: 'square' },
        imageOptions: { crossOrigin: 'anonymous', margin: 10, imageSize: 0.4 },
        qrOptions: { errorCorrectionLevel: 'H' }
      });

      if (canvasRef.current) {
        canvasRef.current.innerHTML = '';
        qr.append(canvasRef.current);
      }
      setQrInstance(qr);
    }).catch(console.error);
  }, []);

  // Update QR on dependency changes
  useEffect(() => {
    if (!qrInstance) return;

    let finalData = 'https://sshihabb007.github.io';

    switch (activeTab) {
      case 'url':
        finalData = urlVal || finalData;
        break;
      case 'text':
        finalData = textVal || 'Enter text';
        break;
      case 'email':
        finalData = `mailto:${emailVal}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        break;
      case 'phone':
        if (phoneType === 'whatsapp') {
          const cleanPhone = phoneVal.replace(/[^0-9]/g, '');
          finalData = `https://wa.me/${cleanPhone}`;
        } else {
          finalData = `tel:${phoneVal}`;
        }
        break;
      case 'sms':
        finalData = `smsto:${smsPhone}:${smsText}`;
        break;
      case 'location':
        finalData = `geo:${locLat || '0'},${locLng || '0'}`;
        break;
      case 'wifi':
        finalData = `WIFI:T:${wfEnc};S:${wfSsid};P:${wfPass};;`;
        break;
      case 'vcard':
        finalData = `BEGIN:VCARD\nVERSION:3.0\nFN:${vcName}\nTITLE:${vcRole}\nORG:${vcComp}\nTEL:${vcPhone}\nEMAIL:${vcEmail}\nURL:${vcWebsite}\nEND:VCARD`;
        break;
      case 'mecard':
        finalData = `MECARD:N:${mcName};TEL:${mcPhone};EMAIL:${mcEmail};URL:${mcUrl};;`;
        break;
      case 'facebook':
        finalData = fbUrl || 'https://facebook.com';
        break;
      case 'twitter':
        finalData = twUrl || 'https://twitter.com';
        break;
      case 'youtube':
        finalData = ytUrl || 'https://youtube.com';
        break;
      case 'event':
        const start = evStart.replace(/[-:]/g, '') + '00Z';
        const end = evEnd.replace(/[-:]/g, '') + '00Z';
        finalData = `BEGIN:VEVENT\nSUMMARY:${evTitle}\nDTSTART:${start}\nDTEND:${end}\nLOCATION:${evLocation}\nEND:VEVENT`;
        break;
      case 'bitcoin':
        finalData = btcAmt ? `bitcoin:${btcAddr}?amount=${btcAmt}` : `bitcoin:${btcAddr}`;
        break;
      default:
        break;
    }

    const dotsOptions = { type: bodyShape };
    if (colorType === 'gradient') {
      dotsOptions.gradient = {
        type: 'linear',
        colorStops: [
          { offset: 0, color: fgColor1 },
          { offset: 1, color: fgColor2 }
        ]
      };
    } else {
      dotsOptions.color = fgColor1;
    }

    const finalEyeColor = customEyeColor ? eyeColor : fgColor1;

    qrInstance.update({
      width: size,
      height: size,
      margin: padding,
      data: finalData,
      image: logoUrl,
      dotsOptions: dotsOptions,
      backgroundOptions: { color: bgColor },
      cornersSquareOptions: { color: finalEyeColor, type: eyeFrameShape },
      cornersDotOptions: { color: finalEyeColor, type: eyeBallShape }
    });

    // Handle view box and text overlay styling after updating
    const timer = setTimeout(() => {
      const svgEl = canvasRef.current?.querySelector('svg');
      if (svgEl) {
        svgEl.setAttribute('viewBox', `0 0 ${size} ${size}`);
        applyTextOverlay(svgEl);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [
    qrInstance,
    activeTab,
    urlVal,
    textVal,
    emailVal,
    emailSubject,
    emailBody,
    phoneType,
    phoneVal,
    smsPhone,
    smsText,
    vcName,
    vcRole,
    vcComp,
    vcPhone,
    vcEmail,
    vcWebsite,
    mcName,
    mcPhone,
    mcEmail,
    mcUrl,
    locLat,
    locLng,
    wfSsid,
    wfPass,
    wfEnc,
    fbUrl,
    twUrl,
    ytUrl,
    evTitle,
    evStart,
    evEnd,
    evLocation,
    btcAddr,
    btcAmt,
    colorType,
    fgColor1,
    fgColor2,
    bgColor,
    customEyeColor,
    eyeColor,
    logoUrl,
    textOverlay,
    overlayText,
    overlayTextColor,
    overlayBgColor,
    overlayFontSize,
    overlayRadius,
    bodyShape,
    eyeFrameShape,
    eyeBallShape,
    padding,
    size
  ]);

  const applyTextOverlay = (svgEl) => {
    if (!svgEl) return;

    // Remove any existing overlay
    const existing = svgEl.querySelector('#shihab-text-overlay-group');
    if (existing) existing.remove();

    if (!textOverlay) return;

    const trimmedText = overlayText.trim() || 'SCAN ME';
    const cx = size / 2;
    const cy = size / 2;

    const charWidth = overlayFontSize * 0.58;
    const paddingX = overlayFontSize * 0.8;
    const paddingY = overlayFontSize * 0.45;
    const badgeW = Math.max(trimmedText.length * charWidth + paddingX * 2, overlayFontSize * 2);
    const badgeH = overlayFontSize + paddingY * 2;
    const rx = (overlayRadius / 100) * (badgeH / 2);

    const ns = 'http://www.w3.org/2000/svg';
    const g = document.createElementNS(ns, 'g');
    g.setAttribute('id', 'shihab-text-overlay-group');

    // Background badge
    const rect = document.createElementNS(ns, 'rect');
    rect.setAttribute('x', cx - badgeW / 2);
    rect.setAttribute('y', cy - badgeH / 2);
    rect.setAttribute('width', badgeW);
    rect.setAttribute('height', badgeH);
    rect.setAttribute('rx', rx);
    rect.setAttribute('ry', rx);
    rect.setAttribute('fill', overlayBgColor);

    // Text
    const textEl = document.createElementNS(ns, 'text');
    textEl.setAttribute('x', cx);
    textEl.setAttribute('y', cy);
    textEl.setAttribute('text-anchor', 'middle');
    textEl.setAttribute('dominant-baseline', 'central');
    textEl.setAttribute('fill', overlayTextColor);
    textEl.setAttribute('font-size', overlayFontSize);
    textEl.setAttribute('font-family', 'Arial, Helvetica, sans-serif');
    textEl.setAttribute('font-weight', 'bold');
    textEl.setAttribute('letter-spacing', '0.5');
    textEl.textContent = trimmedText;

    g.appendChild(rect);
    g.appendChild(textEl);
    svgEl.appendChild(g);
  };

  const getQrFileName = () => {
    let name = 'qr-code';
    if (activeTab === 'url' && urlVal) {
      name = urlVal;
    } else if (activeTab === 'text' && textVal) {
      name = textVal;
    }
    return name
      .replace(/[^a-zA-Z0-9\s\-_]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 60) || 'qr-code';
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setLogoUrl(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = (ext) => {
    if (!qrInstance) return;
    qrInstance.download({ name: getQrFileName(), extension: ext });
  };

  const downloadPDF = async () => {
    if (!qrInstance) return;
    try {
      const blob = await qrInstance.getRawData('png');
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = function () {
        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [size, size]
        });

        doc.addImage(img, 'PNG', 0, 0, size, size);
        doc.save(`${getQrFileName()}.pdf`);
        URL.revokeObjectURL(url);
      };
      img.src = url;
    } catch (e) {
      console.error(e);
      alert('Failed to generate PDF.');
    }
  };

  const downloadEPS = async () => {
    if (!qrInstance) return;
    try {
      const blob = await qrInstance.getRawData('png');
      const url = URL.createObjectURL(blob);

      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);

        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const b64 = imgData.split(',')[1];
        const raw = atob(b64);

        let hexArr = new Array(raw.length);
        for (let i = 0; i < raw.length; i++) {
          let h = raw.charCodeAt(i).toString(16);
          if (h.length === 1) h = '0' + h;
          hexArr[i] = h;
        }

        let flatHex = hexArr.join('');
        let formattedHex = '';
        for (let i = 0; i < flatHex.length; i += 64) {
          formattedHex += flatHex.substring(i, i + 64) + '\n';
        }

        const epsString = `%!PS-Adobe-3.0 EPSF-3.0
%%Creator: Mehedi Hasan Shihab QR Generator
%%BoundingBox: 0 0 ${size} ${size}
%%LanguageLevel: 2
%%EndComments
/DeviceRGB setcolorspace
${size} ${size} scale
<<
  /ImageType 1
  /Width ${size}
  /Height ${size}
  /BitsPerComponent 8
  /Decode [0 1 0 1 0 1]
  /ImageMatrix [${size} 0 0 -${size} 0 ${size}]
  /DataSource currentfile /ASCIIHexDecode filter /DCTDecode filter
>>
image
${formattedHex}>
%%EOF`;

        const epsBlob = new Blob([epsString], { type: 'application/postscript' });
        const epsUrl = URL.createObjectURL(epsBlob);
        const a = document.createElement('a');
        a.href = epsUrl;
        a.download = `${getQrFileName()}.eps`;
        a.click();
        URL.revokeObjectURL(epsUrl);
      };
      img.src = url;
    } catch (e) {
      console.error(e);
      alert('EPS generation failed.');
    }
  };

  const toggleAccordion = (name) => {
    setActiveAccordion(activeAccordion === name ? '' : name);
  };

  const tabsList = [
    { id: 'url', label: 'URL' },
    { id: 'text', label: 'TEXT' },
    { id: 'email', label: 'EMAIL' },
    { id: 'phone', label: 'PHONE' },
    { id: 'sms', label: 'SMS' },
    { id: 'vcard', label: 'VCARD' },
    { id: 'mecard', label: 'MECARD' },
    { id: 'location', label: 'LOCATION' },
    { id: 'wifi', label: 'WIFI' },
    { id: 'facebook', label: 'FB' },
    { id: 'twitter', label: 'X' },
    { id: 'youtube', label: 'YT' },
    { id: 'event', label: 'EVENT' },
    { id: 'bitcoin', label: 'BTC' }
  ];

  return (
    <main className="w-full max-w-7xl mx-auto flex-grow flex flex-col px-4 py-8">
      <div className="text-center space-y-2 mt-4 mb-8">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
          Free Custom QR Code Generator
        </h1>
        <p style={{ color: 'var(--text-muted)' }} className="font-medium text-sm max-w-2xl mx-auto">
          Create highly customizable, professional QR codes for URLs, WhatsApp, WiFi, and more. Add your own logo and download instantly in SVG or PNG format.
        </p>
        <p style={{ color: 'var(--text-muted)' }} className="text-xs font-semibold mt-2 inline-flex items-center justify-center gap-1">
          Developed by{' '}
          <a 
            href="https://www.linkedin.com/in/mehedi-hasan-shihab" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:underline transition-all"
            style={{ color: 'var(--primary-color)' }}
          >
            Mehedi Hasan Shihab
          </a>{' '}
          <i className="fab fa-linkedin" style={{ color: '#0A66C2' }}></i>
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {/* Left Panel */}
        <div 
          className="flex-1 rounded-lg border shadow-sm min-w-0" 
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}
        >
          {/* Tabs Container */}
          <div className="flex flex-wrap border-b" style={{ backgroundColor: 'var(--bg-hover)', borderColor: 'var(--border-color)' }}>
            {tabsList.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-4 font-bold text-xs uppercase cursor-pointer flex-1 text-center transition-all ${
                  activeTab === tab.id
                    ? 'text-sky-500 border-b-2 border-sky-500 bg-black/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                style={{ borderBottomWidth: activeTab === tab.id ? '2px' : '0px' }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="w-full">
            {/* Accordion 1: Enter Content */}
            <div className={`border-b ${activeAccordion === 'content' ? 'active' : ''}`} style={{ borderColor: 'var(--border-color)' }}>
              <button 
                onClick={() => toggleAccordion('content')}
                className="w-full text-left py-4 px-6 flex items-center justify-between font-semibold hover:bg-black/5"
                style={{ color: 'var(--text-main)' }}
              >
                <span className="flex items-center gap-2 text-sm uppercase tracking-wide">
                  <i className="fas fa-edit text-sky-500"></i> Enter Content
                </span>
                <i className={`fas fa-chevron-down transition-transform duration-200 ${activeAccordion === 'content' ? 'rotate-180' : ''}`}></i>
              </button>

              {activeAccordion === 'content' && (
                <div className="p-6 space-y-4">
                  {activeTab === 'url' && (
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Your URL</label>
                      <input 
                        type="text" 
                        value={urlVal}
                        onChange={(e) => setUrlVal(e.target.value)}
                        placeholder="https://sshihabb007.github.io"
                        className="w-full p-3 border rounded-md outline-none"
                        style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                      />
                    </div>
                  )}

                  {activeTab === 'text' && (
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Your Text</label>
                      <textarea 
                        rows="4" 
                        value={textVal}
                        onChange={(e) => setTextVal(e.target.value)}
                        placeholder="Enter your text here..."
                        className="w-full p-3 border rounded-md outline-none"
                        style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                      />
                    </div>
                  )}

                  {activeTab === 'email' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Email Address</label>
                        <input 
                          type="email" 
                          value={emailVal}
                          onChange={(e) => setEmailVal(e.target.value)}
                          placeholder="name@mail.com"
                          className="w-full p-3 border rounded-md outline-none"
                          style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Subject</label>
                        <input 
                          type="text" 
                          value={emailSubject}
                          onChange={(e) => setEmailSubject(e.target.value)}
                          placeholder="Email Subject"
                          className="w-full p-3 border rounded-md outline-none"
                          style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Message</label>
                        <textarea 
                          rows="3" 
                          value={emailBody}
                          onChange={(e) => setEmailBody(e.target.value)}
                          placeholder="Email Body"
                          className="w-full p-3 border rounded-md outline-none"
                          style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 'phone' && (
                    <div className="space-y-3">
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold" style={{ color: 'var(--text-main)' }}>
                          <input 
                            type="radio" 
                            name="phone_type" 
                            value="tel" 
                            checked={phoneType === 'tel'}
                            onChange={() => setPhoneType('tel')}
                            className="cursor-pointer"
                          /> 
                          Regular Call
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold" style={{ color: 'var(--text-main)' }}>
                          <input 
                            type="radio" 
                            name="phone_type" 
                            value="whatsapp" 
                            checked={phoneType === 'whatsapp'}
                            onChange={() => setPhoneType('whatsapp')}
                            className="cursor-pointer"
                          /> 
                          WhatsApp Chat
                        </label>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Phone Number</label>
                        <input 
                          type="tel" 
                          value={phoneVal}
                          onChange={(e) => setPhoneVal(e.target.value)}
                          placeholder="+12345678900"
                          className="w-full p-3 border rounded-md outline-none"
                          style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                        />
                        <p className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>Include country code (e.g., +1 for US, +880 for BD).</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'sms' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Phone Number</label>
                        <input 
                          type="tel" 
                          value={smsPhone}
                          onChange={(e) => setSmsPhone(e.target.value)}
                          placeholder="+1 234 567 8900"
                          className="w-full p-3 border rounded-md outline-none"
                          style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Message</label>
                        <textarea 
                          rows="3" 
                          value={smsText}
                          onChange={(e) => setSmsText(e.target.value)}
                          placeholder="Text Message"
                          className="w-full p-3 border rounded-md outline-none"
                          style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 'vcard' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        value={vcName} 
                        onChange={(e) => setVcName(e.target.value)} 
                        placeholder="Full Name" 
                        className="w-full p-3 border rounded-md outline-none" 
                        style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                      />
                      <input 
                        type="text" 
                        value={vcRole} 
                        onChange={(e) => setVcRole(e.target.value)} 
                        placeholder="Role" 
                        className="w-full p-3 border rounded-md outline-none" 
                        style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                      />
                      <input 
                        type="text" 
                        value={vcComp} 
                        onChange={(e) => setVcComp(e.target.value)} 
                        placeholder="Company" 
                        className="w-full p-3 border rounded-md outline-none" 
                        style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                      />
                      <input 
                        type="tel" 
                        value={vcPhone} 
                        onChange={(e) => setVcPhone(e.target.value)} 
                        placeholder="Phone" 
                        className="w-full p-3 border rounded-md outline-none" 
                        style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                      />
                      <input 
                        type="email" 
                        value={vcEmail} 
                        onChange={(e) => setVcEmail(e.target.value)} 
                        placeholder="Email" 
                        className="w-full p-3 border rounded-md outline-none" 
                        style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                      />
                      <input 
                        type="text" 
                        value={vcWebsite} 
                        onChange={(e) => setVcWebsite(e.target.value)} 
                        placeholder="Website" 
                        className="w-full p-3 border rounded-md outline-none" 
                        style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                      />
                    </div>
                  )}

                  {activeTab === 'mecard' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        value={mcName} 
                        onChange={(e) => setMcName(e.target.value)} 
                        placeholder="Name" 
                        className="w-full p-3 border rounded-md outline-none" 
                        style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                      />
                      <input 
                        type="tel" 
                        value={mcPhone} 
                        onChange={(e) => setMcPhone(e.target.value)} 
                        placeholder="Phone" 
                        className="w-full p-3 border rounded-md outline-none" 
                        style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                      />
                      <input 
                        type="email" 
                        value={mcEmail} 
                        onChange={(e) => setMcEmail(e.target.value)} 
                        placeholder="Email" 
                        className="w-full p-3 border rounded-md outline-none" 
                        style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                      />
                      <input 
                        type="text" 
                        value={mcUrl} 
                        onChange={(e) => setMcUrl(e.target.value)} 
                        placeholder="Website URL" 
                        className="w-full p-3 border rounded-md outline-none" 
                        style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                      />
                    </div>
                  )}

                  {activeTab === 'location' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Latitude</label>
                        <input 
                          type="number" 
                          value={locLat}
                          onChange={(e) => setLocLat(e.target.value)}
                          placeholder="40.7128" 
                          step="any"
                          className="w-full p-3 border rounded-md outline-none" 
                          style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Longitude</label>
                        <input 
                          type="number" 
                          value={locLng}
                          onChange={(e) => setLocLng(e.target.value)}
                          placeholder="-74.0060" 
                          step="any"
                          className="w-full p-3 border rounded-md outline-none" 
                          style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 'wifi' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Network Name</label>
                        <input 
                          type="text" 
                          value={wfSsid}
                          onChange={(e) => setWfSsid(e.target.value)}
                          placeholder="SSID"
                          className="w-full p-3 border rounded-md outline-none" 
                          style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Password</label>
                        <input 
                          type="text" 
                          value={wfPass}
                          onChange={(e) => setWfPass(e.target.value)}
                          placeholder="Password"
                          className="w-full p-3 border rounded-md outline-none" 
                          style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Encryption</label>
                        <select 
                          value={wfEnc}
                          onChange={(e) => setWfEnc(e.target.value)}
                          className="w-full p-3 border rounded-md outline-none"
                          style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                        >
                          <option value="WPA">WPA/WPA2</option>
                          <option value="WEP">WEP</option>
                          <option value="nopass">None</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {activeTab === 'facebook' && (
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Facebook URL</label>
                      <input 
                        type="text" 
                        value={fbUrl}
                        onChange={(e) => setFbUrl(e.target.value)}
                        placeholder="https://facebook.com/yourpage"
                        className="w-full p-3 border rounded-md outline-none"
                        style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                      />
                    </div>
                  )}

                  {activeTab === 'twitter' && (
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Twitter URL</label>
                      <input 
                        type="text" 
                        value={twUrl}
                        onChange={(e) => setTwUrl(e.target.value)}
                        placeholder="https://twitter.com/yourprofile"
                        className="w-full p-3 border rounded-md outline-none"
                        style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                      />
                    </div>
                  )}

                  {activeTab === 'youtube' && (
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase" style={{ color: 'var(--text-muted)' }}>YouTube URL</label>
                      <input 
                        type="text" 
                        value={ytUrl}
                        onChange={(e) => setYtUrl(e.target.value)}
                        placeholder="https://youtube.com/c/yourchannel"
                        className="w-full p-3 border rounded-md outline-none"
                        style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                      />
                    </div>
                  )}

                  {activeTab === 'event' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        value={evTitle} 
                        onChange={(e) => setEvTitle(e.target.value)} 
                        placeholder="Event Title" 
                        className="w-full p-3 border rounded-md outline-none col-span-2" 
                        style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                      />
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Start Date/Time</label>
                        <input 
                          type="datetime-local" 
                          value={evStart} 
                          onChange={(e) => setEvStart(e.target.value)} 
                          className="w-full p-3 border rounded-md outline-none" 
                          style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>End Date/Time</label>
                        <input 
                          type="datetime-local" 
                          value={evEnd} 
                          onChange={(e) => setEvEnd(e.target.value)} 
                          className="w-full p-3 border rounded-md outline-none" 
                          style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                        />
                      </div>
                      <input 
                        type="text" 
                        value={evLocation} 
                        onChange={(e) => setEvLocation(e.target.value)} 
                        placeholder="Location" 
                        className="w-full p-3 border rounded-md outline-none col-span-2" 
                        style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                      />
                    </div>
                  )}

                  {activeTab === 'bitcoin' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Bitcoin Address</label>
                        <input 
                          type="text" 
                          value={btcAddr}
                          onChange={(e) => setBtcAddr(e.target.value)}
                          placeholder="Bitcoin Address"
                          className="w-full p-3 border rounded-md outline-none"
                          style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Amount (Optional)</label>
                        <input 
                          type="number" 
                          value={btcAmt}
                          onChange={(e) => setBtcAmt(e.target.value)}
                          placeholder="0.00" 
                          step="any"
                          className="w-full p-3 border rounded-md outline-none"
                          style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Accordion 2: Set Colors */}
            <div className={`border-b ${activeAccordion === 'colors' ? 'active' : ''}`} style={{ borderColor: 'var(--border-color)' }}>
              <button 
                onClick={() => toggleAccordion('colors')}
                className="w-full text-left py-4 px-6 flex items-center justify-between font-semibold hover:bg-black/5"
                style={{ color: 'var(--text-main)' }}
              >
                <span className="flex items-center gap-2 text-sm uppercase tracking-wide">
                  <i className="fas fa-palette text-purple-500"></i> Set Colors
                </span>
                <i className={`fas fa-chevron-down transition-transform duration-200 ${activeAccordion === 'colors' ? 'rotate-180' : ''}`}></i>
              </button>

              {activeAccordion === 'colors' && (
                <div className="p-6 space-y-4">
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold" style={{ color: 'var(--text-main)' }}>
                      <input 
                        type="radio" 
                        name="color_type" 
                        value="single" 
                        checked={colorType === 'single'} 
                        onChange={() => setColorType('single')}
                        className="cursor-pointer"
                      /> 
                      Single Color
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold" style={{ color: 'var(--text-main)' }}>
                      <input 
                        type="radio" 
                        name="color_type" 
                        value="gradient" 
                        checked={colorType === 'gradient'} 
                        onChange={() => setColorType('gradient')}
                        className="cursor-pointer"
                      /> 
                      Color Gradient
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Foreground Color 1</label>
                      <input 
                        type="color" 
                        value={fgColor1} 
                        onChange={(e) => setFgColor1(e.target.value)} 
                        className="w-full h-10 border rounded-md cursor-pointer"
                        style={{ borderColor: 'var(--border-color)', backgroundColor: 'transparent' }}
                      />
                    </div>
                    
                    {colorType === 'gradient' && (
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Foreground Color 2</label>
                        <input 
                          type="color" 
                          value={fgColor2} 
                          onChange={(e) => setFgColor2(e.target.value)} 
                          className="w-full h-10 border rounded-md cursor-pointer"
                          style={{ borderColor: 'var(--border-color)', backgroundColor: 'transparent' }}
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Background Color</label>
                      <input 
                        type="color" 
                        value={bgColor} 
                        onChange={(e) => setBgColor(e.target.value)} 
                        className="w-full h-10 border rounded-md cursor-pointer"
                        style={{ borderColor: 'var(--border-color)', backgroundColor: 'transparent' }}
                      />
                    </div>

                    <div className="col-span-1 md:col-span-3">
                      <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold mb-2" style={{ color: 'var(--text-main)' }}>
                        <input 
                          type="checkbox" 
                          checked={customEyeColor} 
                          onChange={(e) => setCustomEyeColor(e.target.checked)} 
                          className="cursor-pointer"
                        /> 
                        Custom Eye Color
                      </label>
                      {customEyeColor && (
                        <input 
                          type="color" 
                          value={eyeColor} 
                          onChange={(e) => setEyeColor(e.target.value)} 
                          className="w-full h-10 border rounded-md cursor-pointer md:w-1/3"
                          style={{ borderColor: 'var(--border-color)', backgroundColor: 'transparent' }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 3: Add Logo Image */}
            <div className={`border-b ${activeAccordion === 'logo' ? 'active' : ''}`} style={{ borderColor: 'var(--border-color)' }}>
              <button 
                onClick={() => toggleAccordion('logo')}
                className="w-full text-left py-4 px-6 flex items-center justify-between font-semibold hover:bg-black/5"
                style={{ color: 'var(--text-main)' }}
              >
                <span className="flex items-center gap-2 text-sm uppercase tracking-wide">
                  <i className="fas fa-image text-emerald-500"></i> Add Logo Image
                </span>
                <i className={`fas fa-chevron-down transition-transform duration-200 ${activeAccordion === 'logo' ? 'rotate-180' : ''}`}></i>
              </button>

              {activeAccordion === 'logo' && (
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Upload Custom Logo</label>
                    <input 
                      type="file" 
                      onChange={handleLogoUpload}
                      className="w-full text-sm cursor-pointer"
                      style={{ color: 'var(--text-muted)' }}
                    />
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="block text-xs font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Preset Logos</label>
                    <div className="flex flex-wrap gap-2">
                      {Object.keys(presetLogos).map((key) => (
                        <button
                          key={key}
                          onClick={() => setLogoUrl(presetLogos[key])}
                          className="w-10 h-10 border rounded-md flex items-center justify-center hover:bg-white/10 transition-colors"
                          style={{ borderColor: 'var(--border-color)' }}
                        >
                          <img src={presetLogos[key]} alt={key} className="w-6 h-6 object-contain" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button 
                      onClick={() => setLogoUrl('')}
                      className="text-xs px-3 py-1.5 border rounded-md hover:bg-red-500/10 hover:text-red-500 transition-colors"
                      style={{ color: 'var(--text-muted)', borderColor: 'var(--border-color)' }}
                    >
                      Remove Logo
                    </button>
                  </div>

                  {/* Text Badge Overlay */}
                  <div className="border-t pt-4 mt-2 space-y-3" style={{ borderColor: 'var(--border-color)' }}>
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Center Text Label</label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={textOverlay} 
                          onChange={(e) => setTextOverlay(e.target.checked)} 
                          className="sr-only peer"
                        />
                        <div className="w-10 h-5 rounded-full peer-checked:bg-blue-500 transition-colors" style={{ backgroundColor: 'var(--border-color)' }}></div>
                        <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5"></div>
                      </label>
                    </div>

                    {textOverlay && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Label Text</label>
                          <input 
                            type="text" 
                            value={overlayText}
                            onChange={(e) => setOverlayText(e.target.value)}
                            maxLength="20"
                            placeholder="SCAN ME"
                            className="w-full p-2 border rounded-md outline-none text-sm"
                            style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Text Color</label>
                            <input 
                              type="color" 
                              value={overlayTextColor}
                              onChange={(e) => setOverlayTextColor(e.target.value)}
                              className="w-full h-9 border rounded-md cursor-pointer"
                              style={{ borderColor: 'var(--border-color)', backgroundColor: 'transparent' }}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Badge Color</label>
                            <input 
                              type="color" 
                              value={overlayBgColor}
                              onChange={(e) => setOverlayBgColor(e.target.value)}
                              className="w-full h-9 border rounded-md cursor-pointer"
                              style={{ borderColor: 'var(--border-color)', backgroundColor: 'transparent' }}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <div className="flex justify-between text-xs font-bold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
                              <span>Font Size</span>
                              <span>{overlayFontSize}px</span>
                            </div>
                            <input 
                              type="range" 
                              min="10" 
                              max="30" 
                              value={overlayFontSize}
                              onChange={(e) => setOverlayFontSize(parseInt(e.target.value))}
                              className="w-full cursor-pointer"
                            />
                          </div>
                          <div>
                            <div className="flex justify-between text-xs font-bold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
                              <span>Corner Radius</span>
                              <span>{overlayRadius}%</span>
                            </div>
                            <input 
                              type="range" 
                              min="0" 
                              max="100" 
                              value={overlayRadius}
                              onChange={(e) => setOverlayRadius(parseInt(e.target.value))}
                              className="w-full cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 4: Customize Design */}
            <div className={`border-b ${activeAccordion === 'design' ? 'active' : ''}`} style={{ borderColor: 'var(--border-color)' }}>
              <button 
                onClick={() => toggleAccordion('design')}
                className="w-full text-left py-4 px-6 flex items-center justify-between font-semibold hover:bg-black/5"
                style={{ color: 'var(--text-main)' }}
              >
                <span className="flex items-center gap-2 text-sm uppercase tracking-wide">
                  <i className="fas fa-layer-group text-orange-500"></i> Customize Design
                </span>
                <i className={`fas fa-chevron-down transition-transform duration-200 ${activeAccordion === 'design' ? 'rotate-180' : ''}`}></i>
              </button>

              {activeAccordion === 'design' && (
                <div className="p-6 space-y-6">
                  {/* Body Shape */}
                  <div>
                    <label className="block text-xs font-bold uppercase mb-2" style={{ color: 'var(--text-muted)' }}>Body Shape</label>
                    <div className="flex flex-wrap gap-3">
                      {['square', 'dots', 'rounded', 'extra-rounded', 'classy', 'classy-rounded'].map((shape) => (
                        <button
                          key={shape}
                          onClick={() => setBodyShape(shape)}
                          className={`px-3 py-2 text-xs font-semibold rounded border cursor-pointer capitalize transition-all ${
                            bodyShape === shape ? 'border-sky-500 bg-sky-500/10 text-sky-400' : 'text-slate-300'
                          }`}
                          style={{ borderColor: bodyShape === shape ? 'var(--primary-color)' : 'var(--border-color)' }}
                        >
                          {shape.replace('-', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Eye Frame Shape */}
                  <div>
                    <label className="block text-xs font-bold uppercase mb-2" style={{ color: 'var(--text-muted)' }}>Eye Frame Shape</label>
                    <div className="flex flex-wrap gap-3">
                      {['square', 'dot', 'rounded', 'extra-rounded'].map((shape) => (
                        <button
                          key={shape}
                          onClick={() => setEyeFrameShape(shape)}
                          className={`px-3 py-2 text-xs font-semibold rounded border cursor-pointer capitalize transition-all ${
                            eyeFrameShape === shape ? 'border-sky-500 bg-sky-500/10 text-sky-400' : 'text-slate-300'
                          }`}
                          style={{ borderColor: eyeFrameShape === shape ? 'var(--primary-color)' : 'var(--border-color)' }}
                        >
                          {shape.replace('-', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Eye Ball Shape */}
                  <div>
                    <label className="block text-xs font-bold uppercase mb-2" style={{ color: 'var(--text-muted)' }}>Eye Ball Shape</label>
                    <div className="flex flex-wrap gap-3">
                      {['square', 'dot'].map((shape) => (
                        <button
                          key={shape}
                          onClick={() => setEyeBallShape(shape)}
                          className={`px-3 py-2 text-xs font-semibold rounded border cursor-pointer capitalize transition-all ${
                            eyeBallShape === shape ? 'border-sky-500 bg-sky-500/10 text-sky-400' : 'text-slate-300'
                          }`}
                          style={{ borderColor: eyeBallShape === shape ? 'var(--primary-color)' : 'var(--border-color)' }}
                        >
                          {shape.replace('-', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Padding */}
                  <div>
                    <div className="flex justify-between text-xs font-bold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
                      <span>Padding</span>
                      <span>{padding}px</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="50" 
                      step="5" 
                      value={padding} 
                      onChange={(e) => setPadding(parseInt(e.target.value))}
                      className="w-full cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-[380px] lg:flex-shrink-0 flex flex-col gap-4">
          <div 
            className="rounded-lg border shadow-sm p-5 flex flex-col items-center w-full"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}
          >
            <div className="w-full bg-white p-4 rounded-xl shadow-inner mb-4 relative flex justify-center items-center min-h-[260px]">
              <div ref={canvasRef} id="mehedi-canvas-container" className="flex justify-center items-center"></div>
            </div>

            <div className="w-full space-y-4">
              <div className="flex items-center justify-between text-xs font-bold uppercase" style={{ color: 'var(--text-muted)' }}>
                <span>100px</span>
                <span>1000px</span>
                <span>2000px</span>
              </div>
              <input 
                type="range" 
                min="100" 
                max="2000" 
                step="100" 
                value={size} 
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-full cursor-pointer"
              />
              <div className="text-center text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>
                {size} x {size} Px
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4">
                <button 
                  onClick={() => handleDownload('png')}
                  className="w-full text-white font-bold py-2.5 rounded-md hover:opacity-90 transition-all flex items-center justify-center gap-2 text-sm border-none cursor-pointer"
                  style={{ backgroundColor: 'var(--primary-color)' }}
                >
                  .PNG
                </button>
                <button 
                  onClick={() => handleDownload('svg')}
                  className="w-full font-bold py-2.5 rounded-md hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                  style={{ backgroundColor: 'transparent', color: 'var(--text-main)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}
                >
                  .SVG
                </button>
                <button 
                  onClick={downloadPDF}
                  className="w-full font-bold py-2.5 rounded-md hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                  style={{ backgroundColor: 'transparent', color: 'var(--text-main)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}
                >
                  .PDF
                </button>
                <button 
                  onClick={downloadEPS}
                  className="w-full font-bold py-2.5 rounded-md hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                  style={{ backgroundColor: 'transparent', color: 'var(--text-main)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}
                >
                  .EPS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion 5: User Guide & Features */}
      <div 
        className="mt-12 mb-8 rounded-2xl border shadow-sm overflow-hidden"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}
      >
        <button 
          onClick={() => toggleAccordion('guide')}
          className="w-full text-left py-5 px-6 flex items-center justify-between font-semibold hover:bg-black/5"
          style={{ color: 'var(--text-main)' }}
        >
          <span className="flex items-center gap-2 text-sm uppercase tracking-wide">
            <i className="fas fa-book-open text-sky-500"></i> User Guide & Features
          </span>
          <i className={`fas fa-chevron-down transition-transform duration-200 ${activeAccordion === 'guide' ? 'rotate-180' : ''}`}></i>
        </button>

        {activeAccordion === 'guide' && (
          <div className="p-8 border-t space-y-10" style={{ borderColor: 'var(--border-color)' }}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold" style={{ color: 'var(--primary-color)' }}>
                How to Create a QR Code for Free
              </h2>
              <ol className="list-decimal list-inside space-y-3 text-sm sm:text-base" style={{ color: 'var(--text-muted)' }}>
                <li><strong style={{ color: 'var(--text-main)' }}>Select your content type:</strong> Choose from URL, Text, Email, Phone, WhatsApp, SMS, vCard, Location, or WiFi using the top navigation tabs.</li>
                <li><strong style={{ color: 'var(--text-main)' }}>Enter your details:</strong> Fill in the required fields. For example, enter your website URL or your WiFi network credentials.</li>
                <li><strong style={{ color: 'var(--text-main)' }}>Customize the design (Optional):</strong> Open the accordion menus to change the foreground and background colors, adjust the padding, and even upload your own custom logo.</li>
                <li><strong style={{ color: 'var(--text-main)' }}>Adjust the shape:</strong> Stand out by changing the standard square shapes to dots, rounded corners, or classy patterns.</li>
                <li><strong style={{ color: 'var(--text-main)' }}>Download the QR Code:</strong> Use the quality slider to pick your desired resolution, then click the "Download PNG" or ".SVG" button to save your generated QR code locally.</li>
              </ol>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold" style={{ color: 'var(--primary-color)' }}>Why Use Our QR Code Generator?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm" style={{ color: 'var(--text-muted)' }}>
                <div className="flex gap-3">
                  <i className="fas fa-shield-alt text-emerald-500 text-lg flex-shrink-0"></i>
                  <div>
                    <strong className="block mb-1 text-base" style={{ color: 'var(--text-main)' }}>100% Free & Private</strong>
                    All QR codes are generated locally right inside your browser. We never store, track, or save your data on any external servers.
                  </div>
                </div>
                <div className="flex gap-3">
                  <i className="fas fa-bolt text-emerald-500 text-lg flex-shrink-0"></i>
                  <div>
                    <strong className="block mb-1 text-base" style={{ color: 'var(--text-main)' }}>High-Quality Vector Export</strong>
                    Unlike simple generators, our tool allows you to download your QR code in high-resolution PNG or infinitely scalable SVG formats, perfect for professional printing.
                  </div>
                </div>
                <div className="flex gap-3">
                  <i className="fas fa-palette text-emerald-500 text-lg flex-shrink-0"></i>
                  <div>
                    <strong className="block mb-1 text-base" style={{ color: 'var(--text-main)' }}>Advanced Customization</strong>
                    Don't settle for boring black-and-white squares. Add your brand's logo, match your brand colors, and pick custom data patterns (like dots or rounded edges) instantly.
                  </div>
                </div>
                <div className="flex gap-3">
                  <i className="fas fa-mobile-alt text-emerald-500 text-lg flex-shrink-0"></i>
                  <div>
                    <strong className="block mb-1 text-base" style={{ color: 'var(--text-main)' }}>Modern Action Codes</strong>
                    We support direct actions like 'WhatsApp Chat', one-tap 'WiFi Connect', and 'vCard' contact saving so your users have a seamless mobile experience.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
