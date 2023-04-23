import { useCallback, useEffect } from "react";
import AddItemForm from "./components/AddItemForm";
import "./App.css";
import ButtonAppBar from "./components/ButtonAppBar"
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import { addTodoListTC, fetchTodoLists, TodoListsDomainType } from "./store/todolists_reducer";
import { RootStateType } from "./store/store";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { CustomizedSnackbars } from './components/errorSnackbar/ErrorSnackBar'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { TodoLists } from "./TodoLists";
import { Login } from "./components/login/Login";
import { Box, CircularProgress } from "@mui/material";
import { initializeApp } from "./store/app_reducer";



function AppWithRedux() {
  // console.log('app');
  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.app.status)
  const isInitialized = useAppSelector(state => state.app.isInitialized)
  
  useEffect(() => {
    dispatch(initializeApp())
  }, [])

  if (!isInitialized) {
    return (
      <Box sx={{ display: "flex", justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <BrowserRouter>
          <div className="App">

          <ButtonAppBar/>
          {status === 'loading' && <LinearProgress color="secondary"/>}
          <CustomizedSnackbars/>

          <Container fixed>
            <Routes>
              <Route path= '/'      element={<TodoLists/>}/>
              <Route path= '/login' element={<Login/>}/>
              <Route path= '/404'   element={<h1>404: NOT FOUND</h1>}/>
              <Route path= '*'      element={<Navigate to='/404' />}/>
            </Routes>
           

          </Container>
        </div>
    </BrowserRouter>
  );
}

export default AppWithRedux;

