
import React, { useState } from 'react';
import { generateMockEpisodes } from '../mockData';
import { ListOrdered, Filter, Download, Zap, Dna, Info } from 'lucide-react';

export const PrioritizationPage: React.FC = () => {
  const [weights, setWeights] = useState({ coverage: 0.4, fault: 0.3, novelty: 0.2, cost: 0.1 });
  const [rankedEpisodes, setRankedEpisodes] = useState<any[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const runGA = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      const episodes = generateMockEpisodes('ga-run-1');
      const ranked = episodes.map(ep => {
        const fitness = (weights.coverage * ep.depth * 0.5) + 
                        (weights.fault * ep.faultLikelihood * 10) + 
                        (weights.novelty * ep.novelty * 10) - 
                        (weights.cost * ep.timeCost / 1000);
        return { ...ep, fitness: fitness.toFixed(2) };
      }).sort((a, b) => Number(b.fitness) - Number(a.fitness));
      
      setRankedEpisodes(ranked);
      setIsOptimizing(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold flex items-center gap-2 mb-6">
              <Dna size={18} className="text-indigo-600" />
              Fitness Function
            </h3>
            <div className="space-y-4">
               <div>
                 <div className="flex justify-between text-xs mb-1">
                   <span className="text-slate-500 font-bold uppercase">Coverage Weight (w1)</span>
                   <span className="text-indigo-600 font-bold">{(weights.coverage * 100).toFixed(0)}%</span>
                 </div>
                 <input 
                   type="range" min="0" max="1" step="0.1" 
                   value={weights.coverage} 
                   onChange={(e) => setWeights({...weights, coverage: Number(e.target.value)})}
                   className="w-full accent-indigo-600" 
                 />
               </div>
               <div>
                 <div className="flex justify-between text-xs mb-1">
                   <span className="text-slate-500 font-bold uppercase">Fault Likelihood (w2)</span>
                   <span className="text-indigo-600 font-bold">{(weights.fault * 100).toFixed(0)}%</span>
                 </div>
                 <input 
                   type="range" min="0" max="1" step="0.1" 
                   value={weights.fault} 
                   onChange={(e) => setWeights({...weights, fault: Number(e.target.value)})}
                   className="w-full accent-indigo-600" 
                 />
               </div>
               <div>
                 <div className="flex justify-between text-xs mb-1">
                   <span className="text-slate-500 font-bold uppercase">Novelty (w3)</span>
                   <span className="text-indigo-600 font-bold">{(weights.novelty * 100).toFixed(0)}%</span>
                 </div>
                 <input 
                   type="range" min="0" max="1" step="0.1" 
                   value={weights.novelty} 
                   onChange={(e) => setWeights({...weights, novelty: Number(e.target.value)})}
                   className="w-full accent-indigo-600" 
                 />
               </div>
               <div>
                 <div className="flex justify-between text-xs mb-1">
                   <span className="text-slate-500 font-bold uppercase">Time Cost Penalty (w4)</span>
                   <span className="text-indigo-600 font-bold">{(weights.cost * 100).toFixed(0)}%</span>
                 </div>
                 <input 
                   type="range" min="0" max="1" step="0.1" 
                   value={weights.cost} 
                   onChange={(e) => setWeights({...weights, cost: Number(e.target.value)})}
                   className="w-full accent-indigo-600" 
                 />
               </div>
            </div>
          </div>

          <button
            onClick={runGA}
            disabled={isOptimizing}
            className={`w-full py-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all hover:bg-indigo-700 ${
              isOptimizing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isOptimizing ? <Dna className="animate-spin" /> : <Zap size={20} />}
            {isOptimizing ? 'Evolving Population...' : 'Run GA Prioritization'}
          </button>
          
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex gap-3">
             <Info className="text-indigo-600 shrink-0" size={20} />
             <p className="text-xs text-indigo-700 leading-relaxed">
               The Genetic Algorithm encodes each test episode as a chromosome and evolves it over 100 generations to maximize fault detection efficiency.
             </p>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2">
                <ListOrdered className="text-indigo-600" size={18} />
                Ranked Test Suite
              </h3>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 transition">
                  <Download size={14} /> Export JSON
                </button>
                <button className="flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition shadow-md">
                   Download Espresso Script
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              {rankedEpisodes.length === 0 ? (
                <div className="p-12 text-center">
                   <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                     <ListOrdered className="text-slate-300" size={32} />
                   </div>
                   <p className="text-slate-400 font-medium">Run optimization to generate ranked test suite</p>
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-wider font-bold">
                      <th className="px-6 py-3">Rank</th>
                      <th className="px-6 py-3">Episode ID</th>
                      <th className="px-6 py-3">Fitness</th>
                      <th className="px-6 py-3">Metrics (Cov / Fault / Nov)</th>
                      <th className="px-6 py-3">Reasoning</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {rankedEpisodes.map((ep, idx) => (
                      <tr key={ep.id} className={`${idx < 3 ? 'bg-indigo-50/20' : ''} hover:bg-slate-50 transition-colors`}>
                        <td className="px-6 py-4">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            idx === 0 ? 'bg-amber-100 text-amber-700 ring-2 ring-amber-400' :
                            idx === 1 ? 'bg-slate-200 text-slate-600' :
                            idx === 2 ? 'bg-orange-100 text-orange-600' :
                            'text-slate-400'
                          }`}>
                            {idx + 1}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-mono text-xs font-bold">{ep.id}</span>
                            <span className="text-[10px] text-slate-400">{ep.sequence.length} actions</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                           <span className="font-bold text-indigo-700 text-lg">{ep.fitness}</span>
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex gap-2">
                             <div className="text-[10px] text-center">
                               <p className="font-bold">{(ep.depth / 20 * 100).toFixed(0)}%</p>
                               <p className="text-slate-400">Cov</p>
                             </div>
                             <div className="text-[10px] text-center">
                               <p className="font-bold">{(ep.faultLikelihood * 100).toFixed(0)}%</p>
                               <p className="text-slate-400">Fault</p>
                             </div>
                             <div className="text-[10px] text-center">
                               <p className="font-bold">{(ep.novelty * 100).toFixed(0)}%</p>
                               <p className="text-slate-400">Nov</p>
                             </div>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-xs text-slate-600 max-w-xs italic leading-tight">
                            {idx === 0 ? 'Highest coverage of context-aware screens.' :
                             ep.crashFlag ? 'Detected potential crash vector in dynamic trace.' :
                             'Explores unique gesture sequence in TransferActivity.'}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
