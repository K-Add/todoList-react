import React, { Component } from 'react';
import PropTypes from 'prop-types'

class TodoListContent extends Component {
    static prpTypes = {
        todoList: PropTypes.object.isRequired,
        onDeleteTodoList: PropTypes.func,
        id: PropTypes.number,
        finished: PropTypes.bool
    }
    handleDeleteTodoList() {
        if (this.props.onDeleteTodoList) {
            this.props.onDeleteTodoList(this.props.id)
        }
    }
    handleFinishTodoList() {
        if (this.props.onFinishTodoList) {
            this.props.onFinishTodoList(this.props.todoList)
        }
    }
    render() {
        const isFinisehed = `editable ${this.props.finished?'finished':''}`
        return (
            <div className='todoListContent'>
                <input type='checkbox' 
                    onChange={this.handleFinishTodoList.bind(this)} 
                    checked={this.props.finished}    />
                <span className={isFinisehed}>{this.props.todoList.content}</span>
                <button className='delete'
                    onClick={this.handleDeleteTodoList.bind(this)}>
                    Delete
                </button>
            </div>
        );
    }
}

export default TodoListContent;