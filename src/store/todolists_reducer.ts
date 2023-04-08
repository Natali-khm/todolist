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
        todoListId: string
        title: string
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
            const newTodolistID = action.payload.todoListId;
            return [ {id: newTodolistID, 
                      title: action.payload.title, 
                      filter: 'all',
                      addedDate: '',
                      order: 0
                     }
                     , ...todoLists]

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


export const addTodoListAC = (title: string): AddTodoListAT => ({
    type: 'ADD-TODO-LIST',
    payload: {
        todoListId: v1(),
        title
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


export const fetchTodoLists = (): AppThunkType => {
  return (dispatch) => {        

    todoListAPI
      .getTodoList()
      .then((response) => dispatch(setTodoListsAC(response.data)));
  };
};
