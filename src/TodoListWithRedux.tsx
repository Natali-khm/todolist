import { ChangeEvent, useCallback, useEffect } from 'react'
import AddItemForm from './components/AddItemForm';
import { EditableSpan } from './components/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useSelector } from 'react-redux';
import { RootStateType } from './store/store';
import { addTaskTC, fetchTasks, removeTaskTC, updateTaskTC } from './store/tasksState_reducer';
import { changeTodoListFilterAC, changeTodoListTitleTC, FilterValuesType, removeTodoListTC } from './store/todolists_reducer';
import { ButtonContainer } from './ButtonContainer';
import { Task } from './Task';
import { TakStatuses, TaskResponseType } from './api/todolist-api';
import { useAppDispatch } from './store/hooks';

type todoListPropsType = {
    title: string;
    filter: FilterValuesType
    tlId: string
}



const TodoListWithRedux = (props: todoListPropsType) => {
    console.log('todo');

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTasks(props.tlId))
    }, [])
    
    const tasks = useSelector<RootStateType, TaskResponseType[]>(state => state.tasks[props.tlId])

    // ------------- filtered tasks -------------//

    const getFilteredTasks = (tasks: TaskResponseType[], filter: FilterValuesType) => {

        switch (filter) {
            case 'active': return tasks.filter(task => task.status === TakStatuses.New);
            case 'completed': return tasks.filter(task => task.status === TakStatuses.Completed);
            default: return tasks;
        }    
    };
    
    const filteredTasks = getFilteredTasks(tasks, props.filter);


    // ------------- tasks for render-------------//
        
    const removeTask = useCallback((taskId: string) => {
        dispatch(removeTaskTC(props.tlId, taskId))
    }, [props.tlId])

    const changeTaskTitleHandler = useCallback((taskId: string, newTitle: string) => {
        dispatch(updateTaskTC(props.tlId, taskId, { title: newTitle }))}, [props.tlId])
    
    const changeTaskStatus = useCallback((taskId: string, e: ChangeEvent<HTMLInputElement>) => { 
        dispatch(updateTaskTC(props.tlId, taskId, {status: e.currentTarget.checked ? TakStatuses.Completed : TakStatuses.New}))}, [props.tlId])


    let tasksList = !tasks.length 
    ? <span>Your to-do list is empty</span>  
    : filteredTasks.map((task: TaskResponseType) => {

        return <Task key = {task.id}
                     task = {task}
                     changeTaskStatus = {changeTaskStatus}
                     changeTaskTitleHandler = {changeTaskTitleHandler}
                     removeTask = {removeTask}
                     //   tlId = {props.tlId}  // for TaskWithRedux
               />
    });   


    // ------------- handlers -------------//

    const removeTodolistHandler = () => dispatch(removeTodoListTC(props.tlId))

    const changeTLTitleHandler = useCallback((newTitle: string) => dispatch(changeTodoListTitleTC(props.tlId, newTitle)), [props.tlId])

    const addTask = useCallback((title: string) => dispatch(addTaskTC(props.tlId, title)), [])

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