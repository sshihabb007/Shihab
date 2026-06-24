'use client';

import React, { useState, useEffect } from 'react';

const formatCurrency = (val) => {
  return new Intl.NumberFormat('en-IN').format(Math.round(val));
};

export default function TaxCalculator() {
  const [step, setStep] = useState(1);

  // Form Profile Configuration
  const [taxpayerCategory, setTaxpayerCategory] = useState('general_male');
  const [disabledDependent, setDisabledDependent] = useState('0');
  const [residentialStatus, setResidentialStatus] = useState('resident');
  const [filingLocation, setFilingLocation] = useState('5000');

  // Income Streams (Annual)
  const [basicPay, setBasicPay] = useState(252000);
  const [allowances, setAllowances] = useState(208000);
  const [arrears, setArrears] = useState(0);
  const [gratuity, setGratuity] = useState(0);
  const [perquisites, setPerquisites] = useState(0);
  const [receiptInLieu, setReceiptInLieu] = useState(0);
  const [shareScheme, setShareScheme] = useState(0);
  const [accommodation, setAccommodation] = useState(0);
  const [transport, setTransport] = useState(0);
  const [otherFacilities, setOtherFacilities] = useState(0);
  const [rpfContribution, setRpfContribution] = useState(0);
  const [salaryOthers, setSalaryOthers] = useState(0);

  // Investments
  const [investInsurance, setInvestInsurance] = useState(0);
  const [investDps, setInvestDps] = useState(0);
  const [investGovSec, setInvestGovSec] = useState(0);
  const [investStocks, setInvestStocks] = useState(0);
  const [investZakat, setInvestZakat] = useState(0);
  const [investBenevolent, setInvestBenevolent] = useState(0);

  // Lifestyle Expenses
  const [expFood, setExpFood] = useState(120000);
  const [expHousing, setExpHousing] = useState(180000);
  const [expTransport, setExpTransport] = useState(60000);
  const [expUtilities, setExpUtilities] = useState(48000);
  const [expEducation, setExpEducation] = useState(0);
  const [expTravel, setExpTravel] = useState(0);
  const [expFestival, setExpFestival] = useState(36000);
  const [expTds, setExpTds] = useState(0);

  // Surcharge & Assets
  const [netWealth, setNetWealth] = useState(0);
  const [motorCar, setMotorCar] = useState(false);
  const [houseProperty, setHouseProperty] = useState(false);

  // Calculation outputs
  const [grossSalary, setGrossSalary] = useState(0);
  const [exemptedSalary, setExemptedSalary] = useState(0);
  const [taxableSalary, setTaxableSalary] = useState(0);
  const [grossCalculatedTax, setGrossCalculatedTax] = useState(0);
  const [totalInvestments, setTotalInvestments] = useState(0);
  const [appliedRebate, setAppliedRebate] = useState(0);
  const [appliedSurcharge, setAppliedSurcharge] = useState(0);
  const [finalTaxPayable, setFinalTaxPayable] = useState(0);
  const [lifestyleTotal, setLifestyleTotal] = useState(0);
  const [sourcesOfFund, setSourcesOfFund] = useState(0);
  const [yearEndNetWealth, setYearEndNetWealth] = useState(0);
  const [optimizationAdvice, setOptimizationAdvice] = useState('');

  // Core calculations
  useEffect(() => {
    // 1. Calculate Gross Employment Income and Exemptions
    const totalGross = 
      (parseFloat(basicPay) || 0) + (parseFloat(allowances) || 0) + 
      (parseFloat(arrears) || 0) + (parseFloat(gratuity) || 0) + 
      (parseFloat(perquisites) || 0) + (parseFloat(receiptInLieu) || 0) + 
      (parseFloat(shareScheme) || 0) + (parseFloat(accommodation) || 0) + 
      (parseFloat(transport) || 0) + (parseFloat(otherFacilities) || 0) + 
      (parseFloat(rpfContribution) || 0) + (parseFloat(salaryOthers) || 0);

    const exempted = Math.min(totalGross / 3, 450000);
    const taxable = Math.max(totalGross - exempted, 0);

    setGrossSalary(totalGross);
    setExemptedSalary(exempted);
    setTaxableSalary(taxable);

    // 2. Base Threshold Configurations
    let baseThreshold = 350000;
    if (taxpayerCategory === 'female_senior') baseThreshold = 400000;
    if (taxpayerCategory === 'disabled_third_gender') baseThreshold = 475000;
    if (taxpayerCategory === 'freedom_fighter') baseThreshold = 500000;

    baseThreshold += (parseInt(disabledDependent) || 0) * 50000;

    // 3. Progressive Slab Calculation
    let remIncome = taxable;
    let calcGrossTax = 0;

    if (residentialStatus === 'non_resident') {
      calcGrossTax = taxable * 0.25;
    } else {
      if (remIncome > baseThreshold) {
        remIncome -= baseThreshold;

        // Next 1,00,000 @ 5%
        if (remIncome > 100000) {
          calcGrossTax += 100000 * 0.05;
          remIncome -= 100000;
        } else {
          calcGrossTax += remIncome * 0.05;
          remIncome = 0;
        }

        // Next 3,00,000 @ 10%
        if (remIncome > 300000) {
          calcGrossTax += 300000 * 0.10;
          remIncome -= 300000;
        } else {
          calcGrossTax += remIncome * 0.10;
          remIncome = 0;
        }

        // Next 4,00,000 @ 15%
        if (remIncome > 400000) {
          calcGrossTax += 400000 * 0.15;
          remIncome -= 400000;
        } else {
          calcGrossTax += remIncome * 0.15;
          remIncome = 0;
        }

        // Next 5,00,000 @ 20%
        if (remIncome > 500000) {
          calcGrossTax += 500000 * 0.20;
          remIncome -= 500000;
        } else {
          calcGrossTax += remIncome * 0.20;
          remIncome = 0;
        }

        // Balance @ 25%
        if (remIncome > 0) {
          calcGrossTax += remIncome * 0.25;
        }
      }
    }
    setGrossCalculatedTax(calcGrossTax);

    // 4. Calculate Investments & Rebates
    const cappedDps = Math.min(parseFloat(investDps) || 0, 60000);
    const totalInvest = 
      (parseFloat(investInsurance) || 0) + cappedDps + 
      (parseFloat(investGovSec) || 0) + (parseFloat(investStocks) || 0) + 
      (parseFloat(investZakat) || 0) + (parseFloat(investBenevolent) || 0);

    setTotalInvestments(totalInvest);

    let maxAllowableRebate = 0;
    if (calcGrossTax > 0) {
      maxAllowableRebate = Math.min(
        taxable * 0.03,
        totalInvest * 0.15,
        1000000
      );
    }
    setAppliedRebate(maxAllowableRebate);

    // 5. Surcharge & Min Tax
    let finalNetTax = Math.max(calcGrossTax - maxAllowableRebate, 0);
    const minTaxDue = parseFloat(filingLocation) || 5000;
    const hasTaxableIncome = taxable > baseThreshold;

    if (hasTaxableIncome && finalNetTax < minTaxDue) {
      finalNetTax = minTaxDue;
    }

    let surchargeRate = 0;
    const wealthNum = parseFloat(netWealth) || 0;
    if (wealthNum > 40000000) {
      if (wealthNum <= 100000000) surchargeRate = 0.10;
      else if (wealthNum <= 200000000) surchargeRate = 0.20;
      else if (wealthNum <= 500000000) surchargeRate = 0.30;
      else surchargeRate = 0.35;
    }

    if (hasTaxableIncome && (motorCar || houseProperty)) {
      surchargeRate = Math.max(surchargeRate, 0.10);
    }

    const appliedSurch = finalNetTax * surchargeRate;
    setAppliedSurcharge(appliedSurch);
    setFinalTaxPayable(finalNetTax + appliedSurch);

    // 6. Lifestyle Expenses
    const lifestyle = 
      (parseFloat(expFood) || 0) + (parseFloat(expHousing) || 0) + 
      (parseFloat(expTransport) || 0) + (parseFloat(expUtilities) || 0) + 
      (parseFloat(expEducation) || 0) + (parseFloat(expTravel) || 0) + 
      (parseFloat(expFestival) || 0) + (parseFloat(expTds) || 0);
    setLifestyleTotal(lifestyle);

    // 7. Wealth Reconciliation
    const sources = taxable + exempted;
    const netWealthDelta = Math.max(sources - lifestyle, 0);
    setSourcesOfFund(sources);
    setYearEndNetWealth(netWealthDelta);

    // 8. Optimization advice
    if (!hasTaxableIncome) {
      setOptimizationAdvice('Tax is already 0 BDT. No investment needed!');
    } else if (finalNetTax <= minTaxDue && calcGrossTax > 0) {
      setOptimizationAdvice(`Minimum Tax (${formatCurrency(minTaxDue)} BDT) reached. No further adjustment possible.`);
    } else if (finalNetTax === 0) {
      setOptimizationAdvice('Tax successfully optimized to 0 BDT!');
    } else {
      const targetRebate = Math.max(0, calcGrossTax - minTaxDue);
      const requiredInvestTarget = targetRebate / 0.15;
      const neededInvest = Math.max(0, requiredInvestTarget - totalInvest);
      
      if (neededInvest <= 0) {
        setOptimizationAdvice('Maximum available rebate is already fully secured!');
      } else {
        setOptimizationAdvice(`Invest ~${formatCurrency(neededInvest)} BDT into listed stocks to secure maximum rebate coverage.`);
      }
    }
  }, [
    taxpayerCategory, disabledDependent, residentialStatus, filingLocation,
    basicPay, allowances, arrears, gratuity, perquisites, receiptInLieu,
    shareScheme, accommodation, transport, otherFacilities, rpfContribution,
    salaryOthers, investInsurance, investDps, investGovSec, investStocks,
    investZakat, investBenevolent, expFood, expHousing, expTransport,
    expUtilities, expEducation, expTravel, expFestival, expTds, netWealth,
    motorCar, houseProperty
  ]);

  const handleOptimizeToZero = () => {
    let baseThreshold = 350000;
    if (taxpayerCategory === 'female_senior') baseThreshold = 400000;
    if (taxpayerCategory === 'disabled_third_gender') baseThreshold = 475000;
    if (taxpayerCategory === 'freedom_fighter') baseThreshold = 500000;
    baseThreshold += (parseInt(disabledDependent) || 0) * 50000;

    const totalGross = 
      (parseFloat(basicPay) || 0) + (parseFloat(allowances) || 0) + 
      (parseFloat(arrears) || 0) + (parseFloat(gratuity) || 0) + 
      (parseFloat(perquisites) || 0) + (parseFloat(receiptInLieu) || 0) + 
      (parseFloat(shareScheme) || 0) + (parseFloat(accommodation) || 0) + 
      (parseFloat(transport) || 0) + (parseFloat(otherFacilities) || 0) + 
      (parseFloat(rpfContribution) || 0) + (parseFloat(salaryOthers) || 0);

    const exempted = Math.min(totalGross / 3, 450000);
    const taxable = Math.max(totalGross - exempted, 0);

    if (taxable <= baseThreshold) {
      alert('Your taxable income falls below the structural threshold. Net Tax is already 0 BDT.');
      return;
    }

    let remIncome = taxable - baseThreshold;
    let calcGrossTax = 0;

    if (residentialStatus === 'non_resident') {
      calcGrossTax = taxable * 0.25;
    } else {
      if (remIncome > 0) {
        if (remIncome > 100000) { calcGrossTax += 100000 * 0.05; remIncome -= 100000; }
        else { calcGrossTax += remIncome * 0.05; remIncome = 0; }
        if (remIncome > 300000) { calcGrossTax += 300000 * 0.10; remIncome -= 300000; }
        else { calcGrossTax += remIncome * 0.10; remIncome = 0; }
        if (remIncome > 400000) { calcGrossTax += 400000 * 0.15; remIncome -= 400000; }
        else { calcGrossTax += remIncome * 0.15; remIncome = 0; }
        if (remIncome > 500000) { calcGrossTax += 500000 * 0.20; remIncome -= 500000; }
        else { calcGrossTax += remIncome * 0.20; remIncome = 0; }
        if (remIncome > 0) { calcGrossTax += remIncome * 0.25; }
      }
    }

    const minTaxDue = parseFloat(filingLocation) || 5000;
    const targetRebate = Math.max(0, calcGrossTax - minTaxDue);
    let targetInvestment = targetRebate / 0.15;

    const maxPossibleRebate = taxable * 0.03;
    if (targetRebate > maxPossibleRebate) {
      targetInvestment = maxPossibleRebate / 0.15;
    }

    setInvestStocks(Math.round(targetInvestment));
    setInvestInsurance(0);
    setInvestDps(0);
    setInvestGovSec(0);
    setInvestZakat(0);
    setInvestBenevolent(0);

    alert(`Optimization executed! Allocated ${formatCurrency(targetInvestment)} BDT into listed stocks to secure maximum rebate coverage.`);
  };

  const handleStepNavigation = (targetStep) => {
    setStep(targetStep);
    const navBar = document.getElementById('mehedi_step_navigation_bar');
    if (navBar) {
      navBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="w-full max-w-7xl mx-auto flex-grow flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-5xl mx-auto w-full">
        {/* Title Header */}
        <div className="text-center mb-8 pt-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-2" style={{ color: 'var(--text-main)' }}>
            NBR Bangladesh e-Return Tax Tool
          </h1>
          <p className="text-base font-medium tracking-wide flex items-center justify-center gap-2" style={{ color: 'var(--text-muted)' }}>
            Developed by{' '}
            <a href="/" className="font-semibold text-emerald-500 hover:text-emerald-400 transition">
              Mehedi Hasan Shihab
            </a>
          </p>
          <p className="text-xs uppercase tracking-widest mt-2 flex items-center justify-center gap-1.5 font-bold text-emerald-500">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span> Assessment Year 2025-2026
          </p>
        </div>

        {/* Stepper Navigation Bar */}
        <nav 
          id="mehedi_step_navigation_bar" 
          className="flex flex-wrap md:grid md:grid-cols-5 gap-2 mb-8 p-2 rounded-2xl border"
          style={{ backgroundColor: 'var(--bg-hover)', borderColor: 'var(--border-color)' }}
        >
          {[
            { id: 1, label: '1. Profile Info' },
            { id: 2, label: '2. Income Streams' },
            { id: 3, label: '3. Investment Rebate' },
            { id: 4, label: '4. Expenses (IT-10BB)' },
            { id: 5, label: '5. Assets & Summary' }
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => handleStepNavigation(s.id)}
              className={`flex-grow md:flex-initial py-3 px-2 rounded-xl text-xs sm:text-sm font-bold text-center transition-all duration-300 cursor-pointer ${
                step === s.id
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-gray-500 dark:text-slate-400 hover:bg-black/10'
              }`}
              style={{ border: 'none' }}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <div>
          {/* Step 1: User Profile Configuration */}
          {step === 1 && (
            <section 
              className="glass_shihab rounded-3xl p-6 sm:p-8 border"
              style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-card)' }}
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: 'var(--text-main)' }}>
                <span className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-extrabold text-sm">1</span>
                Profile Configuration [Form IT-11GA]
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                    Taxpayer Category
                  </label>
                  <select 
                    value={taxpayerCategory}
                    onChange={(e) => setTaxpayerCategory(e.target.value)}
                    className="w-full p-4 border rounded-xl outline-none font-semibold text-sm cursor-pointer"
                    style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                  >
                    <option value="general_male">General Taxpayer (Threshold: 3,50,000 BDT)</option>
                    <option value="female_senior">Female or Senior Citizen aged 65+ (Threshold: 4,00,000 BDT)</option>
                    <option value="disabled_third_gender">Physically Challenged or Third Gender (Threshold: 4,75,000 BDT)</option>
                    <option value="freedom_fighter">Gazetted War-Wounded Freedom Fighter (Threshold: 5,00,000 BDT)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                    Disabled Dependent Facility
                  </label>
                  <select 
                    value={disabledDependent}
                    onChange={(e) => setDisabledDependent(e.target.value)}
                    className="w-full p-4 border rounded-xl outline-none font-semibold text-sm cursor-pointer"
                    style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                  >
                    <option value="0">No disabled child or dependent</option>
                    <option value="1">Parent of 1 Disabled Person (+50,000 BDT Limit)</option>
                    <option value="2">Parent of 2+ Disabled Persons (+1,00,000 BDT Limit)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                    Residential Status
                  </label>
                  <select 
                    value={residentialStatus}
                    onChange={(e) => setResidentialStatus(e.target.value)}
                    className="w-full p-4 border rounded-xl outline-none font-semibold text-sm cursor-pointer"
                    style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                  >
                    <option value="resident">Resident of Bangladesh</option>
                    <option value="non_resident">Non-Resident Taxpayer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                    Filing Location (For Location-based Min Tax)
                  </label>
                  <select 
                    value={filingLocation}
                    onChange={(e) => setFilingLocation(e.target.value)}
                    className="w-full p-4 border rounded-xl outline-none font-semibold text-sm cursor-pointer"
                    style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                  >
                    <option value="5000">Dhaka or Chattogram City Corporation (Min Tax: 5,000 BDT)</option>
                    <option value="4000">Other City Corporations (Min Tax: 4,000 BDT)</option>
                    <option value="3000">Outside Any City Corporation (Min Tax: 3,000 BDT)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button 
                  onClick={() => handleStepNavigation(2)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm px-6 py-4 rounded-xl transition shadow-md hover:shadow-emerald-500/20 flex items-center gap-2 border-none cursor-pointer"
                >
                  Proceed to Income Particulars <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </section>
          )}

          {/* Step 2: Salary Particulars */}
          {step === 2 && (
            <section 
              className="glass_shihab rounded-3xl p-6 sm:p-8 border"
              style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-card)' }}
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-2 flex items-center gap-3" style={{ color: 'var(--text-main)' }}>
                <span className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-extrabold text-sm">2</span>
                Schedule 1: Employment Income Stream Breakdown
              </h2>
              <p className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
                Applicable for non-government pay scale entities under the Income Tax Act, 2023.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {[
                  { label: '1. Basic Pay Amount (Annual)', val: basicPay, set: setBasicPay },
                  { label: '2. Allowances (Medical/House/Conveyance)', val: allowances, set: setAllowances },
                  { label: '3. Advance / Arrear Salary Received', val: arrears, set: setArrears },
                  { label: '4. Gratuity, Annuity, or Pension Benefits', val: gratuity, set: setGratuity },
                  { label: '5. Perquisites (Taxable Valuation)', val: perquisites, set: setPerquisites },
                  { label: '6. Receipts in addition to Salary', val: receiptInLieu, set: setReceiptInLieu },
                  { label: '7. Employee Share Scheme Profits', val: shareScheme, set: setShareScheme },
                  { label: '8. Accommodation Valuation Benefit', val: accommodation, set: setAccommodation },
                  { label: '9. Transport Facility Standard Benefit', val: transport, set: setTransport },
                  { label: '10. Other Employer Provided Facilities', val: otherFacilities, set: setOtherFacilities },
                  { label: '11. Employer Contribution to RPF', val: rpfContribution, set: setRpfContribution },
                  { label: '12. Other Special Salary Lines', val: salaryOthers, set: setSalaryOthers }
                ].map((field, idx) => (
                  <div key={idx}>
                    <label className="block text-xs font-semibold mb-1.5 text-gray-500 dark:text-slate-400">
                      {field.label}
                    </label>
                    <input 
                      type="number" 
                      value={field.val} 
                      onChange={(e) => field.set(parseFloat(e.target.value) || 0)}
                      className="w-full p-3 border rounded-xl outline-none text-sm font-semibold"
                      style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                    />
                  </div>
                ))}
              </div>

              <div 
                className="mt-8 p-6 rounded-2xl border grid grid-cols-1 sm:grid-cols-3 gap-6 text-center"
                style={{ backgroundColor: 'var(--bg-hover)', borderColor: 'var(--border-color)' }}
              >
                <div className="p-3 rounded-xl shadow-sm border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                  <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Gross Salary Received</div>
                  <div className="text-xl font-extrabold font-mono" style={{ color: 'var(--text-main)' }}>{formatCurrency(grossSalary)} BDT</div>
                </div>
                <div className="p-3 rounded-xl shadow-sm border border-emerald-500/20" style={{ backgroundColor: 'var(--bg-card)' }}>
                  <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-1">Exempted (1/3 Max 4.5L)</div>
                  <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{formatCurrency(exemptedSalary)} BDT</div>
                </div>
                <div className="p-3 rounded-xl shadow-sm border border-amber-500/20" style={{ backgroundColor: 'var(--bg-card)' }}>
                  <div className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-1">Net Taxable Employment Income</div>
                  <div className="text-xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">{formatCurrency(taxableSalary)} BDT</div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button 
                  onClick={() => handleStepNavigation(1)}
                  className="bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 font-extrabold text-sm px-6 py-4 rounded-xl transition flex items-center gap-2 border-none cursor-pointer"
                >
                  <i className="fa-solid fa-arrow-left"></i> Back
                </button>
                <button 
                  onClick={() => handleStepNavigation(3)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm px-6 py-4 rounded-xl transition shadow-md hover:shadow-emerald-500/20 flex items-center gap-2 border-none cursor-pointer"
                >
                  Proceed to Investment Rebates <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </section>
          )}

          {/* Step 3: Investment Rebates */}
          {step === 3 && (
            <section 
              className="glass_shihab rounded-3xl p-6 sm:p-8 border"
              style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-card)' }}
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-2 flex items-center gap-3" style={{ color: 'var(--text-main)' }}>
                <span className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-extrabold text-sm">3</span>
                Schedule 5: Particulars of Investment Tax Credit
              </h2>
              <p className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
                Investments reducing overall final tax liability by a standard rate calculation framework.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  { label: 'Life Insurance Premium paid in BD', val: investInsurance, set: setInvestInsurance },
                  { label: 'Deposit Pension Scheme (DPS Max 60k)', val: investDps, set: setInvestDps },
                  { label: 'Approved Bonds / Gov Securities / Mutual Funds', val: investGovSec, set: setInvestGovSec },
                  { label: 'Securities Listed with BD Stock Exchanges', val: investStocks, set: setInvestStocks },
                  { label: 'Contribution to Official Zakat Fund', val: investZakat, set: setInvestZakat },
                  { label: 'Benevolent Fund / Group Insurance Premium', val: investBenevolent, set: setInvestBenevolent }
                ].map((field, idx) => (
                  <div key={idx}>
                    <label className="block text-xs font-semibold mb-1.5 text-gray-500 dark:text-slate-400">
                      {field.label}
                    </label>
                    <input 
                      type="number" 
                      value={field.val} 
                      onChange={(e) => field.set(parseFloat(e.target.value) || 0)}
                      className="w-full p-3 border rounded-xl outline-none text-sm font-semibold"
                      style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                    />
                  </div>
                ))}
              </div>

              <div 
                className="mt-8 p-6 rounded-2xl border flex flex-col sm:flex-row justify-around gap-6 text-center"
                style={{ backgroundColor: 'var(--bg-hover)', borderColor: 'var(--border-color)' }}
              >
                <div className="p-3 rounded-xl shadow-sm border flex-1" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                  <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Aggregate Investment Amount</div>
                  <div className="text-xl font-extrabold font-mono" style={{ color: 'var(--text-main)' }}>{formatCurrency(totalInvestments)} BDT</div>
                </div>
                <div className="p-3 rounded-xl shadow-sm border border-emerald-500/20 flex-1" style={{ backgroundColor: 'var(--bg-card)' }}>
                  <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-1">Calculated Tax Rebate Valuation</div>
                  <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{formatCurrency(appliedRebate)} BDT</div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button 
                  onClick={() => handleStepNavigation(2)}
                  className="bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 font-extrabold text-sm px-6 py-4 rounded-xl transition flex items-center gap-2 border-none cursor-pointer"
                >
                  <i className="fa-solid fa-arrow-left"></i> Back
                </button>
                <button 
                  onClick={() => handleStepNavigation(4)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm px-6 py-4 rounded-xl transition shadow-md hover:shadow-emerald-500/20 flex items-center gap-2 border-none cursor-pointer"
                >
                  Proceed to Lifestyle Expenses <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </section>
          )}

          {/* Step 4: Lifestyle Expenses */}
          {step === 4 && (
            <section 
              className="glass_shihab rounded-3xl p-6 sm:p-8 border"
              style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-card)' }}
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-2 flex items-center gap-3" style={{ color: 'var(--text-main)' }}>
                <span className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-extrabold text-sm">4</span>
                Form IT-10BB: Statement of Lifestyle Expenditures
              </h2>
              <p className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
                Mandatory tracking module of annual personal expenditures.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                {[
                  { label: '1. Food & Clothing', val: expFood, set: setExpFood },
                  { label: '2. Rent & Maintenance', val: expHousing, set: setExpHousing },
                  { label: '3. Personal Conveyance', val: expTransport, set: setExpTransport },
                  { label: '4. Utilities (Electricity, Net)', val: expUtilities, set: setExpUtilities },
                  { label: '5. Children Education Cost', val: expEducation, set: setExpEducation },
                  { label: '6. Local & Foreign Travel', val: expTravel, set: setExpTravel },
                  { label: '7. Festivals & Occasions', val: expFestival, set: setExpFestival },
                  { label: '8. Advance Tax / TDS', val: expTds, set: setExpTds }
                ].map((field, idx) => (
                  <div key={idx}>
                    <label className="block text-xs font-semibold mb-1.5 text-gray-500 dark:text-slate-400">
                      {field.label}
                    </label>
                    <input 
                      type="number" 
                      value={field.val} 
                      onChange={(e) => field.set(parseFloat(e.target.value) || 0)}
                      className="w-full p-3 border rounded-xl outline-none text-sm font-semibold"
                      style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                    />
                  </div>
                ))}
              </div>

              <div 
                className="mt-8 p-6 rounded-2xl border text-center"
                style={{ backgroundColor: 'var(--bg-hover)', borderColor: 'var(--border-color)' }}
              >
                <div className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-1">Total Accumulated Lifestyle Expenditures</div>
                <div className="text-3xl font-black text-amber-600 dark:text-amber-400 font-mono">{formatCurrency(lifestyleTotal)} BDT</div>
              </div>

              <div className="flex justify-between mt-8">
                <button 
                  onClick={() => handleStepNavigation(3)}
                  className="bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 font-extrabold text-sm px-6 py-4 rounded-xl transition flex items-center gap-2 border-none cursor-pointer"
                >
                  <i className="fa-solid fa-arrow-left"></i> Back
                </button>
                <button 
                  onClick={() => handleStepNavigation(5)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm px-6 py-4 rounded-xl transition shadow-md hover:shadow-emerald-500/20 flex items-center gap-2 border-none cursor-pointer"
                >
                  Proceed to Assets & Final Summary <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </section>
          )}

          {/* Step 5: Summary & Wealth Reconciliation */}
          {step === 5 && (
            <section 
              className="glass_shihab rounded-3xl p-6 sm:p-8 border"
              style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-card)' }}
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-2 flex items-center gap-3" style={{ color: 'var(--text-main)' }}>
                <span className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-extrabold text-sm">5</span>
                Form IT-10B: Wealth Reconciliation & Tax Dashboard
              </h2>
              <p className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
                Verifies that standard fund source matching matches net asset accumulation metrics.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Layout Panels */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Tax Review Table */}
                  <div className="p-6 rounded-2xl border bg-white dark:bg-slate-900/60 shadow-sm" style={{ borderColor: 'var(--border-color)' }}>
                    <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>
                      NBR Core Return Computation Review
                    </h3>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm font-medium border-collapse">
                        <tbody>
                          <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                            <td className="py-3" style={{ color: 'var(--text-muted)' }}>Total Gross Salary Income</td>
                            <td className="py-3 text-right font-bold font-mono" style={{ color: 'var(--text-main)' }}>{formatCurrency(grossSalary)} BDT</td>
                          </tr>
                          <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                            <td className="py-3" style={{ color: 'var(--text-muted)' }}>Total Fully Exempted Allocation</td>
                            <td className="py-3 text-right font-bold text-emerald-600 dark:text-emerald-400 font-mono">{formatCurrency(exemptedSalary)} BDT</td>
                          </tr>
                          <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                            <td className="py-3" style={{ color: 'var(--text-muted)' }}>Net Assessable Taxable Base</td>
                            <td className="py-3 text-right font-bold font-mono" style={{ color: 'var(--text-main)' }}>{formatCurrency(taxableSalary)} BDT</td>
                          </tr>
                          <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                            <td className="py-3" style={{ color: 'var(--text-muted)' }}>Gross Calculated Initial Tax</td>
                            <td className="py-3 text-right font-bold text-amber-500 font-mono">{formatCurrency(grossCalculatedTax)} BDT</td>
                          </tr>
                          <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                            <td className="py-3" style={{ color: 'var(--text-muted)' }}>Applied Investment Rebate [Schedule 5]</td>
                            <td className="py-3 text-right font-bold text-emerald-600 dark:text-emerald-400 font-mono">{formatCurrency(appliedRebate)} BDT</td>
                          </tr>
                          <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                            <td className="py-3" style={{ color: 'var(--text-muted)' }}>Net Surcharge (Surcharge Tax)</td>
                            <td className="py-3 text-right font-bold text-indigo-500 font-mono">{formatCurrency(appliedSurcharge)} BDT</td>
                          </tr>
                          <tr>
                            <td className="py-4 font-extrabold text-base animate-pulse" style={{ color: 'var(--text-main)' }}>Net Final Tax Liabilities Due</td>
                            <td className="py-4 text-right font-black text-xl text-rose-600 dark:text-rose-400 font-mono">{formatCurrency(finalTaxPayable)} BDT</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Net Wealth Reconciler */}
                  <div className="p-6 rounded-2xl border bg-white dark:bg-slate-900/60 shadow-sm" style={{ borderColor: 'var(--border-color)' }}>
                    <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                      IT-10B Net Wealth Fund Reconciliation
                    </h3>
                    <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
                      Reconciles current cash liquidity matching rules (Sources of Fund - Expenses).
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                      <div className="p-4 border bg-gray-50 dark:bg-slate-900 rounded-2xl shadow-sm" style={{ borderColor: 'var(--border-color)' }}>
                        <span className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Total Sourced Assets Fund</span>
                        <span className="text-lg font-extrabold text-blue-600 dark:text-blue-400 font-mono">{formatCurrency(sourcesOfFund)} BDT</span>
                      </div>
                      <div className="p-4 border bg-gray-50 dark:bg-slate-900 rounded-2xl shadow-sm" style={{ borderColor: 'var(--border-color)' }}>
                        <span className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Calculated Year-End Net Wealth</span>
                        <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">{formatCurrency(yearEndNetWealth)} BDT</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Panel */}
                <div className="space-y-6 flex flex-col">
                  {/* Surcharge Configuration */}
                  <div className="p-6 rounded-2xl border bg-white dark:bg-slate-900/60 shadow-sm space-y-4" style={{ borderColor: 'var(--border-color)' }}>
                    <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                      Surcharge Configuration
                    </h3>
                    <div>
                      <label className="block text-xs font-bold mb-1" style={{ color: 'var(--text-muted)' }}>Estimated Net Wealth (Annual)</label>
                      <input 
                        type="number" 
                        value={netWealth} 
                        onChange={(e) => setNetWealth(parseFloat(e.target.value) || 0)}
                        className="w-full p-2.5 border rounded-xl bg-gray-50 dark:bg-slate-800 outline-none text-sm font-semibold font-mono"
                        style={{ borderColor: 'var(--border-color)' }}
                      />
                    </div>
                    <div className="space-y-2 pt-2">
                      <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-emerald-500/10 transition-all duration-200" style={{ borderColor: 'var(--border-color)' }}>
                        <input 
                          type="checkbox" 
                          checked={motorCar} 
                          onChange={(e) => setMotorCar(e.target.checked)} 
                          className="w-5 h-5 cursor-pointer"
                        />
                        <div>
                          <span className="block text-xs font-bold text-gray-700 dark:text-slate-200">Motor Vehicle Owner</span>
                          <span className="block text-[10px]" style={{ color: 'var(--text-muted)' }}>Auto triggers minimum 10% Net Surcharge</span>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-emerald-500/10 transition-all duration-200" style={{ borderColor: 'var(--border-color)' }}>
                        <input 
                          type="checkbox" 
                          checked={houseProperty} 
                          onChange={(e) => setHouseProperty(e.target.checked)} 
                          className="w-5 h-5 cursor-pointer"
                        />
                        <div>
                          <span className="block text-xs font-bold text-gray-700 dark:text-slate-200">City House Property Owner</span>
                          <span className="block text-[10px]" style={{ color: 'var(--text-muted)' }}>Auto triggers minimum 10% Net Surcharge</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Zero Tax Optimizer */}
                  <div className="p-6 rounded-2xl border bg-gradient-to-br from-emerald-600/10 to-teal-600/10 shadow-sm border-emerald-500/20 space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                      <i className="fa-solid fa-wand-magic-sparkles animate-bounce"></i> Zero Tax Optimizer
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      Our progressive investment solver checks your income slabs and computes the exact stock market investment needed to secure maximum rebate coverage.
                    </p>
                    <div className="p-3 bg-white/5 border border-emerald-500/20 rounded-xl">
                      <span className="block text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1">Optimizer Advice</span>
                      <p className="text-xs font-medium text-gray-700 dark:text-slate-200">{optimizationAdvice}</p>
                    </div>
                    <button 
                      onClick={handleOptimizeToZero}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-3 rounded-xl shadow-md transition duration-200 border-none cursor-pointer"
                    >
                      Run Solver Optimization
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8 border-t pt-6" style={{ borderColor: 'var(--border-color)' }}>
                <button 
                  onClick={() => handleStepNavigation(4)}
                  className="bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 font-extrabold text-sm px-6 py-4 rounded-xl transition flex items-center gap-2 border-none cursor-pointer"
                >
                  <i className="fa-solid fa-arrow-left"></i> Back
                </button>
                <button 
                  onClick={() => alert('Tax estimation complete! Print or copy summary values to your e-Return portal.')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm px-8 py-4 rounded-xl transition shadow-md hover:shadow-emerald-500/20 flex items-center gap-2 border-none cursor-pointer"
                >
                  Complete e-Return Estimate
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
