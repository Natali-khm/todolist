import React, { ChangeEvent, useState } from "react"

type EditableSpanType = {
    title: string
    onChange: (newTitle: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanType) => { 
    console.log('editable span');
    

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }

    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode 
    ? <input onBlur={activateViewMode} 
             type="text" 
             value={title} 
             onChange={onChangeTitleHandler}
             autoFocus
             /> 
    : <span onDoubleClick={activateEditMode}>{props.title}</span>  
})
