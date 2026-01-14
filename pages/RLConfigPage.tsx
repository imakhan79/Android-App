
import React, { useState } from 'react';
import { Settings2, Play, Sliders, Dna, Database, Terminal, Activity, BrainCircuit } from 'lucide-react';
import { generateMockEpisodes } from '../mockData';
import { getRlAgentReasoning } from '../lib/ai';
import { EpisodeTest } from '../types';

export const RLConfigPage: React.FC = () => {
  const [isExploring, setIsExploring] = useState(false);
  const [episodes, setEpisodes] = useState<EpisodeTest[]>([]);
  const [aiLog, setAiLog] = useState<string[]>([]);

  const startExploration = async () => {
    setIsExploring(true);
    setAiLog(["[INIT] Hybrid RL Agent V3.1 Online", "[SYS] Establishing connection to emulator...", "[DDQN] Initializing Q-Table with random weights"]);
    
    // Simulate real exploration with AI reasoning
    setTimeout(async () => {
      const reasoning = await getRlAgentReasoning("MainActivity", ["TAP(Login)", "SWIPE(Gallery)", "BACK"]);
      setAiLog(prev => [...prev, `[BRAIN] ${reasoning}`, "[ACTION] Selected: TAP(Login)", "[STATE] Transitioned to LoginActivity (Hash: 0x221)"]);
    }, 1000);

    setTimeout(() => {
      setEpisodes(generateMockEpisodes('run-rl-99'));
      setIsExploring(false);
      setAiLog(prev => [...prev, "[COMPLETED] Run RUN-RL-99 finished. 15 episodes saved to Supabase."]);
    }, 4500);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold flex items-center gap-2 mb-6 text-slate-800">
              <Settings2 size={18} className="text-indigo-600" />
              Agent Hyperparameters
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase block mb-2">Policy Network (Actor)</label>
                <select className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium">
                  <option>3-Layer MLP (ReLU)</option>
                  <option>Transformer (GUI-Bert)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase block mb-2">Learning Rate (Alpha)</label>
                <input type="range" className="w-full accent-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold flex items-center gap-2 mb-6 text-slate-800">
              <Sliders size={18} className="text-indigo-600" />
              Reward Shaping
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs p-3 bg-indigo-50 rounded-lg border border-indigo-100 font-bold">
                <span className="text-indigo-700">New State Discovery</span>
                <span className="text-indigo-800">+5.0</span>
              </div>
              <div className="flex justify-between items-center text-xs p-3 bg-rose-50 rounded-lg border border-rose-100 font-bold">
                <span className="text-rose-700">App Crash Trigger</span>
                <span className="text-rose-800">+10.0</span>
              </div>
            </div>
          </div>

          <button
            onClick={startExploration}
            disabled={isExploring}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl transition-all ${
              isExploring ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-1'
            }`}
          >
            {isExploring ? <Activity className="animate-spin" /> : <Play size={20} />}
            {isExploring ? 'Explorer Active...' : 'Launch Hybrid RL Exploration'}
          </button>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 rounded-2xl overflow-hidden flex flex-col h-[600px] shadow-2xl border border-slate-800">
            <div className="bg-slate-800/80 backdrop-blur px-6 py-4 flex justify-between items-center border-b border-slate-700/50">
              <div className="flex items-center gap-2 text-emerald-400">
                <Terminal size={18} />
                <span className="font-mono text-xs uppercase tracking-widest font-black">Live Exploration Stream</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                <BrainCircuit size={12} className="text-indigo-400" />
                REASONING: ON
              </div>
            </div>
            
            <div className="flex-1 p-6 font-mono text-[11px] overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-slate-700">
              {aiLog.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4">
                  <Activity size={48} className="opacity-20" />
                  <p className="italic">Awaiting agent initialization...</p>
                </div>
              )}
              {aiLog.map((line, i) => (
                <p key={i} className={
                  line.startsWith('[BRAIN]') ? 'text-indigo-400 italic bg-indigo-950/30 p-1 rounded' :
                  line.startsWith('[ACTION]') ? 'text-white font-bold' :
                  line.startsWith('[SYS]') ? 'text-slate-500' :
                  line.startsWith('[DDQN]') ? 'text-amber-400' :
                  'text-emerald-500'
                }>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
