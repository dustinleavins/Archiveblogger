// Copyright (c) 2015 Dustin Leavins
// See the file 'LICENSE.md' for copying permission.

var React = require('react');
var moment = require('moment');
require('moment-duration-format');

var ExportPreviousEvent = require('./ExportPreviousEvent.js');

var PreviousEvent = React.createClass({
    _item: function(post) {
        var niceTimestamp = moment.duration(post.timestamp)
            .format('hh:mm:ss', { trim: false });
        return (
            <p key={post.timestamp}>{niceTimestamp} - {post.text}</p>
        );
    },

    render: function() {
        if (this.props.data && this.props.data.posts) {
            var formatString = 'MMMM D, YYYY hh:mm:ss';
            var formattedDuration = moment.duration(this.props.data.duration)
                .format('hh:mm:ss', { trim: false });

            return (
                <div>
                    <h2>Previous Event</h2>
                    <ExportPreviousEvent data={this.props.data} />
                    <p>Started: {this.props.data.start.format(formatString)}</p>
                    <p>Ended: {this.props.data.stop.format(formatString)}</p>
                    <p>Duration (excluding pauses): {formattedDuration}</p>
                    <div>
                        {this.props.data.posts.map(this._item)}
                    </div>
                </div>
            );
        } else {
            return <div />
        }
    }
});

module.exports = PreviousEvent;
