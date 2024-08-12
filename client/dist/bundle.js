(()=>{"use strict";class e{constructor(e){this.fov=60,this.angle=0,this.y=1,this.x=1,this.user=e}SetUser(e){this.user=e}}const t=e=>e*(Math.PI/180);let s=new class{constructor(){this.mapValue=[[1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,1,0,0,0,1,0,1],[1,0,0,1,1,1,0,0,0,0,1],[1,0,0,0,1,0,0,0,1,0,1],[1,0,0,0,0,0,0,1,1,0,1],[1,0,0,0,1,1,0,0,1,0,1],[1,1,1,0,0,0,0,0,1,0,1],[1,0,1,0,1,1,1,0,0,0,1],[1,0,1,1,0,0,1,0,1,0,1],[1,0,0,0,1,1,1,1,0,0,1],[1,1,1,1,1,1,1,1,1,1,1]],this.fov=60,this.angle=0,this.y=1,this.x=1,this.step=.01,this.users=new Map}distantToWall(e){var s=this.mapValue;let n=this.fov/e,i=this.angle-this.fov/2,r=[];for(let o=0;o<e;o++){let e=this.x,o=this.y,h=0,c=0;do{o+=this.step*Math.sin(t(i)),e+=this.step*Math.cos(t(i)),c=s[Math.trunc(o)][Math.trunc(e)],h+=this.step}while(void 0!==c&&1!=c);r.push(h*a(i,this.angle,this.fov)),i+=n}return r}},a=(e,s,a)=>Math.sin(t(Math.abs(90-Math.abs(s-e))));class n{constructor(e){window.addEventListener("resize",(()=>{this.resizeCanvas()})),this.canvasContext=e.getContext("2d"),this.canvas=e}animate(){this.draw(),requestAnimationFrame((()=>{this.animate()}))}draw(){this.canvasContext.clearRect(0,0,this.canvas.width,this.canvas.height),this.canvasContext.drawImage(r,0,0,this.canvas.width,this.canvas.height);let e=s.distantToWall(this.canvas.width-1);for(var t=0;t<this.canvas.width-1;t++){let s=Math.min(this.canvas.height,this.canvas.height/e[t]),r=(this.canvas.height-s)/2;a=this.canvasContext,n=t,o=r,h=t+1,c=s+r,g=e[t],l=`rgb(${Math.floor(250-50*g)}, ${Math.floor(250-50*g)}, ${Math.floor(250-50*g)}, 1.0)`,v=2,i(a,n,o,h,c,l),a.fillStyle="black",a.fillRect(n,o,v,v),a.fillRect(h,c,v,v),i(this.canvasContext,t,s+r,t+1,this.canvas.height,"rgb(117,92,72)")}var a,n,o,h,c,l,v,g}resizeCanvas(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight}}function i(e,t,s,a,n,i){e.fillStyle=i,e.fillRect(t,s,a-t,n-s)}let r=new Image;r.src="./resources/skybox.jpg",(new Image).src="./resources/dirt.png";class o{constructor(e,t){this.Name=e,this.RawEvent=JSON.stringify(t)}}class h{constructor(e){this.User=e}}class c{constructor(e,t,s){this.PlayerID=e,this.NewX=t,this.NewY=s}}class l{constructor(e,t){this.PlayerID=(Math.random()+1).toString(36).substring(7),this.PossX=e,this.PossY=t}}var v,g;!function(e){e[e.Disconnected=1]="Disconnected",e[e.Connected=2]="Connected"}(g||(g={}));class w{constructor(e,t){this.serverURL=e,v=this}Connect(){this.socket=new WebSocket(this.serverURL),this.socket.onmessage=e=>{this.OnMessage(e)},this.socket.onerror=e=>{console.error("Get error from server: ",e)},this.socket.onclose=e=>{console.info("server close the connection",e)},this.socket.onopen=()=>{this.state=g.Connected;var e=new h(this.user);this.socket.send(JSON.stringify(new o("player_connect",e)))}}Move(e,t){if(this.state==g.Connected){var s=new c(this.user.PlayerID,e,t),a=new o("player_move",s);this.socket.send(JSON.stringify(a))}}OnMessage(e){console.log("get event from server: ",e);var t=JSON.parse(e.data);if(console.log("parse event: ",t),"player_move"===t.Name){var a=function(e){switch(e.Name){case"player_connect":case"player_move":return JSON.parse(e.RawEvent)}return null}(t),n=s.users.get(a.PlayerID);null==n&&(n=new l(a.NewX,a.NewY)),n.PossX=a.NewX,n.PossY=a.NewY,s.users.set(a.PlayerID,n)}}}let d=.1;class u{constructor(e){this.playerController=e}listeningMovement(){document.addEventListener("keydown",(e=>{switch(e.code){case"ArrowRight":s.angle+=10,s.angle=s.angle%360;break;case"ArrowLeft":s.angle-=10,s.angle=s.angle%360;break;case"KeyW":s.x+=d*Math.cos(t(s.angle)),s.y+=d*Math.sin(t(s.angle)),v.Move(s.x,s.y);break;case"KeyS":s.x-=d*Math.cos(t(s.angle)),s.y-=d*Math.sin(t(s.angle)),v.Move(s.x,s.y);break;case"KeyD":s.x+=d*Math.cos(t(s.angle+90)),s.y+=d*Math.sin(t(s.angle+90));break;case"KeyA":s.x+=d*Math.cos(t(s.angle-90)),s.y+=d*Math.sin(t(s.angle-90))}}))}}var y=document.getElementById("mainCanvas");y||console.error("failed to create canvas"),window.addEventListener("DOMContentLoaded",(()=>{var t=new e(new l(1,1));new w("ws://localhost:8080/api/data_stream",t).Connect(),new u(t),new n(y).animate()}))})();