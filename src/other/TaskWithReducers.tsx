import { Checkbox, IconButton } from "@mui/material"
import React, { ChangeEvent, memo, useCallback } from "react"
import { EditableSpan } from "../components/EditableSpan"
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "../store/tasksState_reducer";
import { TakStatuses, TaskResponseType } from "../api/todolist-api";


type TaskPropsType = {
    task: TaskResponseType
    // changeTaskStatus: (e: ChangeEvent<HTMLInputElement>, taskId: string) => void
    // changeTaskTitleHandler: (taskId: string, newTitle: string) => void
    // removeTask: (taskId: string) => void
    tlId: string
}

export const TaskWithReducers: React.FC<TaskPropsType> = memo(({task, tlId}) => {
    console.log('TaskWithReducers');
    const dispatch = useDispatch()

    const finalTaskStyle = 'task-default' + (task.status ? ' ' + 'task-done' : ' ' + 'task')

    const onChangeTaskStatus = (e:ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(tlId, task.id, e.currentTarget.checked ? TakStatuses.Completed : TakStatuses.New))

    const onChangeTaskTitleHandler = useCallback((newTitle: string) => dispatch(changeTaskTitleAC(tlId, task.id, newTitle)), [tlId, task.id])

    const removeTaskHandler = () => dispatch(removeTaskAC(tlId, task.id))

    return (
        <li className = {finalTaskStyle}>
            <Checkbox     checked = {!!task.status}
                          onChange = {onChangeTaskStatus}
                          color = "success"
                          />
            <EditableSpan title = {task.title}
                          onChange = {onChangeTaskTitleHandler}
                          />
            <IconButton   aria-label = "delete" 
                          onClick = {removeTaskHandler} 
                          style = {{marginLeft: 'auto', color: '#eda4a4'}}
                          >
                          <DeleteIcon />
            </IconButton>
        </li>                 
    )
})