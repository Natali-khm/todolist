import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'
import { FilterValuesType, TaskType } from './App';

type todoListPropsType = {
    title: string;
    tasks: Array <TaskType>;
    removeTask: (todoListId: string, taskId: string)=>void
    changleFilter: (todoListId: string, filterValue: FilterValuesType)=>void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, newStatus: boolean)=>void
    filter: FilterValuesType
    id: string
    removeTodolist: (todoListId: string)=>void
}



const TodoList = (props: todoListPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    /*     const ref = useRef<HTMLInputElement>(null); */    

        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, taskId: string) => { 
            
            props.changeTaskStatus(props.id, taskId, e.currentTarget.checked)
        }


    let tasksList = !props.tasks.length 
    ? <span>Your to-do list is empty</span>  
    : props.tasks.map((task: TaskType) => {     
            
        const removeTask = () => {props.removeTask(props.id, task.id)}

        return (
            <li key={task.id} className={task.isDone ? 'task-done' : 'task'}>
                <input type="checkbox" 
                        checked={task.isDone}
                        onChange = {(e)=>changeTaskStatus(e, task.id)}
                />
                <span>{task.title}</span>
                <button onClick={removeTask}>x</button>
            </li>                 
            )
        });         
         

    const addTask = () => {
        if (title.trim()){
            props.addTask(props.id, title.trim());
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
            return () => {props.changleFilter(props.id, filter)}
        }

    const inputErrorClass = error ? 'input-error' : ''

    const errorMessage = error && <p style={{color: 'red'}}>required title</p>

    const removeTodolistHandler = () => {props.removeTodolist(props.id)}

    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodolistHandler}>x</button>
            </h3>
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