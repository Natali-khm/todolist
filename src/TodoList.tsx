import React from 'react'
import { FilterValuesType } from './App';

type todoListPropsType = {
    title: string;
    tasks: Array <TaskType>;
    removeTask: (taskId: number)=>void
    changleFilter: (filterValue: FilterValuesType)=>void
}

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}

const TodoList = (props: todoListPropsType) => {



    let tasksList = !props.tasks.length 
    ? <span>Your to-do list is empty</span>  
    : props.tasks.map((task: TaskType) => {     
            
    return(
        <li>
            <input type="checkbox" checked={task.isDone}/>
            <span>{task.title}</span>
            <button onClick={() => props.removeTask(task.id)}>x</button>
        </li>            
        )
    });         

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>{tasksList}</ul>
            <div>
                <button onClick = {()=>{props.changleFilter('all')}}>All</button>
                <button onClick = {()=>{props.changleFilter('active')}}>Active</button>
                <button onClick = {()=>{props.changleFilter('completed')}}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;