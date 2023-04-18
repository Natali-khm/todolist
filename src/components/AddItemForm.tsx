import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}


const AddItemForm = React.memo (({disabled = false, ...props}: AddItemFormPropsType) => {
    console.log('add item form');

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false) // зачем здесь | null ???????

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }; 

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => { 
        error && setError(false);
        if (e.code === 'Enter') { addTask() }
    }

    const addTask = () => {
        if (title.trim()){
            props.addItem(title.trim());
        } else {
            setError(true)
        }
            setTitle('')            
        }

    // const errorMessage = error && <p style={{color: 'red'}}>The title is required</p>
    const addItemBtnStyle = {maxidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}

    return (
        <div>
            <div style = {{display: 'flex', alignItems: 'flex-end'}}> 
                <TextField id = "standard-basic" 
                           label = {error ? "The title is required" : "Create new item" }
                           size = 'small'
                           variant = "standard"
                           value = {title}
                           onChange = {onChangeHandler}
                           onKeyDown = {onKeyDownHandler}
                           error =   {error}
                           disabled={disabled}
                           />

                <Button size = 'small'
                        variant = "outlined" 
                        style = {addItemBtnStyle} 
                        onClick = {addTask}
                        disabled={disabled}>
                        +</Button>
            </div>
            {/* {errorMessage} */}
        </div>

    )
})

export default AddItemForm;