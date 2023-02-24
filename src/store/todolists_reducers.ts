import { v1 } from "uuid";
import { FilterValuesType, TodoListType } from "../App";

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

type TodoListActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todoListsReducer = (todoLists: TodoListType[], action: TodoListActionType): TodoListType[] => {
    switch (action.type) {

        case 'ADD-TODO-LIST':
            const newTodolistID = action.payload.todoListId;
            return [...todoLists, {id: newTodolistID, title: action.payload.title, filter: 'all'}]

        case 'REMOVE-TODO-LIST':
            return todoLists.filter(tl => tl.id !== action.payload.todoListId)

        case 'CHANGE-TODO-LIST-TITLE':
            return todoLists.map(tl => tl.id === action.payload.todoListId ? {...tl, title: action.payload.newTitle} : tl)

        case 'CHANGE-TODO-LIST-FILTER':
            return todoLists.map(tl => tl.id === action.payload.todoListId ? {...tl, filter: action.payload.filterValue} : tl)

        default:
            return todoLists       
    }
}


export const AddTodoListAC = (todoListId: string, title: string): AddTodoListAT => ({
    type: 'ADD-TODO-LIST',
    payload: {
        todoListId,
        title
    }
})

export const RemoveTodoListAC = (todoListId: string): RemoveTodoListAT => ({
    type: 'REMOVE-TODO-LIST',
    payload: {
        todoListId
    }
})

export const ChangeTodoListTitleAC = (id: string, newTitle: string): ChangeTodoListTitleAT => ({
    type: 'CHANGE-TODO-LIST-TITLE',
    payload: {
        todoListId: id,
        newTitle
    }
})

export const ChangeTodoListFilterAC = (todoListId: string, filterValue: FilterValuesType): ChangeTodoListFilterAT => ({
    type: 'CHANGE-TODO-LIST-FILTER',
    payload: {
        todoListId,
        filterValue: filterValue
    }
})