import { TodoListActionType, todoListsReducer } from './todolists_reducer';
import { AnyAction, applyMiddleware, combineReducers } from "redux";
import { legacy_createStore as createStore} from 'redux'
import { TaskActionType, tasksStateReducer } from "./tasksState_reducer";
import thunk, { ThunkDispatch } from "redux-thunk";
import { ThunkAction } from 'redux-thunk'


const rootReducer = combineReducers({
    tasks: tasksStateReducer,
    todoLists: todoListsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootStateType = ReturnType<typeof rootReducer>

export type AppActionsType = TodoListActionType | TaskActionType

export type AppDispatch = ThunkDispatch<RootStateType, unknown, AppActionsType>

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store

console.log(store);
