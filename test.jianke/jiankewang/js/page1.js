$(function () {

    let itemData;

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



    let id = window.location.search.slice(1);
    console.log(id);


    $.ajax({
        type: "post",
        url: "./sever/details.php",
        data: `${id}`,
        success: function (response) {
            let res = JSON.parse(response).data;
            itemData = res;
            res.forEach(element => {
                $(".bigimg").attr("src", element.src);
                $('.imgsrc').children().first().attr("src", element.src);
                $(".details").text(element.des);
                $(".price").text(`价格：${element.splie}`);
            });
        }
    })

    $('.imgsrc').children().first().addClass("active");
    $('.imgsrc').children().mouseenter(function () {
        $(this).addClass("active").siblings().removeClass("active");
        $(".bigimg").attr("src", $(this).attr("src"));
    })


    var subBtn = document.getElementById('plus');
    var tex = document.getElementById('purcha');
    var addBtn = document.getElementById('subtract');


    function oBtnAmount() {
        //3.数量增加
        subBtn.onclick = function () {
            tex.value++;
        }

        //2.数量减少
        addBtn.onclick = function () {
            if (tex.value <= 1) {
                subtract.disabled = 'disabled';
            } else {
                subtract.disabled = '';
                tex.value--;
            }
        }
        subBtn.onclick = function () {
            tex.value++;
        }
    }
    oBtnAmount()




    $(".join").click(function () {


        /* 发送网络请求给服务器 */
        /* 向购物车表单中添加一条数据 */
        /* 购物车表单--- carID 商品ID 数量 小计  */
        /* 获取当前选中商品的id，把该id作为参数提交给服务器，服务器接收到请求后执行+1操作 */

        /* INSERT INTO `cat` (`catID`, `id`, `num`, `total`) VALUES ('1', '1', '2', '100'); */
        // console.log();
        let num = $('#purcha').val();
        console.log(num);
        let splic = itemData[0].splie.slice(1);
        let des = encodeURI(itemData[0].des);

        let src = itemData[0].src;
        console.log(splic);
        // console.log(itemData[0].id);
        console.log(itemData[0].id, splic, num);
        $.ajax({
            type: "get",
            data: `id=${itemData[0].id}&price=${splic}&num=${num}&des=${des}&src=${src}`,
            url: "./php/cart1.php",
            dataType: "json",
            success: function (response) {
                if (response.status == "success") {
                    console.log("添加成功");
                    console.log(response);
                    // $("#catShow").html(response.data.count)
                }
            }
        });
    })

    $(".once").click(function () {
        window.location.href = "http://127.0.0.1/tese/mim/test.jianke/jiankewang/cart.html";
    })
    // 放大镜
    var hz, box, kz, yt_div;
    let fdj = {
        initialize: function (div) {
            // div.css('position', 'relative')
            var zb = div.offset()
            yt_div = div
            kz = div
            box = $('<div>')
            var bs = 3
            ck = 200
            box.css({
                'width': ck * bs + 'px',
                'height': ck * bs + 'px',
                'position': 'absolute',
                'border': 'solid 1px #dfdfdf',
                'z-index': '999',
                'overflow': 'hidden',
                'top': zb.top,
                'left': zb.left + div.width() + 10,
                'display': 'none'
            })
            var img = $('<img>')
            img.css({
                'width': div.width() * bs,
                'height': div.height() * bs,
                'position': 'absolute'
            })
            box.append(img)
            var k = $('<div>')
            k.css({
                'width': div.width() / bs + 'px',
                'height': div.height() / bs + 'px',
                'background': 'url(../img/mask.png) repeat scroll 0 0 transparent',
                'position': 'absolute',
                'top': '0',
                'left': '0',
                'display': 'none'
            })
            hz = k
            // 必须添加到内部才不会触发离开div事件
            // 用计时器防止被其他操作清理掉
            setTimeout(() => {
                div.append(k)
            }, 500)
            $('body').append(box)
        },
        // 鼠标移动时的触发方法
        mover: function (e) {
            var yt_xy = yt_div.offset()
            var x = e.pageX - hz.width() / 2
            var y = e.pageY - hz.height() / 2
            if (x - yt_xy.left < 0) {
                x = yt_xy.left
            }
            if (x + hz.width() > yt_xy.left + kz.width()) {
                x = yt_xy.left + kz.width() - hz.width()
            }
            if (y - yt_xy.top < 0) {
                y = yt_xy.top
            }
            if (y + hz.height() > yt_xy.top + kz.height()) {
                y = yt_xy.top + kz.height() - hz.width()
            }
            hz.css({
                'left': x + 'px',
                'top': y + 'px'
            })
            yt_xy
            $('img', box).css({
                'left': (yt_xy.left - x) * 2 + 'px',
                'top': (yt_xy.top - y) * 2 + 'px'
            })

        },
        // 鼠标移入事件.自动获取内部的img
        into: function (url) {
            // console.log($('img',box))
            box.css('display', 'block')
            hz.css('display', 'block')
            $('img', box).attr('src', url)
            if (!$('img', box).attr('src')) {
                console.log('空', url)
            }
        },
        // 鼠标移出事件
        leave: function () {
            box.css('display', 'none')
            hz.css('display', 'none')
        }
    };


    //放大镜
    fdj.initialize($('#aimg'))
    // 鼠标进入
    $('#aimg').mouseenter(function (e) {
        e = e.target
        if (!e.src) {
            // 鼠标在父对象边框进入的情况
            // src将获取不到
            e = $('img', e)[0]
        }
        fdj.into(e.src)
    });
    // 鼠标离开
    $('#aimg').mouseleave(function (e) {
        fdj.leave()
    });
    // 鼠标移动
    $('#aimg').mousemove(function (e) {
        fdj.mover(e)
    });






})