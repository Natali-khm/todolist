import { todoListsReducer } from './todolists_reducer';
import { combineReducers } from "redux";
import { legacy_createStore as createStore} from 'redux'
import { tasksStateReducer } from "./tasksState_reducer";


const rootReducer = combineReducers({
    tasks: tasksStateReducer,
    todoLists: todoListsReducer
})

export const store = createStore(rootReducer)

export type RootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store

console.log(store);
