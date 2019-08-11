$(function () {
    $('.list2-p').mouseenter(function () {
        $('.list2-erji').css('display', 'block');
        $.ajax({
            type: "get",
            url: "./sever/page.json",
            dataType: "json",
            success: function (data) {
                console.log(data);
                let html = data.map(function (value) {
                    let str = value.des.map(element => {
                        return `<dd class="fl dd1"><span style="color:${value.hot.indexOf(element)!= -1 ? "red" : "#000"}">${element}</span></dd>`

                    }).join('');
                    return `<li class="lis1 fl">
                    <dl>
                    <dt class="dt1">${value.title}</dt>
                    <dl> 
                        ${str}
                    </dl>
                    </dl>
                </li>`
                }).join('');
                $('.box1').html(html);

                $('.list2-p').css('background', '#fff');
                $('.list2-p').css('border-left', '1px solid #ccc');
                $('.list2-p').css('border-right', '1px solid #ccc');
                $('.dt1').css('color', '#0691f9');
                $('.dt1').css('margin-bottom', '12px');
                $('.dd1').css('line-height', '25px');
                $('.dd1').children().css('padding', '4px');

                // $('.dd1').children().css('border-radius', '5px');
                $('.dt1').css('font-size', '22px');
                $('.dt1').css('line-height', '22px');
                $('.lis1').css('width', '135px');
                $('.lis1').css('border-left', '1px solid #ccc');

                $('.lis1').css('padding-left', '20px');
                $('.lis1').css('padding-right', '20px');
                $('.lis1').css('height', '235px');
                $('.lis1').css('box-sizing', 'border-box');
                $('.dd1').css('width', '85px');
                $('.dd1').css('font-size', '12px');
                $('.dd1').css('color', '#000');
                $('.lis1').first().css('border-left', '0px');
                $('.lis1').first().css('width', '380px');
                $('.lis1').first().next().css('width', '320px');
                $('.lis1').first().next().css('border-left', '1px solid #ccc');
                $('.dd1').children().mouseenter(function () {
                    $(this).css('background', '#0691f9');
                    $(this).css('border-radius', '5px');
                    $(this).css('color', '#fff');
                })
                $('.dd1').children().mouseleave(function () {
                    $(this).css('background', '#fff');
                    $(this).css('border-radius', '0');
                    $(this).css('color', '#000');
                })
            }
        })
    })
    $('.list2-erji').mouseenter(function () {
        $(this).css('display', 'block');
        $('.list2-p').css('background', '#fff');
        $('.list2-p').css('border-left', '1px solid #ccc');
        $('.list2-p').css('border-right', '1px solid #ccc');
    })
    $('.list2-erji').mouseleave(function () {
        $('.list2-p').css('border-right', '0px');
        $('.list2-p').css('border-left', '0px');
        $('.list2-erji').css('display', 'none');
        $('.list2-p').css('background', '#f5f5f5');
    })
    $('.list2-p').mouseleave(function () {
        // switcch = true;
        $('.list2-p').css('border-right', '0px');
        $('.list2-p').css('border-left', '0px');
        $('.list2-erji').css('display', 'none');
        $('.list2-p').css('background', '#f5f5f5');
    })


    var targetData;
    /* 获取数据库中所有购物车相关的信息 */

    getCatInfo();

    function getCatInfo() {
        $.ajax({
            type: "get",
            url: "./php/cart.php",
            dataType: "json",
            success: function (response) {
                targetData = response;

                console.log(response.data);
                /* 根据数据来渲染页面 */
                var res = response.data.map(function (ele) {
                    var html = `
                    <li data-index="${ele.id}">
                    <p><input class="checkbox-class" type="checkbox" ${ele.isActive==1 ? "checked" : ""}></p>
                    <div class="newslist">
                        <img src="${ele.src}" alt="">
                        <p>${ele.des}</p>
                    </div>
                    <div class="unitlist">
                        <span class="price">${ele.price}元</span>                        
                    </div>
                    <p class="amount">
                        <button class="increase">+</button>
                        <input id="numberAll" type="text" value="${ele.num}">
                        <button class="reduce">-</button>
                    </p>
                    <p class="compute">
                        ${ele.total}元
                    </p>
                    <p class="cancel">
                        <img class="delete" src="./img/1000.png" alt="">
                    </p>
                </li>
                        `;
                    return html;
                }).join("");
                $(".productList").html(res);
                getTotalPrice(response)
            }
        });
    }


    $(".productList").on("click", ".increase", function () {
        $(this).next().val() + 1;
    })
    // var subBtn = $(".increase");
    // console.log(subBtn);
    // var tex = document.querySelector('#numberAll');
    // var addBtn = document.querySelector('.reduce');

    // console.log(subBtn);

    // function oBtnAmount() {
    //     //3.数量增加
    //     subBtn.onclick = function () {
    //         tex.value++;
    //     }

    //     //2.数量减少
    //     addBtn.onclick = function () {
    //         if (tex.value <= 1) {
    //             subtract.disabled = 'disabled';
    //         } else {
    //             subtract.disabled = '';
    //             tex.value--;
    //         }
    //     }
    //     subBtn.onclick = function () {
    //         tex.value++;
    //     }
    // }
    // oBtnAmount()

    $(".productList").on("click", ".cancel", function () {
        let id = $(this).parent().data("index");
        $.ajax({
            type: "get",
            data: `id=${id}`,
            url: "./php/deleteCart.php",
            dataType: "json",
            success: function (response) {
                if (response.data == "200") {
                    getCatInfo();
                }
            }
        });
    })
    // getCatInfo();
    /* 当更新的时候那就去操作数据库 */
    $("#checkall").click(function () {
        /* 设置所有的标签为选中状态 */
        /* 发请求去修改内容 */
        $(".checkbox-class").prop("checked", $(this).is(":checked"));

        /* 发请求设置让所有的都处理 */
        /* 遍历发送3次网络请求 */

    })


    /* 封装方法计算总价 */
    /* 每次发请求后遍历对象 */
    function getTotalPrice(response) {
        console.log(response);
        var res1 = 0;
        response.data.forEach(element => {
            if (element.isActive == 1) {
                res1 += element.total * 1;
            }
        });
        $(".totalPrice").html("总价：" + res1.toFixed(2));
    }

    // /* 什么时候更新数据呢？ */
    $("productList").on("click", ".checkbox-class", function () {
        var dataid = $(this).parents("li").data("index");
        var isActive = $(this).is(":checked");
        $.ajax({
            type: "get",
            url: "./server/updateCatInfoWithActive.php",
            data: `id=${dataid}&isActive=${isActive}`,
            dataType: "dataType",
            success: function (response) {
                /* 如果请求成功，那么就重新发请求加载数据 */
                getCatInfo();
            }
        });
    })





})