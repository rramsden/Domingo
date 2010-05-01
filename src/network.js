/**
 * Network module helps Domingo manage network resources for your game.
 */
var Network = Class.extend
({
	opcodes: {},
	socket: null,

	/**
	 * Network constructor - creates and opens a web socket
	 *
	 * @param websocket_url {String} URL for websocket
	 */
	init : function(websocket_url) {
	},

	send : function(data) {
	},
	
	recv : function(data) {
	},

	close : function() {
	},

	addCallback : function(opcode, callback) {
	}
});
