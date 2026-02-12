import { useState } from 'react';
import { Settings, Globe, Bell, Palette, Key, Database, Save, RotateCcw, Bot, Copy } from 'lucide-react';
import { Toggle } from '@/components/Toggle';
import { cn } from '@/utils/cn';
import { botStats } from '@/data/mockData';

export function SettingsPage() {
  const [settings, setSettings] = useState({
    language: 'fr',
    prefix: '!',
    timezone: 'Europe/Paris',
    notifications: true,
    dmNotifications: false,
    embedColor: '#5865F2',
    deleteCommands: true,
    showBotActivity: true,
  });

  const updateSetting = (key: keyof typeof settings, value: unknown) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Paramètres</h1>
          <p className="text-slate-400 mt-1">Configurez les paramètres généraux du bot</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            Réinitialiser
          </button>
          <button className="px-4 py-2 rounded-xl bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors flex items-center gap-2">
            <Save className="w-4 h-4" />
            Sauvegarder
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-400" />
            Général
          </h3>

          <div className="space-y-6">
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Préfixe des commandes</label>
              <input
                type="text"
                value={settings.prefix}
                onChange={(e) => updateSetting('prefix', e.target.value)}
                maxLength={3}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
              <p className="text-xs text-slate-500 mt-1">Les commandes slash (/) fonctionnent toujours</p>
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-2 block flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Langue
              </label>
              <select
                value={settings.language}
                onChange={(e) => updateSetting('language', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="fr">🇫🇷 Français</option>
                <option value="en">🇬🇧 English</option>
                <option value="es">🇪🇸 Español</option>
                <option value="de">🇩🇪 Deutsch</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-2 block">Fuseau horaire</label>
              <select
                value={settings.timezone}
                onChange={(e) => updateSetting('timezone', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Europe/Paris">Europe/Paris (UTC+1)</option>
                <option value="Europe/London">Europe/London (UTC+0)</option>
                <option value="America/New_York">America/New_York (UTC-5)</option>
                <option value="Asia/Tokyo">Asia/Tokyo (UTC+9)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400" />
            Notifications
          </h3>

          <div className="space-y-6">
            <Toggle
              enabled={settings.notifications}
              onChange={(v) => updateSetting('notifications', v)}
              label="Notifications du dashboard"
              description="Recevez des alertes sur les événements importants"
            />
            
            <Toggle
              enabled={settings.dmNotifications}
              onChange={(v) => updateSetting('dmNotifications', v)}
              label="Notifications par DM"
              description="Recevez des notifications en message privé"
            />

            <Toggle
              enabled={settings.deleteCommands}
              onChange={(v) => updateSetting('deleteCommands', v)}
              label="Supprimer les commandes"
              description="Supprime automatiquement les messages de commandes"
            />

            <Toggle
              enabled={settings.showBotActivity}
              onChange={(v) => updateSetting('showBotActivity', v)}
              label="Activité du bot"
              description="Affiche le statut personnalisé du bot"
            />
          </div>
        </div>

        {/* Appearance */}
        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Palette className="w-5 h-5 text-purple-400" />
            Apparence
          </h3>

          <div className="space-y-6">
            <div>
              <label className="text-sm text-slate-400 mb-3 block">Couleur des embeds</label>
              <div className="flex gap-3">
                {['#5865F2', '#57F287', '#FEE75C', '#EB459E', '#ED4245', '#9B59B6'].map(color => (
                  <button
                    key={color}
                    onClick={() => updateSetting('embedColor', color)}
                    className={cn(
                      'w-12 h-12 rounded-xl transition-transform hover:scale-110',
                      settings.embedColor === color && 'ring-2 ring-white ring-offset-2 ring-offset-slate-800'
                    )}
                    style={{ backgroundColor: color }}
                  />
                ))}
                <input
                  type="color"
                  value={settings.embedColor}
                  onChange={(e) => updateSetting('embedColor', e.target.value)}
                  className="w-12 h-12 rounded-xl cursor-pointer bg-transparent border-2 border-dashed border-slate-600"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/50 border-l-4" style={{ borderColor: settings.embedColor }}>
              <p className="text-sm text-slate-400 mb-1">Aperçu</p>
              <p className="text-white">Voici à quoi ressembleront vos embeds</p>
            </div>
          </div>
        </div>

        {/* API & Advanced */}
        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Key className="w-5 h-5 text-rose-400" />
            API & Avancé
          </h3>

          <div className="space-y-6">
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Clé API</label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value="••••••••••••••••••••••••"
                  readOnly
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white font-mono"
                />
                <button className="px-4 py-3 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-colors">
                  Régénérer
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-1">Utilisez cette clé pour l'API NexusBot</p>
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-2 block flex items-center gap-2">
                <Database className="w-4 h-4" />
                Données
              </label>
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-3 rounded-xl bg-slate-700 text-white hover:bg-slate-600 transition-colors">
                  Exporter les données
                </button>
                <button className="flex-1 px-4 py-3 rounded-xl bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 transition-colors">
                  Supprimer les données
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bot Info */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Bot className="w-5 h-5 text-indigo-400" />
          Informations du Bot
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/50">
            <p className="text-sm text-slate-400 mb-1">Client ID</p>
            <div className="flex items-center gap-2">
              <code className="text-indigo-400 font-mono">{botStats.botId}</code>
              <button 
                onClick={() => navigator.clipboard.writeText(botStats.botId)}
                className="p-1 hover:bg-slate-700 rounded transition-colors"
              >
                <Copy className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/50">
            <p className="text-sm text-slate-400 mb-1">Lien d'invitation</p>
            <a 
              href={`https://discord.com/oauth2/authorize?client_id=${botStats.botId}&permissions=8&scope=bot%20applications.commands`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 transition-colors text-sm"
            >
              Cliquez pour inviter le bot →
            </a>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30">
        <h3 className="text-lg font-semibold text-rose-400 mb-4">Zone dangereuse</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-medium">Retirer le bot du serveur</p>
            <p className="text-sm text-slate-400">Cette action est irréversible</p>
          </div>
          <button className="px-4 py-2 rounded-xl bg-rose-500 text-white hover:bg-rose-600 transition-colors">
            Retirer le bot
          </button>
        </div>
      </div>
    </div>
  );
}
