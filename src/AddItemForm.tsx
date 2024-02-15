import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {Add} from "@mui/icons-material"

type AddItemFormPropsType = {
    addItem: (title: string) => void
    id: string
}

export function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            if (title.trim() !== '') {
                props.addItem(title.trim());
                setTitle('');
            } else {
                setError('Title is required');
            }
        }
    }
    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    return (
        <div>
            <TextField
                variant={'outlined'}
                label={'Type value'}
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton color={'primary'} onClick={addItem}>
                <Add />
            </IconButton>
        </div>
    )
}