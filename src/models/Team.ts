import { Member } from './Member';

export interface Team {
  id: number;
  name: string;
  createdAt: string;
  members: Member[];
}

export type { Member };
