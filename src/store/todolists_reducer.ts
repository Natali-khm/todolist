import { Dispatch } from "redux";
import { v1 } from "uuid";
import { todoListAPI, TodoListResponseType } from "../api/todolist-api";
import {  } from "../AppWithRedux";
import { AppThunkType } from "./store";

//  Action Types

export type RemoveTodoListAT = {
    type: 'REMOVE-TODO-LIST',
    payload: {
        todoListId: string
    }
}

export type AddTodoListAT = {
    type: 'ADD-TODO-LIST',
    payload: {
        todoList: TodoListResponseType
    }
}

export type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODO-LIST-TITLE',
    payload: {
        todoListId: string
        newTitle: string
    }
}

export type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODO-LIST-FILTER',
    payload: {
        todoListId: string
        filterValue: FilterValuesType
    }
}

export type SetoTodoListsAT = {
    type: 'SET-TODOLISTS',
    payload: {
        todoLists: TodoListResponseType[]
    }
}

export type TodoListActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT | SetoTodoListsAT

// TL Types

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodoListsDomainType = TodoListResponseType & {
    filter: FilterValuesType
}

const initialState: TodoListsDomainType[] = []



export const todoListsReducer = (todoLists: TodoListsDomainType[] = initialState, action: TodoListActionType): TodoListsDomainType[] => {
    switch (action.type) {

        case 'ADD-TODO-LIST':
            const newTodoList: TodoListsDomainType = {...action.payload.todoList, filter: 'all'}
            return [ newTodoList, ...todoLists]

        case 'REMOVE-TODO-LIST':
            return todoLists.filter(tl => tl.id !== action.payload.todoListId)

        case 'CHANGE-TODO-LIST-TITLE':
            return todoLists.map(tl => tl.id === action.payload.todoListId ? {...tl, title: action.payload.newTitle} : tl)

        case 'CHANGE-TODO-LIST-FILTER':
            return todoLists.map(tl => tl.id === action.payload.todoListId ? {...tl, filter: action.payload.filterValue} : tl)

        case 'SET-TODOLISTS':
            return action.payload.todoLists.map(tl => ({...tl, filter: 'all'}))

        default:
            return todoLists       
    }
}


export const addTodoListAC = (todoList: TodoListResponseType): AddTodoListAT => ({
    type: 'ADD-TODO-LIST',
    payload: {
        todoList
    }
})

export const removeTodoListAC = (todoListId: string): RemoveTodoListAT => ({
    type: 'REMOVE-TODO-LIST',
    payload: {
        todoListId
    }
})

export const changeTodoListTitleAC = (id: string, newTitle: string): ChangeTodoListTitleAT => ({
    type: 'CHANGE-TODO-LIST-TITLE',
    payload: {
        todoListId: id,
        newTitle
    }
})

export const changeTodoListFilterAC = (todoListId: string, filterValue: FilterValuesType): ChangeTodoListFilterAT => ({
    type: 'CHANGE-TODO-LIST-FILTER',
    payload: {
        todoListId,
        filterValue: filterValue
    }
})

export const setTodoListsAC = (todoLists: TodoListResponseType[]): SetoTodoListsAT => ({
    type: 'SET-TODOLISTS',
    payload: {
        todoLists
    }
})


// THUNKS

export const fetchTodoLists = (): AppThunkType => (dispatch) => {        
    todoListAPI
      .getTodoList()
      .then((response) => dispatch(setTodoListsAC(response.data)));
}

export const addTodoListTC = (title: string): AppThunkType => (dispatch) => {        
    todoListAPI
      .createTodoList(title)
      .then((response) => dispatch(addTodoListAC(response.data.data.item)));
}

export const removeTodoListTC = (todoListId: string): AppThunkType => (dispatch) => {        
    todoListAPI
      .deleteTodoList(todoListId)
      .then((response) => dispatch(removeTodoListAC(todoListId)));
}

export const changeTodoListTitleTC = (todoListId: string, newTitle: string): AppThunkType => (dispatch) => {        
    todoListAPI
      .updateTodoList(todoListId, newTitle)
      .then((response) => dispatch(changeTodoListTitleAC(todoListId, newTitle)));
}
