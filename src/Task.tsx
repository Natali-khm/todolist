import { Checkbox, IconButton } from "@mui/material"
import React, { ChangeEvent, memo, useCallback } from "react"
import { TaskType } from "./AppWithRedux"
import { EditableSpan } from "./components/EditableSpan"
import DeleteIcon from '@mui/icons-material/Delete';


type TaskPropsType = {
    task: TaskType
    changeTaskStatus: (e: ChangeEvent<HTMLInputElement>, taskId: string) => void
    changeTaskTitleHandler: (taskId: string, newTitle: string) => void
    removeTask: (taskId: string) => void
}

export const Task: React.FC<TaskPropsType> = memo(({task, changeTaskStatus, changeTaskTitleHandler, removeTask}) => {
    console.log('task');
    
    const finalTaskStyle = 'task-default' + (task.isDone ? ' ' + 'task-done' : ' ' + 'task')

    const onChangeTaskStatus = (e:ChangeEvent<HTMLInputElement>) => changeTaskStatus(e, task.id)

    const onChangeTaskTitleHandler = (newTitle: string) => changeTaskTitleHandler(task.id, newTitle)
    
    const removeTaskHandler = () => removeTask(task.id)
     
    return (
        <li className = {finalTaskStyle}>
            <Checkbox     checked = {task.isDone}
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