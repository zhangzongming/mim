$(function () {
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
                console.log(data);
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
                $('.nav2').children().html(html);
            }
        })

        $('.nav2').on("click", ".nav2-list", function () {
            window.location.href = `http://127.0.0.1/tese/mim/test.jianke/jiankewang/listpage.html`;
        })
    //    $('.nav2').children(".nav2-list").children("ul").children().children().css("cursor","pointer");
    }
    init();


    $('.nav2-end').on("mouseenter", ".nav2-list", function () {
        let ine = $(this).index();
        let cone = $(this).addClass('conttt').siblings().removeClass('conttt');
        $(this).children('.nav2-erji').addClass("actve").siblings().removeClass("actve");
    })

    $('.nav2-end').on("mouseleave", ".nav2-list", function () {

        $(this).children('.nav2-erji').removeClass("actve");
        $(this).addClass('conttt').removeClass("conttt");
    })




    //轮播图
    $.ajax({
        type: "get",
        url: "banner.json",
        dataType: "json",
        success: function (data) {

            (new BannerManager(data, 'true', 'true', 'true', 1, 2500, 0, $(".box2"))).init();
        }
    })



    $.ajax({
        type: "get",
        url: "./sever/main.json",
        dataType: "json",
        success: function (data) {
            let html = data.map(function (element) {

                return `<li class="lilist">
              <img class="bigimg" src="${element.imgsrc}" alt="">
              <div class="box3">
                   <div class="box3-1">
                        <h3>${element.title}</h3> 
                        <p>${element.model}</p>  
                   </div>
              </div>
              <ul>
                                <li>
                                    <a href="#"><img src="${element.src1}" alt=""></a>
                                    <h4>${element.name1}</h4>
                                    <p>${element.des1}</p>
                                </li>
                                <li>
                                <a href="#"><img src="${element.src2}" alt=""></a>
                                <h4>${element.name2}</h4>
                                <p>${element.des3}</p>
                                </li>
                                <li>
                                <a href="#"><img src="${element.src3}" alt=""></a>
                                <h4>${element.name3}</h4>
                                <p>${element.des3}</p>
                                </li>
                            </ul>
           </li>`
            }).join('');
            $('.nav5').html(html);
        }
    })

    $('.nav5').on("click", ".lilist", function () {
        window.location.href = `http://127.0.0.1/tese/mim/test.jianke/jiankewang/listpage.html`;
    })
    $('.nav5').children()
    $.ajax({
        type: "get",
        url: "./sever/banner1.json",
        dataType: "json",
        success: function (data) {

            (new BannerManagero(data, 'false', 'false', 'true', 1, 2500, 0, $(".market-banner2"))).init();
        }
    })
    $.ajax({
        type: "get",
        url: "./sever/main1.json",
        dataType: "json",
        success: function (data) {
            let html = data.map(value => {
                let str = value.models.map(ele => {
                    return `<li><em></em><a href="#">${ele}</a></li>`
                }).join('');
                let str1 = value.urlimg.map(item => {
                    return `<li><img src="${item}" alt=""></li>`
                }).join('');
                return `<div class="floorDiv">
                <h2>${value.title}</h2>
                <div class="cigimgs">
                     <img class="cigimg" src="${value.bigimg}" alt="">
                    <ul class="nav6-1">
                        ${str}
                    </ul>
                    <ul class="nav6-2">
                        ${str1}
                    </ul>
                </div>
                <div class="dgimgs">
                    <img class="dgimg" src="${value.imgsrc}" alt="">
                    <div class="dgimgs-1">
                        <h3>${value.name}</h3>
                        <p>${value.piec}</p>
                    </div>
                </div>
                <ul class="egimgs">
                    <li><p>${value.des1}</p><img src="${value.src1}" alt=""></li>
                    <li><p>${value.des2}</p><img src="${value.src2}" alt=""></li>
                    <li><p>${value.des3}</p><img src="${value.src3}" alt=""></li>
                    <li><p>${value.des4}</p><img src="${value.src4}" alt=""></li>
                </ul>
                <ul class="fgimgs">
                    <li>
                        <p>${value.des5}</p>
                        <img src="${value.src5}" alt="">
                    </li>
                    <li>
                        <p>${value.des6}</p>
                        <img src="${value.src6}" alt="">
                    </li>
                    <li>
                        <p>${value.des7}</p>
                        <img src="${value.src7}" alt="">
                    </li>
                </ul>
                <div class="advertisi">
                    <img src="${value.src8}" alt="">
                </div>
            </div>`
            }).join('');
            $('.floor').children().html(html);
        }
    })
    $('.journalism').children().first().addClass('contt');
    $('.journa-a').first().addClass('current');
    $('.journalism').children().mouseenter(function () {
        let idx = $(this).index();
        let lit = $(this).addClass("contt").siblings().removeClass("contt");
        $(".journa-a").eq($(this).index()).addClass("current").siblings().removeClass("current");
    })



    $('.linkstop').children().first().addClass('active2');
    $('.linkscont').first().addClass('cont2');
    $('.linkstop').children().mouseenter(function () {
        let ine = $(this).index();
        let cone = $(this).addClass('active2').siblings().removeClass('active2');
        $('.linkscont').eq($(this).index()).addClass("cont2").siblings().removeClass("cont2");
    })

    $('.box2-ul').children();

    $('.floor').on("click", ".egimgs", function () {
        window.location.href = `http://127.0.0.1/tese/mim/test.jianke/jiankewang/listpage.html`;
    })
    $('.floor').on("click", ".fgimgs", function () {
        window.location.href = `http://127.0.0.1/tese/mim/test.jianke/jiankewang/listpage.html`;
    })

})