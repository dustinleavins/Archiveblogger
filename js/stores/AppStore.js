// Copyright (c) 2015 Dustin Leavins
// See the file 'LICENSE.md' for copying permission.

var moment = require('moment');
var objAssign = require('object-assign');
var events = require('events');
var dispatcher = require('../dispatcher/AppDispatcher.js');

var AppStore = objAssign({}, events.EventEmitter.prototype, {
    _start: null,
    _posts: [],
    _timePaused: 0,
    _pauseStart: null,

    getStart: function() {
        return this._start;
    },

    getPosts: function() {
        return this._posts;
    },

    getPauseStart: function() {
        return this._pauseStart;
    },

    getElapsedTime: function() {
        if (this._pauseStart) {
            return this._pauseStart.diff(this._start) - this._timePaused;
        } else {
            return moment().diff(this._start) - this._timePaused;
        }
    },
});

dispatcher.register(function(action) {
    switch(action.actionType) {
        case 'start':
            AppStore._start = moment();
            AppStore._posts = [];
            AppStore._pauseStart = null;
            AppStore._timePaused = 0;
            AppStore.emit('start');
            break;
        case 'stop':
            var stopTime;

            if (AppStore._pauseStart) {
                stopTime = AppStore._pauseStart;
                AppStore._pauseStart = null;
            } else {
                stopTime = moment();
            }

            var eventObj = {
                start: AppStore._start,
                stop: stopTime,
                posts: AppStore._posts,
                duration: stopTime.diff(AppStore._start) - AppStore._timePaused,
            };

            AppStore._start = null;
            AppStore.emit('stop', eventObj);
            break;
        case 'addPost':
            var timestamp = moment().diff(AppStore._start) - AppStore._timePaused;
            var newPost = {
                text: action.text,
                timestamp: timestamp,
            };

            AppStore._posts.push(newPost);
            AppStore.emit('addPost');
            break;
        case 'pause':
            if (AppStore._pauseStart) {
                return; // already paused
            }

            AppStore._pauseStart = moment();
            AppStore.emit('pauseChanged');
            break;
        case 'unpause':
            if (!AppStore._pauseStart) {
                return; // already unpaused
            }

            AppStore._timePaused += moment().diff(AppStore._pauseStart);
            AppStore._pauseStart = null;
            AppStore.emit('pauseChanged');
            break;
        default:
            break;
    }
});

module.exports = AppStore;
