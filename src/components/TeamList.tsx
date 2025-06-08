import React, { useState, useEffect } from 'react';
import { useTeams } from '../context/TeamContext';
import TeamCard from '../components/TeamCard';
import styles from './TeamList.module.css';
import { Team } from '../models/Team';

const TeamList: React.FC<{ onSelectTeam: (team: Team) => void }> = ({ onSelectTeam }) => {
  const { teams, error, fetchTeams } = useTeams();
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(filter.toLowerCase())
  );

  // if (loading) return <div className={styles.loading}>Loading teams...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Filter teams by name"
        className={styles.filterInput}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className={styles.teamGrid}>
        {filteredTeams.map(team => (
          <TeamCard key={team.id} team={team} onSelect={onSelectTeam} />
        ))}
      </div>
    </div>
  );
};

export default TeamList;