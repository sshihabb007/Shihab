'use client';

import React, { useState, useEffect } from 'react';

export default function AgeCalculator() {
  const [dob, setDob] = useState('');
  const [results, setResults] = useState(null);

  useEffect(() => {
    const savedDate = localStorage.getItem('sshihabb007_birthday');
    if (savedDate) {
      setDob(savedDate);
      // Run automatic calculation
      calculateAge(savedDate);
    }
  }, []);

  const sshihabb007_getZodiac = (day, month) => {
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries ♈";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus ♉";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini ♊";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer ♋";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo ♌";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo ♍";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra ♎";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio ♏";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius ♐";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn ♑";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius ♒";
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces ♓";
    return "Unknown";
  };

  const mehedi_getGeneration = (year) => {
    if (year >= 2013) return "Gen Alpha";
    if (year >= 1997) return "Gen Z";
    if (year >= 1981) return "Millennial (Gen Y)";
    if (year >= 1965) return "Gen X";
    if (year >= 1946) return "Boomers";
    return "Silent Gen";
  };

  const Shihab_getChineseZodiac = (year) => {
    const signs = ["Monkey 🐒", "Rooster 🐓", "Dog 🐕", "Pig 🐖", "Rat 🐀", "Ox 🐂", "Tiger 🐅", "Rabbit 🐇", "Dragon 🐉", "Snake 🐍", "Horse 🐎", "Goat 🐐"];
    return signs[year % 12];
  };

  const calculateAge = (targetDob) => {
    const dateToCalc = targetDob || dob;
    if (!dateToCalc) return;

    localStorage.setItem('sshihabb007_birthday', dateToCalc);
    const birthDate = new Date(dateToCalc);
    const now = new Date();

    if (birthDate > now) {
      alert("Birth date cannot be in the future!");
      return;
    }

    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const msInDay = 24 * 60 * 60 * 1000;
    const totalDays = Math.floor((now - birthDate) / msInDay);
    const totalMonths = (years * 12) + months;
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;

    const zodiac = sshihabb007_getZodiac(birthDate.getDate(), birthDate.getMonth() + 1);
    const gen = mehedi_getGeneration(birthDate.getFullYear());
    const chinese = Shihab_getChineseZodiac(birthDate.getFullYear());
    const dayOfWeek = birthDate.toLocaleDateString('en-US', { weekday: 'long' });

    let nextBday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (now > nextBday && (now.getDate() !== nextBday.getDate() || now.getMonth() !== nextBday.getMonth())) {
      nextBday.setFullYear(now.getFullYear() + 1);
    }
    const daysToBday = Math.ceil((nextBday - now) / msInDay);

    let progressPercent = (totalDays / 29200) * 100;
    if (progressPercent > 100) progressPercent = 100;

    const heartbeats = totalDays * 24 * 60 * 70;
    const sleepHours = totalDays * 8;

    const ageText = `${years} Years, ${months} Months and ${days} Days`;
    const allStatsText = `Age: ${ageText}\nZodiac: ${zodiac}\nGeneration: ${gen}\nChinese Zodiac: ${chinese}\nNext Birthday: ${daysToBday} days\nTotal Days Lived: ${totalDays.toLocaleString()}`;

    setResults({
      years,
      months,
      days,
      totalDays,
      totalMonths,
      totalWeeks,
      totalHours,
      zodiac,
      gen,
      chinese,
      dayOfWeek,
      daysToBday,
      progressPercent,
      heartbeats,
      sleepHours,
      ageText,
      allStatsText
    });
  };

  const [copiedAge, setCopiedAge] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  const copyAgeText = () => {
    if (!results) return;
    navigator.clipboard.writeText(results.ageText).then(() => {
      setCopiedAge(true);
      setTimeout(() => setCopiedAge(false), 2000);
    });
  };

  const copyAllText = () => {
    if (!results) return;
    navigator.clipboard.writeText(results.allStatsText).then(() => {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    });
  };

  return (
    <main className="flex-grow w-full mx-auto px-4 py-12 max-w-5xl">
      {/* Header */}
      <div className="mb-8 md:mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b pb-4 border-gray-200">
        <div className="text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 sm:mb-3">
            <span style={{ color: 'var(--text-main)' }}>Age Calculator</span>{' '}
            <span className="sshihab007-accent">Pro</span>
          </h1>
          <p style={{ color: 'var(--text-muted)' }} className="font-medium text-lg">
            Calculate exact age, generation, zodiacs & life milestones.
          </p>
        </div>

        {/* Input Section */}
        <section className="sshihab007-glass p-4 sm:p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <input 
            type="date" 
            id="mehedi_dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="p-3 sm:p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner font-semibold text-lg cursor-pointer w-full sm:w-auto"
            style={{
              color: 'var(--text-main)',
              backgroundColor: 'var(--bg-dark)',
              border: '1px solid var(--border-color)',
              colorScheme: 'dark'
            }}
          />
          <button 
            id="Shihab_calculateBtn"
            onClick={() => calculateAge()}
            className="bg-blue-600 text-white px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <i className="fas fa-calculator"></i> Calculate
          </button>
        </section>
      </div>

      {/* Dashboard Grid */}
      {results && (
        <div id="sshihabb007_results">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Main Age Card */}
            <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-5 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden fade-in">
              <i className="fas fa-hourglass-half absolute -right-6 -bottom-6 text-9xl opacity-20 transform -rotate-12"></i>

              <div className="absolute top-6 right-6 flex gap-2 z-10">
                <button 
                  onClick={copyAgeText}
                  className="bg-white/20 hover:bg-white/30 text-white rounded-lg px-3 py-1.5 text-xs font-bold backdrop-blur-sm transition-colors shadow flex items-center gap-1.5"
                  title="Copy Exact Age"
                >
                  <i className="fas fa-copy"></i> {copiedAge ? 'Copied!' : 'Age'}
                </button>
                <button 
                  onClick={copyAllText}
                  className="bg-white/20 hover:bg-white/30 text-white rounded-lg px-3 py-1.5 text-xs font-bold backdrop-blur-sm transition-colors shadow flex items-center gap-1.5"
                  title="Copy Full Summary"
                >
                  <i className="fas fa-clipboard-list"></i> {copiedAll ? 'Copied!' : 'All Stats'}
                </button>
              </div>

              <h2 className="text-blue-200 uppercase tracking-widest text-sm font-bold mb-2">Total Exact Age</h2>
              <div className="text-2xl sm:text-4xl md:text-5xl font-black mb-1 drop-shadow-md">
                {results.years} Years, {results.months} Months
              </div>
              <div className="text-lg sm:text-xl text-blue-100 font-semibold">
                and {results.days} Days
              </div>

              <div className="mt-6">
                <div className="flex justify-between text-xs font-bold text-blue-200 mb-1">
                  <span>Life Journey (Assuming 80 Years)</span>
                  <span>{results.progressPercent.toFixed(2)}%</span>
                </div>
                <div className="w-full bg-blue-900/50 rounded-full h-2 overflow-hidden shadow-inner">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${results.progressPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Zodiac & Gen Card */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-5 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden fade-in animate-delay-1 flex flex-col justify-center">
              <i className="fas fa-star absolute -top-4 -right-4 text-7xl opacity-20"></i>
              <h3 className="text-pink-200 font-bold text-xs uppercase tracking-wider mb-1">The Vibe</h3>
              <div className="text-3xl font-black drop-shadow-sm mb-2">{results.zodiac}</div>
              <div className="text-sm uppercase font-bold text-white bg-white/20 inline-block px-3 py-1 rounded-full w-max backdrop-blur-sm">
                {results.gen}
              </div>
              <div className="text-sm font-semibold mt-3 text-pink-100">
                Chinese: <span className="text-white">{results.chinese}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Countdown Card */}
            <div className="sshihab007-glass p-5 sm:p-8 rounded-3xl shadow-lg flex flex-col items-center justify-center text-center fade-in animate-delay-2">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 text-blue-500">
                <i className="fas fa-birthday-cake text-3xl"></i>
              </div>
              <h3 style={{ color: 'var(--text-muted)' }} className="font-bold text-xs uppercase tracking-widest mb-2">
                Days to Next Birthday
              </h3>
              <div className="text-5xl font-black sshihab007-accent drop-shadow-sm">
                {results.daysToBday === 0 || results.daysToBday === 365 ? "Today!" : results.daysToBday}
              </div>
              <div className="mt-4 text-sm font-semibold" style={{ color: 'var(--text-main)' }}>
                Born on a <span className="text-blue-500">{results.dayOfWeek}</span>
              </div>
            </div>

            {/* Life in Numbers Table */}
            <div className="lg:col-span-2 sshihab007-glass p-5 sm:p-8 rounded-3xl shadow-lg fade-in animate-delay-3">
              <h3 className="font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                <i className="fas fa-chart-pie text-purple-500"></i> Life in Numbers
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-1">
                  <p className="text-xs uppercase font-bold text-gray-500">Total Months</p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--text-main)' }}>{results.totalMonths.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase font-bold text-gray-500">Total Weeks</p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--text-main)' }}>{results.totalWeeks.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase font-bold text-gray-500">Total Days</p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--text-main)' }}>{results.totalDays.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase font-bold text-gray-500">Total Hours</p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--text-main)' }}>{results.totalHours.toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 bg-gray-500/5 p-4 rounded-xl border border-gray-500/10">
                    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                      <i className="fas fa-heartbeat"></i>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">Est. Heartbeats</p>
                      <p className="text-lg font-bold" style={{ color: 'var(--text-main)' }}>{results.heartbeats.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-gray-500/5 p-4 rounded-xl border border-gray-500/10">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                      <i className="fas fa-bed"></i>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">Hours Slept</p>
                      <p className="text-lg font-bold" style={{ color: 'var(--text-main)' }}>{results.sleepHours.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
