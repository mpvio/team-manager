import React, { useState, useEffect } from 'react';
import { Team, Member } from '../models/Team';
import { useTeams } from '../context/TeamContext';
import TeamForm from './TeamForm';
import MemberForm from './MemberForm';
import styles from '../styles/TeamDetails.module.css';

interface TeamDetailsProps {
  team: Team;
  onBack: () => void;
}

const TeamDetails: React.FC<TeamDetailsProps> = ({ team, onBack }) => {
  const { handleUpdateTeam, handleUpdateMember } = useTeams();
  const [editTeamOpen, setEditTeamOpen] = useState(false);
  const [editMember, setEditMember] = useState<Member | null>(null);
  const [currentTeam, setCurrentTeam] = useState<Team>(team);

  useEffect(() => {
    setCurrentTeam(team);
  }, [team]);

  const handleTeamUpdate = async (updatedData: Partial<Team>) => {
    try {
      setCurrentTeam(prev => ({ ...prev, ...updatedData }));
      
      await handleUpdateTeam(team.id, updatedData);
    } catch (error) {
      setCurrentTeam(team);
    }
  };

  const handleMemberUpdate = async (memberId: number, updatedData: Partial<Member>) => {
    try {
      setCurrentTeam(prev => ({
        ...prev,
        members: prev.members.map(member => 
          member.id === memberId ? { ...member, ...updatedData } : member
        )
      }));

      await handleUpdateMember(team.id, memberId, updatedData);
    } catch (error) {
      setCurrentTeam(team);
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={onBack}>
        ← Back to Teams
      </button>

      <div className={styles.header}>
        <h1 className={styles.teamName}>{currentTeam.name}</h1>
        <button 
          className={styles.editButton}
          onClick={() => setEditTeamOpen(true)}
        >
          Edit Team
        </button>
      </div>

      <p className={styles.createdDate}>
        Created: {new Date(currentTeam.createdAt).toLocaleDateString()}
      </p>

      <h2 className={styles.membersTitle}>
        Members ({currentTeam.members.length})
      </h2>

      <div className={styles.membersTable}>
        <div className={styles.tableHeader}>
          <div className={styles.headerCell}>Name</div>
          <div className={styles.headerCell}>Role</div>
          <div className={styles.headerCell}>Email</div>
          <div className={styles.headerCell}>Actions</div>
        </div>
        {currentTeam.members.map(member => (
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
              team={currentTeam}
              onSubmit={async (updatedData) => {
                await handleTeamUpdate(updatedData);
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
              onSubmit={async (updatedData) => {
                await handleMemberUpdate(editMember.id, updatedData);
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