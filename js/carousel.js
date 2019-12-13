/*
* @Author: JJIXI
* @Date:   2019-12-09 22:37:38
* @Last Modified by:   JJIXI
* @Last Modified time: 2019-12-13 18:35:29
*/
var box = document.getElementById('box');
var oNavlist = document.getElementById('nav').children;
var slider = document.getElementById('slider');
var left = document.getElementById('left');
var right = document.getElementById('right');
var wen = document.getElementById('wen');
var index = 1;
var timer;
var isMoving = false;
//滚动字幕
function roll(){
	var now = parseInt(getStyle(wen, "left"));
	if (wen.style.left== "-380px") {
		wen.style.left="1000px";
	}else{
			wen.style.left = now -1+"px";
	}
}
var	time = setInterval(roll, 30);
//轮播下一张的函数
function next(){
	if (!isMoving) {
		isMoving = true;
		index++;
		navChange();
		animate(slider,{left:-1200*index},function(){
			if (index >5) {
				slider.style.left = "-1200px";
				index = 1;
			}
			isMoving = false;
		});	
	}
}
function prev(){
	if (isMoving) {
		return;
	}
	isMoving = true;
	index--;
	navChange();
	animate(slider,{left:-1200*index},function(){
		if (index === 0) {
			slider.style.left = -1200*5+"px";
			index = 5;
		}
		isMoving = false;
	});

}

var timer = setInterval(next,3000);
//var ti = setInterval(prev, 3000);

 //鼠标划入清定时器
box.onmouseover = function(){
	animate(left,{opacity:50});//左箭头
	animate(right,{opacity:50});//右箭头
	clearInterval(timer);

}
//鼠标滑出开定时器
box.onmouseout = function(){
	animate(left,{opacity:0});
	animate(right,{opacity:0});
	timer = setInterval(next, 3000);

} 
right.onclick = next;
left.onclick = prev;
//小按钮点击事件
for(var j= 0;j<oNavlist.length;j++){
	oNavlist[j].idx=j;
	oNavlist[j].onclick = function(){
		index=this.idx+1;
		navChange();
		animate(slider,{left:-1200*index});
	}
}
//小按钮背景色切换
function navChange(){
	for (var i = 0; i < oNavlist.length; i++) {
		oNavlist[i].className = '';
	}//样式清空
	if (index >5) {
		oNavlist[0].className = 'active';
	}else if(index === 0){
		oNavlist[4].className = 'active';
	}else{
		oNavlist[index-1].className = 'active';
	}
}
