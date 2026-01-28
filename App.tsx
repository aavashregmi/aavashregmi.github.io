
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, User, signOut, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectsGrid from './components/ProjectsGrid';
import AboutMe from './components/AboutMe';
import ContactMe from './components/ContactMe';
import AuthModal from './components/AuthModal';
import ProductivityTracker from './projects/ProductivityTracker';
import AircraftSim from './projects/AircraftSim';
import GeographyExplorer from './projects/GeographyExplorer';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setIsAuthModalOpen(false);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500 selection:text-black">
      <Navbar 
        user={user} 
        onAuthClick={() => setIsAuthModalOpen(true)} 
        onLogout={handleLogout} 
      />

      <Routes>
        <Route path="/" element={
          <main>
            <section id="home">
              <Hero />
            </section>
            <section id="projects" className="py-24 px-6 md:px-12 lg:px-24">
              <ProjectsGrid />
            </section>
            <section id="about" className="py-24 px-6 md:px-12 lg:px-24 bg-zinc-950">
              <AboutMe />
            </section>
            <section id="contact" className="py-24 px-6 md:px-12 lg:px-24">
              <ContactMe />
            </section>
          </main>
        } />
        
        <Route path="/project/productivity" element={<ProductivityTracker />} />
        <Route path="/project/aircraft" element={<AircraftSim />} />
        <Route path="/project/geography" element={<GeographyExplorer />} />
      </Routes>

      <footer className="py-12 px-6 text-center border-t border-zinc-900 text-zinc-500">
        <p className="text-sm font-light uppercase tracking-widest">
          &copy; {new Date().getFullYear()} AAVASH REGMI. ELITE ENGINEERING.
        </p>
      </footer>

      {isAuthModalOpen && (
        <AuthModal 
          onClose={() => setIsAuthModalOpen(false)} 
          onLogin={handleLogin} 
        />
      )}
    </div>
  );
};

export default App;
