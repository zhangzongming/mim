<?php
    $id = $_REQUEST["id"];
   
    $sql = "SELECT * FROM  pagelist WHERE splic = '$id'";

    //连接到数据库进行查询
    $db = mysqli_connect("127.0.0.1","root","","datalist");
    $rusult = mysqli_query($db,$sql);
    $data = array("status" => "success","msg" => "请求成功","data" => mysqli_fetch_all($rusult,MYSQLI_ASSOC));
    echo json_encode($data,true);

?>