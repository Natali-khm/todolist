import { Dispatch } from "redux"
import { ResponseType } from "../api/todolist-api"
import { AppStateActionsType, setAppError, setAppStatus } from "../store/app_reducer"

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<AppStateActionsType>) => {
    
  if (data.messages.length) {
    dispatch(setAppError(data.messages[0]))
  } else {
    dispatch(setAppError("Some error has occurred"))
  }
  dispatch(setAppStatus("failed"))
}

export const handleServerNetworkError = (error: any, dispatch: Dispatch<AppStateActionsType>) => {
    dispatch(setAppError(error.response.data.message || error.message || 'Some error has occurred'))
    dispatch(setAppStatus('failed'))            
}