// Copyright (c) 2015 Dustin Leavins
// See the file 'LICENSE.md' for copying permission.

var React = require('react');
var dispatcher = require('../dispatcher/AppDispatcher.js');
var store = require('../stores/AppStore.js');

var EditPostInput = React.createClass({
    getInitialState: function() {
        return {
            currentTodo: ''
        };
    },

    onKeyDown: function(e) {
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
    },

    onInputChange: function(e) {
        this.setState({
            currentTodo: e.target.value
        });
    },

    render: function() {
        if (store.getPauseStart()) {
            return <span />;
        } else {
            return (
                <input type='text' className='post-input' onKeyDown={this.onKeyDown} value={this.state.currentTodo} onChange={this.onInputChange} />
            );
        }
    },
});

module.exports = EditPostInput;
