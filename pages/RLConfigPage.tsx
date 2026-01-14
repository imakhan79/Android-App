
import React, { useState } from 'react';
// Added Activity to the imports to resolve "Cannot find name 'Activity'" error
import { Settings2, Play, Sliders, Dna, Database, Terminal, Activity } from 'lucide-react';
import { generateMockEpisodes } from '../mockData';
import { EpisodeTest } from '../types';

export const RLConfigPage: React.FC = () => {
  const [isExploring, setIsExploring] = useState(false);
  const [episodes, setEpisodes] = useState<EpisodeTest[]>([]);

  const startExploration = () => {
    setIsExploring(true);
    setTimeout(() => {
      setEpisodes(generateMockEpisodes('run-rl-99'));
      setIsExploring(false);
    }, 3000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold flex items-center gap-2 mb-6">
              <Settings2 size={18} className="text-indigo-600" />
              Agent Hyperparameters
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Policy Network (Actor)</label>
                <select className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                  <option>3-Layer MLP (ReLU)</option>
                  <option>LSTM-Recurrent</option>
                  <option>Transformer-based</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Learning Rate (Alpha)</label>
                <input type="range" className="w-full accent-indigo-600" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Exploration Rate (Epsilon)</label>
                <div className="flex gap-2">
                  <input type="number" defaultValue={0.15} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold flex items-center gap-2 mb-6">
              <Sliders size={18} className="text-indigo-600" />
              Reward Shaping
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                <span className="font-medium">New State Discovery</span>
                <span className="font-bold text-indigo-700">+5.0</span>
              </div>
              <div className="flex justify-between items-center text-sm p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                <span className="font-medium">High-Risk Interaction</span>
                <span className="font-bold text-emerald-700">+3.0</span>
              </div>
              <div className="flex justify-between items-center text-sm p-3 bg-rose-50 rounded-lg border border-rose-100">
                <span className="font-medium">App Crash Trigger</span>
                <span className="font-bold text-rose-700">+10.0</span>
              </div>
              <div className="flex justify-between items-center text-sm p-3 bg-slate-50 rounded-lg border border-slate-200 opacity-60">
                <span className="font-medium">Action Redundancy</span>
                <span className="font-bold text-slate-700">-1.0</span>
              </div>
            </div>
          </div>

          <button
            onClick={startExploration}
            disabled={isExploring}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${
              isExploring ? 'bg-slate-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-1'
            }`}
          >
            {isExploring ? (
              // Fix: Added Activity to lucide-react imports for this loading spinner
              <Activity className="animate-spin" />
            ) : (
              <Play size={20} />
            )}
            {isExploring ? 'Explorer Running...' : 'Launch Hybrid RL Exploration'}
          </button>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 rounded-xl overflow-hidden flex flex-col h-[600px] shadow-2xl">
            <div className="bg-slate-800 px-6 py-4 flex justify-between items-center border-b border-slate-700">
              <div className="flex items-center gap-2 text-emerald-400">
                <Terminal size={18} />
                <span className="font-mono text-sm uppercase tracking-widest font-bold">Explorer Live Monitor</span>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse"></div>
                <span className="text-slate-400 text-[10px] font-bold">CONNECTED: EMULATOR_5554</span>
              </div>
            </div>
            
            <div className="flex-1 p-6 font-mono text-sm overflow-y-auto space-y-1">
              {!isExploring && episodes.length === 0 && (
                <div className="h-full flex items-center justify-center text-slate-600 italic">
                  Waiting for exploration start signal...
                </div>
              )}
              {isExploring && (
                <div className="space-y-1">
                  <p className="text-slate-500">[{new Date().toLocaleTimeString()}] Starting Actor-Critic Agent...</p>
                  <p className="text-indigo-400">[{new Date().toLocaleTimeString()}] DDQN Target Network Initialized.</p>
                  <p className="text-emerald-400">[{new Date().toLocaleTimeString()}] State 0x001 detected. Rewarding: +5.0</p>
                  <p className="text-slate-300">[{new Date().toLocaleTimeString()}] Action: TAP -> ID(btn_login)</p>
                  <p className="text-emerald-400">[{new Date().toLocaleTimeString()}] State 0x01A detected. Rewarding: +5.0</p>
                  <p className="text-slate-300">[{new Date().toLocaleTimeString()}] Action: SWIPE_UP -> Gesture Component</p>
                  <p className="text-emerald-400">[{new Date().toLocaleTimeString()}] Reward +3.0 (Gesture Interaction)</p>
                  <p className="text-rose-400">[{new Date().toLocaleTimeString()}] !!! CRASH DETECTED !!! Signal 11 (SIGSEGV)</p>
                  <p className="text-rose-400">[{new Date().toLocaleTimeString()}] Critical Reward: +10.0</p>
                </div>
              )}
              {!isExploring && episodes.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {episodes.slice(0, 6).map(ep => (
                    <div key={ep.id} className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold text-slate-400">{ep.id}</span>
                        {ep.crashFlag && <span className="bg-rose-500/20 text-rose-500 px-2 py-0.5 rounded text-[10px] font-bold">CRASH</span>}
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-xs text-slate-500">Total Reward</p>
                          <p className="text-lg font-bold text-emerald-400">{ep.totalReward}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-slate-500">Steps: {ep.sequence.length}</p>
                          <p className="text-[10px] text-slate-500">Depth: {ep.depth}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="md:col-span-2 flex justify-center py-4">
                    <button className="bg-indigo-600 text-white px-6 py-2 rounded-full text-xs font-bold shadow-lg">View All 15 Generated Episodes</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
