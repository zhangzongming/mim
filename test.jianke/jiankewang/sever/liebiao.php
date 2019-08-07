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
    $model = $arr[$i]["model"];
     $sql = "INSERT INTO `pagelist` (`src`, `splie`, `splic`, `des`,`model`) VALUES ('$src','$splie','$splic','$des','$model')";
   
     mysqli_query($con,$sql);
 }


?>