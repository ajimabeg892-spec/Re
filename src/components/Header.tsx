import React from 'react';
import { Logo } from './Logo';
import { Shield, ShieldAlert, Menu, X, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  isAdmin: boolean;
  onToggleAdmin: () => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ isAdmin, onToggleAdmin, activeSection }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Players', href: '#players' },
    { label: 'Tournaments', href: '#tournaments' },
    { label: 'Jersey', href: '#jersey' },
    { label: 'Recruitment', href: '#recruitment' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#050505]/95 backdrop-blur-md border-b border-dark-border select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand/Logo Area */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-3 group">
              <Logo className="w-12 h-12" glow={true} />
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold tracking-wider text-white group-hover:text-brand-red transition-colors">
                  RAZE <span className="text-brand-red">ELITE</span>
                </span>
                <span className="font-mono text-[9px] text-gray-500 tracking-widest uppercase">
                  Esports Legacy
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`font-display text-sm font-medium tracking-wide transition-all hover:text-brand-red ${
                  activeSection === item.label.toLowerCase()
                    ? 'text-brand-red glow-text-red scale-105 font-bold'
                    : 'text-gray-400'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons & Admin Toggle */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onToggleAdmin}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-display text-xs font-bold tracking-widest uppercase border transition-all duration-300 cursor-pointer ${
                isAdmin
                  ? 'bg-brand-red text-white border-brand-red shadow-[0_0_15px_rgba(255,0,60,0.5)] animate-pulse'
                  : 'bg-transparent text-gray-400 border-dark-border hover:border-brand-red hover:text-white'
              }`}
              id="admin-toggle-btn"
            >
              {isAdmin ? (
                <>
                  <ShieldAlert className="w-4 h-4 text-white" />
                  <span>Admin Mode Active</span>
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 text-gray-400 hover:text-brand-red" />
                  <span>HQ Access</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden gap-3">
            <button
              onClick={onToggleAdmin}
              className={`p-2 rounded-md transition-all ${
                isAdmin ? 'text-brand-red' : 'text-gray-400'
              }`}
              title="Admin HQ"
            >
              <Shield className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-red"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-dark-border bg-dark-bg/95 backdrop-blur-md"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md font-display text-base font-medium text-gray-300 hover:text-brand-red hover:bg-[#121216] transition-all"
                >
                  {item.label}
                </a>
              ))}
              
              <div className="pt-4 pb-2 border-t border-dark-border px-3">
                <button
                  onClick={() => {
                    onToggleAdmin();
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md font-display text-xs font-bold tracking-widest uppercase border transition-all ${
                    isAdmin
                      ? 'bg-brand-red text-white border-brand-red shadow-[0_0_10px_rgba(255,0,60,0.5)]'
                      : 'bg-transparent text-gray-400 border-dark-border hover:border-brand-red hover:text-white'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  <span>{isAdmin ? 'Exit Admin Mode' : 'Admin HQ Access'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
