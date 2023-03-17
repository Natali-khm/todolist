import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'
import AddItemForm from './components/AddItemForm';
import { FilterValuesType, TaskType } from './AppWithRedux';
import { EditableSpan } from './components/EditableSpan';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import { useSelector } from 'react-redux';
import { RootStateType } from './store/store';
import { TasksStateType } from './AppWithRedux';
import { useDispatch } from 'react-redux';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './store/tasksState_reducer';
import { changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC } from './store/todolists_reducer';

type todoListPropsType = {
    title: string;
    filter: FilterValuesType
    tlId: string
}



const TodoListWithRedux = (props: todoListPropsType) => {

    const tasks = useSelector<RootStateType, TaskType[]>(state => state.tasks[props.tlId])
    const dispatch = useDispatch()

    // ------------- filtered tasks -------------//

    const getFilteredTasksForRender = (tasks: TaskType[], filter: FilterValuesType) => {

        switch (filter) {
            case 'active': return tasks.filter(task => !task.isDone);
            case 'completed': return tasks.filter(task => task.isDone);
            default: return tasks;
        }    
    };
        
    const filteredTasksForRender = getFilteredTasksForRender(tasks, props.filter);

    // ------------- tasks for render-------------//

    let tasksList = !tasks.length 
    ? <span>Your to-do list is empty</span>  
    : filteredTasksForRender.map((task: TaskType) => {     
            
        const removeTask = () => dispatch(removeTaskAC(props.tlId, task.id))
        const changeTaskTitleHandler = (newTitle: string) => dispatch(changeTaskTitleAC(props.tlId, task.id, newTitle))
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, taskId: string) => { 
            dispatch(changeTaskStatusAC(props.tlId, taskId, e.currentTarget.checked))
        }
        const finalTaskStyle = 'task-default' + (task.isDone ? ' ' + 'task-done' : ' ' + 'task');

        return (
            <li key={task.id} className={finalTaskStyle}>
                <Checkbox checked={task.isDone}
                          onChange = {(e)=>changeTaskStatus(e, task.id)}
                          color="success"
                          />
                <EditableSpan title={task.title} onChange={changeTaskTitleHandler}/>
                <IconButton aria-label="delete" onClick={removeTask} style={{marginLeft: 'auto', color: '#eda4a4'}}>
                    <DeleteIcon />
                </IconButton>
            </li>                 
            )
        });   

    // const handlerCreator = (filter: FilterValuesType) => {
    //     return () => {props.changeTodoListFilter(props.tlId, filter)}
    // }

    // ------------- handler -------------//

    const removeTodolistHandler = () => dispatch(removeTodoListAC(props.tlId))
    const onChangeTLTitleHandler = (newTitle: string) => dispatch(changeTodoListTitleAC(props.tlId, newTitle))

    const addTask = (title: string) => dispatch(addTaskAC(props.tlId, title))

    // ------------- filter -------------//

    const onClickHandlerAll = () => dispatch(changeTodoListFilterAC(props.tlId, 'all'))
    const onClickHandlerActive = () => dispatch(changeTodoListFilterAC(props.tlId, 'active'))
    const onClickHandlerCompleted = () => dispatch(changeTodoListFilterAC(props.tlId, 'completed'))
      
    // ------------- return -------------//

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
                <Button onClick={onClickHandlerAll}       variant={props.filter === 'all' ? 'contained':"outlined"}>       All</Button>
                <Button onClick={onClickHandlerActive}    variant={props.filter === 'active' ? 'contained':"outlined"}>    Active</Button>
                <Button onClick={onClickHandlerCompleted} variant={props.filter === 'completed' ? 'contained':"outlined"}> Completed</Button>
            </div>
        </div>
    )
}

export default TodoListWithRedux;