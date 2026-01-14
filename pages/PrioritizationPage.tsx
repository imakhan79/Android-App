
import React, { useState } from 'react';
import { generateMockEpisodes } from '../mockData';
import { ListOrdered, Filter, Download, Zap, Dna, Info, Code, X, FileJson } from 'lucide-react';

export const PrioritizationPage: React.FC = () => {
  const [weights, setWeights] = useState({ coverage: 0.4, fault: 0.3, novelty: 0.2, cost: 0.1 });
  const [rankedEpisodes, setRankedEpisodes] = useState<any[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showScript, setShowScript] = useState<string | null>(null);

  const runGA = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      const episodes = generateMockEpisodes('ga-run-1');
      const ranked = episodes.map(ep => {
        // Fitness = w1Coverage + w2FaultLikelihoodRL + w3Novelty - w4TimeCost
        // Scaling factors to keep metrics comparable
        const fitness = (weights.coverage * (ep.depth / 20)) + 
                        (weights.fault * ep.faultLikelihood) + 
                        (weights.novelty * ep.novelty) - 
                        (weights.cost * (ep.timeCost / 5000));
        return { ...ep, fitness: fitness.toFixed(4) };
      }).sort((a, b) => Number(b.fitness) - Number(a.fitness));
      
      setRankedEpisodes(ranked);
      setIsOptimizing(false);
    }, 2000);
  };

  const downloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(rankedEpisodes, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "prioritized_test_suite.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const generatePseudoScript = (ep: any) => {
    const script = `@Test\npublic void test_${ep.id.replace('-', '_')}() {\n` +
      `  // Generated via Hybrid RL + GA Prioritization\n` +
      `  // Fitness Score: ${ep.fitness}\n` +
      ep.sequence.map((step: any) => {
        if (step.action === 'TAP') return `  onView(withId(R.id.${step.state.toLowerCase()}_btn)).perform(click());`;
        if (step.action === 'TYPE') return `  onView(withId(R.id.${step.state.toLowerCase()}_input)).perform(typeText("automated_test"));`;
        return `  onView(withId(R.id.${step.state.toLowerCase()})).perform(swipeUp());`;
      }).join('\n') +
      `\n  // Assert end state\n  onView(isRoot()).check(matches(isDisplayed()));\n}`;
    setShowScript(script);
  };

  return (
    <div className="space-y-8">
      {showScript && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
               <h4 className="font-bold flex items-center gap-2"><Code size={18} className="text-indigo-600"/> Espresso Template Preview</h4>
               <button onClick={() => setShowScript(null)} className="p-1 hover:bg-slate-200 rounded transition"><X size={20}/></button>
            </div>
            <div className="flex-1 overflow-auto p-6 bg-slate-900">
               <pre className="text-emerald-400 font-mono text-sm leading-relaxed">
                 {showScript}
               </pre>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
               <button 
                 onClick={() => {
                   navigator.clipboard.writeText(showScript);
                   alert('Copied to clipboard!');
                 }}
                 className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-md hover:bg-indigo-700 transition">Copy to Clipboard</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold flex items-center gap-2 mb-6 text-slate-800">
              <Dna size={18} className="text-indigo-600" />
              GA Parameters
            </h3>
            <div className="space-y-5">
               <div>
                 <div className="flex justify-between text-[10px] mb-2">
                   <span className="text-slate-500 font-bold uppercase tracking-widest">w1: Coverage</span>
                   <span className="text-indigo-600 font-bold">{(weights.coverage * 100).toFixed(0)}%</span>
                 </div>
                 <input type="range" min="0" max="1" step="0.05" value={weights.coverage} onChange={(e) => setWeights({...weights, coverage: Number(e.target.value)})} className="w-full accent-indigo-600" />
               </div>
               <div>
                 <div className="flex justify-between text-[10px] mb-2">
                   <span className="text-slate-500 font-bold uppercase tracking-widest">w2: Fault Likelihood</span>
                   <span className="text-indigo-600 font-bold">{(weights.fault * 100).toFixed(0)}%</span>
                 </div>
                 <input type="range" min="0" max="1" step="0.05" value={weights.fault} onChange={(e) => setWeights({...weights, fault: Number(e.target.value)})} className="w-full accent-indigo-600" />
               </div>
               <div>
                 <div className="flex justify-between text-[10px] mb-2">
                   <span className="text-slate-500 font-bold uppercase tracking-widest">w3: Novelty</span>
                   <span className="text-indigo-600 font-bold">{(weights.novelty * 100).toFixed(0)}%</span>
                 </div>
                 <input type="range" min="0" max="1" step="0.05" value={weights.novelty} onChange={(e) => setWeights({...weights, novelty: Number(e.target.value)})} className="w-full accent-indigo-600" />
               </div>
               <div>
                 <div className="flex justify-between text-[10px] mb-2">
                   <span className="text-slate-500 font-bold uppercase tracking-widest">w4: Time Cost (-)</span>
                   <span className="text-rose-600 font-bold">{(weights.cost * 100).toFixed(0)}%</span>
                 </div>
                 <input type="range" min="0" max="1" step="0.05" value={weights.cost} onChange={(e) => setWeights({...weights, cost: Number(e.target.value)})} className="w-full accent-rose-600" />
               </div>
            </div>
          </div>

          <button onClick={runGA} disabled={isOptimizing} className={`w-full py-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all hover:bg-indigo-700 active:translate-y-0.5 ${isOptimizing ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {isOptimizing ? <Dna className="animate-spin" /> : <Zap size={20} />}
            {isOptimizing ? 'Evolving Population...' : 'Run GA Prioritization'}
          </button>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm h-full flex flex-col">
            <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2 text-slate-800">
                <ListOrdered className="text-indigo-600" size={18} />
                Prioritized Test Suite
              </h3>
              {rankedEpisodes.length > 0 && (
                <button onClick={downloadJson} className="flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition">
                  <FileJson size={14} /> Export Results
                </button>
              )}
            </div>
            
            <div className="flex-1 overflow-x-auto">
              {rankedEpisodes.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-slate-400 font-medium">
                  <div className="p-4 bg-slate-50 rounded-full mb-4">
                    <Filter size={32} />
                  </div>
                  <p>Configure weights and run optimization to rank generated tests</p>
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50 text-slate-500 text-[10px] uppercase tracking-wider font-black">
                      <th className="px-6 py-4">Rank</th>
                      <th className="px-6 py-4">Episode ID</th>
                      <th className="px-6 py-4">Fitness Score</th>
                      <th className="px-6 py-4">Fault Likelihood</th>
                      <th className="px-6 py-4">Time Cost</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {rankedEpisodes.map((ep, idx) => (
                      <tr key={ep.id} className={`${idx < 3 ? 'bg-indigo-50/30' : ''} hover:bg-slate-50/80 transition-colors group`}>
                        <td className="px-6 py-4">
                           <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${
                             idx === 0 ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                             idx === 1 ? 'bg-slate-200 text-slate-700' :
                             idx === 2 ? 'bg-orange-100 text-orange-700' :
                             'text-slate-400'
                           }`}>
                             {idx + 1}
                           </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-mono text-xs font-bold text-slate-600">{ep.id}</span>
                          {ep.crashFlag && <span className="ml-2 text-[9px] bg-rose-500 text-white px-1.5 py-0.5 rounded-full font-bold">CRASH_PROBABLE</span>}
                        </td>
                        <td className="px-6 py-4 font-black text-indigo-600">{ep.fitness}</td>
                        <td className="px-6 py-4">
                          <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                             <div className="bg-rose-500 h-full" style={{ width: `${ep.faultLikelihood * 100}%` }}></div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-500 font-medium">{ep.timeCost}ms</td>
                        <td className="px-6 py-4 text-center">
                           <button onClick={() => generatePseudoScript(ep)} title="Export Espresso Script" className="text-indigo-600 hover:bg-indigo-100 p-2 rounded-lg transition-all active:scale-95">
                             <Code size={18}/>
                           </button>
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
