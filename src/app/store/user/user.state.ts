import { User } from '../../models/User';

export interface UserState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null,
};
