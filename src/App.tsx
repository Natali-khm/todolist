import React, { useEffect, useState } from "react";
import "./App.css";
import TodoList, { TaskType } from "./TodoList";

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
  const todoListTitle_1: string = "What to learn";
  const tasks_1: Array <TaskType> = [
    { id: 1, title: "HTML", isDone: true },
    { id: 2, title: "CSS", isDone: true },
    { id: 3, title: "JS/TS", isDone: false },
  ];


  const [tasks, setTasks] = useState <Array<TaskType>>(tasks_1);

  const removeTask = (taskId: number) => { 
    setTasks(tasks.filter(task => task.id !== taskId));
   };

  useEffect(()=>console.log(tasks), [tasks]);

  const [filter, setFilter] = useState <FilterValuesType>('all');

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
      <TodoList title={todoListTitle_1} changleFilter = {changleFilter} tasks={filteredTasksForRender} removeTask={removeTask}/>
    </div>
  );
}

export default App;
