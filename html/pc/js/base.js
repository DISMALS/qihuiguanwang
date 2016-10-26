(function ($) {
    var winH = $(window).height();
    var winW = $(window).width();
    //右侧文本内容垂直居中
    jQuery.fn.textCenter = function (eles) {
        setTimeout(function () {
            var eleH = $(eles).height();
            $(eles).css("top", (winH - eleH) / 2);
        }, 200);
    }
    //历史进程
    $.fn.History = {
        timeSum: $('.resetLTimeTitM li').size(),
        timeLast: 5,
        timeCur: 0,
        timeTit: $(".resetLTimeTitM").width(),
        yearWidht: $(".resetLTimeTit").width() / 6,
        //nextFn
        _nextFn: function () {
            $.fn.History.timeCur += 1;
            $.fn.History._showHide($.fn.History.timeCur);
            if ($.fn.History.timeCur > $.fn.History.timeSum - 1) {
                $.fn.History.timeCur = $.fn.History.timeSum - 1
            };
            //内部滚动条
            $("#resetScroll").slimScroll({
                alwaysVisible: true,
                railVisible: false,
                color: "#dadada",
                scrollTo: "0px"
            });
            $.fn.History._nextOne($.fn.History.timeCur);
        },

        //prevFn
        _prevFn: function () {
            $.fn.History.timeCur -= 1;
            $.fn.History._showHide($.fn.History.timeCur);
            if ($.fn.History.timeCur <= 0) {
                $.fn.History.timeCur = 0
            };
            //内部滚动条
            $("#resetScroll").slimScroll({
                alwaysVisible: true,
                railVisible: false,
                color: "#dadada",
                scrollTo: "0px"
            });
            $.fn.History._prevOne($.fn.History.timeCur);
        },

        //thisClickFn
        _targetClickFn: function () {
            var indexLi = $(this).index();
            $.fn.History._showHide(indexLi);
            if ($.fn.History.timeCur != indexLi) {
                $.fn.History.timeCur = $(this).index();
            } else {
                return false;
            }
            //内部滚动条
            $("#resetScroll").slimScroll({
                alwaysVisible: true,
                railVisible: false,
                color: "#dadada",
                scrollTo: "0px"
            });
            $.fn.History._fousChange($.fn.History.timeCur);
        },
        //左右按钮显示隐藏
        _showHide: function (tim) {
            if (tim == $.fn.History.timeSum - 1) {
                $('.nextTime').hide(100);
            }
            if (tim < $.fn.History.timeSum - 1) {
                $('.nextTime').show(100);
            }
            if (tim > 0) {
                $('.prevTime').show(100);
            }
            if (tim == 0) {
                $('.prevTime').hide(100);
            }
        },

        //下一个
        _nextOne: function (i) {
            if ($.fn.History.timeCur <= $.fn.History.timeLast) {
                $.fn.History._fousChange($.fn.History.timeCur);
            }
            if ($.fn.History.timeLast < $.fn.History.timeSum && $.fn.History.timeCur > $.fn.History.timeLast) {
                $.fn.History.timeLast += 1;
                $('.resetLTimeTitM').stop(true).animate({
                    "left": -$.fn.History.yearWidht * (i - 5)
                });
                $.fn.History._fousChange($.fn.History.timeCur);
            }
        },

        //上一个
        _prevOne: function (i) {
            if ($.fn.History.timeCur >= $.fn.History.timeLast - 5) {
                $.fn.History._fousChange($.fn.History.timeCur);
            }
            if ($.fn.History.timeCur < $.fn.History.timeLast - 5 && $.fn.History.timeLast > 5) {
                $.fn.History.timeLast -= 1;
                $('.resetLTimeTitM').stop(true).animate({
                    "left": -$.fn.History.yearWidht * i
                });
                $.fn.History._fousChange($.fn.History.timeCur);
            }
        },

        //获得焦点内容变化
        _fousChange: function (i) {
            $('.resetLTimeTitM li').find("a").removeClass('clickOn');
            $('.resetLTimeTitM li').eq(i).find("a").addClass('clickOn');
            $('.resetTimeCm').hide();
            $('.resetTimeCm').eq(i).fadeTo(200, 1);
        }
    }
})(jQuery)
$(document).ready(function () {
    
    var ltr = '<i class="ltr"></i>';
    var ttb = '<i class="ttb"></i>';
    var rtl = '<i class="rtl"></i>';
    var btt = '<i class="btt"></i>';



    //左侧导航栏高度获取
    function leftHeight() {
        var winH = $(window).height();
        var winW = $(window).width();
        var leftHeadH = $(".leftHead").height(winH);
        var leftHeadW = $(".leftHead").width();
        var logoH = $(".logo").height();
        var borPT = $(".bor").css("paddingTop");
        $(".bor").height(winH - logoH - borPT);
        $(".rightMain").height(winH);
        $(".rightMain").width(winW - leftHeadW - 1);
        $(".page").height(winH);
        if (winW <= 1600) {
            $(".cultrueBtop").css("width", "80%");
        }
        if (winW <= 1400) {
            $(".toTop").css("top", "12.5%");
        }
        if (winH < 730) {
            $(".mainMenu li").css("padding", "0.65em 0em");
        }
        if (winH < 580) {
            $(".toTop").css("top", "8%");
        }
    }
    leftHeight();

    //右侧子菜单
    $(".menu").click(function () {
        var this_ = $(this);
        this_.fadeOut();
        this_.siblings(".rightMenu").slideDown(1000, function () {
            $(this).children("li").click(function () {
                $(".rightMenu").slideUp();
                this_.fadeIn();
            });

        });
    });

    //鼠标滑过
    $(".mainMenu li").each(function (i, ele) {
        $(".mainMenu li").eq(i).children("a").bind({
            mouseenter: function () {
                var this_ = $(this);
                this_.append(ltr + ttb + rtl + btt); //向鼠标滑过的a内添加i标签
                if (this_.hasClass("act")) {
                    return false;
                } else {
                    this_.find(".ltr").css({
                        top: 0,
                        left: 0,
                        height: "1px"
                    }).stop(false).animate({
                        width: "100%"
                    }, 150);
                    this_.find(".ttb").css({
                        top: 0,
                        right: 0,
                        width: "1px"
                    }).stop(false).animate({
                        height: this_.outerHeight()
                    }, 150);
                    this_.find(".rtl").css({
                        bottom: 0,
                        right: 0,
                        height: "1px"
                    }).stop(false).animate({
                        width: "100%"
                    }, 150);
                    this_.find(".btt").css({
                        bottom: 0,
                        left: 0,
                        width: "1px"
                    }).stop(false).animate({
                        height: this_.outerHeight()
                    }, 150);
                }
            },
            mouseleave: function () {
                var this_ = $(this);
                if (this_.hasClass("act")) {
                    return false;
                } else {
                    this_.find(".ltr").stop(false).animate({
                        width: "0px"
                    }, 150, function () {
                        $(this).css("height", "0px");
                    }).css({
                        top: 0,
                        left: 0
                    });
                    this_.find(".ttb").stop(false).animate({
                        height: "0px"
                    }, 150, function () {
                        $(this).css("width", "0px");
                    }).css({
                        top: 0,
                        right: 0
                    });
                    this_.find(".rtl").stop(false).animate({
                        width: "0px"
                    }, 150, function () {
                        $(this).css("height", "0px");
                    }).css({
                        bottom: 0,
                        right: 0
                    });
                    this_.find(".btt").stop(false).animate({
                        height: "0px"
                    }, 150, function () {
                        $(this).css("width", "0px");
                    }).css({
                        bottom: 0,
                        left: 0
                    });
                    setTimeout(function () {
                        this_.find("i").remove();
                    }, 150);
                }

            }
        });
    });

    
    jQuery.fn.textCenter(".toTop");

    //窗口重置时需要执行的函数
    $(window).resize(function () {
        leftHeight();
        jQuery.fn.textCenter(".aboutUs");
    });

    
});

