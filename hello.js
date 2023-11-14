"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = require("pixi.js");
var honeycomb_grid_1 = require("honeycomb-grid");
// you may want the origin to be the top left corner of a hex's bounding box
// instead of its center (which is the default)
var WideHex = (0, honeycomb_grid_1.defineHex)({
    dimensions: 30,
    origin: "topLeft",
    orientation: honeycomb_grid_1.Orientation.FLAT,
});
var grid = new honeycomb_grid_1.Grid(WideHex, (0, honeycomb_grid_1.rectangle)({ width: 20, height: 10 }));
document.addEventListener("click", function (_a) {
    var offsetX = _a.offsetX, offsetY = _a.offsetY;
    var hex = grid.pointToHex({ x: offsetX, y: offsetY }, { allowOutside: false });
    console.log(hex);
});
var app = new PIXI.Application({ backgroundAlpha: 0 });
var graphics = new PIXI.Graphics();
console.log({ grid: grid });
document.body.appendChild(app.view);
graphics.lineStyle(1, 0x999999);
grid.forEach(renderHex);
app.stage.addChild(graphics);
function renderHex(hex) {
    // PIXI.Polygon happens to be compatible with hex.corners
    // graphics.drawShape(new PIXI.Polygon(hex.corners));
    graphics.drawPolygon(hex.corners);
}
