<?php 
   include 'conn.php';

   $id=$_POST['id'];
   $result=mysql_query("select * from details where id='$id'");
  
	echo json_encode(mysql_fetch_array($result,MYSQL_ASSOC));
   
 ?>