
import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, BarChart3, ArrowRight, Loader2, Globe, ExternalLink, RefreshCw, Zap, Search, Layout, Smartphone, Target, Info, Sparkles, CreditCard, Copy, Check, MessageSquareCode, Award, Share2, BrainCircuit, Mic, Bot, ShieldAlert, Code2, Cpu, Network, Activity, Smile } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { AnalysisStep, SEOAuditReport, Recommendation } from './types.ts';
import { analyzeRepository } from './services/gemini.ts';

const App: React.FC = () => {
  const [url, setUrl] = useState('https://google.com');
  const [step, setStep] = useState<AnalysisStep>(AnalysisStep.IDLE);
  const [report, setReport] = useState<SEOAuditReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingText, setLoadingText] = useState('Initializing Cognitive Audit...');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    let interval: any;
    if (step === AnalysisStep.ANALYZING) {
      const messages = [
        'Building Topical Knowledge Graph...',
        'Mapping Entity-Subject relationships...',
        'Analyzing Intent-Content alignment...',
        'Evaluating NLP Sentiment & Tone consistency...',
        'Executing JS Rendering Pipeline Simulation...',
        'Checking Googlebot-Smartphone traversal...',
        'Calculating SGE Information Gain...',
        'Scanning Security Integrity (CSP/HSTS)...',
        'Finalizing Cognitive Audit roadmap...'
      ];
      let i = 0;
      interval = setInterval(() => {
        setLoadingText(messages[i % messages.length]);
        i++;
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [step]);

  const handleAnalyze = async () => {
    if (!url) return;
    setStep(AnalysisStep.FETCHING);
    setError(null);
    
    try {
      setStep(AnalysisStep.ANALYZING);
      const result = await analyzeRepository(url);
      setReport(result);
      setStep(AnalysisStep.COMPLETED);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      setStep(AnalysisStep.ERROR);
    }
  };

  const handleCopyPrompt = (rec: Recommendation) => {
    const aiPrompt = `Act as an Expert Global SEO Architect and NLP Specialist. 
I am implementing a "Cognitive SEO" optimization.
Context:
- ISSUE: ${rec.title}
- CATEGORY: ${rec.category}
- DETAIL: ${rec.description}
- ACTIONABLE STEP: ${rec.actionableStep}

Please provide a master-level implementation. 
If it involves Entity SEO, provide the JSON-LD for Organization/Person/SameAs associations.
If it involves Search Intent, show me how to restructure the content to match user psychology.
If it involves Deep Tech, provide the code or config fixes.
Ensure the solution is future-proof for the 2025-2026 AI Search era.`;

    navigator.clipboard.writeText(aiPrompt);
    setCopiedId(rec.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'excellent': return 'text-emerald-400';
      case 'good': return 'text-sky-400';
      case 'average': return 'text-amber-400';
      case 'poor': return 'text-rose-400';
      default: return 'text-gray-400';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'low': return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getCategoryIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('entity')) return <Network size={18} />;
    if (cat.includes('intent')) return <Activity size={18} />;
    if (cat.includes('sentiment')) return <Smile size={18} />;
    if (cat.includes('security')) return <ShieldAlert size={18} />;
    if (cat.includes('deep') || cat.includes('tech')) return <Cpu size={18} />;
    if (cat.includes('rendering') || cat.includes('js')) return <Code2 size={18} />;
    if (cat.includes('ai') || cat.includes('sge')) return <BrainCircuit size={18} />;
    return <Target size={18} />;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 animate-fade-up">
      {/* Header */}
      <header className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest mb-8 animate-pulse">
          <Network size={14} />
          Ultimate 360° Cognitive SEO Audit
        </div>
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-sky-500/10 text-sky-400 border border-sky-500/20 glow-shadow">
            <ShieldCheck size={40} strokeWidth={1.5} />
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-white">
          Web <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">SEO Guard</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          The final evolution of site auditing. Analyzes <span className="text-emerald-400 font-bold">Entity Associations</span>, <span className="text-sky-400 font-bold">Search Intent</span>, and <span className="text-amber-400 font-bold">Deep Tech Integrity</span>.
        </p>
      </header>

      {/* Input Section */}
      <section className="max-w-3xl mx-auto mb-20">
        <div className="relative group">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-3xl blur-xl opacity-20 group-focus-within:opacity-40 transition duration-1000 group-focus-within:duration-200"></div>
          <div className="relative flex flex-col md:flex-row items-stretch md:items-center glass p-2.5 rounded-3xl">
            <div className="hidden md:flex pl-4 pr-2 text-gray-500">
              <Globe size={22} />
            </div>
            <input 
              type="text" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://yourwebsite.com"
              className="flex-grow bg-transparent border-none focus:ring-0 text-white px-4 py-4 text-xl placeholder:text-gray-600"
            />
            <button 
              onClick={handleAnalyze}
              disabled={step !== AnalysisStep.IDLE && step !== AnalysisStep.COMPLETED && step !== AnalysisStep.ERROR}
              className="mt-2 md:mt-0 bg-sky-600 hover:bg-sky-500 active:scale-95 text-white px-10 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-sky-900/20"
            >
              {step === AnalysisStep.IDLE || step === AnalysisStep.COMPLETED || step === AnalysisStep.ERROR ? (
                <>Start Full Scan <ArrowRight size={20} /></>
              ) : (
                <>Analyzing... <Loader2 size={20} className="animate-spin" /></>
              )}
            </button>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-gray-500 text-[10px] font-black uppercase tracking-widest">
          <span className="flex items-center gap-1.5"><Network size={12} className="text-emerald-400" /> Entity SEO</span>
          <span className="flex items-center gap-1.5"><Activity size={12} className="text-emerald-400" /> Search Intent</span>
          <span className="flex items-center gap-1.5"><Smile size={12} className="text-emerald-400" /> Sentiment</span>
          <span className="flex items-center gap-1.5"><Cpu size={12} className="text-sky-400" /> Deep Tech</span>
        </div>
        {error && (
          <div className="mt-6 p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center gap-4 animate-fade-up">
            <AlertTriangle size={24} />
            <span className="font-medium">{error}</span>
          </div>
        )}
      </section>

      {/* Loading State */}
      {(step === AnalysisStep.FETCHING || step === AnalysisStep.ANALYZING) && (
        <div className="text-center py-24 animate-fade-up">
          <div className="relative inline-block mb-8">
             <div className="absolute inset-0 bg-sky-500 blur-3xl opacity-20 animate-pulse"></div>
             <div className="relative z-10 p-10 glass rounded-full border border-sky-500/20">
                <Network size={80} strokeWidth={1} className="text-sky-400 animate-pulse" />
             </div>
          </div>
          <h3 className="text-3xl font-bold mb-3 text-white tracking-tight">{loadingText}</h3>
          <p className="text-gray-500 text-lg italic">Decoding the complex topical graph and behavioral signals of your domain...</p>
        </div>
      )}

      {/* Results Section */}
      {step === AnalysisStep.COMPLETED && report && (
        <div className="space-y-12 animate-fade-up">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass p-6 rounded-[2rem] border-sky-500/20">
             <div>
                <h2 className="text-2xl font-bold text-white mb-1">Ultimate Audit: {report.projectName}</h2>
                <p className="text-gray-400 text-sm">Cognitive & Deep Technical Scan completed on {new Date().toLocaleDateString()}</p>
             </div>
             <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-xl text-xs font-black uppercase tracking-widest border border-emerald-500/20">
                <Award size={16} />
                Master Class Report
             </div>
          </div>

          {/* Dashboard Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 glass p-10 rounded-[2.5rem] flex flex-col items-center justify-center text-center">
              <h4 className="text-gray-500 font-bold mb-8 uppercase tracking-[0.2em] text-[10px]">Composite Domain Authority</h4>
              <div className="relative">
                <svg className="w-56 h-56 transform -rotate-90">
                  <circle className="text-white/5" strokeWidth="12" stroke="currentColor" fill="transparent" r="90" cx="112" cy="112" />
                  <circle 
                    className="text-sky-500 transition-all duration-1000 ease-out" 
                    strokeWidth="12" 
                    strokeDasharray={2 * Math.PI * 90}
                    strokeDashoffset={2 * Math.PI * 90 * (1 - report.overallScore / 100)}
                    strokeLinecap="round" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="90" 
                    cx="112" 
                    cy="112" 
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center transform rotate-0">
                  <span className="text-7xl font-black text-white">{report.overallScore}</span>
                  <span className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mt-1">out of 100</span>
                </div>
              </div>
              <p className="mt-10 text-gray-300 text-lg font-medium leading-relaxed italic max-w-xs">
                "{report.summary}"
              </p>
            </div>

            <div className="lg:col-span-8 glass p-10 rounded-[2.5rem]">
              <div className="flex items-center justify-between mb-10">
                <h4 className="text-gray-100 font-bold text-xl flex items-center gap-3">
                  <BarChart3 size={24} className="text-sky-400" />
                  Cognitive Pillars
                </h4>
                <div className="flex gap-2 items-center text-[10px] font-black uppercase tracking-widest text-emerald-400">
                   <Sparkles size={14} /> Full Spectrum Verified
                </div>
              </div>
              
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={report.metrics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis 
                      dataKey="category" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#6b7280', fontSize: 10, fontWeight: 900}} 
                      dy={10}
                    />
                    <YAxis domain={[0, 100]} hide />
                    <Tooltip 
                      cursor={{fill: 'rgba(255,255,255,0.03)'}}
                      contentStyle={{ 
                        backgroundColor: '#111827', 
                        borderRadius: '16px', 
                        border: '1px solid rgba(255,255,255,0.1)', 
                        padding: '12px'
                      }}
                      itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                    />
                    <Bar dataKey="score" radius={[10, 10, 10, 10]} barSize={36}>
                      {report.metrics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#0ea5e9' : '#10b981'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                {report.metrics.map((m, i) => (
                  <div key={i} className="group p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-sky-500/30 transition-all duration-300">
                    <div className={`text-2xl font-black mb-1 ${getStatusColor(m.status)}`}>{m.score}%</div>
                    <div className="text-[9px] text-gray-500 uppercase font-black tracking-[0.15em] truncate">{m.category}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <section className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h3 className="text-3xl font-extrabold flex items-center gap-4 text-white tracking-tight">
                <Target size={32} className="text-emerald-400" />
                Growth Roadmap
              </h3>
              <p className="text-gray-500 text-sm font-medium italic">
                Advanced issues require <span className="text-sky-400">Implementation Prompts</span> for precise execution.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {report.recommendations.map((rec) => (
                <div key={rec.id} className="group glass p-8 rounded-[2rem] hover:bg-white/10 transition-all duration-500 border border-transparent hover:border-sky-500/10 hover:-translate-y-1">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-2">
                       <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black border ${getImpactColor(rec.impact)} uppercase tracking-widest`}>
                        {rec.impact} Impact
                       </span>
                       <span className="px-3 py-1.5 rounded-xl text-[10px] font-black bg-white/5 border border-white/10 text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                        {getCategoryIcon(rec.category)} {rec.category}
                       </span>
                    </div>
                  </div>
                  <h5 className="text-2xl font-bold mb-3 text-white tracking-tight">{rec.title}</h5>
                  <p className="text-gray-400 text-base leading-relaxed mb-8">{rec.description}</p>
                  
                  <div className="space-y-3">
                    <div className="p-6 bg-sky-500/5 rounded-2xl border border-sky-500/10 group-hover:bg-sky-500/10 transition-colors">
                      <div className="flex items-center gap-2 mb-3">
                        <Zap size={14} className="text-sky-400 fill-sky-400" />
                        <div className="text-[10px] text-sky-400 font-black uppercase tracking-[0.2em]">Strategy</div>
                      </div>
                      <p className="text-sky-100 font-medium leading-relaxed">{rec.actionableStep}</p>
                    </div>

                    <button 
                      onClick={() => handleCopyPrompt(rec)}
                      className="w-full flex items-center justify-between gap-3 px-6 py-4 rounded-2xl bg-sky-600/10 hover:bg-sky-600 text-white transition-all group/btn border border-sky-600/20 active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-3">
                        <MessageSquareCode size={18} />
                        <span className="text-sm font-bold tracking-tight">AI Implementation Prompt</span>
                      </div>
                      {copiedId === rec.id ? (
                        <Check size={18} className="text-emerald-400 animate-in zoom-in" />
                      ) : (
                        <Copy size={18} className="opacity-50 group-hover/btn:opacity-100" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* External Verification */}
          {report.sourceUrls && report.sourceUrls.length > 0 && (
            <div className="pt-12 border-t border-white/5">
              <div className="flex items-center gap-3 mb-6 text-gray-500">
                 <Info size={16} />
                 <h4 className="text-[10px] font-black uppercase tracking-[0.3em]">Authority Reference Points</h4>
              </div>
              <div className="flex flex-wrap gap-4">
                {report.sourceUrls.map((source, idx) => (
                  <a 
                    key={idx} 
                    href={source.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-sm text-gray-400 hover:text-white transition-all border border-white/5"
                  >
                    <ExternalLink size={14} />
                    <span className="font-medium">{source.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-center py-12">
             <button 
              onClick={() => {
                setStep(AnalysisStep.IDLE);
                setReport(null);
              }}
              className="flex items-center gap-3 px-10 py-5 rounded-3xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all border border-white/10 group active:scale-95"
             >
               <RefreshCw size={22} className="group-hover:rotate-180 transition-transform duration-500" /> Run Full 360° Scan
             </button>
          </div>
        </div>
      )}

      {/* Educational Landing Section */}
      {!report && step === AnalysisStep.IDLE && (
        <section className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Network size={28} />, title: "Entity SEO", desc: "Map your domain's identity within the Knowledge Graph. Moving from keywords to relational entities." },
            { icon: <Activity size={28} />, title: "Intent Alignment", desc: "Ensure your page type and content structure match the specific psychology of the searcher's query." },
            { icon: <Smile size={28} />, title: "Sentiment Analysis", desc: "Evaluate if the NLP sentiment and tone of your writing align with niche trust expectations." },
            { icon: <Cpu size={28} />, title: "Deep Tech Integrity", desc: "Analyze JavaScript hydration, crawl budget waste, and security headers for total search bot trust." }
          ].map((feature, i) => (
            <div key={i} className="group glass p-8 rounded-[2rem] hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-white/10 hover:-translate-y-2">
              <div className="bg-sky-500/10 text-sky-400 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white tracking-tight">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">{feature.desc}</p>
            </div>
          ))}
        </section>
      )}

      {/* Footer */}
      <footer className="mt-32 pt-12 border-t border-white/5 text-center text-gray-600">
        <div className="flex flex-wrap justify-center gap-8 mb-10 text-[10px] font-black uppercase tracking-[0.2em]">
          <span className="text-sky-400">Entity Analysis</span>
          <span className="hover:text-emerald-400 cursor-pointer transition-colors">Intent Alignment</span>
          <span className="hover:text-amber-400 cursor-pointer transition-colors">Cognitive NLP</span>
          <span className="hover:text-white cursor-pointer transition-colors">Deep-Tech Suite</span>
        </div>
        <p className="text-sm font-medium opacity-50">&copy; {new Date().getFullYear()} Web SEO Guard. The World's Most Comprehensive AI Auditor.</p>
      </footer>
    </div>
  );
};

export default App;
