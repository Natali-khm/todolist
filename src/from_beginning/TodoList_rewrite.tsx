import { ChangeEvent, ChangeEventHandler, KeyboardEvent, useState } from "react"
import { TaskType } from "../App"
import { FilterValue } from "./App_rewrite"

type TodoListPropsType = {
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    addNewTask: (title:string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean) => void
    setFilter: (filter: FilterValue) => void
}

const TodoList_rewrite: React.FC<TodoListPropsType> = (props) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const tasksMapped = props.tasks.map((t) => {

        const onClickHandler = () => {props.removeTask(t.id)};
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {props.changeTaskStatus(t.id, e.currentTarget.checked)}

        return <li key={t.id}>
                  <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                  <span>{t.title}</span>
                  <button onClick={onClickHandler}>x</button>
               </li>;
        }
    );


    const titles = !props.tasks.length ? 'no tasks' : tasksMapped;

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addNewTaskHandler = () => {
        if (title.trim()) {props.addNewTask(title.trim())}
        else {setError(true)};
        setTitle('')
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.key === 'Enter') {addNewTaskHandler()} 
    }

    const handleFilter = (filter: FilterValue) => {props.setFilter(filter)}

    return (
        <div>
            <div>
                <input  type="text" 
                        value={title} 
                        onChange={onChangeHandler}
                        onKeyDown={onKeyDownHandler}
                        />
                <button onClick={addNewTaskHandler}>+</button>
                {error && <span>error</span>}
            </div>
            <ul>{titles}</ul>
            <div>
                <button onClick={()=>handleFilter('all')}>all</button>
                <button onClick={()=>handleFilter('active')}>active</button>
                <button onClick={()=>handleFilter('completed')}>completed</button>
            </div>
        </div>
    )
}

export default TodoList_rewrite;