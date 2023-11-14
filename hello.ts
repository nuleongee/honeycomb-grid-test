import * as PIXI from "pixi.js";
import { defineHex, Grid, Hex, Orientation, rectangle } from "honeycomb-grid";

// you may want the origin to be the top left corner of a hex's bounding box
// instead of its center (which is the default)
const WideHex = defineHex({
  dimensions: 30,
  origin: "topLeft",
  orientation: Orientation.FLAT,
});
const grid = new Grid(WideHex, rectangle({ width: 20, height: 10 }));

document.addEventListener("click", ({ offsetX, offsetY }) => {
  const hex = grid.pointToHex(
    { x: offsetX, y: offsetY },
    { allowOutside: false },
  );
  console.log(hex);
});

const app = new PIXI.Application<HTMLCanvasElement>({ backgroundAlpha: 0 });
const graphics = new PIXI.Graphics();

console.log({ grid });

document.body.appendChild(app.view);
graphics.lineStyle(1, 0x999999);

grid.forEach(renderHex);
app.stage.addChild(graphics);

function renderHex(hex: Hex) {
  // PIXI.Polygon happens to be compatible with hex.corners
  // graphics.drawShape(new PIXI.Polygon(hex.corners));
  graphics.drawPolygon(hex.corners);
}
