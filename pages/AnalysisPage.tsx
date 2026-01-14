
import React, { useState } from 'react';
import { MOCK_COMPONENTS, MOCK_APK, MOCK_STATES, MOCK_TRANSITIONS } from '../mockData';
import { analyzeApkMetadata } from '../lib/ai';
import { ShieldAlert, Activity, GitBranch, Terminal, Sparkles, Loader2, Info, ArrowRight, Eye, Layers } from 'lucide-react';

export const AnalysisPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'static' | 'dynamic'>('static');
  const [isScanning, setIsScanning] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<any[]>([]);

  const runAiDeepScan = async () => {
    setIsScanning(true);
    try {
      const results = await analyzeApkMetadata(MOCK_APK.activities, MOCK_APK.permissions);
      setAiAnalysis(results);
    } catch (err) {
      console.error("AI Analysis failed", err);
    } finally {
      setIsScanning(false);
    }
  };

  const currentComponents = aiAnalysis.length > 0 ? aiAnalysis : MOCK_COMPONENTS;

  return (
    <div className="space-y-8 relative animate-in fade-in duration-500">
      {isScanning && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[4px] z-50 flex flex-col items-center justify-center rounded-2xl border border-indigo-100 shadow-2xl">
           <div className="bg-white p-10 rounded-3xl shadow-2xl flex flex-col items-center text-center max-w-sm border border-slate-100">
             <div className="relative mb-6">
                <Loader2 className="animate-spin text-indigo-600" size={64} />
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-400" size={24} />
             </div>
             <h4 className="text-2xl font-black text-slate-800 mb-2">AI Agent Deep Scan</h4>
             <p className="text-slate-500 text-sm font-medium leading-relaxed">
               Gemini 3 Pro is dissecting the manifest, identifying gesture hooks, and evaluating risk surfaces based on runtime behaviors...
             </p>
           </div>
        </div>
      )}

      <div className="flex justify-between items-center border-b border-slate-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('static')}
            className={`px-8 py-4 font-black text-xs uppercase tracking-widest transition-all ${
              activeTab === 'static' ? 'border-b-2 border-indigo-600 text-indigo-600 bg-indigo-50/30' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Static Analysis
          </button>
          <button
            onClick={() => setActiveTab('dynamic')}
            className={`px-8 py-4 font-black text-xs uppercase tracking-widest transition-all ${
              activeTab === 'dynamic' ? 'border-b-2 border-indigo-600 text-indigo-600 bg-indigo-50/30' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Dynamic Analysis
          </button>
        </div>
        {activeTab === 'static' && (
          <button 
            onClick={runAiDeepScan}
            disabled={isScanning}
            className="mb-2 flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition active:scale-95"
          >
            <Sparkles size={14} fill="currentColor" /> {aiAnalysis.length > 0 ? 'Refresh AI Analysis' : 'Run AI Semantic Scan'}
          </button>
        )}
      </div>

      {activeTab === 'static' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-slate-50/50 p-5 border-b border-slate-200 flex justify-between items-center">
                <h3 className="font-black text-xs uppercase tracking-widest flex items-center gap-3 text-slate-800">
                  <Layers className="text-indigo-600" size={18} />
                  GUI Vulnerability Vectors
                  {aiAnalysis.length > 0 && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full tracking-tighter">AI-VALIDATED</span>}
                </h3>
                <div className="flex gap-1.5">
                   <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                   <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/30 text-slate-400 text-[10px] uppercase tracking-[0.15em] font-black border-b border-slate-100">
                      <th className="px-6 py-4">Component Identifier</th>
                      <th className="px-6 py-4">Taxonomy</th>
                      <th className="px-6 py-4">Risk Index</th>
                      <th className="px-6 py-4">AI Heuristic Reasoning</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentComponents.map((comp, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-6 py-5 font-mono text-[11px] text-slate-600 font-bold group-hover:text-indigo-600 transition-colors">{comp.selector}</td>
                        <td className="px-6 py-5">
                          <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-tight ${
                            (comp.category || comp.type)?.includes('Gesture') ? 'bg-orange-100 text-orange-700' :
                            (comp.category || comp.type)?.includes('Modal') ? 'bg-rose-100 text-rose-700' :
                            (comp.category || comp.type)?.includes('Context') ? 'bg-blue-100 text-blue-700' :
                            'bg-emerald-100 text-emerald-700'
                          }`}>
                            {comp.category || comp.type}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-slate-100 h-1.5 rounded-full min-w-[70px] overflow-hidden">
                              <div className={`h-full transition-all duration-1000 ${comp.riskScore > 80 ? 'bg-rose-500' : 'bg-indigo-500'}`} style={{ width: `${comp.riskScore}%` }}></div>
                            </div>
                            <span className={`text-[11px] font-black ${comp.riskScore > 80 ? 'text-rose-600' : 'text-slate-800'}`}>{comp.riskScore}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-5 max-w-xs">
                          <p className="text-[10px] text-slate-500 italic leading-snug font-medium line-clamp-2 hover:line-clamp-none transition-all">{comp.reasoning || 'Standard static pattern matching identified this as high-priority.'}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 text-white p-7 rounded-2xl shadow-2xl relative overflow-hidden border border-slate-800">
              <div className="absolute -bottom-10 -right-10 opacity-10 scale-150 rotate-12 pointer-events-none"><ShieldAlert size={160} className="text-indigo-400" /></div>
              <h4 className="font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2 text-indigo-400">
                <Activity size={16} />
                Run Intelligence
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed mb-6 font-medium">
                Deep-parsing the binary for manifest hooks. 4 critical vectors detected in APK version {MOCK_APK.version}.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 backdrop-blur">
                  <p className="text-2xl font-black text-white">{MOCK_APK.activities.length}</p>
                  <p className="text-[9px] uppercase font-black text-indigo-400 tracking-wider">Activities</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 backdrop-blur">
                  <p className="text-2xl font-black text-white">{MOCK_APK.permissions.length}</p>
                  <p className="text-[9px] uppercase font-black text-indigo-400 tracking-wider">Permissions</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h4 className="font-black text-[10px] text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                 <ShieldAlert size={14} className="text-rose-500" /> Critical Risk permissions
              </h4>
              <div className="space-y-3">
                {MOCK_APK.permissions.map((perm, i) => (
                  <div key={i} className="flex justify-between items-center bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 group hover:border-rose-200 transition-colors">
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-tighter">{perm}</span>
                    <span className="text-[9px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full ring-1 ring-rose-100 group-hover:animate-pulse">CRITICAL</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100 transition-colors">View Security Graph</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 relative overflow-hidden">
               {/* Background Grid for research feel */}
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              
              <div className="flex justify-between items-center mb-10 relative z-10">
                <h3 className="font-black text-sm uppercase tracking-widest flex items-center gap-3 text-slate-800">
                  <GitBranch className="text-indigo-600" size={18} />
                  Abstract State Transition Graph (ASTG)
                </h3>
                <div className="flex gap-4">
                   <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 rounded-full text-[10px] font-black text-indigo-600 border border-indigo-100">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div> EXPLORED NODES
                   </div>
                   <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full text-[10px] font-black text-slate-400 border border-slate-100">
                      <div className="w-2 h-2 rounded-full bg-slate-300"></div> FRONTIER
                   </div>
                </div>
              </div>

              <div className="relative h-[420px] bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-8 overflow-hidden z-10">
                  <div className="flex gap-16 relative z-10">
                    {MOCK_STATES.map((state, i) => (
                      <div key={state.id} className="flex flex-col items-center gap-6 group">
                        <div className="w-28 h-40 bg-white rounded-2xl border-2 border-indigo-600 shadow-2xl flex flex-col p-3 relative group-hover:-translate-y-2 transition-transform duration-300 cursor-help">
                          <div className="h-4 w-14 bg-indigo-100 rounded-md mb-3"></div>
                          <div className="space-y-2">
                             <div className="h-1.5 w-full bg-slate-100 rounded-full"></div>
                             <div className="h-1.5 w-4/5 bg-slate-100 rounded-full"></div>
                             <div className="h-1.5 w-2/3 bg-slate-100 rounded-full"></div>
                          </div>
                          <div className="mt-auto h-8 w-full bg-indigo-600 rounded-xl flex items-center justify-center text-[9px] text-white font-black uppercase tracking-tighter">Interaction</div>
                          <div className="absolute -top-4 -right-4 w-9 h-9 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-[11px] font-black border-4 border-white shadow-xl rotate-12">
                            #{(i+1).toString().padStart(2, '0')}
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] font-black text-slate-800 uppercase tracking-tighter">{state.activityName}</p>
                          <p className="text-[9px] text-slate-400 font-bold font-mono">{state.hash}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Decorative paths */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
                    <path d="M 300 200 Q 450 100 600 200" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" className="text-indigo-600" />
                    <path d="M 600 200 Q 750 300 900 200" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" className="text-indigo-600" />
                  </svg>
                  <p className="mt-16 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">Graph auto-scaled to fit viewport</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
               <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Sequence Transition Log</h4>
                  <span className="text-[10px] font-bold text-indigo-600">{MOCK_TRANSITIONS.length} Paths Resolved</span>
               </div>
               <div className="divide-y divide-slate-100">
                  {MOCK_TRANSITIONS.map(t => (
                    <div key={t.id} className="px-8 py-5 flex items-center justify-between hover:bg-slate-50 transition group">
                       <div className="flex items-center gap-6">
                          <div className="flex items-center gap-3">
                            <span className="text-[9px] font-black text-slate-300 uppercase">From</span>
                            <span className="px-3 py-1.5 bg-slate-100 rounded-lg text-[10px] font-mono text-slate-600 font-bold group-hover:bg-slate-200 transition-colors">{t.fromStateHash}</span>
                          </div>
                          <ArrowRight size={16} className="text-indigo-300 group-hover:translate-x-1 transition-transform" />
                          <div className="flex items-center gap-3">
                            <span className="text-[9px] font-black text-indigo-300 uppercase">To</span>
                            <span className="px-3 py-1.5 bg-indigo-50 rounded-lg text-[10px] font-mono text-indigo-600 font-bold group-hover:bg-indigo-100 transition-colors">{t.toStateHash}</span>
                          </div>
                       </div>
                       <div className="flex items-center gap-10">
                          <div className="text-right">
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Action Method</p>
                             <p className="text-xs font-black text-slate-800 group-hover:text-indigo-600 transition-colors">{t.actionType}</p>
                          </div>
                          <div className="text-right min-w-[120px]">
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Trigger Vector</p>
                             <p className="text-xs font-mono font-bold text-slate-500 truncate max-w-[100px]">{t.actionMeta}</p>
                          </div>
                          <button className="p-2.5 hover:bg-white rounded-xl transition text-slate-400 hover:text-indigo-600 shadow-sm border border-transparent hover:border-slate-100">
                            <Eye size={18} />
                          </button>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
          
          <div className="space-y-6">
             <div className="bg-slate-900 text-emerald-400 p-6 rounded-3xl font-mono text-[11px] shadow-2xl h-[560px] flex flex-col border border-slate-800 relative group">
                <div className="absolute top-4 right-4 animate-pulse h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
                <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3 text-white">
                    <Terminal size={18} className="text-emerald-500" />
                    <span className="font-black text-xs uppercase tracking-[0.1em]">Dynamic Probe Activity</span>
                  </div>
                </div>
                <div className="flex-1 space-y-3 overflow-y-auto scrollbar-none pr-2">
                   <div className="space-y-1">
                      <p className="text-slate-500 text-[10px]">[{new Date().toLocaleTimeString()}] INFRA_CONNECT_START</p>
                      <p className="text-slate-400">ADB handshake confirmed: dev=nexus_6p</p>
                   </div>
                   <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                      <p className="text-indigo-400 font-bold uppercase text-[9px]">Activity_Manager_v2</p>
                      <p className="text-indigo-300">Target Focus -> FinanceApp.MainActivity</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-emerald-500/80">Computed State Entropy: 4.82 bits</p>
                      <p className="text-emerald-400 font-black">UI_HASH_RESULT :: 0xFD21</p>
                   </div>
                   <div className="p-2 bg-slate-800 rounded-lg">
                      <p className="text-slate-400 text-[9px] uppercase">Input_Dispatch</p>
                      <p className="text-white">TAP (element_id: btn_login_001)</p>
                   </div>
                   <div className="flex items-center gap-2 py-2">
                      <GitBranch size={12} />
                      <p className="text-indigo-400">Context Fork -> LoginActivity (Auth Required)</p>
                   </div>
                   <div className="p-2 bg-rose-500/10 rounded-lg border border-rose-500/20">
                      <p className="text-rose-400 font-black uppercase text-[9px]">Anomalous Pattern Detected</p>
                      <p className="text-rose-300">LazyColumn runtime loading failure - UI thread stutter (240ms)</p>
                   </div>
                   <div className="animate-pulse flex items-center gap-2 text-emerald-400 mt-4">
                      <span className="w-1.5 h-3 bg-emerald-500"></span>
                      <span>Awaiting next packet...</span>
                   </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between text-[10px] font-bold text-slate-500">
                   <span className="uppercase tracking-widest">Buffer: 4.2 MB</span>
                   <span className="uppercase tracking-widest text-emerald-500">Active</span>
                </div>
             </div>

             <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                   <Activity size={14} className="text-indigo-600" /> Metric Aggregation
                </h4>
                <div className="grid grid-cols-2 gap-6 relative z-10">
                   <div className="space-y-1">
                      <p className="text-2xl font-black text-slate-800 tabular-nums tracking-tighter">1.2s</p>
                      <p className="text-[9px] uppercase font-black text-slate-400 tracking-wider">Avg Response</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-2xl font-black text-emerald-600 tabular-nums tracking-tighter">12</p>
                      <p className="text-[9px] uppercase font-black text-slate-400 tracking-wider">Paths/Min</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
