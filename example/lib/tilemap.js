var TileMap = Class.extend
({
	_tile_w: 32,
	_tile_h: 32,
	_tileset_h: null,
	_tileset_w: null,
	_scale_x: null,
	_scale_y: null,
	_mapWidth: null, /* map width in pixels */
	_mapHeight: null, /* map height in pixels */
	_canvas: null,
	_mapData: null,
	_image: null,

	init : function(tileset, tilew, tileh, mapData) {
		this._tile_w = this._scale_x = tilew; 
		this._tile_h = this._scale_y = tileh;
		this._mapData = mapData;

		var that = this;
		this._image = Domingo.Resource.addImage(tileset);
		Domingo.Resource.addImageCallback(tileset, function(img) { that.load(img) })
	},
	
	/**
	 * load - draws the entire map to a canvas
	 */
	load : function(image) {
		this._image = image;
		this._mapWidth = this._mapData.length * this._scale_x;
		this._mapHeight = this._mapData[0].length * this._scale_y;
		
		this._canvas = document.createElement("canvas");
		this._canvas.setAttribute('height', this._mapWidth);
		this._canvas.setAttribute('width', this._mapHeight);
		this._context = this._canvas.getContext("2d");

		// prevent drawing off-screen
		var rows = this._mapData.length
		var cols = this._mapData[0].length

		for (var i = 0; i < rows; ++i) {
			for (var j = 0; j < cols; ++j) {		
				var camera_x = Domingo.Camera.dx
				var camera_y = Domingo.Camera.dy
				var x = this._scale_x*j - camera_x;
				var y = this._scale_y*i - camera_y;
				var slice_x = this._tile_w * (this._mapData[i][j] % 7); // TODO: Resource manager should expose width/height for tileset image
				var slice_y = this._tile_h * Math.floor( this._mapData[i][j] / 7 )
				
				this._context.drawImage(this._image, slice_x, slice_y, this._tile_w, this._tile_h, x, y, this._scale_x, this._scale_y)
			}
		}
	},
	
	update : function() {
		
	},
	
	setTileScale : function(x, y) {
		this._scale_x = x;
		this._scale_y = y;
	},
	
	/**
	 * @param {Context2D} Cavnas Buffer for drawing tiles
	 */
	blit : function(buffer) {
		var crop_x = Math.min(Domingo.Camera.dx, this._mapWidth)
		var crop_y = Math.min(Domingo.Camera.dy, this._mapHeight)
		var crop_h = Math.min(Domingo.Camera._height, this._mapHeight)
		var crop_w = Math.min(Domingo.Camera._width, this._mapWidth)
		var dh = Domingo.Camera._height
		var dw = Domingo.Camera._width
		var dx = 0, dy = 0;

		buffer.drawImage(this._canvas, crop_x, crop_y, crop_w, crop_h, dx, dy, dw, dh);
	}
});