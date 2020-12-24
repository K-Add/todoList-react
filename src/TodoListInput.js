import React, { Component } from 'react';
import PropTypes from 'prop-types'

class TodoListInput extends Component {
    static propTypes = {
        onSubmit: PropTypes.func
    }
    constructor() {
        super()
        this.state = {
            content: '',
            finished:''
        }
    }
    handleContentChange(event) {
        this.setState({
            content: event.target.value
        })

    }
    handleSubmit() {
        if (this.props.onSubmit) {
            const { content } = this.state
            const finished = false
            this.props.onSubmit({ content, finished })
        }
        this.setState({ content: '' })
    }
    render() {
        return (
            <div className='todoListInput'>

                <input type='text' placeholder='Add Todo Item'
                    // ref={(content) => this.content = content}
                    className='textInput' value={this.state.content}
                    onChange={this.handleContentChange.bind(this)} />
                <button className='btnAdd'
                    onClick={this.handleSubmit.bind(this)} >
                    Add Todo</button>
            </div>
        );
    }
}
export default TodoListInput;