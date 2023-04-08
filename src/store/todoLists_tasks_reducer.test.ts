import { v1 } from "uuid";
import { TakStatuses, TaskPriorities } from "../api/todolist-api";
import { TasksStateType } from "../other/AppWithReducers";
import { tasksStateReducer } from "./tasksState_reducer";
import { addTodoListAC, AddTodoListAT, removeTodoListAC, TodoListsDomainType, todoListsReducer } from "./todolists_reducer";



test('ids should be equal', () => {
const startTasksState: TasksStateType = {}
const startTodolistsState: TodoListsDomainType[] = []

const action: AddTodoListAT = addTodoListAC('new todolist')


const endTasksState = tasksStateReducer(startTasksState, action)
const endTodolistsState = todoListsReducer(startTodolistsState, action)

const keys = Object.keys(endTasksState)
const idFromTasks = keys[0]
const idFromTodoLists = endTodolistsState[0].id

expect(idFromTasks).toBe(action.payload.todoListId)
expect(idFromTodoLists).toBe(action.payload.todoListId)

})




test('property with todolistid should be deleted', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

     const startState: TasksStateType = {
        [todolistId1]: [
            {id: '1', title: "CSS",   status: TakStatuses.New,        priority: TaskPriorities.New, startDate: '', deadline: '', addedDate: '', order: 0, todoListId: todolistId1, description: ''},
            {id: '2', title: "JS",    status: TakStatuses.Completed,  priority: TaskPriorities.New, startDate: '', deadline: '', addedDate: '', order: 0, todoListId: todolistId1, description: ''},
            {id: '3', title: "React", status: TakStatuses.New,        priority: TaskPriorities.New, startDate: '', deadline: '', addedDate: '', order: 0, todoListId: todolistId1, description: ''},
        ],
        [todolistId2]: [
            {id: '1', title: "CSS",   status: TakStatuses.New,        priority: TaskPriorities.New, startDate: '', deadline: '', addedDate: '', order: 0, todoListId: todolistId2, description: ''},
            {id: '2', title: "JS",    status: TakStatuses.Completed,  priority: TaskPriorities.New, startDate: '', deadline: '', addedDate: '', order: 0, todoListId: todolistId2, description: ''},
            {id: '3', title: "React", status: TakStatuses.New,        priority: TaskPriorities.New, startDate: '', deadline: '', addedDate: '', order: 0, todoListId: todolistId2, description: ''},
        ]
    }

    const action = removeTodoListAC(todolistId2)
    const endState = tasksStateReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todolistId2]).toBeUndefined()
 })
