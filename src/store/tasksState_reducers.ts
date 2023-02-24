import { v1 } from "uuid";
import { TasksStateType } from "../App";
import { AddTodoListAT, RemoveTodoListAT } from "./todolists_reducers";

type AddTaskAT = {
    type: 'ADD-TASK'
    payload: {
        todolistId: string
        title: string
    }
}

type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    payload: {
        todolistId: string
        taskId: string
    }
}

type ChangeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    payload: {
        todolistId: string
        taskId: string
        newTitle: string
    }
}

type ChangeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS'
    payload: {
        todolistId: string
        taskId: string
        isDone: boolean
    }
}

type TaskActionType = AddTaskAT | RemoveTaskAT | ChangeTaskTitleAT | ChangeTaskStatusAT | AddTodoListAT | RemoveTodoListAT

export const tasksStateReducer = (tasksState: TasksStateType, action: TaskActionType): TasksStateType => { 
    switch (action.type) {
        case 'ADD-TASK':
            {   
                const todoListId = action.payload.todolistId
                const newTask = {id: v1(), title: action.payload.title, isDone: false}

                return {...tasksState,
                        [todoListId]: [...tasksState[todoListId], newTask]}
            } 

        case 'REMOVE-TASK': 
            { 
                const todoListId = action.payload.todolistId
                const taskId = action.payload.taskId

                return {...tasksState,
                    [todoListId]: tasksState[todoListId].filter(t => t.id !== taskId)
                }
            }

        case 'CHANGE-TASK-TITLE': 
            { 
                const todoListId = action.payload.todolistId
                const taskId = action.payload.taskId
                const newTaskTitle = action.payload.newTitle

                return {...tasksState,
                        [todoListId]: tasksState[todoListId].map(t => t.id === taskId ? {...t, title: newTaskTitle} : t)
                    }
            }

        case 'CHANGE-TASK-STATUS': 
            { 
                const todoListId = action.payload.todolistId
                const taskId = action.payload.taskId
                const newTaskStatus = action.payload.isDone
                
                return {...tasksState,
                        [todoListId]: tasksState[todoListId].map(t => t.id === taskId ? {...t, isDone: newTaskStatus} : t)
                    }
            }

        case 'ADD-TODO-LIST': 
            {             
                const newTodolistID = action.payload.todoListId;
                return {...tasksState,
                        [newTodolistID]: []
                    }
            }

        case 'REMOVE-TODO-LIST': 
            {             
                const todoListId = action.payload.todoListId;
                delete tasksState[todoListId]
                return tasksState
            }
            
        default: return tasksState 
    }
}

export const AddTaskAC = (todolistId: string, title: string): AddTaskAT => ({
    type: 'ADD-TASK',
    payload: {
        todolistId,
        title
    }
})

export const RemoveTaskAC = (todolistId: string, taskId: string): RemoveTaskAT => ({
    type: 'REMOVE-TASK',
    payload: {
        todolistId,
        taskId
    }
})

export const ChangeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string): ChangeTaskTitleAT => ({
    type: 'CHANGE-TASK-TITLE',
    payload: {
        todolistId,
        taskId,
        newTitle
    }
})

export const ChangeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): ChangeTaskStatusAT => ({
    type: 'CHANGE-TASK-STATUS',
    payload: {
        todolistId,
        taskId,
        isDone
    }
})