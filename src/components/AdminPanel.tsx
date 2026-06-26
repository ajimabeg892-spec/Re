import React from 'react';
import { Player, Tournament, Jersey, ManagementMember, ContactConfig, RecruitmentApplication, PlayerRole, ManagementRole, Achievement } from '../types';
import { 
  Users, Trophy, Shirt, Settings, ClipboardList, Mail, PlusCircle, Trash2, Edit3, 
  Save, Check, X, LogIn, Sparkles, RefreshCw, Eye, MessageSquare, Award 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdminPanelProps {
  players: Player[];
  onUpdatePlayers: (players: Player[]) => void;
  tournaments: Tournament[];
  onUpdateTournaments: (tournaments: Tournament[]) => void;
  jerseys: Jersey[];
  onUpdateJerseys: (jerseys: Jersey[]) => void;
  achievements: Achievement[];
  onUpdateAchievements: (achievements: Achievement[]) => void;
  management: ManagementMember[];
  onUpdateManagement: (management: ManagementMember[]) => void;
  contactConfig: ContactConfig;
  onUpdateContactConfig: (config: ContactConfig) => void;
  applications: RecruitmentApplication[];
  onUpdateApplications: (apps: RecruitmentApplication[]) => void;
  proposals: any[];
  onUpdateProposals: (proposals: any[]) => void;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  players, onUpdatePlayers,
  tournaments, onUpdateTournaments,
  jerseys, onUpdateJerseys,
  achievements, onUpdateAchievements,
  management, onUpdateManagement,
  contactConfig, onUpdateContactConfig,
  applications, onUpdateApplications,
  proposals, onUpdateProposals,
  onClose
}) => {
  const [activeTab, setActiveTab] = React.useState<'players' | 'tournaments' | 'jerseys' | 'achievements' | 'management' | 'applications' | 'proposals'>('players');

  // Simple state for player editing/adding
  const [editingPlayerId, setEditingPlayerId] = React.useState<string | null>(null);
  const [playerForm, setPlayerForm] = React.useState({
    ign: '',
    realName: '',
    role: 'Rusher' as PlayerRole,
    photo: 'viper',
    gameId: '',
    joiningDate: new Date().toISOString().split('T')[0],
    totalTournaments: 10,
    bestAchievement: '',
    favoriteWeapon: '',
    playstyle: '',
    matches: 100,
    kills: 200,
    mvps: 10,
    winRate: 50,
    instagram: '',
    youtube: '',
    discord: ''
  });

  // Simple state for tournament editing/adding
  const [editingTournamentId, setEditingTournamentId] = React.useState<string | null>(null);
  const [tournamentForm, setTournamentForm] = React.useState({
    name: '',
    date: new Date().toISOString().split('T')[0],
    entryDetails: 'Invite Only',
    prizePool: '$100',
    winner: 'To Be Decided',
    status: 'upcoming' as 'upcoming' | 'completed',
    results: '',
    image: 't_cyber'
  });

  // Simple state for jersey editing/adding
  const [editingJerseyId, setEditingJerseyId] = React.useState<string | null>(null);
  const [jerseyForm, setJerseyForm] = React.useState({
    name: '',
    description: '',
    frontImage: 'jersey_viper_front',
    backImage: 'jersey_viper_back',
    history: '',
    isLimited: false,
    price: '$20',
    photos: '',
    videos: ''
  });

  // Simple state for achievements editing/adding
  const [editingAchievementId, setEditingAchievementId] = React.useState<string | null>(null);
  const [isAddingAchievement, setIsAddingAchievement] = React.useState<boolean>(false);
  const [achievementForm, setAchievementForm] = React.useState({
    title: '',
    date: '',
    description: '',
    position: '',
    photos: '',
    videos: ''
  });

  // Simple state for Org details editing
  const [orgForm, setOrgForm] = React.useState<ContactConfig>({ ...contactConfig });

  // ------------------------------------
  // PLAYER ACTIONS
  // ------------------------------------
  const handleEditPlayer = (player: Player) => {
    setEditingPlayerId(player.id);
    setPlayerForm({
      ign: player.ign,
      realName: player.realName,
      role: player.role,
      photo: player.photo,
      gameId: player.gameId,
      joiningDate: player.joiningDate,
      totalTournaments: player.totalTournaments,
      bestAchievement: player.bestAchievement,
      favoriteWeapon: player.favoriteWeapon,
      playstyle: player.playstyle,
      matches: player.stats.matches,
      kills: player.stats.kills,
      mvps: player.stats.mvps,
      winRate: player.stats.winRate,
      instagram: player.socials.instagram || '',
      youtube: player.socials.youtube || '',
      discord: player.socials.discord || ''
    });
  };

  const handleNewPlayer = () => {
    setEditingPlayerId('new');
    setPlayerForm({
      ign: '',
      realName: '',
      role: 'Rusher',
      photo: 'viper',
      gameId: '',
      joiningDate: new Date().toISOString().split('T')[0],
      totalTournaments: 0,
      bestAchievement: 'Joined RAZE ELITE',
      favoriteWeapon: 'MP40',
      playstyle: 'Aggressive flanker',
      matches: 0,
      kills: 0,
      mvps: 0,
      winRate: 0,
      instagram: '',
      youtube: '',
      discord: ''
    });
  };

  const handleSavePlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerForm.ign.trim() || !playerForm.realName.trim() || !playerForm.gameId.trim()) {
      alert('Please fill out basic player name, IGN, and UID.');
      return;
    }

    const savedPlayer: Player = {
      id: editingPlayerId === 'new' ? Math.random().toString() : editingPlayerId!,
      ign: playerForm.ign.trim(),
      realName: playerForm.realName.trim(),
      role: playerForm.role,
      photo: playerForm.photo,
      gameId: playerForm.gameId.trim(),
      joiningDate: playerForm.joiningDate,
      totalTournaments: Number(playerForm.totalTournaments),
      bestAchievement: playerForm.bestAchievement.trim() || 'Roster member',
      favoriteWeapon: playerForm.favoriteWeapon.trim() || 'None',
      playstyle: playerForm.playstyle.trim() || 'Adaptive',
      stats: {
        matches: Number(playerForm.matches),
        kills: Number(playerForm.kills),
        mvps: Number(playerForm.mvps),
        winRate: Number(playerForm.winRate)
      },
      socials: {
        instagram: playerForm.instagram.trim() || undefined,
        youtube: playerForm.youtube.trim() || undefined,
        discord: playerForm.discord.trim() || undefined
      }
    };

    if (editingPlayerId === 'new') {
      onUpdatePlayers([...players, savedPlayer]);
    } else {
      onUpdatePlayers(players.map(p => p.id === editingPlayerId ? savedPlayer : p));
    }
    setEditingPlayerId(null);
  };

  const handleDeletePlayer = (id: string) => {
    if (confirm('Are you sure you want to remove this player from the roster?')) {
      onUpdatePlayers(players.filter(p => p.id !== id));
    }
  };

  // ------------------------------------
  // TOURNAMENT ACTIONS
  // ------------------------------------
  const handleEditTournament = (t: Tournament) => {
    setEditingTournamentId(t.id);
    setTournamentForm({
      name: t.name,
      date: t.date,
      entryDetails: t.entryDetails,
      prizePool: t.prizePool,
      winner: t.winner,
      status: t.status,
      results: t.results || '',
      image: t.image
    });
  };

  const handleNewTournament = () => {
    setEditingTournamentId('new');
    setTournamentForm({
      name: '',
      date: new Date().toISOString().split('T')[0],
      entryDetails: 'Invite Only',
      prizePool: '$100',
      winner: 'To Be Decided',
      status: 'upcoming',
      results: '',
      image: 't_cyber'
    });
  };

  const handleSaveTournament = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tournamentForm.name.trim()) {
      alert('Tournament name is required.');
      return;
    }

    const savedTournament: Tournament = {
      id: editingTournamentId === 'new' ? Math.random().toString() : editingTournamentId!,
      name: tournamentForm.name.trim(),
      date: tournamentForm.date,
      entryDetails: tournamentForm.entryDetails.trim(),
      prizePool: tournamentForm.prizePool.trim(),
      winner: tournamentForm.winner.trim(),
      status: tournamentForm.status,
      results: tournamentForm.results.trim() || undefined,
      image: tournamentForm.image
    };

    if (editingTournamentId === 'new') {
      onUpdateTournaments([...tournaments, savedTournament]);
    } else {
      onUpdateTournaments(tournaments.map(t => t.id === editingTournamentId ? savedTournament : t));
    }
    setEditingTournamentId(null);
  };

  const handleDeleteTournament = (id: string) => {
    if (confirm('Delete this tournament campaign?')) {
      onUpdateTournaments(tournaments.filter(t => t.id !== id));
    }
  };

  // ------------------------------------
  // JERSEY ACTIONS
  // ------------------------------------
  const handleEditJersey = (j: Jersey) => {
    setEditingJerseyId(j.id);
    setJerseyForm({
      name: j.name,
      description: j.description,
      frontImage: j.frontImage,
      backImage: j.backImage,
      history: j.history,
      isLimited: j.isLimited,
      price: j.price || '$20',
      photos: j.photos ? j.photos.join(', ') : '',
      videos: j.videos ? j.videos.join(', ') : ''
    });
  };

  const handleSaveJersey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jerseyForm.name.trim()) {
      alert('Product name is required.');
      return;
    }

    const photoArray = jerseyForm.photos.split(',').map(s => s.trim()).filter(Boolean);
    const videoArray = jerseyForm.videos.split(',').map(s => s.trim()).filter(Boolean);

    const savedJersey: Jersey = {
      id: editingJerseyId!,
      name: jerseyForm.name.trim(),
      description: jerseyForm.description.trim(),
      frontImage: jerseyForm.frontImage,
      backImage: jerseyForm.backImage,
      history: jerseyForm.history.trim(),
      isLimited: jerseyForm.isLimited,
      price: jerseyForm.price.trim(),
      photos: photoArray,
      videos: videoArray
    };

    onUpdateJerseys(jerseys.map(j => j.id === editingJerseyId ? savedJersey : j));
    setEditingJerseyId(null);
  };

  // ------------------------------------
  // ACHIEVEMENT ACTIONS
  // ------------------------------------
  const handleEditAchievement = (a: Achievement) => {
    setEditingAchievementId(a.id);
    setIsAddingAchievement(false);
    setAchievementForm({
      title: a.title,
      date: a.date,
      description: a.description,
      position: a.position,
      photos: a.photos ? a.photos.join(', ') : '',
      videos: a.videos ? a.videos.join(', ') : ''
    });
  };

  const handleCreateAchievement = () => {
    setIsAddingAchievement(true);
    setEditingAchievementId('');
    setAchievementForm({
      title: '',
      date: new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }),
      description: '',
      position: '',
      photos: '',
      videos: ''
    });
  };

  const handleSaveAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!achievementForm.title.trim()) {
      alert('Achievement title is required.');
      return;
    }

    const photoArray = achievementForm.photos.split(',').map(s => s.trim()).filter(Boolean);
    const videoArray = achievementForm.videos.split(',').map(s => s.trim()).filter(Boolean);

    if (isAddingAchievement) {
      const newAchievement: Achievement = {
        id: 'ach_' + Date.now(),
        title: achievementForm.title.trim(),
        date: achievementForm.date.trim(),
        description: achievementForm.description.trim(),
        position: achievementForm.position.trim(),
        photos: photoArray,
        videos: videoArray
      };
      onUpdateAchievements([...achievements, newAchievement]);
      setIsAddingAchievement(false);
    } else {
      const savedAchievement: Achievement = {
        id: editingAchievementId!,
        title: achievementForm.title.trim(),
        date: achievementForm.date.trim(),
        description: achievementForm.description.trim(),
        position: achievementForm.position.trim(),
        photos: photoArray,
        videos: videoArray
      };
      onUpdateAchievements(achievements.map(a => a.id === editingAchievementId ? savedAchievement : a));
      setEditingAchievementId(null);
    }
  };

  const handleDeleteAchievement = (id: string) => {
    if (confirm('Delete this achievement memory?')) {
      onUpdateAchievements(achievements.filter(a => a.id !== id));
    }
  };

  // ------------------------------------
  // RECRUITMENT APPLICATIONS
  // ------------------------------------
  const handleAppStatus = (id: string, status: 'Approved' | 'Rejected') => {
    onUpdateApplications(
      applications.map(app => app.id === id ? { ...app, status } : app)
    );
  };

  const handleDeleteApplication = (id: string) => {
    if (confirm('Delete this registration form?')) {
      onUpdateApplications(applications.filter(app => app.id !== id));
    }
  };

  // ------------------------------------
  // PROPOSALS / CONTACTS
  // ------------------------------------
  const handleDeleteProposal = (id: string) => {
    if (confirm('Delete this business inquiry?')) {
      onUpdateProposals(proposals.filter(p => p.id !== id));
    }
  };

  const handleSaveOrgDetails = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateContactConfig(orgForm);
    alert('Organization Command structures and contact profiles successfully updated!');
  };

  // Unprocessed application count
  const pendingApps = applications.filter(a => a.status === 'Pending').length;
  const pendingProposals = proposals.length;

  return (
    <div className="bg-[#0b0b0e] border border-brand-red/30 rounded-xl overflow-hidden shadow-[0_0_35px_rgba(255,0,60,0.15)] max-w-7xl mx-auto my-8 select-none font-sans">
      
      {/* Dashboard Top Banner */}
      <div className="bg-gradient-to-r from-brand-red/15 to-black/80 border-b border-dark-border px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-brand-red/20 border border-brand-red/40 rounded text-brand-red">
            <Settings className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold uppercase text-white tracking-wider">
              RAZE ELITE COMMAND CENTER
            </h3>
            <p className="font-mono text-[9px] text-gray-500 tracking-widest uppercase">
              Authenticated Admin Terminal // Core Database Panel
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="px-4 py-2 bg-brand-red text-white text-xs font-display font-bold uppercase tracking-widest rounded border border-brand-red/30 hover:bg-brand-red-hover transition-colors shadow-[0_0_10px_rgba(255,0,60,0.3)] cursor-pointer"
        >
          Exit HQ Console
        </button>
      </div>

      {/* Dashboard Body with Tabs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        
        {/* Left Hand tab selector sidebar (3 cols) */}
        <div className="lg:col-span-3 border-r border-dark-border bg-dark-bg/60 p-4 space-y-1">
          <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-widest px-3 mb-3">
            // COMMAND SECTIONS
          </span>

          {/* Tab Players */}
          <button
            onClick={() => { setActiveTab('players'); setEditingPlayerId(null); }}
            className={`w-full flex items-center justify-between px-3 py-3 rounded text-xs font-display font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'players' ? 'bg-brand-red/10 border-l-2 border-brand-red text-brand-red' : 'text-gray-400 hover:text-white hover:bg-dark-border/40'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Users className="w-4 h-4" /> Players Roster
            </span>
            <span className="font-mono text-[10px] bg-dark-border text-gray-300 px-1.5 py-0.5 rounded">
              {players.length}
            </span>
          </button>

          {/* Tab Tournaments */}
          <button
            onClick={() => { setActiveTab('tournaments'); setEditingTournamentId(null); }}
            className={`w-full flex items-center justify-between px-3 py-3 rounded text-xs font-display font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'tournaments' ? 'bg-brand-red/10 border-l-2 border-brand-red text-brand-red' : 'text-gray-400 hover:text-white hover:bg-dark-border/40'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Trophy className="w-4 h-4" /> Tournaments
            </span>
            <span className="font-mono text-[10px] bg-dark-border text-gray-300 px-1.5 py-0.5 rounded">
              {tournaments.length}
            </span>
          </button>

          {/* Tab Jerseys */}
          <button
            onClick={() => { setActiveTab('jerseys'); setEditingJerseyId(null); }}
            className={`w-full flex items-center justify-between px-3 py-3 rounded text-xs font-display font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'jerseys' ? 'bg-brand-red/10 border-l-2 border-brand-red text-brand-red' : 'text-gray-400 hover:text-white hover:bg-dark-border/40'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Shirt className="w-4 h-4" /> Merch Armors
            </span>
            <span className="font-mono text-[10px] bg-dark-border text-gray-300 px-1.5 py-0.5 rounded">
              {jerseys.length}
            </span>
          </button>

          {/* Tab Achievements */}
          <button
            onClick={() => { setActiveTab('achievements'); setEditingAchievementId(null); setIsAddingAchievement(false); }}
            className={`w-full flex items-center justify-between px-3 py-3 rounded text-xs font-display font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'achievements' ? 'bg-brand-red/10 border-l-2 border-brand-red text-brand-red' : 'text-gray-400 hover:text-white hover:bg-dark-border/40'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Award className="w-4 h-4" /> Achievements Hall
            </span>
            <span className="font-mono text-[10px] bg-dark-border text-gray-300 px-1.5 py-0.5 rounded">
              {achievements.length}
            </span>
          </button>

          {/* Tab Management details */}
          <button
            onClick={() => setActiveTab('management')}
            className={`w-full flex items-center justify-between px-3 py-3 rounded text-xs font-display font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'management' ? 'bg-brand-red/10 border-l-2 border-brand-red text-brand-red' : 'text-gray-400 hover:text-white hover:bg-dark-border/40'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Settings className="w-4 h-4" /> Org command settings
            </span>
          </button>

          {/* Tab Recruitment applications */}
          <button
            onClick={() => setActiveTab('applications')}
            className={`w-full flex items-center justify-between px-3 py-3 rounded text-xs font-display font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'applications' ? 'bg-brand-red/10 border-l-2 border-brand-red text-brand-red' : 'text-gray-400 hover:text-white hover:bg-dark-border/40'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <ClipboardList className="w-4 h-4" /> Recruitment applications
            </span>
            {pendingApps > 0 && (
              <span className="font-mono text-[10px] bg-brand-red text-white px-2 py-0.5 rounded font-bold animate-pulse">
                {pendingApps} NEW
              </span>
            )}
          </button>

          {/* Tab Proposals */}
          <button
            onClick={() => setActiveTab('proposals')}
            className={`w-full flex items-center justify-between px-3 py-3 rounded text-xs font-display font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'proposals' ? 'bg-brand-red/10 border-l-2 border-brand-red text-brand-red' : 'text-gray-400 hover:text-white hover:bg-dark-border/40'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4" /> Partnership Proposals
            </span>
            {pendingProposals > 0 && (
              <span className="font-mono text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded font-bold">
                {pendingProposals}
              </span>
            )}
          </button>
        </div>

        {/* Right hand dynamic editing content space (9 cols) */}
        <div className="lg:col-span-9 p-6 bg-[#0c0c0f]">
          
          {/* TAB 1: PLAYERS ROSTER */}
          {activeTab === 'players' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-dark-border pb-4">
                <h4 className="font-display text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-5 h-5 text-brand-red" />
                  <span>Roster Members Database</span>
                </h4>
                {editingPlayerId === null && (
                  <button
                    onClick={handleNewPlayer}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-red text-white rounded text-xs font-display font-bold uppercase tracking-wider cursor-pointer hover:bg-brand-red-hover transition-colors"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Add New Player</span>
                  </button>
                )}
              </div>

              {editingPlayerId !== null ? (
                /* Player Add/Edit Form */
                <form onSubmit={handleSavePlayer} className="space-y-4 bg-dark-bg/80 border border-dark-border p-5 rounded-lg">
                  <div className="font-display text-xs font-bold text-brand-red uppercase mb-2">
                    {editingPlayerId === 'new' ? '// ENLISTING NEW RECRUIT' : `// EDITING MEMBER ID: ${editingPlayerId}`}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">In-Game Name (IGN)</label>
                      <input
                        type="text"
                        value={playerForm.ign}
                        onChange={(e) => setPlayerForm({ ...playerForm, ign: e.target.value })}
                        placeholder="e.g. RAZE・OP_VIPER"
                        className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs font-mono text-white focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Real Name</label>
                      <input
                        type="text"
                        value={playerForm.realName}
                        onChange={(e) => setPlayerForm({ ...playerForm, realName: e.target.value })}
                        placeholder="e.g. Shreyas Sharma"
                        className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs font-sans text-white focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Role</label>
                      <select
                        value={playerForm.role}
                        onChange={(e) => setPlayerForm({ ...playerForm, role: e.target.value as PlayerRole })}
                        className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs text-white focus:outline-none"
                      >
                        <option value="IGL">IGL (In-Game Leader)</option>
                        <option value="Rusher">Rusher (Frontline Fragger)</option>
                        <option value="Sniper">Sniper (Long-Range Sentinel)</option>
                        <option value="Support">Support / Healer</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Game UID</label>
                      <input
                        type="text"
                        value={playerForm.gameId}
                        onChange={(e) => setPlayerForm({ ...playerForm, gameId: e.target.value })}
                        placeholder="472910394"
                        className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs font-mono text-white focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Join Date</label>
                      <input
                        type="date"
                        value={playerForm.joiningDate}
                        onChange={(e) => setPlayerForm({ ...playerForm, joiningDate: e.target.value })}
                        className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Fav Gun</label>
                      <input
                        type="text"
                        value={playerForm.favoriteWeapon}
                        onChange={(e) => setPlayerForm({ ...playerForm, favoriteWeapon: e.target.value })}
                        placeholder="AWM / M1887"
                        className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Avatar Preset</label>
                      <select
                        value={playerForm.photo}
                        onChange={(e) => setPlayerForm({ ...playerForm, photo: e.target.value })}
                        className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs text-white focus:outline-none"
                      >
                        <option value="viper">Viper Red Glow</option>
                        <option value="blaze">Blaze Orange Flame</option>
                        <option value="slayer">Slayer Deep Sky Blue</option>
                        <option value="phoenix">Phoenix Emerald Green</option>
                      </select>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#0c0c0f] border border-dark-border rounded">
                    <div>
                      <label className="block text-[9px] font-mono text-gray-500 uppercase mb-1">Matches</label>
                      <input
                        type="number"
                        value={playerForm.matches}
                        onChange={(e) => setPlayerForm({ ...playerForm, matches: Number(e.target.value) })}
                        className="w-full bg-dark-bg border border-dark-border rounded px-2.5 py-1 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-mono text-gray-500 uppercase mb-1">Kills</label>
                      <input
                        type="number"
                        value={playerForm.kills}
                        onChange={(e) => setPlayerForm({ ...playerForm, kills: Number(e.target.value) })}
                        className="w-full bg-dark-bg border border-dark-border rounded px-2.5 py-1 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-mono text-gray-500 uppercase mb-1">MVPs</label>
                      <input
                        type="number"
                        value={playerForm.mvps}
                        onChange={(e) => setPlayerForm({ ...playerForm, mvps: Number(e.target.value) })}
                        className="w-full bg-dark-bg border border-dark-border rounded px-2.5 py-1 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-mono text-gray-500 uppercase mb-1">Win Rate %</label>
                      <input
                        type="number"
                        max={100}
                        value={playerForm.winRate}
                        onChange={(e) => setPlayerForm({ ...playerForm, winRate: Number(e.target.value) })}
                        className="w-full bg-dark-bg border border-dark-border rounded px-2.5 py-1 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Playstyle & Achievement & Socials */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Best Achievement</label>
                      <input
                        type="text"
                        value={playerForm.bestAchievement}
                        onChange={(e) => setPlayerForm({ ...playerForm, bestAchievement: e.target.value })}
                        placeholder="Free Fire Cup MVP"
                        className="w-full bg-[#0c0c0f] border border-dark-border rounded px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Combat Tactics / Playstyle Description</label>
                      <textarea
                        rows={2}
                        value={playerForm.playstyle}
                        onChange={(e) => setPlayerForm({ ...playerForm, playstyle: e.target.value })}
                        placeholder="Aggressive support who coordintes gloo-wall placement."
                        className="w-full bg-[#0c0c0f] border border-dark-border rounded px-3 py-2 text-xs text-white focus:outline-none resize-none"
                      />
                    </div>
                    
                    {/* Social links handles */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[9px] font-mono text-gray-500 uppercase mb-1">Instagram username</label>
                        <input
                          type="text"
                          value={playerForm.instagram}
                          onChange={(e) => setPlayerForm({ ...playerForm, instagram: e.target.value })}
                          placeholder="raze_player_ff"
                          className="w-full bg-[#0c0c0f] border border-dark-border rounded px-3 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-mono text-gray-500 uppercase mb-1">YouTube username</label>
                        <input
                          type="text"
                          value={playerForm.youtube}
                          onChange={(e) => setPlayerForm({ ...playerForm, youtube: e.target.value })}
                          placeholder="PlayerGaming"
                          className="w-full bg-[#0c0c0f] border border-dark-border rounded px-3 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-mono text-gray-500 uppercase mb-1">Discord handle</label>
                        <input
                          type="text"
                          value={playerForm.discord}
                          onChange={(e) => setPlayerForm({ ...playerForm, discord: e.target.value })}
                          placeholder="player#4321"
                          className="w-full bg-[#0c0c0f] border border-dark-border rounded px-3 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-3 justify-end pt-3 border-t border-dark-border">
                    <button
                      type="button"
                      onClick={() => setEditingPlayerId(null)}
                      className="px-4 py-2 bg-dark-bg hover:bg-dark-border rounded text-xs text-gray-400 hover:text-white border border-dark-border cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-1 px-5 py-2 bg-brand-red text-white rounded text-xs font-display font-bold uppercase tracking-wider hover:bg-brand-red-hover cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Player</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Players List */
                <div className="space-y-3">
                  {players.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between bg-dark-bg/60 border border-dark-border p-4 rounded-lg hover:border-brand-red/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-[#121216] border border-dark-border flex items-center justify-center font-display text-sm font-bold text-white uppercase">
                          {p.role}
                        </div>
                        <div>
                          <h5 className="font-display text-sm font-bold text-white tracking-wide">{p.ign}</h5>
                          <span className="font-mono text-[10px] text-gray-500 uppercase">{p.realName} | ID: {p.gameId}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditPlayer(p)}
                          className="p-2 bg-dark-card hover:bg-brand-red/10 border border-dark-border hover:border-brand-red/30 rounded text-gray-400 hover:text-white cursor-pointer"
                          title="Edit Player"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeletePlayer(p.id)}
                          className="p-2 bg-dark-card hover:bg-brand-red/20 border border-dark-border hover:border-brand-red/40 rounded text-gray-500 hover:text-brand-red cursor-pointer"
                          title="Delete Player"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: TOURNAMENTS */}
          {activeTab === 'tournaments' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-dark-border pb-4">
                <h4 className="font-display text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-brand-red" />
                  <span>Tournament Campaign Registry</span>
                </h4>
                {editingTournamentId === null && (
                  <button
                    onClick={handleNewTournament}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-red text-white rounded text-xs font-display font-bold uppercase tracking-wider cursor-pointer hover:bg-brand-red-hover transition-colors"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Enlist Campaign</span>
                  </button>
                )}
              </div>

              {editingTournamentId !== null ? (
                /* Tournament Add/Edit Form */
                <form onSubmit={handleSaveTournament} className="space-y-4 bg-dark-bg/80 border border-dark-border p-5 rounded-lg">
                  <div className="font-display text-xs font-bold text-brand-red uppercase mb-2">
                    {editingTournamentId === 'new' ? '// CREATING TOURNAMENT' : `// EDITING TOURNAMENT ID: ${editingTournamentId}`}
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Tournament Name</label>
                    <input
                      type="text"
                      value={tournamentForm.name}
                      onChange={(e) => setTournamentForm({ ...tournamentForm, name: e.target.value })}
                      placeholder="e.g. Cyber Free Fire Cup"
                      className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs text-white focus:outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Campaign Date</label>
                      <input
                        type="date"
                        value={tournamentForm.date}
                        onChange={(e) => setTournamentForm({ ...tournamentForm, date: e.target.value })}
                        className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs text-white focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Prize Pool</label>
                      <input
                        type="text"
                        value={tournamentForm.prizePool}
                        onChange={(e) => setTournamentForm({ ...tournamentForm, prizePool: e.target.value })}
                        placeholder="$500"
                        className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Entry Details</label>
                      <input
                        type="text"
                        value={tournamentForm.entryDetails}
                        onChange={(e) => setTournamentForm({ ...tournamentForm, entryDetails: e.target.value })}
                        placeholder="Invite Only / Open"
                        className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Campaign Status</label>
                      <select
                        value={tournamentForm.status}
                        onChange={(e) => setTournamentForm({ ...tournamentForm, status: e.target.value as 'upcoming' | 'completed' })}
                        className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs text-white"
                      >
                        <option value="upcoming">Upcoming Campaign</option>
                        <option value="completed">Concluded / Completed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Winner Team</label>
                      <input
                        type="text"
                        value={tournamentForm.winner}
                        onChange={(e) => setTournamentForm({ ...tournamentForm, winner: e.target.value })}
                        placeholder="RAZE ELITE (Champion) / To Be Decided"
                        className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Match Results Breakdown</label>
                    <textarea
                      rows={3}
                      value={tournamentForm.results}
                      onChange={(e) => setTournamentForm({ ...tournamentForm, results: e.target.value })}
                      placeholder="1st Place. Sweep map results with record Booyahs."
                      className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs text-white resize-none"
                    />
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-3 justify-end pt-3 border-t border-dark-border">
                    <button
                      type="button"
                      onClick={() => setEditingTournamentId(null)}
                      className="px-4 py-2 bg-dark-bg hover:bg-dark-border rounded text-xs text-gray-400 hover:text-white border border-dark-border cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-1 px-5 py-2 bg-brand-red text-white rounded text-xs font-display font-bold uppercase tracking-wider hover:bg-brand-red-hover cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Tournament</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Tournament List */
                <div className="space-y-3">
                  {tournaments.map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center justify-between bg-dark-bg/60 border border-dark-border p-4 rounded-lg hover:border-brand-red/10 transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 text-[8px] font-mono font-bold uppercase rounded border ${
                            t.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-brand-red/10 text-brand-red border-brand-red/20'
                          }`}>
                            {t.status}
                          </span>
                          <span className="font-mono text-[10px] text-gray-500">{t.date}</span>
                        </div>
                        <h5 className="font-display text-sm font-bold text-white tracking-wide mt-1 uppercase">{t.name}</h5>
                        <p className="font-mono text-[9px] text-gray-500 uppercase mt-0.5">Prize: {t.prizePool} | Winner: {t.winner}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditTournament(t)}
                          className="p-2 bg-dark-card hover:bg-brand-red/10 border border-dark-border hover:border-brand-red/30 rounded text-gray-400 hover:text-white cursor-pointer"
                          title="Edit Campaign"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTournament(t.id)}
                          className="p-2 bg-dark-card hover:bg-brand-red/20 border border-dark-border hover:border-brand-red/40 rounded text-gray-500 hover:text-brand-red cursor-pointer"
                          title="Delete Campaign"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: JERSEYS */}
          {activeTab === 'jerseys' && (
            <div className="space-y-6">
              <div className="border-b border-dark-border pb-4">
                <h4 className="font-display text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Shirt className="w-5 h-5 text-brand-red" />
                  <span>Branded Apparel Armors</span>
                </h4>
              </div>

              {editingJerseyId !== null ? (
                /* Jersey Form */
                <form onSubmit={handleSaveJersey} className="space-y-4 bg-dark-bg/80 border border-dark-border p-5 rounded-lg">
                  <div className="font-display text-xs font-bold text-brand-red uppercase mb-2">
                    {`// CONFIGURING ARMOR SPECIFICATION: ${jerseyForm.name}`}
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Apparel Name</label>
                      <input
                        type="text"
                        value={jerseyForm.name}
                        onChange={(e) => setJerseyForm({ ...jerseyForm, name: e.target.value })}
                        className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Is Limited Edition?</label>
                      <select
                        value={jerseyForm.isLimited ? 'yes' : 'no'}
                        onChange={(e) => setJerseyForm({ ...jerseyForm, isLimited: e.target.value === 'yes' })}
                        className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs text-white"
                      >
                        <option value="no">Standard Release</option>
                        <option value="yes">Limited Edition (LTD Badge)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">History Badge Description</label>
                      <input
                        type="text"
                        value={jerseyForm.history}
                        onChange={(e) => setJerseyForm({ ...jerseyForm, history: e.target.value })}
                        placeholder="Worn during specific scrims"
                        className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Catalogue Description</label>
                    <textarea
                      rows={3}
                      value={jerseyForm.description}
                      onChange={(e) => setJerseyForm({ ...jerseyForm, description: e.target.value })}
                      className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs text-white resize-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Custom Photos (Comma-separated URLs)</label>
                      <input
                        type="text"
                        value={jerseyForm.photos}
                        onChange={(e) => setJerseyForm({ ...jerseyForm, photos: e.target.value })}
                        placeholder="e.g. https://domain.com/photo1.jpg, https://domain.com/photo2.jpg"
                        className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Custom Videos (Comma-separated URLs/YouTube links)</label>
                      <input
                        type="text"
                        value={jerseyForm.videos}
                        onChange={(e) => setJerseyForm({ ...jerseyForm, videos: e.target.value })}
                        placeholder="e.g. https://youtube.com/watch?v=..., https://domain.com/clip.mp4"
                        className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-3 justify-end pt-3 border-t border-dark-border">
                    <button
                      type="button"
                      onClick={() => setEditingJerseyId(null)}
                      className="px-4 py-2 bg-dark-bg hover:bg-dark-border rounded text-xs text-gray-400 hover:text-white border border-dark-border cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-1 px-5 py-2 bg-brand-red text-white rounded text-xs font-display font-bold uppercase tracking-wider hover:bg-brand-red-hover cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Update details</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Jersey List */
                <div className="space-y-3">
                  {jerseys.map((j) => (
                    <div
                      key={j.id}
                      className="flex items-center justify-between bg-dark-bg/60 border border-dark-border p-4 rounded-lg hover:border-brand-red/10 transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[9px] text-brand-red bg-brand-red/10 px-2 rounded">
                            {j.price}
                          </span>
                          {j.isLimited && (
                            <span className="font-mono text-[9px] text-amber-500 bg-amber-500/10 px-2 rounded font-bold">
                              LTD EDITION
                            </span>
                          )}
                        </div>
                        <h5 className="font-display text-sm font-bold text-white tracking-wide mt-1 uppercase">{j.name}</h5>
                        <p className="font-sans text-[11px] text-gray-500 mt-0.5 truncate max-w-[400px]">{j.description}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditJersey(j)}
                          className="p-2 bg-dark-card hover:bg-brand-red/10 border border-dark-border hover:border-brand-red/30 rounded text-gray-400 hover:text-white cursor-pointer"
                          title="Configure Apparel"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3.5: ACHIEVEMENTS */}
          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-dark-border pb-4">
                <h4 className="font-display text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-5 h-5 text-brand-red" />
                  <span>Our Hall of Fame & Achievements</span>
                </h4>
                {(editingAchievementId === null && !isAddingAchievement) && (
                  <button
                    onClick={handleCreateAchievement}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-red text-white text-xs font-display font-bold uppercase tracking-wider hover:bg-brand-red-hover rounded cursor-pointer transition-colors"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>New Achievement</span>
                  </button>
                )}
              </div>

              {(editingAchievementId !== null || isAddingAchievement) ? (
                /* Achievement Form */
                <form onSubmit={handleSaveAchievement} className="space-y-4 bg-dark-bg/80 border border-dark-border p-5 rounded-lg">
                  <div className="font-display text-xs font-bold text-brand-red uppercase mb-2">
                    {isAddingAchievement ? '// CREATING NEW HALL OF FAME RECORD' : `// EDITING RECORD SPECIFICATION: ${achievementForm.title}`}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Achievement Title</label>
                      <input
                        type="text"
                        value={achievementForm.title}
                        onChange={(e) => setAchievementForm({ ...achievementForm, title: e.target.value })}
                        placeholder="e.g. Free Fire Underdog Arena Champion"
                        className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Award/Position</label>
                      <input
                        type="text"
                        value={achievementForm.position}
                        onChange={(e) => setAchievementForm({ ...achievementForm, position: e.target.value })}
                        placeholder="e.g. 1st Place / Champion"
                        className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Date Achieved</label>
                      <input
                        type="text"
                        value={achievementForm.date}
                        onChange={(e) => setAchievementForm({ ...achievementForm, date: e.target.value })}
                        placeholder="e.g. May 2026"
                        className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Achievement Description</label>
                    <textarea
                      rows={3}
                      value={achievementForm.description}
                      onChange={(e) => setAchievementForm({ ...achievementForm, description: e.target.value })}
                      placeholder="Give a brief summary of how the victory was secured..."
                      className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs text-white resize-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Photos (Comma-separated URLs)</label>
                      <input
                        type="text"
                        value={achievementForm.photos}
                        onChange={(e) => setAchievementForm({ ...achievementForm, photos: e.target.value })}
                        placeholder="e.g. https://domain.com/photo1.jpg, https://domain.com/photo2.jpg"
                        className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Videos (Comma-separated URLs/YouTube links)</label>
                      <input
                        type="text"
                        value={achievementForm.videos}
                        onChange={(e) => setAchievementForm({ ...achievementForm, videos: e.target.value })}
                        placeholder="e.g. https://youtube.com/watch?v=..., https://domain.com/clip.mp4"
                        className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-3 justify-end pt-3 border-t border-dark-border">
                    <button
                      type="button"
                      onClick={() => { setEditingAchievementId(null); setIsAddingAchievement(false); }}
                      className="px-4 py-2 bg-dark-bg hover:bg-dark-border rounded text-xs text-gray-400 hover:text-white border border-dark-border cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-1 px-5 py-2 bg-brand-red text-white rounded text-xs font-display font-bold uppercase tracking-wider hover:bg-brand-red-hover cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isAddingAchievement ? 'Create Record' : 'Update Record'}</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Achievement List */
                <div className="space-y-3">
                  {achievements.length === 0 ? (
                    <div className="text-center py-8 text-xs font-mono text-gray-500 bg-dark-bg/40 border border-dark-border rounded-lg">
                      No achievements recorded yet. Add one to build your legacy!
                    </div>
                  ) : (
                    achievements.map((a) => (
                      <div
                        key={a.id}
                        className="flex items-center justify-between bg-dark-bg/60 border border-dark-border p-4 rounded-lg hover:border-brand-red/10 transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[9px] text-brand-red bg-brand-red/10 px-2 rounded">
                              {a.position}
                            </span>
                            <span className="font-mono text-[10px] text-gray-500">{a.date}</span>
                          </div>
                          <h5 className="font-display text-sm font-bold text-white tracking-wide mt-1 uppercase">{a.title}</h5>
                          <p className="font-sans text-[11px] text-gray-500 mt-0.5 truncate max-w-[400px]">{a.description}</p>
                          {(a.photos?.length || a.videos?.length) ? (
                            <div className="flex gap-3 mt-2">
                              {a.photos && a.photos.length > 0 && (
                                <span className="font-mono text-[9px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                                  📸 {a.photos.length} Photo{a.photos.length > 1 ? 's' : ''}
                                </span>
                              )}
                              {a.videos && a.videos.length > 0 && (
                                <span className="font-mono text-[9px] text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
                                  🎥 {a.videos.length} Video{a.videos.length > 1 ? 's' : ''}
                                </span>
                              )}
                            </div>
                          ) : null}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditAchievement(a)}
                            className="p-2 bg-dark-card hover:bg-brand-red/10 border border-dark-border hover:border-brand-red/30 rounded text-gray-400 hover:text-white cursor-pointer"
                            title="Edit Achievement"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteAchievement(a.id)}
                            className="p-2 bg-dark-card hover:bg-brand-red/20 border border-dark-border hover:border-brand-red/40 rounded text-gray-500 hover:text-brand-red cursor-pointer"
                            title="Delete Achievement"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: MANAGEMENT CONFIG */}
          {activeTab === 'management' && (
            <div className="space-y-6">
              <div className="border-b border-dark-border pb-4">
                <h4 className="font-display text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Settings className="w-5 h-5 text-brand-red" />
                  <span>Organization Command Structures</span>
                </h4>
              </div>

              <form onSubmit={handleSaveOrgDetails} className="space-y-5 bg-dark-bg/80 border border-dark-border p-6 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Founder IGN Name</label>
                    <input
                      type="text"
                      value={orgForm.founderName}
                      onChange={(e) => setOrgForm({ ...orgForm, founderName: e.target.value })}
                      className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Ownership Details</label>
                    <input
                      type="text"
                      value={orgForm.ownerDetails}
                      onChange={(e) => setOrgForm({ ...orgForm, ownerDetails: e.target.value })}
                      className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs text-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">WhatsApp Hot-Line</label>
                    <input
                      type="text"
                      value={orgForm.whatsapp}
                      onChange={(e) => setOrgForm({ ...orgForm, whatsapp: e.target.value })}
                      className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Discord Invite Link</label>
                    <input
                      type="text"
                      value={orgForm.discordId}
                      onChange={(e) => setOrgForm({ ...orgForm, discordId: e.target.value })}
                      className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Instagram Link</label>
                    <input
                      type="text"
                      value={orgForm.instagramLink || ''}
                      onChange={(e) => setOrgForm({ ...orgForm, instagramLink: e.target.value })}
                      placeholder="https://instagram.com/official.razeelite"
                      className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Business Email</label>
                    <input
                      type="email"
                      value={orgForm.email}
                      onChange={(e) => setOrgForm({ ...orgForm, email: e.target.value })}
                      className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Organization Biography & Story</label>
                  <textarea
                    rows={4}
                    value={orgForm.orgStory}
                    onChange={(e) => setOrgForm({ ...orgForm, orgStory: e.target.value })}
                    className="w-full bg-[#0c0c0f] border border-dark-border focus:border-brand-red rounded px-3 py-2 text-xs text-white resize-none font-sans"
                    required
                  />
                </div>

                {/* Submit button */}
                <div className="pt-3 border-t border-dark-border flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-brand-red text-white rounded text-xs font-display font-bold uppercase tracking-wider hover:bg-brand-red-hover cursor-pointer shadow-[0_0_10px_rgba(255,0,60,0.2)]"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Org Specifications</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 5: RECRUITMENT APPLICATIONS */}
          {activeTab === 'applications' && (
            <div className="space-y-6 font-sans">
              <div className="border-b border-dark-border pb-4">
                <h4 className="font-display text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-brand-red" />
                  <span>Cadet Recruit Applications ({applications.length})</span>
                </h4>
              </div>

              {applications.length === 0 ? (
                <div className="text-center py-12 text-gray-500 font-sans text-sm">
                  No enlistment profiles found in the registry. Try submitting a form on the recruitment page!
                </div>
              ) : (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="bg-[#0e0e11] border border-dark-border p-5 rounded-lg flex flex-col justify-between hover:border-brand-red/20 transition-all relative overflow-hidden"
                    >
                      {/* Status Tag on absolute */}
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <span className={`px-2.5 py-1 text-[9px] font-mono font-bold uppercase rounded border ${
                          app.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          app.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                          'bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse'
                        }`}>
                          {app.status}
                        </span>
                        
                        <button
                          onClick={() => handleDeleteApplication(app.id)}
                          className="p-1.5 bg-dark-bg border border-dark-border hover:border-brand-red text-gray-500 hover:text-brand-red rounded transition-colors"
                          title="Delete Application"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Header details */}
                      <div>
                        <div className="font-display text-base font-extrabold text-white tracking-wide flex items-center gap-2">
                          <span>{app.ign}</span>
                          <span className="text-xs text-gray-500 font-sans font-normal">({app.name}, {app.age} yrs)</span>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3 bg-dark-bg p-3 rounded text-xs font-mono text-gray-400 border border-dark-border">
                          <div>
                            <span className="block text-[9px] text-gray-500 uppercase">Game UID</span>
                            <span className="text-white font-medium">{app.uid}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] text-gray-500 uppercase">Target Role</span>
                            <span className="text-brand-red font-bold">{app.role}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] text-gray-500 uppercase">Prior Squad</span>
                            <span className="text-white font-medium">{app.previousTeam}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] text-gray-500 uppercase">Contact Link</span>
                            <span className="text-indigo-400 font-medium truncate max-w-[150px]">{app.contact}</span>
                          </div>
                        </div>

                        {/* Submitted timestamp */}
                        <div className="mt-3 text-[10px] text-gray-600 font-mono">
                          Submitted at: {app.submittedAt}
                        </div>
                      </div>

                      {/* Action buttons if Pending */}
                      {app.status === 'Pending' && (
                        <div className="mt-4 pt-3 border-t border-dark-border flex gap-3 justify-end">
                          <button
                            onClick={() => handleAppStatus(app.id, 'Rejected')}
                            className="flex items-center gap-1 px-3 py-1.5 bg-dark-bg border border-dark-border text-red-400 hover:border-red-500 rounded text-xs font-display font-bold uppercase tracking-wider cursor-pointer transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                          <button
                            onClick={() => handleAppStatus(app.id, 'Approved')}
                            className="flex items-center gap-1 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 rounded text-xs font-display font-bold uppercase tracking-wider cursor-pointer transition-all"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve for Trials</span>
                          </button>
                        </div>
                      )}

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: BUSINESS PROPOSALS */}
          {activeTab === 'proposals' && (
            <div className="space-y-6 font-sans">
              <div className="border-b border-dark-border pb-4">
                <h4 className="font-display text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Mail className="w-5 h-5 text-brand-red" />
                  <span>Sponsorship & Collaboration Inbox ({proposals.length})</span>
                </h4>
              </div>

              {proposals.length === 0 ? (
                <div className="text-center py-12 text-gray-500 font-sans text-sm">
                  Inbox is currently quiet. Try sending a sponsorship proposal or tournament invite from the contacts section!
                </div>
              ) : (
                <div className="space-y-4">
                  {proposals.map((prop) => (
                    <div
                      key={prop.id}
                      className="bg-[#0e0e11] border border-dark-border p-5 rounded-lg hover:border-brand-red/20 transition-all relative overflow-hidden"
                    >
                      <div className="absolute top-4 right-4">
                        <button
                          onClick={() => handleDeleteProposal(prop.id)}
                          className="p-1.5 bg-dark-bg border border-dark-border hover:border-brand-red text-gray-500 hover:text-brand-red rounded transition-colors"
                          title="Dismiss Proposal"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="font-mono text-[9px] text-brand-red bg-brand-red/10 border border-brand-red/20 px-2.5 py-0.5 rounded font-bold uppercase">
                            {prop.type}
                          </span>
                          <span className="font-mono text-[10px] text-gray-500">{prop.submittedAt}</span>
                        </div>

                        <h5 className="font-display text-base font-extrabold text-white uppercase tracking-wide mt-2">
                          {prop.name}
                        </h5>

                        <p className="font-sans text-xs text-gray-300 bg-dark-bg p-3 border border-dark-border rounded my-3 leading-relaxed">
                          {prop.message}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono text-gray-400">
                          <div>
                            <span className="text-gray-500 block text-[9px] uppercase">WhatsApp contact</span>
                            <span className="text-white font-medium">{prop.whatsapp}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 block text-[9px] uppercase">Discord Tag</span>
                            <span className="text-indigo-400 font-medium">{prop.discordId || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 block text-[9px] uppercase">Email Contact</span>
                            <span className="text-white font-medium truncate">{prop.email}</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
