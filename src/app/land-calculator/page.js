'use client';

import React, { useState, useEffect } from 'react';

export default function LandCalculator() {
  // Master converter state
  const [isRegional, setIsRegional] = useState(false);
  const [inputs, setInputs] = useState({
    decimal: '',
    katha: '',
    bigha: '',
    acre: '',
    hectare: '',
    sqmeter: '',
    sqft: '',
    sqlink: ''
  });

  // Human readable breakdown state
  const [breakdownText, setBreakdownText] = useState('0 Acre, 0 Bigha, 0 Katha, 0 Decimal');

  // Visualizer percentage state
  const [visualizerPct, setVisualizerPct] = useState(0);

  // Gunter's chain state
  const [chainLength, setChainLength] = useState('');
  const [chainWidth, setChainWidth] = useState('');
  const [chainResult, setChainResult] = useState('0.0000');

  // Accordion active tab
  const [activeTab, setActiveTab] = useState(null);

  // Conversion Ratios (Base = Decimal)
  const getRatios = (regional) => {
    return {
      decimal: 1,
      katha: regional ? (52 / 20) : 1.65, // If 1 Bigha = 52 Dec, and 20 Katha = 1 Bigha, 1 Katha = 2.6 Dec
      bigha: regional ? 52 : 33,
      acre: 100,
      hectare: 247.105,
      sqmeter: 1 / 40.4686,
      sqft: 1 / 435.6,
      sqlink: 1 / 1000
    };
  };

  const updateHumanReadable = (totalDecimal, ratios) => {
    let remainingDec = totalDecimal;

    const acres = Math.floor(remainingDec / ratios.acre);
    remainingDec %= ratios.acre;

    const bighas = Math.floor(remainingDec / ratios.bigha);
    remainingDec %= ratios.bigha;

    const kathas = Math.floor(remainingDec / ratios.katha);
    remainingDec %= ratios.katha;

    const decimals = remainingDec.toFixed(2);

    setBreakdownText(`${acres} Acre, ${bighas} Bigha, ${kathas} Katha, ${decimals} Decimal`);
  };

  const updateVisualizer = (sqftValue) => {
    const TENNIS_COURT = 2808;
    const percentage = (sqftValue / TENNIS_COURT) * 100;
    setVisualizerPct(percentage);
  };

  const handleInputChange = (unit, val) => {
    const value = parseFloat(val);
    if (isNaN(value)) {
      setInputs({
        decimal: '',
        katha: '',
        bigha: '',
        acre: '',
        hectare: '',
        sqmeter: '',
        sqft: '',
        sqlink: ''
      });
      setBreakdownText('0 Acre, 0 Bigha, 0 Katha, 0 Decimal');
      setVisualizerPct(0);
      return;
    }

    const ratios = getRatios(isRegional);
    const baseValue = value * ratios[unit];

    const nextInputs = {};
    Object.keys(ratios).forEach((k) => {
      if (k === unit) {
        nextInputs[k] = val;
      } else {
        const result = baseValue / ratios[k];
        nextInputs[k] = parseFloat(result.toFixed(4)).toString();
      }
    });

    setInputs(nextInputs);
    updateHumanReadable(baseValue, ratios);
    updateVisualizer(baseValue / ratios.sqft);
  };

  // Recalculate everything when standard/regional toggle changes
  useEffect(() => {
    const currentDecimal = parseFloat(inputs.decimal);
    if (!isNaN(currentDecimal)) {
      const ratios = getRatios(isRegional);
      const baseValue = currentDecimal; // base is already decimal

      const nextInputs = { ...inputs };
      Object.keys(ratios).forEach((k) => {
        if (k !== 'decimal') {
          const result = baseValue / ratios[k];
          nextInputs[k] = parseFloat(result.toFixed(4)).toString();
        }
      });

      setInputs(nextInputs);
      updateHumanReadable(baseValue, ratios);
      updateVisualizer(baseValue / ratios.sqft);
    }
  }, [isRegional]);

  // Gunter's Chain calculation
  useEffect(() => {
    const l = parseFloat(chainLength) || 0;
    const w = parseFloat(chainWidth) || 0;
    const dec = (l * w) / 1000;
    setChainResult(dec.toFixed(4));
  }, [chainLength, chainWidth]);

  // Visualizer sizing
  let visualSize = 0;
  if (visualizerPct > 0) {
    visualSize = Math.sqrt(visualizerPct) * 10;
    if (visualSize > 100) visualSize = 100;
    if (visualSize < 5) visualSize = 5;
  }

  const toggleAccordion = (index) => {
    setActiveTab(activeTab === index ? null : index);
  };

  return (
    <main className="w-full max-w-7xl mx-auto flex-grow flex flex-col px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2" style={{ color: 'var(--text-main)' }}>
          Land Calculator <span className="text-emerald-500">Pro</span>
        </h1>
        <p style={{ color: 'var(--text-muted)' }} className="font-medium text-sm sm:text-base mb-1">
          Convert Acre, Hectare, Bigha, Katha, Decimal & more.
        </p>
        <p style={{ color: 'var(--text-muted)' }} className="text-xs sm:text-sm font-semibold">
          Developer: <span style={{ color: 'var(--primary-color)' }}>MEHEDI HASAN SHIHAB</span>
        </p>
      </div>

      <div className="max-w-5xl mx-auto w-full space-y-6">
        {/* Regional Toggle & Master Grid */}
        <div 
          className="mehedi_card p-4 sm:p-6 rounded-2xl shadow-xl"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}
        >
          <div 
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b pb-4"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-main)' }}>
              Master Converter
            </h2>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wide text-right" style={{ color: 'var(--text-muted)' }}>
                Standard <br /> (33 Dec)
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isRegional} 
                  onChange={(e) => setIsRegional(e.target.checked)} 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
              <span className="text-xs font-bold uppercase tracking-wide text-left" style={{ color: 'var(--text-muted)' }}>
                Regional <br /> (52 Dec)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Decimal Input */}
            <div className="space-y-1">
              <label className="font-bold text-xs uppercase" style={{ color: 'var(--text-muted)' }}>
                Shotangsho (Decimal)
              </label>
              <input 
                type="number" 
                value={inputs.decimal}
                onChange={(e) => handleInputChange('decimal', e.target.value)}
                className="sshihabb007_input w-full p-3 sm:p-4 border rounded-xl outline-none transition font-semibold text-lg"
                placeholder="0"
                style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
              />
            </div>

            {/* Katha Input */}
            <div className="space-y-1">
              <label className="font-bold text-xs uppercase" style={{ color: 'var(--text-muted)' }}>
                Katha
              </label>
              <input 
                type="number" 
                value={inputs.katha}
                onChange={(e) => handleInputChange('katha', e.target.value)}
                className="sshihabb007_input w-full p-3 sm:p-4 border rounded-xl outline-none transition font-semibold text-lg"
                placeholder="0"
                style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
              />
            </div>

            {/* Bigha Input */}
            <div className="space-y-1">
              <label className="font-bold text-xs uppercase" style={{ color: 'var(--text-muted)' }}>
                Bigha
              </label>
              <input 
                type="number" 
                value={inputs.bigha}
                onChange={(e) => handleInputChange('bigha', e.target.value)}
                className="sshihabb007_input w-full p-3 sm:p-4 border rounded-xl outline-none transition font-semibold text-lg"
                placeholder="0"
                style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
              />
            </div>

            {/* Acre Input */}
            <div className="space-y-1">
              <label className="font-bold text-xs uppercase" style={{ color: 'var(--text-muted)' }}>
                Acre
              </label>
              <input 
                type="number" 
                value={inputs.acre}
                onChange={(e) => handleInputChange('acre', e.target.value)}
                className="sshihabb007_input w-full p-3 sm:p-4 border rounded-xl outline-none transition font-semibold text-lg"
                placeholder="0"
                style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
              />
            </div>

            {/* Hectare Input */}
            <div className="space-y-1">
              <label className="font-bold text-xs uppercase" style={{ color: 'var(--text-muted)' }}>
                Hectare
              </label>
              <input 
                type="number" 
                value={inputs.hectare}
                onChange={(e) => handleInputChange('hectare', e.target.value)}
                className="sshihabb007_input w-full p-3 sm:p-4 border rounded-xl outline-none transition font-semibold text-lg"
                placeholder="0"
                style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
              />
            </div>

            {/* Sq Meter Input */}
            <div className="space-y-1">
              <label className="font-bold text-xs uppercase" style={{ color: 'var(--text-muted)' }}>
                Square Meter (Sq M)
              </label>
              <input 
                type="number" 
                value={inputs.sqmeter}
                onChange={(e) => handleInputChange('sqmeter', e.target.value)}
                className="sshihabb007_input w-full p-3 sm:p-4 border rounded-xl outline-none transition font-semibold text-lg"
                placeholder="0"
                style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
              />
            </div>

            {/* Sq Ft Input */}
            <div className="space-y-1">
              <label className="font-bold text-xs uppercase" style={{ color: 'var(--text-muted)' }}>
                Square Feet (Sq Ft)
              </label>
              <input 
                type="number" 
                value={inputs.sqft}
                onChange={(e) => handleInputChange('sqft', e.target.value)}
                className="sshihabb007_input w-full p-3 sm:p-4 border rounded-xl outline-none transition font-semibold text-lg"
                placeholder="0"
                style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
              />
            </div>

            {/* Sq Links Input */}
            <div className="space-y-1">
              <label className="font-bold text-xs uppercase" style={{ color: 'var(--text-muted)' }}>
                Square Links
              </label>
              <input 
                type="number" 
                value={inputs.sqlink}
                onChange={(e) => handleInputChange('sqlink', e.target.value)}
                className="sshihabb007_input w-full p-3 sm:p-4 border rounded-xl outline-none transition font-semibold text-lg"
                placeholder="0"
                style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
              />
            </div>
          </div>

          {/* Human Readable Breakdown */}
          <div className="mt-6 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-1">
              Human Readable Breakdown
            </p>
            <p className="text-lg sm:text-xl font-black" style={{ color: 'var(--text-main)' }}>
              {breakdownText}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Area Visualizer */}
          <div 
            className="mehedi_card p-4 sm:p-6 rounded-2xl shadow-xl"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}
          >
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-main)' }}>
              <i className="fas fa-vector-square mr-2 text-emerald-500"></i>Area Visualizer
            </h2>
            <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
              Compared to a standard Tennis Court (2,808 Sq Ft)
            </p>
            <div className="visualizer-container" style={{ position: 'relative', width: '100%', height: '250px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '2px dashed #10b981', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <div 
                className="shihab_box_visual" 
                style={{ 
                  backgroundColor: 'rgba(16, 185, 129, 0.5)', 
                  border: '2px solid #10b981', 
                  borderRadius: '4px', 
                  transition: 'all 0.5s ease-out', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  textAlign: 'center', 
                  fontWeight: 'bold', 
                  color: 'white', 
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)', 
                  minWidth: '10px', 
                  minHeight: '10px',
                  width: visualSize > 0 ? `${visualSize}%` : '0%',
                  height: visualSize > 0 ? `${visualSize}%` : '0%'
                }}
              >
                {visualizerPct > 10 ? `${Math.round(visualizerPct)}%` : ''}
              </div>
            </div>
          </div>

          {/* Gunter's Chain Calculator */}
          <div 
            className="mehedi_card p-4 sm:p-6 rounded-2xl shadow-xl flex flex-col justify-between"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}
          >
            <div>
              <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-main)' }}>
                <i className="fas fa-link mr-2 text-emerald-500"></i>Gunter's Chain Calculator
              </h2>
              <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                Calculate Decimal directly from Surveyor Chain links.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs font-bold uppercase" style={{ color: 'var(--text-muted)' }}>
                    Length (Links)
                  </label>
                  <input 
                    type="number" 
                    value={chainLength}
                    onChange={(e) => setChainLength(e.target.value)}
                    className="w-full p-3 border rounded-xl outline-none transition font-semibold"
                    placeholder="0"
                    style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase" style={{ color: 'var(--text-muted)' }}>
                    Width (Links)
                  </label>
                  <input 
                    type="number" 
                    value={chainWidth}
                    onChange={(e) => setChainWidth(e.target.value)}
                    className="w-full p-3 border rounded-xl outline-none transition font-semibold"
                    placeholder="0"
                    style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-xl text-center">
              <p className="text-xs font-bold uppercase text-emerald-400 mb-1">Result (Decimal)</p>
              <p className="text-2xl font-black" style={{ color: 'var(--text-main)' }}>
                {chainResult}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Reference & Wiki */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Reference Table */}
          <div 
            className="mehedi_card p-4 sm:p-6 rounded-2xl shadow-xl overflow-x-auto"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}
          >
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-main)' }}>
              <i className="fas fa-table mr-2 text-emerald-500"></i>Standard Conversions
            </h2>
            <table className="w-full text-left text-sm" style={{ color: 'var(--text-main)' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                  <th className="pb-2">Unit</th>
                  <th className="pb-2">Equals To</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td className="py-2 font-semibold">1 Acre</td>
                  <td className="py-2 text-emerald-400">100 Decimal</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td className="py-2 font-semibold">1 Bigha (Std)</td>
                  <td className="py-2 text-emerald-400">33 Decimal</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td className="py-2 font-semibold">1 Katha</td>
                  <td className="py-2 text-emerald-400">1.65 Decimal</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td className="py-2 font-semibold">1 Decimal</td>
                  <td className="py-2 text-emerald-400">435.6 Sq Ft</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold">1 Decimal</td>
                  <td className="py-2 text-emerald-400">1,000 Sq Links</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Land Laws Wiki */}
          <div 
            className="mehedi_card p-4 sm:p-6 rounded-2xl shadow-xl"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}
          >
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-main)' }}>
              <i className="fas fa-book mr-2 text-emerald-500"></i>Land Terms Wiki
            </h2>
            <div className="space-y-3">
              <div className="border rounded-lg" style={{ borderColor: 'var(--border-color)' }}>
                <button 
                  onClick={() => toggleAccordion(1)}
                  className="w-full flex justify-between items-center p-3 font-semibold text-sm transition-colors hover:bg-emerald-900/10 bg-transparent border-none cursor-pointer"
                  style={{ color: 'var(--text-main)' }}
                >
                  RS Khatian (Revisional Survey)
                  <i className={`fas fa-chevron-down transition-transform duration-200 ${activeTab === 1 ? 'rotate-180' : ''}`}></i>
                </button>
                {activeTab === 1 && (
                  <div className="p-3 text-xs border-t" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
                    Conducted to update the previous CS record. Very reliable standard used heavily for land verification in Bangladesh.
                  </div>
                )}
              </div>
              <div className="border rounded-lg" style={{ borderColor: 'var(--border-color)' }}>
                <button 
                  onClick={() => toggleAccordion(2)}
                  className="w-full flex justify-between items-center p-3 font-semibold text-sm transition-colors hover:bg-emerald-900/10 bg-transparent border-none cursor-pointer"
                  style={{ color: 'var(--text-main)' }}
                >
                  SA Khatian (State Acquisition)
                  <i className={`fas fa-chevron-down transition-transform duration-200 ${activeTab === 2 ? 'rotate-180' : ''}`}></i>
                </button>
                {activeTab === 2 && (
                  <div className="p-3 text-xs border-t" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
                    Prepared during 1956-62 after the abolition of the Zamindari system. Often handwritten and forms the chain of ownership.
                  </div>
                )}
              </div>
              <div className="border rounded-lg" style={{ borderColor: 'var(--border-color)' }}>
                <button 
                  onClick={() => toggleAccordion(3)}
                  className="w-full flex justify-between items-center p-3 font-semibold text-sm transition-colors hover:bg-emerald-900/10 bg-transparent border-none cursor-pointer"
                  style={{ color: 'var(--text-main)' }}
                >
                  Mouza
                  <i className={`fas fa-chevron-down transition-transform duration-200 ${activeTab === 3 ? 'rotate-180' : ''}`}></i>
                </button>
                {activeTab === 3 && (
                  <div className="p-3 text-xs border-t" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
                    A specific land area/village boundary within a jurisdiction. Every land plot belongs to a numbered Mouza mapping.
                  </div>
                )}
              </div>
              <div className="border rounded-lg" style={{ borderColor: 'var(--border-color)' }}>
                <button 
                  onClick={() => toggleAccordion(4)}
                  className="w-full flex justify-between items-center p-3 font-semibold text-sm transition-colors hover:bg-emerald-900/10 bg-transparent border-none cursor-pointer"
                  style={{ color: 'var(--text-main)' }}
                >
                  Standard (33 Dec) vs Regional (52 Dec)
                  <i className={`fas fa-chevron-down transition-transform duration-200 ${activeTab === 4 ? 'rotate-180' : ''}`}></i>
                </button>
                {activeTab === 4 && (
                  <div className="p-3 text-xs border-t space-y-2" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
                    <p><strong>Standard Bigha (33 Decimal):</strong> This is the official government standard across Bangladesh. It is universally used for all legal deeds, government land registries, and taxation. (1 Bigha = 33 Decimal = 14,400 Sq Ft).</p>
                    <p><strong>Regional Bigha (52 Decimal):</strong> Used locally in specific rural regions of Bangladesh (e.g., parts of Rajshahi/Northern areas) based on older customary measurements set by historical local Zamindars. Always clarify which "Bigha" is meant during local transactions!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
