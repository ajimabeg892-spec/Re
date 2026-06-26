import { Player, Tournament, Jersey, ManagementMember, ContactConfig, Achievement } from './types';

export const DEFAULT_PLAYERS: Player[] = [
  {
    id: '1',
    ign: 'RAZE・Viper',
    realName: 'Shreyas Sharma',
    role: 'IGL',
    photo: 'viper',
    gameId: '472910394',
    joiningDate: '2025-08-12',
    totalTournaments: 22,
    bestAchievement: 'Free Fire Challengers Cup - Top 5 Finish',
    favoriteWeapon: 'Woodpecker / M1887',
    playstyle: 'Tactical coordinator and zone predictor. Plays safe rotations.',
    stats: {
      matches: 420,
      kills: 1350,
      mvps: 48,
      winRate: 65,
    },
    socials: {
      instagram: 'raze_viper_ff',
      youtube: 'ViperFF_Gaming',
      discord: 'viper#4321',
    },
  },
  {
    id: '2',
    ign: 'RAZE・Blaze',
    realName: 'Rohit Verma',
    role: 'Rusher',
    photo: 'blaze',
    gameId: '893120485',
    joiningDate: '2025-10-15',
    totalTournaments: 18,
    bestAchievement: 'Pro Underdog Cup MVP & Top Frag',
    favoriteWeapon: 'MP40 / M1014',
    playstyle: 'Ultra-aggressive, front-line entry specialist with insane close-range reflexes.',
    stats: {
      matches: 380,
      kills: 1620,
      mvps: 74,
      winRate: 72,
    },
    socials: {
      instagram: 'raze_blaze_rusher',
      youtube: 'BlazeRusherFF',
      discord: 'blaze#8812',
    },
  },
  {
    id: '3',
    ign: 'RAZE・Slayer',
    realName: 'Aman Rawat',
    role: 'Sniper',
    photo: 'slayer',
    gameId: '524910384',
    joiningDate: '2025-11-20',
    totalTournaments: 19,
    bestAchievement: 'Highest Snipe Headshots in City Open',
    favoriteWeapon: 'AWM / M82B',
    playstyle: 'Long-range sentinel. Provides crucial cover fire and opens fights with high-impact snipes.',
    stats: {
      matches: 350,
      kills: 1120,
      mvps: 35,
      winRate: 61,
    },
    socials: {
      instagram: 'raze_slayer_snipes',
      youtube: 'SlayerSnipes',
      discord: 'slayer#9901',
    },
  },
  {
    id: '4',
    ign: 'RAZE・Phoenix',
    realName: 'Kabir Sen',
    role: 'Support',
    photo: 'phoenix',
    gameId: '721038495',
    joiningDate: '2026-01-05',
    totalTournaments: 14,
    bestAchievement: 'Underdog Arena Champion & Healer MVP',
    favoriteWeapon: 'Charge Buster / MAC10',
    playstyle: 'Gloo-wall expert, dynamic reviver and flank protector. Clutch survivor.',
    stats: {
      matches: 310,
      kills: 850,
      mvps: 22,
      winRate: 68,
    },
    socials: {
      instagram: 'raze_phoenix_support',
      youtube: 'PhoenixEsports',
      discord: 'phoenix#1211',
    },
  },
];

export const DEFAULT_MANAGEMENT: ManagementMember[] = [
  {
    id: 'm1',
    name: 'RAZE・Alpha',
    role: 'Owner',
    photo: 'alpha',
    contact: 'alpha@razeelite.com',
    bio: 'Founder and chief visionary of RAZE ELITE. Passionate about elevating local mobile gaming talents to the global tier.',
  },
  {
    id: 'm2',
    name: 'RAZE・Ryu',
    role: 'Manager',
    photo: 'ryu',
    contact: 'ryu_manager_ff',
    bio: 'Coordinates tournament entries, schedules trials, handles sponsor coordination and oversees day-to-day team welfare.',
  },
  {
    id: 'm3',
    name: 'RAZE・Sensei',
    role: 'Coach',
    photo: 'sensei',
    contact: 'sensei_coach',
    bio: 'Former Free Fire competitive veteran. Focuses on rotational strategies, meta analysis, and behavioral performance.',
  },
  {
    id: 'm4',
    name: 'RAZE・Neon',
    role: 'Content Manager',
    photo: 'neon',
    contact: 'neon_streams',
    bio: 'Builds community presence, designs content releases, and oversees YouTube/TikTok highlights of team scrims.',
  },
];

