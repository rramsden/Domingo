/**
 * Almost everything is a sprite. The Sprite class inherits from the Object class
 */
var Sprite = Object2D.extend
({
	image: null,
	x: 0,
	y: 0,

	// animation
	frames: {},
	currentFrame: 0,
	frameWidth: 0,
	frameHeight: 0,
	frameTimer: 0,
	play: null,
	looping: false,	

	/**
	 * Sprite constructor
	 *
	 * @param x {Integer} x-coord for location on screen
	 * @param y {Integer} y-coord for location on screen
	 */
	init : function(x, y) {
	},

	/**
	 * @param path {String} Path to image file
	 */
	loadImage : function(path, width, height) {
	},
	
	/**
	 * Add animation takes a set of frames processed from the
	 * loaded sprite.
	 *
	 * addAnimation({
 	 *      :up     { frames: [1], framerate: 10 },
	 *      :down   { frames: [2], framerate: 10 },
	 *      :run    { frames: [3,4], framerate: 10}
	 * });
	 *
	 * @param data {Object} Javascript object containing frame information
	 */
	addAnimation : function(data) {
	},

	/**
	 * Sets the current animation to be played
	 *
	 * @param name {String} Name of the animation
	 * @param loop {Boolean} Loop the animation
	 */
	playAnimation : function(name, loop) {
	},

	flipx : function() {
	},

	flipy : function() {
	},

	fill : function() {
	},

	scale : function(width, height) {
	},

	alpha : function(level) {
	},

	color : function(value) {
	},

	/**
	 * Updates animation data, super method inherited from Object class
	 * controls physics of object.
	 */
	update : function() {
	}
});
