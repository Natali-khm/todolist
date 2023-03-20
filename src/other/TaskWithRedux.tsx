import { Checkbox, IconButton } from "@mui/material"
import React, { ChangeEvent, memo, useCallback } from "react"
import { TaskType } from "../AppWithRedux"
import { EditableSpan } from "../components/EditableSpan"
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux";
import { RootStateType } from "../store/store";
import { useDispatch } from "react-redux";
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "../store/tasksState_reducer";


type TaskPropsType = {
    task: TaskType
    // changeTaskStatus: (e: ChangeEvent<HTMLInputElement>, taskId: string) => void
    // changeTaskTitleHandler: (taskId: string, newTitle: string) => void
    // removeTask: (taskId: string) => void
    tlId: string
}

export const TaskWithRedux: React.FC<TaskPropsType> = memo(({task, tlId}) => {
    console.log('TaskWithRedux');
    const dispatch = useDispatch()

    const finalTaskStyle = 'task-default' + (task.isDone ? ' ' + 'task-done' : ' ' + 'task')

    const onChangeTaskStatus = (e:ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(tlId, task.id, e.currentTarget.checked))

    const onChangeTaskTitleHandler = useCallback((newTitle: string) => dispatch(changeTaskTitleAC(tlId, task.id, newTitle)), [tlId, task.id])

    const removeTaskHandler = () => dispatch(removeTaskAC(tlId, task.id))

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