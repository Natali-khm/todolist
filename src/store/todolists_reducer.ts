import { todoListAPI, TodoListResponseType } from "../api/todolist-api";
import { handleServerAppError, handleServerNetworkError } from "../utils/error_utils";
import { setAppError, setAppStatus, RequestStatusType } from "./app_reducer";
import { AppThunkType } from "./store"


const initialState: TodoListsDomainType[] = []


export const todoListsReducer = (todoLists: TodoListsDomainType[] = initialState, action: TodoListActionType): TodoListsDomainType[] => {
    switch (action.type) {

        case 'ADD-TODO-LIST':
            const newTodoList: TodoListsDomainType = {...action.payload.todoList, filter: 'all', todoListEntityStatus: 'idle'}
            return [ newTodoList, ...todoLists]

        case 'REMOVE-TODO-LIST':
            return todoLists.filter(tl => tl.id !== action.payload.todoListId)

        case 'CHANGE-TODO-LIST-TITLE':
            return todoLists.map(tl => tl.id === action.payload.todoListId ? {...tl, title: action.payload.newTitle} : tl)

        case 'CHANGE-TODO-LIST-FILTER':
            return todoLists.map(tl => tl.id === action.payload.todoListId ? {...tl, filter: action.payload.filterValue} : tl)

        case 'SET-TODO-LIST-ENTITY-STATUS':
            return todoLists.map(tl => tl.id === action.payload.todoListId ? {...tl, todoListEntityStatus: action.payload.status} : tl)

        case 'SET-TODOLISTS':
            return action.payload.todoLists.map(tl => ({...tl, filter: 'all', todoListEntityStatus: 'idle'}))

        default:
            return todoLists       
    }
}


// AC

export const addTodoListAC = (todoList: TodoListResponseType) => ({
    type: 'ADD-TODO-LIST',
    payload: {
        todoList
    }
} as const)

export const removeTodoListAC = (todoListId: string) => ({
    type: 'REMOVE-TODO-LIST',
    payload: {
        todoListId
    }
} as const)

export const changeTodoListTitleAC = (id: string, newTitle: string) => ({
    type: 'CHANGE-TODO-LIST-TITLE',
    payload: {
        todoListId: id,
        newTitle
    }
} as const)

export const changeTodoListFilterAC = (todoListId: string, filterValue: FilterValuesType) => ({
    type: 'CHANGE-TODO-LIST-FILTER',
    payload: {
        todoListId,
        filterValue: filterValue
    }
} as const)

export const setTodoListEntityStatusAC = (todoListId: string, status: RequestStatusType) => ({
    type: 'SET-TODO-LIST-ENTITY-STATUS',
    payload: {
        todoListId,
        status
    }
} as const)

export const setTodoListsAC = (todoLists: TodoListResponseType[]) => ({
    type: 'SET-TODOLISTS',
    payload: {
        todoLists
    }
} as const)


// thunks

export const fetchTodoLists = (): AppThunkType => (dispatch) => {    
    dispatch(setAppStatus('loading'))    
    todoListAPI
      .getTodoList()
      .then((response) => {
          dispatch(setTodoListsAC(response.data))
          dispatch(setAppStatus('succeeded'))
      })
}

export const addTodoListTC = (title: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatus('loading'))    
    todoListAPI
      .createTodoList(title)
      .then((response) => {
          if (response.data.resultCode === 0){
            dispatch(addTodoListAC(response.data.data.item))
            dispatch(setAppStatus('succeeded'))    
          } else {
            handleServerAppError(response.data, dispatch)
          }
      })
      .catch(error => {
         handleServerNetworkError(error, dispatch) 
      })
}

export const removeTodoListTC = (todoListId: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatus('loading'))
    dispatch(setTodoListEntityStatusAC(todoListId, 'loading'))
    todoListAPI
      .deleteTodoList(todoListId)
      .then((response) => {
          if (response.data.resultCode === 0) {
              dispatch(removeTodoListAC(todoListId));
              dispatch(setAppStatus("succeeded"));
          } else {
            handleServerAppError(response.data, dispatch);
            dispatch(setTodoListEntityStatusAC(todoListId, "failed"));
          }
      })
      .catch(error => {
          handleServerNetworkError(error, dispatch)
          dispatch(setTodoListEntityStatusAC(todoListId, 'failed'))
      })
    }

export const changeTodoListTitleTC = (todoListId: string, newTitle: string): AppThunkType => (dispatch) => { 
    dispatch(setAppStatus('loading'))
    todoListAPI
      .updateTodoList(todoListId, newTitle)
      .then((response) => {
          dispatch(changeTodoListTitleAC(todoListId, newTitle))
          dispatch(setAppStatus('succeeded'))
      })
}


// types

export type AddTodoListAT = ReturnType<typeof addTodoListAC>
export type RemoveTodoListAT = ReturnType<typeof removeTodoListAC>
export type SetoTodoListsAT = ReturnType<typeof setTodoListsAC>

export type TodoListActionType =  AddTodoListAT 
                                | RemoveTodoListAT
                                | SetoTodoListsAT
                                | ReturnType<typeof changeTodoListTitleAC>
                                | ReturnType<typeof changeTodoListFilterAC>
                                | ReturnType<typeof setTodoListEntityStatusAC>


export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodoListsDomainType = TodoListResponseType & {
    filter: FilterValuesType
    todoListEntityStatus: RequestStatusType
}