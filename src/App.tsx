import React, { useEffect, useState } from "react";
import { v1 } from "uuid";
import AddItemForm from "./components/AddItemForm";
import "./App.css";
import TodoList from "./TodoList";

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
}

export type TodolistsType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TasksStateType = {
  [key: string]: TaskType[]
}

function App() {

let todolistID1=v1();
let todolistID2=v1();

let [todolists, setTodolists] = useState<Array<TodolistsType>>([
  {id: todolistID1, title: 'What to learn', filter: 'all'},
  {id: todolistID2, title: 'What to buy', filter: 'all'},
])

let [tasks, setTasks] = useState<TasksStateType>({

  [todolistID1]:[
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Rest API", isDone: false},
    {id: v1(), title: "GraphQL", isDone: false},
],
  [todolistID2]:[
    {id: v1(), title: "HTML&CSS2", isDone: true},
    {id: v1(), title: "JS2", isDone: true},
    {id: v1(), title: "ReactJS2", isDone: false},
    {id: v1(), title: "Rest API2", isDone: false},
    {id: v1(), title: "GraphQL2", isDone: false},
    ]
})


  // useEffect(()=>console.log(tasks), [tasks_1]);

  
  const removeTask = (todoListId: string, taskId: string) => { 
    setTasks({   ...tasks, [todoListId]: tasks[todoListId].filter(t=> t.id!== taskId)   });
  };

  const addTask = (todolistId: string, title: string) => {
    const newTask: TaskType = {id: v1(), title, isDone: false};
    setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
  };

  const changleFilter = (todoListId: string, filterValue: FilterValuesType) => { setTodolists (todolists.map(el=>el.id === todoListId ? {...el, filter: filterValue} : el) ) }; 
  

  const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => { 
    setTasks(
      {...tasks,
         [todoListId]: tasks[todoListId].map(el=>el.id===taskId ?  {...el, isDone} : el)}  
      )
  };

  const removeTodolist = (todoListId: string) => {
    setTodolists(todolists.filter(el=>el.id !== todoListId));
    delete tasks[todoListId]
  }

  const addTodoList = (title: string) => {
    const newTodolistID = v1();
    setTodolists([{id: newTodolistID, title, filter: 'all'}, ...todolists])
    setTasks( {[newTodolistID]: [], ...tasks})
  }

  const changeTaskTitle = (todoListId: string, taskId: string, newTitle: string) => {
    setTasks(
      {...tasks,
      [todoListId]: tasks[todoListId].map(el => el.id === taskId ? {...el, title: newTitle} : el)
    })
  }

  const changeTLTitle = (todoListId: string, newTitle: string) => {
    setTodolists(
      todolists.map(tl => tl.id === todoListId ? {...tl, title: newTitle} : tl)
    )
  }

  return (  
    <div className="App">

      <AddItemForm addItem={addTodoList}/>

      {todolists.map(el=>{

          const getFilteredTasksForRender = (tasks: Array<TaskType>, filter: FilterValuesType) => {
  
            switch (filter) {
              case 'active': return tasks.filter(task => !task.isDone);
              case 'completed': return tasks.filter(task => task.isDone);
              default: return tasks;
            }    
          };

        const filteredTasksForRender = getFilteredTasksForRender(tasks[el.id], el.filter);


        return (
            <TodoList title = {el.title} 
                      changleFilter = {changleFilter} 
                      tasks = {filteredTasksForRender} 
                      removeTask = {removeTask}
                      addTask = {addTask}
                      changeTaskStatus = {changeTaskStatus}
                      filter = {el.filter}
                      id={el.id}
                      key={el.id}
                      removeTodolist={removeTodolist}
                      changeTaskTitle={changeTaskTitle}
                      changeTLTitle={changeTLTitle}
                      />
        )
      })}
    </div>
  );
}

export default App;

