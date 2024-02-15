import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string;
    tasks: Array<TaskType>
    removeTask: (TaskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void

    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}

export function TodoList(props: PropsType) {

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }

    const AddTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                <Delete onClick={removeTodoList}>x</Delete>
            </h3>
            <AddItemForm id={props.id} addItem={AddTask}/>
            <div>
                {
                    props.tasks.map(t => {
                            const onClickHandler = () => props.removeTask(t.id, props.id)
                            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                let newIsDoneValue = e.currentTarget.checked
                                props.changeTaskStatus(t.id, newIsDoneValue, props.id)
                            }

                            const onChangeTitleHandler = (newValue: string) => {
                                props.changeTaskTitle(t.id, newValue, props.id)
                            }

                            return (
                                <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                                    <Checkbox
                                        color={'secondary'}
                                        onChange={onChangeStatusHandler}
                                        checked={t.isDone}/>
                                    <EditableSpan
                                        title={t.title}
                                        onChange={onChangeTitleHandler}/>
                                    <IconButton onClick={onClickHandler}>
                                        <Delete/>
                                    </IconButton>
                                </div>
                            )
                        }
                    )
                }
            </div>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button color={"primary"} variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={'secondary'} variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}

