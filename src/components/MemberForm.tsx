import React, { useState } from 'react';
import { Member } from '../models/Team';
import styles from '../styles/MemberForm.module.css';

interface MemberFormProps {
  member: Member;
  onSubmit: (updatedData: Partial<Member>) => void;
  onCancel: () => void;
}

const MemberForm: React.FC<MemberFormProps> = ({ member, onSubmit, onCancel }) => {
  const [name, setName] = useState(member.name);
  const [role, setRole] = useState(member.role);
  const [email, setEmail] = useState(member.email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, role, email });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="memberName">Name</label>
        <input
          id="memberName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="memberRole">Role</label>
        <input
          id="memberRole"
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="memberEmail">Email</label>
        <input
          id="memberEmail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

export default MemberForm;