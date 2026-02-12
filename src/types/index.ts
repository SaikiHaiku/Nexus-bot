export interface Server {
  id: string;
  name: string;
  icon: string;
  memberCount: number;
  online: number;
  premium: boolean;
  botEnabled: boolean;
}

export interface Command {
  name: string;
  description: string;
  category: string;
  usage: string;
  enabled: boolean;
  cooldown: number;
}

export interface AnalyticsData {
  date: string;
  commands: number;
  messages: number;
  users: number;
}

export interface ModLog {
  id: string;
  type: 'ban' | 'kick' | 'mute' | 'warn' | 'unban' | 'unmute';
  user: string;
  moderator: string;
  reason: string;
  timestamp: Date;
}

export interface WelcomeConfig {
  enabled: boolean;
  channel: string;
  message: string;
  embedEnabled: boolean;
  embedColor: string;
  dmEnabled: boolean;
  dmMessage: string;
}

export interface LevelConfig {
  enabled: boolean;
  announceChannel: string;
  xpPerMessage: number;
  xpCooldown: number;
  levelUpMessage: string;
  roleRewards: { level: number; roleId: string; roleName: string }[];
}

export interface AutoModConfig {
  antiSpam: boolean;
  antiLinks: boolean;
  antiInvites: boolean;
  badWords: boolean;
  capsFilter: boolean;
  maxMentions: number;
  maxEmojis: number;
  badWordsList: string[];
  whitelistedRoles: string[];
  whitelistedChannels: string[];
}
