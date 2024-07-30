import * as draw from "./draw.js";
import * as input from "./input.js";
import * as server from "./server.js";
function animate() {
    draw.draw();
    requestAnimationFrame(animate);
}
window.addEventListener('DOMContentLoaded', () => {
    server.init();
    input.init();
    draw.init();
    animate();
});
// requestAnimationFrame(animate)
//# sourceMappingURL=main.js.map