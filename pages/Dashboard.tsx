
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Legend, LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { 
  Bug, Target, Zap, Activity, Repeat, TrendingUp, ShieldAlert, 
  Layers, Dna, Cpu, CheckCircle2, Clock, Play
} from 'lucide-react';

const StatCard = ({ title, value, subtext, icon: Icon, color, trend }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className={`p-3 rounded-xl ${color} shadow-lg shadow-current/10`}>
        <Icon size={20} className="text-white" />
      </div>
      {trend && <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">{trend}</span>}
    </div>
    <div className="relative z-10">
      <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{title}</h3>
      <p className="text-3xl font-black text-slate-800 mt-1 tabular-nums">{value}</p>
      <p className="text-[10px] text-slate-400 mt-2 font-medium">{subtext}</p>
    </div>
    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
      <Icon size={100} />
    </div>
  </div>
);

const explorationData = [
  { name: 'Run 1', rl: 40, monkey: 30, fitness: 0.45 },
  { name: 'Run 2', rl: 65, monkey: 42, fitness: 0.62 },
  { name: 'Run 3', rl: 82, monkey: 51, fitness: 0.78 },
  { name: 'Run 4', rl: 90, monkey: 58, fitness: 0.85 },
  { name: 'Run 5', rl: 94, monkey: 62, fitness: 0.92 },
];

const riskDistData = [
  { name: 'Gesture', value: 35, color: '#f59e0b' },
  { name: 'Runtime', value: 25, color: '#6366f1' },
  { name: 'Modal', value: 20, color: '#f43f5e' },
  { name: 'Context', value: 20, color: '#10b981' },
];

export const Dashboard: React.FC = () => {
  const [view, setView] = useState<'overview' | 'baseline'>('overview');

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Research Pipeline Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100">
            <Cpu size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 uppercase tracking-tight">Active Project Pipeline</h1>
            <p className="text-xs text-slate-400 font-bold">Imran Thesis Framework :: FinanceApp_v2.0</p>
          </div>
        </div>
        <div className="flex gap-2">
          {[
            { label: 'Static', icon: Layers, status: 'completed' },
            { label: 'Dynamic', icon: Activity, status: 'completed' },
            { label: 'RL Explore', icon: Zap, status: 'running' },
            { label: 'GA Prioritize', icon: Dna, status: 'pending' },
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
              <step.icon size={16} className={step.status === 'completed' ? 'text-emerald-500' : step.status === 'running' ? 'text-indigo-600 animate-pulse' : 'text-slate-300'} />
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex p-1 bg-slate-200/50 rounded-xl w-fit">
        <button 
          onClick={() => setView('overview')}
          className={`px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${view === 'overview' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Research Overview
        </button>
        <button 
          onClick={() => setView('baseline')}
          className={`px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${view === 'baseline' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Baseline Benchmarks
        </button>
      </div>

      {view === 'overview' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="States Discovered" value="1,248" subtext="Unique UI nodes" icon={Activity} color="bg-indigo-600" trend="+12.4%" />
            <StatCard title="GUI Coverage" value="94.2%" subtext="Interaction depth" icon={Target} color="bg-emerald-500" trend="+4.1%" />
            <StatCard title="Crash Vectors" value="12" subtext="Unique fault paths" icon={Bug} color="bg-rose-500" trend="New detections" />
            <StatCard title="Avg Episode Reward" value="5.8k" subtext="Policy efficiency" icon={Zap} color="bg-amber-500" trend="+18.2%" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Coverage Growth Matrix</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> HYBRID RL</div>
                </div>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={explorationData}>
                    <defs>
                      <linearGradient id="colorCov" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
                      labelStyle={{ fontWeight: '900', color: '#1e293b' }}
                    />
                    <Area type="monotone" dataKey="rl" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorCov)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Static Risk Distribution</h3>
              <div className="flex-1 flex items-center justify-center">
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={riskDistData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {riskDistData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-6">
                {riskDistData.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-[10px] font-black text-slate-500 uppercase">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
             <div className="flex justify-between items-center mb-10">
                <div>
                   <h3 className="text-xl font-black text-slate-800">RL vs Random Baseline</h3>
                   <p className="text-xs text-slate-400 font-medium">Stage 2 Evaluation :: State discovery delta over time</p>
                </div>
                <div className="flex gap-6">
                   <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-indigo-600 rounded-full shadow-lg shadow-indigo-100"></div>
                      <span className="text-[10px] font-black uppercase text-slate-500">Hybrid RL Agent</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
                      <span className="text-[10px] font-black uppercase text-slate-400">Monkey (Random)</span>
                   </div>
                </div>
             </div>
             <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={explorationData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Line type="monotone" dataKey="rl" stroke="#6366f1" strokeWidth={5} dot={{ r: 6, fill: '#6366f1', strokeWidth: 4, stroke: '#fff' }} />
                      <Line type="monotone" dataKey="monkey" stroke="#cbd5e1" strokeWidth={3} strokeDasharray="10 10" />
                   </LineChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-indigo-900 p-6 rounded-2xl shadow-xl shadow-indigo-100 group">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1 group-hover:text-indigo-300">Discovery Speedup</p>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-black text-white">+52.4%</p>
                  <TrendingUp className="text-emerald-400" size={24} />
                </div>
             </div>
             <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">State Recall Accuracy</p>
                <p className="text-3xl font-black text-slate-800">89.4%</p>
             </div>
             <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Execution Overlap</p>
                <p className="text-3xl font-black text-rose-500">-24.1%</p>
             </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <Clock size={16} /> Chronological Run History
          </h3>
          <button className="text-indigo-600 text-[10px] font-black uppercase hover:underline">Download CSV Report</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                <th className="px-8 py-4">Execution Identity</th>
                <th className="px-8 py-4">Mechanism</th>
                <th className="px-8 py-4">Timestamp</th>
                <th className="px-8 py-4">Operational Status</th>
                <th className="px-8 py-4 text-right">Coverage Index</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { id: 'RUN-0821', type: 'Hybrid RL', date: '2024-03-10 14:30', status: 'Completed', coverage: '88.4%' },
                { id: 'RUN-0820', type: 'Static Analysis', date: '2024-03-10 12:15', status: 'Completed', coverage: '-' },
                { id: 'RUN-0819', type: 'GA Prioritization', date: '2024-03-10 09:45', status: 'Completed', coverage: '91.2%' },
              ].map((run, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5 font-mono text-xs font-bold text-slate-600">{run.id}</td>
                  <td className="px-8 py-5">
                    <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase ${
                      run.type.includes('RL') ? 'bg-indigo-100 text-indigo-700' : 
                      run.type.includes('GA') ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {run.type}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-xs text-slate-400 font-medium">{run.date}</td>
                  <td className="px-8 py-5">
                    <span className="text-emerald-500 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-tighter">
                      <CheckCircle2 size={14} /> {run.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right font-black text-slate-800 text-xs tracking-tighter">{run.coverage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
