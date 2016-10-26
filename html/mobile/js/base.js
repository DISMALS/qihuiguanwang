$(document).ready(function(){
    var winH = $(window).height();
    var winW = $(window).width();
    
    
    //主导航的高度
    $(".menuMain").height(winH);

    //右侧导航下拉
    $(".menuBtn").click(function () {
        var this_ = $(this);
        this_.stop(true).fadeOut();
        $("body").eq(0).css("overflow", "hidden");
        $("body").bind("touchmove", function (event) {
            event.preventDefault;
        }, false);
        $(".menuMain").stop(false).slideDown(function () {
            var this_s = $(this);
            this_s.find("li").click(function () {
                this_s.stop(false).slideUp();
                this_.stop(true).fadeIn();
                $("body").unbind("touchmove");
                $("body").eq(0).css("overflow", "auto");
            });
        });
        
    });

    //背景层显示
    $(".backgroundFloor").fadeIn(200);
    setTimeout(function () {
        var bodyH = $("body").height();
        if (bodyH < winH) {
            $("body").height(winH);
        }
        //console.log(bodyH);
        $(".backgroundFloor").css({
            width: winW + "px",
            height: $(document.body).height() + "px"
        });
    }, 200)
});
