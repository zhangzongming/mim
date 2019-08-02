$(function() {
    $(".tab-login-item").click(function() {
        var index = $(this).index();
        $(".loginView").eq(index).addClass("loginViewCurrent").siblings().removeClass("loginViewCurrent");
    })

    $("#loginBtn").click(function() {

        var username = "xxxx";
        var password = "111111";

        $.ajax({
            type: "post",
            url: "./server/api/login.php",
            dataType: "json",
            data: `username=${username}&password=${password}`,
            success: function(response) {
                console.log(response);
            }
        });
    })


})