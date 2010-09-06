/**
 * AUTHOR : Richard Ramsden richard@rramsdenc.a
 * jquery.comet Long-polling WebSocket Wrapper
 */
(function() {

	if (window.WebSocket) return;

	WebSocket = function(url, protocol, proxyHost, proxyPort, headers) {
		$ = $j;
		$j.comet.connect("baka.tv:8080");
		var self = this;
		this.readyState = WebSocket.CONNECTING;
		this.bufferedAmount = 0;

		this.addEventListener("open", function(e) {
			if (self.onopen) self.opopen();
		});

		this.addEventListener("close", function(e) {
			if (self._time) clearInterval(self._timer);
			if (self.onclose) self.onclose();
		});

		this.addEventListener("message", function() {
			self._handleMessages();
		});

		this.addEventListener("error", function(e) {
			if (self._timer) clearInterval(self._timer);
			if (self.onerror) self.onerror();
		});

		this.addEventListener("stateChange", function(e) {
		});	
	}

	WebSocket.CONNECTING = 0;
	WebSocket.OPEN = 1;
	WebSocket.CLOSING = 2;
	WebSocket.CLOSED = 3;

  	/**
   	 * Implementation of {@link <a href="http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-registration">DOM 2 EventTarget Interface</a>}
   	 *
   	 * @param {string} type
   	 * @param {function} listener
   	 * @param {boolean} useCapture !NB Not implemented yet
   	 * @return void
  	 */
  	WebSocket.prototype.addEventListener = function(type, listener, useCapture) {
    		if (!('_events' in this)) {
      			this._events = {};
    		}
    		if (!(type in this._events)) {
      			this._events[type] = [];
      			if ('function' == typeof this['on' + type]) {
        			this._events[type].defaultHandler = this['on' + type];
        			this['on' + type] = this._createEventHandler(this, type);
      			}
    		}
    		this._events[type].push(listener);
  	}

  	/**
   	 * @param {object} object
   	 * @param {string} type
   	 */
  	WebSocket.prototype._createEventHandler = function(object, type) {
    		return function(data) {
      			var event = new WebSocketEvent();
      			event.initEvent(type, true, true);
      			event.target = event.currentTarget = object;
      			for (var key in data) {
        			event[key] = data[key];
      			}
      			object.dispatchEvent(event, arguments);
    		};
  	}

  	/**
   	 * Implementation of {@link <a href="http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-registration">DOM 2 EventTarget Interface</a>}
   	 *
   	 * @param {WebSocketEvent} event
   	 * @return void
   	 */
  	WebSocket.prototype.dispatchEvent = function(event) {
    		if (!('_events' in this)) throw 'UNSPECIFIED_EVENT_TYPE_ERR';
    		if (!(event.type in this._events)) throw 'UNSPECIFIED_EVENT_TYPE_ERR';

    		for (var i = 0, l = this._events[event.type].length; i < l; ++ i) {
      			this._events[event.type][i](event);
      			if (event.cancelBubble) break;
    		}

    		if (false !== event.returnValue &&
        		'function' == typeof this._events[event.type].defaultHandler)
    		{
      			this._events[event.type].defaultHandler(event);
    		}
  	};

  	/**
   	 *
   	 * @type boolean
   	 */
  	WebSocketEvent.prototype.cancelable = true;

  	/**
   	 *
   	 * @type boolean
   	 */
  	WebSocketEvent.prototype.cancelBubble = false;

  	/**
   	 *
   	 * @return void
   	 */
  	WebSocketEvent.prototype.preventDefault = function() {
    		if (this.cancelable) {
      			this.returnValue = false;
    		}
  	};

  	/**
   	 *
   	 * @return void
   	 */
  	WebSocketEvent.prototype.stopPropagation = function() {
    		this.cancelBubble = true;
  	};

  	/**
   	 *
   	 * @param {string} eventTypeArg
   	 * @param {boolean} canBubbleArg
   	 * @param {boolean} cancelableArg
   	 * @return void
   	 */
  	WebSocketEvent.prototype.initEvent = function(eventTypeArg, canBubbleArg, cancelableArg) {
    		this.type = eventTypeArg;
    		this.cancelable = cancelableArg;
    		this.timeStamp = new Date();
  	};

	function WebSocketEvent() {};
  
	WebSocket.prototype.send = function(data) {
		console.log("sending " + data);
		if (this.readyState == WebSocket.CONNECTING)
      			throw "INVALID_STATE_ERR: Web Socket connection has not been established";
	}
	
	WebSocket.prototype.close = function() {
 		this.readyState = WebSocket.CLOSED;
    		if (this._timer) clearInterval(this._timer);
    		if (this.onclose) this.onclose();
	}
})();
