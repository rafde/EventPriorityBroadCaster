<a name="EventPriorityEmitter"></a>
#EventPriorityEmitter([eventName=], [options])
Public interface for using EventPriorityEmitter.

**Params**

- \[eventName=\] `String` - Name to give to the event.  
- \[options\] `Object` | `function` - An object for options or function to subscribe. Certain options                                               trigger certain actions, other non-related options will be discarded.  
  - \[pub\] `Object` - For event publishing. If eventName is passed                                               and options, options.unSub, or options.pub are undefined,                                               then options.pub gets set to {} and the event publishes.  
  - \[rePub\] `Boolean` - If set to true and subscribing to an event and the event had                                               published in the past, then re-publish for this subscriber                                               using the previous options.pub  
  - \[unSub\] `String` - Required for un-subscribing from priority list.                                               The string refers to the subId to remove from list of priorities.  
  - \[sub\] `function` - Required for subscribing to an event.  
  - \[subId\] `String` - Optional for subscribing. Use for identifying and removing                                               from priority list. Randomly generated if not defined when                                               subscribing (options.sub or options is a function).  
  - \[priority\] `int` - 0-11 where 0 is the lowest (last subscriber to get published data) priority                                                and 11 is the highest (first subscriber to get published data).                                                Every subscription will append to the list of priorities,                                                except for options.timing=1 since there can be only one default.                                               If subscribing and options.priority is not set, 0 is be used.                                                This is ignored when options.timing=1.  
  - \[timing\] `String` - When the priority should happen.                                               pre = before default timing. There can be many of these timings.                                               def = default publish event. There is only one default timing.                                               post = after default event. There can be many of these timings.                                               If subscribing and options.timing is not set, 2 will be used.  

**Returns**: `undefined` | `function` - "new EventPriorityEmitter" returns a function with a new                                               instance of EventPriorityEmitter for private use.                                               Otherwise, it will publish, subscribe, or un-subscribe to                                               global EventPriorityEmitter and return undefined.  
**Example**  
//subscribe using default configEventPriorityEmitter('myGlobalEvent', function (args) { console && console.log && console.log(args); });//subscribe default timingEventPriorityEmitter('myGlobalEvent', { "timing" : "def", "sub" : function (args) {     if (args && args.stuff) {         //do something by default     } }});//subscribe post timingEventPriorityEmitter('myGlobalEvent', { "subId": "sub id 2", "timing" : "post", "priority": 11, "sub" : function (args) {     if (args && args.somethingelse) {         //do something after default and before other priorities     } }});//publish object with data inside the you want subscribers to consumeEventPriorityEmitter('myGlobalEvent', {"pub": {"stuff" : "data"}});//un-subscribe a subIdEventPriorityEmitter('myGlobalEvent', {"unSub": "sub id 2"}); 

