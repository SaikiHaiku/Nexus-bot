import { useState } from 'react';
import { Search, Terminal, Music, Shield, Trophy, Coins, Sparkles, HelpCircle, Clock } from 'lucide-react';
import { commands } from '@/data/mockData';
import { Toggle } from '@/components/Toggle';
import { cn } from '@/utils/cn';

const categories = [
  { id: 'all', name: 'Toutes', icon: Terminal },
  { id: 'Modération', name: 'Modération', icon: Shield },
  { id: 'Musique', name: 'Musique', icon: Music },
  { id: 'Niveaux', name: 'Niveaux', icon: Trophy },
  { id: 'Économie', name: 'Économie', icon: Coins },
  { id: 'Fun', name: 'Fun', icon: Sparkles },
  { id: 'Utilitaire', name: 'Utilitaire', icon: HelpCircle },
];

export function CommandsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [commandStates, setCommandStates] = useState<Record<string, boolean>>(
    Object.fromEntries(commands.map(c => [c.name, c.enabled]))
  );

  const filteredCommands = commands.filter(cmd => {
    const matchesSearch = cmd.name.toLowerCase().includes(search.toLowerCase()) ||
                          cmd.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || cmd.category === category;
    return matchesSearch && matchesCategory;
  });

  const toggleCommand = (name: string) => {
    setCommandStates(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Commandes</h1>
        <p className="text-slate-400 mt-1">Activez ou désactivez les commandes du bot</p>
      </div>

      {/* Search & Categories */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher une commande..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap',
                  category === cat.id
                    ? 'bg-indigo-500 text-white'
                    : 'bg-slate-800/50 text-slate-400 hover:text-white'
                )}
              >
                <Icon className="w-4 h-4" />
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Commands List */}
      <div className="grid grid-cols-2 gap-4">
        {filteredCommands.map((cmd) => (
          <div
            key={cmd.name}
            className={cn(
              'p-5 rounded-2xl border transition-all',
              commandStates[cmd.name]
                ? 'bg-slate-800/50 border-slate-700/50'
                : 'bg-slate-900/50 border-slate-800/50 opacity-60'
            )}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center',
                  commandStates[cmd.name]
                    ? 'bg-indigo-500/20 text-indigo-400'
                    : 'bg-slate-700/50 text-slate-500'
                )}>
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">/{cmd.name}</h3>
                  <span className={cn(
                    'text-xs px-2 py-0.5 rounded-full',
                    cmd.category === 'Modération' && 'bg-rose-500/20 text-rose-400',
                    cmd.category === 'Musique' && 'bg-green-500/20 text-green-400',
                    cmd.category === 'Niveaux' && 'bg-amber-500/20 text-amber-400',
                    cmd.category === 'Économie' && 'bg-yellow-500/20 text-yellow-400',
                    cmd.category === 'Fun' && 'bg-pink-500/20 text-pink-400',
                    cmd.category === 'Utilitaire' && 'bg-blue-500/20 text-blue-400',
                    cmd.category === 'Support' && 'bg-purple-500/20 text-purple-400',
                  )}>
                    {cmd.category}
                  </span>
                </div>
              </div>
              <Toggle
                enabled={commandStates[cmd.name]}
                onChange={() => toggleCommand(cmd.name)}
              />
            </div>
            
            <p className="text-sm text-slate-400 mb-3">{cmd.description}</p>
            
            <div className="flex items-center justify-between text-xs">
              <code className="px-2 py-1 rounded bg-slate-900 text-indigo-400 font-mono">
                {cmd.usage}
              </code>
              {cmd.cooldown > 0 && (
                <span className="flex items-center gap-1 text-slate-500">
                  <Clock className="w-3 h-3" />
                  {cmd.cooldown}s
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Résumé des commandes</h3>
            <p className="text-slate-400">Gérez l'activation de vos commandes</p>
          </div>
          <div className="flex gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-400">
                {Object.values(commandStates).filter(Boolean).length}
              </p>
              <p className="text-sm text-slate-400">Activées</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-rose-400">
                {Object.values(commandStates).filter(v => !v).length}
              </p>
              <p className="text-sm text-slate-400">Désactivées</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">{commands.length}</p>
              <p className="text-sm text-slate-400">Total</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
