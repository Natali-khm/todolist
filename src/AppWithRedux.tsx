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

  const addTodoList = (title: string) => dispatch(addTodoListAC(title))


  return (

     <div className="App">

        <ButtonAppBar/>

        <Container fixed>
            <Grid container style={{padding: '20px'}}>
              <AddItemForm addItem={addTodoList}/>
            </Grid>

            <Grid container spacing={3}>
              {todoLists.map(el=>{

                return (
                    <Grid item key={el.id}>
                      <Paper style={{padding: '20px'}}>
                        <TodoListWithRedux title = {el.title} 
                                           filter = {el.filter}
                                           tlId={el.id}
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

