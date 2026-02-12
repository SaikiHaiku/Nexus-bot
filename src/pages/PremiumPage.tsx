import { Crown, Check, Zap, Sparkles, Shield, Music, Trophy, Gift, Star } from 'lucide-react';
import { cn } from '@/utils/cn';

const plans = [
  {
    name: 'Gratuit',
    price: '0€',
    period: '/mois',
    description: 'Parfait pour commencer',
    features: [
      'Commandes de base',
      'Modération simple',
      'Système de niveaux',
      '3 commandes personnalisées',
      'Support communautaire',
    ],
    notIncluded: [
      'Musique HD',
      'Auto-modération avancée',
      'Logs détaillés',
      'Support prioritaire',
    ],
    color: 'slate',
    popular: false,
  },
  {
    name: 'Premium',
    price: '4.99€',
    period: '/mois',
    description: 'Pour les serveurs actifs',
    features: [
      'Toutes les fonctionnalités gratuites',
      'Musique HD illimitée',
      'Auto-modération avancée',
      'Logs détaillés',
      '25 commandes personnalisées',
      'Giveaways avancés',
      'Support prioritaire',
      'Badge Premium',
    ],
    notIncluded: [],
    color: 'indigo',
    popular: true,
  },
  {
    name: 'Entreprise',
    price: '19.99€',
    period: '/mois',
    description: 'Pour les grandes communautés',
    features: [
      'Toutes les fonctionnalités Premium',
      'API personnalisée',
      'Commandes illimitées',
      'Dashboard dédié',
      'Support 24/7',
      'Configuration assistée',
      'Statistiques avancées',
      'Multi-serveurs',
    ],
    notIncluded: [],
    color: 'amber',
    popular: false,
  },
];

const features = [
  { icon: Music, title: 'Musique HD', desc: 'Qualité audio 320kbps' },
  { icon: Shield, title: 'Protection', desc: 'Anti-raid & anti-spam' },
  { icon: Trophy, title: 'Niveaux+', desc: 'Récompenses avancées' },
  { icon: Gift, title: 'Giveaways', desc: 'Concours illimités' },
  { icon: Zap, title: 'Performance', desc: 'Temps de réponse <30ms' },
  { icon: Sparkles, title: 'Custom', desc: 'Personnalisation totale' },
];

export function PremiumPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 text-amber-400 text-sm font-medium mb-4">
          <Crown className="w-4 h-4" />
          Premium
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Débloquez tout le potentiel de NexusBot
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Accédez aux fonctionnalités exclusives et offrez la meilleure expérience à votre communauté.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-6 gap-4">
        {features.map((feature, i) => (
          <div key={i} className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-center">
            <feature.icon className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="font-medium text-white text-sm">{feature.title}</p>
            <p className="text-xs text-slate-400">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Pricing */}
      <div className="grid grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={cn(
              'relative p-8 rounded-3xl transition-all',
              plan.popular
                ? 'bg-gradient-to-b from-indigo-500/20 to-purple-500/20 border-2 border-indigo-500/50 scale-105'
                : 'bg-slate-800/50 border border-slate-700/50'
            )}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold">
                  Plus populaire
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <div className={cn(
                'w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4',
                plan.color === 'slate' && 'bg-slate-700',
                plan.color === 'indigo' && 'bg-gradient-to-br from-indigo-500 to-purple-600',
                plan.color === 'amber' && 'bg-gradient-to-br from-amber-500 to-orange-600',
              )}>
                {plan.color === 'slate' && <Star className="w-8 h-8 text-white" />}
                {plan.color === 'indigo' && <Crown className="w-8 h-8 text-white" />}
                {plan.color === 'amber' && <Sparkles className="w-8 h-8 text-white" />}
              </div>
              <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
              <p className="text-slate-400 text-sm">{plan.description}</p>
            </div>

            <div className="text-center mb-6">
              <span className="text-5xl font-bold text-white">{plan.price}</span>
              <span className="text-slate-400">{plan.period}</span>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, j) => (
                <li key={j} className="flex items-center gap-3 text-sm">
                  <div className={cn(
                    'w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0',
                    plan.color === 'indigo' ? 'bg-indigo-500' : plan.color === 'amber' ? 'bg-amber-500' : 'bg-slate-600'
                  )}>
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-slate-300">{feature}</span>
                </li>
              ))}
              {plan.notIncluded.map((feature, j) => (
                <li key={j} className="flex items-center gap-3 text-sm opacity-40">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-700">
                    <span className="text-slate-500 text-xs">✕</span>
                  </div>
                  <span className="text-slate-500">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={cn(
                'w-full py-3 rounded-xl font-semibold transition-all',
                plan.popular
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90'
                  : plan.color === 'amber'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:opacity-90'
                    : 'bg-slate-700 text-white hover:bg-slate-600'
              )}
            >
              {plan.price === '0€' ? 'Plan actuel' : 'Choisir ce plan'}
            </button>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="p-8 rounded-3xl bg-slate-800/50 border border-slate-700/50">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Questions fréquentes</h2>
        <div className="grid grid-cols-2 gap-6">
          {[
            { q: 'Comment activer Premium ?', a: 'Après le paiement, Premium est activé instantanément sur votre serveur.' },
            { q: 'Puis-je annuler ?', a: 'Oui, vous pouvez annuler à tout moment. Pas de frais cachés.' },
            { q: 'Modes de paiement ?', a: 'Nous acceptons PayPal, cartes de crédit et crypto-monnaies.' },
            { q: 'Multi-serveurs ?', a: 'Le plan Entreprise permet d\'utiliser Premium sur plusieurs serveurs.' },
          ].map((faq, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-900/50">
              <p className="font-medium text-white mb-2">{faq.q}</p>
              <p className="text-sm text-slate-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
