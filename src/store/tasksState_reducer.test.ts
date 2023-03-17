import { v1 } from "uuid";
import { TasksStateType } from "../AppWithRedux";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksStateReducer } from "./tasksState_reducer";
import { addTodoListAC, removeTodoListAC } from "./todolists_reducer";

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
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
        ],
        [todolistId2]:[
            {id: changedTaskId, title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
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
    const newTaskStatus = false
    const endState = tasksStateReducer(startState, changeTaskStatusAC(todolistId2, changedTaskId, newTaskStatus))

    expect(endState[todolistId1][0].isDone).toBeTruthy()
    expect(endState[todolistId2][0].isDone).toBeFalsy()
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