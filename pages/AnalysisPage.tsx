
import React, { useState } from 'react';
import { MOCK_COMPONENTS, MOCK_APK } from '../mockData';
import { analyzeApkMetadata } from '../lib/ai';
import { ShieldAlert, Activity, GitBranch, Terminal, Sparkles, Loader2, Info } from 'lucide-react';

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
    <div className="space-y-8 relative">
      {isScanning && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-50 flex flex-col items-center justify-center rounded-2xl border border-indigo-100 shadow-xl">
           <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center text-center max-w-sm">
             <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
             <h4 className="text-xl font-bold text-slate-800 mb-2">AI Deep Scan in Progress</h4>
             <p className="text-slate-500 text-sm">Gemini 3 Pro is analyzing manifest activities and permission mappings to compute risk scores...</p>
           </div>
        </div>
      )}

      <div className="flex justify-between items-center border-b border-slate-200">
        <div className="flex">
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
        {activeTab === 'static' && (
          <button 
            onClick={runAiDeepScan}
            disabled={isScanning}
            className="mb-2 flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-md hover:shadow-indigo-200 transition"
          >
            <Sparkles size={16} /> {aiAnalysis.length > 0 ? 'Re-scan with AI' : 'AI Deep Scan'}
          </button>
        )}
      </div>

      {activeTab === 'static' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="font-bold flex items-center gap-2">
                  <ShieldAlert className="text-indigo-600" size={18} />
                  Risk Components Identified {aiAnalysis.length > 0 && <span className="text-[10px] bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded ml-2 tracking-widest font-black">AI POWERED</span>}
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                      <th className="px-6 py-3 font-semibold">Selector / ID</th>
                      <th className="px-6 py-3 font-semibold">Category</th>
                      <th className="px-6 py-3 font-semibold">Risk Score</th>
                      <th className="px-6 py-3 font-semibold">Reasoning</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentComponents.map((comp, idx) => (
                      <tr key={idx} className="hover:bg-indigo-50/30 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs text-slate-600">{comp.selector}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                            comp.category?.includes('Gesture') ? 'bg-orange-100 text-orange-700' :
                            comp.category?.includes('Modal') ? 'bg-red-100 text-red-700' :
                            comp.category?.includes('Context') ? 'bg-blue-100 text-blue-700' :
                            'bg-emerald-100 text-emerald-700'
                          }`}>
                            {comp.category || comp.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-bold ${comp.riskScore > 80 ? 'text-red-600' : 'text-slate-600'}`}>{comp.riskScore}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 max-w-xs">
                          <p className="text-[10px] text-slate-500 italic leading-tight">{comp.reasoning || 'Standard static signature match.'}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-indigo-900 text-white p-6 rounded-xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10"><Sparkles size={80}/></div>
              <h4 className="font-bold text-lg mb-2 z-10 relative">Project aqkdrf...</h4>
              <p className="text-indigo-100 text-sm leading-relaxed mb-4 z-10 relative">
                Static Analysis Stage 1: Parsing 5 Activities and 4 dangerous permissions.
              </p>
              <div className="flex gap-4 z-10 relative">
                <div className="text-center">
                  <p className="text-2xl font-bold">{MOCK_APK.activities.length}</p>
                  <p className="text-[10px] uppercase text-indigo-300">Activities</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{MOCK_APK.permissions.length}</p>
                  <p className="text-[10px] uppercase text-indigo-300">Permissions</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-sm text-slate-500 uppercase tracking-widest mb-4">Risk Factors</h4>
              <div className="space-y-4">
                {MOCK_APK.permissions.slice(0, 3).map((perm, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-mono">{perm}</span>
                    <span className="font-bold text-rose-500">HIGH RISK</span>
                  </div>
                ))}
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
            </div>
            <div className="relative h-[500px] border-2 border-dashed border-slate-100 rounded-lg flex items-center justify-center bg-slate-50">
                <p className="text-slate-400 text-sm font-medium italic">Interactive Transition Graph (SVG/D3 Rendering Engine)</p>
            </div>
          </div>
          <div className="space-y-6">
             <div className="bg-slate-900 text-emerald-400 p-6 rounded-xl font-mono text-[10px] shadow-2xl h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2 text-white">
                  <Terminal size={14} />
                  <span>DYNAMIC_TRACE_STREAM</span>
                </div>
                <div className="flex-1 space-y-2 overflow-y-auto">
                   <p>[INFO] Session Started: SID_X021</p>
                   <p>[TRACE] Activity Change -> MainActivity</p>
                   <p className="text-white font-bold">[EXPLORE] New State Detected: 0xFD21</p>
                   <p className="text-rose-400">[WARN] Unhandled Exception: NullPointer</p>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
