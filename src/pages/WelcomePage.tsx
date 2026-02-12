import { useState } from 'react';
import { Users, UserPlus, UserMinus, Hash, MessageSquare, Mail, Palette } from 'lucide-react';
import { defaultWelcomeConfig } from '@/data/mockData';
import { Toggle } from '@/components/Toggle';
import { cn } from '@/utils/cn';

export function WelcomePage() {
  const [config, setConfig] = useState(defaultWelcomeConfig);
  const [activeTab, setActiveTab] = useState<'welcome' | 'leave'>('welcome');

  const updateConfig = (key: keyof typeof config, value: unknown) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const previewMessage = config.message
    .replace('{user}', '@NouveauMembre')
    .replace('{server}', 'Gaming Hub')
    .replace('{memberCount}', '1,234');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Messages de Bienvenue</h1>
          <p className="text-slate-400 mt-1">Personnalisez les messages d'arrivée et de départ</p>
        </div>
        <Toggle
          enabled={config.enabled}
          onChange={(v) => updateConfig('enabled', v)}
          label="Système activé"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('welcome')}
          className={cn(
            'flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all',
            activeTab === 'welcome'
              ? 'bg-emerald-500 text-white'
              : 'bg-slate-800/50 text-slate-400 hover:text-white'
          )}
        >
          <UserPlus className="w-5 h-5" />
          Bienvenue
        </button>
        <button
          onClick={() => setActiveTab('leave')}
          className={cn(
            'flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all',
            activeTab === 'leave'
              ? 'bg-rose-500 text-white'
              : 'bg-slate-800/50 text-slate-400 hover:text-white'
          )}
        >
          <UserMinus className="w-5 h-5" />
          Au revoir
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Settings */}
        <div className="space-y-6">
          {/* Channel */}
          <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Hash className="w-5 h-5 text-indigo-400" />
              Salon
            </h3>

            <div>
              <label className="text-sm text-slate-400 mb-2 block">Salon de bienvenue</label>
              <select
                value={config.channel}
                onChange={(e) => updateConfig('channel', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="welcome">#welcome</option>
                <option value="general">#general</option>
                <option value="arrivals">#arrivals</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-green-400" />
              Message
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Message de bienvenue</label>
                <textarea
                  value={config.message}
                  onChange={(e) => updateConfig('message', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 resize-none font-mono text-sm"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700/50">
                <p className="text-sm text-slate-400 mb-2">Variables disponibles :</p>
                <div className="flex flex-wrap gap-2">
                  {['{user}', '{server}', '{memberCount}', '{user.tag}', '{user.id}'].map(v => (
                    <code key={v} className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-400 text-xs">
                      {v}
                    </code>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Embed Settings */}
          <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Palette className="w-5 h-5 text-purple-400" />
                Embed
              </h3>
              <Toggle
                enabled={config.embedEnabled}
                onChange={(v) => updateConfig('embedEnabled', v)}
              />
            </div>

            {config.embedEnabled && (
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Couleur de l'embed</label>
                <div className="flex gap-2">
                  {['#5865F2', '#57F287', '#FEE75C', '#EB459E', '#ED4245'].map(color => (
                    <button
                      key={color}
                      onClick={() => updateConfig('embedColor', color)}
                      className={cn(
                        'w-10 h-10 rounded-xl transition-transform hover:scale-110',
                        config.embedColor === color && 'ring-2 ring-white ring-offset-2 ring-offset-slate-800'
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <input
                    type="color"
                    value={config.embedColor}
                    onChange={(e) => updateConfig('embedColor', e.target.value)}
                    className="w-10 h-10 rounded-xl cursor-pointer bg-transparent"
                  />
                </div>
              </div>
            )}
          </div>

          {/* DM Settings */}
          <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-cyan-400" />
                Message Privé
              </h3>
              <Toggle
                enabled={config.dmEnabled}
                onChange={(v) => updateConfig('dmEnabled', v)}
              />
            </div>

            {config.dmEnabled && (
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Message DM</label>
                <textarea
                  value={config.dmMessage}
                  onChange={(e) => updateConfig('dmMessage', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>
            )}
          </div>
        </div>

        {/* Preview */}
        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 h-fit sticky top-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            Prévisualisation
          </h3>

          {/* Discord Preview */}
          <div className="rounded-xl bg-[#36393f] p-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🤖</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-[#5865F2]">NexusBot</span>
                  <span className="text-[10px] px-1 py-0.5 rounded bg-[#5865F2] text-white font-medium">BOT</span>
                  <span className="text-xs text-[#72767d]">Aujourd'hui à 14:32</span>
                </div>

                {config.embedEnabled ? (
                  <div 
                    className="rounded overflow-hidden mt-2"
                    style={{ borderLeft: `4px solid ${config.embedColor}` }}
                  >
                    <div className="bg-[#2f3136] p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-xl">
                          👋
                        </div>
                        <div>
                          <p className="font-semibold text-white">Bienvenue !</p>
                        </div>
                      </div>
                      <p className="text-[#dcddde] text-sm">{previewMessage}</p>
                      <div className="mt-3 pt-3 border-t border-[#40444b] flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600" />
                        <span className="text-xs text-[#72767d]">Gaming Hub</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-[#dcddde]">{previewMessage}</p>
                )}
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-500 mt-4 text-center">
            Aperçu du message qui sera envoyé
          </p>
        </div>
      </div>
    </div>
  );
}
