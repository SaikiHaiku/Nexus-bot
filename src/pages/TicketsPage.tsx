import { useState } from 'react';
import { Ticket, Plus, MessageCircle, Clock, User, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

const tickets = [
  { id: 'T-001', subject: 'Problème de permissions', user: 'User#1234', status: 'open', priority: 'high', messages: 12, created: '2024-01-14T10:30:00' },
  { id: 'T-002', subject: 'Question sur le bot', user: 'Member#5678', status: 'open', priority: 'medium', messages: 5, created: '2024-01-14T09:15:00' },
  { id: 'T-003', subject: 'Bug avec la musique', user: 'Gamer#9012', status: 'pending', priority: 'low', messages: 8, created: '2024-01-13T22:45:00' },
  { id: 'T-004', subject: 'Demande de partenariat', user: 'Admin#3456', status: 'closed', priority: 'medium', messages: 15, created: '2024-01-13T18:20:00' },
  { id: 'T-005', subject: 'Signalement d\'un membre', user: 'Mod#7890', status: 'open', priority: 'high', messages: 3, created: '2024-01-13T15:00:00' },
  { id: 'T-006', subject: 'Suggestion de fonctionnalité', user: 'Helper#1111', status: 'closed', priority: 'low', messages: 20, created: '2024-01-12T12:00:00' },
];

const statusConfig = {
  open: { label: 'Ouvert', color: 'emerald', icon: AlertCircle },
  pending: { label: 'En attente', color: 'amber', icon: Clock },
  closed: { label: 'Fermé', color: 'slate', icon: CheckCircle },
};

const priorityConfig = {
  high: { label: 'Haute', color: 'rose' },
  medium: { label: 'Moyenne', color: 'amber' },
  low: { label: 'Basse', color: 'slate' },
};

export function TicketsPage() {
  const [filter, setFilter] = useState<'all' | 'open' | 'pending' | 'closed'>('all');

  const filteredTickets = tickets.filter(t => filter === 'all' || t.status === filter);
  
  const stats = {
    open: tickets.filter(t => t.status === 'open').length,
    pending: tickets.filter(t => t.status === 'pending').length,
    closed: tickets.filter(t => t.status === 'closed').length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Tickets</h1>
          <p className="text-slate-400 mt-1">Gérez les tickets de support</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nouveau ticket
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Total</p>
              <p className="text-2xl font-bold text-white">{tickets.length}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
              <Ticket className="w-6 h-6 text-indigo-400" />
            </div>
          </div>
        </div>
        
        <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Ouverts</p>
              <p className="text-2xl font-bold text-emerald-400">{stats.open}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
        </div>
        
        <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">En attente</p>
              <p className="text-2xl font-bold text-amber-400">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-400" />
            </div>
          </div>
        </div>
        
        <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Fermés</p>
              <p className="text-2xl font-bold text-slate-400">{stats.closed}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-500/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(['all', 'open', 'pending', 'closed'] as const).map((f) => (
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
            {f === 'open' && `Ouverts (${stats.open})`}
            {f === 'pending' && `En attente (${stats.pending})`}
            {f === 'closed' && `Fermés (${stats.closed})`}
          </button>
        ))}
      </div>

      {/* Tickets List */}
      <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-900/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">ID</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Sujet</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Utilisateur</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Statut</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Priorité</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Messages</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {filteredTickets.map((ticket) => {
              const status = statusConfig[ticket.status as keyof typeof statusConfig];
              const priority = priorityConfig[ticket.priority as keyof typeof priorityConfig];
              const StatusIcon = status.icon;
              
              return (
                <tr key={ticket.id} className="hover:bg-slate-900/30 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono text-indigo-400">{ticket.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-white">{ticket.subject}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                        <User className="w-4 h-4 text-slate-400" />
                      </div>
                      <span className="text-slate-300">{ticket.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium',
                      `bg-${status.color}-500/20 text-${status.color}-400`
                    )}>
                      <StatusIcon className="w-4 h-4" />
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      'px-2 py-1 rounded text-xs font-medium',
                      `bg-${priority.color}-500/20 text-${priority.color}-400`
                    )}>
                      {priority.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-slate-400">
                      <MessageCircle className="w-4 h-4" />
                      {ticket.messages}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                      </button>
                      {ticket.status !== 'closed' && (
                        <button className="p-2 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 transition-colors">
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
