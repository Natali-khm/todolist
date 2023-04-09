import { v1 } from "uuid";
import { TakStatuses, TaskPriorities, TaskResponseType, todoListAPI, UpdateTaskModelType } from "../api/todolist-api";
import { AppThunkType } from "./store";
import { AddTodoListAT, RemoveTodoListAT, SetoTodoListsAT } from "./todolists_reducer";

type AddTaskAT = {
    type: 'ADD-TASK'
    payload: {
        task: TaskResponseType
    }
}

type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    payload: {
        todoListId: string
        taskId: string
    }
}

type UpdateTaskAT = {
    type: 'UPDATE-TASK'
    payload: {
        todoListId: string
        taskId: string
        taskModel: UpdateDomainTaskModelType
    }
}

type SetTaskAT = {
    type: 'SET-TASKS'
    payload: {
        tasks: TaskResponseType[]
        todoListId: string
    }
}

export type TaskActionType = AddTaskAT | RemoveTaskAT | UpdateTaskAT | AddTodoListAT | RemoveTodoListAT | SetoTodoListsAT | SetTaskAT


export type TasksStateType = {
    [key: string]: TaskResponseType[]
}

const initialState = {}

export const tasksStateReducer = (tasksState: TasksStateType = initialState, action: TaskActionType): TasksStateType => { 
    
    switch (action.type) {
        case 'ADD-TASK': {   
                const newTask = action.payload.task
                const todoListId = newTask.todoListId

                return {...tasksState,
                        [todoListId]: [newTask, ...tasksState[todoListId]]
                }
            } 

        case 'REMOVE-TASK': { 
                const todoListId = action.payload.todoListId
                const taskId = action.payload.taskId

                return {...tasksState,
                    [todoListId]: tasksState[todoListId].filter(t => t.id !== taskId)
                }
            }

        case 'UPDATE-TASK': {
                const todoListId = action.payload.todoListId
                const taskId = action.payload.taskId
                return {...tasksState,
                        [todoListId]: tasksState[todoListId].map(t => t.id === taskId ? {...t, ...action.payload.taskModel} : t)
                    }
            }

        case 'ADD-TODO-LIST': {             
                const newTodoListID = action.payload.todoList.id;
                return {...tasksState,
                        [newTodoListID]: []
                    }
            }

        case 'REMOVE-TODO-LIST': {             
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

export const addTaskAC = (task: TaskResponseType): AddTaskAT => ({
    type: 'ADD-TASK',
    payload: {
        task
    }
})

export const removeTaskAC = (todoListId: string, taskId: string): RemoveTaskAT => ({
    type: 'REMOVE-TASK',
    payload: {
        todoListId,
        taskId
    }
})

export const updateTaskAC = (todoListId: string, taskId: string, taskModel: UpdateDomainTaskModelType): UpdateTaskAT => ({
    type: 'UPDATE-TASK',
    payload: {
        todoListId,
        taskId,
        taskModel
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

export const removeTaskTC = (todoListId: string, taskId: string): AppThunkType => (dispatch) => {
    todoListAPI.deleteTask(todoListId, taskId)
                .then(response => dispatch(removeTaskAC(todoListId, taskId)))
}

export const addTaskTC = (todoListId: string, title: string): AppThunkType => (dispatch) => {
    todoListAPI.createTask(todoListId, title)
                .then(response => dispatch(addTaskAC(response.data.data.item)))
}

type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TakStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (todoListId: string, taskId: string, domainTaskModel: UpdateDomainTaskModelType): AppThunkType => (dispatch, getState) => {
    
    const task = getState().tasks[todoListId].find(t => t.id === taskId)
    
    if (!task) { 
        // throw new Error('the task is not found in the state') 
        console.warn('the task is not found in the state') 
        return
    }

    const taskModel: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...domainTaskModel
    }  

    todoListAPI.updateTask(todoListId, taskId, taskModel)
                .then(response => dispatch(updateTaskAC(todoListId, taskId, domainTaskModel)))
}