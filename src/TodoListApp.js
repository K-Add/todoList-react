import React, { Component } from 'react'
import TodoListInput from './TodoListInput'
import TodoLists from './TodoLists'
import axios from 'axios'

class TodolistApp extends Component {
    constructor() {
        super()
        this.state = {
            todoLists: []
        }
    }
    UNSAFE_componentWillMount() {
        this._getTodoLists()
    }
    _getTodoLists() {
        axios.get('http://localhost:3000/todoLists')
            .then(res => {
                console.log("getData方法");
                const todoLists = res.data
                if (todoLists) {
                    this.setState({ todoLists })
                }
                console.log(this.state.todoLists);
            }).catch(err => {
                console.log(err);
            });
    }
    _postTodoLists(todoList) {
        axios.post('http://localhost:3000/todoLists'
            , todoList).then(res => {
                console.log("postData方法");
                this.setState({
                    todoLists: [...this.state.todoLists,res.data]
                })
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            });
    }
    _deleteTodoList(id) {
        axios.delete(`http://localhost:3000/todoLists/${id}`)
            .then(res => {
                const todoLists = this.state.todoLists
                todoLists.forEach((todoList, i) => {
                    if (todoList.id === id)
                        todoLists.splice(i, 1)
                })
                this.setState({ todoLists })
            }).catch(err => {
            });
    }
    _putTodoList(todoList) {
        console.log(todoList);
        axios.put(`http://localhost:3000/todoLists/${todoList.id}`,
            {
                "content": todoList.content,
                "finished": !todoList.finished
            }).then(res => {
                console.log(res.data);
                const todoLists = this.state.todoLists
                todoLists.forEach((todoList, i) => {
                    if(todoList.id === res.data.id) {
                        todoList.finished = res.data.finished
                    }
                })
                this.setState({todoLists})
            })
    }
    handleSubmitContent(todoList) {
        this._postTodoLists(todoList)
        console.log(this.state.todoLists)
    }
    handleDeleteTodoList(id) {
        console.log(id);
        this._deleteTodoList(id)

    }
    handleFinishTodoList(todoList) {
        console.log(todoList);
        this._putTodoList(todoList)
    }
    render() {
        return (
            <div className='wrapper'>
                <h1>Todos</h1>
                <TodoListInput
                    onSubmit={this.handleSubmitContent.bind(this)} />
                <TodoLists
                    todoLists={this.state.todoLists}
                    onDeleteTodoList={this.handleDeleteTodoList.bind(this)}
                    onFinishTodoList={this.handleFinishTodoList.bind(this)}
                />
            </div>
        )
    }
}

export default TodolistApp;