'use client';

import React, { useState, useEffect } from 'react';

export default function BmiCalculator() {
  const [mode, setMode] = useState('metric'); // metric vs imperial
  const [metricHeightUnit, setMetricHeightUnit] = useState('cm'); // cm vs ft

  // Metric fields
  const [weightKg, setWeightKg] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [metricHeightFt, setMetricHeightFt] = useState('');
  const [metricHeightIn, setMetricHeightIn] = useState('');

  // Imperial fields
  const [weightLbs, setWeightLbs] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');

  // Calculated values
  const [bmi, setBmi] = useState(null);
  const [statusText, setStatusText] = useState('Awaiting Input');
  const [needlePercent, setNeedlePercent] = useState(0);
  const [colorInfo, setColorInfo] = useState({ border: '', bgClass: '', textClass: '' });
  const [idealWeightText, setIdealWeightText] = useState('--');
  const [actionPlanText, setActionPlanText] = useState('--');
  const [actionPlanClass, setActionPlanClass] = useState('text-green-400');
  const [lastWeightStr, setLastWeightStr] = useState('');
  
  // Save button animation state
  const [saveStatus, setSaveStatus] = useState('default'); // default, saved

  // History state
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const saved = JSON.parse(localStorage.getItem('shihab_bmiHistory') || '[]');
    setHistory(saved);
  };

  const handleSaveResult = () => {
    if (!bmi) return;
    const newItem = {
      bmi,
      weight: lastWeightStr,
      status: statusText,
      date: new Date().toISOString()
    };
    const updated = [newItem, ...history];
    if (updated.length > 5) updated.pop();
    setHistory(updated);
    localStorage.setItem('shihab_bmiHistory', JSON.stringify(updated));

    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('default'), 2000);
  };

  const handleClearHistory = () => {
    localStorage.removeItem('shihab_bmiHistory');
    setHistory([]);
  };

  // Recalculate BMI whenever inputs change
  useEffect(() => {
    let calculatedBmi = 0;
    let weight = 0;
    let height = 0;
    const isMetric = mode === 'metric';

    if (isMetric) {
      weight = parseFloat(weightKg);
      if (metricHeightUnit === 'cm') {
        height = parseFloat(heightCm) / 100; // to meters
      } else {
        const ft = parseFloat(metricHeightFt) || 0;
        const inc = parseFloat(metricHeightIn) || 0;
        height = ((ft * 12) + inc) * 0.0254; // to meters
      }

      if (weight > 0 && height > 0) {
        calculatedBmi = weight / (height * height);
        setLastWeightStr(`${weight} kg`);
      }
    } else {
      weight = parseFloat(weightLbs);
      const ft = parseFloat(heightFt) || 0;
      const inc = parseFloat(heightIn) || 0;
      height = (ft * 12) + inc; // in inches
      if (weight > 0 && height > 0) {
        calculatedBmi = 703 * (weight / (height * height));
        setLastWeightStr(`${weight} lbs`);
      }
    }

    if (calculatedBmi > 0 && calculatedBmi < 100) {
      const finalBmi = calculatedBmi.toFixed(1);
      setBmi(finalBmi);
      updateUI(parseFloat(finalBmi), weight, height, isMetric);
    } else {
      setBmi(null);
      resetUI();
    }
  }, [mode, metricHeightUnit, weightKg, heightCm, metricHeightFt, metricHeightIn, weightLbs, heightFt, heightIn]);

  const updateUI = (value, weight, height, isMetric) => {
    let text = '';
    let border = '';
    let bgClass = '';
    let textClass = '';
    let percent = 0;

    if (value < 18.5) {
      text = "Underweight";
      border = "#3b82f6";
      bgClass = "bg-blue-500/20";
      textClass = "text-blue-400 border-blue-500/50";
      percent = (value / 18.5) * 24;
    } else if (value < 25) {
      text = "Healthy Weight";
      border = "#22c55e";
      bgClass = "bg-green-500/20";
      textClass = "text-green-400 border-green-500/50";
      percent = 25 + ((value - 18.5) / (25 - 18.5)) * 25;
    } else if (value < 30) {
      text = "Overweight";
      border = "#eab308";
      bgClass = "bg-yellow-500/20";
      textClass = "text-yellow-400 border-yellow-500/50";
      percent = 50 + ((value - 25) / (30 - 25)) * 25;
    } else {
      text = "Obese";
      border = "#ef4444";
      bgClass = "bg-red-500/20";
      textClass = "text-red-400 border-red-500/50";
      percent = 75 + ((value - 30) / 10) * 25;
    }

    if (percent < 0) percent = 0;
    if (percent > 100) percent = 100;

    setStatusText(text);
    setColorInfo({ border, bgClass, textClass });
    setNeedlePercent(percent);

    // Ideal Weight Range Calculation
    let idealMin, idealMax;
    if (isMetric) {
      idealMin = (18.5 * height * height).toFixed(1);
      idealMax = (24.9 * height * height).toFixed(1);
      setIdealWeightText(`${idealMin} - ${idealMax} kg`);

      if (value < 18.5) {
        const diff = (idealMin - weight).toFixed(1);
        setActionPlanText(`Gain ${diff} kg`);
        setActionPlanClass("font-bold text-blue-400");
      } else if (value >= 25) {
        const diff = (weight - idealMax).toFixed(1);
        setActionPlanText(`Lose ${diff} kg`);
        setActionPlanClass(value >= 30 ? "font-bold text-red-400" : "font-bold text-yellow-400");
      } else {
        setActionPlanText("Maintain Weight! 🎉");
        setActionPlanClass("font-bold text-green-400");
      }
    } else {
      idealMin = ((18.5 * height * height) / 703).toFixed(1);
      idealMax = ((24.9 * height * height) / 703).toFixed(1);
      setIdealWeightText(`${idealMin} - ${idealMax} lbs`);

      if (value < 18.5) {
        const diff = (idealMin - weight).toFixed(1);
        setActionPlanText(`Gain ${diff} lbs`);
        setActionPlanClass("font-bold text-blue-400");
      } else if (value >= 25) {
        const diff = (weight - idealMax).toFixed(1);
        setActionPlanText(`Lose ${diff} lbs`);
        setActionPlanClass(value >= 30 ? "font-bold text-red-400" : "font-bold text-yellow-400");
      } else {
        setActionPlanText("Maintain Weight! 🎉");
        setActionPlanClass("font-bold text-green-400");
      }
    }
  };

  const resetUI = () => {
    setStatusText('Awaiting Input');
    setNeedlePercent(0);
    setColorInfo({ border: 'transparent', bgClass: '', textClass: 'bg-gray-500/20 text-gray-400 border-transparent' });
    setIdealWeightText('--');
    setActionPlanText('--');
  };

  const handleCopyStats = () => {
    if (!bmi) return;
    const copyText = `My BMI Stats:\nBMI: ${bmi}\nStatus: ${statusText}\nIdeal Weight: ${idealWeightText}\nAction Plan: ${actionPlanText}`;
    navigator.clipboard.writeText(copyText).then(() => {
      alert("BMI Stats copied to clipboard!");
    });
  };

  return (
    <main className="w-full max-w-7xl mx-auto flex-grow flex flex-col px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 sm:mb-3" style={{ color: 'var(--text-main)' }}>
          BMI Calculator <span className="text-indigo-500">Pro</span>
        </h1>
        <p style={{ color: 'var(--text-muted)' }} className="font-medium text-lg mb-1">
          Calculate your Body Mass Index interactively.
        </p>
        <p style={{ color: 'var(--text-muted)' }} className="text-sm">
          Developed by{' '}
          <a href="/" className="font-bold hover:underline" style={{ color: 'var(--primary-color)' }}>
            Mehedi Hasan Shihab
          </a>
          .
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
        {/* Left Parameter Panel */}
        <div className="sshihabb007-glass p-5 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
              <i className="fas fa-sliders-h text-indigo-500"></i> Parameters
            </h2>

            {/* Toggle Units */}
            <div className="flex gap-2 mb-8 bg-zinc-800/20 p-1 rounded-xl border" style={{ borderColor: 'var(--border-color)' }}>
              <button 
                onClick={() => setMode('metric')}
                className={`flex-1 py-2.5 rounded-lg font-bold transition-all ${mode === 'metric' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-200'}`}
              >
                Metric
              </button>
              <button 
                onClick={() => setMode('imperial')}
                className={`flex-1 py-2.5 rounded-lg font-bold transition-all ${mode === 'imperial' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-200'}`}
              >
                Imperial
              </button>
            </div>

            {/* Inputs based on Mode */}
            {mode === 'metric' ? (
              <div id="shihab_metricInputs" className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                    Weight (kg)
                  </label>
                  <input 
                    type="number" 
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    placeholder="e.g. 70" 
                    className="w-full p-4 rounded-xl mehedi-input font-bold text-lg" 
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="flex justify-between items-center text-sm font-semibold mb-2 uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                    <span>Height</span>
                    <select 
                      value={metricHeightUnit}
                      onChange={(e) => setMetricHeightUnit(e.target.value)}
                      className="bg-transparent text-indigo-500 font-bold outline-none cursor-pointer text-xs focus:ring-0"
                    >
                      <option value="cm">CM</option>
                      <option value="ft">FT &amp; IN</option>
                    </select>
                  </label>
                  {metricHeightUnit === 'cm' ? (
                    <input 
                      type="number" 
                      value={heightCm}
                      onChange={(e) => setHeightCm(e.target.value)}
                      placeholder="e.g. 175" 
                      className="w-full p-4 rounded-xl mehedi-input font-bold text-lg"
                    />
                  ) : (
                    <div id="shihab_metricHeightFtWrap" className="grid grid-cols-2 gap-4">
                      <input 
                        type="number" 
                        value={metricHeightFt}
                        onChange={(e) => setMetricHeightFt(e.target.value)}
                        placeholder="e.g. 5 (ft)" 
                        className="w-full p-4 rounded-xl mehedi-input font-bold text-lg"
                      />
                      <input 
                        type="number" 
                        value={metricHeightIn}
                        onChange={(e) => setMetricHeightIn(e.target.value)}
                        placeholder="e.g. 9 (in)" 
                        className="w-full p-4 rounded-xl mehedi-input font-bold text-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div id="shihab_imperialInputs" className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                    Weight (lbs)
                  </label>
                  <input 
                    type="number" 
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(e.target.value)}
                    placeholder="e.g. 154" 
                    className="w-full p-4 rounded-xl mehedi-input font-bold text-lg" 
                    step="0.1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                      Height (ft)
                    </label>
                    <input 
                      type="number" 
                      value={heightFt}
                      onChange={(e) => setHeightFt(e.target.value)}
                      placeholder="e.g. 5" 
                      className="w-full p-4 rounded-xl mehedi-input font-bold text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                      Height (in)
                    </label>
                    <input 
                      type="number" 
                      value={heightIn}
                      onChange={(e) => setHeightIn(e.target.value)}
                      placeholder="e.g. 9" 
                      className="w-full p-4 rounded-xl mehedi-input font-bold text-lg"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <button 
              onClick={handleSaveResult}
              disabled={!bmi}
              className="w-full bg-zinc-700/50 hover:bg-zinc-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="fas fa-bookmark text-indigo-400"></i>{' '}
              {saveStatus === 'saved' ? 'Saved to History!' : 'Save Result to History'}
            </button>
          </div>
        </div>

        {/* Right Result Panel */}
        <div className="flex flex-col gap-6">
          <div className="sshihabb007-glass p-5 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-center items-center text-center relative overflow-hidden h-full">
            <div 
              className="absolute top-0 left-0 w-full h-2 transition-all duration-300" 
              style={{ backgroundColor: colorInfo.border || 'gray' }}
            ></div>

            {bmi && (
              <button 
                onClick={handleCopyStats}
                className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white rounded-lg px-3 py-1.5 text-xs font-bold backdrop-blur-sm transition-colors shadow flex items-center gap-1.5 z-10"
                title="Copy BMI Stats"
              >
                <i className="fas fa-copy"></i> Copy Stats
              </button>
            )}

            <h2 className="text-sm font-bold uppercase tracking-widest mb-4 mt-2" style={{ color: 'var(--text-muted)' }}>
              Your BMI Score
            </h2>

            <div 
              className="text-6xl sm:text-8xl font-black mb-2 transition-all duration-300"
              style={{ color: colorInfo.border || 'var(--text-main)' }}
            >
              {bmi || '--.-'}
            </div>

            <div className={`mt-2 px-6 py-2 rounded-full font-bold text-sm transition-colors duration-300 uppercase tracking-wide border ${colorInfo.textClass}`}>
              {statusText}
            </div>

            {/* Gauge */}
            <div className="w-full px-4 mt-8 mb-4">
              <div className="shihab-gauge-container">
                <div 
                  className="shihab-needle" 
                  style={{ left: `${needlePercent}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mt-3" style={{ color: 'var(--text-muted)' }}>
                <span className="text-blue-400">Under</span>
                <span className="text-green-400">Healthy</span>
                <span className="text-yellow-400">Over</span>
                <span className="text-red-400">Obese</span>
              </div>
            </div>
          </div>

          {/* Insights */}
          {bmi && (
            <div className="sshihabb007-glass p-6 rounded-3xl shadow-xl">
              <h3 className="font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                <i className="fas fa-lightbulb text-yellow-400"></i> Health Insights
              </h3>
              <div className="space-y-4 text-sm font-medium" style={{ color: 'var(--text-main)' }}>
                <div className="flex justify-between items-center p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/50">
                  <span className="text-zinc-400">Ideal Weight Range:</span>
                  <span className="font-bold text-indigo-400">{idealWeightText}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/50">
                  <span className="text-zinc-400">Action Plan:</span>
                  <span className={actionPlanClass}>{actionPlanText}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* History List */}
      {history.length > 0 && (
        <div className="max-w-5xl mx-auto w-full mt-8 sshihabb007-glass rounded-3xl shadow-xl overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center" style={{ borderColor: 'var(--border-color)' }}>
            <h3 className="font-bold uppercase tracking-widest text-sm flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
              <i className="fas fa-history text-indigo-500"></i> Recent Checks
            </h3>
            <button 
              onClick={handleClearHistory}
              className="text-xs text-red-400 hover:text-red-300 font-bold transition-colors"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-col">
            {history.map((item, idx) => (
              <div key={idx} className="sshihabb007-history-item">
                <div>
                  <span className="font-bold text-indigo-400 text-lg mr-2">{item.bmi}</span>
                  <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{item.status}</span>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-sm font-semibold" style={{ color: 'var(--text-main)' }}>{item.weight}</div>
                  <div className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
