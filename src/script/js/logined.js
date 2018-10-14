define(['jquery'],function(){
	// 已登录状态时要修改的内容
	!function(){
			// 判断用户是否登
			$(document).ready(function() {
				var $login=$('.header_top .top_right ul li');
				var $headerfix_login=$('.header_fixed .logn_register');
				var $kuaibao_login=$('.kuaibao .box_text a');
				// console.log($login);
				if($.cookie('username')){
					$login.eq(0).hide();
					$headerfix_login.hide();
					 $kuaibao_login.hide();
					$login.eq(1).show().find('span').html($.cookie('username'));
					$login.eq(1).find('.tuichu').on('click',  function(event) {
						$.cookie('username','',{expires: -1});
						location.reload();
					});
				}

			 	// 侧边栏效果
			 	var $sidenav=$('.right_side .side_nav .sidecss');
			 	var $tishi=$('.right_side .side_nav .tishi');
			 	
			 	//回到顶部
			 	$sidenav.on('click',function(){
			 		$('body,html').animate({
						scrollTop: '0'
					});
			 	});
			 	//提示效果，动画滑出
			 	$sidenav.hover(function(){
			 		var index=$(this).index();
			 		if($(this).index()==4){
			 			index=$(this).index()-1;
			 			$tishi.eq(index).find('.code_title').css({
			 				background:'url(http://img.iblimg.com/respc-1/resources/v4.2/widget/sidebar/i/code_title.png) no-repeat left center',
			 				'font-size': 12,

			 			}).show();
			 			$tishi.eq(index).siblings('.dd').animate({
			 				top: -115,
			 				left: -31
			 			},100).css('background','url(http://img.iblimg.com/respc-1/resources/v4.2/widget/sidebar/i/ico_dd2.png) 0 0 no-repeat');
			 			$tishi.eq(index).stop(true).animate({
				 			width: 150,
				 			'border-width': 1},
				 			200, function() {
				 				
				 				$(this).find('.jiantou').show();
				 		}).find('img').width(100);

			 		}else{
			 			if($(this).index()>1){
			 				index=$(this).index()-1;
			 			}
			 			
			 			$tishi.eq(index).css('font-size','14px').animate({
				 			width: 86,
				 			'border-width': 1},
				 			200, function() {
				 				
				 				$(this).find('.jiantou').show();
				 		});
			 		}
			 		
			 	},function(){
			 		var index=$(this).index();
			 		if($(this).index()==4){
			 			index=$(this).index()-1;
			 			$tishi.eq(index).find('.code_title').css({
			 				background:'none',
			 				'font-size': 12,

			 			}).hide();
			 			$tishi.eq(index).siblings('.dd').animate({
			 				top: 0,
			 				left: -25
			 			},100).css('background','url(http://img.iblimg.com/respc-1/resources/v4.2/widget/sidebar/i/ico_dd.png) 0 0 no-repeat');
			 			$tishi.eq(index).animate({
				 			width: 0,
				 			'border-width': 0},
				 			200, function() {
				 				
				 				$(this).find('.jiantou').hide();
				 		}).find('img').width(0);
			 		}else{
			 			if($(this).index()>1){
			 				index=$(this).index()-1;
			 			}
			 			$tishi.eq(index).css('font-size','0').animate({
				 			width: 0,
				 			'border-width': 0},
				 			200, function() {
				 				
				 				$(this).find('.jiantou').hide();
				 		});
			 		}
			 		
			 	})

			});
	}();
});