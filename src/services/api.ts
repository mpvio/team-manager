import { Team, Member } from '../models/Team';

const API_URL = 'https://storage.aderize.com/Erik/Test-Works/teams.json';
let mockTeams: Team[] = [];

export const getTeams = async (): Promise<Team[]> => {
  if (mockTeams === undefined || mockTeams.length === 0) {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch teams');
    }
    mockTeams = await response.json();
  }
  return mockTeams;
};

export const updateTeam = async (teamId: number, updatedData: Partial<Team>): Promise<Team> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const existingTeam = mockTeams.find(t => t.id === teamId);
      if (!existingTeam) throw new Error('Team not found');

      const updatedTeam = {
        ...existingTeam,
        ...updatedData,
        members: updatedData.members || existingTeam.members
      };

      mockTeams = mockTeams.map(t => t.id === teamId ? updatedTeam : t);
      
      resolve(updatedTeam);
    }, 500);
  });
};

export const updateMember = async (
  teamId: number,
  memberId: number,
  updatedData: Partial<Member>
): Promise<Team> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const existingTeam = mockTeams.find(t => t.id === teamId);
      if (!existingTeam) throw new Error('Team not found');

      const updatedMembers = existingTeam.members.map(m => 
        m.id === memberId ? { ...m, ...updatedData } : m
      );

      const updatedTeam = {
        ...existingTeam,
        members: updatedMembers
      };

      mockTeams = mockTeams.map(t => t.id === teamId ? updatedTeam : t);
      
      resolve(updatedTeam);
    }, 500);
  });
};