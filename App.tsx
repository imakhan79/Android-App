
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { AnalysisPage } from './pages/AnalysisPage';
import { RLConfigPage } from './pages/RLConfigPage';
import { PrioritizationPage } from './pages/PrioritizationPage';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<div className="p-12 text-center text-slate-400">Project Management Module (v1.0.1)</div>} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/rl-config" element={<RLConfigPage />} />
          <Route path="/prioritization" element={<PrioritizationPage />} />
          <Route path="/metrics" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
