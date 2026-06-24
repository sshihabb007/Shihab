'use client';

import React, { useState, useEffect } from 'react';

const bd_slabs = [
  { limit: 75, rate: 5.26 },
  { limit: 200, rate: 7.20 },
  { limit: 300, rate: 7.59 },
  { limit: 400, rate: 8.02 },
  { limit: 600, rate: 12.67 },
  { limit: Infinity, rate: 14.61 }
];
const demand_charge = 42;
const vat = 0.05;

export default function PowerCalculator() {
  const [cpuWatts, setCpuWatts] = useState('65');
  const [gpuWatts, setGpuWatts] = useState('160');
  const [periWatts, setPeriWatts] = useState('50');
  const [monitorWatts, setMonitorWatts] = useState('35');
  const [hours, setHours] = useState(8);
  const [region, setRegion] = useState('BD');
  const [customRate, setCustomRate] = useState('0.15');

  // Outputs
  const [totalWatts, setTotalWatts] = useState(0);
  const [monthlyKwh, setMonthlyKwh] = useState(0);
  const [finalCost, setFinalCost] = useState('0');
  const [currencySymbol, setCurrencySymbol] = useState('৳');
  const [tierBreakdown, setTierBreakdown] = useState([]);
  const [upsVaNeeded, setUpsVaNeeded] = useState('0 VA');
  const [upsModel, setUpsModel] = useState('');
  const [upsDesc, setUpsDesc] = useState('');
  const [upsStress, setUpsStress] = useState('Low');
  const [upsStressColor, setUpsStressColor] = useState('bg-green-500');
  const [upsStressPct, setUpsStressPct] = useState(0);
  const [psuLoadPct, setPsuLoadPct] = useState(0);

  useEffect(() => {
    const cpu = parseFloat(cpuWatts) || 0;
    const gpu = parseFloat(gpuWatts) || 0;
    const peri = parseFloat(periWatts) || 0;
    const mon = parseFloat(monitorWatts) || 0;

    const totalW = cpu + gpu + peri + mon;
    const dailyKwh = (totalW * hours) / 1000;
    const mKwh = dailyKwh * 30;

    setTotalWatts(totalW);
    setMonthlyKwh(mKwh);

    let cost = 0;
    let breakdown = [];
    if (region === 'BD') {
      setCurrencySymbol('৳');
      let remainingKwh = mKwh;
      let prevLimit = 0;

      bd_slabs.forEach((slab) => {
        const range = slab.limit - prevLimit;
        const unitsInSlab = Math.min(remainingKwh, range);
        if (unitsInSlab > 0) {
          const slabCost = unitsInSlab * slab.rate;
          cost += slabCost;
          breakdown.push({
            label: `${slab.limit === Infinity ? '600+' : slab.limit} Unit Slab (@${slab.rate})`,
            cost: slabCost.toFixed(2)
          });
          remainingKwh -= unitsInSlab;
        }
        prevLimit = slab.limit;
      });

      cost += demand_charge;
      cost = cost * (1 + vat);
    } else {
      setCurrencySymbol('$');
      const rate = parseFloat(customRate) || 0;
      cost = mKwh * rate;
    }

    setFinalCost(cost.toLocaleString(undefined, { maximumFractionDigits: 2 }));
    setTierBreakdown(breakdown);

    // UPS SUGGESTION LOGIC
    const vaRaw = (totalW / 0.7) * 1.25;
    setUpsVaNeeded(`${Math.round(vaRaw)} VA`);

    let model = '';
    let desc = '';
    let stress = 'Low';
    let color = 'bg-green-500';

    if (vaRaw <= 650) {
      model = '650VA Standard';
      desc = 'Perfect for this build. A standard 650VA UPS will give you enough time to save work and shut down properly.';
    } else if (vaRaw <= 1200) {
      model = '1200VA Pro';
      desc = 'Your power draw is substantial. A 1200VA unit is highly recommended for stability and longer backup.';
      stress = 'Moderate';
      color = 'bg-yellow-500';
    } else {
      model = '2000VA Online UPS';
      desc = 'High performance detected! You need a 2KVA system to handle the surge and maintain sine wave purity.';
      stress = 'High';
      color = 'bg-red-500';
    }

    setUpsModel(model);
    setUpsDesc(desc);
    setUpsStress(stress);
    setUpsStressColor(color);

    const stressPercent = Math.min((vaRaw / 2000) * 100, 100);
    setUpsStressPct(stressPercent);

    const psuLoad = Math.min((totalW / 650) * 100, 100); // Assuming average 650W PSU
    setPsuLoadPct(psuLoad);
  }, [cpuWatts, gpuWatts, periWatts, monitorWatts, hours, region, customRate]);

  return (
    <main className="w-full max-w-7xl mx-auto flex-grow flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-6xl mx-auto w-full">
        <header 
          className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-6"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>
              PC Power <span className="sshihab007-accent">Calculator Pro</span>
            </h1>
            <p style={{ color: 'var(--text-muted)' }} className="mt-1">
              Advanced Energy Analytics & UPS Advisor
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-left md:text-right">
            <p className="text-sm font-medium" style={{ color: 'var(--text-main)' }}>
              Developer: <span className="sshihab007-accent font-bold" style={{ color: 'var(--primary-color)' }}>MEHEDI HASAN SHIHAB</span>
            </p>
            <a 
              href="mailto:sshihabb007@gmail.com" 
              className="text-xs transition hover:underline"
              style={{ color: 'var(--text-muted)' }}
            >
              sshihabb007@gmail.com
            </a>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <section 
              className="sshihab007-glass rounded-2xl p-6"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}
            >
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                <svg className="w-5 h-5" style={{ color: 'var(--primary-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                Core Components
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                    CPU (e.g., Ryzen 7 7700)
                  </label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="number" 
                      value={cpuWatts}
                      onChange={(e) => setCpuWatts(e.target.value)}
                      className="rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-sky-500 outline-none"
                      style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}
                    />
                    <span className="text-sm w-12" style={{ color: 'var(--text-muted)' }}>W</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                    GPU (e.g., RTX 5060 Ti)
                  </label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="number" 
                      value={gpuWatts}
                      onChange={(e) => setGpuWatts(e.target.value)}
                      className="rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-sky-500 outline-none"
                      style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}
                    />
                    <span className="text-sm w-12" style={{ color: 'var(--text-muted)' }}>W</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                    Others (Fans, RAM, SSD, RGB)
                  </label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="number" 
                      value={periWatts}
                      onChange={(e) => setPeriWatts(e.target.value)}
                      className="rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-sky-500 outline-none"
                      style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}
                    />
                    <span className="text-sm w-12" style={{ color: 'var(--text-muted)' }}>W</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                    Monitor
                  </label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="number" 
                      value={monitorWatts}
                      onChange={(e) => setMonitorWatts(e.target.value)}
                      className="rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-sky-500 outline-none"
                      style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}
                    />
                    <span className="text-sm w-12" style={{ color: 'var(--text-muted)' }}>W</span>
                  </div>
                </div>
              </div>
            </section>

            <section 
              className="sshihab007-glass rounded-2xl p-6"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}
            >
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                <svg className="w-5 h-5" style={{ color: 'var(--primary-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Usage & Cost Setup
              </h2>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                    <span>Daily Usage</span>
                    <span className="font-semibold" style={{ color: 'var(--primary-color)' }}>{hours} Hours</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="24" 
                    value={hours}
                    onChange={(e) => setHours(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500 hover:accent-sky-400 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                    Calculation Mode
                  </label>
                  <select 
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-sky-500 outline-none border cursor-pointer"
                    style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                  >
                    <option value="BD">Bangladesh (Tiered Tariff)</option>
                    <option value="Global">Custom Global (Flat Rate)</option>
                  </select>
                </div>

                {region === 'Global' && (
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                      Rate per kWh
                    </label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="number" 
                        value={customRate}
                        step="0.01"
                        onChange={(e) => setCustomRate(e.target.value)}
                        className="rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-sky-500 outline-none border"
                        style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                      />
                      <span className="text-sm w-12" style={{ color: 'var(--text-muted)' }}>USD</span>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                className="sshihab007-glass p-6 rounded-2xl border-l-4 border-sky-500"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}
              >
                <p className="text-xs uppercase font-bold" style={{ color: 'var(--text-muted)' }}>Total Draw</p>
                <h3 className="text-3xl font-mono font-bold mt-1" style={{ color: 'var(--text-main)' }}>
                  {totalWatts}
                  <span className="text-lg ml-1 font-normal" style={{ color: 'var(--text-muted)' }}>W</span>
                </h3>
              </div>
              <div 
                className="sshihab007-glass p-6 rounded-2xl border-l-4 border-orange-500"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}
              >
                <p className="text-xs uppercase font-bold" style={{ color: 'var(--text-muted)' }}>Monthly Units</p>
                <h3 className="text-3xl font-mono font-bold mt-1" style={{ color: 'var(--text-main)' }}>
                  {monthlyKwh.toFixed(2)}
                  <span className="text-lg ml-1 font-normal" style={{ color: 'var(--text-muted)' }}>kWh</span>
                </h3>
              </div>
              <div 
                className="sshihab007-glass p-6 rounded-2xl border-l-4 border-green-500"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}
              >
                <p className="text-xs uppercase font-bold" style={{ color: 'var(--text-muted)' }}>Estimated Cost</p>
                <h3 className="text-3xl font-mono font-bold mt-1" style={{ color: 'var(--text-main)' }}>
                  {finalCost}
                  <span className="text-lg ml-1 font-normal" style={{ color: 'var(--text-muted)' }}>{currencySymbol}</span>
                </h3>
              </div>
            </div>

            <div 
              className="sshihab007-glass rounded-2xl overflow-hidden"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}
            >
              <div className="bg-slate-800/50 p-4 border-b flex justify-between items-center" style={{ borderColor: 'var(--border-color)' }}>
                <h2 className="font-semibold flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  Professional UPS Advisor
                </h2>
                <span className="px-3 py-1 bg-sky-500/20 text-sky-400 text-xs rounded-full font-bold uppercase">
                  {upsVaNeeded}
                </span>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-full md:w-1/2">
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                      {upsDesc}
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span style={{ color: 'var(--text-muted)' }}>Suggested Rating:</span>
                        <span className="font-bold text-sky-400">{upsModel}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span style={{ color: 'var(--text-muted)' }}>Estimated Backup:</span>
                        <span style={{ color: 'var(--text-main)' }}>10-15 Mins</span>
                      </div>
                    </div>
                  </div>
                  <div 
                    className="w-full md:w-1/2 rounded-xl p-4 border"
                    style={{ backgroundColor: 'var(--bg-hover)', borderColor: 'var(--border-color)' }}
                  >
                    <p className="text-[10px] uppercase mb-3 font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>
                      Efficiency Breakdown
                    </p>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-[11px] mb-1" style={{ color: 'var(--text-main)' }}>
                          <span>PSU Load Factor</span>
                          <span>{Math.round(psuLoadPct)}%</span>
                        </div>
                        <div className="w-full bg-slate-700 h-1.5 rounded-full">
                          <div 
                            className="bg-sky-500 h-full rounded-full transition-all duration-500" 
                            style={{ width: `${psuLoadPct}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[11px] mb-1" style={{ color: 'var(--text-main)' }}>
                          <span>UPS Thermal Stress</span>
                          <span>{upsStress}</span>
                        </div>
                        <div className="w-full bg-slate-700 h-1.5 rounded-full">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${upsStressColor}`} 
                            style={{ width: `${upsStressPct}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                className="sshihab007-glass p-6 rounded-2xl"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}
              >
                <h4 className="text-sm font-bold uppercase mb-4" style={{ color: 'var(--text-muted)' }}>
                  {region === 'BD' ? 'Bangladesh Tariff Breakdown' : 'Global Cost Mode'}
                </h4>
                {region === 'BD' ? (
                  <div className="space-y-2 text-sm" style={{ color: 'var(--text-main)' }}>
                    {tierBreakdown.map((tier, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span style={{ color: 'var(--text-muted)' }}>{tier.label}</span>
                        <span className="font-semibold">৳{tier.cost}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    Global flat rate calculation active. Every unit consumed cost multiplied by rate.
                  </p>
                )}
                {region === 'BD' && (
                  <p className="mt-4 text-[10px] italic" style={{ color: 'var(--text-muted)' }}>
                    * Includes 5% VAT and estimated Demand Charges as per 2026 guidelines.
                  </p>
                )}
              </div>
              <div 
                className="sshihab007-glass p-6 rounded-2xl"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}
              >
                <h4 className="text-sm font-bold uppercase mb-4" style={{ color: 'var(--text-muted)' }}>
                  Pro Tips for <span style={{ color: 'var(--primary-color)' }}>@sshihab007</span>
                </h4>
                <ul className="text-xs space-y-3" style={{ color: 'var(--text-muted)' }}>
                  <li className="flex gap-2">
                    <span style={{ color: 'var(--primary-color)' }}><i className="fas fa-bolt mt-0.5"></i></span>
                    Undervolting your Ryzen 7 7700 can save ~15W with zero performance loss.
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: 'var(--primary-color)' }}><i className="fas fa-bolt mt-0.5"></i></span>
                    Always use a UPS with "Pure Sine Wave" for your RTX card's health.
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: 'var(--primary-color)' }}><i className="fas fa-bolt mt-0.5"></i></span>
                    Your monitor draws power even when the screen is black but on.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
