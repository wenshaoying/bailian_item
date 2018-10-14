

define(['jquery','jquery.cookie'],function($,$jqcookie){
	return {
		// 导入尾部html
		import: !function(){
			 $(".login_footer").load('footer.html .footer_bottom');
		}(),

		// 登录验证
		login: !function(){

			var  $loginId=$('.login_form #loginId');
			var  $loginpsw=$('.login_form #password');
			var  $loginbtn=$('.login_form #loginsubmit');

			$loginbtn.on('click',function(){
				$.ajax({
					url: 'http://10.31.162.94/bailian_item/php/login.php',
					type: 'post',
					data: {
						username: $loginId.val(),
						password: $loginpsw.val()
					}
				})
				.done(function(data) {
					if(!data){
                        alert('你输入的用户名或密码错误！');
                        location.reload();
                    }else{
                    	$.cookie('username',$loginId.val(),{expires:7});
                        location.href='http://10.31.162.94/bailian_item/src/index.html';
                    }
				})
				.fail(function() {
					console.log("error");
				})
				.always(function() {
					console.log("complete");
				});
				
			});
		}()
	}
});

