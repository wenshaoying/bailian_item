
define(['jquery','jquery.cookie','logined'],function($,$jqcookie){
	return{
		// 导入头部和尾部HTML	
		import: !function(){
			$(".header").load("header.html");
   			$(".footer").load('footer.html');
		}(),


		//数据渲染
		data: !function(){
			// 轮播图数据
			$.ajax({
		    	url: 'http://10.31.162.94/bailian_item/php/banner.php',
		    	type: 'post',
		    	dataType: 'json',
		    })
		    .done(function(data) {
		    	// console.log(data);
		    	var $imgLi=$('.banner .banner_img li');
		    	$.each(data,function(index, value) {
		    		$imgLi.eq(index).css('background',value.bg).find('img').attr('src',value.url);
		    	});
		    });

		    // 超值团，商品信息数据

		    $.ajax({
		    	url: 'http://10.31.162.94/bailian_item/php/goods.php',
		    	type: 'post',
		    	dataType: 'json',
		    })
		    .done(function(data) {
		    	// console.log(data);
		    	var $goodShow=$('.czt_r ul li');
		    	$.each(data,function(index, value) {
		    		$goodShow.eq(index).find('a').attr('href','details.html?id='+value.id);
		    		$goodShow.eq(index).find('img').attr('src',value.url);
		    		$goodShow.eq(index).find('.good_name a').html(value.title);
		    		$goodShow.eq(index).find('.money span').html(value.price).siblings('div').html('参考价：￥'+value.rp);

		    	});
		    });

		    // 猜你喜欢商品数据

		    $.ajax({
		    	url: 'http://10.31.162.94/bailian_item/php/goods.php',
		    	type: 'post',
		    	dataType: 'json',
		    })
		    .done(function(data) {
		    	// console.log(data);
		    	var $goodShow=$('.guess_like li');
		    	$.each(data,function(index, value) {
		    		$goodShow.eq(index).find('a').attr('href','details.html?id='+value.id);
		    		$goodShow.eq(index).find('img').attr('src',value.url);
		    		$goodShow.eq(index).find('.pro_name a').html(value.title);
		    		$goodShow.eq(index).find('.money span').html(value.price);

		    		$goodShow.eq(index+7).find('a').attr('href','details.html?id='+value.id);
		    		$goodShow.eq(index+7).find('img').attr('src',value.url);
		    		$goodShow.eq(index+7).find('.pro_name a').html(value.title);
		    		$goodShow.eq(index+7).find('.money span').html(value.price);

		    		$goodShow.eq(index+14).find('a').attr('href','details.html?id='+value.id);
		    		$goodShow.eq(index+14).find('img').attr('src',value.url);
		    		$goodShow.eq(index+14).find('.pro_name a').html(value.title);
		    		$goodShow.eq(index+14).find('.money span').html(value.price);
		    	});
		    });

		}(),


		// 首页效果实现
		action: !function(){

			

			// 搜索框下拉效果 
			// 接口 http://search.bl.com/autoComputele.html?callback=jQuery18203988279257392704_1539516031981&kw=b&count=11&channel=5
			
            $('.header').on('input','.search_top .search_input input',function(){
            	console.log(1);
            });


            // 头部商品分类导航效果，tab切换
			$(document).ready(function() {
				var $sortlist=$('.header .sorts_list ul li');
				var $listshow=$('.header .sorts_list dl dd');
				// console.log($listshow);
				$sortlist.hover(function(){
					$listshow.eq($(this).index()).show().siblings('dd').hide();
				},function(){
					$listshow.hide();
				});
				$listshow.hover(function(){
					$(this).show();
				},function(){
					$(this).hide();
				});
			});

			// 轮播图效果

			var $btnPrev=$('.banner .pagechange-ol .prev');
			var $btnNext=$('.banner .pagechange-ol .next');
			var $imgLi=$('.banner .banner_img li');
			var $imgNav=$('.banner .img_nav li');
		    var $index=0;

		    function changeLeft(){
		    	$imgLi.eq($index).animate({
		    		opacity: 0
		    	});
		    	if($index==0){
		    		$index=4;
		    	}else{
		    		$index--;
		    	}
		    	$imgLi.eq($index).animate({
		    		opacity: 1
		    	});
		    	$imgNav.eq($index).addClass('active').siblings('li').removeClass('active');
		    }
		    function changeRight(){
		    	$imgLi.eq($index).animate({
		    		opacity: 0
		    	});

		    	if($index==4){
		    		$index=0;
		    	}else{
		    		$index++;
		    	}
		    	$imgLi.eq($index).animate({
		    		opacity: 1
		    	});
		    	$imgNav.eq($index).addClass('active').siblings('li').removeClass('active');
		    }

		    // 图片定时轮播

		     var $bannerTimer=null;
		    $bannerTimer=setInterval(function(){ //图片定时轮播
	    		changeRight();
	    	}, 3000);
	    	$btnPrev.hover(function(){clearInterval($bannerTimer);});
	    	$btnNext.hover(function(){clearInterval($bannerTimer);});
		    $imgLi.hover(function(){
		    	clearInterval($bannerTimer);
		    },function(){
		    	$bannerTimer=setInterval(function(){
		    		changeRight();
		    	}, 3000);
		    });

		    $btnPrev.on('click',function(){
		    	
		    	changeLeft();
		    });
		    $btnNext.on('click',function(){
		    	
		    	changeRight();
		    });

		   
		    $imgNav.hover(function(){
		    	clearInterval($bannerTimer);
		    	if($(this).index()!=$index){
		    		$imgNav.removeClass('active');
		    	    $(this).addClass('active');
		    		$imgLi.eq($index).animate({
		    		opacity: 0
			    	});
			    	$imgLi.eq($(this).index()).animate({
			    		opacity: 1
			    	});
			    	$index=$(this).index();
		    	}
		    	

		    },function(){
		    	
		    });


		    // 滚动条滚动到一定位置时，固定头部出现
			$(window).on('scroll',function(){
				if($(window).scrollTop()>=165){
					$('.header_fixed').show();
		    		// $('.header_fixed').animate({
		    		// 	top: "0"
		    		// });
		    	}else{
		    		$('.header_fixed').hide();
		    		// $('.header_fixed').animate({
		    		// 	top: "-70"
		    		// });
		    	}
			});

			 // 楼梯效果
		    $(window).on('scroll',function(){
		    	
		    	
				if($(window).scrollTop()>=1200){
					$('.louti').show();
				}else {
					$('.louti').hide();
				}

				$('.floor').each(function(index, el) {
					var $top=$('.floor').eq(index).offset().top+400;
					if($top>$(window).scrollTop()){
						$('.louti a').removeClass('active');
						$('.louti a').eq(index).addClass('active');
						return false;
					}
				});
			});


		     // 回到顶部
			$('.louti .top').on('click',function(){
				$('body,html').animate({
					scrollTop: '0'
				});
			});

			//点击相应的导航，相应模块移动到可视区
			$('.louti a').not('.last').on('click',function(){
				$(this).addClass('active').siblings('a').removeClass('active');
				var $top=$('.floor').eq($(this).index()).offset().top-70;
				$('body,html').animate({
					scrollTop: $top
				});
			});

			// 超值团商品切换效果

			var $goodPrev=$('.czt_r .good_prev');
			var $goodNext=$('.czt_r .good_next');
			var $goodsUl=$('.czt_r ul');
			$goodPrev.on('click',function(){
				$goodsUl.animate({
					left: 0
				});
				$(this).hide();
				$goodNext.show();
			});
			$goodNext.on('click',function(){
				$goodsUl.animate({
					left: -966
				});
				$(this).hide();
				$goodPrev.show();
			});

			// 楼层图片轮播切换,无缝切换

			var $slideul=$('.floor_slide').children('ul');
			var $slideol=$('.floor_slide').children('ol');

			
			$slideul.each(function(index, el) {
				
				var $now=0;
				var $next=0;
				var $imgli=$slideul.eq(index).children('li');
				var $navol=$slideol.eq(index).children('li');
				


				$slideul.eq(index).timer=setInterval(function(){
					$next++;
					if($next>2){
						$next=0;
					}
					$slideol.find('a').css('width',0);
					$navol.eq($now).find('a').animate({ width: 30
					},3000);
					 $imgli.eq($next).css({left:306});
			   	   	 $imgli.eq($now).animate({left:-306});
			   	   	 $imgli.eq($next).animate({left:0});

			   	   	 /*$slideul.eq(index).hover(function(){
						clearInterval($slideul.eq(index).timer);
						$navol.eq($now).find('a').css('width',30);
				
					},function(){
						$slideul.eq(index).timer=setInterval(function(){
							$next++;
							if($next>2){
								$next=0;
							}
							$slideol.find('a').css('width',0);
							$navol.eq($now).find('a').animate({ width: 30
							},3000);
							 $imgli.eq($next).css({left:306});
					   	   	 $imgli.eq($now).animate({left:-306});
					   	   	 $imgli.eq($next).animate({left:0});
					   	   	 $now=$next;
					   	}, 3200);
					});*/

			   	   	
			   	   	$now=$next;
					
				}, 3200);
				
			});
			
			clearInterval($slideul.eq(0).timer);
			console.log($slideul.eq(0).attr('timer'));
			
			// $slideul.attr('timer',setInterval(function(){

			// }, 3000)); 
			

			// var $slide=$('.floor_slide');

			// var $liIndex=0;
			// $slide.find('ol li').find('a').animate({
			// 		width: 30,
			// 	});
			// var $slideTimer=null;
			// $slide.hover(function(){
			// 	clearInterval($slideTimer);
			// },function(){});
			// $slideTimer=setInterval(function(){
			// 	$slide.find('ol li').eq($liIndex).find('a').animate({
			// 		width: 30,
			// 	});
			// 	$liIndex++;
			// 	if($liIndex>2){
			// 		$liIndex=0;
			// 	}
			// }, 3000);
		}()
	}
});




