import React from 'react';
import { Tournament } from '../types';
import { Trophy, Calendar, Ticket, Award, Swords, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TournamentsProps {
  tournaments: Tournament[];
}

export const Tournaments: React.FC<TournamentsProps> = ({ tournaments }) => {
  const [activeTab, setActiveTab] = React.useState<'completed' | 'upcoming'>('completed');

  const filteredTournaments = tournaments.filter(t => t.status === activeTab);

  // Stats
  const completedCount = tournaments.filter(t => t.status === 'completed').length;
  const upcomingCount = tournaments.filter(t => t.status === 'upcoming').length;

  return (
    <section id="tournaments" className="py-24 bg-dark-bg text-white relative border-t border-dark-border select-none">
      <div className="absolute top-1/3 left-10 w-[200px] h-[200px] bg-brand-red/5 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-mono text-xs font-bold tracking-widest text-brand-red uppercase">
              // ARENA CAMPAIGNS
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight uppercase mt-1">
              TOURNAMENTS & <span className="text-brand-red">WARS</span>
            </h2>
            <div className="h-1 w-24 bg-brand-red mt-4 rounded-full" />
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-[#0e0e11] border border-dark-border p-1 rounded-lg self-center md:self-end">
            <button
              onClick={() => setActiveTab('completed')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded font-display text-xs font-bold tracking-widest uppercase transition-all cursor-pointer ${
                activeTab === 'completed'
                  ? 'bg-brand-red text-white shadow-[0_0_10px_rgba(255,0,60,0.3)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Battle History ({completedCount})</span>
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded font-display text-xs font-bold tracking-widest uppercase transition-all cursor-pointer ${
                activeTab === 'upcoming'
                  ? 'bg-brand-red text-white shadow-[0_0_10px_rgba(255,0,60,0.3)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Upcoming Battles ({upcomingCount})</span>
            </button>
          </div>
        </div>

        {/* Highlight Stats Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 bg-[#0c0c0f]/80 p-5 rounded-lg border border-dark-border">
          <div className="text-center sm:text-left sm:border-r border-dark-border p-3">
            <span className="font-sans text-xs text-gray-500 uppercase font-semibold">Total Campaigns Run</span>
            <p className="font-mono text-2xl font-bold text-white mt-1">20+ Completed</p>
          </div>
          <div className="text-center sm:text-left sm:border-r border-dark-border p-3 sm:pl-6">
            <span className="font-sans text-xs text-gray-500 uppercase font-semibold">Active Earnings</span>
            <p className="font-mono text-2xl font-bold text-brand-red mt-1">$800+ Prize Cash</p>
          </div>
          <div className="text-center sm:text-left p-3 sm:pl-6">
            <span className="font-sans text-xs text-gray-500 uppercase font-semibold">Current Placement</span>
            <p className="font-mono text-2xl font-bold text-white mt-1">Top-3 Avg Scrim Rank</p>
          </div>
        </div>

        {/* Tournaments Grid Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTournaments.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full py-16 text-center text-gray-500 font-sans"
              >
                No campaigns registered in this category yet. Admin can load new ones in HQ!
              </motion.div>
            ) : (
              filteredTournaments.map((tournament, idx) => (
                <motion.div
                  key={tournament.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="bg-[#0e0e11] border border-dark-border hover:border-brand-red/30 p-6 rounded-lg flex flex-col justify-between relative overflow-hidden group hover:scale-[1.01]"
                >
                  {/* Glowing decorative indicator */}
                  <div className={`absolute top-0 left-0 right-0 h-1 ${
                    tournament.status === 'completed' ? 'bg-emerald-500/50' : 'bg-brand-red/50 animate-pulse'
                  }`} />

                  <div>
                    {/* Header Details */}
                    <div className="flex items-center justify-between text-xs font-mono text-gray-500 mb-4">
                      <span className="flex items-center gap-1.5 bg-dark-bg px-2.5 py-1 rounded">
                        <Calendar className="w-3.5 h-3.5 text-brand-red" />
                        {tournament.date}
                      </span>
                      <span className="flex items-center gap-1.5 bg-dark-bg px-2.5 py-1 rounded">
                        <Ticket className="w-3.5 h-3.5 text-amber-500" />
                        {tournament.entryDetails}
                      </span>
                    </div>

                    {/* Tournament Title */}
                    <h3 className="font-display text-lg font-bold text-white mb-4 line-clamp-2 uppercase">
                      {tournament.name}
                    </h3>

                    {/* Prize Pool & Winner Info */}
                    <div className="space-y-3 mb-6 bg-dark-bg/60 p-4 rounded border border-dark-border">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 font-sans flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-amber-500" /> Prize Pool
                        </span>
                        <span className="font-mono font-bold text-white text-base">
                          {tournament.prizePool}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-t border-dark-border pt-2.5">
                        <span className="text-gray-500 font-sans flex items-center gap-2">
                          <Award className="w-4 h-4 text-brand-red" /> Winner
                        </span>
                        <span className={`font-display font-bold text-xs px-2 py-0.5 rounded ${
                          tournament.winner.toLowerCase().includes('raze') 
                            ? 'bg-brand-red/15 text-brand-red border border-brand-red/30 font-extrabold shadow-[0_0_8px_rgba(255,0,60,0.15)]' 
                            : 'text-gray-300'
                        }`}>
                          {tournament.winner}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Results Text */}
                  {tournament.results && (
                    <div className="mt-2 text-xs font-sans text-gray-400 bg-dark-bg p-3 rounded leading-relaxed italic border-l-2 border-brand-red">
                      "{tournament.results}"
                    </div>
                  )}

                  {/* Action/Indicator footer */}
                  <div className="mt-6 pt-4 border-t border-dark-border flex justify-between items-center text-xs font-mono">
                    <span className="text-gray-600">ID: #{tournament.id}</span>
                    <span className={`flex items-center gap-1 font-semibold ${
                      tournament.status === 'completed' ? 'text-emerald-400' : 'text-brand-red animate-pulse'
                    }`}>
                      <Swords className="w-3.5 h-3.5" />
                      {tournament.status === 'completed' ? 'CONCLUDED' : 'SLOT REGISTERED'}
                    </span>
                  </div>

                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
