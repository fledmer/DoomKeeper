import { draw } from "./draw.js";
import * as input from "./input.js";
//window.addEventListener('resize', resizeCanvas)
// setInterval(drawModule.draw, 2)\
input.init();
function animate() {
    draw();
    requestAnimationFrame(animate);
}
animate();
// requestAnimationFrame(animate)
//# sourceMappingURL=main.js.map