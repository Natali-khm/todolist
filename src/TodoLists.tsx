import { useCallback } from "react";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AddItemForm from "./components/AddItemForm";
import TodoListWithRedux from "./TodoListWithRedux";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { addTodoListTC } from "./store/todolists_reducer";



const test = {
    padding: '20px',
}

export const TodoLists = () => {
    const todoLists = useAppSelector(state => state.todoLists)
    const addTodoList = useCallback((title: string) => dispatch(addTodoListTC(title)), [])
    const dispatch = useAppDispatch()


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
