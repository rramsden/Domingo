Domingo.Network = {
	_socket : null,
	_port : null,

	/**
 	 * Initializes web socket
 	 *
 	 * @param port {Integer} 
 	 */
	init : function(port) {
		this._port = port;
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
		Domingo.Debug.info("WebSocket Connected on Port " + port);
	},

	close : function() {
		Domingo.Debug.info("WebSocket Closed");
	},

	error : function(msg) {
		Domingo.Debug.warning(msg);
	}, 

	send : function(data) {
		if (this._socket.readyState == this._socket.OPEN) {
			this._socket.send(data);
		} else {
			Domingo.Debug.warning("Socket isn't connected");
		}
	},

	receive : function(data) {
		alert("GOT SOME DATA!");
	}
};
