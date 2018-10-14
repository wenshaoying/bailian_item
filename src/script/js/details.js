
define(['jquery','jquery.cookie','logined'],function($,$jqcookie){
	return {
		// 导入外部部html
		import: !function(){
			$(".details_header").load('header.html');
    		$(".details_footer").load('footer.html');
		}(),

		// 数据渲染
		data: !function(){

			// console.log(location.search);
			$.ajax({
				url: 'http://10.31.162.94/bailian_item/php/details.php',
				type: 'post',
				dataType: 'json',
				data: {id: location.search.substring(1).split('=')[1]},
			})
			.done(function(data) {
				// console.log(data);
				$('title').html(data.title);
				var $spic=$('.pro_img #spic img');
				var $bpic=$('.pro_img #bpic');
				var $piclist=$('.pro_img #ulist #list ul');
				var $title=$('.pro_details .goods-name h1');
				var $price=$('.pro_details .goods-price #FlashPrice');
                var $dataurl=data.bigurl.split(',');
                $spic.attr('src',$dataurl[0]);
                $bpic.attr('src',$dataurl[0]);
                var $listr='';
                $.each($dataurl,function(index, el) {
                	if(index!=0){
                		$listr+='<li><img src="'+el+'" alt=""></li>';
                	}else{
                		$listr+='<li><img class="active" src="'+el+'" alt=""></li>';
                	}
                	
                });
                $piclist.html($listr);
				$title.html('<em class="late">自营</em>'+data.title);
				$price.html('<i>￥</i>'+data.price);
			});
			
		}(),

		// 详情页效果

		action: !function(){
			var $spic=$('.pro_img #spic');
			var $bpic=$('.pro_img #bpic');
			var $sf=$('.pro_img #sf');
			var $bf=$('.pro_img #bf');
			var $bili=$bpic.width()/$spic.width();
			//放大镜效果
			$spic.hover(function(){
				$sf.show().css({
					// visibility: 'visible',
					width: $spic.width()*$bf.width()/$bpic.width(),
					height: $spic.height()*$bf.height()/$bpic.height(),
					
				});
				$bf.show();

				$('body,html').on('mousemove',function(ev){
						// alert(1);
						var $l=ev.pageX-$spic.offset().left-$sf.width()/2;
						var $t=ev.pageY-$spic.offset().top-$sf.height()/2;
						if($l<0){
							$l=0;
						}else if($l>$spic.width()-$sf.width()){
							$l=$spic.width()-$sf.width();
						}
						if($t<0){
							$t=0;
						}else if($t>$spic.height()-$sf.height()){
							$t=$spic.height()-$sf.height();
						}
						$sf.css({
							left: $l,
							top: $t
						});
						$bpic.css({
							left: -$l*$bili,
							top: -$t*$bili
						});
				});
			},function(){
				$sf.hide();
				$bf.hide();
			});


			//图片切换,采用事件委托的方法
		    var $ulist=$('#ulist');
		    $ulist.on('mouseover','li',function(){
		    	$(this).find('img').addClass('active').parent().siblings('li').find('img').removeClass('active');
		    	$spic.find('img').attr('src',$(this).find('img').attr('src'));
		    	$bpic.attr('src',$(this).find('img').attr('src'));

		    });
		    
		    // 小图翻页，事件委托
		    var $imgul=$('.pro_img #list ul');
		    $ulist.on('click','a',function(){
		    	var target=$(event.target);
		    	var $imgli=$('.pro_img #list ul li');
                var $lisize=$imgli.size();
                var $num=4;
                if(target.attr('id')=='right'){
                	if($lisize>$num){
						$num++;
						$('#left').css('color','#333');
						if($num==$lisize){
							$('#right').css('color','#fff');
						}
					}
					$imgul.animate({
						left: -(($num-4)*$imgli.eq(0).innerWidth()-5)
						
					});
                }else{
                	if($num>4){
						$num--;
						$('#right').css('color','#333');
						if($num==4){
							$('#left').css('color','#fff');
						}
					}
					$imgul.animate({
						left: -(($num-4)*$imgli.eq(0).innerWidth()-5)
						
					});
                }
		    });

		    // 加入购物车效果
		    var $itemnumber=$('.pro_details dl dd #itemnumber');
		    var $numadd=$('.pro_details dl dd #addnum');
		    var $reduce=$('.pro_details dl dd #reduce');
		    //购买数量加减
		    $numadd.on('click',function(){
		    	$itemnumber.val(Number($itemnumber.val())+1);
		    	$reduce.removeClass('btn-down-disable');
		    });

		    $reduce.on('click',function(){
		    	if(Number($itemnumber.val())==1){
		    		$reduce.addClass('btn-down-disable');
		    	}else{
		    		$itemnumber.val(Number($itemnumber.val())-1);
		    	}
		    });

		    //加购物车
		    var $cartbtn=$('.buy-cart #addCart');
		    var idarr=[]; //商品id数组
		    var numarr=[];  //商品数量数组

		    function getcookievalue(){
		    	if ($.cookie('cartid') && $.cookie('cartnum')) {
		            idarr = $.cookie('cartid').split(','); 
		            numarr = $.cookie('cartnum').split(','); 
		        }
		    }
		    var $top=$(window).scrollTop()+200;//用于保存飞向购物车图片的top值
		    $cartbtn.on('click',function(){
		    	getcookievalue();
		    	var $id=location.search.substring(1).split('=')[1];
		    	if($.inArray($id, idarr)!=-1){ //$id在cookie中存在
		    		var num=parseInt(numarr[$.inArray($id,idarr)])+parseInt($itemnumber.val());//商品数量累加
	                numarr[$.inArray($id,idarr)]=num;
	                $.cookie('cartnum', numarr, {expires:10}); //重新存入cookie
		    	}else{ //$id在cookie中不存在
		    		idarr.push($id); //将$id追加到数组
		            $.cookie('cartid', idarr, {expires:10}); //存cookie
		            numarr.push($itemnumber.val()); 
		            $.cookie('cartnum', numarr, {expires:10});
		    	}


		    	// 加购物车图片飞向购物车效果
		    	var $cart=$('.details_header .right_side .cartNum');
		    	$(window).on('scroll',function(){
		    		$top=$(window).scrollTop()+100; //获取图片需到达终点的top值
		    	});
		    	console.log($top);
		    	var $imgbox=$("<img class='imgbox' style='width:200px; height:200px;position:absolute'>");
		    	$('body').append($imgbox);
		    	// console.log($('.imgbox'));
		    	$('.imgbox').css({
		    		top:800,
		    		left:100
		    	}).attr('src',$('.pro_img #spic img').attr('src')).animate({
		    		top: $top,
		    		left: 1400,
		    		width:0,
		    		height:0},
		    		1000, function() {
		    		$(this).remove();
		    		$cart.html(parseInt($cart.html())+parseInt($itemnumber.val()));
		    	});

		    });


		}()
	}
});
