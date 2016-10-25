/** DViewer is a photo visualizer class that uses css background as a canvas. */
class DViewer {
    /** *
    * Creates the object
    @constructor
    * @param {selector} canvas - the DOM object that will display the image
    * @param {selector} btnPlus - the DOM object that will increase the image size
    * @param {selector} btnLess - the DOM object that will decrease the image size
    * @param {selector} btn100 - the DOM object that will reset image to 100%
    * @param {selector} img - url of the image to be displayed (PNG, SVG, JPG, GIF, WEBP) */
    constructor(canvas, btnPlus, btnLess, btn100, img) {
        this._canvas = canvas;
        this._btnPlus = btnPlus;
        this._btnLess = btnLess;
        this._btn100 = btn100;
        this._img = img;
        this._timesIncreased = 0;
        this._size_factor = 1;
        this._incrementFactor = 1.2;
        this._start = { x: 0, y: 0 };
        this._elbounds = {
            w: parseInt($(canvas).width()),
            h: parseInt($(canvas).height())
            },
        this._bounds = { w: 2350 - this._elbounds.w, h: 1750 - this._elbounds.h },
        this._origin = { x: 0, y: 0 },
        this._start = { x: 0, y: 0 },
        this._movecontinue = false;
        this.changeImage(this._img);
        this.initializeEvents();
    }
    /**
     * Changes the image associated with the canvas.
     * @param {string} img - The path to the Image (PNG, SVG, JPG, GIF, WEBP)
     */
    changeImage(img) {
        $(this._canvas).css({
            'cursor': 'pointer',
            'cursor': 'hand',
            'background-image': 'url("' + img + '")',
            'background-color': 'lightgrey',
            'background-size': '100%',
            'background-repeat': 'no-repeat',
            'background-position': '0 0'
        });
        this.reset();
    }
    /**
     * Set the canvas height in percentage according to screen size.
     * The width should be set using the bootstrap grid system, or your
     * choice of framework.
     * @param {int} size - Value [0-100] specifying the canvas height.
     */
    setHeight(size) {
        // set the canvas height
        $(this._canvas).css({
            'height': size + 'vh'
        });
        this.reset();
    }
    /**
     * Initialize the events of mouse movement on canvas and change background positioning.
     */
    initializeEvents() {
        var self = this;
        $(self._btnPlus).click(function () {
            self._timesIncreased++;
            self._size_factor = self._size_factor * self._incrementFactor;
            $(self._canvas).css({ "background-size": self._size_factor * 100 + "%" });
        });
        $(self._btnLess).click(function () {
            self._timesIncreased--;
            self._size_factor = self._size_factor / self._incrementFactor;
            $(self._canvas).css({ "background-size": self._size_factor * 100 + "%" });
        });
        $(self._btn100).click(function () {
            self.reset();
        });
        $(self._canvas).bind('mousedown mouseup mouseleave', function(e){
            self.handle(e);
        });
        $(self._canvas).bind('dblclick', function(){self.reset();});
    }
    /**
     * Reset the canvas to the original position.
     */
    reset() {
        this._size_factor = 1;
        $(this._canvas).css({ 'background-position': '0 0' });
        $(this._canvas).css({ "background-size": this._size_factor * 100 + "%" });
        this._start = { x: 0, y: 0 };
        this._timesIncreased = 0;
    }
    /**
     * Moves the background according to event positioning.
     * @param {Event} e - Mouse event from handler
     */
    move(e) {
        var inbounds = { x: false, y: false },
            offset = {
                x: this._start.x - (this._origin.x - e.clientX),
                y: this._start.y - (this._origin.y - e.clientY)
            };

        inbounds.x = offset.x < 0 && (offset.x * -1) < this._bounds.w;
        inbounds.y = offset.y < 0 && (offset.y * -1) < this._bounds.h;

        this._start.x = offset.x;
        this._start.y = offset.y;

        $(this._canvas).css('background-position', this._start.x + 'px ' + this._start.y + 'px');

        this._origin.x = e.clientX;
        this._origin.y = e.clientY;

        e.stopPropagation();
        return false;
    }
    /**
     * Handles if movement will or not happen according to mouse down or not.
     * @param {Event} e - Mouse event from handler
     */
    handle(e) {
        var self = this;
        this._movecontinue = false;
        $(this._canvas).unbind('mousemove');

        if (e.type == 'mousedown') {
            this._origin.x = e.clientX;
            this._origin.y = e.clientY;
            this._movecontinue = true;
            $(this._canvas).bind('mousemove', function(e){self.move(e);});
        } else {
            $(document.body).focus();
        }
        e.stopPropagation();
        return false;
    }

}
