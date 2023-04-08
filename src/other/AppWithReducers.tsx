import React, { Reducer, useEffect, useReducer, useState } from "react";
import { v1 } from "uuid";
import AddItemForm from "../components/AddItemForm";
import "./App.css";
import TodoList from "./TodoList";
import ButtonAppBar from "../components/ButtonAppBar"
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { addTodoListAC, removeTodoListAC, changeTodoListTitleAC, changeTodoListFilterAC, todoListsReducer, TodoListActionType, FilterValuesType, TodoListsDomainType } from "../store/todolists_reducer";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksStateReducer } from "../store/tasksState_reducer";
import { TakStatuses, TaskPriorities, TaskResponseType } from "../api/todolist-api";



export type TasksStateType = {
  [key: string]: TaskResponseType[]
}


function AppWithReducers() {

const todolistID1=v1();
const todolistID2=v1();


const [todolists, dispatchTodoLists] = useReducer<Reducer<TodoListsDomainType[], TodoListActionType>>(todoListsReducer, [
  {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
  {id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
])
  
const [tasks, dispatchTasks] = useReducer(tasksStateReducer, {
  [todolistID1]:[
    {id: v1(), title: "HTML&CSS", status: TakStatuses.Completed, priority: TaskPriorities.New, startDate: '', deadline: '', addedDate: '', order: 0, todoListId: todolistID1, description: ''},
    {id: v1(), title: "ReactJS",  status: TakStatuses.New,       priority: TaskPriorities.New, startDate: '', deadline: '', addedDate: '', order: 0, todoListId: todolistID1, description: ''},
    {id: v1(), title: "Rest API", status: TakStatuses.New,       priority: TaskPriorities.New, startDate: '', deadline: '', addedDate: '', order: 0, todoListId: todolistID1, description: ''},
    {id: v1(), title: "GraphQL",  status: TakStatuses.New,       priority: TaskPriorities.New, startDate: '', deadline: '', addedDate: '', order: 0, todoListId: todolistID1, description: ''},
  ],
  [todolistID2]:[
    {id: v1(), title: "HTML&CSS2", status: TakStatuses.Completed, priority: TaskPriorities.New, startDate: '', deadline: '', addedDate: '', order: 0, todoListId: todolistID2, description: ''},
    {id: v1(), title: "JS2",       status: TakStatuses.Completed, priority: TaskPriorities.New, startDate: '', deadline: '', addedDate: '', order: 0, todoListId: todolistID2, description: ''},
    {id: v1(), title: "ReactJS2",  status: TakStatuses.New,       priority: TaskPriorities.New, startDate: '', deadline: '', addedDate: '', order: 0, todoListId: todolistID2, description: ''},
    {id: v1(), title: "Rest API2", status: TakStatuses.New,       priority: TaskPriorities.New, startDate: '', deadline: '', addedDate: '', order: 0, todoListId: todolistID2, description: ''},
    {id: v1(), title: "GraphQL2",  status: TakStatuses.New,       priority: TaskPriorities.New, startDate: '', deadline: '', addedDate: '', order: 0, todoListId: todolistID2, description: ''},
  ]
})

  // ---------------------------------------------------------//

  const addTodoList = (title: string) => {
    const action = addTodoListAC(title)
    dispatchTodoLists(action)
    dispatchTasks(action)
  }

  const removeTodoList = (todoListId: string) => {
    const action = removeTodoListAC(todoListId)
    dispatchTodoLists(action)
    dispatchTasks(action)
  }

  const changeTodoListTitle = (todoListId: string, newTitle: string) => {
    dispatchTodoLists(changeTodoListTitleAC(todoListId, newTitle))

  const changeTodoListFilter = (todoListId: string, filterValue: FilterValuesType) => {
    dispatchTodoLists(changeTodoListFilterAC(todoListId, filterValue))
    // setTodolists (todolists.map(el=>el.id === todoListId ? {...el, filter: filterValue} : el) ) 
  }

  // ---------------------------------------------------------//

  const addTask = (todoListId: string, title: string) => {
    dispatchTasks(addTaskAC(todoListId, title)) 
  };

  const removeTask = (todoListId: string, taskId: string) => {
    dispatchTasks(removeTaskAC(todoListId, taskId))
  }
    

  const changeTaskTitle = (todoListId: string, taskId: string, newTitle: string) => {
    dispatchTasks(changeTaskTitleAC(todoListId, taskId, newTitle))
  }
  
  const changeTaskStatus = (todoListId: string, taskId: string, status: number) => { 
    dispatchTasks(changeTaskStatusAC(todoListId, taskId, status))
  }

  // ---------------------------------------------------------//

  const getFilteredTasksForRender = (tasks: Array<TaskResponseType>, filter: FilterValuesType) => {

    switch (filter) {
      case 'active': return tasks.filter(task => !task.status);
      case 'completed': return tasks.filter(task => task.status);
      default: return tasks;
    }    
  };

  return (

     <div className="App">

        <ButtonAppBar/>

        <Container fixed>
            <Grid container style={{padding: '20px'}}>
              <div><AddItemForm addItem={addTodoList}/></div>
            </Grid>

            <Grid container spacing={3}>
              {todolists.map(el=>{

                const filteredTasksForRender = getFilteredTasksForRender(tasks[el.id], el.filter);

                return (
                    <Grid item>
                      <Paper style={{padding: '20px'}}>
                        <TodoList title = {el.title} 
                                  changeTodoListFilter = {changeTodoListFilter} 
                                  tasks = {filteredTasksForRender} 
                                  removeTask = {removeTask}
                                  addTask = {addTask}
                                  changeTaskStatus = {changeTaskStatus}
                                  filter = {el.filter}
                                  id={el.id}
                                  key={el.id}
                                  removeTodolist={removeTodoList}
                                  changeTaskTitle={changeTaskTitle}
                                  changeTodoListTitle={changeTodoListTitle}
                                  />                    
                      </Paper>
                    </Grid>
                    )
              })}       
            </Grid>
        </Container>
      </div>
  );
}
}
export default AppWithReducers;

