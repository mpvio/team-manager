import { createContext, useContext, useState, ReactNode } from 'react';
import { Team, Member } from '../models/Team';
import { getTeams, updateTeam, updateMember } from '../services/api';

type TeamContextType = {
  teams: Team[];
  selectedTeam: Team | null;
  loading: boolean;
  error: string | null;
  fetchTeams: () => Promise<void>;
  setSelectedTeam: (team: Team | null) => void;
  handleUpdateTeam: (teamId: number, updatedData: Partial<Team>) => Promise<void>;
  handleUpdateMember: (teamId: number, memberId: number, updatedData: Partial<Member>) => Promise<void>;
};

const TeamContext = createContext<TeamContextType | undefined>(undefined);

type TeamProviderProps = {
  children: ReactNode;
};

export const TeamProvider = ({ children }: TeamProviderProps) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const data = await getTeams();
      setTeams(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch teams');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTeam = async (teamId: number, updatedData: Partial<Team>) => {
    setLoading(true);
    try {
      const updatedTeam = await updateTeam(teamId, updatedData);
      setTeams(teams.map(team => 
        team.id === teamId ? { ...team, ...updatedTeam } : team
      ));
      if (selectedTeam && selectedTeam.id === teamId) {
        setSelectedTeam({ ...selectedTeam, ...updatedTeam });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update team');
    }
  };

  const handleUpdateMember = async (teamId: number, memberId: number, updatedData: Partial<Member>) => {
    try {
      const updatedTeam = await updateMember(teamId, memberId, updatedData);
      setTeams(teams.map(team => 
        team.id === teamId ? updatedTeam : team
      ));
      if (selectedTeam && selectedTeam.id === teamId) {
        setSelectedTeam(updatedTeam);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update member');
    }
  };

  return (
    <TeamContext.Provider
      value={{
        teams,
        selectedTeam,
        loading,
        error,
        fetchTeams,
        setSelectedTeam,
        handleUpdateTeam,
        handleUpdateMember
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeams = () => {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error('useTeams must be used within a TeamProvider');
  }
  return context;
};