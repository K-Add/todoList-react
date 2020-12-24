import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TodoListContent from './TodoListContent';

class TodoLists extends Component {
    static propTypes = {
        todoLists: PropTypes.array,
        onDeleteTodoList: PropTypes.func
    }
    static defaultProps = {
        todoLists: []
    }
    handleDeleteTodoList(id) {
        if (this.props.onDeleteTodoList) {
            this.props.onDeleteTodoList(id)
        }
    }
    handleFinishTodoList(todoList) {
        if (this.props.onFinishTodoList) {
            this.props.onFinishTodoList(todoList)
        }
    }
    render() {

        return (
            <div className='todoLists'>{
                this.props.todoLists.map(todoList =>
                    <TodoListContent
                        todoList={todoList}
                        key={todoList.id}
                        id={todoList.id}
                        finished={todoList.finished}
                        onDeleteTodoList={this.handleDeleteTodoList.bind(this)}
                        onFinishTodoList={this.handleFinishTodoList.bind(this)}
                    />)
            }
            </div>
        );
    }
}

export default TodoLists; 