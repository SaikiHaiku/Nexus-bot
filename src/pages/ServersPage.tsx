import { useState } from 'react';
import { Search, Settings, Users, Crown, Power, ExternalLink } from 'lucide-react';
import { servers } from '@/data/mockData';
import { cn } from '@/utils/cn';

export function ServersPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'premium' | 'active'>('all');

  const filteredServers = servers.filter(server => {
    const matchesSearch = server.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'premium' && server.premium) || 
      (filter === 'active' && server.botEnabled);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Mes Serveurs</h1>
        <p className="text-slate-400 mt-1">Gérez les serveurs où NexusBot est présent</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher un serveur..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50"
          />
        </div>
        
        <div className="flex gap-2">
          {(['all', 'premium', 'active'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-4 py-2 rounded-xl font-medium transition-all',
                filter === f
                  ? 'bg-indigo-500 text-white'
                  : 'bg-slate-800/50 text-slate-400 hover:text-white'
              )}
            >
              {f === 'all' && 'Tous'}
              {f === 'premium' && '⭐ Premium'}
              {f === 'active' && 'Actifs'}
            </button>
          ))}
        </div>
      </div>

      {/* Server Grid */}
      <div className="grid grid-cols-3 gap-6">
        {filteredServers.map((server) => (
          <div
            key={server.id}
            className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-slate-600/50 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl shadow-lg shadow-indigo-500/20">
                {server.icon}
              </div>
              <div className="flex items-center gap-2">
                {server.premium && (
                  <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/20 text-amber-400 text-xs font-medium">
                    <Crown className="w-3 h-3" />
                    Premium
                  </span>
                )}
                <div className={cn(
                  'w-3 h-3 rounded-full',
                  server.botEnabled ? 'bg-emerald-500' : 'bg-slate-500'
                )} />
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2">{server.name}</h3>
            
            <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {server.memberCount.toLocaleString()}
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                {server.online.toLocaleString()} en ligne
              </span>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors">
                <Settings className="w-4 h-4" />
                Gérer
              </button>
              <button className={cn(
                'px-4 py-2.5 rounded-xl font-medium transition-colors',
                server.botEnabled
                  ? 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
              )}>
                <Power className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Server */}
      <div className="p-8 rounded-2xl border-2 border-dashed border-slate-700 hover:border-indigo-500/50 transition-colors cursor-pointer group">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-500/20 transition-colors">
            <ExternalLink className="w-8 h-8 text-slate-400 group-hover:text-indigo-400 transition-colors" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Ajouter un serveur</h3>
          <p className="text-slate-400">Invitez NexusBot sur un nouveau serveur Discord</p>
        </div>
      </div>
    </div>
  );
}
