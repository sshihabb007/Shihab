/**
 * Advanced Scientific Calculator Logic
 * Developer: Mehedi Hasan Shihab
 */

// Initialize MathQuill
const MQ = MathQuill.getInterface(2);

class AetherCalc {
    constructor() {
        this.history = [];
        this.variables = { x: 0, y: 0, Ans: 0 };
        this.precision = 64;
        
        // Math.js configuration
        math.config({
            number: 'BigNumber',
            precision: this.precision
        });

        // Constants
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

    latexToMathJS(latex) {
        let expr = latex;
        // Basic replacements for Math.js compatibility
        expr = expr.replace(/\\cdot/g, '*');
        expr = expr.replace(/\\times/g, '*');
        expr = expr.replace(/\\div/g, '/');
        expr = expr.replace(/\\pi/g, 'pi');
        expr = expr.replace(/\\left/g, '');
        expr = expr.replace(/\\right/g, '');
        // Fractions \frac{a}{b} -> (a)/(b)
        // This is a naive regex. A robust one needs balanced parenthesis checking.
        // For simplicity in this demo, we let Nerdamer or Math.js handle simple text conversions if possible, 
        // but MathQuill's text() method is usually better than raw LaTeX for math.js!
        return expr;
    }

    evaluate(exprStr) {
        try {
            // First, see if it's a special Nerdamer command
            if (exprStr.startsWith('derive(') || exprStr.startsWith('integrate(') || exprStr.startsWith('solve(')) {
                let res = nerdamer(exprStr).evaluate();
                let ans = res.text();
                this.variables.Ans = ans;
                return ans;
            }
            // Otherwise use Math.js
            let result = math.evaluate(exprStr, this.variables);
            
            // Format result
            let formatted = math.format(result, { precision: 14 });
            this.variables.Ans = result;
            return formatted;
        } catch (e) {
            throw new Error("Invalid Expression");
        }
    }
}

// Global Scope Variables
const Mehedi_calcEngine = new AetherCalc();
let Shihab_mathField;
let sshihabb007_isExactFormat = false;
let Mehedi_isRadians = true;

// DOM Elements
const Shihab_liveResult = document.getElementById('shihab_liveResult');
const sshihabb007_errorBox = document.getElementById('sshihabb007_errorBox');
const Mehedi_historyList = document.getElementById('shihab_historyList');
const Shihab_variablesList = document.getElementById('shihab_variablesList');
const sshihabb007_constantsList = document.getElementById('sshihabb007_constantsList');

// API Hook for Agentic IDE
window.shihab_calculate = function(str) {
    try {
        return Mehedi_calcEngine.evaluate(str);
    } catch(e) {
        return "Error: " + e.message;
    }
};

document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize MathQuill Input
    const mathInputSpan = document.getElementById('mehedi_mathInput');
    Shihab_mathField = MQ.MathField(mathInputSpan, {
        spaceBehavesLikeTab: true,
        handlers: {
            edit: function() {
                Shihab_updateLiveResult();
            },
            enter: function() {
                Shihab_commitCalculation();
            }
        }
    });

    // 2. Populate Constants
    Object.entries(Mehedi_calcEngine.constants).forEach(([key, data]) => {
        const div = document.createElement('div');
        div.className = "flex justify-between items-center text-sm bg-dark p-2 rounded border border-brd cursor-pointer hover:border-primary";
        div.innerHTML = `<span class="font-bold text-primary">${key}</span><span class="text-xs text-txtmuted">${data.name}</span>`;
        div.onclick = () => {
            Shihab_mathField.write(key);
            Shihab_mathField.focus();
        };
        sshihabb007_constantsList.appendChild(div);
    });

