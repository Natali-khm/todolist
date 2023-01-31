import React, { useState } from 'react'
import { v1 } from 'uuid'
import TodoList_rewrite from './TodoList_rewrite'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValue = 'all' | 'active' | 'completed'

const App_rewrite = () => {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'to bye a book', isDone: false},
        {id: v1(), title: 'to call a friend', isDone: true},
        {id: v1(), title: '01.02.23 happy birth Nastya', isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValue>('all')

    const removeTask = (taskId: string) => { 
        let newTasks = tasks.filter(t => t.id !== taskId);
        setTasks(newTasks)
    }

    const addNewTask = (title: string) => {
        const newTask = {id: v1(), title, isDone: false};
        setTasks([newTask, ...tasks]);
    }

    const changeTaskStatus = (taskId: string, newStatus: boolean) => {
        let newTasks = tasks.map(t=> t.id === taskId ? {...t, isDone: newStatus} : t);
        setTasks(newTasks)
    }

    const getFilteredTasks = (tasks: TaskType[], filter: FilterValue) => {

        if (filter === 'active') {return tasks.filter(t=> !t.isDone)}
        else if (filter === 'completed') {return tasks.filter(t=> t.isDone)};
        return tasks;
    }

    const filteredTasks = getFilteredTasks(tasks, filter)

  return <TodoList_rewrite  tasks={filteredTasks} 
                            removeTask={removeTask} 
                            addNewTask={addNewTask} 
                            changeTaskStatus={changeTaskStatus}
                            setFilter = {setFilter}
                            />
}

export default App_rewrite;