import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as UserActions from './user.actions';
import { Router } from '@angular/router';
import {UserService} from "../../core/services/user.service";

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) {}

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserRequest),
      mergeMap((action) =>
        this.userService.getUserById(action.userId).pipe(
          map((user) => UserActions.loadUserSuccess({ user })),
          catchError((error) => of(UserActions.loadUserFailure({ error: error.message })))
        )
      )
    )
  );

  // Update User Effect
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUserRequest),
      mergeMap((action) =>
        this.userService.updateUser(action.userId, action.updatedUserData).pipe(
          map((user) => UserActions.updateUserSuccess({ user })),
          catchError((error) => of(UserActions.updateUserFailure({ error: error.message })))
        )
      )
    )
  );

  // Delete User Effect
  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUserRequest),
      mergeMap((action) =>
        this.userService.deleteAccount(action.userId).pipe( // Pass userId here
          map(() => UserActions.deleteUserSuccess()),
          tap(() => this.router.navigate(['/'])), // Navigate to home after deletion
          catchError((error) => of(UserActions.deleteUserFailure({ error: error.message })))
        )
      )
    )
  );

}
