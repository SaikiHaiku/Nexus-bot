import { useState } from 'react';
import { Shield, Link, MessageSquare, AtSign, Smile, AlertOctagon, Plus, X } from 'lucide-react';
import { defaultAutoModConfig } from '@/data/mockData';
import { Toggle } from '@/components/Toggle';

export function AutoModPage() {
  const [config, setConfig] = useState(defaultAutoModConfig);
  const [newBadWord, setNewBadWord] = useState('');

  const updateConfig = (key: keyof typeof config, value: unknown) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const addBadWord = () => {
    if (newBadWord.trim()) {
      setConfig(prev => ({
        ...prev,
        badWordsList: [...prev.badWordsList, newBadWord.trim()]
      }));
      setNewBadWord('');
    }
  };

  const removeBadWord = (word: string) => {
    setConfig(prev => ({
      ...prev,
      badWordsList: prev.badWordsList.filter(w => w !== word)
    }));
  };

  const features = [
    {
      key: 'antiSpam' as const,
      title: 'Anti-Spam',
      description: 'Détecte et supprime les messages répétitifs',
      icon: MessageSquare,
      color: 'amber'
    },
    {
      key: 'antiLinks' as const,
      title: 'Anti-Liens',
      description: 'Bloque les liens non autorisés',
      icon: Link,
      color: 'blue'
    },
    {
      key: 'antiInvites' as const,
      title: 'Anti-Invitations',
      description: 'Bloque les invitations Discord',
      icon: Shield,
      color: 'purple'
    },
    {
      key: 'badWords' as const,
      title: 'Filtre de mots',
      description: 'Filtre les mots interdits',
      icon: AlertOctagon,
      color: 'rose'
    },
    {
      key: 'capsFilter' as const,
      title: 'Anti-Majuscules',
      description: 'Limite l\'utilisation excessive de majuscules',
      icon: MessageSquare,
      color: 'orange'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Auto-Modération</h1>
        <p className="text-slate-400 mt-1">Configurez la modération automatique de votre serveur</p>
      </div>

      {/* Main Features */}
      <div className="grid grid-cols-2 gap-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          const isEnabled = config[feature.key];
          
          return (
            <div
              key={feature.key}
              className={`p-6 rounded-2xl border transition-all ${
                isEnabled 
                  ? 'bg-slate-800/50 border-slate-700/50' 
                  : 'bg-slate-900/30 border-slate-800/50 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${feature.color}-500/20`}>
                    <Icon className={`w-6 h-6 text-${feature.color}-400`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{feature.title}</h3>
                    <p className="text-sm text-slate-400">{feature.description}</p>
                  </div>
                </div>
                <Toggle
                  enabled={isEnabled}
                  onChange={(v) => updateConfig(feature.key, v)}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Limits */}
        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <AtSign className="w-5 h-5 text-indigo-400" />
            Limites
          </h3>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-slate-400">Mentions maximum par message</label>
                <span className="text-sm font-medium text-white">{config.maxMentions}</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={config.maxMentions}
                onChange={(e) => updateConfig('maxMentions', parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-slate-400 flex items-center gap-2">
                  <Smile className="w-4 h-4" />
                  Emojis maximum par message
                </label>
                <span className="text-sm font-medium text-white">{config.maxEmojis}</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={config.maxEmojis}
                onChange={(e) => updateConfig('maxEmojis', parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Bad Words List */}
        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-rose-400" />
            Liste de mots interdits
          </h3>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Ajouter un mot..."
              value={newBadWord}
              onChange={(e) => setNewBadWord(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addBadWord()}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={addBadWord}
              className="px-4 py-2.5 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
            {config.badWordsList.map((word, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-400 text-sm"
              >
                {word}
                <button
                  onClick={() => removeBadWord(word)}
                  className="p-0.5 hover:bg-rose-500/30 rounded transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Whitelist */}
      <div className="grid grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-4">Rôles exemptés</h3>
          <div className="flex flex-wrap gap-2">
            {config.whitelistedRoles.map((role, index) => (
              <span
                key={index}
                className="px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 text-sm"
              >
                @{role}
              </span>
            ))}
            <button className="px-3 py-1.5 rounded-lg border border-dashed border-slate-600 text-slate-400 text-sm hover:border-indigo-500 hover:text-indigo-400 transition-colors">
              + Ajouter
            </button>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-4">Salons exemptés</h3>
          <div className="flex flex-wrap gap-2">
            {config.whitelistedChannels.map((channel, index) => (
              <span
                key={index}
                className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm"
              >
                #{channel}
              </span>
            ))}
            <button className="px-3 py-1.5 rounded-lg border border-dashed border-slate-600 text-slate-400 text-sm hover:border-emerald-500 hover:text-emerald-400 transition-colors">
              + Ajouter
            </button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-500/10 to-orange-500/10 border border-rose-500/20">
        <h3 className="text-lg font-semibold text-white mb-4">Actions automatiques</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { action: 'Supprimer le message', desc: 'Toujours actif' },
            { action: 'Avertir l\'utilisateur', desc: 'Après 3 infractions' },
            { action: 'Timeout (5 min)', desc: 'Après 5 infractions' },
            { action: 'Ban temporaire', desc: 'Après 10 infractions' },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-900/50 text-center">
              <p className="font-medium text-white mb-1">{item.action}</p>
              <p className="text-xs text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
