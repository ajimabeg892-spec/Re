import React from 'react';
import { Logo } from './Logo';
import { Trophy, Swords, Users, ShieldAlert, Sparkles, ChevronRight, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  stats: {
    tournamentsCount: number;
    prizePool: string;
    playersCount: number;
    achievementsCount: number;
  };
}

export const Hero: React.FC<HeroProps> = ({ stats }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-dark-bg text-white overflow-hidden gaming-grid py-20 select-none">
      
      {/* Background Ambience / Red Smokes & Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-red/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-brand-red/5 blur-[90px] rounded-full pointer-events-none" />
      
      {/* Dynamic Animated Embers / Sparks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-brand-red rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100 - Math.random() * 150],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Animated Main Branding Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="mb-6"
        >
          <Logo className="w-48 h-48 md:w-56 md:h-56 mx-auto drop-shadow-[0_0_35px_rgba(255,0,60,0.4)]" glow={true} />
        </motion.div>

        {/* Text Area */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-red/10 border border-brand-red/30 rounded-full text-brand-red text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_10px_rgba(255,0,60,0.1)]">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
            <span>The New Era Of Free Fire esports</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter uppercase mb-4">
            BUILDING OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-red to-brand-red-hover drop-shadow-[0_4px_12px_rgba(255,0,60,0.3)]">LEGACY</span>
          </h1>

          <p className="font-sans text-base sm:text-xl text-gray-400 font-medium tracking-wide max-w-xl mx-auto mb-8">
            RAZE ELITE — Free Fire Esports Organization. A brotherhood forged in battle, engineered to claim the throne.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mb-16 w-full justify-center max-w-md px-4"
        >
          <a
            href="#recruitment"
            className="flex items-center justify-center gap-2 bg-brand-red text-white hover:bg-brand-red-hover px-8 py-4 rounded-md font-display font-bold text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(255,0,60,0.4)] hover:shadow-[0_0_30px_rgba(255,0,60,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Join Our Guild</span>
            <ChevronRight className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="flex items-center justify-center gap-2 bg-transparent text-gray-300 hover:text-white border border-dark-border hover:border-brand-red px-8 py-4 rounded-md font-display font-bold text-sm tracking-wider uppercase hover:bg-brand-red/5 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact For Slots</span>
          </a>
        </motion.div>

        {/* Small Stats Dashboard Grid */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl"
        >
          <div className="bg-[#0c0c0f]/80 backdrop-blur-md border border-dark-border p-6 rounded-lg flex flex-col items-center justify-center text-center hover:border-brand-red/40 hover:shadow-[0_0_15px_rgba(255,0,60,0.1)] transition-all group">
            <Swords className="w-6 h-6 text-brand-red mb-2 group-hover:scale-110 transition-transform" />
            <span className="font-mono text-3xl font-bold text-white tracking-tight">
              {stats.tournamentsCount}+
            </span>
            <span className="font-sans text-xs text-gray-500 uppercase font-semibold tracking-wider mt-1">
              Tournaments Played
            </span>
          </div>

          <div className="bg-[#0c0c0f]/80 backdrop-blur-md border border-dark-border p-6 rounded-lg flex flex-col items-center justify-center text-center hover:border-brand-red/40 hover:shadow-[0_0_15px_rgba(255,0,60,0.1)] transition-all group">
            <Trophy className="w-6 h-6 text-brand-red mb-2 group-hover:scale-110 transition-transform" />
            <span className="font-mono text-3xl font-bold text-white tracking-tight">
              {stats.prizePool}
            </span>
            <span className="font-sans text-xs text-gray-500 uppercase font-semibold tracking-wider mt-1">
              Prize Pool Earned
            </span>
          </div>

          <div className="bg-[#0c0c0f]/80 backdrop-blur-md border border-dark-border p-6 rounded-lg flex flex-col items-center justify-center text-center hover:border-brand-red/40 hover:shadow-[0_0_15px_rgba(255,0,60,0.1)] transition-all group">
            <Users className="w-6 h-6 text-brand-red mb-2 group-hover:scale-110 transition-transform" />
            <span className="font-mono text-3xl font-bold text-white tracking-tight">
              {stats.playersCount} Active
            </span>
            <span className="font-sans text-xs text-gray-500 uppercase font-semibold tracking-wider mt-1">
              Roster Players
            </span>
          </div>

          <div className="bg-[#0c0c0f]/80 backdrop-blur-md border border-dark-border p-6 rounded-lg flex flex-col items-center justify-center text-center hover:border-brand-red/40 hover:shadow-[0_0_15px_rgba(255,0,60,0.1)] transition-all group">
            <Trophy className="w-6 h-6 text-brand-red mb-2 group-hover:scale-110 transition-transform" />
            <span className="font-mono text-3xl font-bold text-white tracking-tight">
              {stats.achievementsCount}+
            </span>
            <span className="font-sans text-xs text-gray-500 uppercase font-semibold tracking-wider mt-1">
              Team Achievements
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
