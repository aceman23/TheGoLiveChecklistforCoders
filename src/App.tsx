import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { GoLiveChecklist } from './components/GoLiveChecklist';
import { LocalSEOChecklist } from './components/LocalSEOChecklist';
import { ArrowLeft } from 'lucide-react';

type View = 'landing' | 'go-live' | 'local-seo';

function App() {
  const [currentView, setCurrentView] = useState<View>('landing');

  if (currentView === 'landing') {
    return (
      <LandingPage
        onGetStarted={() => setCurrentView('go-live')}
        onLocalSEO={() => setCurrentView('local-seo')}
      />
    );
  }

  return (
    <div>
      <button
        onClick={() => setCurrentView('landing')}
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-xl text-slate-700 font-medium rounded-lg border border-slate-300 hover:bg-white hover:shadow-md transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Back to Home</span>
      </button>
      {currentView === 'go-live' && <GoLiveChecklist />}
      {currentView === 'local-seo' && <LocalSEOChecklist />}
    </div>
  );
}

export default App;
