
import React, { useState } from 'react';
import { MOCK_PROJECTS, MOCK_APK } from '../mockData';
import { Plus, Package, Calendar, Tag, Shield, Cpu, ExternalLink } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-800">Your Projects</h3>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 transition">
          <Plus size={18} /> New Project
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {MOCK_PROJECTS.map((project) => (
          <div key={project.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition">
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-700">
                      <Cpu size={28} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">{project.name}</h4>
                      <p className="text-sm text-slate-500">{project.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Tag size={14} /> {project.targetVersion}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Calendar size={14} /> Created: {new Date(project.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 min-w-[300px]">
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Package size={12} /> Active APK: {MOCK_APK.filename}
                  </h5>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 font-medium">Version:</span>
                      <span className="font-bold text-slate-700">{MOCK_APK.version}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 font-medium">Permissions:</span>
                      <span className="font-bold text-slate-700">{MOCK_APK.permissions.length} Found</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 font-medium">Entry Points:</span>
                      <span className="font-bold text-slate-700">{MOCK_APK.activities.length} Activities</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 py-2 border border-indigo-200 text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-50 transition">
                    View Details
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-between items-center">
               <div className="flex items-center gap-4">
                 <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> EXPLORATION READY</span>
                 <span className="text-[10px] font-bold text-slate-400">LAST RUN: 2h ago</span>
               </div>
               <div className="flex gap-2">
                 <button className="p-1.5 hover:bg-white rounded text-slate-400 transition hover:text-indigo-600"><ExternalLink size={16}/></button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
