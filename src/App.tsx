import React, { useState } from 'react';
import { TeamProvider } from './context/TeamContext';
import Sidebar from './components/Sidebar';
import TeamList from './components/TeamList';
import TeamDetails from './components/TeamDetails';
import { Team } from './models/Team';
import styles from './App.module.css';

const App: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  return (
    <TeamProvider>
      <div className={styles.app}>
        <header className={styles.header}>
          <h1>Team Management</h1>
        </header>
        <div className={styles.mainContainer}>
          <Sidebar />
          <main className={styles.contentArea}>
            {selectedTeam ? (
              <TeamDetails 
                team={selectedTeam} 
                onBack={() => setSelectedTeam(null)} 
              />
            ) : (
              <TeamList onSelectTeam={setSelectedTeam} />
            )}
          </main>
        </div>
      </div>
    </TeamProvider>
  );
};

export default App;