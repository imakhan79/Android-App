
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, ShieldAlert, Cpu, ListOrdered, BarChart3, Settings } from 'lucide-react';

const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
  
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </Link>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-10">
        <div className="p-6">
          <h1 className="text-xl font-bold text-indigo-700 flex items-center gap-2">
            <Cpu size={24} />
            AndroidSmartGUI
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Testing Platform</p>
        </div>
        
        <nav className="flex-1 px-4 py-2 space-y-1">
          <NavItem to="/" icon={LayoutDashboard} label="Dashboard" />
          <NavItem to="/projects" icon={FolderKanban} label="Projects" />
          <NavItem to="/analysis" icon={ShieldAlert} label="Static Analysis" />
          <NavItem to="/rl-config" icon={Settings} label="RL Explorer" />
          <NavItem to="/prioritization" icon={ListOrdered} label="Test Suite GA" />
          <NavItem to="/metrics" icon={BarChart3} label="Evaluation" />
        </nav>
        
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
              QA
            </div>
            <div>
              <p className="text-sm font-semibold">Lead Engineer</p>
              <p className="text-xs text-slate-500">Active Session</p>
            </div>
          </div>
        </div>
      </aside>
      
      <main className="flex-1 ml-64 p-8">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Workspace</h2>
            <p className="text-slate-500 text-sm">Automated Android UI Exploration & Prioritization</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition shadow-md">
              New Project
            </button>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
};
