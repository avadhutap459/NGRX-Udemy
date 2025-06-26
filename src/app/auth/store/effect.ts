import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { AuthService } from '../services/auth.service'
import { authActions } from './action'
import { catchError, map, of, switchMap, tap } from 'rxjs'
import { CurrentUserInterface } from '../../shared/types/currentUser.interface'
import { HttpErrorResponse } from '@angular/common/http'
import { PersistanceService } from '../../shared/services/persistence.service'
import { Router } from '@angular/router'

export const registerEffect= createEffect(
    (
        action$ = inject(Actions),
        authService = inject(AuthService),
        persistanceService = inject(PersistanceService)
    ) =>{
        return action$.pipe(
            ofType(authActions.register),
            switchMap(({request}) => {
                return authService.register(request).pipe(
                    map((currentUser : CurrentUserInterface) =>{
                        persistanceService.set('accessToken',currentUser.token)
                        return authActions.registerSuccess({currentUser})
                    }),
                    catchError((errorResponse : HttpErrorResponse) =>{
                        debugger
                        return of(authActions.registerFailure({
                            errors : errorResponse.error
                        }))
                    })
                )
            })
        )
    },
    {functional:true}
)

export const redirectAfterRegisterEffect = createEffect(
    (action$ = inject(Actions), router = inject(Router)) => {
        return action$.pipe(
            ofType(authActions.registerSuccess),
            tap(() => {
                router.navigateByUrl('/')
            })
        )
    },
    {functional : true, dispatch : false}
)