(function () {
    
    //判断浏览器类型
    window.sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var attr;
    (attr = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = attr[1] : //火狐浏览器
	(attr = ua.match(/msie ([\d.]+)/)) ? sys.msie = attr[1] : //IE浏览器
	(attr = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = attr[1] : //谷歌浏览器
	(attr = ua.match(/opera\/.*version\/([\d.]+)/)) ? sys.opera = attr[1] : //opera浏览器
	(attr = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = attr[1] : "无法检测该浏览器版本！";  //苹果浏览器
    if (sys.msie && parseInt(sys.msie) < 9) {
        var allHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var iePop = document.createElement('<div class="iePop" id="iePop"><\/div>');
        var popDiv = document.createElement('<div class="iePopM" id="iePopM"><i class="lt"><\/i><i class="lb"><\/i><i class="rt"><\/i><i class="rb"><\/i><\/div>');
        var img = document.createElement('<img class="jg" src="images\/jg.png" />');
        var textDiv = document.createElement('<div class="iePopMR"><\/div>');
        var b = document.createElement('b');
        var p = document.createElement('p');
        var font = document.createElement('font');
        var browser = document.createElement('<div class="browserList"><\/div>');
        //console.log(popDiv)
        font.innerHTML = '请下载最新版浏览器';
        b.innerHTML = '你知道你的Internet Explorer是过时了吗？';
        p.innerHTML = '为了得到我们网站最好的体验效果，我们建议您升级到最新版本的Internet Explorer或选择另一个Web浏览器.最流行的Web浏览器在下面可以找到.';
        textDiv.appendChild(b);
        textDiv.appendChild(p);
        textDiv.appendChild(font);
        textDiv.appendChild(browser);
        popDiv.appendChild(img);
        popDiv.appendChild(textDiv);
        iePop.appendChild(popDiv);
        document.getElementsByTagName("body")[0].appendChild(iePop);
        //console.log(document.getElementById("iePopM"));
        document.getElementById("iePopM").style.top = parseInt(allHeight - 400) / 2 + "px";
    }
})()
