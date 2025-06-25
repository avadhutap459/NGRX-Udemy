import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { RegisterRequestInterface } from "../types/RegisterRequest.interface";
import { CurrentUserInterface } from "../../shared/types/currentUser.interface";
import { BackendErrorsInterface } from "../../shared/types/backendErrors.interface";
import { LoginRequestInterface } from "../types/loginRequest.interface";


export const authActions = createActionGroup({
    source: 'auth',
    events: {
        register: props<{ request: RegisterRequestInterface }>(),
        'Register success': props<{ currentUser: CurrentUserInterface }>(),
        'Register failure' : props<{errors : BackendErrorsInterface}>(),

         login: props<{ request: LoginRequestInterface }>(),
        'Login success': props<{ currentUser: CurrentUserInterface }>(),
        'Login failure' : props<{errors : BackendErrorsInterface}>(),
    },
})

//export const register = createAction('[Auth] Register', props<{ request: RegisterRequestInterface }>());

//export const registerSuccess = createAction('[Auth] Register Success', props<{ request: RegisterRequestInterface }>());

//export const registerFailure = createAction('[Auth] RegisterFailure', props<{ request: RegisterRequestInterface }>());