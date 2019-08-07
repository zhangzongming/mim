<?php
    $con = mysqli_connect("127.0.0.1", "root", "", "datalist");

    # 获取所有的商品信息
    $sql = "SELECT * FROM pagelist";
    $result = mysqli_query($con,$sql);
    
    # 转换为JSON数据返回
    # 该方法返回PHP的数据，该数据中保存两份内容(数组 | 对象)
    # mysqli_fetch_all($result, MYSQLI_NUM)   获得的数据是数组结构
    # mysqli_fetch_all($result, MYSQLI_ASSOC) 获得的数据是对象结构
    $data = array("status" => "success", "msg" => "请求成功", "data" => mysqli_fetch_all($result, MYSQLI_ASSOC));
    echo json_encode($data, true);

    

?>