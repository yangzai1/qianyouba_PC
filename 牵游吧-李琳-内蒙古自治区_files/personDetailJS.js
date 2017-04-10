/**
 * Created by user13 on 2016/1/27.
 */
$(function ($) {
    var topdistance=$(".position_mark").offset().top;;
    var $absolute_part = $(".absolute_part");
    var absolute_part_h= $absolute_part.height();
    var win = $(window);
    var wh= win.height();
    var title_p_top = absolute_part_h + topdistance + 70;
    var $menu_part = $(".menu_part");
    var menu_part_left=$menu_part.offset().left;
    var $left_part = $(".left_part");
    //设置初始位置
    $absolute_part.css({
        "position": "absolute",
        "top": topdistance + "px",
        "z-index":"1"
    }); 
    $('.page_headimg img').load(function () {
        topdistance = $(".position_mark").offset().top;
        absolute_part_h = $absolute_part.height();
        menu_part_left = $menu_part.offset().left;
        set_title_content_top();
        wh = win.height();
    })

    window.onscroll = onscroll_action;

    
    //视窗改变重新定位
    $(window).resize(function () {
        set_title_content_top();
        onscroll_action();
    });

    function set_title_content_top() {
        absolute_part_h = $absolute_part.height();
        title_p_top = absolute_part_h + 70;
        $(".title_content").css({
            "padding-top": title_p_top + "px"
        });
    };

    function onscroll_action() {
        menu_part_left = $left_part.offset().left + $left_part.outerWidth();
        var scrolldist = $(".page_headimg").height() + topdistance - 40;
        var headimg_h = $(".page_headimg img").height();
        var scrollvalue = (win.scrollTop());
        if (scrolldist <= scrollvalue) {
            //滑到定位点动作
            $absolute_part.css({
                "position": "fixed",
                "top": -headimg_h + 70 + "px",
                "z-index":"1"
            });
            $(".menu_part").css({
                "position": "fixed",
                "top": "160px",
                "left": menu_part_left + "px"
            });
            if(scrollvalue>=($left_part.offset().top+$left_part.height()-$menu_part.height()-200)){
            	$menu_part.hide();
            }else {
            	$menu_part.show();
			}
        } else {
            //未滑到定位点动作
            var left_part_top = $(".left_part").offset().top;
            $absolute_part.css({
                "position": "fixed",
                "top": topdistance-scrollvalue + "px",
                "z-index":"1"
            });
            $(".menu_part").css({
                "position": "absolute",
                "top": left_part_top + "px",
                "left": menu_part_left + "px"
            });
        }
    }

    $('.item_right').hover(
        function () {
            var $self=$(this);
            $self.find('.item_word').css({
                'color':'#ff9900'
            });
            $self.find('.horizontal_line').css({
                'border-bottom':'solid 2px #ff9900'
            });
        },
        function(){
            var $self=$(this);
            $self.find('.item_word').css({
                'color':'#6b6b6b'
            });
            $self.find('.horizontal_line').css({
                'border-bottom':'dashed 1px #949494'
            });
        }
    )
})