import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'
import AddItemForm from './components/AddItemForm';
import { FilterValuesType, TaskType } from './App';
import { EditableSpan } from './components/EditableSpan';
import { Button } from '@mui/material';

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
    changeTaskTitle: (todoListId: string, taskId: string, newTitle: string)=>void
    changeTLTitle: (todoListId: string, newTitle: string)=>void
}



const TodoList = (props: todoListPropsType) => {

    
    /*  const onClickHandlerAll = () => {props.changleFilter('all')}
        const onClickHandlerActive = () => {props.changleFilter('active')}
        const onClickHandlerCompleted = () => {props.changleFilter('completed')}
    */

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, taskId: string) => { 
        props.changeTaskStatus(props.id, taskId, e.currentTarget.checked)
    }

    const handlerCreator = (filter: FilterValuesType) => {
        return () => {props.changleFilter(props.id, filter)}
    }

    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }

    const removeTodolistHandler = () => {props.removeTodolist(props.id)}
    const onChangeTLTitleHandler = (newTitle: string) => {props.changeTLTitle(props.id, newTitle)}
 

    let tasksList = !props.tasks.length 
    ? <span>Your to-do list is empty</span>  
    : props.tasks.map((task: TaskType) => {     
            
        const removeTask = () => {props.removeTask(props.id, task.id)}
        const onChangeTaskTitleHandler = (newTitle: string) => {props.changeTaskTitle(props.id, task.id, newTitle)}

        return (
            <li key={task.id} className={task.isDone ? 'task-done' : 'task'}>
                <input type="checkbox" 
                        checked={task.isDone}
                        onChange = {(e)=>changeTaskStatus(e, task.id)}
                        />
                <EditableSpan title={task.title} onChange={onChangeTaskTitleHandler}/>
                <Button variant="outlined" onClick={removeTask}>x</Button>
            </li>                 
            )
        });   
        
        
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={onChangeTLTitleHandler}/>
                <button onClick={removeTodolistHandler}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
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