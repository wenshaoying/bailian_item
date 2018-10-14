
define(['jquery','jquery.validate'],function($){
	return{
		//导入尾部
		impport: !function(){
			$(".register_footer").load('footer.html .footer_bottom');
		}(),

		// 注册表单验证

		validation: !function(){
		   
           
           
          /* submit.onclick=function(){
             addcookie('username',username.value,10);
           }*/
           
           //1.账号验证
           var $username=$('#formmsg #username');
           var $prompt_text=$('#formmsg .prompt-text');
           var $prompt_error=$('#formmsg .prompt-error');
           var $prompt_correct=$('#formmsg .prompt-correct');

           var $usernameStop=false;
           var $passwordStop=false;
           var $repswStop=false;
           var $mobileStop=false;
           var $emailStop=false;
           $username.on('blur',function(){
           		 var $regname=/^[a-zA-Z\d]{6,20}$/;
                    if($regname.test($username.val())){
                      $prompt_correct.eq(0).show().siblings('li').hide();
                      $usernameStop=true;

                    }else if($username.val()==''){
                      $prompt_text.eq(0).show().siblings('li').hide();
                      $usernameStop=false;
                    }else{
                      $prompt_error.eq(0).show().siblings('li').hide();
                      $usernameStop=false;
                    }
           });

           // 密码验证
           var $password=$('#formmsg #password');
           $password.on('blur',function(){
           		 var $regpsw=/^[a-zA-Z\d]{8,20}$/;
                    if($regpsw.test($password.val())){
                      $prompt_correct.eq(1).show().siblings('li').hide();
                      $passwordStop=true;
                    }else if($password.val()==''){
                      $prompt_text.eq(1).show().siblings('li').hide();
                      $passwordStop=false;
                    }else{
                      $prompt_error.eq(1).show().siblings('li').hide();
                      $passwordStop=false;
                    }
           });

           // 确认密码
           var $repassword=$('#formmsg #confirmPassword');
           $repassword.on('blur',function(){
                    if($repassword.val()==''){
                      $prompt_text.eq(2).show().siblings('li').hide();
                      $repswStop=false;
                    }else if($repassword.val()==$password.val()){
                      $prompt_correct.eq(2).show().siblings('li').hide();
                      $repswStop=true;
                    }else{
                      $prompt_error.eq(2).show().siblings('li').hide();
                      $repswStop=false;
                    }
           });

           // 手机号验证
           var $mobile=$('#formmsg #mobile');
           $mobile.on('blur',function(){
           	        var $regmobile=/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199)\d{8}$/;
                    if($mobile.val()==''){
                      $prompt_text.eq(3).show().siblings('li').hide();
                      $mobileStop=false;
                    }else if( $regmobile.test($mobile.val())){
                    	$.ajax({
                    		url: 'http://10.31.162.94/bailian_item/php/register.php',
                    		type: 'post',
                    		data: {mobile: $mobile.val()},
                    	})
                    	.done(function(data) {
                    		if(data){
                    			$prompt_error.eq(3).find('span').html('用户已存在');
                    			$prompt_error.eq(3).show().siblings('li').hide();
                    			$mobileStop=false;
                    		}else {
                    			$prompt_correct.eq(3).show().siblings('li').hide();
                    			$mobileStop=true;
                    		}
                    	});
                    	
                      
                    }else{
                      $prompt_error.eq(3).find('span').html('请输入手机号');
                      $prompt_error.eq(3).show().siblings('li').hide();
                      $mobileStop=false;
                    }
           });

           // 邮箱验证
           var $email=$('#formmsg #email');
           $email.on('blur',function(){
           	        var $regemail=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                    if($email.val()==''){
                      $prompt_text.eq(4).show().siblings('li').hide();
                      $emailStop=false;
                    }else if( $regemail.test($email.val())){
                      $prompt_correct.eq(4).show().siblings('li').hide();
                      $emailStop=true;
                    }else{
                      $prompt_error.eq(4).show().siblings('li').hide();
                      $emailStop=false;
                    }
           });

           // 取消注册按钮的默认事件
           var $submit=$('#formmsg #submit');
          
           $submit.on('click',function() {
           	  if (!($usernameStop && $passwordStop && $repswStop && $mobileStop && $emailStop)){
           		return false;
           	  }
           });
           
          
		}(),



		/*!function(){
			$('#formmsg').validate({
				rules: {
					username: {
						required: true,
						rangelength: [6,20],
						
					},
					password: {
						required: true,
						rangelength: [8,20]
					},
					confirmPassword: {
						required: true,
						equalTo: "#password"
					},
					mobile: {
						required: true,
						digits: true,
						rangelength: [11,11],
						remote: {
							url: 'http://10.31.162.94/bailian_item/php/register.php',
							post: 'post'
						}
						
					},
					email: {
						required: true,
						email: true
					}
				},
				messages: {
					username: {
						required: "请输入用户名",
						rangelength:"输入长度必须介于 6 和 20 之间的字符串",
						 
					},
					password: {
						required: "请输入密码",
						rangelength: "输入长度必须介于 8 和 20 之间的字符串"
					},
					confirmPassword: {
						required: "请输入用户名",
						equalTo: "两次输入的密码不一致"
					},
					mobile: {
						required: "请输入手机号",
						digits: "输入的手机号不合法",
						rangelength: "请输入11位的手机号",
						remote: "用户已存在"
					   
					},
					email: {
						required: "请输入邮箱",
						email: "请输入正确的邮箱"
					}
				}
				
			});
			
		}(),*/

		/*添加校验成功后的执行函数--修改提示内容，并为正确提示信息添加新的样式(默认是valid)*/
		// tishi: !function(){
		// 	$.validator.setDefaults({
		// 	    success: function(label){
		// 	        label.text('√').css('color','green').addClass('valid');
		// 	    }
		// 	});
		// }()

	 }
});
