import { v1 } from "uuid";
import { TasksStateType } from "../App";
import { AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksStateReducer } from "./tasksState_reducers";
import { AddTodoListAC, RemoveTodoListAC } from "./todolists_reducers";

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

    const endState = tasksStateReducer(startState, AddTaskAC(todolistId1, newTaskTitle))

    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId1][2].title).toBe(newTaskTitle)
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

    const endState = tasksStateReducer(startState, RemoveTaskAC(todolistId2, removedTaskId))

    expect(endState[todolistId2].length).toBe(1)
    expect(endState[todolistId2][0].title).toBe("JS2")

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

    const endState = tasksStateReducer(startState, ChangeTaskTitleAC(todolistId2, TaskIdWithChangedTitle, newTaskTitle))

    expect(endState[todolistId2][0].title).toBe(newTaskTitle)
    expect(endState[todolistId2][1].title).toBe('JS2')

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

    const endState = tasksStateReducer(startState, ChangeTaskStatusAC(todolistId2, TaskIdWithChangedStatus, newTaskStatus))

    expect(endState[todolistId2][0].isDone).toBe(false)
    expect(endState[todolistId2][1].isDone).toBe(true)

})

test('new task state should be created', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();
    const todolistId3 = v1();

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

    const endState = tasksStateReducer(startState, AddTodoListAC(todolistId3, newTodoListTitle))

    expect(endState[todolistId3].length).toBe(0)
    expect(Object.keys(endState).length).toBe(3)
    expect(endState.hasOwnProperty(todolistId3)).toBe(true)

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

    const endState = tasksStateReducer(startState, RemoveTodoListAC(todolistId1))

    expect(endState.hasOwnProperty(todolistId1)).toBe(false)
    expect(endState.hasOwnProperty(todolistId2)).toBe(true)

})