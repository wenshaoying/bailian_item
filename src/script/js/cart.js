
define(['jquery','jquery.cookie'],function($,$jqcookie){
	return {
		// 导入外部部html
		import: !function(){
			$(".cart_header_top").load('header.html .header_top');
    		$(".cart_footer").load('footer.html');
		}(),


		// 购物车数据渲染

		data: !function(){
			var $nopoint=$('.cart_main .no-points'); //购物车为空
			var $cartname=$('.cart_main .cart-table-name'); // 商店名
			var $cartlistul=$('.cart_main .cart-table-list'); 
			var $cartlistli=$('.cart_main .cart-table-list li');
			var $payfor=$('.cart_main .pay-form'); //结算框

			var $idarr=[];
			var $numarr=[];
			// console.log($idarr);
			if($.cookie('cartid')&&$.cookie('cartnum')){
				$idarr=$.cookie('cartid').split(',');
				$numarr=$.cookie('cartnum').split(',');
				$nopoint.hide();
				$cartlistli.first().hide();
				$cartname.show();
				
				var $allpay=0;
				$.each($idarr,function(index, value) {
					var $clone=$cartlistli.first().clone(true).show();
					$.ajax({
						url: 'http://10.31.162.94/bailian_item/php/details.php',
						type: 'post',
						dataType: 'json',
						data: {id: value},
					})
					.done(function(data) {
						// console.log(data);
						$clone.find('.checkbox').attr('checked','checked');
						$clone.find('img').attr('src',data.bigurl.split(',')[0]).attr('id',data.id);
						$clone.find('.name a').html(data.title);
						$clone.find('.item-price-box .price').html('￥'+data.price);
						$clone.find('.number-box .text').val($numarr[$.inArray(value, $idarr)]);
						$clone.find('.price-box .price').html('￥'+($numarr[$.inArray(value, $idarr)]*data.price).toFixed(2));
						$allpay+=Number($numarr[$.inArray(value, $idarr)]*data.price);
						$payfor.show().find('.price-line .price strong').html($allpay.toFixed(2));
					});
					
					
					$cartlistul.append($clone);
				});
				
			}else{
				$nopoint.show();
				$cartname.hide();
				$cartlistli.first().hide();
				$payfor.hide();
			}


			// 商品数量加减
			$cartlistul.on('click','.add',function(){  //加	
				var num=Number($(this).siblings('.text').val())+1;
				var price=Number($(this).parent().parent().siblings('.item-price-box').find('.price').html().substring(1));
				$(this).siblings('.text').val(num);
				$(this).parent().parent().siblings('.price-box').find('.price').html('￥'+(num*price).toFixed(2));
				var $allpay=Number($payfor.find('.price-line .price strong').html())+price;
				$payfor.find('.price-line .price strong').html($allpay.toFixed(2));
			});
			$cartlistul.on('click','.reduce',function(){  //减
				if(Number($(this).siblings('.text').val())!=1){
					var num=Number($(this).siblings('.text').val())-1;
					var price=Number($(this).parent().parent().siblings('.item-price-box').find('.price').html().substring(1));
					$(this).siblings('.text').val(num);
					$(this).parent().parent().siblings('.price-box').find('.price').html('￥'+(num*price).toFixed(2));
					var $allpay=Number($payfor.find('.price-line .price strong').html())-price;
					$payfor.find('.price-line .price strong').html($allpay.toFixed(2));
				}
				
			});

           
			var $input=$('.cart_main .input-line .text');
			// 计算单个商品总价
			function signlegoodsprice($inp){
				return ($inp.val()*Number($inp.parent().parent().siblings('.item-price-box').find('.price').html().substring(1))).toFixed(2);
			}
			// 计算支付金额
			function payforprice(){
				var $signlepay=$('.cart_main .price-box .price');
				var $totallpay=$('.pay-form .price strong');
				var totall=0;
				$.each($signlepay,function(index, el) {
					console.log(1);
					if($signlepay.eq(index).parents('li').find('.checkbox').is(':checked')){
						totall+=Number($signlepay.eq(index).html().substring(1));
					}
					
				});
				$totallpay.html(totall.toFixed(2));
			}
			// 加入cookie
			function setcookie(obj){

				var $index = obj.parents('.cart-table-line').find('img').attr('id');
			    $numarr[$idarr.indexOf($index)] = obj.parents('.cart-table-line').find('.input-line .text').val();
			    $.cookie('cartnum', $numarr, {expires:10});
			}
			
			//直接输入改变数量
			$input.on('input', function() {
			    var $reg = /^\d+$/g; //只能输入数字
			    var $value = parseInt($(this).val());
			    if ($reg.test($value)) {
			        if ($value <= 0) {
			            $(this).val(1);
			        } else {
			            $(this).val($value);
			        }
			    } else {
			        $(this).val(1);
			    }
			    $(this).parent().parent().siblings('.price-box').find('.price').html('￥'+signlegoodsprice($(this)));
			    payforprice();
			    setcookie($(this));
			});

			//商品勾选
			var $checked=$('.cart-table-list .checkbox');
			var $allchecked=$('.pay-form .checkbox');

			//单选
			
			$checked.on('change',function(){
				if($('.cart-table-list').find('input:checked').length==$checked.size()-1){
					$allchecked.prop('checked',true);
				}else{
					$allchecked.prop('checked',false);
				}
				payforprice();
			});

			//全选
			
			$allchecked.on('change',function(){
				$checked.not(':hidden').prop('checked',$(this).prop('checked'));
				payforprice();
			});


			// 删除商品
			function delgoods(id){
				var index = -1;
			    for (var i = 0; i < $idarr.length; i++) {
			        if (id == $idarr[i]) {
			            index = i;
			        }
			    }
			    $idarr.splice(index, 1);//删除数组对应的值
			    $numarr.splice(index, 1);//删除数组对应的值
			    $.cookie('cartid', $idarr, {expires:10});//添加cookie
			    $.cookie('cartnum', $numarr, {expirs:10});
			}
			// 删除单个商品
			var $del=$('.item .action-box .delete');
			$del.on('click',function(){
				var $id=$(this).parents('.cart-table-line').find('img').attr('id');
				if(confirm('确定要删除吗？')){
					delgoods($id);
					$(this).parents('li').remove();
					

					// if($idarr==''){  //$idarr为空时将cookie清空
					// 	alert(1);
					//     $.cookie('cartid', $idarr, {expires:-1});
			  //   		$.cookie('cartnum', $numarr, {expirs:-1});	
					// }
					// location.reload();

					payforprice();
				}
				
			})

			// 删除全部勾选商品
			var $delall=$('.pay-form .pay-line .delete');
			$delall.on('click', function() {
				if(confirm('确定要删除吗？')){
					$('.cart-table-list li').each(function() {
				        if ($(this).find('.checkbox').is(':checked')) {
				            $(this).remove();
				            delgoods($(this).find('img').attr('id'));
				        }
				    });
				    payforprice();
				}
			    
			});

		}()

	}
});
