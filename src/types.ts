export type PlayerRole = 'IGL' | 'Rusher' | 'Sniper' | 'Support';
export type ManagementRole = 'Owner' | 'Founder' | 'Manager' | 'Coach' | 'Content Manager';

export interface Player {
  id: string;
  ign: string;
  realName: string;
  role: PlayerRole;
  photo: string;
  gameId: string;
  joiningDate: string;
  totalTournaments: number;
  bestAchievement: string;
  favoriteWeapon: string;
  playstyle: string;
  stats: {
    matches: number;
    kills: number;
    mvps: number;
    winRate: number; // e.g., 68 for 68%
  };
  socials: {
    instagram?: string;
    youtube?: string;
    discord?: string;
  };
}

export interface Tournament {
  id: string;
  name: string;
  date: string;
  entryDetails: string;
  prizePool: string;
  winner: string;
  status: 'upcoming' | 'completed';
  results?: string;
  image: string;
}

export interface Jersey {
  id: string;
  name: string;
  description: string;
  frontImage: string;
  backImage: string;
  history: string;
  isLimited: boolean;
  price?: string;
  photos?: string[];
  videos?: string[];
}

export interface ManagementMember {
  id: string;
  name: string;
  role: ManagementRole;
  photo: string;
  contact: string;
  bio: string;
}

export interface RecruitmentApplication {
  id: string;
  name: string;
  ign: string;
  uid: string;
  age: number;
  role: PlayerRole;
  previousTeam: string;
  contact: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  submittedAt: string;
}

export interface ContactConfig {
  founderName: string;
  ownerDetails: string;
  orgStory: string;
  whatsapp: string;
  discordId: string;
  email: string;
  instagramLink?: string;
}

export interface Achievement {
  id: string;
  title: string;
  date: string;
  description: string;
  position: string; // e.g. "Champion", "2nd Place"
  photos?: string[];
  videos?: string[];
}
