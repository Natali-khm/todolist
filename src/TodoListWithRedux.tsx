import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'
import AddItemForm from './components/AddItemForm';
import { FilterValuesType, TaskType } from './other/AppWithReducers';
import { EditableSpan } from './components/EditableSpan';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';

type todoListPropsType = {
    title: string;
    tasks: Array <TaskType>;
    removeTask: (todoListId: string, taskId: string)=>void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, newStatus: boolean)=>void
    filter: FilterValuesType
    id: string
    changeTodoListFilter: (todoListId: string, filterValue: FilterValuesType)=>void
    changeTaskTitle: (todoListId: string, taskId: string, newTitle: string)=>void
    changeTodoListTitle: (todoListId: string, newTitle: string)=>void
    removeTodolist: (todoListId: string) => void
}



const TodoListWithRedux = (props: todoListPropsType) => {

    
    /*  const onClickHandlerAll = () => {props.changleFilter('all')}
        const onClickHandlerActive = () => {props.changleFilter('active')}
        const onClickHandlerCompleted = () => {props.changleFilter('completed')}
    */

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, taskId: string) => { 
        props.changeTaskStatus(props.id, taskId, e.currentTarget.checked)
    }

    const handlerCreator = (filter: FilterValuesType) => {
        return () => {props.changeTodoListFilter(props.id, filter)}
    }

    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }

    const removeTodolistHandler = () => props.removeTodolist(props.id)
    const onChangeTLTitleHandler = (newTitle: string) => props.changeTodoListTitle(props.id, newTitle)
 

    let tasksList = !props.tasks.length 
    ? <span>Your to-do list is empty</span>  
    : props.tasks.map((task: TaskType) => {     
            
        const removeTask = () => props.removeTask(props.id, task.id)
        const onChangeTaskTitleHandler = (newTitle: string) => props.changeTaskTitle(props.id, task.id, newTitle)
        const finalTaskStyle = 'task-default' + (task.isDone ? ' ' + 'task-done' : ' ' + 'task');

        return (
            <li key={task.id} className={finalTaskStyle}>
                <Checkbox checked={task.isDone}
                          onChange = {(e)=>changeTaskStatus(e, task.id)}
                          color="success"
                          />
                <EditableSpan title={task.title} onChange={onChangeTaskTitleHandler}/>
                <IconButton aria-label="delete" onClick={removeTask} style={{marginLeft: 'auto', color: '#eda4a4'}}>
                    <DeleteIcon />
                </IconButton>
            </li>                 
            )
        });   
        
        
    return (
        <div>
            <h3 style={{display: 'flex', justifyContent: 'space-between'}}>
                <EditableSpan title={props.title} onChange={onChangeTLTitleHandler}/>
                <IconButton aria-label="delete" onClick={removeTodolistHandler} style={{color: '#f07d7d'}}>
                    <DeleteIcon />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul className='taskBlock'>{tasksList}</ul>
            <div>
                <Button onClick={handlerCreator('all')} variant={props.filter === 'all' ? 'contained':"outlined"}>All</Button>
                <Button onClick={handlerCreator('active')} variant={props.filter === 'active' ? 'contained':"outlined"}>Active</Button>
                <Button onClick={handlerCreator('completed')} variant={props.filter === 'completed' ? 'contained':"outlined"} >Completed</Button>
            </div>
        </div>
    )
}

export default TodoListWithRedux;