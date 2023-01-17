import React, { useEffect, useState } from "react";
import { v1 } from "uuid";
import "./App.css";
import TodoList from "./TodoList";

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
}

function App() {
  const todoListTitle_1: string = "What to learn";
  const tasks_1: Array <TaskType> = [
    { id: v1(), title: "HTML", isDone: true },
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS/TS", isDone: false },
  ];

  useEffect(()=>console.log(tasks), [tasks_1]);


  const [tasks, setTasks] = useState <Array<TaskType>>(tasks_1);
  const [filter, setFilter] = useState <FilterValuesType>('all');
  
  const removeTask = (taskId: string) => { 
    setTasks(tasks.filter(task => task.id !== taskId));
   };

  const addTask = (title: string) => {
    const newTask: TaskType = {id: v1(), title, isDone: false};
    setTasks([newTask, ...tasks])
  };

  const changleFilter = (filterValue: FilterValuesType) => { setFilter(filterValue) };
  
  const getFilteredTasksForRender = (tasks: Array<TaskType>, filter: FilterValuesType) => {
    
    switch (filter) {
      case 'active': return tasks.filter(task => task.isDone === false);
      case 'completed': return tasks.filter(task => task.isDone === true);
      default: return tasks;
    }    
  }

  const filteredTasksForRender = getFilteredTasksForRender(tasks, filter);
  return (
    <div className="App">
      <TodoList title = {todoListTitle_1} 
                changleFilter = {changleFilter} 
                tasks = {filteredTasksForRender} 
                removeTask = {removeTask}
                addTask = {addTask}
                />
    </div>
  );
}

export default App;

