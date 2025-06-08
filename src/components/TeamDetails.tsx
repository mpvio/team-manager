import React, { useState } from 'react';
import { Team, Member } from '../models/Team';
import { useTeams } from '../context/TeamContext';
import TeamForm from '../components/TeamForm';
import MemberForm from '../components/MemberForm';
import styles from './TeamDetails.module.css';

interface TeamDetailsProps {
  team: Team;
  onBack: () => void;
}

const TeamDetails: React.FC<TeamDetailsProps> = ({ team, onBack }) => {
  const { handleUpdateTeam, handleUpdateMember } = useTeams();
  const [editTeamOpen, setEditTeamOpen] = useState(false);
  const [editMember, setEditMember] = useState<Member | null>(null);

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={onBack}>
        ← Back to Teams
      </button>

      <div className={styles.header}>
        <h1 className={styles.teamName}>{team.name}</h1>
        <button 
          className={styles.editButton}
          onClick={() => setEditTeamOpen(true)}
        >
          Edit Team
        </button>
      </div>

      <p className={styles.createdDate}>
        Created: {new Date(team.createdAt).toLocaleDateString()}
      </p>

      <h2 className={styles.membersTitle}>
        Members ({team.members.length})
      </h2>

      <div className={styles.membersTable}>
        <div className={styles.tableHeader}>
          <div className={styles.headerCell}>Name</div>
          <div className={styles.headerCell}>Role</div>
          <div className={styles.headerCell}>Email</div>
          <div className={styles.headerCell}>Actions</div>
        </div>
        {team.members.map(member => (
          <div key={member.id} className={styles.tableRow}>
            <div className={styles.tableCell}>{member.name}</div>
            <div className={styles.tableCell}>{member.role}</div>
            <div className={styles.tableCell}>{member.email}</div>
            <div className={styles.tableCell}>
              <button 
                className={styles.editMemberButton}
                onClick={() => setEditMember(member)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {editTeamOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Edit Team</h2>
            <TeamForm
              team={team}
              onSubmit={(updatedData) => {
                handleUpdateTeam(team.id, updatedData);
                setEditTeamOpen(false);
              }}
              onCancel={() => setEditTeamOpen(false)}
            />
          </div>
        </div>
      )}

      {editMember && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Edit Member</h2>
            <MemberForm
              member={editMember}
              onSubmit={(updatedData) => {
                handleUpdateMember(team.id, editMember.id, updatedData);
                setEditMember(null);
              }}
              onCancel={() => setEditMember(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDetails;