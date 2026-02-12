import { Server, Users, Terminal, Shield, Music, Trophy, Zap, Star, ChevronRight, Github, ExternalLink } from 'lucide-react';
import { botStats } from '@/data/mockData';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
}

const features = [
  {
    icon: Shield,
    title: 'Modération Avancée',
    description: 'Auto-modération, anti-spam, anti-raid, système de warns et bans avec logs complets.',
    color: 'from-rose-500 to-pink-600',
  },
  {
    icon: Music,
    title: 'Musique HD',
    description: 'Jouez de la musique depuis YouTube, Spotify, SoundCloud avec une qualité exceptionnelle.',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: Trophy,
    title: 'Système de Niveaux',
    description: 'Engagez votre communauté avec un système de XP, classements et récompenses de rôles.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: Terminal,
    title: '+100 Commandes',
    description: 'Économie, fun, utilitaires, giveaways, tickets et bien plus encore.',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    icon: Users,
    title: 'Bienvenue Personnalisé',
    description: 'Messages de bienvenue et d\'au revoir entièrement personnalisables avec embeds.',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    icon: Zap,
    title: 'Ultra Rapide',
    description: 'Optimisé pour la performance avec un temps de réponse moyen de 42ms.',
    color: 'from-yellow-500 to-amber-600',
  },
];

const testimonials = [
  { name: 'GamingHub', members: '15K', comment: 'Le meilleur bot que j\'ai jamais utilisé ! La modération est parfaite.' },
  { name: 'MusicLovers', members: '23K', comment: 'La qualité audio est incroyable, bien meilleur que les autres bots.' },
  { name: 'CodingCommunity', members: '8K', comment: 'Le système de niveaux a vraiment engagé notre communauté.' },
];

export function HomePage({ setCurrentPage }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl opacity-30" />
        
        <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-2xl">🤖</span>
            </div>
            <span className="text-2xl font-bold text-white">NexusBot</span>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#features" className="text-slate-300 hover:text-white transition-colors">Fonctionnalités</a>
            <a href="#stats" className="text-slate-300 hover:text-white transition-colors">Statistiques</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors flex items-center gap-2">
              <Github className="w-5 h-5" />
              GitHub
            </a>
            <button
              onClick={() => setCurrentPage('dashboard')}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-indigo-500/30"
            >
              Dashboard
            </button>
          </div>
        </nav>

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Plus de {(botStats.totalServers).toLocaleString()} serveurs nous font confiance
          </div>
          
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            Le Bot Discord<br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
              Tout-en-Un
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Modération, musique, niveaux, économie, giveaways et bien plus encore.
            Tout ce dont vous avez besoin pour gérer votre serveur Discord.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://discord.com/oauth2/authorize?client_id=1471554131272532129&permissions=8&scope=bot%20applications.commands"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-indigo-500/30 flex items-center gap-2 text-lg"
            >
              Inviter le Bot
              <ExternalLink className="w-5 h-5" />
            </a>
            <button
              onClick={() => setCurrentPage('dashboard')}
              className="px-8 py-4 bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-700 transition-all border border-slate-700 flex items-center gap-2 text-lg"
            >
              Voir le Dashboard
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section id="stats" className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-4 gap-6">
            {[
              { label: 'Serveurs', value: botStats.totalServers.toLocaleString(), icon: Server },
              { label: 'Utilisateurs', value: (botStats.totalUsers / 1000000).toFixed(1) + 'M', icon: Users },
              { label: 'Commandes Exécutées', value: (botStats.commandsExecuted / 1000000).toFixed(1) + 'M', icon: Terminal },
              { label: 'Uptime', value: botStats.uptime + '%', icon: Zap },
            ].map((stat, i) => (
              <div key={i} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-xl text-center">
                  <stat.icon className="w-8 h-8 text-indigo-400 mx-auto mb-4" />
                  <p className="text-4xl font-bold text-white mb-2">{stat.value}</p>
                  <p className="text-slate-400">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Fonctionnalités Puissantes</h2>
            <p className="text-xl text-slate-400">Tout ce dont vous avez besoin pour un serveur Discord parfait</p>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="group p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Ils nous font confiance</h2>
            <p className="text-xl text-slate-400">Des milliers de communautés utilisent NexusBot</p>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl">
                    🎮
                  </div>
                  <div>
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-sm text-slate-400">{t.members} membres</p>
                  </div>
                </div>
                <p className="text-slate-300 italic">"{t.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-indigo-500/30">
          <h2 className="text-4xl font-bold text-white mb-4">Prêt à commencer ?</h2>
          <p className="text-xl text-slate-400 mb-8">
            Ajoutez NexusBot à votre serveur en un clic et découvrez toutes ses fonctionnalités.
          </p>
          <a
            href="https://discord.com/oauth2/authorize?client_id=1471554131272532129&permissions=8&scope=bot%20applications.commands"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-indigo-500/30 text-lg"
          >
            Inviter NexusBot
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-xl">🤖</span>
            </div>
            <span className="text-xl font-bold text-white">NexusBot</span>
          </div>
          <p className="text-slate-400">© 2024 NexusBot. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
