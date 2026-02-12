import { 
  LayoutDashboard, 
  Server, 
  Terminal, 
  Shield, 
  Music, 
  Trophy, 
  Gift, 
  Settings, 
  Home,
  Users,
  MessageSquare,
  Ticket,
  Bell,
  LogOut,
  Crown
} from 'lucide-react';
import { cn } from '@/utils/cn';

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const menuItems = [
  { id: 'home', label: 'Accueil', icon: Home },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'servers', label: 'Serveurs', icon: Server },
  { id: 'commands', label: 'Commandes', icon: Terminal },
  { id: 'moderation', label: 'Modération', icon: Shield },
  { id: 'automod', label: 'Auto-Modération', icon: Bell },
  { id: 'music', label: 'Musique', icon: Music },
  { id: 'levels', label: 'Niveaux', icon: Trophy },
  { id: 'welcome', label: 'Bienvenue', icon: Users },
  { id: 'tickets', label: 'Tickets', icon: Ticket },
  { id: 'giveaways', label: 'Giveaways', icon: Gift },
  { id: 'logs', label: 'Logs', icon: MessageSquare },
  { id: 'premium', label: 'Premium', icon: Crown },
  { id: 'settings', label: 'Paramètres', icon: Settings },
];

export function Sidebar({ currentPage, setCurrentPage }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-800 flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <span className="text-xl">🤖</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">NexusBot</h1>
            <p className="text-xs text-slate-400">Dashboard v2.0</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white border border-indigo-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              )}
            >
              <Icon className={cn('w-5 h-5', isActive && 'text-indigo-400')} />
              {item.label}
              {item.id === 'premium' && (
                <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold">
                  PRO
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
            <span className="text-lg">👤</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Admin#0001</p>
            <p className="text-xs text-slate-400">Premium User</p>
          </div>
          <button className="p-2 text-slate-400 hover:text-red-400 transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
