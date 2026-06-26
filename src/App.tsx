import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Players } from './components/Players';
import { Tournaments } from './components/Tournaments';
import { JerseyShowcase } from './components/JerseyShowcase';
import { Recruitment } from './components/Recruitment';
import { Management } from './components/Management';
import { Achievements } from './components/Achievements';
import { PromotionContact } from './components/PromotionContact';
import { AdminPanel } from './components/AdminPanel';

import { Player, Tournament, Jersey, ManagementMember, ContactConfig, RecruitmentApplication, Achievement } from './types';
import { 
  DEFAULT_PLAYERS, DEFAULT_MANAGEMENT, DEFAULT_TOURNAMENTS, DEFAULT_JERSEYS, 
  DEFAULT_ACHIEVEMENTS, DEFAULT_CONTACT_CONFIG, getStoredData, setStoredData 
} from './data';
import { ShieldCheck, Trophy, Sparkles, MessageSquare, ChevronUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PRESEEDED_APPLICATIONS: RecruitmentApplication[] = [
  {
    id: 'app_1',
    name: 'Devid Sen',
    ign: 'RAZE・SniperKidd',
    uid: '782910384',
    age: 17,
    role: 'Sniper',
    previousTeam: 'Team Delta Scrims',
    contact: '+91 99112 23344',
    status: 'Pending',
    submittedAt: '2026-06-25 14:32',
  },
  {
    id: 'app_2',
    name: 'Rohan Joshi',
    ign: 'RAZE・FireRider',
    uid: '810394857',
    age: 19,
    role: 'Rusher',
    previousTeam: 'Underdog Guild X',
    contact: 'firerider#4412',
    status: 'Pending',
    submittedAt: '2026-06-25 18:10',
  }
];

const PRESEEDED_PROPOSALS = [
  {
    id: 'prop_1',
    name: 'Apex Esports League',
    whatsapp: '+91 98987 65432',
    discordId: 'apex_organizer#0001',
    email: 'scrims@apexleague.com',
    message: 'We would love to invite RAZE ELITE to our Tier-1 Invitationals starting July 15, 2026. Custom room slots have been allocated for your roster.',
    type: 'Tournament Invite',
    submittedAt: '2026-06-25 11:20',
  }
];

export default function App() {
  // Core Application States loadable from localStorage or pre-seeded data
  const [players, setPlayers] = React.useState<Player[]>(() => getStoredData('players', DEFAULT_PLAYERS));
  const [tournaments, setTournaments] = React.useState<Tournament[]>(() => getStoredData('tournaments', DEFAULT_TOURNAMENTS));
  const [jerseys, setJerseys] = React.useState<Jersey[]>(() => {
    const stored = getStoredData('jerseys', DEFAULT_JERSEYS);
    return stored.map(j => {
      if (j.id === 'j1') {
        const hasUnsplash = !j.photos || j.photos.some(p => p.includes('unsplash.com'));
        const hasRickroll = !j.videos || j.videos.some(v => v.includes('dQw4w9WgXcQ'));
        return {
          ...j,
          photos: hasUnsplash ? [
            '/src/assets/images/jersey_front_with_logo_1782467588291.jpg',
            '/src/assets/images/jersey_viper_back_1782467010793.jpg'
          ] : j.photos,
          videos: hasRickroll ? ['https://www.youtube.com/watch?v=Kz693zWp6YQ'] : j.videos
        };
      }
      return j;
    });
  });
  const [management, setManagement] = React.useState<ManagementMember[]>(() => getStoredData('management', DEFAULT_MANAGEMENT));
  const [contactConfig, setContactConfig] = React.useState<ContactConfig>(() => {
    const stored = getStoredData('contactConfig', DEFAULT_CONTACT_CONFIG);
    if (stored.whatsapp === '+91 98765 43210' || !stored.instagramLink || stored.discordId === 'RazeElite#9999') {
      return DEFAULT_CONTACT_CONFIG;
    }
    return stored;
  });
  const [achievements, setAchievements] = React.useState<Achievement[]>(() => getStoredData('achievements', DEFAULT_ACHIEVEMENTS));
  
  const [applications, setApplications] = React.useState<RecruitmentApplication[]>(() => 
    getStoredData('applications', PRESEEDED_APPLICATIONS)
  );
  const [proposals, setProposals] = React.useState<any[]>(() => 
    getStoredData('proposals', PRESEEDED_PROPOSALS)
  );

  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
  const [showPasswordModal, setShowPasswordModal] = React.useState<boolean>(false);
  const [passwordInput, setPasswordInput] = React.useState<string>('');
  const [passwordError, setPasswordError] = React.useState<string>('');
  const [activeSection, setActiveSection] = React.useState<string>('about');
  const [showScrollTop, setShowScrollTop] = React.useState<boolean>(false);

  // Synchronize States to LocalStorage
  React.useEffect(() => { setStoredData('players', players); }, [players]);
  React.useEffect(() => { setStoredData('tournaments', tournaments); }, [tournaments]);
  React.useEffect(() => { setStoredData('jerseys', jerseys); }, [jerseys]);
  React.useEffect(() => { setStoredData('management', management); }, [management]);
  React.useEffect(() => { setStoredData('contactConfig', contactConfig); }, [contactConfig]);
  React.useEffect(() => { setStoredData('achievements', achievements); }, [achievements]);
  React.useEffect(() => { setStoredData('applications', applications); }, [applications]);
  React.useEffect(() => { setStoredData('proposals', proposals); }, [proposals]);

  // Section highlight navigation tracking & scroll top buttons
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sections = ['about', 'players', 'tournaments', 'jersey', 'recruitment', 'achievements', 'contact'];
      let currentSection = 'about';

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Recruitment Add Form trigger
  const handleAddApplication = (newApp: Omit<RecruitmentApplication, 'id' | 'status' | 'submittedAt'>) => {
    const fullApp: RecruitmentApplication = {
      ...newApp,
      id: Math.random().toString(),
      status: 'Pending',
      submittedAt: new Date().toLocaleString(),
    };
    setApplications(prev => [fullApp, ...prev]);
  };

  // Partnership Proposal triggering
  const handleAddProposal = (newProp: any) => {
    setProposals(prev => [newProp, ...prev]);
  };

  // Quick Stats highlights inside Hero
  const statsOverview = {
    tournamentsCount: tournaments.length + 16, // seed offset
    prizePool: '$850+', // dynamic represent
    playersCount: players.length,
    achievementsCount: achievements.length + 8, // pre-seed representation
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-brand-red selection:text-white scroll-smooth relative">
      
      {/* Universal Floating Admin Active Alert Bar */}
      {isAdmin && (
        <div className="bg-brand-red text-white py-2 px-4 text-center font-mono text-[10px] tracking-widest uppercase flex items-center justify-center gap-2 sticky top-0 z-50 shadow-[0_4px_15px_rgba(255,0,60,0.4)] animate-pulse">
          <ShieldCheck className="w-4 h-4 text-white" />
          <span>HQ COMMAND PRIVILEGES ACTIVE // DATA EDITS SAVE LIVE</span>
        </div>
      )}

      {/* Main Header */}
      <Header 
        isAdmin={isAdmin} 
        onToggleAdmin={() => {
          if (isAdmin) {
            setIsAdmin(false);
          } else {
            setShowPasswordModal(true);
            setPasswordInput('');
            setPasswordError('');
          }
        }} 
        activeSection={activeSection} 
      />

      {/* Slide-over or Expanded HQ Admin Command Center */}
      <AnimatePresence>
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="border-b border-brand-red/20 bg-[#050507] overflow-hidden"
            id="admin-panel-viewport"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <AdminPanel
                players={players}
                onUpdatePlayers={setPlayers}
                tournaments={tournaments}
                onUpdateTournaments={setTournaments}
                jerseys={jerseys}
                onUpdateJerseys={setJerseys}
                achievements={achievements}
                onUpdateAchievements={setAchievements}
                management={management}
                onUpdateManagement={setManagement}
                contactConfig={contactConfig}
                onUpdateContactConfig={setContactConfig}
                applications={applications}
                onUpdateApplications={setApplications}
                proposals={proposals}
                onUpdateProposals={setProposals}
                onClose={() => setIsAdmin(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Core Landing Page Content */}
      <main>
        
        {/* Hero Section */}
        <Hero stats={statsOverview} />

        {/* About Section */}
        <About orgStory={contactConfig.orgStory} />

        {/* Players Section */}
        <Players players={players} />

        {/* Tournaments Section */}
        <Tournaments tournaments={tournaments} />

        {/* Jersey Section */}
        <JerseyShowcase jerseys={jerseys} />

        {/* Recruitment Section */}
        <Recruitment onAddApplication={handleAddApplication} />

        {/* Achievements Section */}
        <Achievements achievements={achievements} />

        {/* Management Section */}
        <Management members={management} config={contactConfig} />

        {/* Contact/Promotion Section */}
        <PromotionContact config={contactConfig} onAddProposal={handleAddProposal} />

      </main>

      {/* Visual Esports Footer */}
      <footer className="bg-[#050507] border-t border-dark-border py-12 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-dark-border pb-8 mb-8 text-center md:text-left">
            <div>
              <div className="font-display text-lg font-black tracking-wider text-white">
                RAZE <span className="text-brand-red">ELITE</span>
              </div>
              <p className="font-sans text-xs text-gray-500 mt-1 uppercase tracking-wider">
                Free Fire competitive squad building our legacy one custom room at a time.
              </p>
            </div>

            {/* Quick footer socials representation */}
            <div className="flex items-center gap-3.5 text-xs font-mono text-gray-500">
              <span className="flex items-center gap-1.5 hover:text-brand-red transition-colors">
                <Trophy className="w-4 h-4 text-brand-red" /> Booyah Guild
              </span>
              <span className="w-1.5 h-1.5 bg-dark-border rounded-full" />
              <span className="flex items-center gap-1.5 hover:text-brand-red transition-colors">
                <Sparkles className="w-4 h-4 text-brand-red" /> South Asia competitive
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left text-xs text-gray-600 gap-4">
            <p>© 2026 RAZE ELITE ESPORTS. ALL RIGHTS RESERVED. NOT AFFILIATED WITH GARENA FREE FIRE.</p>
            <div className="flex gap-4">
              <a href="#about" className="hover:text-brand-red transition-colors">HQ Rules</a>
              <a href="#recruitment" className="hover:text-brand-red transition-colors">Join Squad</a>
              <a href="#contact" className="hover:text-brand-red transition-colors">Sponsorships</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Float to Top Action */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 p-3 bg-[#0e0e11] border border-brand-red/40 text-brand-red rounded-full hover:bg-brand-red hover:text-white hover:scale-110 active:scale-95 transition-all shadow-lg shadow-brand-red/10 cursor-pointer z-40"
            title="Scroll to summit"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Admin Passcode Dialog Overlay */}
      <AnimatePresence>
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#0b0b0e] border border-brand-red/40 rounded-xl max-w-sm w-full overflow-hidden shadow-[0_0_50px_rgba(255,0,60,0.3)] p-6 relative"
            >
              <button
                onClick={() => setShowPasswordModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-brand-red/10 border border-brand-red/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck className="w-6 h-6 text-brand-red" />
                </div>
                <h3 className="font-display text-base font-bold uppercase tracking-wider text-white">
                  HQ ACCESS REQUIRED
                </h3>
                <p className="font-mono text-[9px] text-gray-500 tracking-widest uppercase mt-1">
                  ENTER COMMAND PASSCODE TO CONTINUE
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (passwordInput === 'RazeRahulNyros') {
                    setIsAdmin(true);
                    setShowPasswordModal(false);
                    setPasswordInput('');
                    setPasswordError('');
                  } else {
                    setPasswordError('INVALID PASSCODE // ACCESS DENIED');
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-[9px] font-mono text-gray-400 uppercase mb-1 tracking-wider text-center">
                    ENTER PASSWORD
                  </label>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (passwordError) setPasswordError('');
                    }}
                    placeholder="••••••••••••"
                    className="w-full bg-[#050507] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-sm font-mono text-white focus:outline-none text-center tracking-widest uppercase"
                    autoFocus
                  />
                </div>

                {passwordError && (
                  <div className="text-brand-red font-mono text-[9px] text-center tracking-widest bg-brand-red/10 border border-brand-red/25 py-2 rounded animate-shake">
                    {passwordError}
                  </div>
                )}

                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="flex-1 px-4 py-2 bg-[#050507] hover:bg-dark-border border border-dark-border rounded text-xs font-display font-extrabold uppercase tracking-wider text-gray-400 hover:text-white transition-all cursor-pointer"
                  >
                    ABORT
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-brand-red hover:bg-brand-red/80 text-white rounded text-xs font-display font-extrabold uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(255,0,60,0.2)]"
                  >
                    ACCESS
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
