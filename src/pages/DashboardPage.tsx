import { Server, Users, Terminal, Zap, Activity, Cpu, HardDrive, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { StatsCard } from '@/components/StatsCard';
import { botStats, analyticsData, topCommands, servers } from '@/data/mockData';

export function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 mt-1">Aperçu des statistiques de votre bot</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-4 gap-6">
        <StatsCard
          title="Serveurs"
          value={botStats.totalServers.toLocaleString()}
          icon={Server}
          trend={12.5}
          color="indigo"
        />
        <StatsCard
          title="Utilisateurs"
          value={(botStats.totalUsers / 1000000).toFixed(2) + 'M'}
          icon={Users}
          trend={8.3}
          color="green"
        />
        <StatsCard
          title="Commandes Exécutées"
          value={(botStats.commandsExecuted / 1000000).toFixed(1) + 'M'}
          icon={Terminal}
          trend={15.7}
          color="amber"
        />
        <StatsCard
          title="Uptime"
          value={botStats.uptime + '%'}
          icon={Zap}
          color="cyan"
        />
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Ping</p>
              <p className="text-xl font-bold text-white">{botStats.ping}ms</p>
            </div>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full w-1/4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
          </div>
        </div>
        
        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-400">CPU</p>
              <p className="text-xl font-bold text-white">{botStats.cpuUsage}%</p>
            </div>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full" style={{ width: `${botStats.cpuUsage}%` }} />
          </div>
        </div>
        
        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
              <HardDrive className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Mémoire</p>
              <p className="text-xl font-bold text-white">{botStats.memoryUsage}GB</p>
            </div>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
          </div>
        </div>
        
        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Shards</p>
              <p className="text-xl font-bold text-white">{botStats.shards} actifs</p>
            </div>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: botStats.shards }).map((_, i) => (
              <div key={i} className="flex-1 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
            ))}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Commands Chart */}
        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-6">Commandes Exécutées</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analyticsData}>
              <defs>
                <linearGradient id="colorCommands" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 12 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px' }}
                labelStyle={{ color: '#f8fafc' }}
              />
              <Area type="monotone" dataKey="commands" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorCommands)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Messages Chart */}
        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-6">Messages Traités</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 12 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px' }}
                labelStyle={{ color: '#f8fafc' }}
              />
              <Line type="monotone" dataKey="messages" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Commands & Recent Servers */}
      <div className="grid grid-cols-2 gap-6">
        {/* Top Commands */}
        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-6">Commandes Populaires</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topCommands} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" stroke="#64748b" />
              <YAxis dataKey="name" type="category" stroke="#64748b" width={80} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px' }}
                labelStyle={{ color: '#f8fafc' }}
              />
              <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Servers */}
        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-6">Serveurs Actifs</h3>
          <div className="space-y-4">
            {servers.slice(0, 5).map((server) => (
              <div key={server.id} className="flex items-center gap-4 p-3 rounded-xl bg-slate-900/50 hover:bg-slate-900 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl">
                  {server.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{server.name}</p>
                  <p className="text-sm text-slate-400">{server.memberCount.toLocaleString()} membres</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-emerald-400">{server.online.toLocaleString()} en ligne</p>
                  {server.premium && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">Premium</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
