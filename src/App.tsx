import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type FilterValuesType = 'all' | 'completed' | 'active'
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    function removeTask(id: string, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todoListId] = filteredTasks

        setTasks({...tasksObj})
    }

    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todoListId]
        let newTasks = [task, ...tasks]
        tasksObj[todoListId] = newTasks

        setTasks({...tasksObj})
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let todoListTasks = tasksObj[todoListId]
        let task = todoListTasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }

    function changeTaskTitle(id: string, newTitle: string, todoListId: string) {
        let todoListTasks = tasksObj[todoListId]
        let task = todoListTasks.find(t => t.id === id)
        if (task) {
            task.title = newTitle
            setTasks({...tasksObj})
        }
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    let todoListId1 = v1()
    let todoListId2 = v1()


    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ])

    let removeTodoList = (todoListId: string) => {
        let filteredTodoList = todoLists.filter(tl => tl.id !== todoListId)
        setTodoLists(filteredTodoList)
        delete tasksObj[todoListId]
        setTasks({...tasksObj})
    }

    function changeTodoListTitle(id: string, newTitle: string) {
        const todoList = todoLists.find(tl => tl.id === id)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: 'TypeScript', isDone: true},
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'Redux', isDone: false}
        ],

        [todoListId2]: [
            {id: v1(), title: 'MacBook', isDone: false},
            {id: v1(), title: 'Iphone', isDone: false}
        ]
    })

    function addTodoList(title: string) {
        let todoList: TodoListType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setTodoLists([todoList, ...todoLists])
        setTasks({
            ...tasksObj,
            [todoList.id]: []
        })
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        Notes
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '15px'}}>
                    <AddItemForm addItem={addTodoList} id={'qwerty'}/>
                </Grid>
                <Grid container spacing={4}>
                    {
                        todoLists.map((tl) => {
                            let taskForTodoList = tasksObj[tl.id]

                            if (tl.filter === 'completed') {
                                taskForTodoList = taskForTodoList.filter(t => t.isDone === true)
                            }

                            if (tl.filter === 'active') {
                                taskForTodoList = taskForTodoList.filter(t => t.isDone === false)
                            }
                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <TodoList
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={taskForTodoList}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        filter={tl.filter}
                                        removeTodoList={removeTodoList}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}


export default App;


