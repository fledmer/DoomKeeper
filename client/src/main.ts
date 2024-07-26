import * as drawModule from "./draw"
//window.addEventListener('resize', resizeCanvas)

// setInterval(drawModule.draw, 2)
function animate(){
    drawModule.draw()
    requestAnimationFrame(animate)
}
animate()
// requestAnimationFrame(animate)