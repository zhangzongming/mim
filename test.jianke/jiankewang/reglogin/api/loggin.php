<?php
# 先获取提交的参数

// $password = $_REQUEST["password"];

# 连接数据库并且到数据库中进行查询
$db = mysqli_connect("127.0.0.1", "root", "", "datalist");
$phone = $_REQUEST["phone"];
# 用户名存在 && 密码要正确
# 检查指定的用户名
$sql = "SELECT * FROM reeg WHERE phone = '$phone'";
// echo $sql;
$result = mysqli_query($db,$sql);
$data = array("status" => "", "msg" => "", "data" => "");
if(mysqli_num_rows($result) == "0")
{
  $data["status"] = "100";
  // $data["msg"] = "该手机号未注册";
}else{
  /* 检查密码是否正确 */
  $data["status"] = "success";
  $data["msg"] = "恭喜你，登录成功！";
}

echo json_encode($data, true);

// print_r($result);
// print_r(mysqli_fetch_array($result));
?>