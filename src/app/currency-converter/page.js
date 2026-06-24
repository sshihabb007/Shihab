'use client';

import React, { useState, useEffect } from 'react';

const API_KEY = '33a012bbc92a1bbdd4b387b0';

const currencyCountryMap = {
  AED:'UAE', AFN:'Afghanistan', ALL:'Albania', AMD:'Armenia', ANG:'Netherlands Antilles',
  AOA:'Angola', ARS:'Argentina', AUD:'Australia', AWG:'Aruba', AZN:'Azerbaijan',
  BAM:'Bosnia & Herzegovina', BBD:'Barbados', BDT:'Bangladesh', BGN:'Bulgaria',
  BHD:'Bahrain', BIF:'Burundi', BMD:'Bermuda', BND:'Brunei', BOB:'Bolivia',
  BRL:'Brazil', BSD:'Bahamas', BTN:'Bhutan', BWP:'Botswana', BYN:'Belarus',
  BZD:'Belize', CAD:'Canada', CDF:'Congo', CHF:'Switzerland', CLP:'Chile',
  CNY:'China', COP:'Colombia', CRC:'Costa Rica', CUP:'Cuba', CVE:'Cape Verde',
  CZK:'Czech Republic', DJF:'Djibouti', DKK:'Denmark', DOP:'Dominican Republic',
  DZD:'Algeria', EGP:'Egypt', ERN:'Eritrea', ETB:'Ethiopia', EUR:'Eurozone',
  FJD:'Fiji', FKP:'Falkland Islands', FOK:'Faroe Islands', GBP:'United Kingdom',
  GEL:'Georgia', GGP:'Guernsey', GHS:'Ghana', GIP:'Gibraltar', GMD:'Gambia',
  GNF:'Guinea', GTQ:'Guatemala', GYD:'Guyana', HKD:'Hong Kong', HNL:'Honduras',
  HRK:'Croatia', HTG:'Haiti', HUF:'Hungary', IDR:'Indonesia', ILS:'Israel',
  IMP:'Isle of Man', INR:'India', IQD:'Iraq', IRR:'Iran', ISK:'Iceland',
  JEP:'Jersey', JMD:'Jamaica', JOD:'Jordan', JPY:'Japan', KES:'Kenya',
  KGS:'Kyrgyzstan', KHR:'Cambodia', KID:'Kiribati', KMF:'Comoros', KRW:'South Korea',
  KWD:'Kuwait', KYD:'Cayman Islands', KZT:'Kazakhstan', LAK:'Laos', LBP:'Lebanon',
  LKR:'Sri Lanka', LRD:'Liberia', LSL:'Lesotho', LYD:'Libya', MAD:'Morocco',
  MDL:'Moldova', MGA:'Madagascar', MKD:'North Macedonia', MMK:'Myanmar', MNT:'Mongolia',
  MOP:'Macao', MRU:'Mauritania', MUR:'Mauritius', MVR:'Maldives', MWK:'Malawi',
  MXN:'Mexico', MYR:'Malaysia', MZN:'Mozambique', NAD:'Namibia', NGN:'Nigeria',
  NIO:'Nicaragua', NOK:'Norway', NPR:'Nepal', NZD:'New Zealand', OMR:'Oman',
  PAB:'Panama', PEN:'Peru', PGK:'Papua New Guinea', PHP:'Philippines', PKR:'Pakistan',
  PLN:'Poland', PYG:'Paraguay', QAR:'Qatar', RON:'Romania', RSD:'Serbia',
  RUB:'Russia', RWF:'Rwanda', SAR:'Saudi Arabia', SBD:'Solomon Islands',
  SCR:'Seychelles', SDG:'Sudan', SEK:'Sweden', SGD:'Singapore', SHP:'Saint Helena',
  SLE:'Sierra Leone', SLL:'Sierra Leone', SOS:'Somalia', SRD:'Suriname',
  SSP:'South Sudan', STN:'São Tomé & Príncipe', SYP:'Syria', SZL:'Eswatini',
  THB:'Thailand', TJS:'Tajikistan', TMT:'Turkmenistan', TND:'Tunisia', TOP:'Tonga',
  TRY:'Turkey', TTD:'Trinidad & Tobago', TVD:'Tuvalu', TWD:'Taiwan', TZS:'Tanzania',
  UAH:'Ukraine', UGX:'Uganda', USD:'United States', UYU:'Uruguay', UZS:'Uzbekistan',
  VES:'Venezuela', VND:'Vietnam', VUV:'Vanuatu', WST:'Samoa', XAF:'Central Africa',
  XCD:'East Caribbean', XDR:'IMF', XOF:'West Africa', XPF:'French Polynesia',
  YER:'Yemen', ZAR:'South Africa', ZMW:'Zambia', ZWL:'Zimbabwe'
};

const topCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'HKD', 'NZD', 'BDT', 'INR'];

const getCurrencyName = (code) => {
  const country = currencyCountryMap[code] || code;
  return `${country} - ${code}`;
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BDT');
  const [exchangeRates, setExchangeRates] = useState({});
  const [currencyList, setCurrencyList] = useState([]);
  const [rateText, setRateText] = useState('Getting latest rates...');
  const [resultText, setResultText] = useState('--.--');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRates() {
      try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`);
        const data = await response.json();
        
        if (data.result === 'success') {
          const rates = data.conversion_rates;
          setExchangeRates(rates);
          
          const codes = Object.keys(rates);
          codes.sort((a, b) => {
            const aIsTop = topCurrencies.includes(a);
            const bIsTop = topCurrencies.includes(b);
            if (aIsTop && !bIsTop) return -1;
            if (!aIsTop && bIsTop) return 1;
            return a.localeCompare(b);
          });
          
          setCurrencyList(codes);
          setLoading(false);
        } else {
          setRateText('Error loading rates from API.');
        }
      } catch (error) {
        setRateText('Error loading rates. Please try again.');
      }
    }
    fetchRates();
  }, []);

  useEffect(() => {
    if (Object.keys(exchangeRates).length === 0) return;

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setResultText('0.00');
      return;
    }

    const rateA = exchangeRates[fromCurrency];
    const rateB = exchangeRates[toCurrency];
    
    if (!rateA || !rateB) return;

    const convertedAmount = (parsedAmount / rateA) * rateB;

    setResultText(`${convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${toCurrency}`);
    setRateText(`1 ${fromCurrency} = ${(rateB / rateA).toFixed(4)} ${toCurrency}`);
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <main className="w-full max-w-7xl mx-auto flex-grow flex flex-col px-4 py-8 items-center justify-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2" style={{ color: 'var(--text-main)' }}>
          Currency Converter <span className="text-indigo-500">Pro</span>
        </h1>
        <p style={{ color: 'var(--text-muted)' }} className="font-medium text-sm sm:text-base mb-1">
          Real-time global exchange rates.
        </p>
        <p style={{ color: 'var(--text-muted)' }} className="text-xs sm:text-sm font-semibold">
          Developer: <span style={{ color: 'var(--primary-color)' }}>MEHEDI HASAN SHIHAB</span>
        </p>
      </div>

      <div 
        className="shihab_glass_card p-5 sm:p-8 rounded-3xl shadow-2xl w-full max-w-md mx-auto"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}
      >
        <div className="space-y-4">
          {/* Amount Input */}
          <div>
            <label className="block text-xs font-bold uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
              Amount
            </label>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="sshihabb007_input w-full border-none text-2xl p-4 rounded-2xl outline-none transition-all focus:ring-2 focus:ring-indigo-500 font-semibold"
              style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)' }}
            />
          </div>

          {/* Currency Selection */}
          <div className="grid grid-cols-1 gap-2 mt-4">
            <div>
              <label className="block text-xs font-bold uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
                From
              </label>
              <select 
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="sshihabb007_input w-full p-4 rounded-2xl outline-none appearance-none cursor-pointer font-semibold border-none focus:ring-2 focus:ring-indigo-500"
                style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)' }}
              >
                {currencyList.map(code => (
                  <option key={code} value={code}>
                    {getCurrencyName(code)}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button Row with TO label for equal spacing */}
            <div className="flex justify-center items-center relative" style={{ height: '40px' }}>
              <label className="absolute left-0 text-xs font-bold uppercase" style={{ color: 'var(--text-muted)' }}>
                To
              </label>
              <button 
                onClick={handleSwap}
                className="bg-indigo-600 p-2 rounded-full hover:rotate-180 transition-transform duration-300 text-white shadow-lg cursor-pointer flex items-center justify-center w-10 h-10 border-none"
                title="Swap currencies"
              >
                <i className="fas fa-exchange-alt"></i>
              </button>
            </div>

            <div>
              <select 
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="sshihabb007_input w-full p-4 rounded-2xl outline-none appearance-none cursor-pointer font-semibold border-none focus:ring-2 focus:ring-indigo-500"
                style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)' }}
              >
                {currencyList.map(code => (
                  <option key={code} value={code}>
                    {getCurrencyName(code)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Result Area */}
          <div className="mt-8 pt-6 text-center" style={{ borderTop: '1px solid var(--border-color)' }}>
            <p className="text-sm mb-1 font-semibold" style={{ color: 'var(--text-muted)' }}>
              {rateText}
            </p>
            <h2 className="text-3xl sm:text-4xl font-black break-words" style={{ color: 'var(--text-main)' }}>
              {resultText}
            </h2>
          </div>
        </div>
      </div>
    </main>
  );
}
