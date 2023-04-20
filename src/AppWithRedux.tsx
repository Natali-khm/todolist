import { useCallback, useEffect } from "react";
import AddItemForm from "./components/AddItemForm";
import "./App.css";
import ButtonAppBar from "./components/ButtonAppBar"
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import { addTodoListTC, fetchTodoLists, TodoListsDomainType } from "./store/todolists_reducer";
import { RootStateType } from "./store/store";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { CustomizedSnackbars } from './components/errorSnackbar/ErrorSnackBar'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TodoLists } from "./TodoLists";
import { Login } from "./components/login/Login";



function AppWithRedux() {
  console.log('app');
  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.app.status)

  useEffect(() => {
    dispatch(fetchTodoLists())
  }, [])


  return (
    <BrowserRouter>
          <div className="App">

          <ButtonAppBar/>
          {status === 'loading' && <LinearProgress color="secondary"/>}
          <CustomizedSnackbars/>

          <Container fixed>
            <Routes>
              <Route path= '/' element={<TodoLists/>}/>
              <Route path= '/login' element={<Login/>}/>
            </Routes>
           

          </Container>
        </div>
    </BrowserRouter>
  );
}

export default AppWithRedux;

