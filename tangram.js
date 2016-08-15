var tangram = [
	{p:[{x:0,y:0},{x:800,y:0},{x:400,y:400}],color:"#caff67"},
	{p:[{x:0,y:0},{x:400,y:400},{x:0,y:800}],color:"#67becf"},
	{p:[{x:800,y:0},{x:800,y:400},{x:600,y:600},{x:600,y:200}],color:"#ef3d61"},
	{p:[{x:600,y:200},{x:600,y:600},{x:400,y:400}],color:"#f9f51a"},
	{p:[{x:400,y:400},{x:600,y:600},{x:400,y:800}],color:"#a594c0"},
	{p:[{x:200,y:600},{x:400,y:800},{x:0,y:800}],color:"#fa8ecc"},
	{p:[{x:800,y:400},{x:800,y:800},{x:400,y:800}],color:"#f6ca29"}
];
var color = ["#caff67","#67becf","#ef3d61","#f9f51a","#a594c0","#fa8ecc","#f6ca29"];

window.onload = function(){
	var canvas = $("#tangram")[0];
	canvas.style.marginLeft = 150+"px";
	var ctx = canvas.getContext("2d");
	canvas.width = 400;
	canvas.height = 400;
	setInterval(update,500);
	function update(){
		updatecolor(ctx, tangram, color);
		}
	}
function updatecolor(ctx, tangram, color){
	console.log("update");
	for(var i = 0; i < tangram.length; i++){
		draw(ctx, tangram[i], color[i], 0.5);
		}
	var temp = color[0];
	for(var i = 0; i < color.length - 1; i++){
		color[i] = color[i+1];
		}
	color[i] = temp;
}
function draw(ctx, piece, color, scale){
	var nedge = piece.p.length;
	
	ctx.beginPath();
	ctx.moveTo(piece.p[0].x*scale,piece.p[0].y*scale);
	for(var i = 1; i < nedge; i++){
		ctx.lineTo(piece.p[i].x*scale,piece.p[i].y*scale);
		}
	ctx.lineTo(piece.p[0].x*scale,piece.p[0].y*scale);
	ctx.fillStyle = color;
	ctx.width = 5;
	ctx.strokeStyle = "black";
	ctx.fill();
	ctx.stroke();
}