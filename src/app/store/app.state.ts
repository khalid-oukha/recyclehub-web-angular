// store/app.state.ts
import { UserState } from './user/user.state'; // Import your user state

export interface AppState {
  user: UserState; // Add other feature states here if needed
}
