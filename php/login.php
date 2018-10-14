<?php
   include 'conn.php';
   if(isset($_POST['username'])&&isset($_POST['password'])){
       $username=$_POST['username'];
       $password=$_POST['password'];

       $result=mysql_query("select * from user where username='$username' and password='$password'");

       if(mysql_fetch_array($result)){
           echo true;
       }else{
           echo false;
       }

   }

?>