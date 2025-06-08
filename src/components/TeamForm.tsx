import React, { useState } from 'react';
import { Team } from '../models/Team';
import styles from './TeamForm.module.css';

interface TeamFormProps {
  team: Team;
  onSubmit: (updatedData: Partial<Team>) => void;
  onCancel: () => void;
}

const TeamForm: React.FC<TeamFormProps> = ({ team, onSubmit, onCancel }) => {
  const [name, setName] = useState(team.name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="teamName">Team Name</label>
        <input
          id="teamName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className={styles.buttonGroup}>
        <button type="button" onClick={onCancel} className={styles.cancelButton}>
          Cancel
        </button>
        <button type="submit" className={styles.submitButton}>
          Save
        </button>
      </div>
    </form>
  );
};

export default TeamForm;