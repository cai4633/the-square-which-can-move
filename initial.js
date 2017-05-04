var BORDER_WIDTH=4;
var LINE_WIDTH=1;
var coordinate={
	x:0,
	y:0,
	rotate:0

};
window.onload=function(){
	var canvas=document.getElementById('grid');
	var context=canvas.getContext("2d");
	square(5, 5, 0,context);
	drawGrid();
	handleBtn();

}

// 画网格；
function drawGrid(){
		var canvas=document.getElementById('grid');
		var context=canvas.getContext("2d");
		for (var i = 1; i <=9; i++) {			//利用canvas绘制网格；
		context.lineWidth=LINE_WIDTH;
		context.strokeStyle="#CECACA";
		context.lineCap="square";
		drawHorizontalLine(i, context);
		drawVerticalLine(i, context);
		}
			context.strokeStyle="#000";
			context.lineWidth=BORDER_WIDTH;	//绘制粗边框；
			drawHorizontalLine(0, context);	
			drawHorizontalLine(10, context);
			drawVerticalLine(0, context);
			drawVerticalLine(10, context);
		
					for(i=1; i<=10; i++){	//绘制数字；	
						context.font="bold 20px 宋体";
						context.fillstyle="#000";
						context.textAlign="center";
						context.textBaseline="middle";
						context.fillText(i,75+50*(i-1),25);
				context.fillText(i,25,75+50*(i-1));
	}
	}


// 为按钮绑定事件函数；
 function handleBtn(){
 	var canvas=document.getElementById('grid');
	var context=canvas.getContext("2d");
 	var enter1=document.getElementById('enter_1');
 	var select=document.getElementById("control_by_instruction");
 	var coordinateX=document.getElementById("coordinate_x");
 	var coordinateY=document.getElementById("coordinate_y");
 	var coordinateRotate=document.getElementById("coordinate_rotate");
 	enter1.onclick=function(){
 		if(select.selectedIndex===0){		//当select选择none时，利用坐标值直接控制小方块；
			square(coordinateX.value, coordinateY.value, coordinateRotate.value,context);
 		}
 		else if(select.selectedIndex===2){
 			// 当select选择TUNLEF时，逆时针旋转90度；
 			square(coordinate.x, coordinate.y, coordinate.rotate-90, context)
 		}
 		else if(select.selectedIndex===3){
 			// 当select选择TUNRIG时，顺时针旋转90度；
 			square(coordinate.x, coordinate.y, coordinate.rotate+90, context)
 		}
 		else if(select.selectedIndex===4){
 			// 当select选择TUNBAC时，逆时针旋转180度；
 			square(coordinate.x, coordinate.y, coordinate.rotate+180, context);
 		}
 		else{	//选择GO时的动作；
 			if (coordinate.rotate===0||coordinate.rotate===-360) {
 				square(coordinate.x, coordinate.y-1, coordinate.rotate, context);
 			}
 			else if(coordinate.rotate===90||coordinate.rotate===-270){
 				square(coordinate.x+1, coordinate.y, coordinate.rotate, context);
 			}
 			else if(coordinate.rotate===270||coordinate.rotate===-90){
 				square(coordinate.x-1, coordinate.y, coordinate.rotate, context);
 			}
 			else{
 				square(coordinate.x, coordinate.y+1, coordinate.rotate, context);
 			}
 		}
 	}

 }

// 画直线；
function drawHorizontalLine(n,cxt){
	cxt.beginPath();
	cxt.moveTo(50-BORDER_WIDTH/2,50+50*n-BORDER_WIDTH/2);
	cxt.lineTo(550-BORDER_WIDTH/2,50+50*n-BORDER_WIDTH/2);
	cxt.stroke();
}

// 画垂直线
function drawVerticalLine(n,cxt){
	cxt.beginPath();
	cxt.moveTo(50+50*n-BORDER_WIDTH/2,50);
	cxt.lineTo(50+50*n-BORDER_WIDTH/2,550-BORDER_WIDTH/2);
	cxt.stroke();
}

// 绘制会跑的小方块；
function square(x,y,rot,cxt){
	if (x<=10&&x>=1&&y<=10&&y>=1) {
			coordinate.x=x;
			coordinate.y=y;
			coordinate.rotate=rot%360;
			cxt.clearRect(0,0,550,550);
			drawGrid();
			cxt.beginPath();
			cxt.save();
			cxt.translate(x*50-BORDER_WIDTH/2+25,50*y-BORDER_WIDTH/2+25);		//确定旋转中心点
			cxt.rotate(rot/180*Math.PI);								//旋转坐标系；
			cxt.translate(-(x*50-BORDER_WIDTH/2+25),-(50*y-BORDER_WIDTH/2+25));		//改回原来的坐标系；
			cxt.lineCap="butt";
			cxt.lineWidth=10;
			cxt.strokeStyle="#5323EB";
			cxt.moveTo(x*50-BORDER_WIDTH/2,50*y+5-BORDER_WIDTH/2);
			cxt.lineTo(50*x+50-BORDER_WIDTH/2,50*y+5-BORDER_WIDTH/2);
			cxt.stroke();
			cxt.beginPath();
			cxt.lineWidth=40;
			cxt.strokeStyle="#F80E4B";
			cxt.moveTo(x*50-BORDER_WIDTH/2,50*y+30-BORDER_WIDTH/2);
			cxt.lineTo(50*x+50-BORDER_WIDTH/2,50*y+30-BORDER_WIDTH/2);
			cxt.stroke();
			cxt.restore();
	}
}