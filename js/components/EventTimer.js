// Copyright (c) 2015, 2021 Dustin Leavins
// See the file 'LICENSE.md' for copying permission.

var React = require('react');
var moment = require('moment');
var AppStore = require('../stores/AppStore.js');

require('moment-duration-format');

class EventTimer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            elapsedTime: 0
        }
    }

    _onTimer() {
        this.setState({
            elapsedTime: AppStore.getElapsedTime(),
        });
    }

    componentDidMount() {
        this._interval = setInterval(this._onTimer.bind(this), 500);
    }

    componentWillUnmount() {
        clearInterval(this._interval);
    }

    render() {
        var time = moment.duration(this.state.elapsedTime)
                .format('hh:mm:ss', { trim: false });

        return (
            <span>{time}</span>
        );
    }
};

module.exports = EventTimer;
