import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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

export const TeamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTeams = useCallback(async () => {
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
  }, []);

  const handleUpdateTeam = useCallback(async (teamId: number, updatedData: Partial<Team>) => {
    setLoading(true);
    try {
      setTeams(prevTeams => 
        prevTeams.map(team => 
          team.id === teamId ? { ...team, ...updatedData } : team
        )
      );

      if (selectedTeam?.id === teamId) {
        setSelectedTeam(prev => ({ ...prev!, ...updatedData }));
      }

      const updatedTeam = await updateTeam(teamId, updatedData);

      setTeams(prevTeams => 
        prevTeams.map(team => 
          team.id === teamId ? updatedTeam : team
        )
      );

      if (selectedTeam?.id === teamId) {
        setSelectedTeam(updatedTeam);
      }
    } catch (err) {
      setTeams(prevTeams => [...prevTeams]);
      if (selectedTeam?.id === teamId) {
        setSelectedTeam(prev => ({ ...prev! }));
      }
      setError(err instanceof Error ? err.message : 'Failed to update team');
    } finally {
      setLoading(false);
    }
  }, [selectedTeam]);

  const handleUpdateMember = useCallback(async (
    teamId: number,
    memberId: number,
    updatedData: Partial<Member>
  ) => {
    setLoading(true);
    try {
      setTeams(prevTeams => 
        prevTeams.map(team => {
          if (team.id !== teamId) return team;
          return {
            ...team,
            members: team.members.map(member => 
              member.id === memberId ? { ...member, ...updatedData } : member
            )
          };
        })
      );

      if (selectedTeam?.id === teamId) {
        setSelectedTeam(prev => ({
          ...prev!,
          members: prev!.members.map(member => 
            member.id === memberId ? { ...member, ...updatedData } : member
          )
        }));
      }

      const updatedTeam = await updateMember(teamId, memberId, updatedData);

      setTeams(prevTeams => 
        prevTeams.map(team => 
          team.id === teamId ? updatedTeam : team
        )
      );

      if (selectedTeam?.id === teamId) {
        setSelectedTeam(updatedTeam);
      }
    } catch (err) {
      setTeams(prevTeams => [...prevTeams]);
      if (selectedTeam?.id === teamId) {
        setSelectedTeam(prev => ({ ...prev! }));
      }
      setError(err instanceof Error ? err.message : 'Failed to update member');
    } finally {
      setLoading(false);
    }
  }, [selectedTeam]);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const contextValue = React.useMemo(() => ({
    teams,
    selectedTeam,
    loading,
    error,
    fetchTeams,
    setSelectedTeam,
    handleUpdateTeam,
    handleUpdateMember
  }), [
    teams, 
    selectedTeam, 
    loading, 
    error, 
    fetchTeams, 
    handleUpdateTeam, 
    handleUpdateMember
  ]);

  return (
    <TeamContext.Provider value={contextValue}>
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