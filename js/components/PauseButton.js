// Copyright (c) 2015, 2021 Dustin Leavins
// See the file 'LICENSE.md' for copying permission.

var React = require('react');
var dispatcher = require('../dispatcher/AppDispatcher.js');
var store = require('../stores/AppStore.js');

class PauseButton extends React.Component{
    handleClick(e) {
        e.preventDefault(e);

        if (store.getPauseStart()) {
            dispatcher.dispatch({actionType: 'unpause'});
        } else {
            dispatcher.dispatch({actionType: 'pause'});
        }
    }

    render() {
        var pausedContent;
        if (this.props.isPaused) {
            pausedContent = 'Continue';
        } else {
            pausedContent = 'Pause';
        }

        return (
            <button onClick={this.handleClick}>{pausedContent}</button>
        );
    }
};

module.exports = PauseButton;
