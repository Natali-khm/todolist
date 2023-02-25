import { v1 } from "uuid";
import { TasksStateType } from "../App";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksStateReducer } from "./tasksState_reducer";
import { addTodoListAC, removeTodoListAC } from "./todolists_reducer";

test('correct task should be added', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const startState: TasksStateType = {

        [todolistId1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
        ],
        [todolistId2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
        ]        
    }

    const newTaskTitle = 'Redux'

    const endState = tasksStateReducer(startState, addTaskAC(todolistId1, newTaskTitle))

    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId2].length).toBe(2)
    expect(endState[todolistId2][0].id).toBeDefined()
    expect(endState[todolistId1][0].title).toBe(newTaskTitle)
})


test('correct task should be removed', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const removedTaskId = v1()

    const startState: TasksStateType = {

        [todolistId1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
        ],
        [todolistId2]:[
            {id: removedTaskId, title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
        ]        
    }

    const endState = tasksStateReducer(startState, removeTaskAC(todolistId2, removedTaskId))

    expect(endState[todolistId2].length).toBe(1)
    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId2][0].title).toBe("JS2")
    expect(endState[todolistId2].every(t => t.id !== removedTaskId)).toBeTruthy()

})


test('correct task should change its name', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const TaskIdWithChangedTitle = v1()
    const newTaskTitle = 'React'

    const startState: TasksStateType = {

        [todolistId1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
        ],
        [todolistId2]:[
            {id: TaskIdWithChangedTitle, title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
        ]        
    }

    const endState = tasksStateReducer(startState, changeTaskTitleAC(todolistId2, TaskIdWithChangedTitle, newTaskTitle))

    expect(endState[todolistId1][1].title).toBe('JS')
    expect(endState[todolistId2][0].title).toBe(newTaskTitle)

})

test('correct task should change its status', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const TaskIdWithChangedStatus = v1()
    const newTaskStatus = false

    const startState: TasksStateType = {

        [todolistId1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
        ],
        [todolistId2]:[
            {id: TaskIdWithChangedStatus, title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
        ]        
    }

    const endState = tasksStateReducer(startState, changeTaskStatusAC(todolistId2, TaskIdWithChangedStatus, newTaskStatus))

    expect(endState[todolistId1][0].isDone).toBeTruthy()
    expect(endState[todolistId2][0].isDone).toBeFalsy()

})

test('new task state should be created', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const newTodoListTitle = 'Not forget'

    const startState: TasksStateType = {

        [todolistId1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
        ],
        [todolistId2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
        ]        
    }
    const action = addTodoListAC(newTodoListTitle)
    const endState = tasksStateReducer(startState, action)

    expect(Object.keys(endState).length).toBe(3)
    expect(endState[action.payload.todoListId]).toBeDefined()
    expect(endState[action.payload.todoListId]).toStrictEqual([])
})


test('correct tasks state should be deleted', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const startState: TasksStateType = {

        [todolistId1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
        ],
        [todolistId2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
        ]        
    }

    const endState = tasksStateReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.hasOwnProperty(todolistId1)).toBeFalsy()
    expect(endState.hasOwnProperty(todolistId2)).toBeTruthy()

})