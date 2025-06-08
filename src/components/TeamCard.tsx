import React from 'react';
import { Team } from '../models/Team';
import styles from './TeamCard.module.css';

interface TeamCardProps {
  team: Team;
  onSelect: (team: Team) => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onSelect }) => {
  return (
    <div className={styles.card} onClick={() => onSelect(team)}>
      <div className={styles.cardHeader}>
        <span className={styles.teamIcon}>👥</span>
        <h3 className={styles.teamName}>{team.name}</h3>
      </div>
      <div className={styles.cardBody}>
        <p className={styles.memberCount}>{team.members.length} members</p>
        <p className={styles.createdDate}>
          Created: {new Date(team.createdAt).toLocaleDateString()}
        </p>
      </div>
      <button 
        className={styles.viewButton}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(team);
        }}
      >
        View Details
      </button>
    </div>
  );
};

export default TeamCard;