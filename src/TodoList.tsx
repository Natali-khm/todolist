import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'
import { FilterValuesType, TaskType } from './App';

type todoListPropsType = {
    title: string;
    tasks: Array <TaskType>;
    removeTask: (taskId: string)=>void
    changleFilter: (filterValue: FilterValuesType)=>void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean)=>void
    filter: FilterValuesType
}



const TodoList = (props: todoListPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    /*     const ref = useRef<HTMLInputElement>(null); */    

    let tasksList = !props.tasks.length 
    ? <span>Your to-do list is empty</span>  
    : props.tasks.map((task: TaskType) => {     
            
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => { props.changeTaskStatus(task.id, e.currentTarget.checked)}
        const removeTask = () => {props.removeTask(task.id)}

        return(
            <li key={task.id} className={task.isDone ? 'task-done' : 'task'}>
                <input type="checkbox" 
                        checked={task.isDone}
                        onChange = {changeTaskStatus}
                />
                <span>{task.title}</span>
                <button onClick={removeTask}>x</button>
            </li>                 
            )
        });         
         
    const addTask = () => {
        if (title.trim()){
            props.addTask(title.trim());
        } else {
            setError(true)
        }
            setTitle('')            
        }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false);
        setTitle(e.currentTarget.value)
    }; 
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => { if (e.code === 'Enter') { addTask() }}

    /*  const onClickHandlerAll = () => {props.changleFilter('all')}
        const onClickHandlerActive = () => {props.changleFilter('active')}
        const onClickHandlerCompleted = () => {props.changleFilter('completed')}
    */

    const handlerCreator = (filter: FilterValuesType) => {
            return () => {props.changleFilter(filter)}
        }
    const inputErrorClass = error ? 'input-error' : ''

    const errorMessage = error && <p style={{color: 'red'}}>required title</p>
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input  onChange = {onChangeHandler}
                        value = {title}
                        onKeyDown = {onKeyDownHandler}
                        className={inputErrorClass}
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
                {errorMessage}
            </div>
            <ul>{tasksList}</ul>
            <div>
                <button className = {props.filter === 'all' ? 'btn-active' : ''}
                        onClick = {handlerCreator('all')}>All</button>
                <button className = {props.filter === 'active' ? 'btn-active' : ''}
                        onClick = {handlerCreator('active')}>Active</button>
                <button className = {props.filter === 'completed' ? 'btn-active' : ''}
                        onClick = {handlerCreator('completed')}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;