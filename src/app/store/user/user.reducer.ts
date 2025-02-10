import { createReducer, on } from '@ngrx/store';
import { UserState, initialState } from './user.state';
import * as UserActions from './user.actions';

export const userReducer = createReducer(
  initialState,

  on(UserActions.loadUserRequest, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(UserActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    currentUser: user,
    loading: false,
  })),

  on(UserActions.loadUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(UserActions.updateUserRequest, (state) => ({
    ...state,
    loading: true,
    error: null,
    updateSuccess: false

  })),

  on(UserActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    currentUser: user,
    loading: false,
  })),

  on(UserActions.updateUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
    updateSuccess: false
  })),

  on(UserActions.resetUpdateSuccess, (state) => ({
    ...state,
    updateSuccess: false
  })),

  on(UserActions.deleteUserRequest, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(UserActions.deleteUserSuccess, (state) => ({
    ...state,
    currentUser: null,
    loading: false,
  })),

  on(UserActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
);
