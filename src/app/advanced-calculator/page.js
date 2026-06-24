'use client';

import React, { useEffect, useState, useRef } from 'react';
import Script from 'next/script';

export default function AdvancedCalculator() {
  const [scriptsLoaded, setScriptsLoaded] = useState({
    jquery: false,
    mathquill: false,
    math: false,
    nerdamer: false,
    algebra: false,
    calculus: false,
    solve: false
  });
  const [activeTab, setActiveTab] = useState('scientific');
  const [format, setFormat] = useState('DECIMAL');
  const [degRad, setDegRad] = useState('RAD');
  const [showScientific, setShowScientific] = useState(false);
  const [liveResult, setLiveResult] = useState('0');
  const [errorVisible, setErrorVisible] = useState(false);
  
  const mathInputRef = useRef(null);
  const mathFieldRef = useRef(null);
  const calcEngineRef = useRef(null);
  const lastValidResultRef = useRef('0');

  const allLoaded = 
    scriptsLoaded.jquery && 
    scriptsLoaded.mathquill && 
    scriptsLoaded.math && 
    scriptsLoaded.nerdamer &&
    scriptsLoaded.algebra &&
    scriptsLoaded.calculus &&
    scriptsLoaded.solve;

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
        await loadScript('/advanced-calculator/vendor/jquery.min.js', 'jQuery');
        setScriptsLoaded(prev => ({ ...prev, jquery: true }));

        await loadScript('/advanced-calculator/vendor/mathquill/mathquill.js', 'MathQuill');
        setScriptsLoaded(prev => ({ ...prev, mathquill: true }));

        await loadScript('/advanced-calculator/vendor/math.js', 'math');
        setScriptsLoaded(prev => ({ ...prev, math: true }));

        await loadScript('/advanced-calculator/vendor/nerdamer/nerdamer.core.js', 'nerdamer');
        setScriptsLoaded(prev => ({ ...prev, nerdamer: true }));

        await loadScript('/advanced-calculator/vendor/nerdamer/Algebra.js');
        setScriptsLoaded(prev => ({ ...prev, algebra: true }));

        await loadScript('/advanced-calculator/vendor/nerdamer/Calculus.js');
        setScriptsLoaded(prev => ({ ...prev, calculus: true }));

        await loadScript('/advanced-calculator/vendor/nerdamer/Solve.js');
        setScriptsLoaded(prev => ({ ...prev, solve: true }));
      } catch (e) {
        console.error('Failed to load scripts:', e);
      }
    }

    loadAll();
  }, []);

  useEffect(() => {
    if (!allLoaded) return;

    // Define AetherCalc class
    class AetherCalc {
      constructor() {
        this.history = [];
        this.variables = { x: 0, y: 0, Ans: 0 };
        this.precision = 64;
        
        window.math.config({
          number: 'BigNumber',
          precision: this.precision
        });

        this.constants = {
          'c': { val: 299792458, name: 'Speed of Light', unit: 'm/s' },
          'G': { val: 6.67430e-11, name: 'Gravitational Const', unit: 'm³/kg·s²' },
          'h': { val: 6.62607015e-34, name: 'Planck Const', unit: 'J·s' },
          'e_charge': { val: 1.602176634e-19, name: 'Elementary Charge', unit: 'C' },
          'm_e': { val: 9.1093837015e-31, name: 'Electron Mass', unit: 'kg' },
          'N_A': { val: 6.02214076e23, name: 'Avogadro Const', unit: 'mol⁻¹' },
          'k_B': { val: 1.380649e-23, name: 'Boltzmann Const', unit: 'J/K' },
          'R': { val: 8.314462618, name: 'Gas Const', unit: 'J/(mol·K)' },
        };
      }

      evaluate(exprStr) {
        try {
          if (exprStr.startsWith('derive(') || exprStr.startsWith('integrate(') || exprStr.startsWith('solve(')) {
            let res = window.nerdamer(exprStr).evaluate();
            let ans = res.text();
            this.variables.Ans = ans;
            return ans;
          }
          let result = window.math.evaluate(exprStr, this.variables);
          let formatted = window.math.format(result, { precision: 14 });
          this.variables.Ans = result;
          return formatted;
        } catch (e) {
          throw new Error("Invalid Expression");
        }
      }
    }

    calcEngineRef.current = new AetherCalc();

    // Initialize MathQuill Input
    const MQ = window.MathQuill.getInterface(2);
    const mathInputSpan = mathInputRef.current;
    
    if (mathInputSpan) {
      mathFieldRef.current = MQ.MathField(mathInputSpan, {
        spaceBehavesLikeTab: true,
        substituteTextarea: function() {
          const ta = document.createElement('textarea');
          ta.setAttribute('autocapitalize', 'off');
          ta.setAttribute('autocomplete', 'off');
          ta.setAttribute('autocorrect', 'off');
          ta.setAttribute('spellcheck', 'false');
          ta.setAttribute('inputmode', 'none'); // Disables virtual keyboard
          return ta;
        },
        handlers: {
          edit: function() {
            updateLiveResult();
          },
          enter: function() {
            commitCalculation();
          }
        }
      });

      // Force inputmode="none" on the generated textarea
      const mqTextarea = mathInputSpan.querySelector('textarea');
      if (mqTextarea) {
        mqTextarea.setAttribute('inputmode', 'none');
      }

      mathFieldRef.current.focus();
    }

    const updateLiveResult = () => {
      if (!mathFieldRef.current || !calcEngineRef.current) return;
      const rawText = mathFieldRef.current.text();
      if (!rawText.trim()) {
        setLiveResult('0');
        setErrorVisible(false);
        lastValidResultRef.current = '0';
        return;
      }

      try {
        let expr = rawText.replace(/\\cdot/g, '*');
        let result = calcEngineRef.current.evaluate(expr);
        setLiveResult("= " + result);
        lastValidResultRef.current = "= " + result;
        setErrorVisible(false);
      } catch (e) {
        setLiveResult(lastValidResultRef.current);
        setErrorVisible(false);
      }
    };

    const commitCalculation = () => {
      if (!mathFieldRef.current || !calcEngineRef.current) return;
      const rawText = mathFieldRef.current.text();
      if (!rawText.trim()) return;

      try {
        let expr = rawText.replace(/\\cdot/g, '*');
        let result = calcEngineRef.current.evaluate(expr);
        mathFieldRef.current.latex(result.toString());
      } catch (e) {
        setErrorVisible(true);
        setTimeout(() => setErrorVisible(false), 2000);
      }
    };

    // Global keyboard numpad support
    const handleKeyDown = (e) => {
      if (!e.ctrlKey && !e.metaKey && !e.altKey && e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      const isMqFocused = document.activeElement && (document.activeElement.tagName === 'TEXTAREA' || document.activeElement.tagName === 'INPUT');
      const key = e.key;
      let cmd = '';
      if (key >= '0' && key <= '9') cmd = key;
      else if (key === '.') cmd = '.';
      else if (key === '+') cmd = '+';
      else if (key === '-') cmd = '-';
      else if (key === '*' || key === 'x') cmd = '*';
      else if (key === '/') cmd = '/';
      else if (key === '(') cmd = '(';
      else if (key === ')') cmd = ')';
      else if (key === '^') cmd = '^';
      else if (key === '%') cmd = '%';
      else if (key === 'Enter' || key === '=') cmd = '=';
      else if (key === 'Backspace') cmd = 'backspace';
      else if (key === 'Escape') cmd = 'clear';

      if (cmd) {
        if (!isMqFocused && mathFieldRef.current) {
          e.preventDefault();
          mathFieldRef.current.focus();
          handleKeypad(cmd);
        } else if (key === 'Escape') {
          e.preventDefault();
          handleKeypad('clear');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [allLoaded]);

  const handleKeypad = (cmd) => {
    if (!mathFieldRef.current) return;
    const field = mathFieldRef.current;

    switch(cmd) {
      case 'clear':
        field.latex('');
        break;
      case 'backspace':
        field.keystroke('Backspace');
        break;
      case '=':
        if (calcEngineRef.current) {
          const rawText = field.text();
          if (!rawText.trim()) return;
          try {
            let expr = rawText.replace(/\\cdot/g, '*');
            let result = calcEngineRef.current.evaluate(expr);
            field.latex(result.toString());
          } catch (e) {
            setErrorVisible(true);
            setTimeout(() => setErrorVisible(false), 2000);
          }
        }
        break;
      case 'sin':
      case 'cos':
      case 'tan':
      case 'log':
      case 'ln':
        field.cmd(cmd);
        field.cmd('(');
        break;
      case 'sqrt':
        field.cmd('\\sqrt');
        break;
      case '^':
        field.cmd('^');
        break;
      case 'pi':
        field.write('\\pi');
        break;
      case 'derive':
        field.write('derive(');
        break;
      case 'integrate':
        field.write('integrate(');
        break;
      default:
        field.write(cmd);
        break;
    }
    field.focus();
  };

  const toggleFormat = () => {
    const nextFormat = format === 'DECIMAL' ? 'EXACT (FRACTION)' : 'DECIMAL';
    setFormat(nextFormat);
    // Trigger update (handled inside useEffect updateLiveResult if we bind format state, but for simplicty we evaluate)
    if (mathFieldRef.current && calcEngineRef.current) {
      const rawText = mathFieldRef.current.text();
      if (!rawText.trim()) return;
      try {
        let expr = rawText.replace(/\\cdot/g, '*');
        let result = calcEngineRef.current.evaluate(expr);
        setLiveResult("= " + result);
      } catch (e) {}
    }
  };

  return (
    <>
      {/* Vendor CSS */}
      <link rel="stylesheet" href="/advanced-calculator/vendor/mathquill/mathquill.css" />

      {/* Script Loaders handled in useEffect */}

      <main className="w-full max-w-7xl mx-auto flex-grow px-4 py-4 md:py-8 flex flex-col space-y-4 md:space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-1 md:space-y-2 mb-2 md:mb-4" data-aos="fade-down">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Advanced Scientific Calculator
          </h1>
          <p className="font-medium text-txtmuted hidden md:block">
            High-precision computational engine developed by <a href="/" className="text-primary hover:underline font-semibold">MEHEDI HASAN SHIHAB</a>
          </p>
        </div>

        {/* Main Calculator Layout */}
        <div className="flex-grow flex justify-center w-full">
          
          {/* Main Calculator Area */}
          <div className="w-full max-w-3xl flex flex-col space-y-6">
            
            {/* Display Shell */}
            <div className="glass-panel p-4 md:p-5 flex flex-col justify-end min-h-[110px] md:min-h-[130px] relative shadow-glass overflow-hidden" data-aos="zoom-in">
              {/* Format Toggle */}
              <div className="absolute top-2.5 left-3 flex space-x-2 z-10">
                <button 
                  onClick={toggleFormat}
                  className="text-[10px] px-2.5 py-0.5 rounded-full border border-brd bg-hover text-txtmuted hover:text-primary hover:border-primary transition" 
                  title="Toggle Exact/Decimal Format"
                >
                  {format}
                </button>
              </div>
              <div className="absolute top-2.5 right-3 flex space-x-2 z-10">
                <button 
                  onClick={() => setDegRad(degRad === 'RAD' ? 'DEG' : 'RAD')}
                  className="text-[10px] px-2.5 py-0.5 rounded-full border border-brd bg-hover text-txtmuted hover:text-primary hover:border-primary transition"
                >
                  {degRad}
                </button>
              </div>

              {/* Input MathQuill Container */}
              <div className="w-full overflow-x-auto custom-scroll pb-1 mt-6">
                <span ref={mathInputRef} id="mehedi_mathInput"></span>
              </div>

              {/* Live Result / Error Output */}
              <div className="w-full flex justify-between items-end mt-1.5 pt-1.5 border-t border-brd">
                <div 
                  id="sshihabb007_errorBox" 
                  className={`text-red-500 text-xs font-medium transition-opacity ${errorVisible ? 'opacity-100' : 'opacity-0'}`}
                >
                  Error: Invalid Expression
                </div>
                <div id="shihab_liveResult" className="text-2xl font-bold text-primary truncate max-w-[70%]">
                  {liveResult}
                </div>
              </div>
            </div>

            {/* Active Workspaces */}
            <div className="relative flex-grow">
              
              {/* Scientific Keypad Workspace */}
              <div id="mehedi_ws_scientific" className="workspace-panel glass-panel p-4 md:p-6 transition-opacity duration-300">
                
                {/* Toggle Scientific Button */}
                <div className="flex justify-end mb-3">
                  <button 
                    onClick={() => setShowScientific(!showScientific)}
                    className={`text-[10px] md:text-xs px-3 py-1 rounded-full border border-brd bg-hover text-txtmuted hover:text-primary hover:border-primary transition flex items-center shadow-sm ${showScientific ? 'border-primary text-primary' : ''}`}
                  >
                    <i className={`fas ${showScientific ? 'fa-chevron-up' : 'fa-chevron-down'} mr-1.5`}></i> Scientific
                  </button>
                </div>

                {/* Advanced Math Pad (Hidden by Default) */}
                <div 
                  id="mehedi_advancedMathPad" 
                  className={`${showScientific ? 'grid' : 'hidden'} grid-cols-4 md:grid-cols-6 gap-2 mb-4 transition-all duration-300`}
                >
                  {['sin', 'cos', 'tan', 'log', 'ln', 'Ans', 'pi', 'e', 'sqrt', '^', '!', 'derive', '(', ')', '%', 'x', 'y', 'integrate'].map((c) => (
                    <button 
                      key={c}
                      onClick={() => handleKeypad(c === 'π' ? 'pi' : c === 'x^y' ? '^' : c === 'x!' ? '!' : c === 'd/dx' ? 'derive' : c === '∫' ? 'integrate' : c)}
                      className={`calc-btn calc-btn-secondary py-2 text-sm ${(c === 'Ans' || c === 'derive' || c === 'y' || c === 'integrate') ? 'hidden md:flex' : ''}`}
                    >
                      {c === 'pi' ? 'π' : c === 'sqrt' ? '√' : c === 'Ans' ? 'Ans' : c === '^' ? 'x^y' : c === '!' ? 'x!' : c === 'derive' ? 'd/dx' : c === 'integrate' ? '∫' : c}
                    </button>
                  ))}
                </div>

                {/* Numeric Pad */}
                <div className="grid grid-cols-4 gap-2 md:gap-3">
                  <button onClick={() => handleKeypad('clear')} className="calc-btn calc-btn-secondary py-3 md:py-4 font-semibold" style={{ color: '#ef4444' }}>AC</button>
                  <button onClick={() => handleKeypad('backspace')} className="calc-btn calc-btn-secondary py-3 md:py-4" style={{ color: '#f59e0b' }}><i className="fas fa-backspace"></i></button>
                  <button onClick={() => handleKeypad('store')} className="calc-btn calc-btn-secondary py-3 md:py-4 font-semibold text-sm">Store</button>
                  <button onClick={() => handleKeypad('/')} className="calc-btn calc-btn-secondary py-3 md:py-4 text-xl">÷</button>

                  <button onClick={() => handleKeypad('7')} className="calc-btn py-3 md:py-4 text-xl font-bold">7</button>
                  <button onClick={() => handleKeypad('8')} className="calc-btn py-3 md:py-4 text-xl font-bold">8</button>
                  <button onClick={() => handleKeypad('9')} className="calc-btn py-3 md:py-4 text-xl font-bold">9</button>
                  <button onClick={() => handleKeypad('*')} className="calc-btn calc-btn-secondary py-3 md:py-4 text-xl">×</button>

                  <button onClick={() => handleKeypad('4')} className="calc-btn py-3 md:py-4 text-xl font-bold">4</button>
                  <button onClick={() => handleKeypad('5')} className="calc-btn py-3 md:py-4 text-xl font-bold">5</button>
                  <button onClick={() => handleKeypad('6')} className="calc-btn py-3 md:py-4 text-xl font-bold">6</button>
                  <button onClick={() => handleKeypad('-')} className="calc-btn calc-btn-secondary py-3 md:py-4 text-xl">−</button>

                  <button onClick={() => handleKeypad('1')} className="calc-btn py-3 md:py-4 text-xl font-bold">1</button>
                  <button onClick={() => handleKeypad('2')} className="calc-btn py-3 md:py-4 text-xl font-bold">2</button>
                  <button onClick={() => handleKeypad('3')} className="calc-btn py-3 md:py-4 text-xl font-bold">3</button>
                  <button onClick={() => handleKeypad('+')} className="calc-btn calc-btn-secondary py-3 md:py-4 text-xl">+</button>

                  <button onClick={() => handleKeypad('0')} className="calc-btn py-3 md:py-4 text-xl font-bold col-span-2">0</button>
                  <button onClick={() => handleKeypad('.')} className="calc-btn py-3 md:py-4 text-xl font-bold">.</button>
                  <button onClick={() => handleKeypad('=')} className="calc-btn calc-btn-primary py-3 md:py-4 text-2xl">=</button>
                </div>
              </div>

            </div>
          </div>

        </div>
        
        {/* Mobile Subtitle (Bottom) */}
        <div className="text-center mt-2 md:hidden">
          <p className="font-medium text-txtmuted text-sm">
            High-precision computational engine developed by <a href="/" className="text-primary hover:underline font-semibold">MEHEDI HASAN SHIHAB</a>
          </p>
        </div>
      </main>
    </>
  );
}
