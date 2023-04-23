import { useCallback, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AddItemForm from "./components/AddItemForm";
import TodoListWithRedux from "./TodoListWithRedux";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { addTodoListTC, fetchTodoLists } from "./store/todolists_reducer";
import { Navigate } from "react-router-dom";



const test = {
    padding: '20px',
}

export const TodoLists = () => {
    const todoLists = useAppSelector(state => state.todoLists)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const addTodoList = useCallback((title: string) => dispatch(addTodoListTC(title)), [])
    const dispatch = useAppDispatch()

    useEffect(() => {
      if (!isLoggedIn){ return }
      dispatch(fetchTodoLists())
    }, [])
    
    if (!isLoggedIn){
      return <Navigate to='/login' />
    }

  return (
    <>
      <Grid container style={test} justifyContent="center">
        <AddItemForm addItem={addTodoList} />
      </Grid>

      <Grid container spacing={3}>

        {todoLists.map((el) => {
          return (
            <Grid item key={el.id}>
              <Paper style={{ padding: "20px" }}>
                <TodoListWithRedux
                  title={el.title}
                  filter={el.filter}
                  tlId={el.id}
                  tlEntityStatus={el.todoListEntityStatus}
                />
              </Paper>
            </Grid>
          )
        })}
        
      </Grid>
    </>
  );
};
