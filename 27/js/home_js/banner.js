






//banner
var oDiv = null;
var oUl = null;
var aLi = null; 
var oImg = null;

var imgWidth = 1920;
var iNow = 0;
var btn1 = null;
var btn2 = null;
var iSpeed = - imgWidth;
var divBtn = null;
var aA = null;


window.onload = function(){
	/*---------banner-------*/
	oDiv = document.getElementById("div0")
	oUl = oDiv.getElementsByTagName("ul")[0];

	aLi = oUl.getElementsByTagName("li");

	oImg = oUl.getElementsByTagName("img");

	btn1 = document.getElementById("left0");
	btn2 = document.getElementById("right0");

	divBtn = document.getElementById("btn");
	aA = divBtn.getElementsByTagName("a");

	oUl.style.width = imgWidth * aLi.length * 2 + "px";	
	oUl.innerHTML += oUl.innerHTML; 
	
	oUl.timer = setInterval(toRun,3000)
	for(var i = 0; i < aA.length; i++){
		aA[i].index = i;
		addEvent(aA[i],"click",changeColor);
	}	
	
	addEvent(btn1,"click",function(){
		clearInterval(oUl.timer);
		iSpeed = Math.abs(iSpeed);
		toRun();

	});
	addEvent(btn2,"click",function(){
		clearInterval(oUl.timer);
		iSpeed = - Math.abs(iSpeed)
		toRun();
	});	
}
function changeColor(){
	clearInterval(oUl.timer);
	for(var i = 0; i < aA.length; i++){
		aA[i].className = "";
	}
	this.className = "active";
	startMove(oUl,{left:- this.index * imgWidth})
}
function toRun(){
	//alert("ss");
	if(iNow == 2){
		iNow = 0;
	}else{
		iNow++;
	}
	for(var i = 0; i < aA.length; i++){
		aA[i].className = "";

	}
	aA[iNow].className = "active";
	if(oUl.offsetLeft <= -oUl.offsetWidth / 2){
		oUl.style.left = "0";
	}else if(oUl.offsetLeft >= 0){
		oUl.style.left = -oUl.offsetWidth / 2 + "px"; 
	}
	startMove(oUl,{left:oUl.offsetLeft + iSpeed})
}

window.onresize = function(){
	var viewWidth = document.documentElement.clientWidth || document.body.clientWidth;
	if(viewWidth > 1210){
		for(var i = 0; i < oImg.length; i++){
			oImg[i].style.left = (imgWidth - viewWidth) / 2 + "px";
		}
		
	}
}

