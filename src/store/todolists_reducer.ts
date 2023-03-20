import { v1 } from "uuid";
import { FilterValuesType, TodoListType } from "../AppWithRedux";

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

export type TodoListActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT


export const todolistID1=v1();
export const todolistID2=v1();


const initialState: TodoListType[] = []

// const initialState: TodoListType[] = [
//     {id: todolistID1, title: 'What to learn', filter: 'all'},
//     {id: todolistID2, title: 'What to buy', filter: 'all'},
// ]

export const todoListsReducer = (todoLists: TodoListType[] = initialState, action: TodoListActionType): TodoListType[] => {
    switch (action.type) {

        case 'ADD-TODO-LIST':
            const newTodolistID = action.payload.todoListId;
            return [ {id: newTodolistID, title: action.payload.title, filter: 'all'}, ...todoLists]

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