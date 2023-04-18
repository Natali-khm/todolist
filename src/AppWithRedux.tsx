import { useCallback, useEffect } from "react";
import AddItemForm from "./components/AddItemForm";
import "./App.css";
import ButtonAppBar from "./components/ButtonAppBar"
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import { addTodoListTC, fetchTodoLists, TodoListsDomainType } from "./store/todolists_reducer";
import { useSelector } from "react-redux";
import { RootStateType } from "./store/store";
import TodoListWithRedux from "./TodoListWithRedux";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { CustomizedSnackbars } from './components/errorSnackbar/ErrorSnackBar'

const test = {
  padding: '20px',
}


function AppWithRedux() {
  console.log('app');

  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.app.status)

  const todoLists = useSelector<RootStateType, TodoListsDomainType[]>(state => state.todoLists)

  const addTodoList = useCallback((title: string) => dispatch(addTodoListTC(title)), [])

  useEffect(() => {
    dispatch(fetchTodoLists())
  }, [])


  return (
     <div className="App">

        <ButtonAppBar/>
        {status === 'loading' && <LinearProgress color="secondary"/>}
        <CustomizedSnackbars/>

        <Container fixed>

            <Grid container style={test} justifyContent="center">
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
                                           tlEntityStatus={el.todoListEntityStatus}
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

