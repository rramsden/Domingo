Domingo.Network = {
	_socket : null,
	_port : null,
	_callbacks : {},

	/**
 	 * Initializes web socket
 	 *
 	 * @param port {Integer} 
 	 */
	init : function(port) {
		WEB_SOCKET_SWF_LOCATION = "lib/websocket/WebSocketMain.swf";

		Domingo.Network._port = port;

		this._socket = new WebSocket("ws://baka.tv:"+port+"/");
		this._socket.onopen = Domingo.Network.open;
		this._socket.onclose = Domingo.Network.close;
		this._socket.onmessage = Domingo.Network.receive;
		this._socket.onerror = Domingo.Network.error;
	},

	open : function() {
		Domingo.Log.info("WebSocket Connected on Port " + Domingo.Network._port);
		Domingo.Network.send(["connect", "[]"]);
		//setInterval( Domingo.Network.ping, 3000 );
	},

	close : function() {
		Domingo.Log.info("WebSocket Closed");
	},

	error : function(msg) {
		Domingo.Log.warning(msg);
	}, 

	send : function(data) {
		var len = data.length;
		var first = data.shift();
		this._socket.send("{"+first+",{"+data.join(",")+"}}.");
	},

	callback : function(name, fun) {
		Domingo.Network._callbacks[name] = fun;
	},

	ping : function() {
		Domingo.Network.send(["ping", "[]"]);
	},

	receive : function(msg) {
		Domingo.Log.debug("received: " + msg.data);
		var recv = msg.data.split('%');
		eval("var tmp = " + recv[1]);
		Domingo.Network._callbacks[recv[0]](tmp);
	}
};