    // 3. Keypad Bindings
    document.querySelectorAll('.calc-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cmd = e.currentTarget.getAttribute('data-cmd');
            if(!cmd) return;
            
            sshihabb007_handleKeypad(cmd);
        });
    });

    // Mode Switching Logic Removed (Only Scientific Mode Now)

    // 5. Format & Radian Toggles
    document.getElementById('shihab_formatBtn').addEventListener('click', (e) => {
        sshihabb007_isExactFormat = !sshihabb007_isExactFormat;
        e.currentTarget.textContent = sshihabb007_isExactFormat ? "EXACT (FRACTION)" : "DECIMAL";
        Shihab_updateLiveResult();
    });

    document.getElementById('shihab_degRadBtn').addEventListener('click', (e) => {
        Mehedi_isRadians = !Mehedi_isRadians;
        e.currentTarget.textContent = Mehedi_isRadians ? "RAD" : "DEG";
        // math.js angles handled globally via conversion if needed
    });

    // Graphing Logic Removed

    // 7. Global Keyboard Numpad Support
    document.addEventListener('keydown', (e) => {
        // Block all alphabet characters except if modifier key is pressed (for copy/paste)
        if (!e.ctrlKey && !e.metaKey && !e.altKey && e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        const isMqFocused = document.activeElement && (document.activeElement.tagName === 'TEXTAREA' || document.activeElement.tagName === 'INPUT');
        
        // Map physical keys to calculator commands
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
            const btn = document.querySelector(`.calc-btn[data-cmd="${cmd}"]`);
            if (btn) {
                // Animate the on-screen button
                btn.style.transform = 'scale(0.95)';
                btn.style.backgroundColor = 'var(--primary-color)';
                btn.style.color = '#fff';
                setTimeout(() => {
                    btn.style.transform = '';
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                }, 150);
            }
            
            // If the math input isn't focused, force focus and handle the key so it works globally
            if (!isMqFocused) {
                 e.preventDefault();
                 Shihab_mathField.focus();
                 sshihabb007_handleKeypad(cmd);
            } else if (key === 'Escape') {
                 // Escape clears field even if focused
                 e.preventDefault();
                 sshihabb007_handleKeypad('clear');
            }
        }
    }, true);

    // Focus field on load
    Shihab_mathField.focus();
});

// Keypad Handler
function sshihabb007_handleKeypad(cmd) {
    switch(cmd) {
        case 'clear':
            Shihab_mathField.latex('');
            break;
        case 'backspace':
            Shihab_mathField.keystroke('Backspace');
            break;
        case '=':
            Shihab_commitCalculation();
            break;
        case 'sin':
        case 'cos':
        case 'tan':
        case 'log':
        case 'ln':
            Shihab_mathField.cmd(cmd);
            Shihab_mathField.cmd('(');
            break;
        case 'sqrt':
            Shihab_mathField.cmd('\\sqrt');
            break;
        case '^':
            Shihab_mathField.cmd('^');
            break;
        case 'pi':
            Shihab_mathField.write('\\pi');
            break;
        case 'derive':
            Shihab_mathField.write('derive(');
            break;
        case 'integrate':
            Shihab_mathField.write('integrate(');
            break;
        default:
            Shihab_mathField.write(cmd);
            break;
    }
    Shihab_mathField.focus();
}

let Mehedi_lastValidResult = '0';

// Live Result Evaluation
function Shihab_updateLiveResult() {
    const rawText = Shihab_mathField.text();
    if (!rawText.trim()) {
        Shihab_liveResult.textContent = '0';
        sshihabb007_errorBox.style.opacity = '0';
        Mehedi_lastValidResult = '0';
        return;
    }

    try {
        let expr = rawText.replace(/\\cdot/g, '*');
        let result = Mehedi_calcEngine.evaluate(expr);
        Shihab_liveResult.textContent = "= " + result;
        Mehedi_lastValidResult = "= " + result;
        sshihabb007_errorBox.style.opacity = '0';
    } catch (e) {
        // Keep the total number always visible even if expression is temporarily invalid
        Shihab_liveResult.textContent = Mehedi_lastValidResult;
        sshihabb007_errorBox.style.opacity = '0';
    }
}

// Commit to History
function Shihab_commitCalculation() {
    const rawText = Shihab_mathField.text();
    const latex = Shihab_mathField.latex();
    if (!rawText.trim()) return;

    try {
        let expr = rawText.replace(/\\cdot/g, '*');
        let result = Mehedi_calcEngine.evaluate(expr);
        
        // Add to history UI
        const div = document.createElement('div');
        div.className = "p-3 bg-dark rounded border border-brd hover:border-primary cursor-pointer transition";
        div.innerHTML = `
            <div class="text-sm text-txtmuted mb-1 text-right">\`$$${latex}$$\`</div>
            <div class="text-lg font-bold text-primary text-right">= ${result}</div>
        `;
        div.onclick = () => {
            Shihab_mathField.latex(latex);
            Shihab_mathField.focus();
        };

        // remove empty msg
        const emptyMsg = Mehedi_historyList.querySelector('.text-center');
        if(emptyMsg) emptyMsg.remove();

        Mehedi_historyList.prepend(div);
        
        // Update variables UI
        document.getElementById('val_Ans').textContent = Mehedi_calcEngine.variables.Ans;

        // Clear field for next input
        Shihab_mathField.latex(result.toString());

    } catch (e) {
        // Just flash error box
        sshihabb007_errorBox.style.opacity = '1';
        setTimeout(() => sshihabb007_errorBox.style.opacity = '0', 2000);
    }
}

// MathJax renderer for history if needed (optional)
// Just using pure mathquill renderer for history equations
