<?php
# 先获取提交的参数
# 连接数据库并且到数据库中进行查询
$db = mysqli_connect("127.0.0.1", "root", "", "datalist");
$username = $_REQUEST["username"];
$password = $_REQUEST["password"];
# 用户名存在 && 密码要正确
# 检查指定的用户名
$sql = "SELECT * FROM reeg WHERE username = '$username'";
$result = mysqli_query($db,$sql);
// echo $result;
$data = array("status" => "", "msg" => "", "data" => "");
if(mysqli_num_rows($result)=="0")
{
  $data["status"] = "error";
}else{
  /* 检查密码是否正确 */
  $res = mysqli_fetch_array($result);
  // var_dump($res);
  if($res["password"] != $password)
  {
    $data["status"] = "100";
    $data["msg"] = "密码错误";
  }else{
    $data["status"] = "200";
    $data["msg"] = "恭喜你，登录成功！";
    $data["data"] = "$username";
  }
}

echo json_encode($data, true);


?>