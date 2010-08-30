Domingo.Network = {
	_socket : null,
	_port : null,

	/**
 	 * Initializes web socket
 	 *
 	 * @param port {Integer} 
 	 */
	init : function(port) {
		Domingo.Network._port = port;
		if ("WebSocket" in window) {
			this._socket = new WebSocket("ws://baka.tv:"+port+"/domingo");
			this._socket.onopen = Domingo.Network.open;
			this._socket.onclose = Domingo.Network.close;
			this._socket.onmessage = Domingo.Network.receive;
			this._socket.onerror = Domingo.Network.error;
		} else {
			alert("Your browser isn't compatible with this game. Please upgrade your web browser and try again.");
		}
	},

	open : function() {
		Domingo.Debug.info("WebSocket Connected on Port " + Domingo.Network._port);
	},

	close : function() {
		Domingo.Debug.info("WebSocket Closed");
	},

	error : function(msg) {
		Domingo.Debug.warning(msg);
	}, 

	send : function(data) {
	},

	receive : function(data) {
		Domingo.Debug.info("received: " + data);
		Domingo.Network._socket.send("pong");
	}
};
