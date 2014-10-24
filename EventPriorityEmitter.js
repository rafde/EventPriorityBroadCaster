var EventPriorityEmitter = (function (w) {
    'use strict';

    var PRIORITY_TYPE = ['pre', 'def', 'post'],
        PRIORITY_LIMIT = 11,
        fnArgsToArr = Array.prototype.slice,
        fnIndexOf = Array.prototype.indexOf,
        _globalEventPriorities;


     function _debugLog() {
        var args;
        if (w.console && w.console.log) {
            args = fnArgsToArr.call(arguments);
            args.unshift('EPE: ');
            w.console.log(args);
        }
    }

    function _isValidRange(validate, max, min) {
        min = min || 0;

        return !isNaN(validate) && validate >= min && validate <= max;
    }

    function Subscriptions(eventName, epbName){
        var i = 0,
            timings = {},
            type;

        for(type = PRIORITY_TYPE[i]; i < PRIORITY_TYPE.length; type = PRIORITY_TYPE[++i]){

            if (type === 'def') {
                timings[type] = null;
                continue;
            }

            timings[type] = [];
        }

        this.subIds = {};
        this.hasPub = false;
        this.oldArgs = {};
        this.timings = timings;
        this.eventName = epbName + eventName + '-> ';
    }

    Subscriptions.prototype = {
        'constructor': Subscriptions,
        'replaceSubId' : function (config) {
            var timing,
                priority;

            this.removeSubId(config.subId, false);

            this.subIds[config.subId] = config;

            if (config.timing === 'def') {

                this.timings[config.timing] = config.sub;

            } else {

                timing = this.timings[config.timing];
                priority = timing[config.priority];

                if (typeof priority === 'undefined') {
                    priority = timing[config.priority] = [];
                }

                priority.push(config.subId);
            }
        },
        'removeSubId': function (subId, untrack) {
            var subIdData = this.subIds[subId],
                indexOf,
                priority,
                timing;

            if (subIdData && typeof subIdData === 'object') {

                timing = this.timings[subIdData.timing];

                if (typeof timing === 'function') {
                    _debugLog(this.eventName + 'removing default timing');
                    this.timings[subIdData.timing] = null;

                } else if (
                    timing &&
                    timing.length &&
                    (priority = timing[subIdData.priority]) &&
                    priority.length &&
                    (indexOf = fnIndexOf.call(priority, subId)) >= 0 /*Array.prototype.indexOf > IE 8*/
                ){
                    priority.splice(indexOf, 1);
                }

                if (typeof untrack === 'undefined' || untrack === true) {
                    delete this.subIds[subId];
                }
            }

            return false;
        },
        'publish': function (args) {
            var tidx = 0,
                timing,
                pidx,
                priorities,
                priority,
                sidx,
                subId,
                subIdData;

            //Clone?
            this.oldArgs = args;
            this.hasPub = true;

            for (timing = PRIORITY_TYPE[tidx]; tidx < PRIORITY_TYPE.length; timing = PRIORITY_TYPE[++tidx]) {
                priorities = this.timings[timing];

                if (timing === 'def' && typeof priorities === 'function') {

                    //Default should be the only one that matches this
                    priorities.call(undefined, this.oldArgs);
                    _debugLog(this.eventName + 'Publishing to default');

                } else if (priorities && priorities.length) {

                    for (pidx = priorities.length - 1, priority = priorities[pidx]; pidx >= 0; priority = priorities[--pidx]) {

                        if (priority && priority.length) {

                            for(sidx = 0, subId = priority[sidx]; sidx < priority.length; subId = priority[++sidx]) {
                                subIdData = this.subIds[subId];

                                if(subIdData && typeof subIdData.sub === 'function') {
                                    _debugLog(this.eventName + 'Publishing subId ' + subId + ' TIMING ' + timing + ' PRIORITY ' + pidx);
                                    //pass context if defined?
                                    subIdData.sub.call(undefined, this.oldArgs);
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    /**
     * @constructor
     */
    function EventPriorityEmitter(EPEName) {
        this.epeName = '';
        this.events = {};


        if (typeof EPEName === 'string') {
            this.epeName += EPEName;
        } else {
            this.epeName += 'EPE' + Math.ceil(Math.random() * 10000000);
        }

        this.epeName += '::';
    }

    EventPriorityEmitter.prototype = {
        'constructor' : EventPriorityEmitter,
        'pub': function (eventName, args) {
            var event = this.getEvent(eventName);

            if (event) {
                event.publish(args);
            }
        },
        'sub': function (eventName, config) {
            var event,
                temp;

            if (config && typeof config === 'object') {

                event = this.getEvent(eventName);

                if (typeof config.subId !== 'string') {
                    config.subId = 'pr-' + Math.ceil(Math.random() * 10000000);
                }

                temp = parseInt(config.priority, 10);
                if (!_isValidRange(temp, PRIORITY_LIMIT)) {
                    config.priority = 0;
                } else {
                    config.priority = temp;
                }

                temp = fnIndexOf.call(PRIORITY_TYPE, config.timing);
                if(temp < 0) {
                    config.timing = PRIORITY_TYPE[PRIORITY_TYPE.length - 1];
                } else {
                    config.timing = PRIORITY_TYPE[temp];
                }

                event.replaceSubId(config);

                if(config.rePub && event.hasPub) {
                    _debugLog(this.epeName + eventName + ' event was published. Re-publish subId ' + config.subId);
                    config.sub.call(undefined, event.oldArgs);
                }

                return true;
            }

            _debugLog(this.epeName + eventName + ' was not given a legitimate config');

            return null;
        },
        /**
         * @param subId
         * @param eventName
         */
        'unSub': function (eventName, subId) {
            var event = this.getEvent(eventName);
            if (event) {
                _debugLog(this.epeName + 'un-subcribing subId ' + subId + ' from EVENT ' + eventName);
                event.removeSubId(subId);
            }
        },
        'getEvent': function (eventName) {
            var event = this.events[eventName];

            if (!event) {
                _debugLog(this.epeName + 'Creating new subscription for EVENT ' + eventName);
                this.events[eventName] = event = new Subscriptions(eventName, this.epeName);
            }

            return event;
        },
        'exec': function(eventName, options) {
            options = options || {};

            if (typeof eventName === 'string') {

                //subscribe using default config
                if (typeof options === 'function') {
                    options = {
                        'sub': options
                    };
                }

                if (typeof options.unSub === 'string') {
                    this.unSub(eventName, options.unSub);
                } else if (typeof options.sub === 'function') { //subscribe to priorityName

                    if(this.sub(eventName, options) === null) {
                        _debugLog(this.epeName + 'Subscription definition was invalid and was not registered');
                    }

                } else { //publish to priorityName
                    options = options.pub || options;
                    this.pub(eventName, options);
                }
            }
        }
    };

    _globalEventPriorities = new EventPriorityEmitter('GLOBAL');

    /**
     * @param {String}          [eventName=]          Name to give to the event.
     *
     * @param {Object|Function} [options]             An object for options or function to subscribe. Certain options
     *                                                trigger certain actions, other non-related options will be discarded.
     *
     * @param {Object}          [options.pub]         For event publishing. If eventName is passed
     *                                                and options, options.unSub, or options.pub are undefined,
     *                                                then options.pub gets set to {} and the event publishes.
     *
     * @param {Boolean}         [options.rePub]       If set to true and subscribing to an event and the event had
     *                                                published in the past, then re-publish for this subscriber
     *                                                using the previous options.pub
     *
     * @param {String}          [options.unSub]       Required for un-subscribing from priority list.
     *                                                The string refers to the subId to remove from list of priorities.
     *
     * @param {Function}        [options.sub]         Required for subscribing to an event. Where coding happens.
     *
     * @param {String}          [options.subId]       Optional for subscribing. Use for identifying and removing
     *                                                from priority list. Randomly generated if not defined when
     *                                                subscribing (options.sub or options is a function).
     *
     * @param {int}             [options.priority]    0-11 where 0 is the lowest (last to publish) priority and
     *                                                11 is the highest (first to publish). Every subscription will
     *                                                append to the list of priorities, except for options.timing=1.
     *                                                If subscribing and options.priority is not set, 0 be used.
     *                                                This option is ignored by options.timing=1.
     *
     * @param {int}             [options.timing]      When the priority should happen.
     *                                                pre = before default timing. There can be many of these timings.
     *                                                def = default publish event. There is only one default timing.
     *                                                post = after default event. There can be many of these timings.
     *                                                If subscribing and options.timing is not set, 2 will be used.
     *
     *
     * @returns {undefined|Function}                  "new EventPriorityEmitter" returns a function with a new
     *                                                instance of EventPriorityEmitter for private use.
     *                                                Otherwise, it will publish, subscribe or un-subscribe to
     *                                                global EventPriorityEmitter and return undefined.
     */
    return function (privateEPE) {
        if (typeof this === 'undefined' || this === w) {
            _globalEventPriorities.exec.apply(
                _globalEventPriorities,
                fnArgsToArr.call(arguments)
            );
        } else {
            //return new wrapper
            return (function () {
                var EPE = new EventPriorityEmitter(privateEPE);

                return function() {
                    EPE.exec.apply(
                        EPE,
                        fnArgsToArr.call(arguments)
                    );
                };
            }());
        }
    };
}(window));