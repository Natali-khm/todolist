import { v1 } from "uuid";
import { TasksStateType } from "../other/AppWithReducers";
import { AddTodoListAT, RemoveTodoListAT, todolistID1, todolistID2 } from "./todolists_reducer";

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

const initialState = {
    [todolistID1]:[
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
  ],
    [todolistID2]:[
      {id: v1(), title: "HTML&CSS2", isDone: true},
      {id: v1(), title: "JS2", isDone: true},
      {id: v1(), title: "ReactJS2", isDone: false},
      {id: v1(), title: "Rest API2", isDone: false},
      {id: v1(), title: "GraphQL2", isDone: false},
    ]
  }

export const tasksStateReducer = (tasksState: TasksStateType = initialState, action: TaskActionType): TasksStateType => { 
    
    switch (action.type) {
        case 'ADD-TASK':
            {   
                const todoListId = action.payload.todolistId
                const newTask = {id: v1(), title: action.payload.title, isDone: false}

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
                const stateCopy = {...tasksState}
                delete stateCopy[todoListId]
                return stateCopy
            }
            
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

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): ChangeTaskStatusAT => ({
    type: 'CHANGE-TASK-STATUS',
    payload: {
        todolistId,
        taskId,
        isDone
    }
})