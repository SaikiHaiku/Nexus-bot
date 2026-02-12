import { useState } from 'react';
import { Trophy, Medal, Star, Gift, Settings, TrendingUp } from 'lucide-react';
import { defaultLevelConfig, leaderboard } from '@/data/mockData';
import { Toggle } from '@/components/Toggle';
import { cn } from '@/utils/cn';

export function LevelsPage() {
  const [config, setConfig] = useState(defaultLevelConfig);

  const updateConfig = (key: keyof typeof config, value: unknown) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Système de Niveaux</h1>
          <p className="text-slate-400 mt-1">Configurez le système d'XP et de niveaux</p>
        </div>
        <Toggle
          enabled={config.enabled}
          onChange={(v) => updateConfig('enabled', v)}
          label="Système activé"
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Leaderboard */}
        <div className="col-span-2 p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            Classement
          </h3>

          <div className="space-y-3">
            {leaderboard.map((user, index) => (
              <div 
                key={user.rank}
                className={cn(
                  'flex items-center gap-4 p-4 rounded-xl transition-all',
                  index < 3 
                    ? 'bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20' 
                    : 'bg-slate-900/30 hover:bg-slate-900/50'
                )}
              >
                <div className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg',
                  index === 0 && 'bg-gradient-to-br from-amber-400 to-amber-600 text-white',
                  index === 1 && 'bg-gradient-to-br from-slate-300 to-slate-500 text-white',
                  index === 2 && 'bg-gradient-to-br from-amber-600 to-amber-800 text-white',
                  index > 2 && 'bg-slate-700 text-slate-400'
                )}>
                  {index < 3 ? <Medal className="w-5 h-5" /> : user.rank}
                </div>

                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl">
                  {user.avatar}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{user.username}</p>
                  <p className="text-sm text-slate-400">
                    {user.xp.toLocaleString()} XP
                  </p>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 text-amber-400 font-semibold">
                    <Star className="w-4 h-4" />
                    Niveau {user.level}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-6">
          {/* XP Settings */}
          <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-indigo-400" />
              Paramètres XP
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-400 mb-2 block">XP par message</label>
                <input
                  type="number"
                  value={config.xpPerMessage}
                  onChange={(e) => updateConfig('xpPerMessage', parseInt(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/50 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-2 block">Cooldown (secondes)</label>
                <input
                  type="number"
                  value={config.xpCooldown}
                  onChange={(e) => updateConfig('xpCooldown', parseInt(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/50 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-2 block">Salon d'annonce</label>
                <select
                  value={config.announceChannel}
                  onChange={(e) => updateConfig('announceChannel', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/50 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="general">#general</option>
                  <option value="levels">#levels</option>
                  <option value="announcements">#announcements</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-2 block">Message de level up</label>
                <textarea
                  value={config.levelUpMessage}
                  onChange={(e) => updateConfig('levelUpMessage', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/50 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Role Rewards */}
          <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Gift className="w-5 h-5 text-pink-400" />
              Récompenses de rôles
            </h3>

            <div className="space-y-3">
              {config.roleRewards.map((reward, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{reward.roleName}</p>
                    <p className="text-xs text-slate-400">Niveau {reward.level}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-400">
                    Lvl {reward.level}
                  </span>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-2.5 rounded-xl border border-dashed border-slate-600 text-slate-400 hover:border-indigo-500 hover:text-indigo-400 transition-colors">
              + Ajouter une récompense
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
