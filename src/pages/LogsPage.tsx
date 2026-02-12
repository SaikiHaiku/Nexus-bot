import { useState } from 'react';
import { MessageSquare, Search, Download, RefreshCw } from 'lucide-react';
import { cn } from '@/utils/cn';

const logs = [
  { id: 1, type: 'command', content: '/play Bohemian Rhapsody', user: 'MusicFan#1234', channel: '#music', timestamp: new Date('2024-01-14T15:45:00') },
  { id: 2, type: 'moderation', content: 'Utilisateur ToxicUser#5678 banni', user: 'Admin#0001', channel: '#mod-logs', timestamp: new Date('2024-01-14T15:30:00') },
  { id: 3, type: 'join', content: 'NewMember#9012 a rejoint le serveur', user: 'System', channel: '#welcome', timestamp: new Date('2024-01-14T15:15:00') },
  { id: 4, type: 'leave', content: 'OldMember#3456 a quitté le serveur', user: 'System', channel: '#welcome', timestamp: new Date('2024-01-14T15:00:00') },
  { id: 5, type: 'command', content: '/level check', user: 'Gamer#7890', channel: '#bot-commands', timestamp: new Date('2024-01-14T14:45:00') },
  { id: 6, type: 'message', content: 'Message supprimé dans #general', user: 'System', channel: '#message-logs', timestamp: new Date('2024-01-14T14:30:00') },
  { id: 7, type: 'role', content: 'Rôle "VIP" ajouté à User#1111', user: 'Admin#0001', channel: '#role-logs', timestamp: new Date('2024-01-14T14:15:00') },
  { id: 8, type: 'voice', content: 'User#2222 a rejoint le salon vocal "Gaming"', user: 'System', channel: '#voice-logs', timestamp: new Date('2024-01-14T14:00:00') },
  { id: 9, type: 'command', content: '/giveaway start "Nitro" 24h', user: 'Mod#3333', channel: '#giveaways', timestamp: new Date('2024-01-14T13:45:00') },
  { id: 10, type: 'moderation', content: 'Utilisateur Spammer#4444 mute (30 min)', user: 'Mod#5555', channel: '#mod-logs', timestamp: new Date('2024-01-14T13:30:00') },
];

const typeConfig: Record<string, { label: string; color: string; bg: string }> = {
  command: { label: 'Commande', color: 'text-indigo-400', bg: 'bg-indigo-500/20' },
  moderation: { label: 'Modération', color: 'text-rose-400', bg: 'bg-rose-500/20' },
  join: { label: 'Arrivée', color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
  leave: { label: 'Départ', color: 'text-amber-400', bg: 'bg-amber-500/20' },
  message: { label: 'Message', color: 'text-blue-400', bg: 'bg-blue-500/20' },
  role: { label: 'Rôle', color: 'text-purple-400', bg: 'bg-purple-500/20' },
  voice: { label: 'Vocal', color: 'text-cyan-400', bg: 'bg-cyan-500/20' },
};

export function LogsPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.content.toLowerCase().includes(search.toLowerCase()) ||
                          log.user.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || log.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Logs</h1>
          <p className="text-slate-400 mt-1">Historique des événements du serveur</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Actualiser
          </button>
          <button className="px-4 py-2 rounded-xl bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exporter
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher dans les logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setTypeFilter('all')}
            className={cn(
              'px-4 py-2 rounded-xl font-medium transition-all',
              typeFilter === 'all' ? 'bg-indigo-500 text-white' : 'bg-slate-800/50 text-slate-400'
            )}
          >
            Tous
          </button>
          {Object.entries(typeConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setTypeFilter(key)}
              className={cn(
                'px-3 py-2 rounded-xl text-sm font-medium transition-all',
                typeFilter === key ? `${config.bg} ${config.color}` : 'bg-slate-800/50 text-slate-400 hover:text-white'
              )}
            >
              {config.label}
            </button>
          ))}
        </div>
      </div>

      {/* Logs List */}
      <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
        <div className="divide-y divide-slate-700/50">
          {filteredLogs.map((log) => {
            const config = typeConfig[log.type];
            return (
              <div key={log.id} className="flex items-center gap-4 p-4 hover:bg-slate-900/30 transition-colors">
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', config.bg)}>
                  <MessageSquare className={cn('w-5 h-5', config.color)} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn('px-2 py-0.5 rounded text-xs font-medium', config.bg, config.color)}>
                      {config.label}
                    </span>
                    <span className="text-sm text-slate-500">{log.channel}</span>
                  </div>
                  <p className="text-white truncate">{log.content}</p>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="text-sm text-slate-400">{log.user}</p>
                  <p className="text-xs text-slate-500">
                    {log.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="px-6 py-3 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors">
          Charger plus de logs...
        </button>
      </div>
    </div>
  );
}
