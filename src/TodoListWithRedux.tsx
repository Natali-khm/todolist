import React, { ChangeEvent, KeyboardEvent, useCallback, useRef, useState } from 'react'
import AddItemForm from './components/AddItemForm';
import { FilterValuesType, TaskType } from './AppWithRedux';
import { EditableSpan } from './components/EditableSpan';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import { useSelector } from 'react-redux';
import { RootStateType } from './store/store';
import { useDispatch } from 'react-redux';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './store/tasksState_reducer';
import { changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC } from './store/todolists_reducer';
import { TaskWithRedux } from './other/TaskWithRedux';
import { ButtonContainer } from './ButtonContainer';
import { Task } from './Task';

type todoListPropsType = {
    title: string;
    filter: FilterValuesType
    tlId: string
}



const TodoListWithRedux = (props: todoListPropsType) => {
    console.log('todo');

    const tasks = useSelector<RootStateType, TaskType[]>(state => state.tasks[props.tlId])
    const dispatch = useDispatch()

    // ------------- filtered tasks -------------//

    const getFilteredTasks = (tasks: TaskType[], filter: FilterValuesType) => {

        switch (filter) {
            case 'active': return tasks.filter(task => !task.isDone);
            case 'completed': return tasks.filter(task => task.isDone);
            default: return tasks;
        }    
    };
        
    const filteredTasks = getFilteredTasks(tasks, props.filter);


    // ------------- tasks for render-------------//
        
    const removeTask = useCallback((taskId: string) => dispatch(removeTaskAC(props.tlId, taskId)), [props.tlId])

    const changeTaskTitleHandler = useCallback((newTitle: string, taskId: string) => {
        dispatch(changeTaskTitleAC(props.tlId, taskId, newTitle))}, [props.tlId])
    
    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>, taskId: string) => { 
        dispatch(changeTaskStatusAC(props.tlId, taskId, e.currentTarget.checked))}, [props.tlId])


    let tasksList = !tasks.length 
    ? <span>Your to-do list is empty</span>  
    : filteredTasks.map((task: TaskType) => {

        return <Task key = {task.id}
                              task = {task}
                              changeTaskStatus = {changeTaskStatus}
                              changeTaskTitleHandler = {changeTaskTitleHandler}
                              removeTask = {removeTask}
                            //   tlId = {props.tlId}  // for TaskWithRedux
               />
    });   


    // ------------- handlers -------------//

    const removeTodolistHandler = () => dispatch(removeTodoListAC(props.tlId))

    const changeTLTitleHandler = useCallback((newTitle: string) => dispatch(changeTodoListTitleAC(props.tlId, newTitle)), [props.tlId])

    const addTask = useCallback((title: string) => dispatch(addTaskAC(props.tlId, title)), [])

    // ------------- filter buttons-------------//

    const onClickHandlerAll = useCallback(() => dispatch(changeTodoListFilterAC(props.tlId, 'all')), [props.tlId])

    const onClickHandlerActive = useCallback(() => dispatch(changeTodoListFilterAC(props.tlId, 'active')), [props.tlId])

    const onClickHandlerCompleted = useCallback(() => dispatch(changeTodoListFilterAC(props.tlId, 'completed')), [props.tlId])
      
    // ------------- return --------------------//

    return (
        <div>
            <h3 style={{display: 'flex', justifyContent: 'space-between'}}>
                <EditableSpan title={props.title} onChange={changeTLTitleHandler}/>
                <IconButton aria-label="delete" onClick={removeTodolistHandler} style={{color: '#f07d7d'}}>
                    <DeleteIcon />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul className='taskBlock'>{tasksList}</ul>
            <div>
                <ButtonContainer title = {'All'}
                                 changeFilter = {onClickHandlerAll}
                                 variant = {props.filter === 'all' ? 'contained':"outlined"}
                />
                <ButtonContainer title = {'Active'}
                                 changeFilter = {onClickHandlerActive}
                                 variant = {props.filter === 'active' ? 'contained':"outlined"}
                />
                <ButtonContainer title = {'Completed'}
                                 changeFilter = {onClickHandlerCompleted}
                                 variant = {props.filter === 'completed' ? 'contained':"outlined"}
                />
            </div>
        </div>
    )
}



export default TodoListWithRedux;