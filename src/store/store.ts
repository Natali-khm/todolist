import { TodoListActionType, todoListsReducer } from './todolists_reducer';
import { applyMiddleware, combineReducers } from "redux";
import { legacy_createStore as createStore} from 'redux'
import { TaskActionType, tasksStateReducer } from "./tasksState_reducer";
import thunk, { ThunkDispatch } from "redux-thunk";
import { ThunkAction } from 'redux-thunk'
import { appReducer, AppStateActionsType } from './app_reducer';


const rootReducer = combineReducers({
    tasks: tasksStateReducer,
    todoLists: todoListsReducer,
    app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))


// types

export type RootStateType = ReturnType<typeof rootReducer>

export type AppActionsType = TodoListActionType | TaskActionType | AppStateActionsType

export type AppDispatchType = ThunkDispatch<RootStateType, unknown, AppActionsType>

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, AppActionsType>


// @ts-ignore

window.store = store

console.log(store);
