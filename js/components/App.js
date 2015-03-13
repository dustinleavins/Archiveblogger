// Copyright (c) 2015 Dustin Leavins
// See the file 'LICENSE.md' for copying permission.

var React = require('react');
var moment = require('moment');
var objAssign = require('object-assign');

require('moment-duration-format');

var dispatcher = require('../dispatcher/AppDispatcher.js');

var store = require('../stores/AppStore.js');

var PreviousEvent = require('./PreviousEvent.js');

var EditPostInput = require('./EditPostInput.js');

var PauseButton = require('./PauseButton.js');

var EventTimer = require('./EventTimer.js');

var App = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        if (store.getStart() !== null) {
            dispatcher.dispatch({actionType: 'stop'});
        } else {
            dispatcher.dispatch({actionType: 'start'});
        }
    },

    getInitialState: function() {
        return this._generateState();
    },


    render: function() {
        if (this.state.isInEditMode) {
            return (
                <form onSubmit={this.handleSubmit}>
                    <p><EventTimer /></p>
                    <p><EditPostInput /></p>
                    <p><PauseButton isPaused={this.state.isPaused}/></p>
                    <p>
                        <button className='red'>Stop!</button>
                    </p>
                </form>
            );
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <button>Start Event!</button>
                    </p>

                    <PreviousEvent data={this.state.previousEvent} />
                </form>
            );
        };
    },

    componentDidMount: function() {
        store.on('start', this._onChange);
        store.on('stop', this._onChange);
        store.on('pauseChanged', this._onChange);
    },

    componentDidUnmount: function() {
        store.removeListener('start', this._onChange);
        store.removeListener('stop', this._onChange);
        store.removeListener('pauseChanged', this._onChange);
    },

    _onChange: function(eventObj) {
        var newState;
        if (eventObj) {
            newState = objAssign(this._generateState(), {
                previousEvent: {
                    start: eventObj.start,
                    stop: eventObj.stop,
                    posts: eventObj.posts,
                    duration: eventObj.duration,
                },
            });
        } else {
            newState = this._generateState();
        }

        this.setState(newState);
    },

    _generateState: function() {
        return {
            isInEditMode: store.getStart() !== null,
            isPaused: store.getPauseStart() !== null,
            posts: store.getPosts(),

        };
    }
});

module.exports = App;
