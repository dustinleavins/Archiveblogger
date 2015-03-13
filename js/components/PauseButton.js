// Copyright (c) 2015 Dustin Leavins
// See the file 'LICENSE.md' for copying permission.

var React = require('react');
var dispatcher = require('../dispatcher/AppDispatcher.js');
var store = require('../stores/AppStore.js');

var PauseButton = React.createClass({
    handleClick: function(e) {
        e.preventDefault(e);

        if (store.getPauseStart()) {
            dispatcher.dispatch({actionType: 'unpause'});
        } else {
            dispatcher.dispatch({actionType: 'pause'});
        }
    },

    render: function() {
        var pausedContent;
        if (this.props.isPaused) {
            pausedContent = 'Continue';
        } else {
            pausedContent = 'Pause';
        }

        return (
            <button onClick={this.handleClick}>{pausedContent}</button>
        );
    },
});

module.exports = PauseButton;
