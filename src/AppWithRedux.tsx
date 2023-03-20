import React, { useEffect, useReducer, useState, useCallback } from "react";
import { v1 } from "uuid";
import AddItemForm from "./components/AddItemForm";
import "./App.css";
import ButtonAppBar from "./components/ButtonAppBar"
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { addTodoListAC } from "./store/todolists_reducer";
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
  console.log('app');

  const dispatch = useDispatch()

  const todoLists = useSelector<RootStateType, TodoListType[]>(state => state.todoLists)

  const addTodoList = useCallback((title: string) => dispatch(addTodoListAC(title)), [])


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

