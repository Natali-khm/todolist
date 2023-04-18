import { Checkbox, IconButton } from "@mui/material"
import React, { ChangeEvent, memo } from "react"
import { EditableSpan } from "./components/EditableSpan"
import DeleteIcon from '@mui/icons-material/Delete';
import { TakStatuses, TaskResponseType } from "./api/todolist-api";
import { RequestStatusType } from "./store/app_reducer";


type TaskPropsType = {
    task: TaskResponseType
    changeTaskStatus: (taskId: string, e: ChangeEvent<HTMLInputElement>) => void
    changeTaskTitleHandler: (taskId: string, newTitle: string) => void
    removeTask: (taskId: string) => void
    tlEntityStatus: RequestStatusType
}

export const Task: React.FC<TaskPropsType> = memo(({task, changeTaskStatus, changeTaskTitleHandler, removeTask, tlEntityStatus}) => {
    console.log('task');
    
    const finalTaskStyle = 'task-default' + (task.status === TakStatuses.Completed ? ' ' + 'task-done' : ' ' + 'task')

    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e)

    const onChangeTaskTitleHandler = (newTitle: string) => changeTaskTitleHandler(task.id, newTitle)
    
    const removeTaskHandler = () => removeTask(task.id)
     
    return (
        <li className = {finalTaskStyle}>
            <Checkbox     checked = {task.status === TakStatuses.Completed}
                          onChange = {onChangeTaskStatus}
                          color = "success"
                          disabled = {tlEntityStatus === 'loading'}
                          />
            <EditableSpan title = {task.title}
                          onChange = {onChangeTaskTitleHandler}
                          disabled = {tlEntityStatus === 'loading'}
                          />
            <IconButton   aria-label = "delete" 
                          onClick = {removeTaskHandler} 
                          color = {'secondary'}
                          disabled = {tlEntityStatus === 'loading'}
                          >
                          <DeleteIcon />
            </IconButton>
        </li>                 
    )
})

