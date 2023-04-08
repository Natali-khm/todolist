import { v1 } from "uuid";
import { TakStatuses, TaskPriorities, TaskResponseType, todoListAPI } from "../api/todolist-api";
import { AppThunkType } from "./store";
import { AddTodoListAT, RemoveTodoListAT, SetoTodoListsAT } from "./todolists_reducer";

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
        status: TakStatuses
    }
}

type SetTaskAT = {
    type: 'SET-TASKS'
    payload: {
        tasks: TaskResponseType[]
        todoListId: string
    }
}

export type TaskActionType = AddTaskAT | RemoveTaskAT | ChangeTaskTitleAT | ChangeTaskStatusAT | AddTodoListAT | RemoveTodoListAT | SetoTodoListsAT | SetTaskAT


export type TasksStateType = {
    [key: string]: TaskResponseType[]
}

const initialState = {}

export const tasksStateReducer = (tasksState: TasksStateType = initialState, action: TaskActionType): TasksStateType => { 
    
    switch (action.type) {
        case 'ADD-TASK':
            {   
                const todoListId = action.payload.todolistId
                const newTask = {id: v1(), title: action.payload.title, status: TakStatuses.New, priority: TaskPriorities.New, startDate: '', deadline: '', addedDate: '', order: 0, todoListId: todoListId, description: ''}

                return {...tasksState,
                        [todoListId]: [newTask, ...tasksState[todoListId]]}
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
                const newTaskStatus = action.payload.status
                debugger
                return {...tasksState,
                        [todoListId]: tasksState[todoListId].map(t => t.id === taskId ? {...t, status: newTaskStatus} : t)
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
                const stateCopy = {...tasksState}
                delete stateCopy[todoListId]
                return stateCopy
            }

        case 'SET-TODOLISTS':{
            const state = {...tasksState}
            action.payload.todoLists.forEach(tl => state[tl.id] = [])
            return state
            }

        case 'SET-TASKS':
            const state = {...tasksState}
            state[action.payload.todoListId] = action.payload.tasks
            return state

        default: return tasksState 
    }
}

export const addTaskAC = (todolistId: string, title: string): AddTaskAT => ({
    type: 'ADD-TASK',
    payload: {
        todolistId,
        title
    }
})

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskAT => ({
    type: 'REMOVE-TASK',
    payload: {
        todolistId,
        taskId
    }
})

export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string): ChangeTaskTitleAT => ({
    type: 'CHANGE-TASK-TITLE',
    payload: {
        todolistId,
        taskId,
        newTitle
    }
})

export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TakStatuses): ChangeTaskStatusAT => ({
    type: 'CHANGE-TASK-STATUS',
    payload: {
        todolistId,
        taskId,
        status
    }
})

export const setTasksAC = (tasks: TaskResponseType[], todoListId: string): SetTaskAT => ({
    type: 'SET-TASKS',
    payload: {
        tasks,
        todoListId
    }
})

export const fetchTasks = (todoListId: string): AppThunkType => (dispatch) => {
    todoListAPI.getTasks(todoListId)
                .then(response => dispatch(setTasksAC(response.data.items, todoListId)))
}