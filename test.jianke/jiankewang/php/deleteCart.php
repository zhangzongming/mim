<?php
    $id = $_REQUEST["id"];
    //连接到数据库进行查询
    $db = mysqli_connect("127.0.0.1","root","","datalist");
    $sql = "DELETE FROM cart WHERE id = '$id'";
    $rusult = mysqli_query($db,$sql);
    if ($rusult) {
        $data = array("status" => "success","msg" => "删除成功","data" => '200');
    } else {
        $data = array("status" => "error","msg" => "删除失败","data" => '-5');
    }
    echo json_encode($data,true);

?>