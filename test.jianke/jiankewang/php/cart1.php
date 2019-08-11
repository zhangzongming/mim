<?php
    $con = mysqli_connect("127.0.0.1", "root", "", "datalist");


    /* 需要往数据库中插入一条数据 */
    /* (1) 检查购物车中是否存在指定的商品，如果存在那么就更新数量 */
    /* (2) 如果购物车中不存在指定的商品，那么就加入一条新的数据 */
    $id = $_REQUEST["id"];
    $price = $_REQUEST["price"];
    $num = $_REQUEST["num"];
    $des = $_REQUEST["des"];
    $src = $_REQUEST["src"];
   
    $sql = "SELECT * FROM cart WHERE id = '$id'";
    $result = mysqli_query($con,$sql);
    
    if(mysqli_num_rows($result) == 0)
    {
      /* 计算价格 */
      $total = $price * $num;
      /* 插入 */
      $insetSql = "INSERT INTO `cart` (`cartid`, `id`, `num`, `total`, `price`,`isActive`, `des`, `src`) VALUES 
      (NULL, '$id', '$num','$total','$price',1,'$des','$src')";
      // echo "执行插入操作";
      // echo $insetSql;
      mysqli_query($con, $insetSql);
    
    }elseif(mysqli_num_rows($result) !=0 ){
        /* 先查询先前的内容 + 1 */
        $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
        echo 'data';
        // echo json_encode($data);
        $numTotal = $data[0]["num"] + $num;
        $totalAll = $data[0]["price"] * $numTotal;
        /* 更新 */
        $updateSql = "UPDATE cart SET num='$numTotal',total='$totalAll' WHERE id=' $id'";
        mysqli_query($con, $updateSql);
    }
    
    $responseObj = array("status"=>"","msg"=>"");
    /* 查询返回购物车中商品的数量 */
    $getCountSql = "SELECT * FROM cart";
    // $count = mysqli_num_rows(mysqli_query($con, $getCountSql));
    $responseObj["status"] = "success";
    $responseObj["msg"] = "添加成功";
    // $responseObj["data"] = array("count"=> $count);
    echo json_encode($responseObj, true);

?>