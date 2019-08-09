$(function () {
    /* 图形验证码 */
    let imgCodeText = "";
    let imgCodeText2 = "";
    /* 短信验证码 */
    let msgCodeText = "";
    let msgText = "";
    /* 密码 */
    let passwordAText = "";
    let passwordBText = "";
    /* 用户名 */
    let usernameText = "";
    /* 手机号码 */
    let phoneText = "";

    let username = $("#usernameID");
    let phone = $("#phoneID");
    let passwordA = $("#passwordA");
    let passwordB = $("#passwordB");
    let imgCode = $('#imageCode');
    let sendMsgBtn = $(".code-sms");
    let msgCode = $("#msgCode");

    /* 验证码处理 */
    (new Captcha({
        fontSize: 30
    })).draw(document.querySelector('#captcha'), r => {
        console.log(r, '验证码1');
        imgCodeText = r;
        /* 自动触发标签失去焦点的事件 */
        imgCode.trigger("blur");
    });

    /* 正则表达式 */
    let regUsername = /^[A-Za-z]{6,8}$/;
    let regPhone = /^1[3-9]\d{9}$/; /* 1开头 第二位3-9 后面全都是数字   11位 */
    let regPassword = /^[a-zA-Z0-9]{6,16}$/;


    function formatterDateTime() {
        var date = new Date()
        var month = date.getMonth() + 1
        var datetime = date.getFullYear() +
            "" // "年"
            +
            (month >= 10 ? month : "0" + month) +
            "" // "月"
            +
            (date.getDate() < 10 ? "0" + date.getDate() : date
                .getDate()) +
            "" +
            (date.getHours() < 10 ? "0" + date.getHours() : date
                .getHours()) +
            "" +
            (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                .getMinutes()) +
            "" +
            (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                .getSeconds());
        return datetime;
    }

    sendMsgBtn.click(function () {

        //随机验证码
        msgCodeText = parseInt(Math.random() * 1000000);
        console.log(msgCodeText);
        /* 检查手机号码是否正确 */
        var text = $.trim(phone.val());
        if (text.length != 0 && regPhone.test(text)) {

            /* 发送网络请求：发短信 */
            $.ajax({
                type: 'post',
                url: 'http://route.showapi.com/28-1',
                dataType: 'json',
                data: {
                    "showapi_timestamp": formatterDateTime(),
                    "showapi_appid": '100970', //这里需要改成自己的appid

                    "showapi_sign": 'cdbc519c2c824ff8bf627ef26ceed938', //这里需要改成自己的应用的密钥secret
                    "mobile": text,
                    "content": `{"code":${msgCodeText},"minute":"3","comName":"奶牛养殖公司"}`,
                    "tNum": "T150606060601",
                    "big_msg": ""
                },
                error: function (XmlHttpRequest, textStatus, errorThrown) {
                    alert("操作失败!");
                },
                success: function (result) {
                    console.log(result) //console变量在ie低版本下不能用
                    // alert(result.showapi_res_code)
                }
            });

            var count = 120;
            var timer = setInterval(function () {
                count--;
                if (count <= 0) {
                    sendMsgBtn.html("发送短信验证码");
                    clearInterval(timer);
                } else {
                    sendMsgBtn.html("重试 " + count + "s");
                }
            }, 1000);
        } else {
            alert("手机号码不正确");
        }

        /* 开启倒计时：当前的标签不可点击 */
    });

    //监听用户名标签失去焦点的事件
    username.blur(function (e) {
        let text = $.trim($(this).val());
        usernameText = text;
        let parent = $(this).parents(".form-item");
        let msg = $(this).nextAll('.form-group__message');

        if (text.length == 0) {
            parent.addClass("form-group-error");
            msg.html("用户名不能为空");
        } else if (!regUsername.test(text)) {
            parent.addClass("form-group-error");
            msg.html("用户名不符合规范");
        } else {
            parent.removeClass("form-group-error");
        }
    });

    //检查短信验证码标签失去焦点的事件

    msgCode.blur(function (e) {
        let text = $.trim($(this).val());
        msgText = text;
        let parent = $(this).parents(".form-item");
        let msg = $(this).nextAll('.form-group__message');

        if (text.length == 0) {
            parent.addClass("form-group-error");
            msg.html("短信验证码不能为空");
        } else if (text != msgCodeText) {
            parent.addClass("form-group-error");
            msg.html("短信验证码错误");
        } else {
            parent.removeClass("form-group-error");
        }
    });

    // 检查图形验证码标签失去焦点的事件
    imgCode.blur(function (e) {
        let text = $.trim($(this).val());
        imgCodeText2 = text;
        let parent = $(this).parents(".form-item");
        let msg = $(this).nextAll('.form-group__message');

        if (text.length == 0) {
            parent.addClass("form-group-error");
            msg.html("验证码不能为空");
        } else if (imgCodeText.toLowerCase() != text.toLowerCase()) {
            parent.addClass("form-group-error");
            msg.html("验证码不正确");
        } else {
            parent.removeClass("form-group-error");
        }
    });

    //检查手机号码标签失去焦点的事件
    phone.blur(function (e) {
        let text = $.trim($(this).val());
        phoneText = text;
        let parent = $(this).parents(".form-item");
        let msg = $(this).nextAll('.form-group__message');

        if (text.length == 0) {
            parent.addClass("form-group-error");
            msg.html("手机号码不能为空");
        } else if (!regPhone.test(text)) {
            parent.addClass("form-group-error");
            msg.html("请输入正确的手机号码");
        } else {
            parent.removeClass("form-group-error");
        }
    });

    //检查密码标签失去焦点的事件
    passwordA.blur(function (e) {
        let text = $.trim($(this).val());
        passwordAText = text;
        let parent = $(this).parents(".form-item");
        let msg = $(this).nextAll('.form-group__message');

        if (text.length == 0) {
            parent.addClass("form-group-error");
            msg.html("密码不能为空");
        } else if (!regPassword.test(text)) {
            parent.addClass("form-group-error");
            msg.html("密码格式不正确");
        } else {
            parent.removeClass("form-group-error");
        }
    });

    //检查确认密码失去焦点的事件
    passwordB.blur(function (e) {
        let text = $.trim($(this).val())
        passwordBText = text;
        let parent = $(this).parents(".form-item");
        let msg = $(this).nextAll('.form-group__message');

        if (text.length == 0) {
            parent.addClass("form-group-error");
            msg.html("确认密码不能为空");
        } else if (passwordBText != passwordAText) {
            parent.addClass("form-group-error");
            msg.html("密码不匹配");
        } else {
            parent.removeClass("form-group-error");
        }
    });


    $("#registerBtn").click(function () {
        // usernameText = "jiji";
        // phoneText = "18689429886";
        // msgText = "111";
        // imgCodeText = "222";
        // passwordBText = passwordAText = "33333333";
        let isCheck = $("#protocol").is(":checked");
        if (usernameText.length == 0) {
            alert('请填写用户名');
        } else if (phoneText.length == 0) {
            alert('请填写手机号码');
        } else if (imgCodeText2.length == 0) {
            alert('请填写图形验证码');
        } else if (imgCodeText.toLowerCase() != imgCodeText2.toLowerCase()) {
            alert('图形验证码不正确');
        } else if (msgText.length == 0) {
            alert('请填写短信验证码');
        } else if (msgText != msgCodeText) {
            alert('短信验证码不正确');
        } else if (passwordAText.length == 0) {
            alert('请填写密码');
        } else if (passwordBText.length == 0) {
            alert('请确认密码');
        } else if (passwordAText != passwordBText) {
            alert('密码不一致');
        } else if (!isCheck) {
            alert("请阅读并同意用户协议");
        } else {
            console.log('=======进入');
            $.ajax({
                type: "post",
                url: "./api/register.php",
                dataType: "json",
                data: `username=${usernameText}&password=${passwordAText}&phone=${phoneText}`,
                // dataType: "dataType",
                success: function (response) {
                    console.log(response);
                    /* 先检查请求的结果，然后做出对应的处理 */
                    if (response.status == "success") {
                        alert(response.msg);
                        /* 跳转到登录页面 */
                        window.location.href = "http://127.0.0.1/tese/mim/test.jianke/jiankewang/reglogin/logg.html";
                    } else {
                        alert(response.msg);
                    }
                }
            });
        }




        // http://127.0.0.1/day-31/Code/login/sever/api/register.php 
        // http://127.0.0.1/day-31/Code/login/server/api/register.php
    })
})