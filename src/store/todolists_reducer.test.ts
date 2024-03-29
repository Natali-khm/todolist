import { v1 } from "uuid";
import { RequestStatusType } from "./app_reducer";
import { addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, FilterValuesType, removeTodoListAC, setTodoListEntityStatusAC, setTodoListsAC, TodoListsDomainType, todoListsReducer } from "./todolists_reducer";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodoListsDomainType>;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [        
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, todoListEntityStatus: 'idle'},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, todoListEntityStatus: 'idle'},
    ]

})

test('correct todo-list should be removed', () => {

    const endState = todoListsReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1);     
    expect(endState[0].id).toBe(todolistId2); 
});


test('correct to-do list should be added', () => {     

    const newTodoList = {id: v1(), title: 'To buy to eat', filter: 'all', addedDate: '', order: 0}

    const endState = todoListsReducer(startState, addTodoListAC(newTodoList))
    
    expect(endState.length).toBe(3);     
    expect(endState[0].title).toBe('To buy to eat'); 
});


test('correct to-do list should change its name', () => {     

    let newTodolistTitle = "New Todolist";    

    const endState = todoListsReducer(startState, changeTodoListTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");     
    expect(endState[1].title).toBe(newTodolistTitle); 
})


test('correct filter of to-do list should be changed', () => {         

    let newFilter: FilterValuesType = "completed";  

    const endState = todoListsReducer(startState, changeTodoListFilterAC(todolistId2, newFilter))  

    expect(endState[0].filter).toBe("all");         
    expect(endState[1].filter).toBe(newFilter);     
});


test('correct entity status of to-do list should be set', () => {         

    let newStatus: RequestStatusType = "loading";  

    const endState = todoListsReducer(startState, setTodoListEntityStatusAC(todolistId2, newStatus))  

    expect(endState[0].todoListEntityStatus).toBe("idle");         
    expect(endState[1].todoListEntityStatus).toBe(newStatus);     
});


test('to-do lists should be set to the state', () => {         

    const endState = todoListsReducer([], setTodoListsAC(startState))  

    expect(endState.length).toBe(2);         
});