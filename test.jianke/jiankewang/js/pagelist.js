$(function () {

    var itemData;
    $('.list2-p').mouseenter(function () {
        $('.list2-erji').css('display', 'block');
        $.ajax({
            type: "get",
            url: "home.json",
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
                $('.lis1').first().css('width', '570px');
                $('.lis1').first().next().css('width', '340px');
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

    function init() {
        $.ajax({
            type: "get",
            url: "Control.json",
            dataType: "json",
            success: function (data) {

                let html = data.map(function (item) {
                    let str = item.model.map(function (value) {
                        return `<dd>${value}</dd>`
                    }).join("");
                    let str1 = item.des.map(function (element) {
                        return `<dd>${element}</dd>`
                    }).join('');
                    let str2 = item.product.map(function (value) {
                        return `<dd>${value}</dd>`
                    }).join('');
                    return `<li class="nav2-list">
                    <dl>
                        <dt>${item.name}</dt>
                    </dl>
                    <dl>
                        ${str}
                    </dl>
                    <ul class="nav2-erji">
                    <li>
                        <dl class="nav2-erjidl1">
                            <dt>${item.andrology}</dt>
                            ${str1}
                        </dl>
                    </li>
                    <li>
                        <dl class="nav2-erjidl1">
                            <dt>${item.title}</dt>
                            ${str2}
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>${item.products}</dt>
                            <img src="${item.src}" alt="">
                        </dl>
                    </li>
                </ul>
                </li>`
                }).join('');
                $('.nav2-ul').html(html);
            }
        })
    }
    init();

    $('.nav2-end').mouseenter(function () {
        $(this).children("h3").addClass("active");
        $(this).children('.nav2-ul').addClass("cont");
    })
    $('.nav2-end').mouseleave(function () {
        $(this).children('.nav2-ul').addClass("cont").removeClass('cont');
        $(this).children("h3").addClass("active").removeClass("active");
    })
    $('.nav2-end').on("mouseenter", ".nav2-list", function () {
        let ine = $(this).index();
        let cone = $(this).addClass('conttt').siblings().removeClass('conttt');
        $(this).children('.nav2-erji').addClass("actve").siblings().removeClass("actve");
    })

    $('.nav2-end').on("mouseleave", ".nav2-list", function () {

        $(this).children('.nav2-erji').removeClass("actve");
        $(this).addClass('conttt').removeClass("conttt");
    })





    $.ajax({
        type: "post",
        url: "./sever/page.php",
        dataType: "json",
        success: function (response) {
            itemData = response;

            response.data.forEach((ele,i) => {
                
            
                let classActive = ele.model == '查看详情' ? 'detailPage' : 'trolleyCart';

               let res = `<li data-index=${i}>
                        <div class='listli'>
                            <img class="bigimg" src="${ele.src}" alt="">
                            <p><span>${ele.splie}</span><del class="splic">${ele.splic}</del></p>
                            <p class="pagelistp"><img src="./img/100.jpg" alt="">${ele.des}</p>
                        </div>
                        <div class="pagelist2">
                            <span class='${classActive} xiang' style=''>${ele.model}</span>
                        </div>
                    </li>`;

                $(".contpage").append(res);
            })
            


        }

    });

    $(".contpage").on("click", ".detailPage", function () {
        window.location.href = `http://127.0.0.1/tese/mim/test.jianke/jiankewang/page.html?`;
    })

    $(".contpage").on("click", ".listli", function () {

        var mark = $(this).children("p").children(".splic").text();
        window.location.href = `http://127.0.0.1/tese/mim/test.jianke/jiankewang/page.html?id=${mark}`;
    })


        
        // console.log(itemData.data[index].splie);
    //     console.log(itemData.data[index].id);
    // console.log($("#catShow"));
    /*添加到购物车功能*/
    $(".contpage").on("click", ".trolleyCart", function () {
        /* 发送网络请求给服务器 */
        /* 向购物车表单中添加一条数据 */
        /* 购物车表单--- carID 商品ID 数量 小计  */
        /* 获取当前选中商品的id，把该id作为参数提交给服务器，服务器接收到请求后执行+1操作 */

        /* INSERT INTO `cat` (`catID`, `id`, `num`, `total`) VALUES ('1', '1', '2', '100'); */
        // console.log();
        var index = $(this).parent().parent().data("index");
        // console.log(index);
       let splie = itemData.data[index].splie.slice(1,-1);
       console.log(splie);
        $.ajax({
            type: "get",
            data: `id=${itemData.data[index].id}&price=${splie}`,
            url: "./php/cart.php",
            dataType: "json",
            success: function (response) {
                if (response.status == "success") {
                    console.log("添加成功");
                    console.log(response);
                    $("#catShow").html(response.data.count)
                }
            }
        });
    })
})