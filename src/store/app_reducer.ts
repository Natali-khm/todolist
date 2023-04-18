
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppStateType = {
    status: RequestStatusType
    error: string | null
}

const initialState: AppStateType = {
    status: 'idle',
    error: null
}


export const appReducer = (state: AppStateType = initialState, action: AppStateActionsType): AppStateType => {
    switch (action.type) {

        case 'APP-SET-STATUS':
            return {...state, status: action.status}

        case 'APP-SET-ERROR':
            return {...state, error: action.error}

        default:
            return state       
    }
}


// AC

export const setAppStatus = (status: RequestStatusType) => ({
    type: 'APP-SET-STATUS',
    status
} as const)

export const setAppError = (error: string | null) => ({
    type: 'APP-SET-ERROR',
    error
} as const)


// thunks




// types

type SetAppStatusActionType = ReturnType<typeof setAppStatus>
type SetAppErrorActionType = ReturnType<typeof setAppError>
export type AppStateActionsType = SetAppStatusActionType | SetAppErrorActionType