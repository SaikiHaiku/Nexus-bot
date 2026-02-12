import type { Server, Command, AnalyticsData, ModLog, WelcomeConfig, LevelConfig, AutoModConfig } from '@/types';

export const botStats = {
  botId: '1471554131272532129',
  // Token is stored securely in environment variables - see .env.example
  totalServers: 15847,
  totalUsers: 2584932,
  commandsExecuted: 45892341,
  uptime: 99.97,
  ping: 42,
  shards: 8,
  memoryUsage: 2.4,
  cpuUsage: 15.3,
};

export const servers: Server[] = [
  { id: '1', name: 'Gaming Hub', icon: '🎮', memberCount: 15420, online: 3521, premium: true, botEnabled: true },
  { id: '2', name: 'Coding Community', icon: '💻', memberCount: 8934, online: 1245, premium: false, botEnabled: true },
  { id: '3', name: 'Music Lovers', icon: '🎵', memberCount: 23156, online: 5678, premium: true, botEnabled: true },
  { id: '4', name: 'Art & Design', icon: '🎨', memberCount: 6721, online: 892, premium: false, botEnabled: false },
  { id: '5', name: 'Crypto Trading', icon: '📈', memberCount: 45231, online: 12453, premium: true, botEnabled: true },
  { id: '6', name: 'Anime World', icon: '🌸', memberCount: 34521, online: 8932, premium: false, botEnabled: true },
];

export const commands: Command[] = [
  { name: 'help', description: 'Affiche la liste des commandes', category: 'Utilitaire', usage: '/help [commande]', enabled: true, cooldown: 3 },
  { name: 'play', description: 'Joue une musique', category: 'Musique', usage: '/play <url/recherche>', enabled: true, cooldown: 2 },
  { name: 'skip', description: 'Passe à la musique suivante', category: 'Musique', usage: '/skip', enabled: true, cooldown: 1 },
  { name: 'queue', description: 'Affiche la file d\'attente', category: 'Musique', usage: '/queue', enabled: true, cooldown: 5 },
  { name: 'ban', description: 'Bannit un utilisateur', category: 'Modération', usage: '/ban <@user> [raison]', enabled: true, cooldown: 0 },
  { name: 'kick', description: 'Expulse un utilisateur', category: 'Modération', usage: '/kick <@user> [raison]', enabled: true, cooldown: 0 },
  { name: 'mute', description: 'Rend muet un utilisateur', category: 'Modération', usage: '/mute <@user> <durée> [raison]', enabled: true, cooldown: 0 },
  { name: 'warn', description: 'Avertit un utilisateur', category: 'Modération', usage: '/warn <@user> <raison>', enabled: true, cooldown: 0 },
  { name: 'clear', description: 'Supprime des messages', category: 'Modération', usage: '/clear <nombre>', enabled: true, cooldown: 5 },
  { name: 'level', description: 'Affiche votre niveau', category: 'Niveaux', usage: '/level [@user]', enabled: true, cooldown: 10 },
  { name: 'leaderboard', description: 'Affiche le classement', category: 'Niveaux', usage: '/leaderboard', enabled: true, cooldown: 15 },
  { name: 'daily', description: 'Réclamez votre récompense quotidienne', category: 'Économie', usage: '/daily', enabled: true, cooldown: 86400 },
  { name: 'balance', description: 'Affiche votre solde', category: 'Économie', usage: '/balance [@user]', enabled: true, cooldown: 5 },
  { name: 'work', description: 'Travaillez pour gagner des coins', category: 'Économie', usage: '/work', enabled: true, cooldown: 3600 },
  { name: 'shop', description: 'Ouvre la boutique', category: 'Économie', usage: '/shop', enabled: true, cooldown: 5 },
  { name: 'serverinfo', description: 'Infos sur le serveur', category: 'Utilitaire', usage: '/serverinfo', enabled: true, cooldown: 10 },
  { name: 'userinfo', description: 'Infos sur un utilisateur', category: 'Utilitaire', usage: '/userinfo [@user]', enabled: true, cooldown: 5 },
  { name: 'avatar', description: 'Affiche l\'avatar', category: 'Utilitaire', usage: '/avatar [@user]', enabled: true, cooldown: 3 },
  { name: 'poll', description: 'Crée un sondage', category: 'Utilitaire', usage: '/poll <question> <options>', enabled: true, cooldown: 30 },
  { name: 'giveaway', description: 'Lance un giveaway', category: 'Utilitaire', usage: '/giveaway <durée> <prix>', enabled: true, cooldown: 0 },
  { name: 'ticket', description: 'Ouvre un ticket', category: 'Support', usage: '/ticket <sujet>', enabled: true, cooldown: 60 },
  { name: '8ball', description: 'Pose une question au 8ball', category: 'Fun', usage: '/8ball <question>', enabled: true, cooldown: 5 },
  { name: 'meme', description: 'Affiche un meme aléatoire', category: 'Fun', usage: '/meme', enabled: true, cooldown: 10 },
  { name: 'joke', description: 'Raconte une blague', category: 'Fun', usage: '/joke', enabled: true, cooldown: 10 },
];

