import React, { useEffect, useReducer, useState } from "react";
import { v1 } from "uuid";
import AddItemForm from "./components/AddItemForm";
import "./App.css";
import TodoList from "./other/TodoList";
import ButtonAppBar from "./components/ButtonAppBar"
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { addTodoListAC, removeTodoListAC, changeTodoListTitleAC, changeTodoListFilterAC, todolistID1, todolistID2 } from "./store/todolists_reducer";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksStateReducer } from "./store/tasksState_reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootStateType } from "./store/store";
import TodoListWithRedux from "./TodoListWithRedux";


export type FilterValuesType = 'all' | 'active' | 'completed';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
}

export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: TaskType[]
}


function AppWithRedux() {

  const dispatch = useDispatch()

  const todoLists = useSelector<RootStateType, TodoListType[]>(state => state.todoLists)
  const tasks = useSelector<RootStateType, TasksStateType>(state => state.tasks)

  // ---------------------------------------------------------//

  const addTodoList = (title: string) => dispatch(addTodoListAC(title))

  const removeTodoList = (todoListId: string) => dispatch(removeTodoListAC(todoListId))

  const changeTodoListTitle = (todoListId: string, newTitle: string) => 
    dispatch(changeTodoListTitleAC(todoListId, newTitle))

  const changeTodoListFilter = (todoListId: string, filterValue: FilterValuesType) => 
    dispatch(changeTodoListFilterAC(todoListId, filterValue))

  // ---------------------------------------------------------//

  const addTask = (todoListId: string, title: string) => 
    dispatch(addTaskAC(todoListId, title)) 

  const removeTask = (todoListId: string, taskId: string) => 
    dispatch(removeTaskAC(todoListId, taskId))
    
  const changeTaskTitle = (todoListId: string, taskId: string, newTitle: string) => 
    dispatch(changeTaskTitleAC(todoListId, taskId, newTitle))
  
  const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => 
    dispatch(changeTaskStatusAC(todoListId, taskId, isDone))

  // ---------------------------------------------------------//

  const getFilteredTasksForRender = (tasks: Array<TaskType>, filter: FilterValuesType) => {

    switch (filter) {
      case 'active': return tasks.filter(task => !task.isDone);
      case 'completed': return tasks.filter(task => task.isDone);
      default: return tasks;
    }    
  };

  return (

     <div className="App">

        <ButtonAppBar/>

        <Container fixed>
            <Grid container style={{padding: '20px'}}>
              <AddItemForm addItem={addTodoList}/>
            </Grid>

            <Grid container spacing={3}>
              {todoLists.map(el=>{

                const filteredTasksForRender = getFilteredTasksForRender(tasks[el.id], el.filter);

                return (
                    <Grid item key={el.id}>
                      <Paper style={{padding: '20px'}}>
                        <TodoListWithRedux title = {el.title} 
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

export default AppWithRedux;

