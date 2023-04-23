import { handleServerAppError, handleServerNetworkError } from '../utils/error_utils';
import { authAPI } from '../api/todolist-api';
import { setAppStatus } from "./app_reducer"
import { AppThunkType } from "./store"

const initialState = {
    isLoggedIn: false as boolean
}

export const loginReducer = (state: LoginStateType = initialState, action: LoginActionsType): LoginStateType => {
    switch (action.type) {

        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}

        default:
            return state       
    }
}


// AC

export const setIsLoggedIn = (value: boolean) => ({
    type: 'login/SET-IS-LOGGED-IN',
    value
} as const)



// thunks

export const login = (data: LoginParamsType): AppThunkType => (dispatch) => {  // срабатывает в onSubmit
    dispatch(setAppStatus('loading'))
    authAPI.login(data)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setIsLoggedIn(true))          
                    dispatch(setAppStatus('succeeded'))    
                } else {
                    handleServerAppError(response.data, dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })           
}

export const logout = (): AppThunkType => (dispatch) => {
    dispatch(setAppStatus('loading'))
    authAPI.logout()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setIsLoggedIn(false))          
                    dispatch(setAppStatus('succeeded'))    
                } else {
                    handleServerAppError(response.data, dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })           
}



// types

type LoginStateType = typeof initialState

export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}

export type LoginActionsType = ReturnType<typeof setIsLoggedIn>
