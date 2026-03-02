
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
import AuthGuard from './components/AuthGuard';
import Profile from './Profile';
import MobileNav from './components/MobileNav';
import TrackOrder from './TrackOrder';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';
import LandingPage from './LandingPage';
import VoiceflowWidget from './components/VoiceflowWidget';

const App: React.FC = () => {
  const hasCompletedOnboarding = localStorage.getItem('onboarding_complete') === 'true';

  return (
    <LanguageProvider>
      <CartProvider>
        <Router>
          <CartDrawer />
          <Routes>
            <Route path="/" element={<LandingPage />} />

            {/* Redirect to onboarding if not complete */}
            <Route path="/start" element={hasCompletedOnboarding ? <Navigate to="/dashboard" /> : <Navigate to="/onboarding" />} />

            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/login" element={<Login />} />

            <Route path="/*" element={
              <AuthGuard>
                <div className="flex h-screen w-full overflow-hidden bg-background-dark">
                  <Sidebar />
                  <main className="flex-1 flex flex-col h-full relative overflow-hidden">
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/nutrition" element={<Nutrition />} />
                      <Route path="/workouts" element={<Workouts />} />
                      <Route path="/community" element={<Community />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/track-order" element={<TrackOrder />} />
                      <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>
                    {/* <ChatAssistant /> */}
                  </main>
                </div>
                <MobileNav />
                <VoiceflowWidget />
              </AuthGuard>
            } />
          </Routes>
        </Router>
      </CartProvider>
    </LanguageProvider>
  );
};

export default App;
