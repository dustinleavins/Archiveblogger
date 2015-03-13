// Copyright (c) 2015 Dustin Leavins
// See the file 'LICENSE.md' for copying permission.

var React = require('react');
var moment = require('moment');
var AppStore = require('../stores/AppStore.js');

require('moment-duration-format');

var EventTimer = React.createClass({
    getInitialState: function() {
        return {
            elapsedTime: 0,
        };
    },

    _onTimer: function() {
        this.setState({
            elapsedTime: AppStore.getElapsedTime(),
        });
    },

    componentDidMount: function() {
        this._interval = setInterval(this._onTimer, 500);
    },

    componentWillUnmount: function() {
        clearInterval(this._interval);
    },

    render: function() {
        var time = moment.duration(this.state.elapsedTime)
                .format('hh:mm:ss', { trim: false });

        return (
            <span>{time}</span>
        );
    },
});

module.exports = EventTimer;
