import * as draw from "./draw.js";
import * as input from "./input.js";
import * as server from "./server/client.js";
//let socketUrl = "ws://"+window.location.hostname+":8080"+"/api/data_stream"  
let socketUrl = "ws://" + "localhost" + ":8080" + "/api/data_stream";
function animate() {
    draw.draw();
    requestAnimationFrame(animate);
}
window.addEventListener('DOMContentLoaded', () => {
    (new server.ClientServer(socketUrl)).Connect();
    input.init();
    draw.init();
    animate();
});
// requestAnimationFrame(animate)
//# sourceMappingURL=main.js.map