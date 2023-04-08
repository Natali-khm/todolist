import { TakStatuses, TaskPriorities, TodoListResponseType } from './../api/todolist-api';
import { v1 } from "uuid";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, setTasksAC, tasksStateReducer, TasksStateType } from "./tasksState_reducer";
import { addTodoListAC, removeTodoListAC, setTodoListsAC } from "./todolists_reducer";

let todolistId1: string
let todolistId2: string
let changedTaskId: string
let startState: TasksStateType

beforeEach(()=>{
    todolistId1 = v1();
    todolistId2 = v1();
    changedTaskId = v1()

    startState = {

        [todolistId1]:[
            {id: v1(), title: "HTML&CSS", status: TakStatuses.Completed, priority: TaskPriorities.New, startDate: '', deadline: '', addedDate: '', order: 0, todoListId: todolistId1, description: ''},
            {id: v1(), title: "JS",       status: TakStatuses.Completed, priority: TaskPriorities.New, startDate: '', deadline: '', addedDate: '', order: 0, todoListId: todolistId1, description: ''},
        ],
        [todolistId2]:[
            {id: changedTaskId, title: "HTML&CSS2", status: TakStatuses.Completed, priority: TaskPriorities.New, startDate: '', deadline: '', addedDate: '', order: 0, todoListId: todolistId2, description: ''},
            {id: v1(), title: "JS2",       status: TakStatuses.Completed, priority: TaskPriorities.New, startDate: '', deadline: '', addedDate: '', order: 0, todoListId: todolistId2, description: ''},
        ]        
    }
})

test('correct task should be added', () => {
    const newTaskTitle = 'Redux'
    const endState = tasksStateReducer(startState, addTaskAC(todolistId1, newTaskTitle))

    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId2].length).toBe(2)
    expect(endState[todolistId2][0].id).toBeDefined()
    expect(endState[todolistId1][0].title).toBe(newTaskTitle)
})


test('correct task should be removed', () => {
    const endState = tasksStateReducer(startState, removeTaskAC(todolistId2, changedTaskId))

    expect(endState[todolistId2].length).toBe(1)
    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId2][0].title).toBe("JS2")
    expect(endState[todolistId2].every(t => t.id !== changedTaskId)).toBeTruthy()
})


test('correct task should change its name', () => {
    const newTaskTitle = 'React'
    const endState = tasksStateReducer(startState, changeTaskTitleAC(todolistId2, changedTaskId, newTaskTitle))

    expect(endState[todolistId1][1].title).toBe('JS')
    expect(endState[todolistId2][0].title).toBe(newTaskTitle)
})

test('correct task should change its status', () => {
    const newTaskStatus = TakStatuses.New
    const endState = tasksStateReducer(startState, changeTaskStatusAC(todolistId2, changedTaskId, newTaskStatus))

    expect(endState[todolistId1][0].status).toBe(TakStatuses.Completed)
    expect(endState[todolistId2][0].status).toBe(TakStatuses.New)
})

test('new task state should be created', () => {
    const newTodoListTitle = 'Not forget'
    const action = addTodoListAC(newTodoListTitle)
    const endState = tasksStateReducer(startState, action)

    expect(Object.keys(endState).length).toBe(3)
    expect(endState[action.payload.todoListId]).toBeDefined()
    expect(endState[action.payload.todoListId]).toStrictEqual([])
})



test('correct tasks state should be deleted', () => {
    const endState = tasksStateReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.hasOwnProperty(todolistId1)).toBeFalsy()
    expect(endState.hasOwnProperty(todolistId2)).toBeTruthy()
})



test('empty  arrays should be added when we set todo-lists', () => {
    const action = setTodoListsAC([        
        {id: '1', title: 'What to learn', addedDate: '', order: 0},
        {id: '2', title: 'What to buy', addedDate: '', order: 0}
    ])

    const endState = tasksStateReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})



test('tasks should be added to todo-list', () => {
    const action = setTasksAC(startState[todolistId1], todolistId1)

    const endState = tasksStateReducer({
        [todolistId2]: [],
        [todolistId1]: []
    }, action)


    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId2].length).toBe(0)
})