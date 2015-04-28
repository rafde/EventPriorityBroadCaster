## Classes
<dl>
<dt><a href="#PrioritizedPubSub">PrioritizedPubSub</a></dt>
<dd></dd>
</dl>
## Functions
<dl>
<dt><a href="#PrioritizedPubSub">PrioritizedPubSub(eventName, [options])</a> ⇒ <code><a href="#PrioritizedPubSub">PrioritizedPubSub</a></code></dt>
<dd></dd>
</dl>
## Typedefs
<dl>
<dt><a href="#pspOptions">pspOptions</a> : <code>Object</code></dt>
<dd><p>Object passed to PrioritizedPubSub.</p>
</dd>
<dt><a href="#pubArgs">pubArgs</a> : <code>Object</code></dt>
<dd><p>Object of arguments passed to PrioritizedPubSub.pub or PrioritizedPubSub
for <a href="#subscriptionCallback">subscriptionCallback</a> to use.</p>
</dd>
<dt><a href="#eventName">eventName</a> : <code>String</code></dt>
<dd><p>Event name used for subscribing/publishing to.</p>
</dd>
<dt><a href="#subscriptionId">subscriptionId</a> : <code>String</code></dt>
<dd><p>User-defined id for identifying and removing from priority list. Randomly generated if not defined when
subscribing.</p>
</dd>
<dt><a href="#subscriptionOptions">subscriptionOptions</a> : <code>Object</code></dt>
<dd><p>All the options can be passed to PrioritizedPubSub and PrioritizedPubSub.sub</p>
</dd>
<dt><a href="#subscriptionTimings">subscriptionTimings</a> : <code>String</code></dt>
<dd><p>post   After default event. There can be many of these timings.</p>
</dd>
<dt><a href="#pspObj">pspObj</a> : <code>Object</code></dt>
<dd><p>Object passed to <a href="#subscriptionCallback">subscriptionCallback</a> as a second parameter.</p>
</dd>
<dt><a href="#subscriptionCallback">subscriptionCallback</a> : <code>function</code></dt>
<dd><p>Callback used for subscriptions.</p>
</dd>
</dl>
<a name="PrioritizedPubSub"></a>
## PrioritizedPubSub
**Kind**: global class  

