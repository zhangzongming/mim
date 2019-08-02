<?php
    // header("Content-Type:text/html; charset=utf-8;");
    header('Content-Type:text/html;charset=utf-8;');
 $con = mysqli_connect("127.0.0.1","root","","datalist");
 $data = file_get_contents("../liebiao.json");
 $arr = json_decode($data,true);
 
 for($i=0;$i<count($arr);$i++){
     $src = $arr[$i]["src"];
    $splie = $arr[$i]["splie"];
    $splic = $arr[$i]["splic"];
    $des = $arr[$i]["des"];
     $sql = "INSERT INTO `liebiao`(`123`, `234`, `24`, `22`) VALUES ('$src','$splie','$splic','$des')";
    
    
     mysqli_query($con,$sql);
 }


?>