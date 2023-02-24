import { v1 } from "uuid";
import { FilterValuesType, TodoListType } from "../App";
import { AddTodoListAC, ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC, todoListsReducer } from "./todolists_reducers";


test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [         
        {id: todolistId1, title: "What to learn", filter: "all"},         
        {id: todolistId2, title: "What to buy", filter: "all"}     
    ]

    const endState = todoListsReducer(startState, RemoveTodoListAC(todolistId1))

    expect(endState.length).toBe(1);     
    expect(endState[0].id).toBe(todolistId2); 
});


test('correct todolist should be added', () => {     
    let todolistId1 = v1();     
    let todolistId2 = v1();  
    let todolistId3 = v1();  

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListType> = [         
        {id: todolistId1, title: "What to learn", filter: "all"},         
        {id: todolistId2, title: "What to buy", filter: "all"}     
    ]     

    // const action: AddTodoListAT = {         
    //     type: "ADD-TODO-LIST",         
    //     payload: {title: newTodolistTitle}  
    // }

    const endState = todoListsReducer(startState, AddTodoListAC(todolistId3, newTodolistTitle))
    
    expect(endState.length).toBe(3);     
    expect(endState[2].title).toBe(newTodolistTitle); 
});


test('correct todolist should change its name', () => {     
    let todolistId1 = v1();     
    let todolistId2 = v1();  

    let newTodolistTitle = "New Todolist";    

    const startState: Array<TodoListType> = [         
        {id: todolistId1, title: "What to learn", filter: "all"},         
        {id: todolistId2, title: "What to buy", filter: "all"}     
    ]      

    // const action: ChangeTodoListTitleAT = {         
    //     type: "CHANGE-TODO-LIST-TITLE", 
    //     payload: {
    //         todoListId: todolistId2,
    //         newTitle: newTodolistTitle
    //     }             
    // }

    const endState = todoListsReducer(startState, ChangeTodoListTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");     
    expect(endState[1].title).toBe(newTodolistTitle); 
})


test('correct filter of todolist should be changed', () => {         
    let todolistId1 = v1();         
    let todolistId2 = v1();  

    let newFilter: FilterValuesType = "completed";  

    const startState: Array<TodoListType> = [             
        {id: todolistId1, title: "What to learn", filter: "all"},             
        {id: todolistId2, title: "What to buy", filter: "all"}         
    ]         
    
    // const action: ChangeTodoListFilterAT ={             
    //     type: "CHANGE-TODO-LIST-FILTER", 
    //     payload: {
    //         todoListId: todolistId2,
    //         filterValue: newFilter
    //     }                        
    // }         

    const endState = todoListsReducer(startState, ChangeTodoListFilterAC(todolistId2, newFilter))  

    expect(endState[0].filter).toBe("all");         
    expect(endState[1].filter).toBe(newFilter);     
});