* [PrioritizedPubSub](#PrioritizedPubSub)
  * [new PrioritizedPubSub(subNameSpace)](#new_PrioritizedPubSub_new)
  * [.sub(eventName, options)](#PrioritizedPubSub.sub) ⇒ <code>[PrioritizedPubSub](#PrioritizedPubSub)</code>
  * [.pub(eventName, [options])](#PrioritizedPubSub.pub) ⇒ <code>[PrioritizedPubSub](#PrioritizedPubSub)</code>
  * [.unSub(eventName, subId)](#PrioritizedPubSub.unSub) ⇒ <code>[PrioritizedPubSub](#PrioritizedPubSub)</code>
  * [.getEventPubCallback(eventName)](#PrioritizedPubSub.getEventPubCallback) ⇒ <code>function</code>
  * [.getEventProxy(eventName)](#PrioritizedPubSub.getEventProxy) ⇒ <code>Object</code>

<a name="new_PrioritizedPubSub_new"></a>
### new PrioritizedPubSub(subNameSpace)
PrioritizedPubSub

**Returns**: <code>PSPProxy</code> - `PSPProxy` is returned when `new` is used. It's has the same                                                 behavior and signatures as PrioritizedPubSub but can only be used                                                 if saved to a variable.  

| Param | Type | Description |
| --- | --- | --- |
| subNameSpace | <code>String</code> | Name of new PrioritizedPubSub |

<a name="PrioritizedPubSub.sub"></a>
### PrioritizedPubSub.sub(eventName, options) ⇒ <code>[PrioritizedPubSub](#PrioritizedPubSub)</code>
**Kind**: static method of <code>[PrioritizedPubSub](#PrioritizedPubSub)</code>  

| Param | Type |
| --- | --- |
| eventName | <code>[eventName](#eventName)</code> | 
| options | <code>[subscriptionOptions](#subscriptionOptions)</code> &#124; <code>[subscriptionCallback](#subscriptionCallback)</code> | 

<a name="PrioritizedPubSub.pub"></a>
### PrioritizedPubSub.pub(eventName, [options]) ⇒ <code>[PrioritizedPubSub](#PrioritizedPubSub)</code>
**Kind**: static method of <code>[PrioritizedPubSub](#PrioritizedPubSub)</code>  

| Param | Type |
| --- | --- |
| eventName | <code>[eventName](#eventName)</code> | 
| [options] | <code>Object</code> | 

<a name="PrioritizedPubSub.unSub"></a>
### PrioritizedPubSub.unSub(eventName, subId) ⇒ <code>[PrioritizedPubSub](#PrioritizedPubSub)</code>
**Kind**: static method of <code>[PrioritizedPubSub](#PrioritizedPubSub)</code>  

| Param | Type |
| --- | --- |
| eventName | <code>[eventName](#eventName)</code> | 
| subId | <code>[subscriptionId](#subscriptionId)</code> | 

<a name="PrioritizedPubSub.getEventPubCallback"></a>
### PrioritizedPubSub.getEventPubCallback(eventName) ⇒ <code>function</code>
Returns a function for use in publishing to an event

**Kind**: static method of <code>[PrioritizedPubSub](#PrioritizedPubSub)</code>  

| Param | Type |
| --- | --- |
| eventName | <code>[eventName](#eventName)</code> | 

**Example**  
```js
var pspCb = PrioritizedPubSub.getEventPubCallback('myEvent'); pspCb({arg1:1, arg2: 2}); //same as but you can keep re-using the call back instead of do this over and over. PrioritizedPubSub('myEvent', {pub:{arg1:1, arg2: 2}});
```
<a name="PrioritizedPubSub.getEventProxy"></a>
### PrioritizedPubSub.getEventProxy(eventName) ⇒ <code>Object</code>
Get an object with proxied functions for re-use.

**Kind**: static method of <code>[PrioritizedPubSub](#PrioritizedPubSub)</code>  

| Param | Type |
| --- | --- |
| eventName | <code>[eventName](#eventName)</code> | 

**Example**  
```js
var pspEventProxy = PrioritizedPubSub.getEventProxy('myEvent'); // Same as PrioritizedPubSub('myEvent', {pub:{arg1:1, arg2: 2}}); pspEventProxy.pub({arg1:1, arg2: 2}); // Same as PrioritizedPubSub('myEvent', function () { //do stuff }); pspEventProxy.sub(function () { //do stuff }); // Same as PrioritizedPubSub('myEvent', {unSub:'something'}}); pspEventProxy.unSub('something');
```
<a name="PrioritizedPubSub"></a>
## PrioritizedPubSub(eventName, [options]) ⇒ <code>[PrioritizedPubSub](#PrioritizedPubSub)</code>
**Kind**: global function  

| Param | Type |
| --- | --- |
| eventName | <code>[eventName](#eventName)</code> | 
| [options] | <code>[pspOptions](#pspOptions)</code> &#124; <code>[subscriptionCallback](#subscriptionCallback)</code> | 


* [PrioritizedPubSub(eventName, [options])](#PrioritizedPubSub) ⇒ <code>[PrioritizedPubSub](#PrioritizedPubSub)</code>
  * [new PrioritizedPubSub(subNameSpace)](#new_PrioritizedPubSub_new)
  * [.sub(eventName, options)](#PrioritizedPubSub.sub) ⇒ <code>[PrioritizedPubSub](#PrioritizedPubSub)</code>
  * [.pub(eventName, [options])](#PrioritizedPubSub.pub) ⇒ <code>[PrioritizedPubSub](#PrioritizedPubSub)</code>
  * [.unSub(eventName, subId)](#PrioritizedPubSub.unSub) ⇒ <code>[PrioritizedPubSub](#PrioritizedPubSub)</code>
  * [.getEventPubCallback(eventName)](#PrioritizedPubSub.getEventPubCallback) ⇒ <code>function</code>
  * [.getEventProxy(eventName)](#PrioritizedPubSub.getEventProxy) ⇒ <code>Object</code>

<a name="new_PrioritizedPubSub_new"></a>
### new PrioritizedPubSub(subNameSpace)
PrioritizedPubSub

**Returns**: <code>PSPProxy</code> - `PSPProxy` is returned when `new` is used. It's has the same                                                 behavior and signatures as PrioritizedPubSub but can only be used                                                 if saved to a variable.  

| Param | Type | Description |
| --- | --- | --- |
| subNameSpace | <code>String</code> | Name of new PrioritizedPubSub |

<a name="PrioritizedPubSub.sub"></a>
### PrioritizedPubSub.sub(eventName, options) ⇒ <code>[PrioritizedPubSub](#PrioritizedPubSub)</code>
**Kind**: static method of <code>[PrioritizedPubSub](#PrioritizedPubSub)</code>  

| Param | Type |
| --- | --- |
| eventName | <code>[eventName](#eventName)</code> | 
| options | <code>[subscriptionOptions](#subscriptionOptions)</code> &#124; <code>[subscriptionCallback](#subscriptionCallback)</code> | 

<a name="PrioritizedPubSub.pub"></a>
### PrioritizedPubSub.pub(eventName, [options]) ⇒ <code>[PrioritizedPubSub](#PrioritizedPubSub)</code>
**Kind**: static method of <code>[PrioritizedPubSub](#PrioritizedPubSub)</code>  

| Param | Type |
| --- | --- |
| eventName | <code>[eventName](#eventName)</code> | 
| [options] | <code>Object</code> | 

<a name="PrioritizedPubSub.unSub"></a>
### PrioritizedPubSub.unSub(eventName, subId) ⇒ <code>[PrioritizedPubSub](#PrioritizedPubSub)</code>
**Kind**: static method of <code>[PrioritizedPubSub](#PrioritizedPubSub)</code>  

| Param | Type |
| --- | --- |
| eventName | <code>[eventName](#eventName)</code> | 
| subId | <code>[subscriptionId](#subscriptionId)</code> | 

<a name="PrioritizedPubSub.getEventPubCallback"></a>
### PrioritizedPubSub.getEventPubCallback(eventName) ⇒ <code>function</code>
Returns a function for use in publishing to an event

**Kind**: static method of <code>[PrioritizedPubSub](#PrioritizedPubSub)</code>  

| Param | Type |
| --- | --- |
| eventName | <code>[eventName](#eventName)</code> | 

**Example**  
```js
var pspCb = PrioritizedPubSub.getEventPubCallback('myEvent'); pspCb({arg1:1, arg2: 2}); //same as but you can keep re-using the call back instead of do this over and over. PrioritizedPubSub('myEvent', {pub:{arg1:1, arg2: 2}});
```
<a name="PrioritizedPubSub.getEventProxy"></a>
### PrioritizedPubSub.getEventProxy(eventName) ⇒ <code>Object</code>
Get an object with proxied functions for re-use.

**Kind**: static method of <code>[PrioritizedPubSub](#PrioritizedPubSub)</code>  

| Param | Type |
| --- | --- |
| eventName | <code>[eventName](#eventName)</code> | 

**Example**  
```js
var pspEventProxy = PrioritizedPubSub.getEventProxy('myEvent'); // Same as PrioritizedPubSub('myEvent', {pub:{arg1:1, arg2: 2}}); pspEventProxy.pub({arg1:1, arg2: 2}); // Same as PrioritizedPubSub('myEvent', function () { //do stuff }); pspEventProxy.sub(function () { //do stuff }); // Same as PrioritizedPubSub('myEvent', {unSub:'something'}}); pspEventProxy.unSub('something');
```
<a name="pspOptions"></a>
## pspOptions : <code>Object</code>
Object passed to PrioritizedPubSub.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sub | <code>[subscriptionCallback](#subscriptionCallback)</code> | Required for subscribing to an event. See [subscriptionCallback](#subscriptionCallback)                                                This option has the highest precedence.                                                Can be combined with [subscriptionOptions](#subscriptionOptions) |
| unSub | <code>[subscriptionId](#subscriptionId)</code> | Required for un-subscribing an event. If set, pspOptions.pub will be ignored |
| pub | <code>[pubArgs](#pubArgs)</code> | Required for publishing to subscribers. All other options have higher precedence. |

<a name="pubArgs"></a>
## pubArgs : <code>Object</code>
Object of arguments passed to PrioritizedPubSub.pub or PrioritizedPubSubfor [subscriptionCallback](#subscriptionCallback) to use.

**Kind**: global typedef  
<a name="eventName"></a>
## eventName : <code>String</code>
Event name used for subscribing/publishing to.

**Kind**: global typedef  
<a name="subscriptionId"></a>
## subscriptionId : <code>String</code>
User-defined id for identifying and removing from priority list. Randomly generated if not defined whensubscribing.

**Kind**: global typedef  
<a name="subscriptionOptions"></a>
## subscriptionOptions : <code>Object</code>
All the options can be passed to PrioritizedPubSub and PrioritizedPubSub.sub

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| unSubCount | <code>Integer</code> | Will subscribe to however many times set. When it reaches the                                                      limit, it will un-subscribe itself. Decrementing can be bypassed.                                                      See [pspObj](#pspObj) |
| rePub | <code>Boolean</code> | If set to true and subscribing to an event and the event had                                                      published in the past, then re-publish for this subscriber                                                     using the previously publish data. |
| subId | <code>String</code> | [subscriptionId](#subscriptionId) |
| priority | <code>Integer</code> | 0-11 where 0 is the lowest (last subscriber to get published data) priority                                                     and 11 is the highest (first subscriber to get published data).                                                     Every subscription will append to the list of priorities,                                                     except for subscriptionOptions.timing="def" since there                                                     can be only one default.                                                     If subscribing and options.priority is not set, 6 is used.                                                     This is ignored when subscriptionOptions.timing="def". |
| timing | <code>String</code> | See [subscriptionTimings](#subscriptionTimings) |
| context | <code>\*</code> | Specify the context of `this` |

<a name="subscriptionTimings"></a>
## subscriptionTimings : <code>String</code>
post   After default event. There can be many of these timings.

**Kind**: global typedef  
<a name="pspObj"></a>
## pspObj : <code>Object</code>
Object passed to [subscriptionCallback](#subscriptionCallback) as a second parameter.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| CONST | <code>Object</code> |  |
| CONST.SKIP_DEC | <code>String</code> | Prevent the subscriptionOptions.unSubCount from decrementing by                                          returning from [subscriptionCallback](#subscriptionCallback) |
| CONST.UNSUB | <code>String</code> | Used to un-subscribe by returning from (@link subscriptionCallback}. |

<a name="subscriptionCallback"></a>
## subscriptionCallback : <code>function</code>
Callback used for subscriptions.

**Kind**: global typedef  

| Param | Type |
| --- | --- |
| args | <code>[pubArgs](#pubArgs)</code> | 
| pspObj | <code>[pspObj](#pspObj)</code> | 

