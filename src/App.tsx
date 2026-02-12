import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { HomePage } from '@/pages/HomePage';
import { DashboardPage } from '@/pages/DashboardPage';
import { ServersPage } from '@/pages/ServersPage';
import { CommandsPage } from '@/pages/CommandsPage';
import { ModerationPage } from '@/pages/ModerationPage';
import { AutoModPage } from '@/pages/AutoModPage';
import { MusicPage } from '@/pages/MusicPage';
import { LevelsPage } from '@/pages/LevelsPage';
import { WelcomePage } from '@/pages/WelcomePage';
import { TicketsPage } from '@/pages/TicketsPage';
import { GiveawaysPage } from '@/pages/GiveawaysPage';
import { LogsPage } from '@/pages/LogsPage';
import { PremiumPage } from '@/pages/PremiumPage';
import { SettingsPage } from '@/pages/SettingsPage';

export function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'dashboard':
        return <DashboardPage />;
      case 'servers':
        return <ServersPage />;
      case 'commands':
        return <CommandsPage />;
      case 'moderation':
        return <ModerationPage />;
      case 'automod':
        return <AutoModPage />;
      case 'music':
        return <MusicPage />;
      case 'levels':
        return <LevelsPage />;
      case 'welcome':
        return <WelcomePage />;
      case 'tickets':
        return <TicketsPage />;
      case 'giveaways':
        return <GiveawaysPage />;
      case 'logs':
        return <LogsPage />;
      case 'premium':
        return <PremiumPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  // Home page is full width without sidebar
  if (currentPage === 'home') {
    return <HomePage setCurrentPage={setCurrentPage} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="ml-64 p-8">
        {renderPage()}
      </main>
    </div>
  );
}
