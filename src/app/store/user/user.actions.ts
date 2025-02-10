import { createAction, props } from '@ngrx/store';
import { User } from '../../models/User';

export const loadUserRequest = createAction('[User] Load User Request', props<{ userId: string }>());
export const loadUserSuccess = createAction('[User] Load User Success', props<{ user: User }>());
export const loadUserFailure = createAction('[User] Load User Failure', props<{ error: string }>());

export const updateUserRequest = createAction('[User] Update User Request', props<{ userId: string, updatedUserData: Partial<User> }>());
export const updateUserSuccess = createAction('[User] Update User Success', props<{ user: User }>());
export const updateUserFailure = createAction('[User] Update User Failure', props<{ error: string }>());

export const deleteUserRequest = createAction('[User] Delete User Request',  props<{ userId: string }>() // Expect userId in the action
);
export const deleteUserSuccess = createAction('[User] Delete User Success');
export const deleteUserFailure = createAction('[User] Delete User Failure', props<{ error: string }>());

export const resetUpdateSuccess = createAction('[User] Reset Update Success');
