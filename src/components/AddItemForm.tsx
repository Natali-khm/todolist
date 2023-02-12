import { ChangeEvent, KeyboardEvent, useState } from "react"

type AddItemFormPropsType = {
    addItem: (title: string) => void
}


function AddItemForm (props: AddItemFormPropsType) {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false);
        setTitle(e.currentTarget.value)
    }; 

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => { if (e.code === 'Enter') { addTask() }}

    const addTask = () => {
        if (title.trim()){
            props.addItem(title.trim());
        } else {
            setError(true)
        }
            setTitle('')            
        }

    const inputErrorClass = error ? 'input-error' : ''
    const errorMessage = error && <p style={{color: 'red'}}>required title</p>

    return (
        <div>
            <input  onChange = {onChangeHandler}
                    value = {title}
                    onKeyDown = {onKeyDownHandler}
                    className={inputErrorClass}
            />
            <button onClick={addTask}>+</button>
            {errorMessage}
        </div>
    )
}

export default AddItemForm;