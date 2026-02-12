import { useState } from 'react';
import { Shield, Ban, UserMinus, VolumeX, AlertTriangle, Search, Clock } from 'lucide-react';
import { modLogs } from '@/data/mockData';
import { cn } from '@/utils/cn';

const actionTypes = {
  ban: { icon: Ban, color: 'text-rose-400', bg: 'bg-rose-500/20', label: 'Ban' },
  kick: { icon: UserMinus, color: 'text-orange-400', bg: 'bg-orange-500/20', label: 'Kick' },
  mute: { icon: VolumeX, color: 'text-amber-400', bg: 'bg-amber-500/20', label: 'Mute' },
  warn: { icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-500/20', label: 'Warn' },
  unban: { icon: Ban, color: 'text-emerald-400', bg: 'bg-emerald-500/20', label: 'Unban' },
  unmute: { icon: VolumeX, color: 'text-green-400', bg: 'bg-green-500/20', label: 'Unmute' },
};

export function ModerationPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('all');

  const filteredLogs = modLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(search.toLowerCase()) ||
                          log.moderator.toLowerCase().includes(search.toLowerCase()) ||
                          log.reason.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || log.type === filter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    bans: modLogs.filter(l => l.type === 'ban').length,
    kicks: modLogs.filter(l => l.type === 'kick').length,
    mutes: modLogs.filter(l => l.type === 'mute').length,
    warns: modLogs.filter(l => l.type === 'warn').length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Modération</h1>
          <p className="text-slate-400 mt-1">Historique des actions de modération</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-rose-500 text-white font-medium hover:bg-rose-600 transition-colors flex items-center gap-2">
          <Ban className="w-4 h-4" />
          Nouvelle action
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Bans', value: stats.bans, icon: Ban, color: 'rose' },
          { label: 'Kicks', value: stats.kicks, icon: UserMinus, color: 'orange' },
          { label: 'Mutes', value: stats.mutes, icon: VolumeX, color: 'amber' },
          { label: 'Warns', value: stats.warns, icon: AlertTriangle, color: 'yellow' },
        ].map((stat) => (
          <div key={stat.label} className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center',
                `bg-${stat.color}-500/20`
              )}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              'px-4 py-2 rounded-xl font-medium transition-all',
              filter === 'all' ? 'bg-indigo-500 text-white' : 'bg-slate-800/50 text-slate-400'
            )}
          >
            Tous
          </button>
          {Object.entries(actionTypes).slice(0, 4).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={cn(
                'px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2',
                filter === key ? `${value.bg} ${value.color}` : 'bg-slate-800/50 text-slate-400'
              )}
            >
              <value.icon className="w-4 h-4" />
              {value.label}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-900/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Type</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Utilisateur</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Modérateur</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Raison</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {filteredLogs.map((log) => {
              const action = actionTypes[log.type];
              const Icon = action.icon;
              return (
                <tr key={log.id} className="hover:bg-slate-900/30 transition-colors">
                  <td className="px-6 py-4">
                    <span className={cn(
                      'inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium',
                      action.bg, action.color
                    )}>
                      <Icon className="w-4 h-4" />
                      {action.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm">
                        👤
                      </div>
                      <span className="text-white font-medium">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-indigo-400" />
                      </div>
                      <span className="text-slate-300">{log.moderator}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-400 max-w-xs truncate block">{log.reason}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <Clock className="w-4 h-4" />
                      {log.timestamp.toLocaleDateString('fr-FR')} à {log.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
