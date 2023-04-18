import { TakStatuses, TaskPriorities, TaskResponseType, todoListAPI, UpdateTaskModelType } from "../api/todolist-api";
import { handleServerAppError, handleServerNetworkError } from "../utils/error_utils";
import { setAppError, setAppStatus } from "./app_reducer";
import { AppThunkType } from "./store";
import { AddTodoListAT, RemoveTodoListAT, SetoTodoListsAT } from "./todolists_reducer";


const initialState = {}

export const tasksStateReducer = (tasksState: TasksStateType = initialState, action: TaskActionType ): TasksStateType => { 
    
    switch (action.type) {
        case 'ADD-TASK': {  
                const newTask = action.payload.task
                const todoListId = newTask.todoListId

                return {...tasksState,
                        [todoListId]: [newTask, ...tasksState[todoListId]] }
            } 

        case 'REMOVE-TASK': { 
                const todoListId = action.payload.todoListId
                const taskId = action.payload.taskId

                return {...tasksState,
                    [todoListId]: tasksState[todoListId].filter(t => t.id !== taskId) }
            }

        case 'UPDATE-TASK': {
                const todoListId = action.payload.todoListId
                const taskId = action.payload.taskId
                return {...tasksState,
                        [todoListId]: tasksState[todoListId].map(t => t.id === taskId ? {...t, ...action.payload.taskModel} : t) }
            }

        case 'ADD-TODO-LIST': {             
                const newTodoListID = action.payload.todoList.id;
                return {...tasksState,
                        [newTodoListID]: [] }
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

        case 'SET-TASKS':{
                return {...tasksState,
                        [action.payload.todoListId]: [...action.payload.tasks, ...tasksState[action.payload.todoListId]] }            
            }

        default: return tasksState 
    }
}


// AC

export const addTaskAC = (task: TaskResponseType) => ({ 
    type: 'ADD-TASK', 
    payload: { 
        task 
    } 
} as const)

export const removeTaskAC = (todoListId: string, taskId: string) => ({
    type: 'REMOVE-TASK',
    payload: {
        todoListId,
        taskId
    }
}  as const)

export const updateTaskAC = (todoListId: string, taskId: string, taskModel: UpdateDomainTaskModelType) => ({
    type: 'UPDATE-TASK',
    payload: {
        todoListId,
        taskId,
        taskModel
    }
} as const)

export const setTasksAC = (tasks: TaskResponseType[], todoListId: string) => ({
    type: 'SET-TASKS',
    payload: {
        tasks,
        todoListId
    }
} as const )


// thunks

export const fetchTasks = (todoListId: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatus('loading'))
    todoListAPI.getTasks(todoListId)
                .then(response => {
                    dispatch(setTasksAC(response.data.items, todoListId))
                    dispatch(setAppStatus('succeeded'))
                })
}

export const removeTaskTC = (todoListId: string, taskId: string): AppThunkType => (dispatch) => {
    todoListAPI.deleteTask(todoListId, taskId)
                .then(response => dispatch(removeTaskAC(todoListId, taskId)))
                .catch(() => alert('NetworkError'))
}

export const addTaskTC = (todoListId: string, title: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatus('loading'))    
    todoListAPI.createTask(todoListId, title)
                .then(response => {
                    if (response.data.resultCode === 0){
                        dispatch(addTaskAC(response.data.data.item)) 
                        dispatch(setAppStatus('succeeded'))    
                    } else {
                        handleServerAppError(response.data, dispatch)                       
                    }
                })
                .catch(error => handleServerNetworkError(error, dispatch))
}

export const updateTaskTC = (todoListId: string, taskId: string, domainTaskModel: UpdateDomainTaskModelType): AppThunkType => (dispatch, getState) => {
    dispatch(setAppStatus('loading'))    
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
                .then(response => {
                    if (response.data.resultCode === 0){
                        dispatch(updateTaskAC(todoListId, taskId, domainTaskModel))
                        dispatch(setAppStatus('succeeded'))    
                    } else {
                        handleServerAppError(response.data, dispatch)                         
                    }
                })
                .catch(error => handleServerNetworkError(error, dispatch))
}


// types

type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TakStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TaskActionType =  ReturnType<typeof addTaskAC>
                            | ReturnType<typeof removeTaskAC>
                            | ReturnType<typeof updateTaskAC>
                            | ReturnType<typeof setTasksAC>
                            | AddTodoListAT
                            | RemoveTodoListAT
                            | SetoTodoListsAT


export type TasksStateType = {
    [key: string]: TaskResponseType[]
}
