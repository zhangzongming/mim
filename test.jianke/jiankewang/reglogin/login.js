$(function () {



    $(".form-item1").first().addClass("cont");
    var dell = $(".tab-login-item").first().addClass("active");
    var obtn1 = $("#loginBtn").first().addClass("cont").siblings().removeClass("cont");
    $(".tab-login-item").click(function () {
        var index = $(this).index();
        $(".loginView").eq(index).addClass("loginViewCurrent").siblings().removeClass("loginViewCurrent");
        $(this).addClass("active").siblings().removeClass("active");

        $(".form-item1").eq($(this).index()).addClass("cont").siblings().removeClass("cont");
    })

    // let phone = $("#phoneID");
    // (new Captcha({
    //     fontSize: 30
    // })).draw(document.querySelector('#captcha'), r => {
    //     console.log(r, '验证码1');
    //     imgCodeText = r;
    //     /* 自动触发标签失去焦点的事件 */
    //     imgCode.trigger("blur");
    // });

    // function formatterDateTime() {
    //     var date = new Date()
    //     var month = date.getMonth() + 1
    //     var datetime = date.getFullYear() +
    //         "" // "年"
    //         +
    //         (month >= 10 ? month : "0" + month) +
    //         "" // "月"
    //         +
    //         (date.getDate() < 10 ? "0" + date.getDate() : date
    //             .getDate()) +
    //         "" +
    //         (date.getHours() < 10 ? "0" + date.getHours() : date
    //             .getHours()) +
    //         "" +
    //         (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
    //             .getMinutes()) +
    //         "" +
    //         (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
    //             .getSeconds());
    //     return datetime;
    // }

    // sendMsgBtn.click(function () {

    //     //随机验证码
    //     msgCodeText = parseInt(Math.random() * 1000000);
    //     /* 检查手机号码是否正确 */
    //     var text = $.trim(phone.val());
    //     if (text.length != 0 && regPhone.test(text)) {

    //         /* 发送网络请求：发短信 */
    //         $.ajax({
    //             type: 'post',
    //             url: 'http://route.showapi.com/28-1',
    //             dataType: 'json',
    //             data: {
    //                 "showapi_timestamp": formatterDateTime(),
    //                 "showapi_appid": '100970', //这里需要改成自己的appid

    //                 "showapi_sign": 'cdbc519c2c824ff8bf627ef26ceed938', //这里需要改成自己的应用的密钥secret
    //                 "mobile": text,
    //                 "content": `{"code":${msgCodeText},"minute":"3","comName":"奶牛养殖公司"}`,
    //                 "tNum": "T150606060601",
    //                 "big_msg": ""
    //             },
    //             error: function (XmlHttpRequest, textStatus, errorThrown) {
    //                 alert("操作失败!");
    //             },
    //             success: function (result) {
    //                 console.log(result) //console变量在ie低版本下不能用
    //                 // alert(result.showapi_res_code)
    //             }
    //         });

    //         var count = 60;
    //         var timer = setInterval(function () {
    //             count--;
    //             if (count <= 0) {
    //                 sendMsgBtn.html("发送短信验证码");
    //                 clearInterval(timer);
    //             } else {
    //                 sendMsgBtn.html("重试 " + count + "s");
    //             }
    //         }, 1000);
    //     } else {
    //         alert("手机号码不正确");
    //     }

    //     /* 开启倒计时：当前的标签不可点击 */
    // });



    // let imgcode = $('#imgcode');
    // let imgCodeText = '';

    // imgcode.blur(function (e) {
    //     let text = $.trim($(this).val());
    //     imgCodeText = text;
    //     let parent = $(this).parents(".form-item");
    //     let msg = $(this).nextAll('.form-group__message');
    //     console.log(msg);
    //     if (text.length == 0) {
    //         parent.addClass("form-group-error");
    //         msg.html("验证码不能为空");
    //     } else if (imgCodeText.toLowerCase() != text.toLowerCase()) {
    //         parent.addClass("form-group-error");
    //         msg.html("验证码不正确");
    //     } else {
    //         parent.removeClass("form-group-error");
    //     }
    // });



    $("#loginBtn").click(function () {

        let phone = $("#phoneID").val();
        if (!phone) {
            alert('请填写手机号码');
            return;
        }
        $.ajax({
            type: "post",
            url: "./api/loggin.php",
            dataType: "json",
            data: `phone=${phone}`,
            success: function (response) {
                console.log(response);
                if (response.status == 100) {
                    alert('该手机号未注册');
                } else {

                    alert('登录成功');
                    window.location.href = "http://127.0.0.1/tese/mim/test.jianke/jiankewang/home.html";
                }
            }
        });
    })


    $("#loginBtn1").click(function () {
        let username = $("#username").val();
        console.log(username);
        let password = $("#password").val();
        console.log(password);
        if (!username) {
            alert('请输入用户名');
            return;
        } else if (!password) {
            alert('请输入密码');
            return;
        } 
        $.ajax({
            type: "post",
            url: "./api/username.php",
            dataType: "json",
            data: `username=${username}&password=${password}`,
            success: function (response) {
                console.log(response);
                if (response.status == "error") {
                    alert('该用户名未注册');
                } else if (response.status == "100") {
                    alert("登录失败：密码不正确！");
                } else if (response.status = "200") {
                    alert('登录成功');
                    window.location.href = "http://127.0.0.1/tese/mim/test.jianke/jiankewang/home.html";
                }

            }
        });
    })

})