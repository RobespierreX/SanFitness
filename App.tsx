
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Nutrition from './Nutrition';
import Workouts from './Workouts';
import Community from './Community';
import Onboarding from './Onboarding';
import Sidebar from './components/Sidebar';
import ChatAssistant from './components/ChatAssistant';
import Login from './Login';
import { LanguageProvider } from './context/LanguageContext';

const App: React.FC = () => {
  const hasCompletedOnboarding = localStorage.getItem('onboarding_complete') === 'true';

  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Redirect to onboarding if not complete */}
          <Route path="/" element={hasCompletedOnboarding ? <Navigate to="/dashboard" /> : <Navigate to="/onboarding" />} />

          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />

          <Route path="*" element={
            <div className="flex h-screen w-full overflow-hidden bg-background-dark">
              <Sidebar />
              <main className="flex-1 flex flex-col h-full relative overflow-hidden">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/nutrition" element={<Nutrition />} />
                  <Route path="/workouts" element={<Workouts />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
                {/* <ChatAssistant /> */}
              </main>
            </div>
          } />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;
