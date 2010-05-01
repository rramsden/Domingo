/**
 * State module manages objects in a particular state ie. Menu State, Play State, etc 
 */
var State = Class.extend
({
	groups: [], // holds groups of objects 

	/**
	 * State Constructor - intentionally left blank, except when inheriting 
	 */
	init : function() {
	},

	/**
	 * This method stores a group of objects in the class
	 *
	 * @param group {Group} Group of objects ie. Background, Player, Hud   
	 */
	add : function(group) {
	},

	/**
	 * Garbage collection, clean up objects on state change
	 *
	 * @param group {Group} Name of group ie. Background, Player, Hud, Mobs
	 */
	remove : function(group) {
	},

	update : function() {
	}	
});