export const analyticsData: AnalyticsData[] = [
  { date: '2024-01-01', commands: 45230, messages: 234521, users: 12453 },
  { date: '2024-01-02', commands: 52341, messages: 267834, users: 13521 },
  { date: '2024-01-03', commands: 48923, messages: 245123, users: 12876 },
  { date: '2024-01-04', commands: 61234, messages: 312456, users: 15234 },
  { date: '2024-01-05', commands: 58432, messages: 298765, users: 14532 },
  { date: '2024-01-06', commands: 72345, messages: 356789, users: 17654 },
  { date: '2024-01-07', commands: 68234, messages: 334521, users: 16432 },
  { date: '2024-01-08', commands: 55432, messages: 278934, users: 13876 },
  { date: '2024-01-09', commands: 63421, messages: 312567, users: 15234 },
  { date: '2024-01-10', commands: 71234, messages: 356432, users: 17123 },
  { date: '2024-01-11', commands: 78432, messages: 389234, users: 18765 },
  { date: '2024-01-12', commands: 82341, messages: 412345, users: 19876 },
  { date: '2024-01-13', commands: 85234, messages: 423456, users: 20543 },
  { date: '2024-01-14', commands: 79432, messages: 398765, users: 19234 },
];

export const modLogs: ModLog[] = [
  { id: '1', type: 'ban', user: 'ToxicUser#1234', moderator: 'Admin#0001', reason: 'Spam et insultes répétées', timestamp: new Date('2024-01-14T15:30:00') },
  { id: '2', type: 'mute', user: 'Spammer#5678', moderator: 'Mod#0002', reason: 'Spam de messages', timestamp: new Date('2024-01-14T14:22:00') },
  { id: '3', type: 'warn', user: 'NewUser#9012', moderator: 'Mod#0003', reason: 'Publicité non autorisée', timestamp: new Date('2024-01-14T13:15:00') },
  { id: '4', type: 'kick', user: 'Troll#3456', moderator: 'Admin#0001', reason: 'Comportement inapproprié', timestamp: new Date('2024-01-14T12:00:00') },
  { id: '5', type: 'unmute', user: 'Spammer#5678', moderator: 'Mod#0002', reason: 'Durée expirée', timestamp: new Date('2024-01-14T11:30:00') },
  { id: '6', type: 'warn', user: 'CapsLover#7890', moderator: 'Mod#0003', reason: 'Abus de majuscules', timestamp: new Date('2024-01-13T22:45:00') },
  { id: '7', type: 'ban', user: 'Hacker#1111', moderator: 'Admin#0001', reason: 'Tentative de scam', timestamp: new Date('2024-01-13T18:20:00') },
  { id: '8', type: 'mute', user: 'Flamer#2222', moderator: 'Mod#0002', reason: 'Insultes envers les membres', timestamp: new Date('2024-01-13T16:10:00') },
];

export const defaultWelcomeConfig: WelcomeConfig = {
  enabled: true,
  channel: 'welcome',
  message: 'Bienvenue {user} sur {server} ! Tu es notre {memberCount}ème membre ! 🎉',
  embedEnabled: true,
  embedColor: '#5865F2',
  dmEnabled: false,
  dmMessage: 'Bienvenue sur {server} ! N\'oublie pas de lire les règles.',
};

export const defaultLevelConfig: LevelConfig = {
  enabled: true,
  announceChannel: 'general',
  xpPerMessage: 25,
  xpCooldown: 60,
  levelUpMessage: '🎉 Félicitations {user} ! Tu viens de passer au niveau **{level}** !',
  roleRewards: [
    { level: 5, roleId: '1', roleName: 'Membre Actif' },
    { level: 10, roleId: '2', roleName: 'Habitué' },
    { level: 25, roleId: '3', roleName: 'Vétéran' },
    { level: 50, roleId: '4', roleName: 'Légende' },
    { level: 100, roleId: '5', roleName: 'Dieu du Serveur' },
  ],
};

export const defaultAutoModConfig: AutoModConfig = {
  antiSpam: true,
  antiLinks: true,
  antiInvites: true,
  badWords: true,
  capsFilter: true,
  maxMentions: 5,
  maxEmojis: 10,
  badWordsList: ['mot1', 'mot2', 'mot3'],
  whitelistedRoles: ['Admin', 'Modérateur'],
  whitelistedChannels: ['bot-commands', 'liens'],
};

export const topCommands = [
  { name: '/play', count: 892341, percentage: 35 },
  { name: '/help', count: 567234, percentage: 22 },
  { name: '/level', count: 423156, percentage: 17 },
  { name: '/balance', count: 312456, percentage: 12 },
  { name: '/daily', count: 234567, percentage: 9 },
  { name: '/meme', count: 123456, percentage: 5 },
];

export const leaderboard = [
  { rank: 1, username: 'ProGamer#1234', xp: 125430, level: 67, avatar: '🎮' },
  { rank: 2, username: 'MusicLover#5678', xp: 98234, level: 54, avatar: '🎵' },
  { rank: 3, username: 'ChatMaster#9012', xp: 87654, level: 48, avatar: '💬' },
  { rank: 4, username: 'ActiveUser#3456', xp: 76543, level: 43, avatar: '⭐' },
  { rank: 5, username: 'NewStar#7890', xp: 65432, level: 38, avatar: '🌟' },
  { rank: 6, username: 'Coder#1111', xp: 54321, level: 32, avatar: '💻' },
  { rank: 7, username: 'Artist#2222', xp: 43210, level: 27, avatar: '🎨' },
  { rank: 8, username: 'Helper#3333', xp: 32109, level: 22, avatar: '🤝' },
  { rank: 9, username: 'Member#4444', xp: 21098, level: 17, avatar: '👤' },
  { rank: 10, username: 'Newbie#5555', xp: 10987, level: 12, avatar: '🌱' },
];
