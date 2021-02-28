// Copyright (c) 2015, 2021 Dustin Leavins
// See the file 'LICENSE.md' for copying permission.

var React = require('react');
var dispatcher = require('../dispatcher/AppDispatcher.js');
var store = require('../stores/AppStore.js');

class EditPostInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTodo: ''
        }
    }

    onKeyDown(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            dispatcher.dispatch({
                actionType: 'addPost',
                text: this.state.currentTodo
            });

            this.setState({
                currentTodo: ''
            });
        }
    }

    onInputChange(e) {
        this.setState({
            currentTodo: e.target.value
        });
    }

    render() {
        if (store.getPauseStart()) {
            return <span />;
        } else {
            return (
                <input type='text' className='post-input' onKeyDown={this.onKeyDown.bind(this)} value={this.state.currentTodo} onChange={this.onInputChange.bind(this)} />
            );
        }
    }
};

module.exports = EditPostInput;
