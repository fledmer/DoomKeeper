let socket: WebSocket
let socketUrl = "ws://"+window.location.hostname+":8080"+"/api/data_stream"  

export function init(){
    console.log(socketUrl)
    socket = new WebSocket(socketUrl)
    socket.onopen = function(){
        console.log("Open connection")
        socket.send("hello world")
    }
    socket.onmessage = function(this: WebSocket, ev: MessageEvent){
        console.log("get Message:", ev.data)
    }
    socket.onerror = function(){
        console.log("Error connection")
    }}