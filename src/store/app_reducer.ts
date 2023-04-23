import { setIsLoggedIn } from './auth_reducer';
import { handleServerAppError, handleServerNetworkError } from '../utils/error_utils';
import { authAPI } from './../api/todolist-api';
import { AppThunkType } from "./store"

const initialState: AppStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: 'idle',
    // произошла ли глобальная ошибка
    error: null,
    // инициализация приложения (проверили юзера, получили настройки и т.д.)
    isInitialized: false
}


export const appReducer = (state: AppStateType = initialState, action: AppStateActionsType): AppStateType => {
    switch (action.type) {

        case 'APP/SET-STATUS':
            return {...state, status: action.status}

        case 'APP/SET-ERROR':
            return {...state, error: action.error}

        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}

        default:
            return state       
    }
}


// AC

export const setAppStatus = (status: RequestStatusType) => ({
    type: 'APP/SET-STATUS',
    status
} as const)

export const setAppError = (error: string | null) => ({
    type: 'APP/SET-ERROR',
    error
} as const)

export const setAppInitialized = (value: boolean) => ({
    type: 'APP/SET-IS-INITIALIZED',
    value
} as const)


// thunks

export const initializeApp = (): AppThunkType => (dispatch) => {
    authAPI.me().then(response => {
        if (response.data.resultCode === 0){
            dispatch(setIsLoggedIn(true))
        } else {
            handleServerAppError(response.data, dispatch)
          }
      })
      .catch(error => {
         handleServerNetworkError(error, dispatch) 
      })
      .finally(() => dispatch(setAppInitialized(true))) // приложение будет проинициализировано, даже если мы не залогинены
}


// types

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

type SetAppStatusActionType = ReturnType<typeof setAppStatus>
type SetAppErrorActionType = ReturnType<typeof setAppError>

export type AppStateActionsType = SetAppStatusActionType 
                                | SetAppErrorActionType 
                                | ReturnType<typeof setAppInitialized>