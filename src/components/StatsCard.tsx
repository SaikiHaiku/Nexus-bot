import { cn } from '@/utils/cn';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: number;
  color: 'indigo' | 'green' | 'amber' | 'rose' | 'cyan' | 'purple';
}

const colorClasses = {
  indigo: {
    bg: 'from-indigo-500/20 to-indigo-600/20',
    icon: 'from-indigo-500 to-indigo-600',
    text: 'text-indigo-400',
  },
  green: {
    bg: 'from-emerald-500/20 to-emerald-600/20',
    icon: 'from-emerald-500 to-emerald-600',
    text: 'text-emerald-400',
  },
  amber: {
    bg: 'from-amber-500/20 to-amber-600/20',
    icon: 'from-amber-500 to-amber-600',
    text: 'text-amber-400',
  },
  rose: {
    bg: 'from-rose-500/20 to-rose-600/20',
    icon: 'from-rose-500 to-rose-600',
    text: 'text-rose-400',
  },
  cyan: {
    bg: 'from-cyan-500/20 to-cyan-600/20',
    icon: 'from-cyan-500 to-cyan-600',
    text: 'text-cyan-400',
  },
  purple: {
    bg: 'from-purple-500/20 to-purple-600/20',
    icon: 'from-purple-500 to-purple-600',
    text: 'text-purple-400',
  },
};

export function StatsCard({ title, value, subtitle, icon: Icon, trend, color }: StatsCardProps) {
  const colors = colorClasses[color];
  
  return (
    <div className={cn(
      'relative overflow-hidden rounded-2xl p-6',
      'bg-gradient-to-br from-slate-800/50 to-slate-900/50',
      'border border-slate-700/50 backdrop-blur-xl',
      'hover:border-slate-600/50 transition-all duration-300'
    )}>
      <div className={cn(
        'absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20',
        `bg-gradient-to-br ${colors.icon}`
      )} />
      
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400 mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
          {trend !== undefined && (
            <div className={cn(
              'inline-flex items-center gap-1 mt-2 text-sm font-medium',
              trend >= 0 ? 'text-emerald-400' : 'text-rose-400'
            )}>
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
              <span className="text-slate-500">vs hier</span>
            </div>
          )}
        </div>
        <div className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center',
          `bg-gradient-to-br ${colors.icon}`,
          'shadow-lg'
        )}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}
