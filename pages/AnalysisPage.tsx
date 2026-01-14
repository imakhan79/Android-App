
import React, { useState } from 'react';
import { MOCK_COMPONENTS, MOCK_STATES, MOCK_TRANSITIONS } from '../mockData';
import { ShieldAlert, Activity, GitBranch, Terminal } from 'lucide-react';

export const AnalysisPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'static' | 'dynamic'>('static');

  return (
    <div className="space-y-8">
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('static')}
          className={`px-6 py-3 font-bold transition-all ${
            activeTab === 'static' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-400'
          }`}
        >
          Static Analysis
        </button>
        <button
          onClick={() => setActiveTab('dynamic')}
          className={`px-6 py-3 font-bold transition-all ${
            activeTab === 'dynamic' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-400'
          }`}
        >
          Dynamic Analysis
        </button>
      </div>

      {activeTab === 'static' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="font-bold flex items-center gap-2">
                  <ShieldAlert className="text-indigo-600" size={18} />
                  Risk Components Identified
                </h3>
                <span className="text-xs font-mono bg-indigo-100 text-indigo-700 px-2 py-1 rounded">APK_SOURCE: Manifest + XML</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                      <th className="px-6 py-3 font-semibold">Selector / ID</th>
                      <th className="px-6 py-3 font-semibold">Category</th>
                      <th className="px-6 py-3 font-semibold">Risk Score</th>
                      <th className="px-6 py-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {MOCK_COMPONENTS.map((comp) => (
                      <tr key={comp.id} className="hover:bg-indigo-50/30 transition-colors">
                        <td className="px-6 py-4 font-mono text-sm text-slate-600">{comp.selector}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                            comp.type.includes('Gesture') ? 'bg-orange-100 text-orange-700' :
                            comp.type.includes('Modal') ? 'bg-red-100 text-red-700' :
                            comp.type.includes('Context') ? 'bg-blue-100 text-blue-700' :
                            'bg-emerald-100 text-emerald-700'
                          }`}>
                            {comp.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden w-24">
                              <div 
                                className={`h-full rounded-full ${comp.riskScore > 80 ? 'bg-red-500' : comp.riskScore > 60 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                style={{ width: `${comp.riskScore}%` }}
                              />
                            </div>
                            <span className="text-sm font-bold">{comp.riskScore}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-indigo-600 hover:text-indigo-800 text-xs font-bold">Investigate</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-indigo-900 text-white p-6 rounded-xl shadow-xl">
              <h4 className="font-bold text-lg mb-2">Static Insight</h4>
              <p className="text-indigo-100 text-sm leading-relaxed mb-4">
                We detected 4 critical gesture-sensitive views in <code className="bg-indigo-800 px-1 rounded">TransferActivity</code>. These are high-priority targets for the RL agent to minimize interaction loops.
              </p>
              <div className="flex gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-[10px] uppercase text-indigo-300">Activities</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-[10px] uppercase text-indigo-300">Intents</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-[10px] uppercase text-indigo-300">Layouts</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-sm text-slate-500 uppercase tracking-widest mb-4">Undertested Risk Heatmap</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span>Gesture Views</span>
                  <span className="font-bold text-orange-600">85% Risk</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-orange-500 h-full" style={{ width: '85%' }}></div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Runtime Lists</span>
                  <span className="font-bold text-emerald-600">64% Risk</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: '64%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold flex items-center gap-2">
                <GitBranch className="text-indigo-600" size={18} />
                State-Transition Topology
              </h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">Reset Zoom</button>
                <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs font-bold">Download Trace</button>
              </div>
            </div>
            
            <div className="relative h-[500px] border-2 border-dashed border-slate-100 rounded-lg flex items-center justify-center bg-slate-50 overflow-hidden">
              {/* Mock D3 Graph Visualization */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                 <div className="grid grid-cols-8 gap-12">
                   {Array.from({length: 40}).map((_, i) => (
                     <div key={i} className="w-2 h-2 bg-indigo-900 rounded-full" />
                   ))}
                 </div>
              </div>
              
              <div className="relative z-10 flex flex-col items-center gap-8">
                <div className="flex gap-12">
                   <div className="w-24 h-24 rounded-2xl bg-white border-2 border-indigo-500 shadow-xl flex items-center justify-center flex-col p-2 text-center">
                     <span className="text-[10px] font-bold text-indigo-500">INIT</span>
                     <span className="text-[8px] text-slate-400 truncate w-full">MainActivity</span>
                   </div>
                   <div className="flex items-center">
                      <div className="h-0.5 w-16 bg-slate-300"></div>
                      <div className="w-2 h-2 rotate-45 border-t-2 border-r-2 border-slate-300 -ml-1"></div>
                   </div>
                   <div className="w-24 h-24 rounded-2xl bg-white border-2 border-slate-200 shadow-lg flex items-center justify-center flex-col p-2 text-center opacity-70">
                     <span className="text-[10px] font-bold text-slate-500">HASH_002</span>
                     <span className="text-[8px] text-slate-400 truncate w-full">TransferActivity</span>
                   </div>
                </div>
                <p className="text-slate-400 text-sm font-medium italic">Interactive Transition Graph (SVG/D3 Rendering Engine)</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
             <div className="bg-slate-900 text-emerald-400 p-6 rounded-xl font-mono text-[10px] shadow-2xl h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
                  <Terminal size={14} />
                  <span>DYNAMIC_TRACE_STREAM</span>
                </div>
                <div className="flex-1 space-y-2 overflow-y-auto">
                   <p>[INFO] Session Started: SID_X021</p>
                   <p>[TRACE] Activity Change -> MainActivity</p>
                   <p>[EVENT] TAP at (240, 1021) [OK]</p>
                   <p className="text-white font-bold">[EXPLORE] New State Detected: 0xFD21</p>
                   <p>[TRACE] Activity Change -> SettingsActivity</p>
                   <p className="text-rose-400">[WARN] Unhandled Exception: NullPointer</p>
                   <p>[TRACE] Activity Change -> CrashReporter</p>
                   <p>[SYSTEM] Rebooting explorer...</p>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
