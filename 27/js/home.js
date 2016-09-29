

window.onresize = function(){
	var oDiv = document.getElementById("bannerDiv")
	var oUl = oDiv.getElementsByTagName("ul")[0];
	var oImg = oUl.getElementsByTagName("img");
	var viewWidth = document.documentElement.clientWidth || document.body.clientWidth;
	if(viewWidth > 1210){
		for(var i = 0; i < oImg.length; i++){
			oImg[i].style.left = (1920 - viewWidth) / 2 + "px";
		}
	}
	toRight()
}
window.onload = function(){
	
	/*---------banner-------*/
	var aBtn = $("#btn").find("a");
	var oUl = $("#bannerDiv").find("ul");
	var aLi = oUl.find("li");
	var iNow = 0;
	var timer1 = null;

	oUl.css("width", 1920 * aLi.size() + "px");
	aLi.eq(0).clone().appendTo(oUl)
		//点击下面三个切换按钮，跳转到对应图片
		aBtn.on("click",function(){
			clearInterval(timer1)
			iNow = $(this).index();
			toRight()
		});
		//点击左右两个按钮完成向左和向右移动
		$("#right0").on("click",function(){

			clearInterval(timer1);
			iNow++
			toRight();
		});
		
		timer1 = setInterval(function(){
			iNow ++;
			toRight();
		}, 3000);
		

		function toRight(){
			aBtn.attr("class","");
			//alert(iNow)
			aBtn.eq(iNow).attr("class","active");

			if(iNow == aLi.size() ){
				aBtn.eq(0).attr("class","active")
			}
			oUl.animate({left: - iNow * 1920},function(){
				if(iNow == aLi.size() ){
					iNow = 0;
					oUl.css("left",0)
				}
			});
			
		}
	
	/*function toLeft(){
		aBtn.attr("class","");
		aBtn.eq(iNow).attr("class","active");

		if(iNow == aLi.size()){
			aBtn.eq(0).attr("class","active")
		}
		oUl.animate({left: iNow * 1920},function(){
			if(iNow == 0 ){
				iNow = aLi.size();
				oUl.css("left",- 1920 * aLi.size())
			}
		});
	}*/

		act_getData();
		/*----------activity JSON部分--------*/
		function act_getData(){
			ajax("get","json/activity.json","",function(data){
				var oDiv0 = document.getElementById("activity_div0"); 
				var act_oUl = document.createElement("ul");
					act_oUl.className = "act_ul";
					oDiv0.appendChild(act_oUl);
				
				var act_arr = JSON.parse(data).act_data;
				for(var i = 0; i < act_arr.length; i++){
					var act_aLi = document.createElement("li");
					act_oUl.appendChild(act_aLi);
					var newAct_arr = act_arr[i].pic;
					for(var j = 0; j < newAct_arr.length; j++){
						var act_a = document.createElement("a");
						act_aLi.appendChild(act_a);
						var act_img = document.createElement("img");
						act_a.appendChild(act_img);
						act_img.src = newAct_arr[j].img_link;
					}	
				}
				/*----------activity 运动部分--------*/
				var divBtn1 = document.getElementById("activity_btn");
				var aA1 = divBtn1.getElementsByTagName("a");
				var left1 = document.getElementById("left1");
				var right1 = document.getElementById("right1");
				var iNow1 = 0;
				var imgWidth1 = 1210;
				var iSpeed1 = - imgWidth1;
				
				act_oUl.style.width = act_aLi.length * imgWidth1 * 2 + "px";
				act_oUl.innerHTML += act_oUl.innerHTML;

				for(var i = 0; i < aA1.length; i++){
			 		aA1[i].index = i;
			 		addEvent(aA1[i],"click",changeColor1);
			 	};
			 	function changeColor1(){
			 		for(var i = 0; i < aA1.length; i++){
			 			aA1[i].className = "";
			 		}
			 		this.className = "active";
			 		startMove(act_oUl,{left:- this.index * imgWidth1})
			 	};

				addEvent(left1,"click",left1Click)
				function left1Click(){
				 	clearInterval(timer2);
				 	iSpeed1 = Math.abs(iSpeed1);
				 	toRun1();
				};
				
				addEvent(right1,"click",right1Click)
				function right1Click(){
				 	clearInterval(timer2);
				 	iSpeed1 = - Math.abs(iSpeed1);
				 	toRun1();
				 };
				var timer2 = setInterval(toRun1,3000)
				function toRun1(){
					if(iNow1 == 2){
						iNow1 = 0;
					}else{
						iNow1++;
					}
					for(var i = 0; i < aA1.length; i++){
						aA1[i].className = "";
					}
					aA1[iNow1].className = "active";
					if(act_oUl.offsetLeft < - act_oUl.offsetWidth / 2){
						act_oUl.style.left = 0;
					}else if(act_oUl.offsetLeft > 0){
						act_oUl.style.left = - act_oUl.offsetWidth / 2 +"px"; 
					}
					startMove(act_oUl,{left:act_oUl.offsetLeft + iSpeed1})
				}
					
					});
				}
		

	//获取新品部分JSON数据
	ajax("get","json/new_product.json","",function(data){
		var np_oDiv = document.getElementById("np_div")
		var np_arr = JSON.parse(data).np_data;
		for(var i = 0; i < np_arr.length; i++){
			var np_a = document.createElement("a");
			np_oDiv.appendChild(np_a)
			np_a.href = np_arr[i].hyperLink;
			var np_img = document.createElement("img");
			np_img.src = np_arr[i].link;
			np_a.appendChild(np_img);
			var np_oDiv1 = document.createElement("div");
			np_a.appendChild(np_oDiv1);

			var np0_h4 = document.createElement("h4");
			np_oDiv1.appendChild(np0_h4);
			np0_h4.innerHTML = np_arr[i].title_1;
			
			var np1_h4 = document.createElement("h4");
			np1_h4.innerHTML = np_arr[i].title_2;
			np_oDiv1.appendChild(np1_h4);

			var np_p1 = document.createElement("p");
			np_p1.innerHTML = np_arr[i].title_3;
			np_oDiv1.appendChild(np_p1);

			var np_p2 = document.createElement("p");
			np_p2.innerHTML = np_arr[i].title_4;
			np_oDiv1.appendChild(np_p2);

			var np_span = document.createElement("span");
			np_span.innerHTML = np_arr[i].price;
			np_oDiv1.appendChild(np_span);
		}
		
	})

	//获取数码产品VIDEO部分数据
	ajax("get","json/video.json","",function(data){
		var v_oDiv = document.getElementById("v_div");
		//创建left大块div
		var vd_oDiv = document.createElement("div");
		vd_oDiv.className = "vd_left";
		v_oDiv.appendChild(vd_oDiv);
		
		
		/*---------------------------左边整块的元素--------------------------*/
		var v_arr1 = JSON.parse(data)._data1;
		for(var i = 0; i < v_arr1.length; i++){
			var vd_a = document.createElement("a");
			vd_oDiv.appendChild(vd_a);
			vd_a.className = v_arr1[i].className;
			vd_a.style.position = "relative";
			vd_a.style.display = "block";

			var div_child = document.createElement("div");
			div_child.className = "pab_div";
			vd_a.appendChild(div_child);
			div_child.style.position = "absolute";
			div_child.style.left = "21px";
			div_child.style.top = "21px";

			//创建标题
			var vd_p = document.createElement("p");
			div_child.appendChild(vd_p);
			vd_p.innerHTML = v_arr1[i].name

			//创建描述
			var vt_arr = v_arr1[i].title;
			for(var j = 0; j < vt_arr.length; j++){
				var vd_h4 = document.createElement("h4");
				div_child.appendChild(vd_h4);
				vd_h4.innerHTML = vt_arr[j].des;

			}

			//创建价格
			var vd_span = document.createElement("span");
			div_child.appendChild(vd_span);
			vd_span.innerHTML = v_arr1[i].price;
			
			//创建促销信息tag
			var vd_em = document.createElement("em");
			div_child.appendChild(vd_em);
			vd_em.style.background = "url(" + v_arr1[i].tag + ")no-repeat";

			var vd_i = document.createElement("i");
			vd_a.appendChild(vd_i);
			vd_i.style.background = "url(" + v_arr1[i].lable1 + ") no-repeat";

			var vd_strong = document.createElement("strong");
			vd_a.appendChild(vd_strong);
			vd_strong.style.background = "url(" + v_arr1[i].lable2 + ")no-repeat";

			var vd_img = document.createElement("img");
			vd_a.appendChild(vd_img);
			vd_img.src = v_arr1[i].imglink;
			vd_img.style.position = "absolute";
		}

		//创建right大块div
		var vd_oDiv1 = document.createElement("div");
		vd_oDiv1.className = "vd_right";
		v_oDiv.appendChild(vd_oDiv1)

		//创建右边小块div放right1和right2
		var vdr_oDiv = document.createElement("div");
		vd_oDiv1.appendChild(vdr_oDiv);
		vdr_oDiv.className = "vdr_right1";

		/*---------------------------右边小块的元素--------------------------*/
		var v_arr2 = JSON.parse(data)._data2;
		for(var j = 0; j < v_arr2.length; j++ ){
			var vd_a = document.createElement("a");
			vdr_oDiv.appendChild(vd_a);
			vd_a.className = v_arr2[j].className;
			vd_a.style.position = "relative";
			vd_a.style.display = "block";

			var div_child = document.createElement("div");
			div_child.className = "pab_div";
			vd_a.appendChild(div_child);
			div_child.style.position = "absolute";
			div_child.style.left = "21px";
			div_child.style.top = "21px";
			//创建标题
			var vd_p = document.createElement("p");
			div_child.appendChild(vd_p);
			vd_p.innerHTML = v_arr2[j].name
			//创建描述
			var vt_arr = v_arr2[j].title;
			for(var k = 0; k < vt_arr.length; k++){
				var vd_h4 = document.createElement("h4");
				div_child.appendChild(vd_h4);
				vd_h4.innerHTML = vt_arr[k].des;

			}

			//创建促销信息tag
			var vd_em = document.createElement("em");
			div_child.appendChild(vd_em);
			vd_em.style.background = "url(" + v_arr2[j].tag + ")no-repeat"

			var vd_i = document.createElement("i");
			vd_a.appendChild(vd_i);
			vd_i.style.background = "url(" + v_arr2[j].lable1 + ") no-repeat";

			var vd_strong = document.createElement("strong");
			vd_a.appendChild(vd_strong);
			vd_strong.style.background = "url(" + v_arr2[j].lable2 + ")no-repeat";

			var vd_img = document.createElement("img");
			vd_a.appendChild(vd_img);
			vd_img.src = v_arr2[j].imglink;
			vd_img.style.position = "absolute";
		}

		/*---------------------------右边大块的元素--------------------------*/
		var v_arr3 = JSON.parse(data)._data3
		for(var k = 0; k < v_arr3.length; k++ ){
			var vd_a = document.createElement("a");
			vd_oDiv1.appendChild(vd_a);
			vd_a.className = v_arr3[k].className;
			vd_a.style.position = "relative";
			vd_a.style.zIndex = 1;
			vd_a.style.overflow = "hidden";
			vd_a.style.display = "block";

			var div_child = document.createElement("div");
			div_child.className = "pab_div";
			vd_a.appendChild(div_child);
			div_child.style.position = "absolute";
			div_child.style.left = "21px";
			div_child.style.top = "21px";
			//创建标题
			var vd_p = document.createElement("p");
			div_child.appendChild(vd_p);
			vd_p.innerHTML = v_arr3[k].name;
			//创建描述
			var vt_arr = v_arr3[k].title;
			for(var j = 0; j < vt_arr.length; j++){
				var vd_h4 = document.createElement("h4");
				div_child.appendChild(vd_h4);
				vd_h4.innerHTML = vt_arr[j].des;

			}
			//创建价格
			var vd_span = document.createElement("span");
			div_child.appendChild(vd_span);
			vd_span.innerHTML = v_arr3[k].price;

			//创建促销信息tag
			var vd_em = document.createElement("em");
			vd_a.appendChild(vd_em);
			vd_em.style.background = "url(" + v_arr3[k].tag + ")no-repeat"

			var vd_i = document.createElement("i");
			vd_a.appendChild(vd_i);
			vd_i.style.background = "url(" + v_arr3[k].lable1 + ") no-repeat";

			var vd_strong = document.createElement("strong");
			vd_a.appendChild(vd_strong);
			vd_strong.style.background = "url(" + v_arr3[k].lable2 + ")no-repeat";
			
			
			
			var vd_img = document.createElement("img");
			vd_a.appendChild(vd_img);
			vd_img.src = v_arr3[k].imglink;
			vd_img.style.position = "absolute";
		}
		$("#v_div").find("a").css("overflow","hidden");

		//左边所有图片缩放
		var au_aA1 = $(".vd_left").find("a");

		au_aA1.eq(0).hover(function(){
			au_aA1.eq(0).find("img").animate({width:610,height:713,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA1.eq(0).find("img").animate({width:600,height:703,marginTop:0,marginLeft:0});
		});

		au_aA1.eq(1).hover(function(){
			au_aA1.eq(1).find("img").animate({width:330,height:266,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA1.eq(1).find("img").animate({width:320,height:256,marginTop:0,marginLeft:0})
	
		});

		au_aA1.eq(2).hover(function(){
			au_aA1.eq(2).find("img").animate({width:305,height:408,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA1.eq(2).find("img").animate({width:295,height:398,marginTop:0,marginLeft:0})
	
		});

		au_aA1.eq(3).hover(function(){
			au_aA1.eq(3).find("img").animate({width:146,height:116,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA1.eq(3).find("img").animate({width:136,height:106,marginTop:0,marginLeft:0})
	
		});

		au_aA1.eq(4).hover(function(){
			au_aA1.eq(4).find("img").animate({width:146,height:116,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA1.eq(4).find("img").animate({width:136,height:106,marginTop:0,marginLeft:0})
	
		});

		//右边小块div移动
		var au_aA2 = $(".vdr_right1").find("a");

		au_aA2.eq(0).hover(function(){
			au_aA2.eq(0).find("img").animate({width:146,height:116,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA2.eq(0).find("img").animate({width:136,height:106,marginTop:0,marginLeft:0})
	
		});

		au_aA2.eq(1).hover(function(){
			au_aA2.eq(1).find("img").animate({width:146,height:116,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA2.eq(1).find("img").animate({width:136,height:106,marginTop:0,marginLeft:0})
	
		});

		//右边大块移动
		var au_aA3 = $("#v_div").find("div.vd_right").find("a");
		au_aA3.eq(2).hover(function(){
			au_aA3.eq(2).find("img").animate({width:305,height:408,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA3.eq(2).find("img").animate({width:295,height:398,marginTop:0,marginLeft:0});
		});

		au_aA3.eq(3).hover(function(){
			au_aA3.eq(3).find("img").animate({width:180,height:130,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA3.eq(3).find("img").animate({width:170,height:120,marginTop:0,marginLeft:0})
	
		});

		au_aA3.eq(4).hover(function(){
			au_aA3.eq(4).find("img").animate({width:180,height:130,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA3.eq(4).find("img").animate({width:170,height:120,marginTop:0,marginLeft:0})
	
		});

		au_aA3.eq(5).hover(function(){
			au_aA3.eq(5).find("img").animate({width:610,height:713,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA3.eq(5).find("img").animate({width:600,height:703,marginTop:0,marginLeft:0})
	
		});				
	});
	
	//通过JSON获取audio部分数据
	ajax("get","json/audio.json","",function(data){
		var v_oDiv = $("#a_div");
		//创建left大块div
		var vd_oDiv = $("<div></div>");
		vd_oDiv.attr("class","vd_left");
		v_oDiv.append(vd_oDiv);
		
		
		/*---------------------------左边整块的元素--------------------------*/
		var v_arr4 = JSON.parse(data)._data4;
		for(var i = 0; i < v_arr4.length; i++){
			var vd_a = $("<a></a>");
			vd_oDiv.append(vd_a);
			vd_a.attr("class",v_arr4[i].className);
			vd_a.css("position","relative");
			vd_a.css("display","block");

			var div_child = $("<div></div>");
			div_child.css("class","pab_div");
			vd_a.append(div_child);
			div_child.css("position","absolute");
			div_child.css("left","21px");
			div_child.css("top","21px");

			//创建标题
			var vd_p = $("<p></p>");
			div_child.append(vd_p);
			vd_p.html(v_arr4[i].name);

			//创建描述
			
			var vd_h4 = $("<h4></h4>");
			div_child.append(vd_h4);
			vd_h4.html(v_arr4[i].title);

			

			//创建价格
			var vd_span = $("<span></span>");
			div_child.append(vd_span);
			vd_span.html(v_arr4[i].price);

			var vd_i = $("<i></i>");
			vd_a.append(vd_i);
			vd_i.css("background","url(" + v_arr4[i].lable1 + ") no-repeat");

			var vd_img =$("<img/>");
			vd_a.append(vd_img);
			vd_img.attr("src",v_arr4[i].imglink);
			vd_img.css("position","absolute");
		}

		//创建right大块div
		var vd_oDiv1 = document.createElement("div");
		vd_oDiv1.className = "vd_right";
		v_oDiv.append(vd_oDiv1)

		//创建右边小块div放right1和right2
		var vdr_oDiv = document.createElement("div");
		vd_oDiv1.appendChild(vdr_oDiv);
		vdr_oDiv.className = "vdr_right1";

		/*---------------------------右边小块的元素--------------------------*/
		var v_arr5 = JSON.parse(data)._data5;
		for(var j = 0; j < v_arr5.length; j++ ){
			var vd_a = document.createElement("a");
			vdr_oDiv.appendChild(vd_a);
			vd_a.className = v_arr5[j].className;
			vd_a.style.position = "relative";
			vd_a.style.display = "block";

			var div_child = document.createElement("div");
			div_child.className = "pab_div";
			vd_a.appendChild(div_child);
			div_child.style.position = "absolute";
			div_child.style.left = "21px";
			div_child.style.top = "21px";
			//创建标题
			var vd_p = document.createElement("p");
			div_child.appendChild(vd_p);
			vd_p.innerHTML = v_arr5[j].name
			//创建描述
			
			var vd_h4 = document.createElement("h4");
			div_child.appendChild(vd_h4);
			vd_h4.innerHTML = v_arr5[j].title;

			var vd_i = document.createElement("i");
			vd_a.appendChild(vd_i);
			vd_i.style.background = "url(" + v_arr5[j].lable1 + ") no-repeat";


			var vd_img = document.createElement("img");
			vd_a.appendChild(vd_img);
			vd_img.src = v_arr5[j].imglink;
			vd_img.style.position = "absolute";

			//创建价格
			var vd_span = document.createElement("span");
			div_child.appendChild(vd_span);
			vd_span.innerHTML = v_arr5[j].price;
		}

		/*---------------------------右边大块的元素--------------------------*/
		var v_arr6 = JSON.parse(data)._data6
		for(var k = 0; k < v_arr6.length; k++ ){
			var vd_a = document.createElement("a");
			vd_oDiv1.appendChild(vd_a);
			vd_a.className = v_arr6[k].className;
			vd_a.style.position = "relative";
			vd_a.style.zIndex = 1;
			vd_a.style.overflow = "hidden";
			vd_a.style.display = "block";

			var div_child = document.createElement("div");
			div_child.className = "pab_div";
			vd_a.appendChild(div_child);
			div_child.style.position = "absolute";
			div_child.style.left = "21px";
			div_child.style.top = "21px";
			//创建标题
			var vd_p = document.createElement("p");
			div_child.appendChild(vd_p);
			vd_p.innerHTML = v_arr6[k].name;

			var vd_h4 = document.createElement("h4");
			div_child.appendChild(vd_h4);
			vd_h4.innerHTML = v_arr6[k].title;

			var vd_i = document.createElement("i");
			vd_a.appendChild(vd_i);
			vd_i.style.background = "url(" + v_arr6[k].lable1 + ") no-repeat";

			var vd_img = document.createElement("img");
			vd_a.appendChild(vd_img);
			vd_img.src = v_arr6[k].imglink;
			vd_img.style.position = "absolute";

			//创建价格
			var vd_span = document.createElement("span");
			div_child.appendChild(vd_span);
			vd_span.innerHTML = v_arr6[k].price;
		}

		$("#a_div").find("a").css("overflow","hidden");

		//左边所有图片缩放
		var au_aA1 = $("#a_div").find(".vd_left").find("a");

		au_aA1.eq(0).hover(function(){
			au_aA1.eq(0).find("img").animate({width:610,height:713,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA1.eq(0).find("img").animate({width:600,height:703,marginTop:0,marginLeft:0});
		});

		au_aA1.eq(1).hover(function(){
			au_aA1.eq(1).find("img").animate({width:610,height:304,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA1.eq(1).find("img").animate({width:600,height:294,marginTop:0,marginLeft:0})
	
		});

		au_aA1.eq(2).hover(function(){
			au_aA1.eq(2).find("img").animate({width:268,height:182,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA1.eq(2).find("img").animate({width:258,height:172,marginTop:0,marginLeft:0})
	
		});

		au_aA1.eq(3).hover(function(){
			au_aA1.eq(3).find("img").animate({width:146,height:116,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA1.eq(3).find("img").animate({width:136,height:106,marginTop:0,marginLeft:0})
	
		});

		au_aA1.eq(4).hover(function(){
			au_aA1.eq(4).find("img").animate({width:146,height:116,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA1.eq(4).find("img").animate({width:136,height:106,marginTop:0,marginLeft:0})
	
		});

		//右边小块div移动
		var au_aA2 = $(".vdr_right1").find("a");

		au_aA2.eq(0).hover(function(){
			au_aA2.eq(0).find("img").animate({width:146,height:116,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA2.eq(0).find("img").animate({width:136,height:106,marginTop:0,marginLeft:0})
	
		});

		au_aA2.eq(1).hover(function(){
			au_aA2.eq(1).find("img").animate({width:146,height:116,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA2.eq(1).find("img").animate({width:136,height:106,marginTop:0,marginLeft:0})
	
		});

		//右边大块移动
		var au_aA3 = $("#a_div").find(".vd_right").find("a");
		au_aA3.eq(2).hover(function(){
			au_aA3.eq(2).find("img").animate({width:268,height:182,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA3.eq(2).find("img").animate({width:258,height:172,marginTop:0,marginLeft:0});
		});

		au_aA3.eq(3).hover(function(){
			au_aA3.eq(3).find("img").animate({width:180,height:130,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA3.eq(3).find("img").animate({width:170,height:120,marginTop:0,marginLeft:0})
	
		});

		au_aA3.eq(4).hover(function(){
			au_aA3.eq(4).find("img").animate({width:180,height:130,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA3.eq(4).find("img").animate({width:170,height:120,marginTop:0,marginLeft:0})
	
		});

		au_aA3.eq(5).hover(function(){
			au_aA3.eq(5).find("img").animate({width:610,height:713,marginTop:-5,marginLeft:-5})
		},function(){
			au_aA3.eq(5).find("img").animate({width:600,height:703,marginTop:0,marginLeft:0})
	
		});				

	});
	
	ajax("get","json/tv.json","",function(data){
		var tv_oDiv = $("<div></div>");
		tv_oDiv.attr("class","tv_left");
		tv_oDiv.appendTo($("#tv_div"));
		/*---------左边1,2张---------*/
		var tv_arr1 = JSON.parse(data)._data7;
		for(var i = 0; i < tv_arr1.length; i++){
			var tv_a = $("<a></a>");
			tv_a.css("display","block")
			tv_a.attr("class",tv_arr1[i].className);
			tv_a.appendTo(tv_oDiv);

			//添加图片
			var tv_img = $("<img/>");
			tv_img.attr("src",tv_arr1[i].imglink);
			tv_img.appendTo(tv_a);

			$("#tv_div").find("a").find("img").eq(1).css("right","10px");
			$("#tv_div").find("a").find("img").eq(1).css("bottom","10px");

			//插入div文字部分
			var a_div = $("<div></div>");
			a_div.appendTo(tv_a);
			a_div.attr("class","tva_div")
			a_div.css("position","absolute");
			a_div.css("left","20px");
			a_div.css("top","20px");

			var a_p = $("<p></p>");
			a_p.appendTo(a_div);
			a_p.html(tv_arr1[i].name);

			var tv_newArr = tv_arr1[i].title;
			for(var j = 0; j < tv_newArr.length; j++){
				var tv_h4 = $("<h4></h4>");
				tv_h4.appendTo(a_div);
				tv_h4.html(tv_newArr[j].des);
			}

			var tv_span = $("<span></span>");
			tv_span.appendTo(a_div);
			tv_span.html(tv_arr1[i].price);
		};

		/*---------左边3,4张---------*/
		var oDiv_child = $("<div></div>");
		oDiv_child.appendTo(tv_oDiv);
		oDiv_child.attr("class","tv1_left");
		var tv_arr2 = JSON.parse(data)._data8;
		for(var i = 0; i < tv_arr2.length;i++){
			var tv_a = $("<a></a>");
			tv_a.css("display","block")
			tv_a.attr("class",tv_arr2[i].className);
			tv_a.appendTo(oDiv_child);

			//添加图片
			var tv_img = $("<img/>");
			tv_img.attr("src",tv_arr2[i].imglink);
			tv_img.appendTo(tv_a);
			tv_img.css("right","10px");
			tv_img.css("bottom","10px");

			//插入div文字部分
			var a_div = $("<div></div>");
			a_div.appendTo(tv_a);
			a_div.attr("class","tva_div")
			a_div.css("position","absolute");
			a_div.css("left","20px");
			a_div.css("top","20px");

			var a_p = $("<p></p>");
			a_p.appendTo(a_div);
			a_p.html(tv_arr2[i].name);

			var tv_newArr = tv_arr2[i].title;
			for(var j = 0; j < tv_newArr.length; j++){
				var tv_h4 = $("<h4></h4>");
				tv_h4.appendTo(a_div);
				tv_h4.html(tv_newArr[j].des);
			};

			var tv_span = $("<span></span>");
			tv_span.appendTo(a_div);
			tv_span.html(tv_arr2[i].price);

			var tv_i = $("<i></i>");
			tv_i.appendTo(tv_a);
			tv_i.css("background","url(" + tv_arr2[i].lable1 +") no-repeat")
		};

		/*---------中间1,2，3,4张---------*/
		var tv_oDiv1 = $("<div></div>");
		tv_oDiv1.attr("class","tv1_right");
		tv_oDiv1.appendTo($("#tv_div"));

		var tv_arr3 = JSON.parse(data)._data9;
		for(var i = 0; i < tv_arr3.length;i++){
			var tv_a = $("<a></a>");
			tv_a.css("display","block")
			tv_a.attr("class",tv_arr3[i].className);
			tv_a.appendTo(tv_oDiv1);

			//添加图片
			var tv_img = $("<img/>");
			tv_img.attr("src",tv_arr3[i].imglink);
			tv_img.appendTo(tv_a);
			tv_img.css("right","10px");
			tv_img.css("bottom","10px");

			//插入div文字部分
			var a_div = $("<div></div>");
			a_div.appendTo(tv_a);
			a_div.attr("class","tva_div")
			a_div.css("position","absolute");
			a_div.css("left","20px");
			a_div.css("top","20px");

			var a_p = $("<p></p>");
			a_p.appendTo(a_div);
			a_p.html(tv_arr3[i].name);

			var tv_newArr = tv_arr3[i].title;
			for(var j = 0; j < tv_newArr.length; j++){
				var tv_h4 = $("<h4></h4>");
				tv_h4.appendTo(a_div);
				tv_h4.html(tv_newArr[j].des);
			};

			var tv_span = $("<span></span>");
			tv_span.appendTo(a_div);
			tv_span.html(tv_arr3[i].price);

			var tv_i = $("<i></i>");
			tv_i.appendTo(tv_a);
			tv_i.css("background","url(" + tv_arr3[i].lable1 +") no-repeat")
		};

		/*---------右边4张---------*/
		var tv_oDiv2 = $("<div></div>");
		tv_oDiv2.attr("class","tv2_right");
		tv_oDiv2.appendTo($("#tv_div"));

		var tv_arr4 = JSON.parse(data)._data10;
		for(var i = 0; i < tv_arr4.length;i++){
			var tv_a = $("<a></a>");
			tv_a.css("display","block")
			tv_a.attr("class",tv_arr4[i].className);
			tv_a.appendTo(tv_oDiv2);

			//添加图片
			var tv_img = $("<img/>");
			tv_img.attr("src",tv_arr4[i].imglink);
			tv_img.appendTo(tv_a);

			$("#tv_div").find("a.tv_right7").find("img").eq(0).css("right","10px");
			$("#tv_div").find("a.tv_right7").find("img").eq(0).css("bottom","10px");

			$("#tv_div").find("a.tv_right8").find("img").eq(0).css("right","10px");
			$("#tv_div").find("a.tv_right8").find("img").eq(0).css("bottom","10px");

			//插入div文字部分
			var a_div = $("<div></div>");
			a_div.appendTo(tv_a);
			a_div.attr("class","tva_div")
			a_div.css("position","absolute");
			a_div.css("left","20px");
			a_div.css("top","20px");

			var a_p = $("<p></p>");
			a_p.appendTo(a_div);
			a_p.html(tv_arr4[i].name);

			var tv_h4 = $("<h4></h4>");
			tv_h4.appendTo(a_div);
			tv_h4.html(tv_arr4[i].title);

			var tv_span = $("<span></span>");
			tv_span.appendTo(a_div);
			tv_span.html(tv_arr4[i].price);

			var tv_i = $("<i></i>");
			tv_i.appendTo(tv_a);
			tv_i.css("background","url(" + tv_arr4[i].lable1 +") no-repeat")
			
		};

		$("#tv_div").find("a").css("position","relative");
		$("#tv_div").find("a").find("img").css("position","absolute");
		$("#tv_div").find("a").find("i").css("position","absolute");
		$("#tv_div").find("a").find("i").css("display","block");
		
		//左边1,2 移动
		var tv_aA1 = $(".tv_left").find("a");

		tv_aA1.eq(0).hover(function(){
			tv_aA1.eq(0).find("img").animate({width:610,height:713,marginTop:-5,marginLeft:-5})
		},function(){
			tv_aA1.eq(0).find("img").animate({width:600,height:703,marginTop:0,marginLeft:0})
		});

		tv_aA1.eq(1).hover(function(){
			tv_aA1.eq(1).find("img").animate({width:268,height:182,marginTop:-5,marginLeft:-5})
		},function(){
			tv_aA1.eq(1).find("img").animate({width:258,height:172,marginTop:0,marginLeft:0})
	
		});

		//左边3,4
		var tv_aA2 = $(".tv1_left").find("a");

		tv_aA2.eq(0).hover(function(){
			tv_aA2.eq(0).find("img").animate({width:146,height:116,marginTop:-5,marginLeft:-5})
		},function(){
			tv_aA2.eq(0).find("img").animate({width:136,height:106,marginTop:0,marginLeft:0})
		});

		tv_aA2.eq(1).hover(function(){
			tv_aA2.eq(1).find("img").animate({width:146,height:116,marginTop:-5,marginLeft:-5})
		},function(){
			tv_aA2.eq(1).find("img").animate({width:136,height:106,marginTop:0,marginLeft:0})
	
		});

		//中间1,2,3,4
		var tv_aA3 = $(".tv1_right").find("a");

		tv_aA3.eq(0).hover(function(){
			tv_aA3.eq(0).find("img").animate({width:180,height:130,marginTop:-5,marginLeft:-5})
		},function(){
			tv_aA3.eq(0).find("img").animate({width:170,height:120,marginTop:0,marginLeft:0})
		});

		tv_aA3.eq(1).hover(function(){
			tv_aA3.eq(1).find("img").animate({width:268,height:182,marginTop:-5,marginLeft:-5})
		},function(){
			tv_aA3.eq(1).find("img").animate({width:258,height:172,marginTop:0,marginLeft:0})
	
		});

		tv_aA3.eq(2).hover(function(){
			tv_aA3.eq(2).find("img").animate({width:146,height:116,marginTop:-5,marginLeft:-5})
		},function(){
			tv_aA3.eq(2).find("img").animate({width:136,height:106,marginTop:0,marginLeft:0})
		});

		tv_aA3.eq(3).hover(function(){
			tv_aA3.eq(3).find("img").animate({width:146,height:116,marginTop:-5,marginLeft:-5})
		},function(){
			tv_aA3.eq(3).find("img").animate({width:136,height:106,marginTop:0,marginLeft:0})
	
		});
		//右边 5,6,7,8
		var tv_aA4 = $(".tv2_right").find("a");
		tv_aA4.eq(0).hover(function(){
			tv_aA4.eq(0).find("img").animate({width:305,height:305,marginTop:-5,marginLeft:-5})
		},function(){
			tv_aA4.eq(0).find("img").animate({width:295,height:295,marginTop:0,marginLeft:0})
		});

		tv_aA4.eq(3).hover(function(){
			tv_aA4.eq(3).find("img").animate({width:268,height:182,marginTop:-5,marginLeft:-5})
		},function(){
			tv_aA4.eq(3).find("img").animate({width:258,height:172,marginTop:0,marginLeft:0})
	
		});

		tv_aA4.eq(2).hover(function(){
			tv_aA4.eq(2).find("img").animate({width:146,height:116,marginTop:-5,marginLeft:-5})
		},function(){
			tv_aA4.eq(2).find("img").animate({width:136,height:106,marginTop:0,marginLeft:0})
		});
	});

	//智能手机部分
	ajax("get","json/phone.json","",function(data){
		var ph_oDiv = $("<div></div>");
		$("#s_div").append(ph_oDiv);
		ph_oDiv.attr("class","ph_left");

		var ph_arr1 = JSON.parse(data)._data11;
		for(var i = 0; i < ph_arr1.length; i++){
			var ph_a = $("<a></a>");
			ph_a.appendTo(ph_oDiv);
			ph_a.attr("class",ph_arr1[i].className);

			//添加图片
			var ph_img = $("<img/>");
			ph_img.attr("src",ph_arr1[i].imglink);
			ph_img.appendTo(ph_a);

		}

		var ph_oDiv1 = $("<div></div>");
		$("#s_div").append(ph_oDiv1);
		ph_oDiv1.attr("class","ph_right");

		var ph_arr2 = JSON.parse(data)._data12;
		for(var i = 0; i < ph_arr2.length; i++){
			var ph_a = $("<a></a>");
			ph_a.appendTo(ph_oDiv1);
			ph_a.attr("class",ph_arr2[i].className);

			//添加图片
			var ph_img = $("<img/>");
			ph_img.attr("src",ph_arr2[i].imglink);
			ph_img.appendTo(ph_a);

			//添加div写文本内容
			var ph_div = $("<div></div>");
			ph_div.appendTo(ph_a);

			var ph_p = $("<p></p>");
			ph_p.appendTo(ph_div);
			ph_p.html(ph_arr2[i].name);

			var ph_newArr = ph_arr2[i].title;
			for(var j = 0; j < ph_newArr.length; j++){
				var ph_h4 = $("<h4></h4>");
				ph_h4.appendTo(ph_div);
				ph_h4.html(ph_newArr[j].des)
			}

			var ph_span = $("<span></span>");
			ph_span.appendTo(ph_div);
			ph_span.html(ph_arr2[i].price)



		}

		var ph_oDiv2 = $("<div></div>");
		ph_oDiv2.appendTo(ph_oDiv1);
		ph_oDiv2.attr("class","ph1_right");

		

		var ph_arr3 = JSON.parse(data)._data13;
		for(var i = 0; i < ph_arr3.length; i++){
			var ph_a = $("<a></a>");
			ph_a.appendTo(ph_oDiv2);
			ph_a.attr("class",ph_arr3[i].className);

			//添加图片
			var ph_img = $("<img/>");
			ph_img.attr("src",ph_arr3[i].imglink);
			ph_img.appendTo(ph_a);

			$("#s_div").find("a.ph_right2").find("img").eq(0).css("right","10px");
			$("#s_div").find("a.ph_right2").find("img").eq(0).css("bottom","10px");

			$("#s_div").find("a.ph_right3").find("img").eq(0).css("right","10px");
			$("#s_div").find("a.ph_right3").find("img").eq(0).css("bottom","10px");

			//添加div写文本内容
			var ph_div = $("<div></div>");
			ph_div.appendTo(ph_a);

			var ph_p = $("<p></p>");
			ph_p.appendTo(ph_div);
			ph_p.html(ph_arr3[i].name);

			var ph_h4 = $("<h4></h4>");
			ph_h4.appendTo(ph_div);
			ph_h4.html(ph_arr3[i].title);

			var ph_span = $("<span></span>");
			ph_span.appendTo(ph_div);
			ph_span.html(ph_arr3[i].price)

		}

		var ph_arr4 = JSON.parse(data)._data14;
		for(var i = 0; i < ph_arr4.length; i++){
			var ph_a = $("<a></a>");
			ph_a.appendTo(ph_oDiv1);
			ph_a.attr("class",ph_arr4[i].className);

			//添加图片
			var ph_img = $("<img/>");
			ph_img.attr("src",ph_arr4[i].imglink);
			ph_img.appendTo(ph_a);

			$("#s_div").find("a.ph_right4").find("img").eq(0).css("right","10px");
			$("#s_div").find("a.ph_right4").find("img").eq(0).css("bottom","10px");

			//添加div写文本内容
			var ph_div = $("<div></div>");
			ph_div.appendTo(ph_a);

			var ph_p = $("<p></p>");
			ph_p.appendTo(ph_div);
			ph_p.html(ph_arr3[i].name)

			var ph_h4 = $("<h4></h4>");
			ph_h4.appendTo(ph_div);
			ph_h4.html(ph_arr4[i].title);

			var ph_span = $("<span></span>");
			ph_span.appendTo(ph_div);
			ph_span.html(ph_arr4[i].price)

		}


		$("#s_div").find("a").css("display","block");
		$("#s_div").find("a").css("overflow","hidden");
		$("#s_div").find("a").css("position","relative");
		$("#s_div").find("a").find("img").css("position","absolute");
		$("#s_div").find("a").find("div").css("position","absolute");
		$("#s_div").find("a").find("div").css("left","20px");
		$("#s_div").find("a").find("div").css("top","20px");

		//左边添加图片缩放
		var ph_aA1 = $(".ph_left").find("a");

		ph_aA1.eq(0).hover(function(){
			ph_aA1.eq(0).find("img").animate({width:610,height:713,marginTop:-5,marginLeft:-5})
		},function(){
			ph_aA1.eq(0).find("img").animate({width:600,height:703,marginTop:0,marginLeft:0})
		});

		//右边第一张添加图片缩放
		var ph_aA2 = $(".ph_right").find("a");

		ph_aA2.eq(0).hover(function(){
			ph_aA2.eq(0).find("img").animate({width:610,height:305,marginTop:-5,marginLeft:-5})
		},function(){
			ph_aA2.eq(0).find("img").animate({width:600,height:295,marginTop:0,marginLeft:0})
		});

		//右边第2,3张
		var ph_aA3 = $(".ph1_right").find("a"); 
		ph_aA3.eq(0).hover(function(){
			ph_aA3.eq(0).find("img").animate({width:146,height:116,marginTop:-5,marginLeft:-5})
		},function(){
			ph_aA3.eq(0).find("img").animate({width:136,height:106,marginTop:0,marginLeft:0})
		});

		ph_aA3.eq(1).hover(function(){
			ph_aA3.eq(1).find("img").animate({width:146,height:116,marginTop:-5,marginLeft:-5})
		},function(){
			ph_aA3.eq(1).find("img").animate({width:136,height:106,marginTop:0,marginLeft:0})
		});

		//右边第4张
		var ph_aA4 = $("a.ph_right4");
		ph_aA4.eq(0).hover(function(){
			ph_aA4.eq(0).find("img").animate({width:268,height:182,marginTop:-5,marginLeft:-5})
		},function(){
			ph_aA4.eq(0).find("img").animate({width:258,height:172,marginTop:0,marginLeft:0})
		});
	});

	ajax("get","json/club.json","",function(data){
		var c_oDiv = $("<div></div>");
		$("#c_div").append(c_oDiv);
		c_oDiv.attr("class","c_left"); 

		var c_arr1 = JSON.parse(data)._data15;
		for(var i = 0; i < c_arr1.length; i++){
			var c_a = $("<a></a>");
			c_a.appendTo(c_oDiv);
			c_a.attr("class",c_arr1[i].className);

			var c_img = $("<img/>");
			c_img.appendTo(c_a);
			c_img.attr("src",c_arr1[i].imglink);

			
		}


		var c_oDiv1 = $("<div></div>");
		$("#c_div").append(c_oDiv1);
		c_oDiv1.attr("class","c_right");

		var c_arr2 = JSON.parse(data)._data16;
		for(var i = 0; i < c_arr2.length; i++){
			var c_a = $("<a></a>");
			c_a.appendTo(c_oDiv1);
			c_a.attr("class",c_arr2[i].className);

			var c_img = $("<img/>");
			c_img.appendTo(c_a);
			c_img.attr("src",c_arr2[i].imglink)
		}

		$("#c_div").find("a").css("display","block");
		$("#c_div").find("a").css("overflow","hidden");

		//左边所有的运动
		var c_aA1 = $(".c_left").find("a");
		c_aA1.eq(0).hover(function(){
			c_aA1.eq(0).find("img").animate({width:610,height:305,marginTop:-5,marginLeft:-5})
		},function(){
			c_aA1.eq(0).find("img").animate({width:600,height:295,marginTop:0,marginLeft:0})
		});

		c_aA1.eq(1).hover(function(){
			c_aA1.eq(1).find("img").animate({width:305,height:408,marginTop:-5,marginLeft:-5})
		},function(){
			c_aA1.eq(1).find("img").animate({width:295,height:398,marginTop:0,marginLeft:0})
		});

		c_aA1.eq(2).hover(function(){
			c_aA1.eq(2).find("img").animate({width:305,height:408,marginTop:-5,marginLeft:-5})
		},function(){
			c_aA1.eq(2).find("img").animate({width:295,height:398,marginTop:0,marginLeft:0})
		});

		c_aA1.eq(3).hover(function(){
			c_aA1.eq(3).find("img").animate({width:305,height:408,marginTop:-5,marginLeft:-5})
		},function(){
			c_aA1.eq(3).find("img").animate({width:295,height:398,marginTop:0,marginLeft:0})
		});

		c_aA1.eq(4).hover(function(){
			c_aA1.eq(4).find("img").animate({width:305,height:408,marginTop:-5,marginLeft:-5})
		},function(){
			c_aA1.eq(4).find("img").animate({width:295,height:398,marginTop:0,marginLeft:0})
		});

		var c_aA2 = $(".c_right").find("a");
		c_aA2.eq(0).hover(function(){
			c_aA2.eq(0).find("img").animate({width:610,height:713,marginTop:-5,marginLeft:-5})
		},function(){
			c_aA2.eq(0).find("img").animate({width:600,height:703,marginTop:0,marginLeft:0})
		});

		c_aA2.eq(1).hover(function(){
			c_aA2.eq(1).find("img").animate({width:305,height:408,marginTop:-5,marginLeft:-5})
		},function(){
			c_aA2.eq(1).find("img").animate({width:295,height:398,marginTop:0,marginLeft:0})
		});

		c_aA2.eq(2).hover(function(){
			c_aA2.eq(2).find("img").animate({width:305,height:408,marginTop:-5,marginLeft:-5})
		},function(){
			c_aA2.eq(2).find("img").animate({width:295,height:398,marginTop:0,marginLeft:0})
		});
	});

	//公关文部分
	ajax("get","json/pr.json","",function(data){
		var pr_arr = JSON.parse(data)._data17;
		for(var i = 0; i < pr_arr.length; i++){
			var pr_a = $("<a><img/><p></p><span></span></a>");
			pr_a.appendTo($(".pr").find(".wrap").find(".essay"));
			pr_a.css("float","left")
			pr_a.find("img").attr("src",pr_arr[i].imglink);
			pr_a.find("p").html(pr_arr[i].name);
			pr_a.attr("class",pr_arr[i].className);
			pr_a.find("span").html(pr_arr[i].des);
			pr_a.attr("href","#");
		}
	});
	 //给公关部分添加事件
	 $(".pr").find(".others").find("a").hover(function(){
	 	$(this).find("img.on").css("display","block");
	 	$(this).find("img.normal").css("display","none");
	 },function(){
	 	$(this).find("img.on").css("display","none");
	 	$(this).find("img.normal").css("display","block");
	 });

	 //获取NEWs新闻通知部分的数据
	 ajax("get","json/news.json","",function(data){
	 	var n_oUl = $("<ul></ul>");
	 	n_oUl.appendTo($("div.news").find("div.news_titles"));
	 	var n_arr = JSON.parse(data)._data18;
	 	for(var i = 0; i < n_arr.length; i++){
	 		var n_aLi = $("<li><p></p><a></a></li>");
	 		n_aLi.appendTo(n_oUl);
	 		n_aLi.find("p").html(n_arr[i].date);
	 		n_aLi.find("a").html(n_arr[i].title);
	 		n_aLi.find("a").attr("href",n_arr[i].link)
	 	}
	 });

//给侧边栏添加运动
			//首先一直在正中间 离浏览器右边框75px
			$(window).on("scroll",function(){
				var side_viewHeight = $(window).height();
				var nodeHeight = $("ul.sideBar").height();
				var scrollTop = $(window).scrollTop();
				if(scrollTop >= 2032){
					$("ul.sideBar").css({display:"block"});
					//$("ul.sideBar").css({position:"sticky",right:"75px", top:"50%", marginTop:"-109px"})
					$("ul.sideBar").animate({right:75, top:parseInt(scrollTop + (side_viewHeight - nodeHeight) / 2 )});
					if(scrollTop >= 2032 && scrollTop < 3626){
						$("ul.sideBar").find("li").find("div").css("display","none");
						$("ul.sideBar").find("li").eq(0).find("div").css("display","block");
					}else if(scrollTop >= 3626 && scrollTop < 5270){
						$("ul.sideBar").find("li").find("div").css("display","none");
						$("ul.sideBar").find("li").eq(1).find("div").css("display","block");
					}else if(scrollTop >= 5270 && scrollTop < 6610){
						$("ul.sideBar").find("li").find("div").css("display","none");
						$("ul.sideBar").find("li").eq(2).find("div").css("display","block");
					}else if(scrollTop >= 6610 && scrollTop < 7540){
						$("ul.sideBar").find("li").find("div").css("display","none");
						$("ul.sideBar").find("li").eq(3).find("div").css("display","block");
					}else if(scrollTop >= 7540 && scrollTop < 8830){
						$("ul.sideBar").find("li").find("div").css("display","none");
						$("ul.sideBar").find("li").eq(4).find("div").css("display","block");
					}
				}else{
					$("ul.sideBar").css({display:"none"});
				}
			});
}











	
