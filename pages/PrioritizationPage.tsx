
import React, { useState } from 'react';
import { generateMockEpisodes } from '../mockData';
import { ListOrdered, Filter, Download, Zap, Dna, Info, Code, X } from 'lucide-react';

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

  const generatePseudoScript = (ep: any) => {
    const script = `@Test\npublic void test_${ep.id}() {\n` +
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
               <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-md hover:bg-indigo-700 transition">Copy to Clipboard</button>
            </div>
          </div>
        </div>
      )}

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
                 <input type="range" min="0" max="1" step="0.1" value={weights.coverage} onChange={(e) => setWeights({...weights, coverage: Number(e.target.value)})} className="w-full accent-indigo-600" />
               </div>
               <div>
                 <div className="flex justify-between text-xs mb-1">
                   <span className="text-slate-500 font-bold uppercase">Fault Likelihood (w2)</span>
                   <span className="text-indigo-600 font-bold">{(weights.fault * 100).toFixed(0)}%</span>
                 </div>
                 <input type="range" min="0" max="1" step="0.1" value={weights.fault} onChange={(e) => setWeights({...weights, fault: Number(e.target.value)})} className="w-full accent-indigo-600" />
               </div>
               <div>
                 <div className="flex justify-between text-xs mb-1">
                   <span className="text-slate-500 font-bold uppercase">Novelty (w3)</span>
                   <span className="text-indigo-600 font-bold">{(weights.novelty * 100).toFixed(0)}%</span>
                 </div>
                 <input type="range" min="0" max="1" step="0.1" value={weights.novelty} onChange={(e) => setWeights({...weights, novelty: Number(e.target.value)})} className="w-full accent-indigo-600" />
               </div>
            </div>
          </div>

          <button onClick={runGA} disabled={isOptimizing} className={`w-full py-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all hover:bg-indigo-700 ${isOptimizing ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {isOptimizing ? <Dna className="animate-spin" /> : <Zap size={20} />}
            {isOptimizing ? 'Evolving Population...' : 'Run GA Prioritization'}
          </button>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2">
                <ListOrdered className="text-indigo-600" size={18} />
                Ranked Test Suite
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              {rankedEpisodes.length === 0 ? (
                <div className="p-12 text-center text-slate-400 font-medium">Run optimization to generate ranked test suite</div>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-wider font-bold">
                      <th className="px-6 py-3">Rank</th>
                      <th className="px-6 py-3">Episode ID</th>
                      <th className="px-6 py-3">Fitness</th>
                      <th className="px-6 py-3">Reasoning</th>
                      <th className="px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {rankedEpisodes.map((ep, idx) => (
                      <tr key={ep.id} className={`${idx < 3 ? 'bg-indigo-50/20' : ''} hover:bg-slate-50 transition-colors`}>
                        <td className="px-6 py-4 font-bold text-slate-600">{idx + 1}</td>
                        <td className="px-6 py-4 font-mono text-xs">{ep.id}</td>
                        <td className="px-6 py-4 font-bold text-indigo-700">{ep.fitness}</td>
                        <td className="px-6 py-4 text-xs italic text-slate-500">{idx === 0 ? 'Optimal risk coverage detected.' : 'Validates complex navigation path.'}</td>
                        <td className="px-6 py-4">
                           <button onClick={() => generatePseudoScript(ep)} className="text-indigo-600 hover:bg-indigo-50 p-1.5 rounded-lg transition"><Code size={16}/></button>
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
