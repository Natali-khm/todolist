import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'
import { FilterValuesType, TaskType } from './App';

type todoListPropsType = {
    title: string;
    tasks: Array <TaskType>;
    removeTask: (taskId: string)=>void
    changleFilter: (filterValue: FilterValuesType)=>void
    addTask: (title: string) => void
}



const TodoList = (props: todoListPropsType) => {
    const [title, setTitle] = useState<string>('')

    /*     const ref = useRef<HTMLInputElement>(null); */    

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
         
    const addTask = () => {
            props.addTask(title);
            setTitle('')
        }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value); 
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => { if (e.code === 'Enter') { addTask() }}

    /*  const onClickHandlerAll = () => {props.changleFilter('all')}
        const onClickHandlerActive = () => {props.changleFilter('active')}
        const onClickHandlerCompleted = () => {props.changleFilter('completed')}
    */

    const handlerCreator = (filter: FilterValuesType) => {
            return () => {props.changleFilter(filter)}
        }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input  onChange = {onChangeHandler}
                        value = {title}
                        onKeyDown = {onKeyDownHandler}
                        /* ref={ref} */
                />
                <button onClick={addTask}
                
                /*      onClick={ ()=>{
                            if (ref.current) {
                                props.addTask(ref.current.value);
                                ref.current.value = ''
                            };}
                        } */
                >+</button>
            </div>
            <ul>{tasksList}</ul>
            <div>
                <button onClick = {handlerCreator('all')}>All</button>
                <button onClick = {handlerCreator('active')}>Active</button>
                <button onClick = {handlerCreator('completed')}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;