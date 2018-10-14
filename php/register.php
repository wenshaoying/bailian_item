<?php
    // 连接数据库
    include "conn.php";
    
   
    if(isset($_POST['mobile'])){
        // 验证用户是否存在
        $mobile=$_POST['mobile'];
        $result=mysql_query("select * from user where mobile='$mobile'");
        if(mysql_fetch_array($result)){
            echo true;
        }else{
            echo false;
            
        }
        
    }
    //将用户信息存入数据库
    if(isset($_POST['submit'])&&$_POST['submit']=="立即注册 完成绑定"){
        $username=$_POST['username'];
        $password=$_POST['password'];
        $mobile=$_POST['mobile'];
        $email=$_POST['email'];
        mysql_query("insert user values(null,'$username','$password','$mobile','$email',NOW());");
        header('location:../src/login.html');
    }
    
    
?>