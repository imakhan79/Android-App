
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Bug, Target, Zap, Activity } from 'lucide-react';

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

const data = [
  { name: 'Mon', coverage: 40, reward: 2400 },
  { name: 'Tue', coverage: 45, reward: 2100 },
  { name: 'Wed', coverage: 65, reward: 3800 },
  { name: 'Thu', coverage: 78, reward: 4300 },
  { name: 'Fri', coverage: 82, reward: 5200 },
  { name: 'Sat', coverage: 90, reward: 6100 },
  { name: 'Sun', coverage: 94, reward: 5800 },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
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
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorCov" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="coverage" stroke="#6366f1" fillOpacity={1} fill="url(#colorCov)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6">RL Reward Convergence</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="reward" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

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
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-4 font-mono text-sm">RUN-0819</td>
                <td className="py-4"><span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs font-bold">GA Optimization</span></td>
                <td className="py-4 text-sm text-slate-500">2024-03-09 18:45</td>
                <td className="py-4"><span className="text-rose-500 flex items-center gap-1 text-sm font-medium">Failed</span></td>
                <td className="py-4 font-bold text-slate-700">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
