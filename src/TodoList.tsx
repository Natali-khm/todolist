import React from 'react'

type todoListPropsType = {
    title: string;
    tasks: Array <TaskType>;
}

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}

const TodoList = (props: todoListPropsType) => {

    let tasksList = !props.tasks.length 
    ? <span>Your to-do list is empty</span>  
    : props.tasks.map((task: TaskType) => 
        <li><input type="checkbox" checked={task.isDone}/><span>{task.title}</span></li>
        ) 

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>{tasksList}</ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;