export const DEFAULT_TOURNAMENTS: Tournament[] = [
  {
    id: 't1',
    name: 'Free Fire Underdog Arena (Season 4)',
    date: '2026-05-15',
    entryDetails: 'Invite Only',
    prizePool: '$350',
    winner: 'RAZE ELITE (Champion)',
    status: 'completed',
    results: '1st Place out of 48 teams. Dominant display by RAZE・Blaze with 38 total kills.',
    image: 't_underdog',
  },
  {
    id: 't2',
    name: 'City Championship League',
    date: '2026-04-10',
    entryDetails: 'Open Qualifier',
    prizePool: '$250',
    winner: 'Team Omega (RAZE ELITE Runner-Up)',
    status: 'completed',
    results: '2nd Place. Secured 3 Booyahs across 6 maps. Narrowly missed 1st by 4 points.',
    image: 't_city',
  },
  {
    id: 't3',
    name: 'Esports India Guild Bash',
    date: '2026-03-22',
    entryDetails: 'Guild Direct Invitation',
    prizePool: '$200',
    winner: 'RAZE ELITE (Champion)',
    status: 'completed',
    results: '1st Place. Sweep across Bermuda and Purgatory maps with total team wipeouts.',
    image: 't_guild',
  },
  {
    id: 't4',
    name: 'Cyber Free Fire Clash Pro',
    date: '2026-07-20',
    entryDetails: 'Slots Allocated via Invites',
    prizePool: '$500',
    winner: 'To Be Decided',
    status: 'upcoming',
    image: 't_cyber',
  },
  {
    id: 't5',
    name: 'Apex Free Fire Invitationals',
    date: '2026-08-05',
    entryDetails: 'Tier-1 Scrim Rank Invite',
    prizePool: '$300',
    winner: 'To Be Decided',
    status: 'upcoming',
    image: 't_apex',
  },
];

export const DEFAULT_JERSEYS: Jersey[] = [
  {
    id: 'j1',
    name: 'RAZE ELITE Pro Jersey - Viper Edition',
    description: 'The official 2026 gaming jersey designed for the ultimate competitive comfort. Breathable fabric featuring our signature red slash pattern and aggressive shoulder wings.',
    frontImage: 'jersey_viper_front',
    backImage: 'jersey_viper_back',
    history: 'Worn during our first champion run in the Free Fire Underdog Arena Season 4.',
    isLimited: false,
    price: '$25.00',
    photos: [
      '/src/assets/images/jersey_front_with_logo_1782467588291.jpg',
      '/src/assets/images/jersey_viper_back_1782467010793.jpg'
    ],
    videos: ['https://www.youtube.com/watch?v=Kz693zWp6YQ']
  },
  {
    id: 'j2',
    name: 'Elite Cyber Fire Hoodie (Limited Edition)',
    description: 'Prestige hoodie crafted for high-performance offline environments. Heavy cotton, premium neon-glowing cybernetics lining the sleeves, with the signature RAZE crest on the chest.',
    frontImage: 'jersey_hoodie_front',
    backImage: 'jersey_hoodie_back',
    history: 'Released in 100 copies worldwide to celebrate our one-year anniversary of entering competitive Free Fire.',
    isLimited: true,
    price: '$45.00',
    photos: ['https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&q=80&w=600'],
    videos: []
  },
];

export const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'a1',
    title: 'Free Fire Underdog Arena Champion',
    date: 'May 2026',
    description: 'Claimed 1st place in the prestigious Tier-2 Underdog Arena, beating 47 other rosters with a record 112 points.',
    position: '1st Place',
    photos: ['https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600'],
    videos: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ']
  },
  {
    id: 'a2',
    title: 'Esports India Guild Bash Winner',
    date: 'March 2026',
    description: 'Dominant championship campaign, securing 4 Booyahs out of 6 games in the main lobby.',
    position: '1st Place',
    photos: [],
    videos: []
  },
  {
    id: 'a3',
    title: 'City Championship League Runner-Up',
    date: 'April 2026',
    description: 'Narrowly secured 2nd place in high-tier competitive scrims against Tier-1 pro guilds.',
    position: '2nd Place',
    photos: ['https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600'],
    videos: []
  },
  {
    id: 'a4',
    title: 'Pro League Stage 1 FRAG King Award',
    date: 'April 2026',
    description: 'Awarded to RAZE・Blaze for getting 28 kills in a single day of high-pressure lobbies.',
    position: 'MVP Title',
    photos: [],
    videos: []
  },
];

export const DEFAULT_CONTACT_CONFIG: ContactConfig = {
  founderName: 'RAZE・Alpha',
  ownerDetails: 'Owned by esports veteran Shreyas Rawat, managed by a team of dedicated mobile competitive analysts.',
  orgStory: 'Founded in late 2025, RAZE ELITE started as a passionate group of four friends grinding Free Fire custom rooms in India. Seeing the immense potential in underdog lineups, we structured the guild, scouted specialized roles, and established RAZE ELITE. Today, we are one of the fastest-growing Free Fire rosters, aiming to transition into the Tier-1 championship brackets and write our legacy.',
  whatsapp: '+91 89842 50035',
  discordId: 'https://discord.gg/GTNeDDJc2',
  email: 'business@razeelite.com',
  instagramLink: 'https://www.instagram.com/official.razeelite?igsh=Zmk2MWVkaHdzMGdi',
};

// Local storage management helpers
const STORAGE_PREFIX = 'raze_elite_';

export function getStoredData<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading localStorage for key ' + key, error);
    return defaultValue;
  }
}

export function setStoredData<T>(key: string, value: T): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (error) {
    console.error('Error writing localStorage for key ' + key, error);
  }
}
