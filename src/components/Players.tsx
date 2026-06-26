import React from 'react';
import { Player } from '../types';
import { Instagram, Youtube, HelpCircle, Gamepad2, Calendar, Award, Crosshair, ChevronDown, ChevronUp, BarChart3, ShieldCheck, Users, Crown, Zap, Target, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PlayersProps {
  players: Player[];
}

export const Players: React.FC<PlayersProps> = ({ players }) => {
  const [expandedPlayerId, setExpandedPlayerId] = React.useState<string | null>(null);
  const [selectedRole, setSelectedRole] = React.useState<string>('All');

  const roles = ['All', 'IGL', 'Rusher', 'Sniper', 'Support'];

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'IGL': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Rusher': return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'Sniper': return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
      case 'Support': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'IGL': return <Crown className="w-3.5 h-3.5" />;
      case 'Rusher': return <Zap className="w-3.5 h-3.5" />;
      case 'Sniper': return <Target className="w-3.5 h-3.5" />;
      case 'Support': return <Shield className="w-3.5 h-3.5" />;
      default: return <Users className="w-3.5 h-3.5" />;
    }
  };

  const getPlayerAvatarStyle = (photoName: string) => {
    switch (photoName.toLowerCase()) {
      case 'viper': return 'from-[#ff003c] via-[#4d0012] to-black';
      case 'blaze': return 'from-[#ff5500] via-[#5c1d00] to-black';
      case 'slayer': return 'from-[#00bfff] via-[#00425c] to-black';
      case 'phoenix': return 'from-[#00ff88] via-[#005c32] to-black';
      default: return 'from-brand-red via-dark-card to-black';
    }
  };

  const getRoleCount = (role: string) => {
    if (role === 'All') return players.length;
    return players.filter(p => p.role.toLowerCase() === role.toLowerCase()).length;
  };

  const filteredPlayers = selectedRole === 'All'
    ? players
    : players.filter(p => p.role.toLowerCase() === selectedRole.toLowerCase());

  return (
    <section id="players" className="py-24 bg-[#0a0a0c] text-white relative border-t border-dark-border select-none">
      <div className="absolute top-10 right-1/4 w-[250px] h-[250px] bg-brand-red/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-10">
          <span className="font-mono text-xs font-bold tracking-widest text-brand-red uppercase">
            // ACTIVE ROSTER
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight uppercase mt-1">
            MEET THE <span className="text-brand-red">WARRIORS</span>
          </h2>
          <p className="font-sans text-sm text-gray-500 mt-2 max-w-md mx-auto">
            The handpicked specialists carrying the RAZE ELITE banner onto the virtual battlefield.
          </p>
          <div className="h-1 w-24 bg-brand-red mt-4 mx-auto rounded-full" />
        </div>

        {/* Role Filter Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
          {roles.map((role) => {
            const isActive = selectedRole === role;
            const count = getRoleCount(role);
            
            return (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-xs font-display font-extrabold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 border cursor-pointer group ${
                  isActive
                    ? 'bg-brand-red text-white border-brand-red shadow-[0_0_15px_rgba(255,0,60,0.3)]'
                    : 'bg-[#0e0e11] hover:bg-[#131317] text-gray-400 hover:text-white border-dark-border hover:border-brand-red/30'
                }`}
              >
                {getRoleIcon(role)}
                <span>{role === 'All' ? 'All Roles' : role}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono transition-colors ${
                  isActive ? 'bg-white/20 text-white' : 'bg-dark-bg text-gray-500 group-hover:text-gray-300 group-hover:bg-[#181820]'
                }`}>
                  {count}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeRoleTab"
                    className="absolute -bottom-[2px] left-4 right-4 h-[2px] bg-white rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Players Grid / Empty State */}
        {filteredPlayers.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-dark-border rounded-lg bg-[#0e0e11]">
            <Users className="w-12 h-12 text-gray-600 mx-auto mb-4 animate-pulse" />
            <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider">No Warriors Found</h3>
            <p className="font-sans text-xs text-gray-500 mt-1">There are no players registered under the "{selectedRole}" role.</p>
            <button
              onClick={() => setSelectedRole('All')}
              className="mt-4 px-5 py-2.5 bg-brand-red hover:bg-brand-red/80 text-white text-xs font-display font-extrabold uppercase rounded-lg transition-all cursor-pointer shadow-[0_0_15px_rgba(255,0,60,0.2)] hover:scale-105 active:scale-95"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredPlayers.map((player) => {
              const isExpanded = expandedPlayerId === player.id;
              
              return (
                <div
                  key={player.id}
                  className={`bg-[#0e0e11] border rounded-lg overflow-hidden transition-all duration-300 relative ${
                    isExpanded ? 'border-brand-red glow-border-red shadow-[0_0_20px_rgba(255,0,60,0.2)] scale-[1.02]' : 'border-dark-border hover:border-brand-red/30'
                  }`}
                >
                {/* Corner Role Badge absolute */}
                <div className="absolute top-3 right-3 z-10">
                  <span className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded border ${getRoleBadgeColor(player.role)}`}>
                    {player.role}
                  </span>
                </div>

                {/* Player Photo Card Header Area */}
                <div className={`h-64 bg-gradient-to-b ${getPlayerAvatarStyle(player.photo)} flex flex-col items-center justify-end p-4 relative group`}>
                  {/* Grid Lines Overlay */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
                  
                  {/* Styled avatar replacement layout */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-8xl font-display font-extrabold text-white/5 tracking-tighter uppercase select-none">
                      {player.role}
                    </span>
                  </div>

                  {/* Character Monogram Icon representation */}
                  <div className="relative z-10 w-32 h-32 rounded-full bg-black/60 border border-white/10 flex items-center justify-center mb-2 overflow-hidden shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-red/40 to-transparent" />
                    <span className="font-display text-4xl font-extrabold text-white tracking-widest">
                      {player.ign.replace('RAZE・', '').substring(0, 2).toUpperCase()}
                    </span>
                  </div>

                  <div className="text-center relative z-10">
                    <h3 className="font-display text-xl font-extrabold text-white tracking-wide glow-text-red">
                      {player.ign}
                    </h3>
                    <p className="font-sans text-xs text-gray-400">
                      {player.realName}
                    </p>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5">
                  
                  {/* Basic short specs */}
                  <div className="space-y-2 mb-4 text-xs font-sans text-gray-400">
                    <div className="flex items-center justify-between border-b border-dark-border pb-1.5">
                      <span className="flex items-center gap-1.5 text-gray-500">
                        <Gamepad2 className="w-3.5 h-3.5" /> Game ID
                      </span>
                      <span className="font-mono text-white font-medium">{player.gameId}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-dark-border pb-1.5">
                      <span className="flex items-center gap-1.5 text-gray-500">
                        <Crosshair className="w-3.5 h-3.5" /> Favorite Gun
                      </span>
                      <span className="text-white font-medium">{player.favoriteWeapon}</span>
                    </div>
                  </div>

                  {/* Actions Toggle Buttons */}
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => setExpandedPlayerId(isExpanded ? null : player.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-dark-bg hover:bg-brand-red/10 border border-dark-border hover:border-brand-red/40 rounded text-xs font-display font-bold tracking-wider uppercase transition-all text-gray-300 hover:text-white cursor-pointer"
                    >
                      <BarChart3 className="w-3.5 h-3.5 text-brand-red" />
                      <span>{isExpanded ? 'Hide Stats' : 'Combat Stats'}</span>
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    {/* Quick Social Icons */}
                    <div className="flex items-center gap-1.5">
                      {player.socials.instagram && (
                        <a
                          href={`https://instagram.com/${player.socials.instagram}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 bg-dark-bg border border-dark-border rounded hover:border-brand-red hover:text-brand-red transition-colors text-gray-400"
                          title="Instagram"
                        >
                          <Instagram className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {player.socials.youtube && (
                        <a
                          href={`https://youtube.com/c/${player.socials.youtube}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 bg-dark-bg border border-dark-border rounded hover:border-brand-red hover:text-brand-red transition-colors text-gray-400"
                          title="YouTube"
                        >
                          <Youtube className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Stats Sheet Toggle Reveal */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden pt-4 mt-4 border-t border-dark-border"
                      >
                        {/* Combat Stats Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-4 bg-dark-bg/60 p-3 rounded border border-dark-border">
                          <div className="text-center">
                            <span className="font-mono text-[10px] text-gray-500 uppercase">Matches</span>
                            <p className="font-mono text-base font-bold text-white">{player.stats.matches}</p>
                          </div>
                          <div className="text-center">
                            <span className="font-mono text-[10px] text-gray-500 uppercase">Kills</span>
                            <p className="font-mono text-base font-bold text-white">{player.stats.kills}</p>
                          </div>
                          <div className="text-center">
                            <span className="font-mono text-[10px] text-gray-500 uppercase">MVP Titles</span>
                            <p className="font-mono text-base font-bold text-white">{player.stats.mvps}</p>
                          </div>
                          <div className="text-center">
                            <span className="font-mono text-[10px] text-gray-500 uppercase">Win Rate</span>
                            <p className="font-mono text-base font-bold text-brand-red">{player.stats.winRate}%</p>
                          </div>
                        </div>

                        {/* Story / Profile */}
                        <div className="space-y-3.5 text-xs font-sans text-gray-400">
                          <div>
                            <span className="flex items-center gap-1.5 text-gray-500 uppercase font-mono text-[9px] tracking-wider mb-1">
                              <Calendar className="w-3 h-3" /> Joined Raze
                            </span>
                            <span className="text-gray-300 font-medium">{player.joiningDate}</span>
                          </div>
                          <div>
                            <span className="flex items-center gap-1.5 text-gray-500 uppercase font-mono text-[9px] tracking-wider mb-1">
                              <Award className="w-3 h-3" /> Best Achievement
                            </span>
                            <span className="text-gray-300 font-medium">{player.bestAchievement}</span>
                          </div>
                          <div>
                            <span className="flex items-center gap-1.5 text-gray-500 uppercase font-mono text-[9px] tracking-wider mb-1">
                              <ShieldCheck className="w-3 h-3" /> Battle Tactics
                            </span>
                            <p className="text-gray-300 font-medium italic leading-relaxed">
                              "{player.playstyle}"
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </div>
            );
          })}
        </div>
        )}

      </div>
    </section>
  );
};
