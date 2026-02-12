import { useState } from 'react';
import { Gift, Plus, Clock, Users, Trophy, Calendar, Sparkles } from 'lucide-react';
import { cn } from '@/utils/cn';

const giveaways = [
  {
    id: '1',
    prize: 'Nitro 1 Mois',
    description: 'Un abonnement Discord Nitro pour 1 mois !',
    winners: 1,
    entries: 234,
    endDate: new Date('2024-01-20T20:00:00'),
    status: 'active',
    emoji: '🎁',
  },
  {
    id: '2',
    prize: 'Steam Gift Card 50€',
    description: 'Carte cadeau Steam d\'une valeur de 50€',
    winners: 2,
    entries: 567,
    endDate: new Date('2024-01-18T18:00:00'),
    status: 'active',
    emoji: '🎮',
  },
  {
    id: '3',
    prize: 'Rôle VIP',
    description: 'Rôle VIP exclusif avec accès aux salons privés',
    winners: 5,
    entries: 123,
    endDate: new Date('2024-01-15T12:00:00'),
    status: 'ended',
    emoji: '⭐',
  },
  {
    id: '4',
    prize: 'AirPods Pro',
    description: 'Une paire d\'AirPods Pro flambant neuve !',
    winners: 1,
    entries: 1543,
    endDate: new Date('2024-01-10T20:00:00'),
    status: 'ended',
    emoji: '🎧',
  },
];

export function GiveawaysPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'ended'>('all');

  const filteredGiveaways = giveaways.filter(g => filter === 'all' || g.status === filter);
  
  const stats = {
    active: giveaways.filter(g => g.status === 'active').length,
    ended: giveaways.filter(g => g.status === 'ended').length,
    totalEntries: giveaways.reduce((acc, g) => acc + g.entries, 0),
  };

  const formatTimeLeft = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    if (diff <= 0) return 'Terminé';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}j ${hours}h`;
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Giveaways</h1>
          <p className="text-slate-400 mt-1">Créez et gérez vos concours</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nouveau giveaway
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Total</p>
              <p className="text-2xl font-bold text-white">{giveaways.length}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center">
              <Gift className="w-6 h-6 text-pink-400" />
            </div>
          </div>
        </div>
        
        <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">En cours</p>
              <p className="text-2xl font-bold text-emerald-400">{stats.active}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
        </div>
        
        <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Terminés</p>
              <p className="text-2xl font-bold text-slate-400">{stats.ended}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-500/20 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-slate-400" />
            </div>
          </div>
        </div>
        
        <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Participations</p>
              <p className="text-2xl font-bold text-indigo-400">{stats.totalEntries.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-indigo-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(['all', 'active', 'ended'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'px-4 py-2 rounded-xl font-medium transition-all',
              filter === f
                ? 'bg-pink-500 text-white'
                : 'bg-slate-800/50 text-slate-400 hover:text-white'
            )}
          >
            {f === 'all' && 'Tous'}
            {f === 'active' && `En cours (${stats.active})`}
            {f === 'ended' && `Terminés (${stats.ended})`}
          </button>
        ))}
      </div>

      {/* Giveaways Grid */}
      <div className="grid grid-cols-2 gap-6">
        {filteredGiveaways.map((giveaway) => (
          <div
            key={giveaway.id}
            className={cn(
              'p-6 rounded-2xl border transition-all',
              giveaway.status === 'active'
                ? 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 hover:border-pink-500/30'
                : 'bg-slate-900/30 border-slate-800/50 opacity-75'
            )}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-3xl shadow-lg shadow-pink-500/20">
                {giveaway.emoji}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-semibold text-white">{giveaway.prize}</h3>
                  {giveaway.status === 'active' && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium animate-pulse">
                      EN COURS
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-sm">{giveaway.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="p-3 rounded-xl bg-slate-900/50 text-center">
                <Trophy className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                <p className="text-lg font-semibold text-white">{giveaway.winners}</p>
                <p className="text-xs text-slate-400">Gagnant{giveaway.winners > 1 ? 's' : ''}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/50 text-center">
                <Users className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
                <p className="text-lg font-semibold text-white">{giveaway.entries}</p>
                <p className="text-xs text-slate-400">Participants</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/50 text-center">
                <Clock className="w-5 h-5 text-rose-400 mx-auto mb-1" />
                <p className="text-lg font-semibold text-white">{formatTimeLeft(giveaway.endDate)}</p>
                <p className="text-xs text-slate-400">Restant</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Calendar className="w-4 h-4" />
                {giveaway.endDate.toLocaleDateString('fr-FR')}
              </div>
              <div className="flex gap-2">
                {giveaway.status === 'active' ? (
                  <>
                    <button className="px-4 py-2 rounded-xl bg-slate-700 text-white text-sm hover:bg-slate-600 transition-colors">
                      Modifier
                    </button>
                    <button className="px-4 py-2 rounded-xl bg-rose-500 text-white text-sm hover:bg-rose-600 transition-colors">
                      Terminer
                    </button>
                  </>
                ) : (
                  <button className="px-4 py-2 rounded-xl bg-indigo-500 text-white text-sm hover:bg-indigo-600 transition-colors">
                    Relancer
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
