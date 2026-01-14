
import React, { useState, useEffect, useRef } from 'react';
import { Settings2, Play, Sliders, Dna, Database, Terminal, Activity, BrainCircuit, Loader2, CheckCircle2 } from 'lucide-react';
import { generateMockEpisodes } from '../mockData';
import { getRlAgentReasoning } from '../lib/ai';
import { EpisodeTest } from '../types';

export const RLConfigPage: React.FC = () => {
  const [isExploring, setIsExploring] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps] = useState(5);
  const [episodes, setEpisodes] = useState<EpisodeTest[]>([]);
  const [aiLog, setAiLog] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [aiLog]);

  const addLog = (msg: string) => setAiLog(prev => [...prev, msg]);

  const startExploration = async () => {
    setIsExploring(true);
    setCurrentStep(0);
    setAiLog([]);
    
    addLog("[INIT] Hybrid RL Agent V3.1 Online");
    addLog("[SYS] Establishing connection to emulator: emulator-5554");
    addLog("[DDQN] Initializing Q-Table with pre-trained weights from Project FinanceApp");
    
    const states = ["MainActivity", "LoginActivity", "DashboardActivity", "TransferActivity", "SettingsActivity"];
    const actions = [["TAP(Login)", "SWIPE(Gallery)", "BACK"], ["TYPE(Username)", "TAP(Submit)"], ["SWIPE(Transactions)", "TAP(Transfer)"], ["TYPE(Amount)", "TAP(Confirm)"], ["TOGGLE(Dark Mode)"]];

    for (let i = 0; i < totalSteps; i++) {
      setCurrentStep(i + 1);
      addLog(`[STEP ${i + 1}] Analyzing State: ${states[i]}...`);
      
      try {
        const reasoning = await getRlAgentReasoning(states[i], actions[i] || ["BACK"]);
        addLog(`[BRAIN] ${reasoning}`);
        const selected = (actions[i] || ["BACK"])[0];
        addLog(`[ACTION] Selected: ${selected}`);
        addLog(`[REWARD] +${Math.floor(Math.random() * 10)} (Novelty Gain)`);
        await new Promise(r => setTimeout(r, 1200));
      } catch (err) {
        addLog(`[ERROR] AI Reasoning timed out, falling back to epsilon-greedy.`);
      }
    }

    setEpisodes(generateMockEpisodes('run-rl-99'));
    setIsExploring(false);
    addLog("[COMPLETED] Exploration Run RUN-RL-99 finished.");
    addLog("[SYS] 15 episodes synced to Supabase storage.");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold flex items-center gap-2 mb-6 text-slate-800">
              <Settings2 size={18} className="text-indigo-600" />
              Agent Configuration
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Policy Network</label>
                <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20">
                  <option>Actor-Critic (A3C)</option>
                  <option>Transformer (GUI-Bert)</option>
                  <option>Double DQN (Stable)</option>
                </select>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-2">
                  <span>Learning Rate</span>
                  <span className="text-indigo-600">0.0003</span>
                </div>
                <input type="range" defaultValue="30" className="w-full accent-indigo-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold flex items-center gap-2 mb-6 text-slate-800">
              <Sliders size={18} className="text-indigo-600" />
              Reward Shaping
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs p-3 bg-indigo-50/50 rounded-lg border border-indigo-100/50 font-bold group hover:bg-indigo-50 transition-colors">
                <span className="text-indigo-700">New State Found</span>
                <span className="text-indigo-800 bg-white px-2 py-0.5 rounded shadow-sm">+5.0</span>
              </div>
              <div className="flex justify-between items-center text-xs p-3 bg-rose-50/50 rounded-lg border border-rose-100/50 font-bold group hover:bg-rose-50 transition-colors">
                <span className="text-rose-700">Crash Triggered</span>
                <span className="text-rose-800 bg-white px-2 py-0.5 rounded shadow-sm">+15.0</span>
              </div>
              <div className="flex justify-between items-center text-xs p-3 bg-slate-50 rounded-lg border border-slate-100 font-bold opacity-60">
                <span className="text-slate-600">Action Penalty</span>
                <span className="text-slate-700 bg-white px-2 py-0.5 rounded shadow-sm">-0.1</span>
              </div>
            </div>
          </div>

          <button
            onClick={startExploration}
            disabled={isExploring}
            className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl transition-all active:scale-95 ${
              isExploring ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200 hover:-translate-y-1'
            }`}
          >
            {isExploring ? <Loader2 className="animate-spin" /> : <Play size={20} fill="currentColor" />}
            {isExploring ? 'Explorer Active' : 'Start Exploration Run'}
          </button>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 rounded-2xl overflow-hidden flex flex-col h-[600px] shadow-2xl border border-slate-800 relative">
            <div className="bg-slate-800/80 backdrop-blur px-6 py-4 flex justify-between items-center border-b border-slate-700/50 z-10">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <div className="h-4 w-px bg-slate-700 mx-2"></div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <Terminal size={16} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-black">RL_LOG_STREAM</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {isExploring && (
                  <div className="flex items-center gap-2">
                    <div className="text-[10px] font-black text-indigo-400 animate-pulse uppercase">Step {currentStep}/{totalSteps}</div>
                    <div className="w-24 bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full transition-all duration-500" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                  <BrainCircuit size={14} className="text-indigo-500" />
                  AGI_REASONING: ON
                </div>
              </div>
            </div>
            
            <div ref={scrollRef} className="flex-1 p-8 font-mono text-[11px] overflow-y-auto space-y-2 scroll-smooth selection:bg-indigo-500 selection:text-white">
              {aiLog.length === 0 && !isExploring && (
                <div className="h-full flex flex-col items-center justify-center text-slate-700 space-y-6">
                  <div className="p-6 rounded-full bg-slate-800/50 border border-slate-700 shadow-inner">
                    <Activity size={48} className="opacity-20 animate-pulse" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-slate-500 mb-1 uppercase tracking-widest text-[10px]">Awaiting Agent Sequence</p>
                    <p className="text-xs italic text-slate-600">Hit "Start Exploration" to engage the Actor-Critic model</p>
                  </div>
                </div>
              )}
              {aiLog.map((line, i) => (
                <div key={i} className={`flex gap-3 animate-in slide-in-from-left-2 duration-300 ${line.startsWith('[BRAIN]') ? 'bg-indigo-950/40 p-3 rounded-lg border border-indigo-900/50 my-2' : ''}`}>
                  <span className="text-slate-600 select-none">{i.toString().padStart(3, '0')}</span>
                  <p className={
                    line.startsWith('[BRAIN]') ? 'text-indigo-300 italic' :
                    line.startsWith('[ACTION]') ? 'text-white font-black' :
                    line.startsWith('[SYS]') ? 'text-slate-500 font-bold' :
                    line.startsWith('[ERROR]') ? 'text-rose-500 font-bold' :
                    line.startsWith('[REWARD]') ? 'text-amber-400 font-bold' :
                    line.startsWith('[STEP]') ? 'text-emerald-400 font-black border-b border-emerald-900/50 pb-1 w-full mb-1' :
                    'text-emerald-500'
                  }>
                    {line}
                  </p>
                </div>
              ))}
              {isExploring && (
                <div className="flex gap-3 items-center text-emerald-500/50">
                   <span className="text-slate-600">{(aiLog.length).toString().padStart(3, '0')}</span>
                   <Loader2 size={12} className="animate-spin" />
                   <span className="animate-pulse">_</span>
                </div>
              )}
            </div>

            {/* Terminal Overlay for completed runs */}
            {!isExploring && aiLog.length > 0 && (
              <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-lg border border-emerald-500/20 backdrop-blur shadow-xl animate-in fade-in zoom-in">
                <CheckCircle2 size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Run Completed Successfully</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
