// Copyright (c) 2015 Dustin Leavins
// See the file 'LICENSE.md' for copying permission.

var React = require('react');
var moment = require('moment');
require('moment-duration-format');

var ExportPreviousEvent = React.createClass({
    dataToMarkdown: function() {
        if (!this.props || !this.props.data) {
            return '';
        }

        var formatString = 'MMMM D, YYYY hh:mm:ss';
        var formattedDuration = moment.duration(this.props.data.duration)
            .format('hh:mm:ss', { trim: false });

        var mdContents = [];
        mdContents.push('Started: ');
        mdContents.push(this.props.data.start.format(formatString));
        mdContents.push('\n\n');

        mdContents.push('Ended: ');
        mdContents.push(this.props.data.stop.format(formatString));
        mdContents.push('\n\n');

        mdContents.push('Duration (excluding pauses): ');
        mdContents.push(formattedDuration);
        mdContents.push('\n\n');

        var posts = this.props.data.posts;
        for (var postNumber = 0; postNumber < posts.length; ++postNumber) {
            var post = posts[postNumber];
            var niceTimestamp = moment.duration(post.timestamp)
                .format('hh:mm:ss', { trim: false });

            mdContents.push(niceTimestamp);
            mdContents.push(' - ');
            mdContents.push(post.text);
            mdContents.push('\n\n');
        }

        return mdContents.join('');
    },

    handleMarkdownClick: function(evt) {
        evt.preventDefault();
        evt.target.blur();

        // Check URL creation API
        if (!URL || !URL.createObjectURL) {
            alert('Markdown export is not allowed for your browser.');
        }

        var content = ['# Testing'];
        var mdBlob = new Blob([this.dataToMarkdown()], { type: 'text/plain' });
        window.open(URL.createObjectURL(mdBlob));
    },

    render: function() {
        if (!this.props || !this.props.data) {
            return <div />;
        }

        return (
            <div>
                <button onClick={this.handleMarkdownClick}>Export to Markdown</button>
            </div>
        );
    },
});

module.exports = ExportPreviousEvent;
