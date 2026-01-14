
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend, LineChart, Line } from 'recharts';
import { Bug, Target, Zap, Activity, Repeat, TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, subtext, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
      <span className="text-xs font-bold text-green-500">+12% vs last</span>
    </div>
    <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
    <p className="text-xs text-slate-400 mt-2">{subtext}</p>
  </div>
);

const explorationData = [
  { name: '10m', rl: 40, monkey: 30 },
  { name: '20m', rl: 65, monkey: 42 },
  { name: '30m', rl: 82, monkey: 51 },
  { name: '40m', rl: 90, monkey: 58 },
  { name: '50m', rl: 94, monkey: 62 },
];

export const Dashboard: React.FC = () => {
  const [view, setView] = useState<'overview' | 'baseline'>('overview');

  return (
    <div className="space-y-8">
      <div className="flex p-1 bg-slate-200/50 rounded-xl w-fit">
        <button 
          onClick={() => setView('overview')}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition ${view === 'overview' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Overview Metrics
        </button>
        <button 
          onClick={() => setView('baseline')}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition ${view === 'baseline' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Baseline Comparison
        </button>
      </div>

      {view === 'overview' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total States" value="1,248" subtext="Unique UI screens detected" icon={Activity} color="bg-blue-500" />
            <StatCard title="Test Coverage" value="94.2%" subtext="Widget interaction depth" icon={Target} color="bg-emerald-500" />
            <StatCard title="Crashes Found" value="12" subtext="Total unique crash vectors" icon={Bug} color="bg-rose-500" />
            <StatCard title="Avg. Reward" value="5,820" subtext="RL Agent efficiency" icon={Zap} color="bg-amber-500" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold mb-6">Exploration Coverage Growth</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={explorationData}>
                    <defs>
                      <linearGradient id="colorCov" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="rl" stroke="#6366f1" fillOpacity={1} fill="url(#colorCov)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold mb-6">RL Reward Convergence</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={explorationData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="rl" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex justify-between items-center mb-8">
                <div>
                   <h3 className="text-xl font-bold">Hybrid RL vs Baseline (Monkey)</h3>
                   <p className="text-sm text-slate-500">Comparing state discovery efficiency over time</p>
                </div>
                <div className="flex gap-4">
                   <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                      <span className="text-xs font-bold">Hybrid RL</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
                      <span className="text-xs font-bold">Monkey (Random)</span>
                   </div>
                </div>
             </div>
             <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={explorationData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="rl" name="Hybrid RL Agent" stroke="#6366f1" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="monkey" name="Random Monkey" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="5 5" />
                   </LineChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">State Efficiency</p>
                <p className="text-2xl font-black text-indigo-600">+52%</p>
                <p className="text-[10px] text-slate-500">Faster than baseline</p>
             </div>
             <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Crash Recall</p>
                <p className="text-2xl font-black text-emerald-600">89.4%</p>
                <p className="text-[10px] text-slate-500">Top efficiency range</p>
             </div>
             <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Redundancy Rate</p>
                <p className="text-2xl font-black text-rose-600">-24%</p>
                <p className="text-[10px] text-slate-500">Lower than random</p>
             </div>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold mb-4">Recent Runs</h3>
        <div className="overflow-x-auto">
          <table className="w-100% text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-3 font-semibold text-slate-500 text-sm">Run ID</th>
                <th className="pb-3 font-semibold text-slate-500 text-sm">Type</th>
                <th className="pb-3 font-semibold text-slate-500 text-sm">Started At</th>
                <th className="pb-3 font-semibold text-slate-500 text-sm">Status</th>
                <th className="pb-3 font-semibold text-slate-500 text-sm">Coverage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-4 font-mono text-sm">RUN-0821</td>
                <td className="py-4"><span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs font-bold">Hybrid RL</span></td>
                <td className="py-4 text-sm text-slate-500">2024-03-10 14:30</td>
                <td className="py-4"><span className="text-emerald-500 flex items-center gap-1 text-sm font-medium"><Activity size={14}/> Completed</span></td>
                <td className="py-4 font-bold text-slate-700">88.4%</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-4 font-mono text-sm">RUN-0820</td>
                <td className="py-4"><span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-bold">Static Analysis</span></td>
                <td className="py-4 text-sm text-slate-500">2024-03-10 12:15</td>
                <td className="py-4"><span className="text-emerald-500 flex items-center gap-1 text-sm font-medium"><Activity size={14}/> Completed</span></td>
                <td className="py-4 font-bold text-slate-700">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
