import { TasksStateType, TodoListType } from "../App";
import { tasksStateReducer } from "./tasksState_reducer";
import { addTodoListAC, AddTodoListAT, removeTodoListAC, todoListsReducer } from "./todolists_reducer";

test('ids should be equal', () => {
const startTasksState: TasksStateType = {}
const startTodolistsState: TodoListType[] = []

const action: AddTodoListAT = addTodoListAC('new todolist')


const endTasksState = tasksStateReducer(startTasksState, action)
const endTodolistsState = todoListsReducer(startTodolistsState, action)

const keys = Object.keys(endTasksState)
const idFromTasks = keys[0];
const idFromTodoLists = endTodolistsState[0].id

expect(idFromTasks).toBe(action.payload.todoListId)
expect(idFromTodoLists).toBe(action.payload.todoListId)

})




test('propertry with todolistid should be deleted', () => {

     const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false},
            { id: "2", title: "JS", isDone: true},
            { id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false},
            { id: "2", title: "milk", isDone: true},
            { id: "3", title: "tea", isDone: false}
        ]
    }

    const action = removeTodoListAC("todolistId2")
    const endState = tasksStateReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState["todolistId2"]).toBeUndefined()
 })
